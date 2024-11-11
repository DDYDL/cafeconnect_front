// CartList.js 수정
import {
  CommonWrapper,
  CommonContainer,
  ContainerTitleArea,
} from "../styledcomponent/common.tsx";
import * as c from "../styledcomponent/cartlist.tsx";
import { StyledButton } from "../styledcomponent/button.tsx";

function CartList() {
  const cartItems = [
    {
      itemCode: 1,
      name: "에티오피아 코케허니 G1스페셜티",
      option: "더치 분쇄/과테말라 안티구아/케냐 AA/에티오피아 시다모 G2",
      price: 24800,
      quantity: 1,
      image: "/image/item1.jpg",
      shipping: "기본배송",
    },
    // ... 더 많은 아이템들
  ];

//   return (
//     <CommonWrapper>
//       <CommonContainer>
//         <ContainerTitleArea>
//           <h2>장바구니</h2>
//         </ContainerTitleArea>
//         <c.CartListWrapper>
//           <c.CartWrap>
//             <c.CartTable>
//               <colgroup>
//                 <col width="120px" /> 
//                 <col width="400px" /> 
//                 <col width="120px" /> 
//                 <col width="150px" /> 
//                 <col width="150px" /> 
//                 <col width="100px" /> 
//                 <col width="100px" /> 
//                 <col width="100px" />
//               </colgroup>
//               <thead>
//                 <tr>
//                   <c.TableHeader>이미지</c.TableHeader>
//                   <c.TableHeader>상품정보</c.TableHeader>
//                   <c.TableHeader>수량</c.TableHeader>
//                   <c.TableHeader>상품구매금액</c.TableHeader>
//                   <c.TableHeader>카테고리</c.TableHeader>
//                   <c.TableHeader>배송구분</c.TableHeader>
//                   <c.TableHeader>보관</c.TableHeader>
//                   <c.TableHeader>삭제</c.TableHeader>
//                 </tr>
//               </thead>
//               <tbody>
//                 {cartItems.map((item) => (
//                   <tr key={item.itemCode}>
//                     <c.TableCell>
//                       <c.ProductImage src={item.image} alt={item.name} />
//                     </c.TableCell>
//                     <c.TableCell>
//                       <c.ProductDetails>
//                         <c.ProductName>{item.name}</c.ProductName>
//                         <c.ProductOption>[옵션: {item.option}]</c.ProductOption>
//                       </c.ProductDetails>
//                     </c.TableCell>
//                     <c.TableCell>
//                       <c.QuantityControl>
//                         <c.QuantityInput type="text" value={item.quantity} />
//                         <StyledButton size="sm" theme="white">
//                           변경
//                         </StyledButton>
//                       </c.QuantityControl>
//                     </c.TableCell>
//                     <c.TableCell>
//                       <strong>{item.price.toLocaleString()}원</strong>
//                     </c.TableCell>
//                     <c.TableCell>-</c.TableCell>
//                     <c.TableCell>-</c.TableCell>
//                     <c.TableCell>{item.shipping}</c.TableCell>
//                     <c.TableCell>무료</c.TableCell>
//                     <c.TableCell>
//                       <div
//                         style={{
//                           display: "flex",
//                           flexDirection: "column",
//                           gap: "5px",
//                         }}
//                       >
//                         <StyledButton size="sm" theme="white">
//                           삭제
//                         </StyledButton>
//                       </div>
//                     </c.TableCell>
//                   </tr>
//                 ))}
//               </tbody>
//               <tfoot>
//                 <tr>
//                   <c.TableCell colSpan="10">
//                     <c.SummarySection>
//                       상품구매금액 <strong>51,700원</strong> + 배송비{" "}
//                       <strong>0원</strong> = 합계 : <strong>51,700원</strong>
//                     </c.SummarySection>
//                   </c.TableCell>
//                 </tr>
//               </tfoot>
//             </c.CartTable>
//             <c.ButtonSection>
//               <StyledButton size="md" theme="brown">
//                 주문하기
//               </StyledButton>
//             </c.ButtonSection>
//           </c.CartWrap>
//         </c.CartListWrapper>
//       </CommonContainer>
//     </CommonWrapper>
//   );
// }

// export default CartList;
return (
    <CommonWrapper>
      <CommonContainer>
        <ContainerTitleArea>
          <h2>장바구니</h2>
        </ContainerTitleArea>
        <c.CartWrap>
          {/* 헤더 */}
          <c.CartHeader>
            <div>이미지</div>
            <div>상품정보</div>
            <div>수량</div>
            <div>상품금액</div>
            <div>배송구분</div>
            <div>선택</div>
          </c.CartHeader>

          {/* 상품 목록 */}
          {cartItems.map(item => (
            <c.CartItem key={item.itemCode}>
              <div>
                <c.ProductImage src={item.image} alt={item.name} />
              </div>
              <c.ProductInfo>
                <c.ProductName>{item.name}</c.ProductName>
                <c.ProductOption>[옵션: {item.option}]</c.ProductOption>
              </c.ProductInfo>
              <c.QuantityControl>
                <c.QuantityInput type="text" value={item.quantity} />
                <StyledButton size="sm" theme="white">변경</StyledButton>
              </c.QuantityControl>
              <div>
                <strong>{item.price.toLocaleString()}원</strong>
              </div>
              <div>{item.shipping}</div>
              <div>
                <StyledButton size="sm" theme="white">삭제</StyledButton>
              </div>
            </c.CartItem>
          ))}

          {/* 합계 */}
          <c.SummarySection>
            상품구매금액 <strong>51,700원</strong> + 배송비 <strong>0원</strong>
            = 합계 : <strong>51,700원</strong>
          </c.SummarySection>

          {/* 버튼 */}
          <c.ButtonSection>
            <StyledButton size="md" theme="brown">주문하기</StyledButton>
          </c.ButtonSection>
        </c.CartWrap>
      </CommonContainer>
    </CommonWrapper>
  );
}
export default CartList;