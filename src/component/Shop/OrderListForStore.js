import {
  CommonWrapper,
  CommonContainer,
  ContainerTitleArea,
} from "../styledcomponent/common.tsx";
import * as ol from "../styledcomponent/orderlist.tsx";
import { StyledButton } from "../styledcomponent/button.tsx";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ko } from "date-fns/locale/ko";
import { format } from "date-fns";
import { Select, Option } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInToken } from "../../config.js";
import { useAtomValue } from "jotai/react";
import { tokenAtom, memberAtom } from "../../atoms";
function OrderListForStore() {
  const today = new Date();
  const monthAgo = new Date(today);
  monthAgo.setMonth(today.getMonth() - 1);
  const [startDate, setStartDate] = useState(monthAgo);
  const [endDate, setEndDate] = useState(today);
  const [status, setStatus] = useState("");
  const [orderList, setOrderList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const store = useAtomValue(memberAtom);
  const token = useAtomValue(tokenAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (token != null && token !== "") submit();
  }, [token, store.storeCode]);

  const handleStatusChange=(val)=>{
    setStatus(val);
    submit();
  }

  const submit = () => {
    const formData = new FormData();
    formData.append("storeCode", store.storeCode);
    formData.append("startDate", format(startDate, "yyyy-MM-dd"));
    formData.append("endDate", format(endDate, "yyyy-MM-dd"));
    if (status) formData.append("orderState", status);

    axiosInToken(token)
      .post("orderListForStore", formData)
      .then((res) => {
        console.log(res.data);
        setOrderList(res.data.orderList || []);
        setTotalCount(res.data.totalCount || 0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const cancelOrder = () => {};

  return (
    <CommonWrapper>
      <CommonContainer size="1000px">
        <ContainerTitleArea>
          <h2>주문내역</h2>
        </ContainerTitleArea>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
          <ol.DatePickerWrap>
            <ol.DatePickerInputWrap>
              <DatePicker
                slotProps={{ textField: { size: "small" } }}
                label="연-월-일"
                format="yyyy-MM-dd"
                value={startDate}
                onChange={(newValue) => setStartDate(new Date(newValue))}
              />
              <span>~</span>
              <DatePicker
                slotProps={{ textField: { size: "small" } }}
                label="연-월-일"
                format="yyyy-MM-dd"
                value={endDate}
                onChange={(newValue) => setEndDate(new Date(newValue))}
              />
            </ol.DatePickerInputWrap>
            <StyledButton size="sm" theme="brown" onClick={submit}>
              조회
            </StyledButton>
          </ol.DatePickerWrap>
        </LocalizationProvider>

        <ol.OrderListWrap>
          <ol.FilterWrapForStore>
            <div className="total-count">
              총 <strong>{totalCount}</strong>건
            </div>
            <div className="status-option">
              <Select value={status}  onChange={handleStatusChange}>
                <Option value="">전체</Option>
                <Option value="상품준비중">주문접수</Option>
                <Option value="배송중">배송중</Option>
                <Option value="배송완료">배송완료</Option>
                <Option value="주문취소">주문취소</Option>
              </Select>
            </div>
          </ol.FilterWrapForStore>

          <ol.OrderHeader>
            <div>주문일자</div>
            <div>주문번호</div>
            <div>상품정보</div>
            <div>수량</div>
            <div>상품구매금액</div>
            <div>주문처리상태</div>
            <div>취소신청</div>
          </ol.OrderHeader>
          {orderList && orderList.length > 0 ? (
  orderList.map((order, index) => (
    <ol.OrderItem
      key={index}
      onClick={() => navigate(`/orderDetail/${order.orderCode}`)}
    >
      <div>{format(new Date(order.orderDate), "yyyy-MM-dd")}</div>
      <div>{order.orderCode}</div>
      <div>{order.orderItems.map(item => item.itemName).join(", ")}</div>
      <div>{order.orderItems.reduce((sum, item) => sum + item.orderCount, 0)}</div>
      <div>{order.totalAmount.toLocaleString()}원</div>
      <div>{order.orderState}</div>
      <div>
        {order.orderState !== "주문접수" ? (
          <span>취소불가</span>
        ) : (
          <StyledButton
            size="sm"
            theme="white"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            취소
          </StyledButton>
        )}
      </div>
    </ol.OrderItem>
  ))
) : (
  <div>주문 내역이 없습니다.</div>
)}
        </ol.OrderListWrap>
      </CommonContainer>
    </CommonWrapper>
  );
}
export default OrderListForStore;
