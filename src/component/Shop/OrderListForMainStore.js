import {CommonWrapper,CommonContainer,ContainerTitleArea,} from "../styledcomponent/common.tsx";
import * as ol from '../styledcomponent/orderlist.tsx';
import {StyledButton} from '../styledcomponent/button.tsx';
import { Datepicker } from 'flowbite-react';
import { Select, Option,Input} from "@material-tailwind/react";
import {ProductInfo,ProductName,CategoryInfo} from '../styledcomponent/cartlist.tsx';
import {useState} from 'react'
import { useNavigate } from "react-router-dom";

function OrderListForMainStore() {
    const navigate= useNavigate();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [status, setStatus] = useState("");
    const orders = [
        {
          orderDate: '2024-10-21',
          orderNumber: '20241021-0000240',
          productInfo: '과테말라 코반 스페셜티....',
          category: '가공식품/캔류/디카페인',
          quantity: 1,
          price: 8900,
          status: '상품준비중'
        },
        {
          orderDate: '2024-10-21',
          orderNumber: '20241021-0000240',
          productInfo: '과테말라 코반 스페셜티...',
          category: '가공식품/캔류/디카페인',
          quantity: 1,
          price: 8900,
          status: '주문확인중'
        }
      ];
    const cancelOrder=()=>{
      
    }
    return(
    <CommonWrapper>
        <CommonContainer size="1000px">
            <ContainerTitleArea><h2>주문서관리</h2></ContainerTitleArea>
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
          <StyledButton size="sm" theme="brown">조회</StyledButton>
        </ol.DatePickerWrap>
        <ol.OrderListWrap>
        <ol.FilterWrapForMainStore>
            <div className="total-count">
              총 <strong>2</strong>건
            </div>
            <form>
            <div className=".search-option">
            <Select
              value={status}
              onChange={(val) => setStatus(val)}  
            >
              <Option value="">전체</Option>
              <Option value="">주문상태</Option>
              <Option value="store">가맹점</Option>
            </Select>
            </div>
            <div>
            <Input></Input>
            </div>
            </form>
          </ol.FilterWrapForMainStore>

          <ol.OrderHeader>
            <div>주문일자</div>
            <div>주문번호</div>
            <div>상품정보</div>
            <div>수량</div>
            <div>상품구매금액</div>
            <div>주문처리상태</div>
            <div>취소신청</div>
          </ol.OrderHeader>

          {orders.map((order, index) => (
            <ol.OrderItem key={index} onClick={()=>navigate("/orderDetail")}>
              <div>{order.orderDate}</div>
              <div>{order.orderNumber}</div>
              <ProductInfo>
                <CategoryInfo>{order.category}</CategoryInfo>
                <ProductName>{order.productInfo}</ProductName>
              </ProductInfo>
              <div>{order.quantity}</div>
              <div>{order.price.toLocaleString()}원</div>
              <div>{order.status}</div>
              <div>
                {order.status != '상품준비중' ? (
                  <span>취소불가</span>
                ) : (
                  <StyledButton 
                    size="sm" 
                    theme="white"
                    disabled={order.status === '배송중'}
                    onClick={(e) => {
                      e.stopPropagation(); // 버튼 클릭시에 디테일 안넘어가게함
                      cancelOrder(); 
                    }}
                  >
                    취소
                  </StyledButton>
                )}
              </div>
            </ol.OrderItem>
          ))}
        </ol.OrderListWrap>
        </CommonContainer>
    </CommonWrapper>
    )
}
export default OrderListForMainStore;