import {
  CommonWrapper,
  CommonContainer,
  ContainerTitleArea,
} from "../styledcomponent/common.tsx";
import * as o from "../styledcomponent/order.tsx";
import { StyledButton } from "../styledcomponent/button.tsx";
import {useNavigate,useLocation} from 'react-router-dom';
import {useState,useEffect}from 'react';
import { useAtomValue,useAtom,useSetAtom } from "jotai/react";
import { tokenAtom, memberAtom,cartCountAtom } from '../../atoms';
import { axiosInToken,url } from '../../config.js';
import axios from 'axios';

function Order() {
  const location = useLocation();
  const navigate = useNavigate();
  const [token,setToken] = useAtom(tokenAtom);
  const store = useAtomValue(memberAtom);
  const [orderItem,setOrderItem] = useState([]);
  const [storeInfo,setStoreInfo] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState('');
  const setCartCount = useSetAtom(cartCountAtom);

    useEffect(()=>{
    const cartNums = location.state?.cartNums; // cartList에서 받아옴 
   
   
    const formData = new FormData();
      formData.append('storeCode', store.storeCode);
      formData.append('check', cartNums);
     
      axiosInToken(token).post('order', formData)
      .then(res=>{

        if(res.headers.authorization!=null) {
          setToken(res.headers.authorization)
      }
         // 주문 상품 정보 
        setOrderItem(res.data.map(cart => ({ // 중첩구조라 분리 시킴 
        cartNum: cart.cartNum,
        quantity: cart.cartItemCount,
        itemCode: cart.item.itemCode,
        name: cart.item.itemName,
        filename:cart.item.itemFileName,
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
    //**결제 시작** 
   //아임포트 연결 (index.html에 cdn추가 ) 
   const { IMP } = window; // IMP(아임포트 모듈) 객체를 IMP window에서 추출
   IMP.init('imp43078557') // 가맹점 식별 코드로 초기화
  
  //1.아임포트 결제 요청  
    const handlePayment = async () => {
      if(selectedPayment === null ||!selectedPayment) {
          alert("결제수단을 선택하세요");
          return;
      }
  
      //2.결제 전 검증절차 및 주문번호 받아오기
      try {
        const paymentRequest = {
          storeCode: parseInt(store.storeCode),
          cartNums: orderItem.map(item =>parseInt(item.cartNum)),
          amount: calculateTotalPrice()
        };

          const res = await axiosInToken(token).post('paymentRequest', paymentRequest);
         
          if(res.headers.authorization!=null) {
            setToken(res.headers.authorization)
        }
          if(res.data.isValidated === false) {
              alert("검증 실패");
              return;
          }
  
          // 백엔드에서 생성한 주문번호 저장
          const merchantUid = res.data.orderCode;
  
          //3.PG사별 결제 요청 데이터 설정
          const requestData = {
              pg: selectedPayment === 'card' ? "html5_inicis" : "kcp.AO09C", // PG사 설정
              pay_method: selectedPayment === 'card' ? "card" : "trans",  // 결제 방법
              merchant_uid: merchantUid,  // 백엔드에서 받은 주문번호 사용
              name: orderItem[0].name + "...",  // 첫번째상품 이름+....
              amount: calculateTotalPrice(), // 결제 가격
              buyer_name: storeInfo.storeName ||"", // 구매자 이름 (buyer_ 부분은 꼭 작성하지 않아도된다. (선택사항))
              buyer_tel: storeInfo.storePhone || "", // 구매자 연락처
              buyer_postcode: store.storeAddressNum ||"", // 구매자 우편번호
              buyer_addr: store.storeAddress || "", // 구매자 주소
              bank_name: selectedPayment === 'transfer' ? '국민' : 'undefined', // 계좌이체은행 설정
              digital: false // 실물컨텐츠여부
          };
  
          //4.결제 요청 (결제창 불러오기)
          // 서버에서 받는 대신 백엔드에서 생성한 주문번호 전달
          // 콜백 
          // 단계1.-생략 (추가할 예정 )
          // 백엔드-api key와 secret으로  서버인증토큰발급과,발급받은 토큰으로 서버와 결제정보 조회 및 검증 (response.imp_uid 값으로 결제 단건조회 API를 호출하여 결제 결과를 확인)
          // if (res.success) {
          //   axiosInToken(token).post(payment/validation/${res.imp_uid})
          // }
          IMP.request_pay(requestData, async (response)=>{
            const {
              success,
              imp_uid,
              error_msg,
              paid_amount,
              status,
              pay_method
          } = response;

          if(success) {
              try {
                  const paymentData = {
                      merchantUid: merchantUid,
                      impUid: imp_uid,
                      totalAmount: paid_amount,
                      cartNums: orderItem.map(item => item.cartNum),
                      storeCode: store.storeCode,
                      paymentMethod: pay_method === 'card' ? '카드결제' : '계좌이체',
                      status: status
                  };
                  console.log(paymentData);
                  const res = await axiosInToken(token).post('paymentComplete', paymentData);
                 
                  if(res.headers.authorization!=null) {
                    setToken(res.headers.authorization)
                }
                  if(res.data) {
                    alert('결제가 완료되었습니다.');
                    // cartCount를 업데이트
                    axiosInToken(token).get(`${url}/cartAllCount?storeCode=${store.storeCode}`)
                    .then(response => {
                      
                      if(response.headers.authorization!=null) {
                        setToken(res.headers.authorization)
                    }
                      setCartCount(response.data);   //jotai 값 세팅
                    })
                    .catch(err=>{
                      console.log(err);
                    })   
                    navigate('/orderList');
                  }
                                    
              } catch (error) {
                  console.error('주문 처리 실패:', error);
                  alert('주문 처리 중 오류가 발생했습니다.');
              }
          } else {
              alert(`결제 실패: ${error_msg}`);
          }
      });

  } catch(err) {
      console.error(err);
      alert('결제 요청 중 오류가 발생했습니다.');
  }
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
                        <o.OrderItemImage src={`${url}/image/${item.filename}`} alt={item.name} />
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
              <o.InputGroup>
              <o.InputLabel>가맹점명</o.InputLabel>  
              <o.InputField type="text" placeholder="이름" readOnly value={storeInfo.storeName}/>
              </o.InputGroup>
              <o.InputGroup>
              <o.InputLabel>연락처</o.InputLabel>  
              <o.InputField type="tel" placeholder="연락처" readOnly value={storeInfo.storePhone}/>
              </o.InputGroup>
              <o.InputGroup>
              <o.InputLabel>점주명</o.InputLabel>  
              <o.InputField type="text" placeholder="점주명" readOnly value={storeInfo.ownerName}/>
              </o.InputGroup> 
              <o.OrderFinalTitle>배송지 정보</o.OrderFinalTitle>
              <o.InputGroup>
              <o.InputLabel>우편번호</o.InputLabel>   
              <o.InputField type="text" placeholder="우편번호" readOnly value={storeInfo.storeAddressNum}/>
              </o.InputGroup>
              <o.InputGroup>
              <o.InputLabel>주소</o.InputLabel>  
              <o.InputField type="text" placeholder="기본주소" readOnly value={storeInfo.storeAddress}/>
              </o.InputGroup>
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
        <div className="flex justify-center gap-4 mt-24 mb-10">
            <StyledButton size="md" theme="brown" onClick={() => navigate(-1)}>
              결제 취소
            </StyledButton>
          </div>
      </CommonContainer>
    </CommonWrapper>
  );
}

export default Order;
