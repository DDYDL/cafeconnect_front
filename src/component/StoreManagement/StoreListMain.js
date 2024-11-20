import * as s from '../styles/StyledStore.tsx';

import { Link } from 'react-router-dom';
import { Input, Select, Option } from "@material-tailwind/react";
import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {useState} from "react";

const StoreListMain = ()=>{
    const [detail, setDetail] = useState(false);

    const storeDetail = ()=>{
        setDetail(!detail);
    }

    return (
        <>
            <s.ContentListDiv>
                <s.MainTitleText>가맹점 조회</s.MainTitleText>
                <s.CategoryButtonGroupDiv flexDirection='row' alignItems='flex-end'>
                    <s.ButtonDiv>
                    <s.SearchDiv width='200px'>
                        <Input icon={<MagnifyingGlassIcon className="h-5 w-5"/>} label="매장명 검색" />
                    </s.SearchDiv>
                    </s.ButtonDiv>
                    <s.ButtonInnerDiv className='w-16'>
                        <s.SelectStyle label="지역">
                            <Option>Material Tailwind HTML</Option>
                            <Option>Material Tailwind React</Option>
                            <Option>Material Tailwind Vue</Option>
                            <Option>Material Tailwind Angular</Option>
                            <Option>Material Tailwind Svelte</Option>
                        </s.SelectStyle>
                    </s.ButtonInnerDiv>
                </s.CategoryButtonGroupDiv>

                <s.TableList>
                    <s.TableListThead><s.TableTextTh width='160px'>지역</s.TableTextTh>
                        <s.TableTextTh width='160px'>매장명</s.TableTextTh>
                        <s.TableTextTh width='500px'>주소</s.TableTextTh>
                        <s.TableTextTh width='130px'>전화번호</s.TableTextTh></s.TableListThead>
                    <tbody  textAlign='center'>
                        <s.TableTextTr onClick={storeDetail}>
                            <s.TableTextTd width='160px'>서울특별시</s.TableTextTd>
                            <s.TableTextTd width='160px'>대림성모점</s.TableTextTd>
                            <s.TableTextTd width='500px'>서울특별시 동작구 시흥대로 658</s.TableTextTd>
                            <s.TableTextTd width='130px'>02-6081-0202</s.TableTextTd>
                        </s.TableTextTr>
                        <s.TableTextTr onClick={storeDetail}>
                            <s.TableTextTd width='160px'>서울특별시</s.TableTextTd>
                            <s.TableTextTd width='160px'>대림성모점</s.TableTextTd>
                            <s.TableTextTd width='500px'>서울특별시 동작구 시흥대로 658</s.TableTextTd>
                            <s.TableTextTd width='130px'>02-6081-0202</s.TableTextTd>
                        </s.TableTextTr>
                        <s.TableTextTr onClick={storeDetail}>
                            <s.TableTextTd width='160px'>서울특별시</s.TableTextTd>
                            <s.TableTextTd width='160px'>대림성모점</s.TableTextTd>
                            <s.TableTextTd width='500px'>서울특별시 동작구 시흥대로 658</s.TableTextTd>
                            <s.TableTextTd width='130px'>02-6081-0202</s.TableTextTd>
                        </s.TableTextTr>
                        <s.TableTextTr onClick={storeDetail}>
                            <s.TableTextTd width='160px'>서울특별시</s.TableTextTd>
                            <s.TableTextTd width='160px'>대림성모점</s.TableTextTd>
                            <s.TableTextTd width='500px'>서울특별시 동작구 시흥대로 658</s.TableTextTd>
                            <s.TableTextTd width='130px'>02-6081-0202</s.TableTextTd>
                        </s.TableTextTr>
                        <s.TableTextTr onClick={storeDetail}>
                            <s.TableTextTd width='160px'>서울특별시</s.TableTextTd>
                            <s.TableTextTd width='160px'>대림성모점</s.TableTextTd>
                            <s.TableTextTd width='500px'>서울특별시 동작구 시흥대로 658</s.TableTextTd>
                            <s.TableTextTd width='130px'>02-6081-0202</s.TableTextTd>
                        </s.TableTextTr>
                        <s.TableTextTr onClick={storeDetail}>
                            <s.TableTextTd width='160px'>서울특별시</s.TableTextTd>
                            <s.TableTextTd width='160px'>대림성모점</s.TableTextTd>
                            <s.TableTextTd width='500px'>서울특별시 동작구 시흥대로 658</s.TableTextTd>
                            <s.TableTextTd width='130px'>02-6081-0202</s.TableTextTd>
                        </s.TableTextTr>
                        <s.TableTextTr onClick={storeDetail}>
                            <s.TableTextTd width='160px'>서울특별시</s.TableTextTd>
                            <s.TableTextTd width='160px'>대림성모점</s.TableTextTd>
                            <s.TableTextTd width='500px'>서울특별시 동작구 시흥대로 658</s.TableTextTd>
                            <s.TableTextTd width='130px'>02-6081-0202</s.TableTextTd>
                        </s.TableTextTr>
                        <s.TableTextTr onClick={storeDetail}>
                            <s.TableTextTd width='160px'>서울특별시</s.TableTextTd>
                            <s.TableTextTd width='160px'>대림성모점</s.TableTextTd>
                            <s.TableTextTd width='500px'>서울특별시 동작구 시흥대로 658</s.TableTextTd>
                            <s.TableTextTd width='130px'>02-6081-0202</s.TableTextTd>
                        </s.TableTextTr>
                        <s.TableTextTr onClick={storeDetail}>
                            <s.TableTextTd width='160px'>서울특별시</s.TableTextTd>
                            <s.TableTextTd width='160px'>대림성모점</s.TableTextTd>
                            <s.TableTextTd width='500px'>서울특별시 동작구 시흥대로 658</s.TableTextTd>
                            <s.TableTextTd width='130px'>02-6081-0202</s.TableTextTd>
                        </s.TableTextTr>
                        <s.TableTextTr onClick={storeDetail}>
                            <s.TableTextTd width='160px'>서울특별시</s.TableTextTd>
                            <s.TableTextTd width='160px'>대림성모점</s.TableTextTd>
                            <s.TableTextTd width='500px'>서울특별시 동작구 시흥대로 658</s.TableTextTd>
                            <s.TableTextTd width='130px'>02-6081-0202</s.TableTextTd>
                        </s.TableTextTr>
                    </tbody>
                </s.TableList>
            </s.ContentListDiv>
        </>
    )
}
export default StoreListMain;