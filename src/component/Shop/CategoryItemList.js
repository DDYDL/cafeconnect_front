import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchButtonDiv, SearchDiv } from '../styles/StyledStore.tsx';
import { Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import {
  CommonWrapper,
  CommonContainer,
  ContainerTitleArea,
} from "../styledcomponent/common.tsx";
import * as s from "../styledcomponent/shopmain.tsx";
import FixedCategorySidebar from './FixedCategorySideBar.js';
import { useAtomValue } from 'jotai/react';
import { tokenAtom, memberAtom } from '../../atoms';
import { axiosInToken } from '../../config.js';

const CategoryItemList = ({ categories }) => {
  const [searchParams] = useSearchParams();
  const token = useAtomValue(tokenAtom);
  const store = useAtomValue(memberAtom);
  const [items, setItems] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [quantities, setQuantities] = useState({});
  

  // 사이드바로부터 파라미터 받아오기 
  const majorNum = searchParams.get('majorNum');
  const middleNum = searchParams.get('middleNum');
  const subNum = searchParams.get('subNum');

  useEffect(() => {
    submit();
  }, [majorNum, middleNum, subNum]);

  // 병렬 처리를 위해 async await 사용
  const submit = async () => {
    const formData = new FormData();
    
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
      setItems(response.data);
      
      //카테고리 재 선택 시 수량 초기화
      const newQuantities = {};
      response.data.forEach(item => {
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
    
    const formData = new FormData();
    formData.append("keyword", searchKeyword);
    
    axiosInToken(token).post('categoryItemSearch', formData)
      .then(res => {
        setItems(res.data);
      }).catch(err => {
        console.log(err);
      });
  };

  const handleQuantityChange = (itemCode, change) => {
    setQuantities(prev => ({
      ...prev,
      [itemCode]: Math.max(1, (prev[itemCode] || 1) + change)
    }));
  };

  const handleAddToCart = (itemCode) => {
    const quantity = quantities[itemCode] || 1;
    axiosInToken(token)
      .get(`addCart?storeCode=${store.storeCode}&itemCode=${itemCode}&cartItemCount=${quantity}`)
      .then(res => {
        if (res.data != null) {
          alert('장바구니에 등록되었습니다.');
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
                  icon={<MagnifyingGlassIcon className="h-5 w-5" onClick={handleSearch} />}
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

              <s.ShopMainItemList>
                <s.CategoryItemListUl>
                  {items.map((item) => (
                    <s.CategoryItemListLi key={item.itemCode}>
                      <s.ItemListImg>
                        <img src='/image/item3.jpg' alt={item.itemFileNum} />
                        {store.roles==='ROLE_STORE' &&
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
                      </s.ItemListImg>
                      <s.ItemListA to={`/shopItemDetail/${item.itemCode}`}>
                        <s.ItemListTextBox>
                          <s.ItemTitle>{item.itemName}</s.ItemTitle>
                          <s.ItemPrice>{item.itemPrice.toLocaleString()}원</s.ItemPrice>
                          {item.itemStorage && (
                            <s.ItemStorageLabelP>
                              <s.ItemStorageType storageWay={item.itemStorage}>
                                {item.itemStorage}
                              </s.ItemStorageType>
                            </s.ItemStorageLabelP>
                          )}
                        </s.ItemListTextBox>
                      </s.ItemListA>
                    </s.CategoryItemListLi>
                  ))}
                </s.CategoryItemListUl>
              </s.ShopMainItemList>
            </s.ItemCategoryListWrapper>
          </div>
        </div>
      </CommonContainer>
    </CommonWrapper>
  );
};

export default CategoryItemList;