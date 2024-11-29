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
import { useAtomValue} from 'jotai/react';
import { tokenAtom, memberAtom } from '../../atoms';
import { axiosInToken } from '../../config.js';


function WishItem() {
  const token = useAtomValue(tokenAtom);
  const store = useAtomValue(memberAtom);
  

  // 요청 받아 올 배열
  const [wishItems,setWishItems] = useState([]);
  const [allCategories,setAllCategories] = useState([]);
  const [categoryOptions,setCategoryOptions] = useState({major:[],middle:{},sub:{}});
 
  //선택되면 담아 질 배열
  const [selectedItems, setSelectedItems] = useState([]);
  
  const [selectAll, setSelectAll] = useState(false);
  
  const [selectedCategory, setSelectedCategory] = useState({major: '',middle: '',sub: ''}); //majorNum,middleNum,subNum
  
  useEffect(() => {
    axiosInToken(token).get('shopCategory')
    .then(res => {
     setAllCategories(res.data); 
    })
    .catch(err => {
      console.log(err);
    })   
    submit();
      
  },[token]) 

  const submit =()=>{
    const formData = new FormData();
    formData.append("storeCode", store.storeCode);

    if(selectedCategory.major!=null) {
      formData.append("majorNum",selectedCategory.major);
    }
    if(selectedCategory.middle!=null) {
      formData.append("middleNum",selectedCategory.middle);
    }
    if(selectedCategory.sub!=null) {
      formData.append("subNum",selectedCategory.sub);
    }

    axiosInToken(token).post('wishItem', formData)
    .then(res => {
      setWishItems([...res.data]);
     
    })
    .catch(err => {
      console.log(err);
    })

  }
  


 // 옵션 변경 
 const handleCategoryChange = (level, value) => {
      
  setSelectedCategory(prev => {
      const newCategory = { ...prev, [level]: value };
    // 상위 카테고리가 변경되면 하위 카테고리 초기화
    if (level === 'major') {
      newCategory.middle = '';
      newCategory.sub = '';
    } else if (level === 'middle') {
      newCategory.sub = '';
    }
    return newCategory;
  });
};

  //전체 선택 체크 제어하기 위한 함수 
  const handleSelectAll = () => {
    
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(wishItems.map((item) => item.itemCode));
    }
    
    setSelectAll(!selectAll);
  };

  //개별 체크 선택 제어하기 위한 함수 
  const handleSelectItem = (itemCode) => {
    
    // 개별 선택했다면~
    if (selectedItems.includes(itemCode)) {  
      setSelectedItems(selectedItems.filter((id) => id !== itemCode));
      setSelectAll(false);
    
      //선택 안된 경우 
    } else {
      setSelectedItems([...selectedItems, itemCode]);
      if (selectedItems.length + 1 === wishItems.length) {
        setSelectAll(true);
      }
    }
  };

  const handleDelete = () => {
    console.log("삭제할 아이템:", selectedItems);
  };

  const handleAddToCart = (itemCode) => {
    axiosInToken(token).get(`addCart?storeCode=${store.storeCode}&itemCode=${itemCode}&cartItemCount=1`)
    .then(res => {
      if(res.data !=null){
        console.log('장바구니 등록 성공!');
      } 
    })
    .catch(err => {
      console.log(err);
    })   

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
                value={selectedCategory.major}
                onChange={(value) => handleCategoryChange('major', value)}
                className="bg-white"
              >
                {categoryOptions.major.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </div>

            <div className="min-w-[36px]">
              <Select
                variant="outlined"
                label="중분류"
                value={selectedCategory.middle}
                onChange={(value) => handleCategoryChange('middle', value)}
                disabled={!selectedCategory.major}
                className="bg-white"
              >
                {selectedCategory.major && 
                  categoryOptions.middle[selectedCategory.major]?.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
              </Select>
            </div>

            <div className="min-w-[36px]">
              <Select
                variant="outlined"
                label="소분류"
                value={selectedCategory.sub}
                onChange={(value) => handleCategoryChange('sub', value)}
                disabled={!selectedCategory.middle}
                className="bg-white"
              >
                {selectedCategory.middle && 
                  categoryOptions.sub[selectedCategory.middle]?.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
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
            {wishItems.map((item) => (
              <w.ItemListLi key={item.itemCode}>
                <w.ItemListChekcWrap>
                  {/* 개별 체크박스 */}
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.itemCode)}
                    onChange={() => handleSelectItem(item.itemCode)}
                  />
                </w.ItemListChekcWrap>
                <w.ItemListImg>
                  <img src='/image/item3.jpg' alt={item.itemFileNum} />
                </w.ItemListImg>
                <w.ItemListTextBox>
                  <w.ItemTitle>{item.itemName}</w.ItemTitle>
                  <w.ItemPrice>{item.itemPrice.toLocaleString()}원</w.ItemPrice>
                  {item.itemStorage && (
                    <w.ItemStorageLabelP>
                      <w.ItemStorageType storageWay="{item.itemStorage}">
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
