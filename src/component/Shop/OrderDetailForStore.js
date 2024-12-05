
import {CommonWrapper, CommonContainer, ContainerTitleArea} from "../styledcomponent/common.tsx";
import * as od from '../styledcomponent/orderdetail.tsx';
import {StyledButton} from '../styledcomponent/button.tsx';
import { tokenAtom, memberAtom } from '../../atoms';
import { axiosInToken } from '../../config.js';  
import { useAtomValue } from 'jotai/react';
import { useParams,useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import { ko } from "date-fns/locale/ko";
import { format } from "date-fns";
function OrderDetailForStore() {
    const [orderDetail, setOrderDetail] = useState(null);
    const { orderCode } = useParams();
    const store = useAtomValue(memberAtom);
    const token = useAtomValue(tokenAtom);
    const navigate = useNavigate();

    useEffect(()=>{
        if (token && store?.storeCode && orderCode) 
            getOrderInfo(orderCode);
    },[token,store?.storeCode, orderCode]);

    const getOrderInfo = (code)=>{
        const formData = new FormData();
        formData.append("storeCode", store.storeCode);
        formData.append("orderCode", code);
        axiosInToken(token).post('orderDetail',formData)
        .then(res=>{
             console.log(res.data);
              // 응답 데이터 가공
          const details = res.data;
          const processedDetail = {
            orderCode: details[0].orderCode,
            orderDate: details[0].orderDate,
            orderState: details[0].orderState,
            orderPayment: details[0].orderPayment,
            orderDelivery: details[0].orderDelivery,
            items: details.map(item => ({
              itemCode: item.itemCode,
              itemName: item.itemName,
              orderCount: item.orderCount,
              itemPrice: item.itemPrice,
              totalPrice: item.orderCount * item.itemPrice
            })),
            totalAmount: details.reduce((sum, item) => 
              sum + (item.itemPrice * item.orderCount), 0)
          };
          
          setOrderDetail(processedDetail);
        })
        .catch(err=>{
            console.error("주문 상세 조회 실패:", err);
        });
    
    };
     if (!orderDetail) {
            return <div>로딩중...</div>;
     }

    return (
        <CommonWrapper>
            <CommonContainer size="1000px">
                <ContainerTitleArea><h2>주문상세</h2></ContainerTitleArea>
                <od.OrderDetailWrap>
                <od.OrderBasicInfo>
                        <li>
                            <strong>주문번호</strong>
                            <em>{orderDetail.orderCode}</em>
                        </li>
                        <li>
                            <strong>주문일</strong>
                            <em>{format(new Date(orderDetail.orderDate), "yyyy-MM-dd")}</em>
                        </li>
                    </od.OrderBasicInfo>

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
                                    <img src={item.image} alt={item.itemName} />
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
                <od.PaymentRow isHeader >
                    <div className="payment-item">
                        <span className="label">총 주문 개수</span>
                        {/* <span className="value">{orderDetail.totalCount.total}개</span> */}
                    </div>
                </od.PaymentRow>
                <od.PaymentRow>
                    <div className="payment-item">
                        <span className="label">일반 상품</span>
                        {/* <span className="value">{orderDetail.totalCount.normal}개</span> */}
                    </div>
                    <div className="payment-item">
                        <span className="label">냉동 상품</span>
                        {/* <span className="value">{orderDetail.totalCount.cold}개</span> */}
                    </div>
                </od.PaymentRow>
            </od.PaymentColumn>

            <od.PaymentColumn>
                <od.PaymentRow isHeader>
                    <div className="payment-item">
                        <span className="label">결제 수단</span>
                        {/* <span className="value">{orderDetail.paymentMethod.type}</span> */}
                    </div>
                </od.PaymentRow>
                <od.PaymentRow>
                    <div className="payment-item">
                        {/* <span className="value">{orderDetail.paymentMethod.detail}</span> */}
                    </div>
                </od.PaymentRow>
            </od.PaymentColumn>

            <od.PaymentColumn>
                <od.PaymentRow isHeader>
                    <div className="payment-item">
                        <span className="label">총 결제금액</span>
                        <span className="value red">
                            {/* {orderDetail.payment.finalAmount.toLocaleString()}원 */}
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

                    <od.SectionTitle>
                        <h4>주문자 정보</h4>
                    </od.SectionTitle>

                    <od.InfoTable>
                        <tbody>
                            <tr>
                                <th>주문자</th>
                                {/* <td>{orderDetail.delivery.receiver}</td> */}
                            </tr>
                            <tr>
                                <th>휴대폰번호</th>
                                {/* <td>{orderDetail.delivery.phone}</td> */}
                            </tr>
                            <tr>
                                <th>배송지 주소</th>
                                {/* <td>{orderDetail.delivery.address}</td> */}
                            </tr>
                       
                        </tbody>
                    </od.InfoTable>

                    <od.ButtonWrapper>
                        <StyledButton size="md" theme="brown">목록</StyledButton>
                    </od.ButtonWrapper>
                </od.OrderDetailWrap>
            </CommonContainer>
        </CommonWrapper>
    );
}

export default OrderDetailForStore;