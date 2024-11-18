import {
  CommonWrapper,
  CommonContainer,
  ContainerTitleArea,
} from "../styledcomponent/common.tsx";
import * as ol from "../styledcomponent/orderlist.tsx";
import { StyledButton } from "../styledcomponent/button.tsx";
import { Datepicker } from "flowbite-react";
import { Select, Option, Input } from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function OrderListForMainStore() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [searchType, setSearchType] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedStatus, setSelectedStatus] = useState({});

  const [orders, setOrders] = useState([
    {
      orderDate: "2024-10-21",
      orderNumber: "20241021-0000240",
      productInfo:
        "과테말라 코반 스페셜티/에티오피아 코케허니 G1스페셜티/케냐AA드립백세트(6개입/1box)/에티오피아 코케허니 G1스페셜티 ",
      category: "가공식품/캔류/디카페인",
      quantity: 1,
      price: 8900,
      status: "주문확인중",
    },
    {
      orderDate: "2024-10-21",
      orderNumber: "20241021-0000240",
      productInfo: "과테말라 코반 스페셜티...",
      category: "가공식품/캔류/디카페인",
      quantity: 1,
      price: 8900,
      status: "배송완료",
    },
  ]);

 const handleStatusChange = (orderNumber, newStatus) => {
  setOrders((prevOrders) =>
    prevOrders.map((order) =>
      order.orderNumber === orderNumber ? { ...order, status: newStatus } : order
    )
  );
};
 
  return (
    <CommonWrapper>
      <CommonContainer size="1000px">
        <ContainerTitleArea>
          <h2>주문서관리</h2>
        </ContainerTitleArea>
        <ol.DatePickerWrap>
          <ol.DatePickerInputWrap>
            <Datepicker
              value={startDate}
              onChange={(date) => setStartDate(date)}
              className="flowbite-datepicker"
              showTodayButton={true}
              showClearButton={true}
              dateFormat="yyyy-MM-dd"
            />
            <span>~</span>
            <Datepicker
              value={endDate}
              onChange={(date) => setEndDate(date)}
              className="flowbite-datepicker"
              showTodayButton={true}
              showClearButton={true}
              dateFormat="yyyy-MM-dd"
            />
          </ol.DatePickerInputWrap>
          <StyledButton size="sm" theme="brown">
            조회
          </StyledButton>
        </ol.DatePickerWrap>
        <ol.OrderListWrap>
          <ol.FilterWrapForMainStore>
            <div className="total-count">
              총 <strong>2</strong>건
            </div>
            <form>
              <div className="select-wrap">
                <Select
                  value={searchType}
                  onChange={(val) => setSearchType(val)}
                  label="검색구분"
                >
                  <Option value="">전체</Option>
                  <Option value="status">주문상태</Option>
                  <Option value="store">가맹점</Option>
                </Select>
              </div>
              <div className="input-wrap">
                <Input
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  label="검색어를 입력하세요"
                />
              </div>
              <StyledButton size="sm" theme="brown">
                검색
              </StyledButton>
            </form>
          </ol.FilterWrapForMainStore>

          <ol.MainStoreOrderHeader>
            <div>주문일자</div>
            <div>주문번호</div>
            <div>상품정보</div>
            <div>수량</div>
            <div>상품구매금액</div>
            <div>주문처리</div>
          </ol.MainStoreOrderHeader>
          {orders.map((order) => (
            <ol.MainStoreOrderItem key={order.orderNumber} onClick={()=>navigate("/mainStoreOrderDetail")}>
              <div>{order.orderDate}</div>
              <div>{order.orderNumber}</div>
              <div>{order.productInfo}</div>
              <div>{order.quantity}</div>
              <div>{order.price.toLocaleString()}원</div>
              <ol.StatusAreaWrapper>
                <Select
                  label="선택"
                  value={order.status}
                  disabled={order.status === "배송완료"} 
                >
                  <Option value="">주문처리상태</Option>
                  <Option value="주문확인중">주문확인중</Option>
                  <Option value="결제완료">결제완료</Option>
                  <Option value="배송준비">배송준비</Option>
                  <Option value="배송중">배송중</Option>
                  <Option value="배송완료">배송완료</Option>
                </Select>
                <StyledButton size="sm" theme="white"
                disabled={order.status === "배송완료"}
                onClick={(e) =>{
                  e.stopPropagation(); 
                  handleStatusChange(order.orderNumber, selectedStatus[order.orderNumber]);
                }}>
                  변경
                </StyledButton>
              </ol.StatusAreaWrapper>
            </ol.MainStoreOrderItem>
          ))}
        </ol.OrderListWrap>
      </CommonContainer>
    </CommonWrapper>
  );
}
export default OrderListForMainStore;
