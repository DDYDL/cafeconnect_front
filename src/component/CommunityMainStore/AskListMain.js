import * as s from '../styles/StyledStore.tsx';
import * as h from '../styles/HStyledStore.tsx';

import {useState, useEffect} from 'react';
import {axiosInToken} from '../../config.js'
import { useAtom } from 'jotai/react';
import { tokenAtom } from '../../atoms';
import { format } from "date-fns";
import { ko } from "date-fns/locale/ko";
import { useNavigate } from 'react-router';
import { ArrowRightIcon, ArrowLeftIcon} from "@heroicons/react/24/outline";

const AskListMain = ()=>{
    const [askList, setAskList] = useState([]);
    const [pageBtn, setPageBtn] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [token,setToken] = useAtom(tokenAtom);
    const navigate = useNavigate();

    useEffect(()=> {
        // 토큰의 State가 useEffect보다 느려서 토큰없이 실행 방지(Error 방지)
        if(token!=null && token!=='')  select(1);
    }, [token])

    const select = (page) => {
        axiosInToken(token).get(`askListMain?page=${page}`)
            .then(res=> {
                if(res.headers.authorization!=null) { setToken(res.headers.authorization) }

                let pageInfo = res.data.pageInfo;
                console.log(res.data.askList)
                setAskList([...res.data.askList])
                let page = [];
                for(let i=pageInfo.startPage; i<=pageInfo.endPage; i++) {
                    page.push(i);
                }
                setPageBtn([...page]);
                setPageInfo(pageInfo);
            })
    }

    const askDetail = (askNum)=>{
        navigate(`/askDetailMain/${askNum}`);
    }

    return (
        <>
            <s.ContentListDiv>
                <s.MainTitleText>1:1 문의</s.MainTitleText>
                <s.CategoryButtonGroupDiv >
                    <h.ListCntDiv>총 10건</h.ListCntDiv>
                </s.CategoryButtonGroupDiv>

                <s.TableList>
                    <s.TableListThead>
                        <s.TableTextTh width='50px'></s.TableTextTh>
                        <h.TableTextTh width='160px'>분류</h.TableTextTh>
                        <h.TableTextTh width='280px'>제목</h.TableTextTh>
                        <h.TableTextTh width='130px'>가맹점명</h.TableTextTh>
                        <h.TableTextTh width='130px'>작성일</h.TableTextTh>
                        <h.TableTextTh width='130px'>답변상태</h.TableTextTh>
                    </s.TableListThead>
                    <tbody>
                    {askList.map(ask=>(
                        <s.TableTextTr key={ask.askNum} onClick={e=>askDetail(ask.askNum)}>
                            <s.TableTextTd width='50px'>{ask.askNum}</s.TableTextTd >
                            <h.TableTextTd width='160px'>{ask.askType}</h.TableTextTd >
                            <h.TableTextTd width='300px'>{ask.askTitle}</h.TableTextTd >
                            <h.TableTextTd width='130px'>{ask.storeName}</h.TableTextTd >
                            <h.TableTextTd width='130px'>{format(ask.askDate, 'yyyy.MM.dd', {locale: ko})}</h.TableTextTd >
                            <h.TableTextTd width='130px'>{ask.askStatus=="answered"?            
                            <h.StatusTextTrue>답변완료</h.StatusTextTrue>:
                            <h.StatusTextFalse>미답변</h.StatusTextFalse>}
                            </h.TableTextTd >
                        </s.TableTextTr>
                    ))}
                    </tbody>
                </s.TableList>
                <s.PageButtonGroupDiv>
                  <s.ButtonGroupStyle variant="outlined">
                    <s.IconButtonStyle>
                      <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" previous/>
                    </s.IconButtonStyle>
                    {pageBtn.map(page=>(
                    <s.IconButtonStyle key={page} onClick={()=>{select(page)}}>{page}</s.IconButtonStyle>
                    ))}
                    <s.IconButtonStyle>
                      <ArrowRightIcon strokeWidth={2} className="h-4 w-4" next/>
                    </s.IconButtonStyle>
                  </s.ButtonGroupStyle>
                </s.PageButtonGroupDiv>
            </s.ContentListDiv>
        </>
    )
}
export default AskListMain;