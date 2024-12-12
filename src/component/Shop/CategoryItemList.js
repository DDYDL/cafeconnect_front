import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchButtonDiv, SearchDiv } from '../styles/StyledStore.tsx';
import { Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon, ShoppingCartIcon, XMarkIcon, ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import {
  CommonWrapper,
  CommonContainer,
  ContainerTitleArea,
} from "../styledcomponent/common.tsx";
import * as s from "../styledcomponent/shopmain.tsx";
import * as ss from '../styles/StyledStore.tsx';
import FixedCategorySidebar from './FixedCategorySideBar.js';
import { useAtomValue, useSetAtom, useAtom } from 'jotai/react';
import { tokenAtom, memberAtom, cartCountAtom } from '../../atoms';
import { axiosInToken, url } from '../../config.js';


const CategoryItemList = ({ categories }) => {
  const [searchParams] = useSearchParams();
  const [token, setToken] = useAtom(tokenAtom);
  const store = useAtomValue(memberAtom);
  const [items, setItems] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [quantities, setQuantities] = useState({});
  const [pageBtn, setPageBtn] = useState([]);
  const [pageInfo, setPageInfo] = useState({});

  // 검색 모드인지 아닌지를 구분
  const [isSearchMode, setIsSearchMode] = useState(false);

  // 검색어를 저장할 상태 추가
  const [savedSearchKeyword, setSavedSearchKeyword] = useState('');


  // 사이드바로부터 파라미터 받아오기 
  const majorNum = searchParams.get('majorNum');
  const middleNum = searchParams.get('middleNum');
  const subNum = searchParams.get('subNum');

  useEffect(() => {
    setIsSearchMode(false);
    setSavedSearchKeyword(''); // 카테고리 변경 시 저장된 검색어도 초기화
    submit(1);
  }, [majorNum, middleNum, subNum]);

  // 병렬 처리를 위해 async await 사용
  const submit = async (page) => {
    const formData = new FormData();
    formData.append("page", page);
    // 가장 마지막 선택 값만 전송
    if (subNum) {
      formData.append("subNum", subNum);
    } else if (middleNum) {
      formData.append("middleNum", middleNum);
    } else if (majorNum) {
      formData.append("majorNum", majorNum);
    }
    try {
      const response = await axiosInToken(token).post('categoryItemList', formData);

      if (response.headers.authorization != null) {
        setToken(response.headers.authorization)
      }
      let pageInfo = response.data.pageInfo;
      console.log(pageInfo);
      let page = [];
      for (let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
        page.push(i);
      }

      setPageBtn([...page]);
      setPageInfo(pageInfo);
      console.log(response.data.items);
      setItems(response.data.items);

      //카테고리 재 선택 시 수량 초기화
      const newQuantities = {};
      response.data.items.forEach(item => {
        newQuantities[item.itemCode] = 1;
      });
      setQuantities(newQuantities);
    } catch (err) {
      console.log(err);
    }
  };
  //상품명으로 검색 
  const handleSearch = () => {
    if (!searchKeyword.trim()) return;

    setIsSearchMode(true); //검색전환
    setSavedSearchKeyword(searchKeyword);

    const formData = new FormData();

    formData.append("keyword", searchKeyword);
    formData.append("page", 1);

    axiosInToken(token).post('categoryItemSearch', formData)
      .then(res => {
        if (res.headers.authorization != null) {
          setToken(res.headers.authorization);
        }
        let pageInfo = res.data.pageInfo;
        console.log(pageInfo);
        let page = [];
        for (let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
          page.push(i);
        }

        setPageBtn([...page]);
        setPageInfo(pageInfo);
        setItems(res.data.items);
        setSearchKeyword('');
      }).catch(err => {
        console.log(err);
      });
  };
  // 검색 페이징
  const handleSearchPaging = async (page) => {
    const formData = new FormData();
    formData.append("keyword", savedSearchKeyword);
    formData.append("page", page);

    try {
      const res = await axiosInToken(token).post('categoryItemSearch', formData);
      if (res.headers.authorization != null) {
        setToken(res.headers.authorization);
      }
      let pageInfo = res.data.pageInfo;
      console.log(pageInfo);
      let page = [];
      for (let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
        page.push(i);
      }
      setPageBtn([...page]);
      setPageInfo(pageInfo);
      setItems(res.data.items);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePageClick = (page) => {
    if (isSearchMode) {
      handleSearchPaging(page);
    } else {
      submit(page);
    }
  };

  const handlePrevPage = () => {
    if (pageInfo.curPage > 1) {
      handlePageClick(pageInfo.curPage - 1);
    }
  };

  const handleNextPage = () => {
    if (pageInfo.curPage < pageInfo.endPage) {
      handlePageClick(pageInfo.curPage + 1);
    }
  };

  const handleQuantityChange = (itemCode, change) => {
    setQuantities(prev => ({
      ...prev,
      [itemCode]: Math.max(1, (prev[itemCode] || 1) + change)
    }));
  };

  const setCartCount = useSetAtom(cartCountAtom);
  const handleAddToCart = (itemCode) => {
    const quantity = quantities[itemCode] || 1;
    axiosInToken(token)
      .get(`addCart?storeCode=${store.storeCode}&itemCode=${itemCode}&cartItemCount=${quantity}`)
      .then(res => {
        if (res.headers.authorization != null) {
          setToken(res.headers.authorization)
        }
        if (res.data != null) {
          alert('장바구니에 등록되었습니다.');
          // cartCount를 업데이트
          axiosInToken(token).get(`${url}/cartAllCount?storeCode=${store.storeCode}`)
            .then(response => {

              if (response.headers.authorization != null) {
                setToken(res.headers.authorization)
              }
              setCartCount(response.data);   //jotai 값 세팅
            }).catch(err => {
              console.log(err);
            })
        }
      }).catch(err => {
        console.log(err);
        alert('장바구니 등록에 실패했습니다.');
      });
  };

  return (
    <CommonWrapper>
      <CommonContainer size='1240PX'>
        <div className="flex">

          {/* 왼쪽 사이드바 */}
          <div className="w-[250px] sticky top-0 h-screen overflow-y-auto">
            <FixedCategorySidebar categories={categories} />
          </div>

          {/* 오른쪽 메인 컨텐츠 */}
          <div className="flex-1 pl-8">
            <ContainerTitleArea>
              <h2>상품 목록</h2>
            </ContainerTitleArea>

            <SearchButtonDiv>
              <SearchDiv>
                <Input
                  icon={<MagnifyingGlassIcon className="h-5 w-5" onClick={() => handleSearch(1)} />}
                  label="상품 검색"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
              </SearchDiv>
            </SearchButtonDiv>

            <s.ItemCategoryListWrapper>
              <s.ItemListAlignWrapper>
                <s.CountWrapper>
                  <span className="all_counter">
                    총<span className="numbering">{items.length}</span>개
                  </span>
                </s.CountWrapper>
              </s.ItemListAlignWrapper>

              <s.CategoryItemListUl>
                {items.map((item) => (
                  <s.CategoryItemListLi key={item.itemCode}>
                    <s.CategoryItemListImg>
                      <img src={`${url}/image/${item.itemFileName}`} alt={item.itemName} />
                      {store.roles === 'ROLE_STORE' &&
                        <s.HoverControls className="hover-controls">
                          <s.QuantityControl>
                            <s.QuantityButton onClick={(e) => {
                              e.stopPropagation();
                              handleQuantityChange(item.itemCode, -1);
                            }}>-</s.QuantityButton>
                            <s.QuantityDisplay>
                              {quantities[item.itemCode] || 1}
                            </s.QuantityDisplay>
                            <s.QuantityButton onClick={(e) => {
                              e.stopPropagation();
                              handleQuantityChange(item.itemCode, 1);
                            }}>+</s.QuantityButton>
                          </s.QuantityControl>

                          <s.CartButton onClick={(e) => {
                            e.stopPropagation(); //클릭한 곳에서만 해당 이벤트가 실행되도록 함 
                            handleAddToCart(item.itemCode);
                          }}>
                            <ShoppingCartIcon className="h-6 w-6" />
                          </s.CartButton>
                        </s.HoverControls>
                      }
                    </s.CategoryItemListImg>
                    <s.ItemListA to={`/shopItemDetail/${item.itemCode}`}>
                      <s.CategoryItemListTextBox>
                        <s.CategoryItemTitle>{item.itemName}</s.CategoryItemTitle>
                        <s.CategoryItemPrice>{item.itemPrice.toLocaleString()}원</s.CategoryItemPrice>
                        {item.itemStorage && (
                          <s.ItemStorageLabelP>
                            <s.ItemStorageType $storageway={item.itemStorage}>
                              {item.itemStorage}
                            </s.ItemStorageType>
                          </s.ItemStorageLabelP>
                        )}
                      </s.CategoryItemListTextBox>
                    </s.ItemListA>
                  </s.CategoryItemListLi>
                ))}
              </s.CategoryItemListUl>
            </s.ItemCategoryListWrapper>

            <ss.PageButtonGroupDiv className="flex justify-center mt-8">
              <ss.ButtonGroupStyle variant="outlined">
                <ss.IconButtonStyle
                  onClick={handlePrevPage}
                  disabled={pageInfo.curPage === 1}>
                  <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" previous />
                </ss.IconButtonStyle>
                {pageBtn.map(page => (
                  <ss.IconButtonStyle key={page}
                    onClick={() => handlePageClick(page)}
                    style={{
                      backgroundColor: pageInfo.curPage === page ? '#e5e7eb' : 'transparent'
                    }}
                  >
                    {page}
                  </ss.IconButtonStyle>
                ))}
                <ss.IconButtonStyle
                  onClick={handleNextPage}
                  disabled={pageInfo.endPage === pageInfo.curPage}
                >
                  <ArrowRightIcon strokeWidth={2} className="h-4 w-4" next />
                </ss.IconButtonStyle>
              </ss.ButtonGroupStyle>
            </ss.PageButtonGroupDiv>
          </div>
        </div>
      </CommonContainer>
    </CommonWrapper>
  );
};

export default CategoryItemList;