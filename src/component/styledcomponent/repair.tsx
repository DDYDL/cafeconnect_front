import styled from "styled-components";
// @ts-ignore
import {BaseGridHeader,BaseGridItem} from "./common.tsx";
import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";


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

  .select{
    background: rgba(255, 255, 255, 1);
  }
`;

export const StyledInput = styled.input`
  width: ${props => props.width || "200px"};
  height: 40px;
  border: 1px solid rgba(234, 234, 234, 1);
  border-radius: 5px;
  padding: 0 10px;

  &:focus {
    outline: none;
    border-color: #6b7280;
  }
`;

export const StyledTextarea = styled.textarea`
  width: 100%; 
  min-height: 200px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid #e5e7eb; 
  border-radius: 0.5rem;
  color: #111827;
 
 &:focus {
    --tw-ring-color: #9ca3af !important;
      border-color: #6b7280 !important;;
 }
 
 resize: none;
`;

export const RepaireListWrap =styled.div`
    position: relative;
    margin: 0 auto; 
    margin-top: 60px;
    margin-bottom:20px;

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


//모달 스타일 시작 
export const StyledDialog = styled(Dialog)`
  .dialog-content {
    max-width: 800px;
    width: 100%;
  }
`;

export const StyledDialogHeader = styled(DialogHeader)`
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
`;

export const StyledDialogBody = styled(DialogBody)`
  padding: 1.5rem;
  height: 40rem;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }
`;

export const ModalTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
`;

export const DetailSection = styled.div`
  margin-bottom: 1.5rem;
`;

export const ProductInfo = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;

  img {
    width: 96px;
    height: 96px;
    object-fit: cover;
  }
`;

export const InfoLabel = styled.div`
  font-size: 0.875rem;
  color: #333;
  margin-bottom: 0.25rem;
`;

export const InfoValue = styled.div`
  font-weight: 500;
  color: #333;
`;

export const ContentSection = styled.div`
  border-top: 1px solid #e5e7eb;
  padding-top: 1rem;
  margin-top: 1rem;
`;

export const ContentTitle = styled.h5`
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #333;
`;

export const ContentBox = styled.div<{ minHeight: string }>`
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
  min-height: ${({ minHeight }) => minHeight || "100px"};
`;


export const RepairStatusSection = styled.div`
  margin-top: 2rem;
`;

export const StatusFlow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(233, 238, 217, 0.25);
  padding: 2rem;
  margin-top: 1rem;
`;

//스타일드 컴포넌트에서만 사용하는 prop은 트랜지언트prop(접두사$사용)을 사용해야 경고가 없다
export const StatusCircle = styled.div<{$isActive: Boolean}>`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: ${({ $isActive }) => $isActive ? "#CBD2A4" : "#E9EED9"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  font-weight: ${({ $isActive }) => $isActive ? "600" : "normal"};
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

export const StatusArrow = styled(ChevronRightIcon)`
  flex: 1;
  color: #333;
  height: 2rem;
  width: 2rem;
`;