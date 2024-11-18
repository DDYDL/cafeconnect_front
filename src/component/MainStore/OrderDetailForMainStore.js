import {
  CommonWrapper,
  CommonContainer,
  ContainerTitleArea,
} from "../styledcomponent/common.tsx";
import * as od from "../styledcomponent/orderdetail.tsx";
import { StyledButton } from "../styledcomponent/button.tsx";

function OrderDetailForMainStore() {
  const orderDetail = {
    orderNumber: "Y05539532",
    orderDate: "2024.10.02",
    items: [
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
    ],
    totalCount: {
      total: 4,
      normal: 4,
      cold: 0,
    },
    payment: {
      totalOrder: 153300,
      totalProduct: 153300,
      finalAmount: 133831,
    },
    delivery: {
      receiver: "독산점",
      phone: "010-****-4743",
      address: "서울시 금천구",
      message: "",
    },
    orderer: {
      name: "박*연",
      phone: "010-****-4743",
    },
    paymentMethod: {
      type: "신용카드",
      detail: "삼성카드 / 일시불",
      amount: 133831,
    },
  };

  return (
    <CommonWrapper>
      <CommonContainer size="1000px">
        <ContainerTitleArea>
          <h2>주문상세</h2>
        </ContainerTitleArea>
        <od.OrderDetailWrap>
        <od.SectionTitle>
            <h4>주문자 정보</h4>
          </od.SectionTitle>
          <od.InfoTable>
            <tbody>
              <tr>
                <th>주문자</th>
                <td>{orderDetail.delivery.receiver}</td>
              </tr>
              <tr>
                <th>휴대폰번호</th>
                <td>{orderDetail.delivery.phone}</td>
              </tr>
              <tr>
                <th>배송지 주소</th>
                <td>{orderDetail.delivery.address}</td>
              </tr>
              <tr>
                <th>주문번호</th>
                <td>{orderDetail.orderNumber}</td>
                <th>주문상태</th>
                <td>결제완료</td>
              </tr>
              <tr>
                <th>주문일</th>
                <td>{orderDetail.orderDate}</td>
                <th>결제일</th>
                <td>{orderDetail.orderDate}</td>
              </tr>
            </tbody>
          </od.InfoTable>
          <od.SectionTitle>
            <h4>주문 상품</h4>
          </od.SectionTitle>
          <od.OrderItemHeader>
            <div>상품정보</div>
            <div>수량</div>
            <div>총 상품 금액</div>
            <div>배송</div>
            <div>진행상황</div>
          </od.OrderItemHeader>

          {orderDetail.items.map((item, index) => (
            <od.OrderItemRow key={index}>
              <od.ProductWrap>
                <od.ProductImage>
                  <img src={item.image} alt={item.name} />
                </od.ProductImage>
                <od.ProductInfo>
                  <p className="categoryformat">{item.category}</p>
                  <p className="name">{item.name}</p>
                  <p className="storage-type">{item.storageType}</p>
                </od.ProductInfo>
              </od.ProductWrap>
              <div>{item.quantity}</div>
              <div>{(item.price * item.quantity).toLocaleString()}원</div>
              <div>{item.shipping}</div>
              <div>배송완료</div>
            </od.OrderItemRow>
          ))}
          <od.SectionTitle>
            <h4>결제정보</h4>
          </od.SectionTitle>

          <od.PaymentInfoGrid>
            <od.PaymentColumn>
              <od.PaymentRow isHeader>
                <div className="payment-item">
                  <span className="label">총 주문 개수</span>
                  <span className="value">
                    {orderDetail.totalCount.total}개
                  </span>
                </div>
              </od.PaymentRow>
              <od.PaymentRow>
                <div className="payment-item">
                  <span className="label">일반 상품</span>
                  <span className="value">
                    {orderDetail.totalCount.normal}개
                  </span>
                </div>
                <div className="payment-item">
                  <span className="label">냉동 상품</span>
                  <span className="value">{orderDetail.totalCount.cold}개</span>
                </div>
              </od.PaymentRow>
            </od.PaymentColumn>

            <od.PaymentColumn>
              <od.PaymentRow isHeader>
                <div className="payment-item">
                  <span className="label">결제 수단</span>
                  <span className="value">
                    {orderDetail.paymentMethod.type}
                  </span>
                </div>
              </od.PaymentRow>
              <od.PaymentRow>
                <div className="payment-item">
                  <span className="value">
                    {orderDetail.paymentMethod.detail}
                  </span>
                </div>
              </od.PaymentRow>
            </od.PaymentColumn>

            <od.PaymentColumn>
              <od.PaymentRow isHeader>
                <div className="payment-item">
                  <span className="label">총 결제금액</span>
                  <span className="value red">
                    {orderDetail.payment.finalAmount.toLocaleString()}원
                  </span>
                </div>
              </od.PaymentRow>
              <od.PaymentRow>
                <div className="payment-item">
                  <span className="value">
                    {/* 추가 결제 정보가 필요한 경우 */}
                  </span>
                </div>
              </od.PaymentRow>
            </od.PaymentColumn>
          </od.PaymentInfoGrid>

          <od.ButtonWrapper>
            <StyledButton size="md" theme="brown">
              확인 
            </StyledButton>
          </od.ButtonWrapper>
        </od.OrderDetailWrap>
      </CommonContainer>
    </CommonWrapper>
  );
}

export default OrderDetailForMainStore;
