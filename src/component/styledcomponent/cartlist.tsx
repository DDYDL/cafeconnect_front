import styled from 'styled-components'; 
import {
  BaseGridHeader,
  BaseGridItem
} from './common.tsx';

// export const CartListWrapper = styled.div`  
//  //width: 1240px;
//  width :1000px;
//  margin: 0 auto;
//  `;
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
//common으로 통합함 
// export const CartHeader = styled.div`
//   display: grid;
//   //grid-template-columns: 120px minmax(250px, 1fr) 120px 150px 150px 120px 100px 100px;
//   grid-template-columns: 100px minmax(200px, 1fr) 100px 120px 120px 100px 80px 80px;
//   background: #f9f9f9;
//   padding: 20px 0;
//   border-top: 2px solid #000;
//   border-bottom: 1px solid #000; // #e8e8e8;
//   text-align: center;
//   font-size: 14px;
//   font-weight: 500;
//   align-items: center;

//   > div {
//     padding: 0 10px;  //0 15px (1240ver)
    
//   }
// `;


export const CartHeader = styled(BaseGridHeader)`
 //   //grid-template-columns: 120px minmax(250px, 1fr) 120px 150px 150px 120px 100px 100px;
 grid-template-columns: 100px minmax(200px, 1fr) 100px 120px 120px 100px 80px 80px;
`;

export const CartItem = styled(BaseGridItem)`
  //grid-template-columns: 120px minmax(250px, 1fr) 120px 150px 150px 120px 100px 100px;
 grid-template-columns: 100px minmax(200px, 1fr) 100px 120px 120px 100px 80px 80px;
`;

//common으로 통합함
// export const CartItem = styled.div`
//   display: grid;
//   //grid-template-columns: 120px minmax(250px, 1fr) 120px 150px 150px 120px 100px 100px;
//   grid-template-columns: 100px minmax(200px, 1fr) 100px 120px 120px 100px 80px 80px;
//   padding: 25px 0;  
//   border-bottom: 1px solid #e8e8e8;
//   align-items: center;
//   text-align: center;
//   font-size: 14px;
//   font-weight: 400;
 
//   > div {
//     padding: 0 10px;  //0 15px (1240ver)
//     display: flex;
//     justify-content: center;
//     overflow: hidden;
//     text-overflow: ellipsis;
    
//   }
// `;

export const ProductImage = styled.img`
  width: 92px;
  height: 92px;
  object-fit: cover;
  margin: 0 auto;
`;

export const ProductInfo = styled.div`
  text-align: left !important;  // 상품정보는 좌측 정렬우선되도록 함
  justify-content: flex-start !important; // 왼쪽 우선 
  padding: 0 20px;
  display: flex;
  flex-direction: column;

  div{
    display: flex;
    justify-content: flex-start; 
    
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