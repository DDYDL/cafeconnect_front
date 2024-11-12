import {
  CommonWrapper,
  CommonContainer,
  ContainerTitleArea,
} from "../styledcomponent/common.tsx";
import * as o from "../styledcomponent/order.tsx";
import { StyledButton } from "../styledcomponent/button.tsx";
import {useNavigate} from 'react-router-dom';
import {useState}from 'react';

function Order() {
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState('');

  const orderItem = [
    {
      itemCode: 1,
      name: "에티오피아 코케허니 G1스페셜티",
      price: 24800,
      quantity: 2,
      image: "/image/item1.jpg",
      category: "major/middel/sub",
      shipping: "기본배송",
      storageType: "냉동",
    },
    {
        itemCode: 1,
        name: "에티오피아 코케허니 G1스페셜티",
        price: 24800,
        quantity: 2,
        image: "/image/item1.jpg",
        category: "major/middel/sub",
        shipping: "기본배송",
        storageType: "냉동",
      },
    {
      itemCode: 2,
      name: "에티오피아 코케허니 G1스페셜티",
      price: 24800,
      quantity: 3,
      image: "/image/item1.jpg",
      category: "major/middel/sub",
      shipping: "기본배송",
      storageType: "일반",
    },
    {
        itemCode: 1,
        name: "에티오피아 코케허니 G1스페셜티",
        price: 24800,
        quantity: 2,
        image: "/image/item1.jpg",
        category: "major/middel/sub",
        shipping: "기본배송",
        storageType: "냉동",
      },
    
  ]; 



 // 결제 방법 변경 시 state 변경
 const handlePaymentSelect = (method) => {
   setSelectedPayment(method);
 };

  // StorageType별로 상품 그룹화
  //reduce 로 배열 요소 순회하며 차례로 처리, 하나의 최종 결과를 반환, 결과는 배열,객체,숫자 등 원하는 형태 가능
  const groupedItems = orderItem.reduce((acc, item) => {
    const groupName = item.storageType === "냉동" ? "업체배송" : "일반배송";
    if (!acc[groupName]) {
      acc[groupName] = [];
    }
    acc[groupName].push(item);
    return acc;
  }, {});

  // 배송 타입별 상품 개수 계산
  //Object.entries 객체를 key-vlalue로 반환 
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
              <o.InputField type="text" placeholder="이름" />
              <o.InputField type="tel" placeholder="연락처" />
              <o.InputField type="text" placeholder="이메일" />

              <o.OrderFinalTitle>배송지 정보</o.OrderFinalTitle>
              <o.InputField type="text" placeholder="우편번호" />
              <o.InputField type="text" placeholder="기본주소" />
              <o.InputField type="text" placeholder="상세주소" />
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
                onClick={() => navigate("/shopmain")}
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
