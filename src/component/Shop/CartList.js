import {
  CommonWrapper,
  CommonContainer,
  ContainerTitleArea
} from "../styledcomponent/common.tsx";
import * as c from "../styledcomponent/cartlist.tsx";
import {
  ItemStorageLabelP,
  ItemStorageType,
} from "../styledcomponent/wishItem.tsx";
import { StyledButton } from "../styledcomponent/button.tsx";
import { PlusIcon } from "@heroicons/react/24/outline";
import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import PreviousOrderItemsModal from './PreviousOrderItemModal.js';


function CartList() {
  
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [cartItems, setCartItems] = useState([
    {
      itemCode: 1,
      name: "에티오피아 코케허니 G1스페셜티",
      price: 24800,
      quantity: 1,
      image: "/image/item1.jpg",
      category: "major/middel/sub",
      shipping: "기본배송",
      storageType: "냉동",
    },
    {
      itemCode: 2,
      name: "에티오피아 코케허니 G1스페셜티",
      price: 24800,
      quantity: 1,
      image: "/image/item1.jpg",
      category: "major/middel/sub",
      shipping: "기본배송",
  
    },
  
  ]);

  // 선택된 이전 상품들을 현재 장바구니에 추가하는 로직
  const handleAddPreviousItems = (items) => {
    setCartItems(prevItems => [...prevItems, ...items.map(item => ({
      itemCode: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: "/image/item1.jpg", // 기본 이미지
      category: item.category,
      shipping: "기본배송",
    }))]);
  };

  const handleQuantityChange = (itemCode, value) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.itemCode === itemCode ? { ...item, quantity: value } : item
      )
    );
  };

  return (
    <CommonWrapper>
      <CommonContainer>
        <ContainerTitleArea>
          <h2>장바구니</h2>
        </ContainerTitleArea>
        <c.AddPreviousOrderItem>
          <StyledButton size="sm" theme="brown" hasIcon onClick={() => setIsModalOpen(true)}>
            <PlusIcon />
            이전 상품 추가
          </StyledButton>
        </c.AddPreviousOrderItem>

       {/* 모달 추가 */}
       <PreviousOrderItemsModal 
          open={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
          onAddItems={handleAddPreviousItems}
        />

        <c.CartWrap>
          <c.CartHeader>
            <div>이미지</div>
            <div>상품정보</div>
            <div>수량</div>
            <div>상품금액</div>
            <div>카테고리</div>
            <div>배송구분</div>
            <div>보관</div>
            <div>삭제</div>
          </c.CartHeader>

          {cartItems.map((item) => (
            <c.CartItem key={item.itemCode}>
              <div>
                <c.ProductImage src={item.image} alt={item.name} />
              </div>
              <c.ProductInfo>
                <c.ProductName>{item.name}</c.ProductName>
                {item.storageType && (
                  <ItemStorageLabelP>
                    <ItemStorageType storageType={item.storageType}>
                      {item.storageType}
                    </ItemStorageType>
                  </ItemStorageLabelP>
                )}
              </c.ProductInfo>
              <c.QuantityControl>
                <c.QuantityInput
                  type="number"
                  min="1"
                  max="999"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(
                      item.itemCode,
                      parseInt(e.target.value)
                    )
                  }
                />
                <StyledButton size="sm" theme="white">
                  변경
                </StyledButton>
              </c.QuantityControl>
              <div>{item.price.toLocaleString()}원</div>
              <c.CategoryInfo>{item.category}</c.CategoryInfo>
              <div>{item.shipping}</div>
              <div>{item.storageType}</div>
              <div>
                <StyledButton size="sm" theme="white">
                  삭제
                </StyledButton>
              </div>
            </c.CartItem>
          ))}
          <c.SummarySection>
           합계 : <strong>51,700원</strong>
          </c.SummarySection>
          <c.ButtonSection>
            <StyledButton size="md" theme="brown" onClick={() => navigate("/order")}>
              주문하기
            </StyledButton>
          </c.ButtonSection>
        </c.CartWrap>
      </CommonContainer>
    </CommonWrapper>
  );
}
export default CartList;
