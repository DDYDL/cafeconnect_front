import * as s from '../styles/StyledStore.tsx';

import { Link } from 'react-router-dom';

const StockOrderItemAdd = () => {
    return (
        <>
            <s.ContentListDiv>
            <s.MainTitleText>주문상품 재고추가</s.MainTitleText>
            <s.SearchButtonDiv textAlign='right'>
                <s.ButtonStyle><Link to="/">재고 추가</Link></s.ButtonStyle>
            </s.SearchButtonDiv>

            <s.TableList>
                    <s.TableListThead><s.TableTextTh></s.TableTextTh><s.TableTextTh>주문번호</s.TableTextTh><s.TableTextTh>주문날짜</s.TableTextTh><s.TableTextTh>상품정보</s.TableTextTh>
                        <s.TableTextTh>카테고리</s.TableTextTh><s.TableTextTh>규격</s.TableTextTh><s.TableTextTh>단위</s.TableTextTh>
                        <s.TableTextTh>보관상태</s.TableTextTh><s.TableTextTh>수량</s.TableTextTh><s.TableTextTh>공급가</s.TableTextTh></s.TableListThead>
                <tbody>
                    <s.TableTextTr>
                        <s.TableTextTd><input type='checkbox'/></s.TableTextTd>
                        <s.TableTextTd>45784213</s.TableTextTd>
                        <s.TableTextTd>2024.10.27</s.TableTextTd>
                        <s.TableTextTd><img src="/logo.svg" /><span>01542</span><br/><span>(원두)코소롱블랜드(1Kg*12)/Box</span></s.TableTextTd>
                        <s.TableTextTd>커피자재/원두/카페인</s.TableTextTd>
                        <s.TableTextTd>1kg*12/Box</s.TableTextTd>
                        <s.TableTextTd>Box</s.TableTextTd>
                        <s.TableTextTd>상온/식품</s.TableTextTd>
                        <s.TableTextTd>9ea</s.TableTextTd>
                        <s.TableTextTd>150,000</s.TableTextTd>
                    </s.TableTextTr>
                    <s.TableTextTr>
                        <s.TableTextTd><input type='checkbox'/></s.TableTextTd>
                        <s.TableTextTd>45784213</s.TableTextTd>
                        <s.TableTextTd>2024.10.27</s.TableTextTd>
                        <s.TableTextTd><img src="/logo.svg"/><span>01542</span><br/><span>(원두)코소롱블랜드(1Kg*12)/Box</span></s.TableTextTd>
                        <s.TableTextTd>커피자재/원두/카페인</s.TableTextTd>
                        <s.TableTextTd>1kg*12/Box</s.TableTextTd>
                        <s.TableTextTd>Box</s.TableTextTd>
                        <s.TableTextTd>상온/식품</s.TableTextTd>
                        <s.TableTextTd>9ea</s.TableTextTd>
                        <s.TableTextTd>150,000</s.TableTextTd>
                    </s.TableTextTr>
                    <s.TableTextTr>
                        <s.TableTextTd><input type='checkbox'/></s.TableTextTd>
                        <s.TableTextTd>45784213</s.TableTextTd>
                        <s.TableTextTd>2024.10.27</s.TableTextTd>
                        <s.TableTextTd><img src="/logo.svg" /><span>01542</span><br/><span>(원두)코소롱블랜드(1Kg*12)/Box</span></s.TableTextTd>
                        <s.TableTextTd>커피자재/원두/카페인</s.TableTextTd>
                        <s.TableTextTd>1kg*12/Box</s.TableTextTd>
                        <s.TableTextTd>Box</s.TableTextTd>
                        <s.TableTextTd>상온/식품</s.TableTextTd>
                        <s.TableTextTd>9ea</s.TableTextTd>
                        <s.TableTextTd>150,000</s.TableTextTd>
                    </s.TableTextTr>
                    <s.TableTextTr>
                        <s.TableTextTd><input type='checkbox'/></s.TableTextTd>
                        <s.TableTextTd>45784213</s.TableTextTd>
                        <s.TableTextTd>2024.10.27</s.TableTextTd>
                        <s.TableTextTd><img src="/logo.svg" /><span>01542</span><br/><span>(원두)코소롱블랜드(1Kg*12)/Box</span></s.TableTextTd>
                        <s.TableTextTd>커피자재/원두/카페인</s.TableTextTd>
                        <s.TableTextTd>1kg*12/Box</s.TableTextTd>
                        <s.TableTextTd>Box</s.TableTextTd>
                        <s.TableTextTd>상온/식품</s.TableTextTd>
                        <s.TableTextTd>9ea</s.TableTextTd>
                        <s.TableTextTd>150,000</s.TableTextTd>
                    </s.TableTextTr>
                    <s.TableTextTr>
                        <s.TableTextTd><input type='checkbox'/></s.TableTextTd>
                        <s.TableTextTd>45784213</s.TableTextTd>
                        <s.TableTextTd>2024.10.27</s.TableTextTd>
                        <s.TableTextTd><img src="/logo.svg" /><span>01542</span><br/><span>(원두)코소롱블랜드(1Kg*12)/Box</span></s.TableTextTd>
                        <s.TableTextTd>커피자재/원두/카페인</s.TableTextTd>
                        <s.TableTextTd>1kg*12/Box</s.TableTextTd>
                        <s.TableTextTd>Box</s.TableTextTd>
                        <s.TableTextTd>상온/식품</s.TableTextTd>
                        <s.TableTextTd>9ea</s.TableTextTd>
                        <s.TableTextTd>150,000</s.TableTextTd>
                    </s.TableTextTr>
                </tbody>
            </s.TableList>
            </s.ContentListDiv>
        </>
    )
}
export default StockOrderItemAdd;