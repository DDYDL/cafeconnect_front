import styled from "styled-components";
import {BaseGridHeader,BaseGridItem} from "./common.tsx";


// mainstore,store 공통 사용 
export const DatePickerWrap =styled.div`
    width: 100%;
    height: 70px;
    background-color: #f2f2f2;
    margin: 30px 0 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    .flowbite-datepicker {
      width: 200px;
      
      input {
        height: 30px;
        padding: 0 8px;
        text-align: center;
      }

      button {
        height: 30px;
        color: #333 !important;
        // padding: 0 4px;
        
      }

    }
`;

export const DatePickerInputWrap =styled.div`
    display: flex;
    align-items: center;
    margin-right: 20px;

    span {
      color: #666;
      margin: 0 10px;
    }
    svg {
    margin-top: 5px;
    margin-left: 5px;
    color: #333;
  }
`;

export const OrderListWrap = styled.div`
    position: relative;
    margin: 0 auto; 
    margin-bottom: 60px;
`;

//store
export const OrderHeader = styled(BaseGridHeader)`
   grid-template-columns: 120px 160px minmax(300px, 1fr) 90px 120px 120px 100px;
   //grid-template-columns: 140px 180px minmax(400px, 1fr) 120px 140px 120px 120px; //1240px VER
`;

export const OrderItem = styled(BaseGridItem)`
   grid-template-columns: 120px 160px minmax(300px, 1fr) 90px 120px 120px 100px;
   // grid-template-columns: 140px 180px minmax(400px, 1fr) 120px 140px 120px 120px; //1240px VER
    min-height: 90px;

  // 상품정보 컬럼만 왼쪽 정렬
  > div:nth-child(3) {
    justify-content: flex-start;
    text-align: left;
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
   `;

export const FilterWrapForStore = styled.div`
    margin: 30px 0 16px;
    display: flex;
    gap: 10px;
    justify-content: flex-end;

    .total-count {
      display: flex;
      align-items: center;
      margin-right: 10px;
      font-size: 16px;
      color: #333;

      strong {
        color: #333;
        margin-right: 4px;
      }
    }

    .status-option{
       min-width: 36px;
       
       span,li{
       font-size: 16px;
       color: #333;
       
       }
    }
`;


// mainsotre
export const FilterWrapForMainStore = styled.div`
  margin: 30px 0 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;

  .total-count {
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #333;

    strong {
      color: #333;
      margin: 0 4px;
    }
  }

  form {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 12px;

    .select-wrap {  //material select와 input의 속성 사이즈 조절하기 위해서는 containerProps={{ className: "min-w-[36px]" }}직접 select에 처리해야함  
      min-width: 36px;
    }

    .input-wrap {
      min-width: 46px;
    }

    div, input, span, li, p {
      font-family: 'Noto Sans KR' !important;
      font-size: 16px !important;
      color: #333 !important;
    }
  }
`;


// MainStore용 새로운 스타일 추가
export const MainStoreOrderHeader = styled(BaseGridHeader)`
grid-template-columns: 120px 160px 140px minmax(250px, 1fr) 90px 120px 220px;
  //grid-template-columns: 140px 180px minmax(400px, 1fr) 120px 140px minmax(240px, 1fr);
  
`;

export const MainStoreOrderItem = styled(BaseGridItem)`
    grid-template-columns: 120px 160px 140px minmax(250px, 1fr) 90px 120px 220px;
    min-height: 90px;
    //grid-template-columns: 140px 180px minmax(400px, 1fr) 120px 140px minmax(240px, 1fr);
    //min-height: 90px;

  // 상품정보 컬럼만 왼쪽 정렬
  > div:nth-child(4) {
    justify-content: flex-start;
    text-align: left;
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
   // 주문처리 컬럼 (마지막)
   > div:last-child {
    overflow: visible;  // 추가
    position: relative; // 추가
  }
 
`;


export const StatusAreaWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: center;
  width: 100%;  // 전체 너비 사용

  > div:first-child { // 셀렉트 박스 div에 적용 
    flex: 1;  // 남은 공간 차지
    min-width: 140px;  // 최소 너비 설정
  }
 

  div, input, span, li, p {
      font-family: 'Noto Sans KR' !important;
      font-size: 16px !important;
      
    }
`;