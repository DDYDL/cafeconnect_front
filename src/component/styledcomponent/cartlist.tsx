import styled from 'styled-components'; 
import {
  BaseGridHeader,
  BaseGridItem
} from './common.tsx';
import { Dialog } from "@material-tailwind/react";

 export const AddPreviousOrderItem = styled.div`
 margin-top:30px;
 margin-bottom: 10px;
 display: flex;
 justify-content: flex-end;
 
`;

export const CartWrap = styled.div` //list 부분 통합 
    position: relative;
    margin: 0 auto; // 추가 
    margin-bottom: 60px;
`;

export const CartHeader = styled(BaseGridHeader)`
 //   //grid-template-columns: 120px minmax(250px, 1fr) 120px 150px 150px 120px 100px 100px;
 grid-template-columns: 100px minmax(200px, 1fr) 100px 120px 120px 100px 80px 80px;
`;

export const CartItem = styled(BaseGridItem)`
  //grid-template-columns: 120px minmax(250px, 1fr) 120px 150px 150px 120px 100px 100px;
 grid-template-columns: 100px minmax(200px, 1fr) 100px 120px 120px 100px 80px 80px;
`;


export const ProductImage = styled.img`
  width: 92px;
  height: 92px;
  object-fit: cover;
  margin: 0 auto;
`;

export const ProductInfo = styled.div`
  text-align: left;
  padding: 0 20px;
  display: flex !important;  // 부모의 grid를 override
  flex-direction: column;
  align-items: flex-start !important;  // 부모의 center를 override
  justify-content: flex-start !important;

  div {
    display: flex;
    width: 100%;
    justify-content: flex-start !important;  // 부모의 center를 override
    align-items: flex-start !important;  // 부모의 center를 override
    padding: 0 !important;  // 부모의 padding override
  }
`;

export const ProductName = styled.span`
  display: block;
  font-size: 16px;
  margin-bottom: 8px;
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

export const QuantityInput = styled.input`
  width: 56px;
  height: 36px;
  text-align: center;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  font-size: 13px;
  /* number type input의 화살표 스타일링 */
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    opacity: 1;
    height: 36px;
    position: relative;
    top: 0;
  }
`;
export const CategoryInfo = styled.div`
 display: -webkit-box;
  -webkit-line-clamp: 2; // 2줄 제한
  -webkit-box-orient: vertical;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all; //즐바꿈
  line-height: 1.4;
  padding: 0 5px;
  text-align: left;  // ProductInfo 내부에서 사용될 때 왼쪽 정렬
       
`;

export const SummarySection = styled.div`
  margin-top: 40px;
  padding: 30px;
  background: rgba(234, 234, 234, 0.28);
  text-align: right;
  font-size: 15px;
  border-radius: 4px;
  border: 1px solid #EAEAEA;

  strong {
    font-size: 20px;
    color: #333;
    margin: 0 6px;
    font-weight: 600;
  }
`;

export const ButtonSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 40px;
`;

//모달 스타일 시작 
export const StyledDialog = styled(Dialog)`
  .dialog-content {
    max-width: 1000px;
    width: 100%;
  }
`;

export const ModalHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
`;

export const DateNavigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 20px 0;

  .date {
    font-size: 1rem;
    font-weight: 500;
    background: #f3f4f6;
    padding: 8px 16px;
    border-radius: 4px;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    
    &:hover {
      background: #f3f4f6;
      border-radius: 4px;
    }
  }
`;

export const ModalTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 12px;
    text-align: center;
    border-bottom: 1px solid #e5e7eb;
  }

  th {
    background: #f9f9f9;
    font-weight: 500;
    border-top: 2px solid #000;
    border-bottom: 1px solid #000;
  }

  td {
    font-size: 14px;
  }
`;

export const ModalFooter = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
  border-top: 1px solid #e5e7eb;
`;

export const CheckboxCell = styled.td`
  input {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
`;