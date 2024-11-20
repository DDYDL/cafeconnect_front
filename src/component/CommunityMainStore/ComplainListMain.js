import * as s from '../styles/StyledStore.tsx';
import * as h from '../styles/HStyledStore.tsx';

import { Link } from 'react-router-dom';
import { Input, Select, Option } from "@material-tailwind/react";
import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {useState} from "react";

const ComplainListMain = ()=>{
    const [detail, setDetail] = useState(false);

    const complainDetail = ()=>{
        setDetail(!detail);
    }

    return (
        <>
            <s.ContentListDiv>
                <s.MainTitleText>컴플레인</s.MainTitleText>
                <s.CategoryButtonGroupDiv >
                    <s.ButtonDiv>총 10건</s.ButtonDiv>
                </s.CategoryButtonGroupDiv>
                <s.TableList>
                    <s.TableListThead>
                        <s.TableTextTh width='50px'></s.TableTextTh>
                        <s.TableTextTh width='160px'>작성자</s.TableTextTh>
                        <s.TableTextTh width='300px'>제목</s.TableTextTh>
                        <s.TableTextTh width='130px'>가맹점명</s.TableTextTh>
                        <s.TableTextTh width='130px'>작성일</s.TableTextTh>
                        <s.TableTextTh width='130px'>답변상태</s.TableTextTh>
                    </s.TableListThead>
                    <tbody>
                        <s.TableTextTr onClick={complainDetail}>
                            <s.TableTextTd width='50px'>82</s.TableTextTd>
                            <s.TableTextTd width='160px'>김**</s.TableTextTd>
                            <s.TableTextTd width='300px'>직원이 굉장히 불친절함</s.TableTextTd>
                            <s.TableTextTd width='130px'>가산호서대점</s.TableTextTd>
                            <s.TableTextTd width='130px'>2024.10.23</s.TableTextTd>
                            <s.TableTextTd width='130px'>답변대기</s.TableTextTd>
                        </s.TableTextTr>
                        <s.TableTextTr onClick={complainDetail}>
                        <s.TableTextTd width='160px'>81</s.TableTextTd>
                        <s.TableTextTd width='160px'>김**</s.TableTextTd>
                            <s.TableTextTd width='300px'>직원이 굉장히 불친절함</s.TableTextTd>
                            <s.TableTextTd width='130px'>가산호서대점</s.TableTextTd>
                            <s.TableTextTd width='130px'>2024.10.23</s.TableTextTd>
                            <s.TableTextTd width='130px'>답변대기</s.TableTextTd>
                        </s.TableTextTr>
                        <s.TableTextTr onClick={complainDetail}>
                        <s.TableTextTd width='160px'>80</s.TableTextTd>
                        <s.TableTextTd width='160px'>김**</s.TableTextTd>
                            <s.TableTextTd width='300px'>직원이 굉장히 불친절함</s.TableTextTd>
                            <s.TableTextTd width='130px'>가산호서대점</s.TableTextTd>
                            <s.TableTextTd width='130px'>2024.10.23</s.TableTextTd>
                            <s.TableTextTd width='130px'>답변완료</s.TableTextTd>
                        </s.TableTextTr>
                        <s.TableTextTr onClick={complainDetail}>
                        <s.TableTextTd width='160px'>79</s.TableTextTd>
                        <s.TableTextTd width='160px'>김**</s.TableTextTd>
                            <s.TableTextTd width='300px'>직원이 굉장히 불친절함</s.TableTextTd>
                            <s.TableTextTd width='130px'>가산호서대점</s.TableTextTd>
                            <s.TableTextTd width='130px'>2024.10.23</s.TableTextTd>
                            <s.TableTextTd width='130px'>답변완료</s.TableTextTd>
                        </s.TableTextTr>
                        <s.TableTextTr onClick={complainDetail}>
                        <s.TableTextTd width='160px'>78</s.TableTextTd>
                        <s.TableTextTd width='160px'>김**</s.TableTextTd>
                            <s.TableTextTd width='300px'>직원이 굉장히 불친절함</s.TableTextTd>
                            <s.TableTextTd width='130px'>가산호서대점</s.TableTextTd>
                            <s.TableTextTd width='130px'>2024.10.23</s.TableTextTd>
                            <s.TableTextTd width='130px'>답변완료</s.TableTextTd>
                        </s.TableTextTr>
                        <s.TableTextTr onClick={complainDetail}>
                        <s.TableTextTd width='160px'>77</s.TableTextTd>
                        <s.TableTextTd width='160px'>김**</s.TableTextTd>
                            <s.TableTextTd width='300px'>직원이 굉장히 불친절함</s.TableTextTd>
                            <s.TableTextTd width='130px'>가산호서대점</s.TableTextTd>
                            <s.TableTextTd width='130px'>2024.10.23</s.TableTextTd>
                            <s.TableTextTd width='130px'>답변완료</s.TableTextTd>
                        </s.TableTextTr>
                    </tbody>
                </s.TableList>
            </s.ContentListDiv>
        </>
    )
}
export default ComplainListMain;