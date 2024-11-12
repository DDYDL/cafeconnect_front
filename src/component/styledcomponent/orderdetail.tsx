import styled from "styled-components";
import { BaseGridHeader, BaseGridItem } from "./common.tsx";

export const OrderDetailWrap = styled.div`
  margin-top: 30px;
`;

export const OrderBasicInfo = styled.ul`
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
  
  li {
    display: flex;
    align-items: center;
    gap: 10px;
    
    strong {
      font-size: 16px;
      color: #333;
    }
    
    em {
      font-size: 20px;
      color: #333;
      font-style: normal;
    }
  }
`;
export const OrderItemHeader = styled(BaseGridHeader)`
  grid-template-columns: minmax(400px, 1fr) 100px 150px 120px 120px;
  gap: 10px;
`;

export const OrderItemRow = styled(BaseGridItem)`
  grid-template-columns: minmax(400px, 1fr) 100px 150px 120px 120px;
  gap: 10px;
`;

export const ProductCell = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 0 20px;
  justify-content: flex-start !important;
`;

export const ProductImage = styled.div`
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ProductInfo = styled.div`
  text-align: left;

  .category {
    font-size: 14px;
    color: #333;
    margin-bottom: 5px;
  }

  .name {
    font-size: 16px;
    color: #333;
    margin-bottom: 8px;
    font-weight: 500;
  }

  .storage-type {
    font-size: 14px;
    color: #333;
  }
`;


export const SectionTitle = styled.div`
  margin: 60px 0 20px;
  
  h4 {
    font-size: 18px;
    font-weight: 600;
    color: #333;
  }
  

`;


export const PaymentInfoGrid = styled.div`
  border: 2px solid #000;
  margin: 20px 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

export const PaymentColumn = styled.div`
  & + & {

    border-left: 1px solid #e8e8e8;
  }
`;

export const PaymentRow = styled.div<{ isHeader?: boolean }>`

  display: grid;
  grid-template-columns: 1fr;
  padding: 15px 20px;
  
  ${props => props.isHeader && `
    border-bottom: 1px solid #e8e8e8;
  `}

  .payment-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
    
    &:not(:last-child) {
      margin-bottom: 10px;
    }

    .label {
      color: #333;
    }

    .value {
      color: #333;
      font-weight: ${props => props.isHeader ? '600' : '400'};
      
      &.red {
        color: #ff3b3b;
      }
    }
  }
`;

export const InfoTable = styled.table`
  width: 100%;
  border-top: 1px solid #e8e8e8;
  border-collapse: collapse;
  margin-bottom: 30px;
  
  th {
    width: 210px;
    background: #f9f9f9;
    padding: 15px 20px;
    text-align: left;
    border-bottom: 1px solid #e8e8e8;
    font-size: 14px;
    font-weight: 500;
  }
  
  td {
    padding: 15px 20px;
    border-bottom: 1px solid #e8e8e8;
    font-size: 14px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  
  button {
    min-width: 120px;
  }
`;