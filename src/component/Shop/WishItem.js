import {
  CommonWrapper,
  CommonContainer,
  ContainerTitleArea,
} from "../styledcomponent/common.tsx";
import * as w from "../styledcomponent/wishItem.tsx";
import { useState } from "react";
import { StyledButton } from "../styledcomponent/button.tsx";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Select, Option } from "@material-tailwind/react";

function WishItem() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({
    large: '',
    medium: '',
    small: ''
});

  const items = [
    {
      itemCode: 1,
      name: "에티오피아 코케허니 G1스페셜티",
      imageUrl: "/image/item1.jpg",
      price: "11,500원",
      bgColor: "#45b0da",
      storageType: "냉동",
    },
    {
      itemCode: 2,
      name: "달보드레 블랜드",
      imageUrl: "/image/item2.jpg",
      price: "8,500원",
    },
    {
      itemCode: 3,
      name: "에티오피아 예가체프 G2",
      imageUrl: "/image/item3.jpg",
      price: "22,000원",
      bgColor: "#45b0da",
      storageType: "냉동",
    },
  ];
  const categoryOptions = {
    large: [
      { value: 'coffee', label: '커피' },
      { value: 'tea', label: '차' },
      { value: 'beverage', label: '음료' }
    ],
    medium: {
      coffee: [
        { value: 'bean', label: '원두' },
        { value: 'ground', label: '분쇄' },
        { value: 'capsule', label: '캡슐' }
      ],
      tea: [
        { value: 'loose', label: '잎차' },
        { value: 'teabag', label: '티백' }
      ],
      beverage: [
        { value: 'syrup', label: '시럽' },
        { value: 'powder', label: '파우더' }
      ]
    },
    small: {
      bean: [
        { value: 'ethiopia', label: '에티오피아' },
        { value: 'brazil', label: '브라질' },
        { value: 'colombia', label: '콜롬비아' }
      ],
      ground: [
        { value: 'fine', label: '극세분' },
        { value: 'medium', label: '중간분쇄' }
      ]
      
    }
  };
 // 옵션 변경 
 const handleCategoryChange = (level, value) => {
  setSelectedCategory(prev => {
    const newCategory = { ...prev, [level]: value };
    // 상위 카테고리가 변경되면 하위 카테고리 초기화
    if (level === 'large') {
      newCategory.medium = '';
      newCategory.small = '';
    } else if (level === 'medium') {
      newCategory.small = '';
    }
    return newCategory;
  });
};

  //삭제하기위한 선택옵션
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map((item) => item.itemCode));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectItem = (itemCode) => {
    if (selectedItems.includes(itemCode)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemCode));
      setSelectAll(false);
    } else {
      setSelectedItems([...selectedItems, itemCode]);
      if (selectedItems.length + 1 === items.length) {
        setSelectAll(true);
      }
    }
  };

  const handleDelete = () => {
    console.log("삭제할 아이템:", selectedItems);
  };

  const handleAddToCart = (itemCode) => {
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
                value={selectedCategory.large}
                onChange={(value) => handleCategoryChange('large', value)}
                className="bg-white"
              >
                {categoryOptions.large.map((option) => (
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
                value={selectedCategory.medium}
                onChange={(value) => handleCategoryChange('medium', value)}
                disabled={!selectedCategory.large}
                className="bg-white"
              >
                {selectedCategory.large && 
                  categoryOptions.medium[selectedCategory.large]?.map((option) => (
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
                value={selectedCategory.small}
                onChange={(value) => handleCategoryChange('small', value)}
                disabled={!selectedCategory.medium}
                className="bg-white"
              >
                {selectedCategory.medium && 
                  categoryOptions.small[selectedCategory.medium]?.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
              </Select>
            </div>
          </w.FilterWrapper>
          <w.CountWrapper>
            <span className="all_counter">
              총<span className="numbering">{items.length}</span>개
            </span>
          </w.CountWrapper>

          <w.WishtemDeleteWrapper>
            <w.CheckWrap>
              <input
                type="checkbox"
                id="check-all"
                checked={selectAll}
                onChange={handleSelectAll}
              />
              <label htmlFor="check-all">전체 선택</label>
            </w.CheckWrap>
            <StyledButton
              size="sm"
              theme="white"
              onClick={handleDelete}
              disabled={selectedItems.length === 0}
            >
              삭제
            </StyledButton>
          </w.WishtemDeleteWrapper>

          <w.ItemListUl>
            {items.map((item) => (
              <w.ItemListLi key={item.itemCode}>
                <w.ItemListChekcWrap>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.itemCode)}
                    onChange={() => handleSelectItem(item.itemCode)}
                  />
                </w.ItemListChekcWrap>
                <w.ItemListImg>
                  <img src={item.imageUrl} alt={item.name} />
                </w.ItemListImg>
                <w.ItemListTextBox>
                  <w.ItemTitle>{item.name}</w.ItemTitle>
                  <w.ItemPrice>{item.price}</w.ItemPrice>
                  {item.storageType && (
                    <w.ItemStorageLabelP>
                      <w.ItemStorageType storageType={item.storageType}>
                        {item.storageType}
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
