import * as d from "../styledcomponent/shopitemdetail.tsx";
import { StyledButton } from "../styledcomponent/button.tsx";
import { CommonWrapper, CommonContainer } from "../styledcomponent/common.tsx";
import { useState } from "react";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";

const ItemDetail = ({ itemCode }) => {
  const item = {
    itemCode: 1,
    name: "에티오피아 코케허니 G1스페셜티",
    imageUrl: "/image/item1.jpg",
    price: 5900,
    bgColor: "#45b0da",
    storageType: "실온",
    
  };

  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const totalPrice = item.price * quantity;

  const [isAdded, setIsAdded] = useState(false);

  const toggleWishlist = () => {
    setIsAdded(!isAdded);
  };

  return (
    <CommonWrapper>
      <CommonContainer>
        <d.ProductDetail>
          <d.PdtDetailHead>
            <d.PdtDetailLeft>
              <d.PdtDetailItemImg>
                <d.PdtDetailItemImgArea>
                  <img src={item.imageUrl}></img>
                </d.PdtDetailItemImgArea>
              </d.PdtDetailItemImg>
            </d.PdtDetailLeft>
            <d.PdtDetailRight>
              <d.PdtDetailItemTitleGroup>
                <d.PdtDetailItemTitle>{item.name}</d.PdtDetailItemTitle>
              </d.PdtDetailItemTitleGroup>
              <d.PdtDetailItemInfoGroup>
                <d.PdtDetailItemInfoDl>
                  <d.PdtDetailItemInfoDt>상품코드</d.PdtDetailItemInfoDt>
                  <d.PdtDetailItemInfoDd>G2000002676</d.PdtDetailItemInfoDd>

                  <d.PdtDetailItemInfoDt>공급가</d.PdtDetailItemInfoDt>
                  <d.PdtDetailItemInfoDd>5,900원</d.PdtDetailItemInfoDd>
                  <d.PdtDetailItemInfoDt>보관상태</d.PdtDetailItemInfoDt>
                  <d.PdtDetailItemInfoDd>실온</d.PdtDetailItemInfoDd>
                </d.PdtDetailItemInfoDl>
              </d.PdtDetailItemInfoGroup>
              <d.PdtDetailItemOtherGroup>
                <d.QuantityControlWrapper>
                  <d.QuantityButton onClick={handleDecrement}>
                    -
                  </d.QuantityButton>
                  <d.QuantityDisplay>{quantity}</d.QuantityDisplay>
                  <d.QuantityButton onClick={handleIncrement}>
                    +
                  </d.QuantityButton>
                </d.QuantityControlWrapper>
                <d.PriceWapper>
                  <span>합계</span>
                  <d.TotalPrice>{totalPrice.toLocaleString()}원</d.TotalPrice>
                </d.PriceWapper>
                <d.ButtonWrapper>
                  <d.WishlistButton onClick={toggleWishlist}>
                    <d.WishlistIcon isAdded={isAdded}>
                      {isAdded ? <SolidHeartIcon /> : <OutlineHeartIcon />}
                    </d.WishlistIcon>
                  </d.WishlistButton>
                  <StyledButton size="extralg" theme="brown">
                    장바구니
                  </StyledButton>
                </d.ButtonWrapper>
              </d.PdtDetailItemOtherGroup>
            </d.PdtDetailRight>
          </d.PdtDetailHead>
          <d.PdtDetailBottom>
            <d.DividerLine />
            <d.PdtExtraInfoTitle>상품 정보 고시</d.PdtExtraInfoTitle>
            <d.DividerLine />
          </d.PdtDetailBottom>
          <d.PdtExtraInfoTable>
            <tr>
              <d.PdtExtraInfoTableTh>카테고리</d.PdtExtraInfoTableTh>
              <d.PdtExtraInfoTableTd>
                커피자재/원두/카페인
              </d.PdtExtraInfoTableTd>
            </tr>
            <tr>
              <d.PdtExtraInfoTableTh>원산지</d.PdtExtraInfoTableTh>
              <d.PdtExtraInfoTableTd>대한민국</d.PdtExtraInfoTableTd>
            </tr>
          </d.PdtExtraInfoTable>
        </d.ProductDetail>
      </CommonContainer>
    </CommonWrapper>
  );
};
export default ItemDetail;
