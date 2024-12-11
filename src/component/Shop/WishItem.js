import {
  CommonWrapper,
  CommonContainer,
  ContainerTitleArea,
} from "../styledcomponent/common.tsx";
import * as w from "../styledcomponent/wishItem.tsx";
import { useEffect, useState } from "react";
import { StyledButton } from "../styledcomponent/button.tsx";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Select, Option } from "@material-tailwind/react";
import { useAtomValue,useAtom,useSetAtom } from "jotai/react";
import { tokenAtom, memberAtom, cartCountAtom } from '../../atoms';
import { axiosInToken ,url} from '../../config.js';
import { useNavigate } from "react-router";
import axios from 'axios';

function WishItem() {
  const [token,setToken] = useAtom(tokenAtom);
  const store = useAtomValue(memberAtom);
  const navigate = useNavigate();
  // 요청 받아 올 배열
  const [wishItems, setWishItems] = useState([]);
  const [allCategories, setAllCategories] = useState([]);


  //선택된 데이터를 저장 
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({ major: '', middle: '', sub: '' }); //majorNum,middleNum,subNum value로 담기 

  // 처음엔 카테고리와 카테고리 선택 안한 전체 데이터 가져오기 
  useEffect(() => {
    submit();
    getCategories();
  }, [token]);

  const getCategories = () => {
    axiosInToken(token)
      .get('shopCategory')
      .then(res => {
        if(res.headers.authorization!=null) {
          setToken(res.headers.authorization)
      }
        setAllCategories(res.data.allCategory);
      })
      .catch(err => {
        console.log(err);
      })
  }

  // 카테고리 선택 안한 초기 데이터 요청 
  const submit = () => {

    const formData = new FormData();
    formData.append("storeCode", store.storeCode);

    axiosInToken(token).post('wishItem', formData)
      .then(res => {
        if(res.headers.authorization!=null) {
          setToken(res.headers.authorization)
      }
        console.log(res.data);
        setWishItems(res.data||[]);
      })
      .catch(err => {
        console.log(err);
      })
  }

  // 선택된 대분류에 해당하는 중분류 리턴함수
  const getMiddleCategories = () => {
    const majorCategory = allCategories.find(
      category => category.itemCategoryNum === selectedCategory.major
    );

    return majorCategory ? majorCategory.midCategories : []; //없으면 빈배열
  };

  // 선택된 중분류에 해당하는 소분류 리턴함수 
  const getSubCategories = () => {
    const middleCategories = getMiddleCategories();
    const middleCategory = middleCategories.find(
      category => category.itemCategoryNum === selectedCategory.middle
    );
    return middleCategory ? middleCategory.subCategories : [] ; // 없으면 빈배열
  };

  // 대,중,소분류 옵션 변경 과 동시에 조회 
  const handleCategoryChange = (level, value) => {

    //전체 옵션 선택
    if (!value) { 
      setSelectedCategory({ major: '', middle: '', sub: '' }); // 나머지 분류 초기화 
      const formData = new FormData();
      formData.append("storeCode", store.storeCode);
      axiosInToken(token).post('wishItem', formData)
        .then(res => {

          if(res.headers.authorization!=null) {
            setToken(res.headers.authorization)
          }
            setWishItems([...res.data])
            return;
          })
        }  
    
    const formData = new FormData();
    formData.append("storeCode", store.storeCode);
    formData.append(level === 'major' ? 'majorNum' : level === 'middle' ? 'middleNum' : 'subNum', value);
    
    // 하위 카테고리 초기화 시키기 
    setSelectedCategory(prev => {
      const newCategory = { ...prev, [level]: value };
      if (level === 'major') {
        newCategory.middle = '';
        newCategory.sub = '';
      } else if (level === 'middle') {
        newCategory.sub = '';
      }
      return newCategory;
    });
  
    axiosInToken(token).post('wishItem', formData)
      .then(res => {
        if(res.headers.authorization!=null) {
          setToken(res.headers.authorization)
        }
        setWishItems([...res.data])
      }
      ) // 데이터 받아와서 새로운 배열생성 
      .catch(err => console.log(err));
  };

  //전체 선택 체크 제어하기 위한 함수 
  const handleSelectAll = () => {

    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(wishItems.map((item) => item.wishItemNum));
    }

    setSelectAll(!selectAll);
  };

  //개별 체크 선택 제어하기 위한 함수 
  const handleSelectItem = (wishItemNum) => {

    // 개별 선택했다면~
    if (selectedItems.includes(wishItemNum)) {
      setSelectedItems(selectedItems.filter((id) => id !== wishItemNum));
      setSelectAll(false);

      //선택 안된 경우 
    } else {
      setSelectedItems([...selectedItems, wishItemNum]);
      if (selectedItems.length + 1 === wishItems.length) {
        setSelectAll(true);
      }
    }
  };

  const handleDelete = () => {
    const formData = new FormData();
    formData.append("storeCode", store.storeCode);
    formData.append("check", selectedItems); // wishNum 이 담긴 배열 전달  
    axiosInToken(token).post('deleteWishItem', formData)
      .then(res => {
        if(res.headers.authorization!=null) {
          setToken(res.headers.authorization)
      }
        if (res.data != null) {
          alert('관심상품에서 삭제됐습니다.');
          // 관심상품 목록 페이지로 이동 (naviegate('wishList'))
          submit();
        }
      })
      .catch(err => {
        console.log(err);
      })

  };

  const setCartCount = useSetAtom(cartCountAtom);
  const handleAddToCart = (itemCode) => {
    axiosInToken(token).get(`addCart?storeCode=${store.storeCode}&itemCode=${itemCode}&cartItemCount=1`)
      .then(res => {
       
        if(res.headers.authorization!=null) {
          setToken(res.headers.authorization)
      }
        if (res.data != null) {
          alert('장바구니에 등록되었습니다.');
        // cartCount를 업데이트
        axiosInToken(token).get(`${url}/cartAllCount?storeCode=${store.storeCode}`)
        .then(response => {
          
          if(response.headers.authorization!=null) {
            setToken(res.headers.authorization)
        }
          setCartCount(response.data);   //jotai 값 세팅
        });   
        
      }
      
      })
      .catch(err => {
        console.log(err);
      })
      alert('장바구니에 등록되었습니다.');
    console.log(`장바구니에 추가: 상품 ${itemCode}, 수량 1`);
  };

  return (
    <CommonWrapper>
      <CommonContainer>
        <ContainerTitleArea>
          <h2>관심상품</h2>
        </ContainerTitleArea>
        <w.WishItemWrapper>
          <w.FilterWrapper >
            <div className="min-w-[36px]">
              <Select
                variant="outlined"
                label="대분류"
                onChange={(value) => handleCategoryChange('major', value)}
                className="bg-white"
              >
                {[{itemCategoryNum:'',itemCategoryName:'전체'},...allCategories].map((category) => (
                  <Option key={category.itemCategoryNum} value={category.itemCategoryNum}>
                    {category.itemCategoryName}
                  </Option>
                ))}
              </Select>
            </div>

            <div className="min-w-[36px]">
              <Select
                variant="outlined"
                label="중분류"
                onChange={(value) => handleCategoryChange('middle', value)}
                disabled={!selectedCategory.major}
                className="bg-white"
              >
                {getMiddleCategories().map((category) => (
                  <Option key={category.itemCategoryNum} value={category.itemCategoryNum}>
                    {category.itemCategoryName}
                  </Option>
                ))}
              </Select>
            </div>

            <div className="min-w-[36px]">
              <Select
                variant="outlined"
                label="소분류"
                onChange={(value) => handleCategoryChange('sub', value)}
                disabled={!selectedCategory.middle}
                className="bg-white"
              >
                {getSubCategories()?.map((category) => (
                  <Option key={category.itemCategoryNum} value={category.itemCategoryNum}>
                    {category.itemCategoryName}
                  </Option>
                ))}
              </Select>
            </div>

          </w.FilterWrapper>
          <w.CountWrapper>
            <span className="all_counter">
              총<span className="numbering">{wishItems.length}</span>개
            </span>
          </w.CountWrapper>

          <w.WishtemDeleteWrapper>
            <w.CheckWrap>
              <input
                type="checkbox"
                id="check-all"
                checked={selectAll} //true,false
                onChange={handleSelectAll}
              />
              <label htmlFor="check-all">전체 선택</label>
            </w.CheckWrap>
            <StyledButton
              size="sm"
              theme="white"
              onClick={handleDelete}
              disabled={selectedItems.length === 0} //삭제할 상품 없으면 disalbe
            >
              삭제
            </StyledButton>
          </w.WishtemDeleteWrapper>

          <w.ItemListUl>
            {wishItems?.map((item) => (
              <w.ItemListLi key={item.wishItemNum}>
                <w.ItemListChekcWrap>
                  {/* 개별 체크박스 */}
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.wishItemNum)}
                    onChange={() => handleSelectItem(item.wishItemNum)}
                  />
                </w.ItemListChekcWrap>
                <w.ItemListImg>
                  <img src={`${url}/image/${item.itemFileName}`} alt={item.itemName} />
                </w.ItemListImg>
                <w.ItemListTextBox>
                  <w.ItemTitle>{item.itemName}</w.ItemTitle>
                  <w.ItemPrice>{item.itemPrice.toLocaleString()}원</w.ItemPrice>
                  {item.itemStorage && (
                    <w.ItemStorageLabelP>
                      <w.ItemStorageType $storageway="{item.itemStorage}">
                        {item.itemStorage}
                      </w.ItemStorageType>
                    </w.ItemStorageLabelP>
                  )}
                </w.ItemListTextBox>
                <w.CartIconWrapper
                  onClick={() => handleAddToCart(item.itemCode)}
                >
                  <ShoppingCartIcon />
                </w.CartIconWrapper>
              </w.ItemListLi>
            ))}
          </w.ItemListUl>
        </w.WishItemWrapper>
      </CommonContainer>
    </CommonWrapper>
  );
}

export default WishItem;
