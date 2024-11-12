import styled from "styled-components";
import {BaseGridHeader,BaseGridItem} from "./common.tsx";

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
        padding: 0 8px;
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
export const FilterWrap = styled.div`
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
export const OrderListWrap = styled.div`
    position: relative;
    margin: 0 auto; 
    margin-bottom: 60px;
`;

export const OrderHeader = styled(BaseGridHeader)`
   grid-template-columns: 120px 160px minmax(300px, 1fr) 90px 120px 120px 100px;
   //grid-template-columns: 140px 180px minmax(400px, 1fr) 120px 140px 120px 120px;
`;

export const OrderItem = styled(BaseGridItem)`
   grid-template-columns: 120px 160px minmax(300px, 1fr) 90px 120px 120px 100px;
   // grid-template-columns: 140px 180px minmax(400px, 1fr) 120px 140px 120px 120px;
`;

