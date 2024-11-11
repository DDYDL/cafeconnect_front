import {
  CommonWrapper,
  CommonContainer,
  ContainerTitleArea,
} from "../styledcomponent/common.tsx";
import * as w from "../styledcomponent/wishItem.tsx";
import { useState } from "react";
import { StyledButton } from "../styledcomponent/button.tsx";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

function WishItem() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

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
            <li>대</li><li>중</li><li>소</li>
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
                      <w.ItemStorageType bgColor={item.bgColor}>
                        {item.storageType}
                      </w.ItemStorageType>
                    </w.ItemStorageLabelP>
                  )}
                </w.ItemListTextBox>
                <StyledButton
                  size="sm"
                  theme="white"
                  onClick={() => handleAddToCart(item.itemCode)}
                  style={{ width: "100%", marginTop: "10px" }}
                >
                  <ShoppingCartIcon className="h-6 w-6" />
                </StyledButton>
              </w.ItemListLi>
            ))}
          </w.ItemListUl>
        </w.WishItemWrapper>
      </CommonContainer>
    </CommonWrapper>
  );
}

export default WishItem;
