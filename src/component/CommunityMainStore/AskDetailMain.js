import * as m from '../styles/StyledMypage.tsx';
import * as s from '../styles/StyledStore.tsx';
import * as h from '../styles/HStyledStore.tsx';

// 로그인 토큰
import { axiosInToken} from '../../config.js'
import { useAtom } from 'jotai/react';
import { tokenAtom } from '../../atoms';
import { useParams } from 'react-router-dom';
import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router';
import { format } from 'date-fns';

const AskDetailMain = ()=>{
    const [token,setToken] = useAtom(tokenAtom);
    const {askNum} = useParams();
    const [ask, setAsk] = useState({askDate:new Date()});
    const navigate = useNavigate();

    useEffect(()=> {
        // 토큰의 State가 useEffect보다 느려서 토큰없이 실행 방지(Error 방지)
        if(token!=null && token!=='')  select();
    }, [token])

    const select = () => {
        axiosInToken(token).get(`askDetailMain/${askNum}`)
            .then(res=> {
                if(res.headers.authorization!=null) { setToken(res.headers.authorization) }
                console.log(res.data)
                let resAsk = res.data.ask;
                setAsk({...resAsk});
            })
    }

    const edit = (e) => {
        setAsk({ ...ask, ['askAnswer']: e.target.value });
        console.log(ask);
    }

    const addAnswer = () => {
        axiosInToken(token).post('askAnswerMain',ask)
            .then(res=> {
                if(res.headers.authorization!=null) { setToken(res.headers.authorization) }
                console.log(res);
                alert('답변이 등록되었습니다.');
                navigate(`/askListMain`);
            })
            .catch(err=>{
                console.log(err.response.data);
            })
    }

    return (
        <>
            <s.ContentListDiv>
            <s.MainTitleText>1:1 문의</s.MainTitleText>

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
                        <m.TableInfoTd>{format(new Date(ask.askDate),"yyyy.MM.dd")}</m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>지점명</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>{ask.storeName}</m.TableInfoTd>
                    </m.TableInfoTr>
                </tbody>
            </m.TableInfo>

            <h.TableInfo>
                <thead><m.TableInfoTh></m.TableInfoTh><m.TableInfoTh></m.TableInfoTh></thead>
                <tbody>
                <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>문의내용</m.TableTitleSpan></m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd>{ask.askContent}</m.TableInfoTd>
                    </m.TableInfoTr>
                </tbody>
            </h.TableInfo>
            <h.TableInfo>
                <thead><m.TableInfoTh></m.TableInfoTh><m.TableInfoTh></m.TableInfoTh></thead>
                <tbody>
                <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>답변</m.TableTitleSpan></m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><h.Textarea type='text' value={ask.askAnswer} onChange={edit} spellCheck="false"/></m.TableInfoTd>
                    </m.TableInfoTr>
                </tbody>
            </h.TableInfo>
            <s.SearchButtonDiv>
                <s.ButtonStyle width='70px' style={{marginTop:'30px', marginLeft:'10px'}} onClick={addAnswer}>답변 저장</s.ButtonStyle>
            </s.SearchButtonDiv>
            </s.ContentListDiv >
        </>
    )
}
export default AskDetailMain;