import * as m from '../styles/StyledMypage.tsx';
import * as s from '../styles/StyledStore.tsx';

// 로그인 토큰
import { axiosInToken} from '../../config.js'
import { useAtomValue } from 'jotai/react';
import { tokenAtom } from '../../atoms';
import { useParams } from 'react-router-dom';
import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import { format } from "date-fns";

const AskDetailMain = ()=>{
    const token = useAtomValue(tokenAtom);
    const {askNum} = useParams();
    const [ask, setAsk] = useState({});

    useEffect(()=> {
        // 토큰의 State가 useEffect보다 느려서 토큰없이 실행 방지(Error 방지)
        if(token!=null && token!=='')  select();
    }, [token])

    const select = () => {
        axiosInToken(token).get(`askDetailMain/${askNum}`)
            .then(res=> {
                console.log(res.data)
                let resAsk = res.data.ask;
                setAsk({...resAsk});
            })
    }

    const edit = (e) => {
        setAsk({ ...ask, ['askAnswer']: e.target.value });
        console.log(ask);
    }

    return (
        <>
            <s.ContentListDiv>
            <s.MainTitleText>1:1문의 상세</s.MainTitleText>

            <m.TableInfo>
                    <thead><m.TableInfoTh></m.TableInfoTh><m.TableInfoTh></m.TableInfoTh></thead>
                <tbody>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>문의유형</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>{ask.askType}</m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>제목</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>{ask.askTitle}</m.TableInfoTd>
                    </m.TableInfoTr>
                </tbody>
            </m.TableInfo>

             <m.TableInfo>
                <thead><m.TableInfoTh></m.TableInfoTh><m.TableInfoTh></m.TableInfoTh></thead>
                <tbody>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>작성일</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>{ask.askDate}</m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>지점명</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>{ask.storeName}</m.TableInfoTd>
                    </m.TableInfoTr>
                </tbody>
            </m.TableInfo>

            <m.TableInfo>
                <thead><m.TableInfoTh></m.TableInfoTh><m.TableInfoTh></m.TableInfoTh></thead>
                <tbody>
                <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>문의내용</m.TableTitleSpan></m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd>{ask.askContent}</m.TableInfoTd>
                    </m.TableInfoTr>
                </tbody>
            </m.TableInfo>
            <m.TableInfo>
                <thead><m.TableInfoTh></m.TableInfoTh><m.TableInfoTh></m.TableInfoTh></thead>
                <tbody>
                <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>답변</m.TableTitleSpan></m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><s.InputStyle width='800px' type='text' value={ask.askAnswer} onChange={edit}/></m.TableInfoTd>
                    </m.TableInfoTr>
                </tbody>
            </m.TableInfo>
            </s.ContentListDiv >
        </>
    )
}
export default AskDetailMain;