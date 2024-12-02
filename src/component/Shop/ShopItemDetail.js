import * as d from "../styledcomponent/shopitemdetail.tsx";
import { StyledButton } from "../styledcomponent/button.tsx";
import { CommonWrapper, CommonContainer } from "../styledcomponent/common.tsx";
import { useState ,useEffect} from "react";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import {useNavigate,useParams} from 'react-router-dom';
import { tokenAtom, memberAtom } from '../../atoms';
import { axiosInToken } from '../../config.js';  
import { useAtomValue } from 'jotai/react';

const ShopItemDetail = () => {
  const navigate = useNavigate();
  const [item,setItem]=useState({});
  const [isWished, setIsWished]= useState(false);
  const token = useAtomValue(tokenAtom);
  const store = useAtomValue(memberAtom);
  const [quantity, setQuantity] = useState(1);
  const {itemCode} = useParams();

  // 처음엔 카테고리와 카테고리 선택 안한 전체 데이터 가져오기 
  useEffect(() => {
    getItemInfo(itemCode);
  }, [token,itemCode]);

  const getItemInfo = (itemCode) => {
    axiosInToken(token).get(`shopItemDetail/${itemCode}?storeCode=${store.storeCode}`)
      .then(res => {
        setItem(res.data.item);
        if(res.data.wishNum!=null){
          setIsWished(true);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const totalPrice = item.price * quantity;

  const toggleWishlist = () => {
    setIsWished(!isWished);
  };

  return (
    <CommonWrapper>
      <CommonContainer>
        <d.ProductDetail>
          <d.PdtDetailHead>
            <d.PdtDetailLeft>
              <d.PdtDetailItemImg>
                <d.PdtDetailItemImgArea>
                <img src='/image/item3.jpg' alt={item.itemFileNum} />
                </d.PdtDetailItemImgArea>
              </d.PdtDetailItemImg>
            </d.PdtDetailLeft>
            <d.PdtDetailRight>
              <d.PdtDetailItemTitleGroup>
                <d.PdtDetailItemTitle>{item.itemName}</d.PdtDetailItemTitle>
              </d.PdtDetailItemTitleGroup>
              <d.PdtDetailItemInfoGroup>
                <d.PdtDetailItemInfoDl>
                  <d.PdtDetailItemInfoDt>상품코드</d.PdtDetailItemInfoDt>
                  <d.PdtDetailItemInfoDd>{item.itemCode}</d.PdtDetailItemInfoDd>

                  <d.PdtDetailItemInfoDt>공급가</d.PdtDetailItemInfoDt>
                  <d.PdtDetailItemInfoDd>{item.itemPrice}원</d.PdtDetailItemInfoDd>
                  <d.PdtDetailItemInfoDt>보관상태</d.PdtDetailItemInfoDt>
                  <d.PdtDetailItemInfoDd>{item.itemStorage}</d.PdtDetailItemInfoDd>
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
                  <d.TotalPrice>{totalPrice}원</d.TotalPrice>
                </d.PriceWapper>
                <d.ButtonWrapper>
                  <d.WishlistButton onClick={toggleWishlist}>
                    <d.WishlistIcon isWished={isWished}>
                      {isWished ? <SolidHeartIcon /> : <OutlineHeartIcon />}
                    </d.WishlistIcon>
                  </d.WishlistButton>
                  <StyledButton size="extralg" theme="brown" >
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
              <d.PdtExtraInfoTableTd>{item.itemCountryOrigin}</d.PdtExtraInfoTableTd>
            </tr>
          </d.PdtExtraInfoTable>
        </d.ProductDetail>
      </CommonContainer>
    </CommonWrapper>
  );
};
export default ShopItemDetail;
