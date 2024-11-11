import styled from 'styled-components'; 


export const CartListWrapper = styled.div`
 width: 1240px;
 margin: 0 auto;
 `;
 
export const CartWrap = styled.div`
    margin-top: 60px;
    position: relative;
    margin-bottom: 60px;

`;
// export const CartTable = styled.table`
//     width: 100%;
//     border-collapse: collapse;
//     border-top: 2px solid #000;
//     margin-top: 20px;
// `;

// export const TableHeader = styled.th`
//     padding: 15px 0;
//     border-bottom: 1px solid #e8e8e8;
//     font-weight: 500;
//     font-size: 14px;
//     text-align: center;
//     background: #f9f9f9;
// `;

// export const TableCell = styled.td`
//     padding: 20px 0;
//     border-bottom: 1px solid #e8e8e8;
//     text-align: center;
//     vertical-align: middle;
// `;

// export const ProductInfo = styled.div`
//     display: flex;
//     align-items: center;
//     gap: 20px;
//     padding: 0 20px;
// `;

// export const ProductImage = styled.img`
//     width: 92px;
//     height: 92px;
//     object-fit: cover;
// `;

// export const ProductDetails = styled.div`
//     text-align: left;
// `;

// export const ProductName = styled.strong`
//     display: block;
//     font-size: 16px;
//     margin-bottom: 8px;
// `;

// export const ProductOption = styled.div`
//     font-size: 14px;
//     color: #666;
// `;

// export const QuantityControl = styled.div`
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 5px;
// `;

// export const QuantityInput = styled.input`
//     width: 50px;
//     height: 32px;
//     text-align: center;
//     border: 1px solid #e8e8e8;
// `;

// export const SummarySection = styled.div`
//     margin-top: 30px;
//     padding: 20px;
//     background: #f9f9f9;
//     text-align: right;
//     font-size: 16px;

//     strong {
//         font-size: 20px;
//         color: #000;
//         margin-left: 10px;
//     }
// `;

// export const ButtonSection = styled.div`
//     display: flex;
//     justify-content: center;
//     gap: 10px;
//     margin-top: 40px;
// `;
export const CartHeader = styled.div`
  display: grid;
  grid-template-columns: 120px minmax(300px, 1fr) 120px 150px 120px 100px;
  background: #f9f9f9;
  padding: 15px 0;
  border-top: 2px solid #000;
  border-bottom: 1px solid #e8e8e8;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
`;

export const CartItem = styled.div`
  display: grid;
  grid-template-columns: 120px minmax(300px, 1fr) 120px 150px 120px 100px;
  padding: 20px 0;
  border-bottom: 1px solid #e8e8e8;
  align-items: center;
  text-align: center;
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
`;

export const ProductName = styled.strong`
  display: block;
  font-size: 16px;
  margin-bottom: 8px;
`;

export const ProductOption = styled.div`
  font-size: 14px;
  color: #666;
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

export const QuantityInput = styled.input`
  width: 50px;
  height: 32px;
  text-align: center;
  border: 1px solid #e8e8e8;
`;

export const SummarySection = styled.div`
  margin-top: 30px;
  padding: 20px;
  background: #f9f9f9;
  text-align: right;
  font-size: 16px;

  strong {
    font-size: 20px;
    color: #000;
    margin-left: 10px;
  }
`;

export const ButtonSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 40px;
`;