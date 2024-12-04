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
import axios from "axios";

function Order() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = useAtomValue(tokenAtom);
  const store = useAtomValue(memberAtom);
  const [orderCode,setOrderCode] = useState(''); // 결제 전 검증 절차 후 주문번호 받아옴 
  const [orderItem,setOrderItem] = useState([]);
  const [storeInfo,setStoreInfo] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState('');
  
  //아임포트 연결 (index.html에 cdn추가 ) 
  const { IMP } = window; // IMP(아임포트 모듈) 객체를 IMP window에서 추출
  IMP.init('imp43078557') // 가맹점 식별 코드로 초기화



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


 
  // 결제 방법 변경 시 state 변경
  const handlePaymentSelect = (method) => {
    setSelectedPayment(method);
  };


  //결제 사전 검증 (주문번호 받아오기)
  const orderCheck=()=>{
    
    const formData = new FormData();
    formData.append('amount', store.storeCode);
    formData.append('cartNums',orderItem.map(item=>item.cartNum));
    formData.append('amount',calculateTotalPrice());
   
    axiosInToken(token).post('paymentRequest', formData)
    .then(res=>{
      setOrderCode(res.data.orderCode);
      console.log(res.data);
      if(res.data.isValidated === false){
        alert("검증 실패");
        return;
      } 
    })
    .catch(err=>{
      console.log(err);
    })
  }

  //결제 창 불러오기 (IMP.request_pay() 함수를 호출,결제 수단에따른 결제창 열기) 
  // pay_method: CARD면 이니시스 TRANSFER  KCP  PG사 이용 
  const requsetData = {
    pg: selectedPayment === 'card'?"html5_inicis":"kcp.AO09C",   // PG사 설정
    pay_method : selectedPayment ==='card'?"card":"trans", // 결제 방법
    merchant_uid : orderCode,  // 주문 번호
    name : orderItem.map(item=>item.name)[0]+"...", // 첫번째상품 이름+....
    amount: calculateTotalPrice(), // 결제 가격
    buyer_name : storeInfo.storeName, // 구매자 이름 (buyer_ 부분은 꼭 작성하지 않아도된다. (선택사항))
    buyer_tel : storeInfo.storePhone, // 구매자 연락처
    buyer_postcode : store.storeAddressNum, // 구매자 우편번호
    buyer_addr : store.storeAddress, // 구매자 주소
 
    //테스트모드 계좌이체의 경우 필수 파라미터 테스트 모드는 계좌이체 결제x 바로 이체 성공 됨 
    //KCP 계좌이체필수 파라미터
    bank_name: selectedPayment==='transfer'?'국민':'undefined', // 계좌이체은행 설정
    digital:false// 실물컨텐츠여부
  } ;
  
  const handlePayment=()=>{
    if(selectedPayment ===null) {
      alert("결제수단을 선택하세요");
      return;
    }
    orderCheck(); // 결제 전 검증절차 및 주문번호 받아오기 
    
    //결제 요청
    IMP.request_pay(requsetData, 
    function (res) {
      // 결제 종료 시 호출되는 콜백 함수
      // response.imp_uid 값으로 결제 단건조회 API를 호출하여 결제 결과를 확인하고,
      // 결제 결과를 처리하는 로직을 작성합니다.
      if (res.success) {
        axios({
            method: "post",
            url: `/payment/validation/${res.imp_uid}`
        })
      // 응답 데이터의 정보들
        console.log("Payment success!");
        console.log("Payment ID : " + res.imp_uid);
        console.log("Order ID : " + res.merchant_uid);
        console.log("Payment Amount : " + res.paid_amount);
    } else {
        console.error(res.error_msg);
    }  
    
    },
    );
  }

  //결제 완료 검증
  const callback=()=>{

  }

  
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
            onClick={() => handlePaymentSelect('transfer')} 
            size="lg" theme={selectedPayment === 'transfer' ? 'brown' : 'white'} 
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
                onClick={() => handlePayment()}
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
