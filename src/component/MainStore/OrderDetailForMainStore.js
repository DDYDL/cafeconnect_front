import {
  CommonWrapper,
  CommonContainer,
  ContainerTitleArea,
} from "../styledcomponent/common.tsx";
import * as od from "../styledcomponent/orderdetail.tsx";
import { StyledButton } from "../styledcomponent/button.tsx";
import { tokenAtom, memberAtom } from "../../atoms";
import { axiosInToken } from "../../config.js";
import { useAtomValue,useAtom } from "jotai/react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { url } from "../../config.js";
import { format } from "date-fns";

function OrderDetailForMainStore() {
  const [orderDetail, setOrderDetail] = useState(null);
  const { orderCode } = useParams();
  const [token,setToken] = useAtom(tokenAtom);
  const navigate = useNavigate();
  
  // const isPaymentCanceled =
  //   orderDetail?.paymentDetail?.paymentStatus !== "paid";

    const isPaymentCanceled =
    orderDetail?.orderState === "주문취소";


    useEffect(() => {
    if (token && orderCode) getOrderInfo(orderCode);
  }, [token, orderCode]);

  const getOrderInfo = (code) => {
    if (!code) return;

    const formData = new FormData();
    formData.append("orderCode", code);

    axiosInToken(token)
      .post("mainStoreOrderDetail", formData)
      .then((res) => {

        if(res.headers.authorization!=null) {
          setToken(res.headers.authorization)
      }
        console.log(res.data);
        const details = res.data.orderDetail;
        const paymentInfo = res.data.paymentInfo;

        const processedDetail = {
          orderCode: details[0].orderCode,
          orderDate: details[0].orderDate,
          orderState: details[0].orderState,
          orderPayment: details[0].orderPayment,
          storeName: details[0].storeName,
          storeAddressNum: details[0].storeAddressNum,
          storeAddress: details[0].storeAddress,
          storePhone: details[0].storePhone,
          ownerName: details[0].ownerName,
          items: details.map((item) => ({
            itemCode: item.itemCode,
            itemName: item.itemName,
            itemStorage: item.itemStorage,
            itemCategroy: `${item.itemMajorCategoryName}/${
              item.itemMiddleCategoryName
            }/${item.itemSubCategoryName || "-"}`,
            itemMajorCategoryName: item.itemMajorCategoryName,
            itemMiddleCategoryName: item.itemMiddleCategoryName,
            itemSubCategoryName: item.itemSubCategoryName,
            orderCount: item.orderCount,
            orderDelivery: item.orderDelivery,
            itemPrice: item.itemPrice,
            totalPrice: item.orderCount * item.itemPrice,
            itemFileNum: item.itemFileNum,
            itemFileName:item.itemFileName,
          })),
          totalAmount: details.reduce(
            (sum, item) => sum + item.itemPrice * item.orderCount,
            0
          ),
          totalCount: details.reduce(
            (count, item) => count + item.orderCount,
            0
          ),
          normalCount: details.reduce(
            (count, item) =>
              item.itemStorage !== "냉동" ? count + item.orderCount : count,
            0
          ),
          iceCount: details.reduce(
            (count, item) =>
              item.itemStorage === "냉동" ? count + item.orderCount : count,
            0
          ),
        };

        if (paymentInfo) {
          processedDetail.paymentDetail = paymentInfo.response;
        }

        setOrderDetail(processedDetail);
      })
      .catch((err) => {
        console.error("주문 상세 조회 실패:", err);
      });
  };

  if (!orderDetail) {
    return (
      <CommonWrapper>
        <CommonContainer size="1000px">
          <ContainerTitleArea>
            <h2>주문상세</h2>
          </ContainerTitleArea>
          <div className="flex justify-center items-center h-[400px]">
            로딩중...
          </div>
        </CommonContainer>
      </CommonWrapper>
    );
  }
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
                <td>{orderDetail.storeName}</td>
              </tr>
              <tr>
                <th>전화번호</th>
                <td>{orderDetail.storePhone || "-"}</td>
              </tr>
              <tr>
                <th>배송지 주소</th>
                <td>
                  ({orderDetail.storeAddressNum || "-"})
                  {orderDetail.storeAddress || "-"}
                </td>
              </tr>
              <tr>
                <th>주문번호</th>
                <td>{orderDetail.orderCode}</td>
                <th>주문상태</th>
                <td>
                  <em>{orderDetail.orderState}</em>
                </td>
              </tr>
              <tr>
                <th>주문일</th>
                <td>{format(new Date(orderDetail.orderDate), "yyyy-MM-dd")}</td>
                <th>결제일</th>
                <td>{orderDetail?.paymentDetail?.paidAt && format(new Date(orderDetail?.paymentDetail?.paidAt), "yyyy-MM-dd")}</td>
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
          </od.OrderItemHeader>

          {orderDetail.items.map((item, index) => (
            <od.OrderItemRow key={index}>
              <od.ProductWrap>
                <od.ProductImage>
                  <img
                    src={`${url}/image/${item.itemFileName}`}
                    alt={item.itemName}
                  />
                </od.ProductImage>
                <od.ProductInfo>
                  <p className="categoryformat">{item.itemCategroy}</p>
                  <p className="name">{item.itemName}</p>
                  <p className="storage-type">
                    <od.ItemStorageType $storageway={item.itemStorage}>
                      {item.itemStorage}
                    </od.ItemStorageType>
                  </p>
                </od.ProductInfo>
              </od.ProductWrap>
              <div>{item.orderCount}</div>
              <div>{item.totalPrice.toLocaleString()}원</div>
              <div>{item.orderDelivery}</div>
            </od.OrderItemRow>
          ))}
          <od.SectionTitle>
            <h4>결제정보</h4>
          </od.SectionTitle>

          <od.PaymentInfoGrid>
            <od.PaymentColumn>
              <od.PaymentRow $isheader>
                <div className="payment-item">
                  <span className="label">총 주문 개수</span>
                  <span className="value">{orderDetail.totalCount}개</span>
                </div>
              </od.PaymentRow>
              <od.PaymentRow>
                <div className="payment-item">
                  <span className="label">일반 상품</span>
                  <span className="value">
                    <span className="value">{orderDetail.normalCount}개</span>
                  </span>
                </div>
                <div className="payment-item">
                  <span className="label">냉동 상품</span>
                  <span className="value">{orderDetail.iceCount}개</span>
                </div>
              </od.PaymentRow>
            </od.PaymentColumn>

            <od.PaymentColumn>
              <od.PaymentRow $isheader>
                <div className="payment-item">
                  <span className="label">결제 수단</span>
                  <span className="value">{orderDetail.orderPayment}</span>
                </div>
              </od.PaymentRow>

              {orderDetail.orderPayment === "카드결제" && (
                <>
                  <od.PaymentRow>
                    <div className="payment-item">
                      <span className="value">
                        {orderDetail.paymentDetail?.cardName}(
                        {orderDetail.paymentDetail?.cardNumber})
                      </span>
                    </div>
                  </od.PaymentRow>
                </>
              )}
              {orderDetail.orderPayment === "계좌이체" && (
                <>
                  <od.PaymentRow>
                    <div className="payment-item">
                      <span className="value">
                        {orderDetail.paymentDetail.bankName}
                      </span>
                    </div>
                  </od.PaymentRow>
                </>
              )}
              <od.PaymentRow>
                <div className="payment-item">
                  <span className="label">결제 상태</span>
                  <span
                    className={`value payment-status ${
                      orderDetail.orderState !== "주문취소"
                        ? "paid"
                        : "cancelled"
                    }`}
                  >
                    {/* api 결제 상태로 해야하지만, 밤 11시 이후 status가 cancelled 바뀜  
                    {orderDetail.paymentDetail.paymentStatus === "paid" */}
                    {orderDetail.orderState !== "주문취소"
                      ? "결제완료"
                      : "결제취소"}
                  </span>
                </div>
              </od.PaymentRow>
            </od.PaymentColumn>
            <od.PaymentColumn>
              <od.PaymentRow $isheader>
                <div className="payment-item">
                  <span className="label">총 결제금액</span>
                  <span
                    className={`value ${
                      isPaymentCanceled ? "canceled" : "red"
                    }`}
                  >
                    {orderDetail.totalAmount.toLocaleString()}원
                  </span>
                </div>
              </od.PaymentRow>
              {isPaymentCanceled && (
                <>
                  <od.PaymentRow>
                    <div className="payment-item">
                      <span className="label">취소 금액</span>
                      <span className="value cancel-amount red">
                        {orderDetail.paymentDetail?.cancelAmount.toLocaleString()}
                        원
                      </span>
                    </div>
                  </od.PaymentRow>
                  <od.PaymentRow>
                    <div className="payment-item">
                      <span className="label">취소 사유</span>
                      <span className="value">
                        {orderDetail.paymentDetail?.cancelReason ||
                          "가맹점 주문 취소"}
                      </span>
                    </div>
                  </od.PaymentRow>
                </>
              )}
            </od.PaymentColumn>
          </od.PaymentInfoGrid>

          <od.ButtonWrapper>
            <StyledButton
              size="md"
              theme="brown"
              onClick={() => navigate("/mainStoreOrderList")}
            >
              목록
            </StyledButton>
          </od.ButtonWrapper>
        </od.OrderDetailWrap>
      </CommonContainer>
    </CommonWrapper>
  );
}

export default OrderDetailForMainStore;
