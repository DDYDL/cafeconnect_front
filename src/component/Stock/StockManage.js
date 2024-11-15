import * as s from '../styles/StyledStore.tsx';

import { Link } from 'react-router-dom';
import { Input, Select, Option } from "@material-tailwind/react";
import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from "react";

const StockManage = ()=>{
    return (
        <>
            <s.ContentListDiv>
                <s.MainTitleText>매장재고관리</s.MainTitleText>
                <s.CategoryButtonGroupDiv>
                <s.ButtonDiv>
                    <div className="w-16 p-r-2">
                        <Select label="대분류">
                            <Option>Material Tailwind HTML</Option>
                            <Option>Material Tailwind React</Option>
                            <Option>Material Tailwind Vue</Option>
                            <Option>Material Tailwind Angular</Option>
                            <Option>Material Tailwind Svelte</Option>
                        </Select>
                    </div>
                    <div className="w-16">
                        <Select label="중분류">
                            <Option>Material Tailwind HTML</Option>
                            <Option>Material Tailwind React</Option>
                            <Option>Material Tailwind Vue</Option>
                            <Option>Material Tailwind Angular</Option>
                            <Option>Material Tailwind Svelte</Option>
                        </Select>
                    </div>
                    <div className="w-16">
                        <Select label="소분류">
                            <Option>Material Tailwind HTML</Option>
                            <Option>Material Tailwind React</Option>
                            <Option>Material Tailwind Vue</Option>
                            <Option>Material Tailwind Angular</Option>
                            <Option>Material Tailwind Svelte</Option>
                        </Select>
                    </div>
                </s.ButtonDiv>
                <s.ButtonDiv float='right'>
                    <s.SearchDiv width='200px' className="p-2">
                        <Input icon={<MagnifyingGlassIcon className="h-5 w-5"/>} label="매장명 검색" />
                    </s.SearchDiv>
                </s.ButtonDiv>
                </s.CategoryButtonGroupDiv>

                <s.TableList>
                    <s.TableListThead><s.TableTextTh>상품정보</s.TableTextTh><s.TableTextTh>카테고리</s.TableTextTh><s.TableTextTh>규격</s.TableTextTh>
                        <s.TableTextTh>보관상태</s.TableTextTh><s.TableTextTh>유통기한</s.TableTextTh><s.TableTextTh>입고날짜</s.TableTextTh>
                        <s.TableTextTh>수량</s.TableTextTh><s.TableTextTh></s.TableTextTh><s.TableTextTh></s.TableTextTh></s.TableListThead>
                    <tbody>
                        <s.TableTextTr><PlusIcon className="h-5 w-5" /></s.TableTextTr>
                        <s.TableTextTr>
                            <s.TableTextTd><img src="/logo.svg"/><span>01542</span><br /><span>(원두)코소롱블랜드(1Kg*12)/Box</span></s.TableTextTd>
                            <s.TableTextTd>커피자재/원두/카페인</s.TableTextTd>
                            <s.TableTextTd>1kg*12/Box</s.TableTextTd>
                            <s.TableTextTd>상온/식품</s.TableTextTd>
                            <s.TableTextTd>-</s.TableTextTd>
                            <s.TableTextTd>-</s.TableTextTd>
                            <s.TableTextTd>20</s.TableTextTd>
                            <s.TableTextTd><s.ButtonStyle width="50px"><Link to="/">저장</Link></s.ButtonStyle></s.TableTextTd>
                            <s.TableTextTd><s.ButtonStyle width="50px"><Link to="/">삭제</Link></s.ButtonStyle></s.TableTextTd>
                        </s.TableTextTr>
                        <s.TableTextTr>
                            <s.TableTextTd><img src="/logo.svg" /><span>01542</span><br /><span>(원두)코소롱블랜드(1Kg*12)/Box</span></s.TableTextTd>
                            <s.TableTextTd>커피자재/원두/카페인</s.TableTextTd>
                            <s.TableTextTd>1kg*12/Box</s.TableTextTd>
                            <s.TableTextTd>상온/식품</s.TableTextTd>
                            <s.TableTextTd>-</s.TableTextTd>
                            <s.TableTextTd>-</s.TableTextTd>
                            <s.TableTextTd>20</s.TableTextTd>
                            <s.TableTextTd><s.ButtonStyle width="50px"><Link to="/">저장</Link></s.ButtonStyle></s.TableTextTd>
                            <s.TableTextTd><s.ButtonStyle width="50px"><Link to="/">삭제</Link></s.ButtonStyle></s.TableTextTd>
                        </s.TableTextTr>
                        <s.TableTextTr>
                            <s.TableTextTd><img src="/logo.svg" /><span>01542</span><br /><span>(원두)코소롱블랜드(1Kg*12)/Box</span></s.TableTextTd>
                            <s.TableTextTd>커피자재/원두/카페인</s.TableTextTd>
                            <s.TableTextTd>1kg*12/Box</s.TableTextTd>
                            <s.TableTextTd>상온/식품</s.TableTextTd>
                            <s.TableTextTd>-</s.TableTextTd>
                            <s.TableTextTd>-</s.TableTextTd>
                            <s.TableTextTd>20</s.TableTextTd>
                            <s.TableTextTd><s.ButtonStyle width="50px"><Link to="/">저장</Link></s.ButtonStyle></s.TableTextTd>
                            <s.TableTextTd><s.ButtonStyle width="50px"><Link to="/">삭제</Link></s.ButtonStyle></s.TableTextTd>
                        </s.TableTextTr>
                        <s.TableTextTr>
                            <s.TableTextTd><img src="/logo.svg"/><span>01542</span><br /><span>(원두)코소롱블랜드(1Kg*12)/Box</span></s.TableTextTd>
                            <s.TableTextTd>커피자재/원두/카페인</s.TableTextTd>
                            <s.TableTextTd>1kg*12/Box</s.TableTextTd>
                            <s.TableTextTd>상온/식품</s.TableTextTd>
                            <s.TableTextTd>-</s.TableTextTd>
                            <s.TableTextTd>-</s.TableTextTd>
                            <s.TableTextTd>20</s.TableTextTd>
                            <s.TableTextTd><s.ButtonStyle width="50px"><Link to="/">저장</Link></s.ButtonStyle></s.TableTextTd>
                            <s.TableTextTd><s.ButtonStyle width="50px"><Link to="/">삭제</Link></s.ButtonStyle></s.TableTextTd>
                        </s.TableTextTr>
                        <s.TableTextTr>
                            <s.TableTextTd><img src="/logo.svg"/><span>01542</span><br /><span>(원두)코소롱블랜드(1Kg*12)/Box</span></s.TableTextTd>
                            <s.TableTextTd>커피자재/원두/카페인</s.TableTextTd>
                            <s.TableTextTd>1kg*12/Box</s.TableTextTd>
                            <s.TableTextTd>상온/식품</s.TableTextTd>
                            <s.TableTextTd>-</s.TableTextTd>
                            <s.TableTextTd>-</s.TableTextTd>
                            <s.TableTextTd>20</s.TableTextTd>
                            <s.TableTextTd><s.ButtonStyle width="50px"><Link to="/">저장</Link></s.ButtonStyle></s.TableTextTd>
                            <s.TableTextTd><s.ButtonStyle width="50px"><Link to="/">삭제</Link></s.ButtonStyle></s.TableTextTd>
                        </s.TableTextTr>
                    </tbody>
                </s.TableList>
            </s.ContentListDiv>
        </>
    )
}
export default StockManage;