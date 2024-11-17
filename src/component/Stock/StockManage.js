import * as s from '../styles/StyledStore.tsx';

import { Link } from 'react-router-dom';
import { Input, Select, Option } from "@material-tailwind/react";
import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {useState} from "react";

const StockManage = ()=>{
    const [add, setAdd] = useState(false);
    const [info, setInfo] = useState(false);
    const addStock = ()=>{
        setAdd(!add);
    }

    const stockInfo = ()=>{
        setInfo(!info);
    }

    return (
        <>
            <s.ContentListDiv>
                <s.MainTitleText>매장재고관리</s.MainTitleText>
                <s.CategoryButtonGroupDiv>
                <s.ButtonDiv>
                        <s.ButtonInnerDiv className='w-16 p-r-2'>
                        <s.SelectStyle label="대분류">
                            <Option>Material Tailwind HTML</Option>
                            <Option>Material Tailwind React</Option>
                            <Option>Material Tailwind Vue</Option>
                            <Option>Material Tailwind Angular</Option>
                            <Option>Material Tailwind Svelte</Option>
                        </s.SelectStyle>
                    </s.ButtonInnerDiv>
                    <s.ButtonInnerDiv className="w-16">
                        <Select label="중분류">
                            <Option>Material Tailwind HTML</Option>
                            <Option>Material Tailwind React</Option>
                            <Option>Material Tailwind Vue</Option>
                            <Option>Material Tailwind Angular</Option>
                            <Option>Material Tailwind Svelte</Option>
                        </Select>
                    </s.ButtonInnerDiv>
                    <s.ButtonInnerDiv className="w-16">
                        <Select label="소분류">
                            <Option>Material Tailwind HTML</Option>
                            <Option>Material Tailwind React</Option>
                            <Option>Material Tailwind Vue</Option>
                            <Option>Material Tailwind Angular</Option>
                            <Option>Material Tailwind Svelte</Option>
                        </Select>
                    </s.ButtonInnerDiv>
                </s.ButtonDiv>
                <s.ButtonDiv width='200px' float='right'>
                    <s.SearchDiv width='200px'>
                        <Input icon={<MagnifyingGlassIcon className="h-5 w-5"/>} label="매장명 검색" />
                    </s.SearchDiv>
                </s.ButtonDiv>
                </s.CategoryButtonGroupDiv>

                <s.TableList>
                    <s.TableListThead><s.TableTextTh width='250px'>상품정보</s.TableTextTh><s.TableTextTh width='150px'>카테고리</s.TableTextTh><s.TableTextTh width='100px'>규격</s.TableTextTh>
                        <s.TableTextTh width='100px'>보관상태</s.TableTextTh><s.TableTextTh width='80px'>유통기한</s.TableTextTh><s.TableTextTh width='80px'>입고날짜</s.TableTextTh>
                        <s.TableTextTh width='80px'>수량</s.TableTextTh><s.TableTextTh width='50px'></s.TableTextTh><s.TableTextTh width='50px'></s.TableTextTh></s.TableListThead>
                    <tbody>
                        <s.TableTextTr onClick={addStock}><PlusIcon className="h-5 w-5"/></s.TableTextTr>
                        {add && <s.TableTextTr>
                            <s.TableTextTd><s.InputStyle width='250px'/></s.TableTextTd>
                            <s.TableTextTd><s.InputStyle width='150px'/></s.TableTextTd>
                            <s.TableTextTd><s.InputStyle width='80px'/></s.TableTextTd>
                            <s.TableTextTd><s.InputStyle width='80px'/></s.TableTextTd>
                            <s.TableTextTd><s.InputStyle width='80px'/></s.TableTextTd>
                            <s.TableTextTd><s.InputStyle width='50px'/></s.TableTextTd>
                            <s.TableTextTd><s.InputStyle width='50px'/></s.TableTextTd>
                            <s.TableTextTd width='50px'><s.ButtonStyle width="50px" onClick={addStock}><Link>저장</Link></s.ButtonStyle></s.TableTextTd>
                            </s.TableTextTr>}
                        <s.TableTextTr onClick={stockInfo}>
                            <s.TableTextTd width='250px'><s.ImageSize src="/logo.svg" /><s.SpanSizeDiv><s.SpanSize>01542</s.SpanSize><br /><s.SpanSize>(원두)코소롱블랜드(1Kg*12)/Box</s.SpanSize></s.SpanSizeDiv></s.TableTextTd>
                            <s.TableTextTd width='150px'>커피자재/원두/카페인</s.TableTextTd>
                            <s.TableTextTd width='100px'>1kg*12/Box</s.TableTextTd>
                            <s.TableTextTd width='100px'>상온/식품</s.TableTextTd>
                            <s.TableTextTd width='80px'>-</s.TableTextTd>
                            <s.TableTextTd width='80px'>-</s.TableTextTd>
                            <s.TableTextTd width='80px'>20</s.TableTextTd>
                        </s.TableTextTr>
                        {info && <><s.TableTextTr height='45px' bgColor='rgba(234, 234, 234, 1)'>
                            <s.TableTextTd width='250px'><s.SpanSizeDiv><s.SpanSize>01542</s.SpanSize><br /><s.SpanSize>(원두)코소롱블랜드(1Kg*12)/Box</s.SpanSize></s.SpanSizeDiv></s.TableTextTd>
                            <s.TableTextTd width='150px'>커피자재/원두/카페인</s.TableTextTd>
                            <s.TableTextTd width='100px'>1kg*12/Box</s.TableTextTd>
                            <s.TableTextTd width='100px'>상온/식품</s.TableTextTd>
                            <s.TableTextTd width='80px'>-</s.TableTextTd>
                            <s.TableTextTd width='80px'>-</s.TableTextTd>
                            <s.TableTextTd width='80px'>10</s.TableTextTd>
                            <s.TableTextTd width='50px'><s.ButtonStyle width="50px"><Link to="/">저장</Link></s.ButtonStyle></s.TableTextTd>
                            <s.TableTextTd width='50px'><s.ButtonStyle width="50px"><Link to="/">삭제</Link></s.ButtonStyle></s.TableTextTd>
                        </s.TableTextTr>
                        <s.TableTextTr height='45px' bgColor='rgba(234, 234, 234, 1)'>
                            <s.TableTextTd width='250px'><s.SpanSizeDiv><s.SpanSize>01542</s.SpanSize><br /><s.SpanSize>(원두)코소롱블랜드(1Kg*12)/Box</s.SpanSize></s.SpanSizeDiv></s.TableTextTd>
                            <s.TableTextTd width='150px'>커피자재/원두/카페인</s.TableTextTd>
                            <s.TableTextTd width='100px'>1kg*12/Box</s.TableTextTd>
                            <s.TableTextTd width='100px'>상온/식품</s.TableTextTd>
                            <s.TableTextTd width='80px'>-</s.TableTextTd>
                            <s.TableTextTd width='80px'>-</s.TableTextTd>
                            <s.TableTextTd width='80px'>10</s.TableTextTd>
                            <s.TableTextTd width='50px'><s.ButtonStyle width="50px"><Link to="/">저장</Link></s.ButtonStyle></s.TableTextTd>
                            <s.TableTextTd width='50px'><s.ButtonStyle width="50px"><Link to="/">삭제</Link></s.ButtonStyle></s.TableTextTd>
                            </s.TableTextTr></>
                        }
                        <s.TableTextTr>
                            <s.TableTextTd width='250px'><s.ImageSize src="/logo.svg" /><s.SpanSizeDiv><s.SpanSize>01542</s.SpanSize><br /><s.SpanSize>(원두)코소롱블랜드(1Kg*12)/Box</s.SpanSize></s.SpanSizeDiv></s.TableTextTd>
                            <s.TableTextTd width='150px'>커피자재/원두/카페인</s.TableTextTd>
                            <s.TableTextTd width='100px'>1kg*12/Box</s.TableTextTd>
                            <s.TableTextTd width='100px'>상온/식품</s.TableTextTd>
                            <s.TableTextTd width='80px'>-</s.TableTextTd>
                            <s.TableTextTd width='80px'>-</s.TableTextTd>
                            <s.TableTextTd width='80px'>20</s.TableTextTd>
                        </s.TableTextTr>
                        <s.TableTextTr>
                            <s.TableTextTd width='250px'><s.ImageSize src="/logo.svg" /><s.SpanSizeDiv><s.SpanSize>01542</s.SpanSize><br /><s.SpanSize>(원두)코소롱블랜드(1Kg*12)/Box</s.SpanSize></s.SpanSizeDiv></s.TableTextTd>
                            <s.TableTextTd width='150px'>커피자재/원두/카페인</s.TableTextTd>
                            <s.TableTextTd width='100px'>1kg*12/Box</s.TableTextTd>
                            <s.TableTextTd width='100px'>상온/식품</s.TableTextTd>
                            <s.TableTextTd width='80px'>-</s.TableTextTd>
                            <s.TableTextTd width='80px'>-</s.TableTextTd>
                            <s.TableTextTd width='80px'>20</s.TableTextTd>
                        </s.TableTextTr>
                        <s.TableTextTr>
                            <s.TableTextTd width='250px'><s.ImageSize src="/logo.svg" /><s.SpanSizeDiv><s.SpanSize>01542</s.SpanSize><br /><s.SpanSize>(원두)코소롱블랜드(1Kg*12)/Box</s.SpanSize></s.SpanSizeDiv></s.TableTextTd>
                            <s.TableTextTd width='150px'>커피자재/원두/카페인</s.TableTextTd>
                            <s.TableTextTd width='100px'>1kg*12/Box</s.TableTextTd>
                            <s.TableTextTd width='100px'>상온/식품</s.TableTextTd>
                            <s.TableTextTd width='80px'>-</s.TableTextTd>
                            <s.TableTextTd width='80px'>-</s.TableTextTd>
                            <s.TableTextTd width='80px'>20</s.TableTextTd>
                        </s.TableTextTr>
                        <s.TableTextTr>
                            <s.TableTextTd width='250px'><s.ImageSize src="/logo.svg" /><s.SpanSizeDiv><s.SpanSize>01542</s.SpanSize><br /><s.SpanSize>(원두)코소롱블랜드(1Kg*12)/Box</s.SpanSize></s.SpanSizeDiv></s.TableTextTd>
                            <s.TableTextTd width='150px'>커피자재/원두/카페인</s.TableTextTd>
                            <s.TableTextTd width='100px'>1kg*12/Box</s.TableTextTd>
                            <s.TableTextTd width='100px'>상온/식품</s.TableTextTd>
                            <s.TableTextTd width='80px'>-</s.TableTextTd>
                            <s.TableTextTd width='80px'>-</s.TableTextTd>
                            <s.TableTextTd width='80px'>20</s.TableTextTd>
                        </s.TableTextTr>
                    </tbody>
                </s.TableList>
            </s.ContentListDiv>
        </>
    )
}
export default StockManage;