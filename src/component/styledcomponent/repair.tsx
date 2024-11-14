import styled from "styled-components";
import { Textarea } from "flowbite-react";
import {BaseGridHeader,BaseGridItem} from "./common.tsx";


export const RepairFormtWrap = styled.div`
    width: 800px;
    margin: 30px auto;
`;
export const FormTr = styled.div`
  display: flex;
  border-bottom: 1px solid #e8e8e8;
`;

export const FormTh = styled.div`
  width: 140px;
  background: #f9f9f9;
  padding: 15px;
  display: flex;
  align-items: center;
  font-weight: 500;
  
  span {
    color: red;
    margin-left: 4px;
  }
`;

export const FormTd = styled.div`
  width: 660px;
  padding: 15px;
`;

export const StyledTextarea = styled(Textarea)`
 min-width: 500px;
 min-height: 200px;
 background-color: #f8f8f8;
 border: 1px solid #e5e7eb;
 border-radius: 0.5rem;
 color: #111827;
 
 &:focus {
   outline: none;
   border-color: #795548;
   box-shadow: none;
 }
 
 resize: none;
`;

export const RepaireListWrap =styled.div`
    position: relative;
    margin: 0 auto; 
    margin-top: 60px;

`;

//store
export const RepairHeader = styled(BaseGridHeader)`
   grid-template-columns: minmax(400px, 1fr) 200px 200px 200px;
   gap: 10px;
   //grid-template-columns: 140px 180px minmax(400px, 1fr) 120px 140px 120px 120px; //1240px VER
`;

export const RepairItem = styled(BaseGridItem)`
   grid-template-columns: minmax(400px, 1fr) 200px 200px 200px;
   gap: 10px;
   // grid-template-columns: 140px 180px minmax(400px, 1fr) 120px 140px 120px 120px; //1240px VER
    min-height: 90px;

  // 상품정보 컬럼만 왼쪽 정렬
  > div:first-child {
    justify-content: flex-start;
    padding-left: 20px;
  }
   `;
