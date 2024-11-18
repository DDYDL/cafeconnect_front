import * as s from '../styles/StyledStore.tsx';

import { Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useNavigate } from 'react-router';

const StockOrderStore = () => {
    const navigate = useNavigate();

    const selectItem = ()=>{
        navigate("/stockOtherStoreItem");
    }

    return (
        <>
            <s.ContentListDiv>
                <s.MainTitleText>타매장재고조회</s.MainTitleText>
                <s.SearchButtonDiv>
                    <s.SearchDiv>
                        <Input icon={<MagnifyingGlassIcon className="h-5 w-5" />} label="상품을 검색해주세요" />
                    </s.SearchDiv>
                </s.SearchButtonDiv>

                <s.TableList>
                    <s.TableListThead><s.TableTextTh>상품정보</s.TableTextTh><s.TableTextTh>카테고리</s.TableTextTh><s.TableTextTh>규격</s.TableTextTh>
                        <s.TableTextTh>보관상태</s.TableTextTh><s.TableTextTh>공급가</s.TableTextTh></s.TableListThead>
                    <tbody>
                        <s.TableTextTr onClick={selectItem}>
                            <s.TableTextTd><img src="/logo.svg" /><span>01542</span><br /><span>(원두)코소롱블랜드(1Kg*12)/Box</span></s.TableTextTd>
                            <s.TableTextTd>커피자재/원두/카페인</s.TableTextTd>
                            <s.TableTextTd>1kg*12/Box</s.TableTextTd>
                            <s.TableTextTd>상온/식품</s.TableTextTd>
                            <s.TableTextTd>150.000</s.TableTextTd>
                        </s.TableTextTr>
                        <s.TableTextTr onClick={selectItem}>
                            <s.TableTextTd><img src="/logo.svg" /><span>01542</span><br /><span>(원두)코소롱블랜드(1Kg*12)/Box</span></s.TableTextTd>
                            <s.TableTextTd>커피자재/원두/카페인</s.TableTextTd>
                            <s.TableTextTd>1kg*12/Box</s.TableTextTd>
                            <s.TableTextTd>상온/식품</s.TableTextTd>
                            <s.TableTextTd>150.000</s.TableTextTd>
                        </s.TableTextTr>
                        <s.TableTextTr onClick={selectItem}>
                            <s.TableTextTd><img src="/logo.svg" /><span>01542</span><br /><span>(원두)코소롱블랜드(1Kg*12)/Box</span></s.TableTextTd>
                            <s.TableTextTd>커피자재/원두/카페인</s.TableTextTd>
                            <s.TableTextTd>1kg*12/Box</s.TableTextTd>
                            <s.TableTextTd>상온/식품</s.TableTextTd>
                            <s.TableTextTd>150.000</s.TableTextTd>
                        </s.TableTextTr>
                        <s.TableTextTr onClick={selectItem}>
                            <s.TableTextTd><img src="/logo.svg" /><span>01542</span><br /><span>(원두)코소롱블랜드(1Kg*12)/Box</span></s.TableTextTd>
                            <s.TableTextTd>커피자재/원두/카페인</s.TableTextTd>
                            <s.TableTextTd>1kg*12/Box</s.TableTextTd>
                            <s.TableTextTd>상온/식품</s.TableTextTd>
                            <s.TableTextTd>150.000</s.TableTextTd>
                        </s.TableTextTr>
                        <s.TableTextTr onClick={selectItem}>
                            <s.TableTextTd><img src="/logo.svg" /><span>01542</span><br /><span>(원두)코소롱블랜드(1Kg*12)/Box</span></s.TableTextTd>
                            <s.TableTextTd>커피자재/원두/카페인</s.TableTextTd>
                            <s.TableTextTd>1kg*12/Box</s.TableTextTd>
                            <s.TableTextTd>상온/식품</s.TableTextTd>
                            <s.TableTextTd>150.000</s.TableTextTd>
                        </s.TableTextTr>
                    </tbody>
                </s.TableList>
            </s.ContentListDiv>
        </>
    )
}
export default StockOrderStore;