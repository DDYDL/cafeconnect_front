import {
  CommonWrapper,
  CommonContainer,
  ContainerTitleArea,
} from "../styledcomponent/common.tsx";
import * as ol from "../styledcomponent/orderlist.tsx";
import * as s from '../styles/StyledStore.tsx';
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
import { useAtomValue,useAtom } from "jotai/react";
import { tokenAtom, memberAtom } from "../../atoms";
import { ArrowRightIcon, ArrowLeftIcon} from "@heroicons/react/24/outline";

function OrderListForStore() {
  const today = new Date();
  const monthAgo = new Date(today);
  monthAgo.setMonth(today.getMonth() - 1);
  const [startDate, setStartDate] = useState(monthAgo);
  const [endDate, setEndDate] = useState(today);
  const [status, setStatus] = useState("");
  const [orderList, setOrderList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageBtn, setPageBtn] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  
  const store = useAtomValue(memberAtom);
  const [token,setToken] = useAtom(tokenAtom);
  const navigate = useNavigate();
  
  //초기 로딩 useEffect
  useEffect(() => {
    if (token != null && token !== "")
       submit(1);
  }, [token, store.storeCode,status]); // 변경될때마다 바로 적용돼야하는 값 추가하면 자동 조회됨 

  const handleStatusChange=(val)=>{
    setStatus(val);
    submit(1);
  }

  const submit = (page) => {
    const formData = new FormData();
    formData.append("storeCode", store.storeCode);
    formData.append("startDate", format(startDate, "yyyy-MM-dd"));
    formData.append("endDate", format(endDate, "yyyy-MM-dd"));
    formData.append("page",page);
    if (status) formData.append("orderState", status);

    axiosInToken(token)
      .post("orderListForStore", formData)
      .then((res) => {

        if(res.headers.authorization!=null) {
          setToken(res.headers.authorization)
      }
        console.log(res.data);
   
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

  const cancelOrder = (code) => {
    //경고창 주문 취소 물어보기 (즉시 취소)
    const confirm = window.confirm("주문을 취소하시겠습니까?");
    if(!confirm) return; //false면 돌아감 


    axiosInToken(token).get(`cancelItemOrder?storeCode=${store.storeCode}&orderCode=${code}`)
    .then(res=>{
      
      if(res.headers.authorization!=null) {
        setToken(res.headers.authorization)
    }
      if(res.data === true) {
        alert("주문 취소 완료되었습니다");
        submit(1);
      }
    }).catch(err=>{
      console.log(err);
      alert("취소 불가 본사 문의");
    })

  };

  const handlePrevPage = () => {
    if (pageInfo.curPage > 1) {
      submit(pageInfo.curPage - 1);
    }
  };

  const handleNextPage = () => {
    if (pageInfo.curPage < pageInfo.endPage) {
      submit(pageInfo.curPage + 1);
    }
  };

  return (
    <CommonWrapper>
      <CommonContainer size="1000px">
        <ContainerTitleArea>
          <h2>주문내역</h2>
        </ContainerTitleArea>
        
          <ol.DatePickerWrap>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
              <DatePicker
                
                slotProps={{textField: { size: "small" } , InputLabelProps: { shrink: false } }}
                format="yyyy-MM-dd"
                value={startDate}
                onChange={(newValue) => setStartDate(new Date(newValue))}
              />
              <span>~</span>
              <DatePicker
                className="customPicker"
                slotProps={{ textField: { size: "small" }, InputLabelProps: { shrink: false } }}
                format="yyyy-MM-dd"
                value={endDate}
                onChange={(newValue) => setEndDate(new Date(newValue))}
              />
            <StyledButton size="sm" theme="brown" onClick={() => submit(1)}>
              조회
            </StyledButton>
            </LocalizationProvider>
          </ol.DatePickerWrap>
        

        <ol.OrderListWrap>
          <ol.FilterWrapForStore>
            <div className="total-count">
            <span className="all_counter">
              총<span className="numbering">{totalCount}</span>건
            </span>
            </div>
            <div className="status-option">
              <Select  label="주문 상태" value={status}  onChange={handleStatusChange}>
                <Option value="">전체</Option>
                <Option value="주문접수">주문접수</Option>
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
  orderList?.map((order, index) => (
    <ol.OrderItem
      key={index}
      onClick={() => navigate(`/orderDetail/${order.orderCode}`)}
    >
      <div>{format(new Date(order.orderDate), "yyyy-MM-dd")}</div>
      <div>{order.orderCode}</div>
      <div>{order.itemNames?.join(", ")}</div>
      <div>{order.totalCount}</div>             
      <div>{order.totalAmount.toLocaleString()}원</div>
      <div>{order.orderState}</div>
      <div>
        {order.orderState === "주문취소"?(
           <span className="text-red-500">{order.orderState}</span>
        ):
        order.orderState === "주문접수" ? (
          <StyledButton
            size="sm"
            theme="white"
            onClick={(e) => 
              {e.stopPropagation();
              cancelOrder(order.orderCode);
            }}
          >
            취소
          </StyledButton>
        ):(
          <span>취소불가</span>
        )}
      </div>
    </ol.OrderItem>
  ))
) : (
    <div className="mt-7 flex justify-center">주문 내역이 없습니다.</div>
)}


        </ol.OrderListWrap>
        <s.PageButtonGroupDiv>
                  <s.ButtonGroupStyle variant="outlined">
                    <s.IconButtonStyle
                     onClick={handlePrevPage}
                     disabled={pageInfo.curPage === 1}
                    >
                      <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" previous/>
                    </s.IconButtonStyle>
                    {pageBtn.map(page=>(
                    <s.IconButtonStyle key={page} onClick={()=>{submit(page)}}>{page}</s.IconButtonStyle>
                    ))}
                    <s.IconButtonStyle
                    onClick={handleNextPage}
                    disabled={pageInfo.endPage === pageInfo.curPage}
                    >
                      <ArrowRightIcon strokeWidth={2} className="h-4 w-4" next/>
                    </s.IconButtonStyle>
                  </s.ButtonGroupStyle>
       </s.PageButtonGroupDiv> 
      </CommonContainer>
    </CommonWrapper>
  );
}
export default OrderListForStore;
