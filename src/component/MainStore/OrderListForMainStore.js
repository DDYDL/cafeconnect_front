import { Input, Option, Select } from "@material-tailwind/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ko } from "date-fns/locale/ko";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInToken } from "../../config.js";
import { useAtomValue,useAtom } from "jotai/react";
import { tokenAtom, memberAtom } from "../../atoms";
import { StyledButton } from "../styledcomponent/button.tsx";
import { XMarkIcon,MagnifyingGlassIcon, ArrowRightIcon, ArrowLeftIcon} from "@heroicons/react/24/outline";
import { CommonContainer, CommonWrapper, ContainerTitleArea } from "../styledcomponent/common.tsx";
import * as ol from "../styledcomponent/orderlist.tsx";
import * as s from '../styles/StyledStore.tsx';
function OrderListForMainStore() {
  const store = useAtomValue(memberAtom);
  const [token,setToken] = useAtom(tokenAtom);
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
  const [pageBtn, setPageBtn] = useState([]);
  const [pageInfo, setPageInfo] = useState({});

  useEffect(() => {
    if (token != null && token !== "") submit(1);
  }, [token]);


  const submit = (page) => {
    const formData = new FormData();
    formData.append("startDate", format(startDate, "yyyy-MM-dd"));
    formData.append("endDate", format(endDate, "yyyy-MM-dd"));
    formData.append("page",page);
    if (searchType && searchKeyword) {
      formData.append("searchType", searchType);
      formData.append("keyword", searchKeyword);
    }

    axiosInToken(token)
      .post("/mainStoreOrderList", formData)
      .then((res) => {

        if(res.headers.authorization!=null) {
          setToken(res.headers.authorization)
      }
      let pageInfo = res.data.pageInfo;
      console.log(pageInfo);
      let page = [];
        for(let i=pageInfo.startPage; i<=pageInfo.endPage; i++) {
            page.push(i);
        }
        setPageBtn([...page]);
        setPageInfo(pageInfo);
        setOrderList(res.data.orderList || []);
        setTotalCount(res.data.totalCount || 0);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const orderStateMap ={
    "주문접수":"1",
    "주문확인":"2",
    "배송중":"3",
    "배송완료":"4"
  };

   //각 객체에 선택된 상태 저장 
  const handleSelectChange = (orderCode, newStatus) => {  
    setSelectedStatus(prev => ({
      ...prev,[orderCode]: newStatus
    }));
  };
  

  // 버튼 클릭 시에만 서버로 상태 변경 요청
const handleStatusSubmit = (orderCode) => {

  const newStatus = selectedStatus[orderCode];
  if (!newStatus) return; // 상태가 선택되지 않은 경우 리턴

  //경고창 주문 취소 물어보기 (즉시 취소)
  const confirm = window.confirm("주문 상태를 변경하시겠습니까?");
  if(!confirm) return; //false면 돌아감 

  const formData = new FormData();
  formData.append("orderCode", orderCode);
  formData.append("orderState", newStatus);
  
  axiosInToken(token)
    .post("/updateOrderStatus", formData)
    .then((res) => {

      if(res.headers.authorization!=null) {
        setToken(res.headers.authorization)
    }
      if (res.data === true) {
        alert("주문 상태가 변경되었습니다.");
        submit(1); // 목록 새로고침
        
        setSelectedStatus(prev => {
          const next = { ...prev };
          delete next[orderCode]; // 성공 후 선택 상태 초기화
          return next;
       
        });
      }
    })
    .catch((err) => {
      console.log(err);
      alert("상태 변경 실패");
    });
};
  
  return (
    <CommonWrapper>
      <CommonContainer size="1200px">
        <ContainerTitleArea>
          <h2>주문접수 관리</h2>
        </ContainerTitleArea>

        
          <ol.DatePickerWrap>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
              <DatePicker
                slotProps={{ textField: { size: "small" } }}
                format="yyyy-MM-dd"
                value={startDate}
                onChange={(newValue) => setStartDate(new Date(newValue))}
              />
              <span>~</span>
              <DatePicker
                slotProps={{ textField: { size: "small" } }}
                format="yyyy-MM-dd"
                value={endDate}
                onChange={(newValue) => setEndDate(new Date(newValue))}
              />
            <StyledButton size="sm" theme="brown" onClick={submit}>
              조회
            </StyledButton>
            </LocalizationProvider>
          </ol.DatePickerWrap>
       
        <ol.OrderListWrap>
          <ol.FilterWrapForMainStore>
            <div className="total-count">
            총 <strong>{totalCount}</strong>건
            </div>
            <form>
            <div className="select-wrap">
                <Select
                  value={searchType}
                  onChange={(val) => setSearchType(val)}
                  label="검색구분"
                >
                  <Option value="">전체</Option>
                  <Option value="storeName">상품명</Option>
                  <Option value="orderState">주문상태</Option>
                  <Option value="itemName">상품명</Option>
                </Select>
              </div>
              <div className="input-wrap">
              <Input icon={<MagnifyingGlassIcon className="h-5 w-5" onClick={submit}/> } 
               label="검색어를 입력하세요" 
               value={searchKeyword}
               onChange={(e) => setSearchKeyword(e.target.value)}/>
              </div>
            </form>
          </ol.FilterWrapForMainStore>

          <ol.MainStoreOrderHeader>
            <div>주문일자</div>
            <div>주문번호</div>
            <div>가맹점명</div>
            <div>상품정보</div>
            <div>수량</div>
            <div>상품구매금액</div>
            <div>주문처리</div>
          </ol.MainStoreOrderHeader>
          
          {orderList?.map((order, index) => (
            <ol.MainStoreOrderItem
              key={order.orderNumber}
              onClick={() => navigate(`/mainStoreOrderDetail/${order.orderCode}`)}
            >
              <div>{format(new Date(order.orderDate), "yyyy-MM-dd")}</div>
              <div>{order.orderCode}</div>
              <div>{order.storeName}</div>
              <div>{order.itemNames?.join(", ")}</div>
              <div>{order.totalCount}</div>
              <div>{order.totalAmount.toLocaleString()}원</div>
              <ol.StatusAreaWrapper onClick={(e) => e.stopPropagation()}>
              {order.orderState === "주문취소" ? (  
              <span className="text-red-500">{order.orderState}</span>
              ): 
              order.orderState === "배송완료" ? (  
                <span className="text-black-500">{order.orderState}</span>
              ):
              (
                <>
                <Select label="주문처리상태"                 
                 value={selectedStatus[order.orderCode]?selectedStatus[order.orderCode]: order.orderState} 
                 onChange={(val) => handleSelectChange(order.orderCode, val)}
                 > 
                 {Object.keys(orderStateMap).map((status)=>(
                       <Option key={status}
                       value={status}
                       disabled= {orderStateMap[status]<orderStateMap[order.orderState]}
                       >{status}</Option>
                 ))         
              }
                </Select>
                <StyledButton
                  size="sm"
                  theme="white"
                  disabled={
                    order.orderState === "배송완료" || 
                    order.orderState === "주문취소" ||
                    !selectedStatus[order.orderCode] ||
                    selectedStatus[order.orderCode] === order.orderState
                  }
                  onClick={e => {
                    e.stopPropagation();
                    handleStatusSubmit(order.orderCode);
                  }}
                >
                  변경
                </StyledButton>
                </>
                )}
              </ol.StatusAreaWrapper>
            </ol.MainStoreOrderItem>
          ))}

        </ol.OrderListWrap>
        <s.PageButtonGroupDiv>
                  <s.ButtonGroupStyle variant="outlined">
                    <s.IconButtonStyle>
                      <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" previous/>
                    </s.IconButtonStyle>
                    {pageBtn.map(page=>(
                    <s.IconButtonStyle key={page}>{page}</s.IconButtonStyle>
                    ))}
                    <s.IconButtonStyle>
                      <ArrowRightIcon strokeWidth={2} className="h-4 w-4" next/>
                    </s.IconButtonStyle>
                  </s.ButtonGroupStyle>
       </s.PageButtonGroupDiv> 
      </CommonContainer>
    </CommonWrapper>
  );
}
export default OrderListForMainStore;
