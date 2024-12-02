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
import { useAtomValue } from 'jotai/react';
import { tokenAtom, memberAtom } from '../../atoms';
import { axiosInToken } from '../../config.js';
import { useNavigate } from "react-router";

function WishItem() {
  const token = useAtomValue(tokenAtom);
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
        setAllCategories(res.data.allCategory);
      })
      .catch(err => {
        console.log(err);
      })
  }


  // 카테고리 선택 한 데이터 요청 
  const submit = () => {

    const formData = new FormData();
    formData.append("storeCode", store.storeCode);

    //가장 마지막 선택 값만 보낼 수 있도록 함 
    if (selectedCategory.sub) {
      formData.append("subNum", selectedCategory.sub);
    } else if (selectedCategory.middle) {
      formData.append("middleNum", selectedCategory.middle);
    } else if (selectedCategory.major) {
      formData.append("majorNum", selectedCategory.major);
    }

    axiosInToken(token).post('wishItem', formData)
      .then(res => {
        setWishItems([...res.data]);

      })
      .catch(err => {
        console.log(err);
      })

  }

  // 선택된 대분류에 해당하는 중분류 리턴함수
  const getMiddleCategories = () => {
    const majorCategory = allCategories.find(
      category => category.itemCategoryNum.toString() === selectedCategory.major
    );

    return majorCategory ? majorCategory.midCategories : []; //없으면 빈배열
  };

  // 선택된 중분류에 해당하는 소분류 리턴함수 
  const getSubCategories = () => {
    const middleCategories = getMiddleCategories();
    const middleCategory = middleCategories.find(
      category => category.itemCategoryNum.toString() === selectedCategory.middle
    );
    return middleCategory ? middleCategory.subCategories : []; // 없으면 빈배열
  };

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

    // 카테고리 변경 시 자동으로 검색 실행
    //submit();
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

  const handleAddToCart = (itemCode) => {
    axiosInToken(token).get(`addCart?storeCode=${store.storeCode}&itemCode=${itemCode}&cartItemCount=1`)
      .then(res => {
        if (res.data != null) {
          alert('장바구니에 등록되었습니다.');
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
                {allCategories.map((category) => (
                  <Option key={category.itemCategoryNum} value={category.itemCategoryNum.toString()}>
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
                  <Option key={category.itemCategoryNum} value={category.itemCategoryNum.toString()}>
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
                {getSubCategories().map((category) => (
                  <Option key={category.itemCategoryNum} value={category.itemCategoryNum.toString()}>
                    {category.itemCategoryName}
                  </Option>
                ))}
              </Select>
            </div>
            <StyledButton
              onClick={submit}
              size="md"
              theme="brown"
            >
              검색
            </StyledButton>

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
