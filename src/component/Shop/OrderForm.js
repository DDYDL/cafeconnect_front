import {
  CommonWrapper,
  CommonContainer,
  ContainerTitleArea,
} from "../styledcomponent/common.tsx";
import * as o from "../styledcomponent/order.tsx";
import { StyledButton } from "../styledcomponent/button.tsx";
import {useNavigate,useLocation} from 'react-router-dom';
import {useState,useEffect}from 'react';
import { useAtomValue } from 'jotai/react';
import { tokenAtom, memberAtom } from '../../atoms';
import { axiosInToken } from '../../config.js';


function Order() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = useAtomValue(tokenAtom);
  const store = useAtomValue(memberAtom);
  const [orderItem,setOrderItem] = useState([]);
  const [storeInfo,setStoreInfo] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState('');
  
  //아임포트 연결 
  //const IMP = window.IMP;
  


    useEffect(()=>{
    const cartNums = location.state?.cartNums; // cartList에서 받아옴 
   
   
    const formData = new FormData();
      formData.append('storeCode', store.storeCode);
      formData.append('check', cartNums);
     
      axiosInToken(token).post('order', formData)
      .then(res=>{
         // 주문 상품 정보 
        setOrderItem(res.data.map(cart => ({ // 중첩구조라 분리 시킴 
        cartNum: cart.cartNum,
        quantity: cart.cartItemCount,
        itemCode: cart.item.itemCode,
        name: cart.item.itemName,
        price: cart.item.itemPrice,
        storage: cart.item.itemStorage,
        category: `${cart.item.itemMajorCategoryName}/${cart.item.itemMiddleCategoryName}/${cart.item.itemSubCategoryName || "-"}`
      })));
        //주문 가맹점 정보
        setStoreInfo(res.data[0].store);//첫번째에 담긴 정보 사용 
      })
      .catch(err=>{
        console.log(err);
      })

  },[token,location.state]);
  
 
 // 결제 방법 변경 시 state 변경
 const handlePaymentSelect = (method) => {
   setSelectedPayment(method);
 };

  // StorageType별로 상품 그룹화
  //reduce(누적값,현재값) : 배열의 값을 누적해서 처리, 배열 요소 순회하며 차례로 처리, 하나의 최종 결과를 반환, 결과는 배열,객체,숫자 등 원하는 형태 가능
  const groupedItems = orderItem.reduce((acc, item) => {
    const groupName = item.storage === "냉동" ? "업체배송" : "일반배송";
    
    // 해당 배열이 없으면 생성
    if (!acc[groupName]) {
      acc[groupName] = [];
    }
    acc[groupName].push(item);
    return acc;
  }, {});

  // 배송 타입별 상품 개수 계산
  //Object.entries 객체를 key-vlalue형태로 반환 
  const itemCounts = Object.entries(groupedItems).reduce((acc, [type, items]) => {
    acc[type] = items.reduce((sum, item) => sum + item.quantity, 0);
    return acc;
  }, {});

  const totalItems = orderItem.reduce((sum, item) => sum + item.quantity, 0);
  
  const calculateTotalPrice = () => {
    return orderItem.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  return (
    <CommonWrapper>
      <CommonContainer size="1240px">
        <ContainerTitleArea>
          <h2>주문/결제</h2>
        </ContainerTitleArea>
        <o.OrderWrap>
          <o.OrderFinalLeft>
          <o.OrderItemWrap>
              <o.OrderFinalTitle>주문상품</o.OrderFinalTitle>
              {Object.entries(groupedItems).map(([groupName, items]) => (
                <o.OrderGroup key={groupName}>
                  <o.OrderGroupTitle>{groupName}</o.OrderGroupTitle>
                  {items.map((item) => (
                    <o.OrderItemList key={item.itemCode}>
                      <div>
                        <o.OrderItemImage src={item.image} alt={item.name} />
                      </div>
                      <o.OrderItemInfo>
                        <o.OrderItemCategory>{item.category}</o.OrderItemCategory>
                        <o.OrderItemName>{item.name}</o.OrderItemName>
                        <o.OrderItemPrice>
                          {(item.quantity * item.price).toLocaleString()}원 / {item.quantity}개
                        </o.OrderItemPrice>
                      </o.OrderItemInfo>
                    </o.OrderItemList>
                  ))}
                </o.OrderGroup>
              ))}
            </o.OrderItemWrap>


            <o.OrderInfoSection>
              <o.OrderFinalTitle>주문자 정보</o.OrderFinalTitle>
              <o.InputField type="text" placeholder="이름" readOnly value={storeInfo.storeName}/>
              <o.InputField type="tel" placeholder="연락처" readOnly value={storeInfo.storePhone}/>
              <o.InputField type="text" placeholder="가맹점코드" readOnly value={storeInfo.storeCode}/>

              <o.OrderFinalTitle>배송지 정보</o.OrderFinalTitle>
              <o.InputField type="text" placeholder="우편번호" readOnly value={storeInfo.storeAddressNum}/>
              <o.InputField type="text" placeholder="기본주소" readOnly value={storeInfo.storeAddress}/>
              {/* <o.InputField type="text" placeholder="상세주소" readOnly/> */}
            </o.OrderInfoSection>
            <o.OrderFinalTitle>결제 방법 선택</o.OrderFinalTitle>
            <StyledButton
            onClick={() => handlePaymentSelect('account')} 
            size="lg" theme={selectedPayment === 'account' ? 'brown' : 'white'} 
            style={{marginRight:"30px"}}>계좌이체</StyledButton>
            <StyledButton onClick={() => handlePaymentSelect('card')}
            size="lg" theme={selectedPayment === 'card' ? 'brown' : 'white'}>카드결제</StyledButton>
           
          </o.OrderFinalLeft>

          <o.OrderFinalRight>
            <o.PaymentSummary>
              <o.ItemQuantitySummary>
                <div>
                  <span>상품개수</span>
                  <span>{totalItems}개</span>
                </div>
                {Object.entries(itemCounts).map(([type, count]) => (
                  <div key={type}>
                    <span>└ {type}</span>
                    <span>{count}개</span>
                  </div>
                ))}
              </o.ItemQuantitySummary>

              <o.PriceRow className="total">
                <span>결제예정금액</span>
                <span>{calculateTotalPrice().toLocaleString()}원</span>
              </o.PriceRow>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <StyledButton theme={"brown"} size="lg"
                onClick={() => navigate("/orderList")}
              >
                {calculateTotalPrice().toLocaleString()}원 결제하기
              </StyledButton>
              </div>
            </o.PaymentSummary>
          </o.OrderFinalRight>
        </o.OrderWrap>
      </CommonContainer>
    </CommonWrapper>
  );
}

export default Order;
