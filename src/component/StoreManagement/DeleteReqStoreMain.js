import * as s from '../styles/StyledStore.tsx';

import { Link } from 'react-router-dom';
import { Input, Select, Option } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {useState} from "react";

const DeleteReqStoreMain = ()=>{
    return (
        <>
            <s.ContentListDiv>
                <s.MainTitleText>가맹점 삭제 요청</s.MainTitleText>
                <s.CategoryButtonGroupDiv>
                <s.ButtonDiv float='right'>
                    <s.ButtonInnerDiv className="w-16">
                        <Select label="지역">
                            <Option>Material Tailwind HTML</Option>
                            <Option>Material Tailwind React</Option>
                            <Option>Material Tailwind Vue</Option>
                            <Option>Material Tailwind Angular</Option>
                            <Option>Material Tailwind Svelte</Option>
                        </Select>
                    </s.ButtonInnerDiv>
                    <s.SearchDiv width='200px'>
                        <Input icon={<MagnifyingGlassIcon className="h-5 w-5"/>} label="매장명 검색" />
                    </s.SearchDiv>
                </s.ButtonDiv>
                </s.CategoryButtonGroupDiv>

                <s.TableList>
                    <s.TableListThead>
                        <s.TableTextTh width='160px'>가맹점코드</s.TableTextTh>
                        <s.TableTextTh width='160px'>매장명</s.TableTextTh>
                        <s.TableTextTh width='500px'>주소</s.TableTextTh>
                        <s.TableTextTh width='160px'></s.TableTextTh></s.TableListThead>
                    <tbody textAlign='center'>
                        <s.TableTextTr height='45px'>
                            <s.TableTextTd width='160px'>서울특별시</s.TableTextTd>
                            <s.TableTextTd width='160px'>대림성모점</s.TableTextTd>
                            <s.TableTextTd width='500px'>서울특별시 동작구 시흥대로 658</s.TableTextTd>
                            <s.TableTextTd width='160px'><s.ButtonStyle width="100px"><Link to="/">삭제하기</Link></s.ButtonStyle></s.TableTextTd>
                        </s.TableTextTr>
                        <s.TableTextTr height='45px'>
                            <s.TableTextTd width='160px'>서울특별시</s.TableTextTd>
                            <s.TableTextTd width='160px'>대림성모점</s.TableTextTd>
                            <s.TableTextTd width='500px'>서울특별시 동작구 시흥대로 658</s.TableTextTd>
                            <s.TableTextTd width='160px'><s.ButtonStyle width="100px"><Link to="/">삭제하기</Link></s.ButtonStyle></s.TableTextTd>
                        </s.TableTextTr>
                        <s.TableTextTr height='45px'>
                            <s.TableTextTd width='160px'>서울특별시</s.TableTextTd>
                            <s.TableTextTd width='160px'>대림성모점</s.TableTextTd>
                            <s.TableTextTd width='500px'>서울특별시 동작구 시흥대로 658</s.TableTextTd>
                            <s.TableTextTd width='160px'><s.ButtonStyle width="100px"><Link to="/">삭제하기</Link></s.ButtonStyle></s.TableTextTd>
                        </s.TableTextTr>
                        <s.TableTextTr height='45px'>
                            <s.TableTextTd width='160px'>서울특별시</s.TableTextTd>
                            <s.TableTextTd width='160px'>대림성모점</s.TableTextTd>
                            <s.TableTextTd width='500px'>서울특별시 동작구 시흥대로 658</s.TableTextTd>
                            <s.TableTextTd width='160px'><s.ButtonStyle width="100px"><Link to="/">삭제하기</Link></s.ButtonStyle></s.TableTextTd>
                        </s.TableTextTr>
                        <s.TableTextTr height='45px'>
                            <s.TableTextTd width='160px'>서울특별시</s.TableTextTd>
                            <s.TableTextTd width='160px'>대림성모점</s.TableTextTd>
                            <s.TableTextTd width='500px'>서울특별시 동작구 시흥대로 658</s.TableTextTd>
                            <s.TableTextTd width='160px'><s.ButtonStyle width="100px"><Link to="/">삭제하기</Link></s.ButtonStyle></s.TableTextTd>
                        </s.TableTextTr>
                    </tbody>
                </s.TableList>
            </s.ContentListDiv>
        </>
    )
}
export default DeleteReqStoreMain;