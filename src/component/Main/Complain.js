import * as s from '../styles/StyledStore.tsx';

import { IconButton, ButtonGroup, Button } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../../config.js';

const Complain = () => {
    const [complainList, setComplainList] = useState([]);

    useEffect(()=>{
        setComplainList([]);
        getComplainList();
    }, [])

    const getComplainList = ()=>{
        axios.get(`${url}/complainList`)
        .then(res=>{
            console.log(res.data);
            setComplainList([...res.data]);
        })
        .catch(err=>{
            console.log(err);
        })
    }

    return (
        <>
            <s.ContentListDiv>
            <s.MainTitleText>고객의 소리</s.MainTitleText>
            <s.ButtonDiv width="1000px" style={{ textAlign: 'right' }}>
            <s.ButtonStyle><Link to="/complainWrite">글 작성</Link></s.ButtonStyle>
            </s.ButtonDiv>

            <s.TableList>
                <s.TableListThead><s.TableTextTh>번호</s.TableTextTh><s.TableTextTh>제목</s.TableTextTh><s.TableTextTh>작성자</s.TableTextTh>
                    <s.TableTextTh>작성일</s.TableTextTh><s.TableTextTh>상태</s.TableTextTh></s.TableListThead>
                <tbody>
                    {
                        complainList.map(complain=>(
                            <s.TableTextTr key={complain.complainNum}>
                                <s.TableTextTd>{complain.complainNum}</s.TableTextTd>
                                <s.TableTextTd>[{complain.storeName}]{complain.complainTitle}</s.TableTextTd>
                                <s.TableTextTd>{complain.userName}</s.TableTextTd>
                                <s.TableTextTd>{complain.complainDateStr}</s.TableTextTd>
                                <s.TableTextTd>{complain.complainStatus ? "전달완료":"전달중"}</s.TableTextTd>
                            </s.TableTextTr>
                        ))
                    }
                </tbody>
            </s.TableList>

                <s.PageButtonGroupDiv>
                    <s.ButtonGroupStyle variant="outlined">
                    <s.IconButtonStyle>
                        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                    </s.IconButtonStyle>
                    <s.IconButtonStyle>1</s.IconButtonStyle>
                    <s.IconButtonStyle>2</s.IconButtonStyle>
                    <s.IconButtonStyle>3</s.IconButtonStyle>
                    <s.IconButtonStyle>4</s.IconButtonStyle>
                    <s.IconButtonStyle>5</s.IconButtonStyle>
                    <s.IconButtonStyle>
                        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                    </s.IconButtonStyle>
                    </s.ButtonGroupStyle>
                </s.PageButtonGroupDiv>
            </s.ContentListDiv>
        </>
    )
}
export default Complain;