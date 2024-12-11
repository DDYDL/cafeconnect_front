import styled from "styled-components";


export const OrderWrap = styled.div`
  position: relative;
  margin-top: 60px;
  margin-bottom: 60px;
  display: flex;
  gap: 40px;
  justify-content: space-between;
`;

export const OrderFinalLeft = styled.div`
    width: 960px;
    float: left; 
`;
export const OrderFinalTitle = styled.h3`
  position: relative;
  margin: 40px 0 20px;
  font-size: 20px;
  line-height: 34px;
  font-weight: 500;
  
  &:first-child {
    margin-top: 0;
  }
`;
export const OrderItemWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 40px;
`;
export const OrderGroupTitle = styled.div` //일반, 업체배송상품 구분
  padding: 15px 0;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 500;
  border-bottom: 1px solid #e8e8e8;
  color: #333;
`;
export const OrderGroup = styled.div`
  margin-bottom: 30px;
`;


export const OrderItemList = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  padding: 20px 0;
  border-bottom: 1px solid #e8e8e8;
`;

export const OrderItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

export const OrderItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
  padding: 0 20px;
`;

export const OrderItemCategory = styled.div`
  font-size: 14px;
  color: #666;
`;

export const OrderItemName = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

export const OrderItemPrice = styled.div`
  font-size: 15px;
  color: #333;
`;

export const OrderInfoSection = styled.div`
  width: 100%;
  margin-top: 40px;
`;

export const OrderFinalRight =styled.div`
    width: 260px;
    float:  right;
`;
export const PaymentSummary = styled.div`
  position: sticky; // 스크롤 돼도 고정시킴 
  top: 20px;
  width: 260px;
  padding: 20px;
  border: 1px solid #e9e9e9;
  border-radius: 4px;
  background: white;
`;
export const ItemQuantitySummary = styled.div` 
  margin: 15px 0;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 4px;

  > div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    font-size: 14px;
    color: #666;

    &:last-child {
      margin-bottom: 0;
    }

    span:last-child {
      font-weight: 500;
      color: #333;
    }
  }
`;

// 금액 정보 행
export const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  
  &.total {
    margin-top: 20px;
    margin-bottom: 20px;
    padding-top: 20px;
    border-top: 1px solid #e9e9e9;
    font-weight: bold;
    font-size: 18px;
  }
`;



// 입력폼
export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

export const InputLabel = styled.label`
  width: 100px; // 라벨의 고정 너비
  margin-right: 20px;
  font-size: 14px;
  color: #666;
  
  &.required::after {
    content: '*';
    color: #e53e3e;
    margin-left: 4px;
  }
`;

export const InputField = styled.input`
  width: 70%;
  padding: 10px;
  border: 1px solid #e9e9e9;
  border-radius: 4px;
`;