import { Input, Option, Select } from "@material-tailwind/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ko } from "date-fns/locale/ko";
import { format } from "date-fns";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInToken } from "../../config.js";
import { useAtomValue } from "jotai/react";
import { tokenAtom, memberAtom } from "../../atoms";
import { StyledButton } from "../styledcomponent/button.tsx";
import { XMarkIcon,MagnifyingGlassIcon, ArrowRightIcon, ArrowLeftIcon} from "@heroicons/react/24/outline";
import { CommonContainer, CommonWrapper, ContainerTitleArea } from "../styledcomponent/common.tsx";
import * as ol from "../styledcomponent/orderlist.tsx";

function OrderListForMainStore() {
  const store = useAtomValue(memberAtom);
  const token = useAtomValue(tokenAtom);
  const navigate = useNavigate();
  const today = new Date();
  const monthAgo = new Date(today);
  monthAgo.setMonth(today.getMonth() - 1);
  const [startDate, setStartDate] = useState(monthAgo);
  const [endDate, setEndDate] = useState(today);
  const [searchType, setSearchType] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedStatus, setSelectedStatus] = useState({});
  const [orderList, setOrderList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [status, setStatus] = useState("");
  const [orders,setOrders] =useState([]);
  
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


  const handleStatusChange = (orderNumber, newStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.orderNumber === orderNumber ? { ...order, status: newStatus } : order
      )
    );
  };

  const search=()=>{
     
    if(!searchType) {
        alert("필수 항목을 모두 입력해주세요");
      }
      submit();
  }
  return (
    <CommonWrapper>
      <CommonContainer size="1000px">
        <ContainerTitleArea>
          <h2>주문접수 관리</h2>
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
                  <Option value="name">상품명</Option>
                  <Option value="status">처리상태</Option>
                  <Option value="kind">수리항목</Option>
                </Select>
              </div>
              <div className="input-wrap">
              <Input icon={<MagnifyingGlassIcon className="h-5 w-5" onClick={search}/> } label="검색어를 입력하세요"  onChange={(e) => setSearchKeyword(e.target.value)}/>
              </div>
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
          {orders.map(order => (
            <ol.MainStoreOrderItem
              key={order.orderNumber}
              onClick={() => navigate("/mainStoreOrderDetail")}
            >
              <div>{order.orderDate}</div>
              <div>{order.orderNumber}</div>
              <div>{order.productInfo}</div>
              <div>{order.quantity}</div>
              <div>{order.price.toLocaleString()}원</div>
              <ol.StatusAreaWrapper>
                <Select label="선택" value={order.status} disabled={order.status === "배송완료"}>
                  <Option value="">주문처리상태</Option>
                  <Option value="주문확인중">주문확인중</Option>
                  <Option value="결제완료">결제완료</Option>
                  <Option value="배송준비">배송준비</Option>
                  <Option value="배송중">배송중</Option>
                  <Option value="배송완료">배송완료</Option>
                </Select>
                <StyledButton
                  size="sm"
                  theme="white"
                  disabled={order.status === "배송완료"}
                  onClick={e => {
                    e.stopPropagation();
                    handleStatusChange(order.orderNumber, selectedStatus[order.orderNumber]);
                  }}
                >
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
