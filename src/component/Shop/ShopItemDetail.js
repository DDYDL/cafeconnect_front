import * as d from "../styledcomponent/shopitemdetail.tsx";
import { StyledButton } from "../styledcomponent/button.tsx";
import { CommonWrapper, CommonContainer } from "../styledcomponent/common.tsx";
import { useState ,useEffect} from "react";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { XMarkIcon,MagnifyingGlassIcon, ArrowRightIcon, ArrowLeftIcon} from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import {useNavigate,useParams} from 'react-router-dom';
import { tokenAtom, memberAtom } from '../../atoms';
import { axiosInToken,url} from '../../config.js';  
import { useAtomValue,useAtom } from "jotai/react";

const ShopItemDetail = () => {
  const navigate = useNavigate();
  const [item,setItem]=useState({});  // toLocaleString()사용 시, 데이터 선언을 안했기 때문에 에러 방지를 위해 ?.(옵셔널체이닝 적용)
  const [isWished, setIsWished]= useState(false);
  const [token,setToken] = useAtom(tokenAtom);
  const store = useAtomValue(memberAtom); //store.roles = ROLE_MAINSTORE 이면 버튼 비활성화 
  const [quantity, setQuantity] = useState(1);
  const {itemCode} = useParams();
  const [pageBtn, setPageBtn] = useState([]);
  const [pageInfo, setPageInfo] = useState({});

  // 처음엔 카테고리와 카테고리 선택 안한 전체 데이터 가져오기   
  useEffect(() => {
    if (token != null && token !== '')
    getItemInfo(itemCode);

  }, [token,itemCode]);

  const getItemInfo = (itemCode) => {
    axiosInToken(token).get(`shopItemDetail/${itemCode}${store.storeCode?`?storeCode=${store.storeCode}` : ''}`)
      .then(res => {

        if(res.headers.authorization!=null) {
          setToken(res.headers.authorization)
      }
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
  //총합계
  const totalPrice = item.itemPrice * quantity;
  //카테고리 
  const categoryFormat = item.itemMajorCategoryName+'/'+item.itemMiddleCategoryName+'/'+ (item.itemSubCategoryName == null ? '-' : item.itemSubCategoryName);
  
  //관심상품 등록
  const toggleWishlist = () => {
    const formData = new FormData();
    formData.append("storeCode",store.storeCode);
    formData.append("itemCode",itemCode);
    axiosInToken(token).post('addWishItem',formData)
      .then((res) => {

        if(res.headers.authorization!=null) {
          setToken(res.headers.authorization)
      }

        if(res.data===true) {
          setIsWished(!isWished);
          alert("관심 상품 등록 성공");  
        }else {
          setIsWished(!isWished);
          alert("관심 상품 삭제 성공");  
          
        }    
      })
      .catch(err => {
        console.log(err);
      })
  };
  const handleAddToCart = () => {
    axiosInToken(token).get(`addCart?storeCode=${store.storeCode}&itemCode=${itemCode}&cartItemCount=${quantity}`)
      .then(res => {

        if(res.headers.authorization!=null) {
          setToken(res.headers.authorization)
      }
        if (res.data != null) {
          alert('장바구니에 등록되었습니다.');
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
        <d.ProductDetail>
          <d.PdtDetailHead>
            <d.PdtDetailLeft>
              <d.PdtDetailItemImg>
                <d.PdtDetailItemImgArea>
                <img src={`${url}/image/${item.itemFileName}`} alt={item.itemFileName} />
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
                  <d.PdtDetailItemInfoDd>{item.itemPrice?.toLocaleString()}원</d.PdtDetailItemInfoDd>  
                  <d.PdtDetailItemInfoDt>보관상태</d.PdtDetailItemInfoDt>
                  <d.PdtDetailItemInfoDd>{item.itemStorage}</d.PdtDetailItemInfoDd>
                </d.PdtDetailItemInfoDl>
              </d.PdtDetailItemInfoGroup>
              <d.PdtDetailItemOtherGroup>
              {store.roles==='ROLE_STORE' &&
                <>
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
                  <d.TotalPrice>{totalPrice?.toLocaleString()}원</d.TotalPrice>
                </d.PriceWapper>
                
                <d.ButtonWrapper>
                  <d.WishlistButton onClick={toggleWishlist}>
                    <d.WishlistIcon $iswished={isWished}>
                      {isWished ? <SolidHeartIcon /> : <OutlineHeartIcon />}
                    </d.WishlistIcon>
                  </d.WishlistButton>
                  <StyledButton size="extralg" theme="brown" onClick={handleAddToCart} >
                    장바구니
                  </StyledButton>
                </d.ButtonWrapper>
                </>
                }
              </d.PdtDetailItemOtherGroup>
            </d.PdtDetailRight>
          </d.PdtDetailHead>
          <d.PdtDetailBottom>
            <d.DividerLine />
            <d.PdtExtraInfoTitle>상품 정보 고시</d.PdtExtraInfoTitle>
            <d.DividerLine />
          </d.PdtDetailBottom>
          <d.PdtExtraInfoTable>
            <tbody>
            <tr>
              <d.PdtExtraInfoTableTh>카테고리</d.PdtExtraInfoTableTh>
              <d.PdtExtraInfoTableTd>
                {categoryFormat}
              </d.PdtExtraInfoTableTd>
            </tr>
            <tr>
              <d.PdtExtraInfoTableTh>원산지</d.PdtExtraInfoTableTh>
              <d.PdtExtraInfoTableTd>{item.itemCountryOrigin}</d.PdtExtraInfoTableTd>
            </tr>
            </tbody>
          </d.PdtExtraInfoTable>
        </d.ProductDetail>
        <div className="flex justify-center gap-4 mt-10 mb-10">
            <StyledButton size="md" theme="white" onClick={() => navigate(-1)}>
              이전
            </StyledButton>
          </div>
      </CommonContainer>
    </CommonWrapper>
  );
};
export default ShopItemDetail;
