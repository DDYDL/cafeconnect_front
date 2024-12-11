import * as m from '../styles/StyledMypage.tsx';
import * as s from '../styles/StyledStore.tsx';
import * as h from '../styles/HStyledStore.tsx';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { axiosInToken} from '../../config.js'
import { useAtom } from 'jotai/react';
import { memberAtom } from '../../atoms.js';
import { tokenAtom } from '../../atoms';
import { format } from "date-fns";
import { ko } from "date-fns/locale/ko";

const ComplainDetailMain = ()=>{
    // Jotai의 member 가져오기
    const [token,setToken] = useAtom(tokenAtom);
    const {complainNum} = useParams();
    const [complain, setComplain] = useState({});
    const navigate = useNavigate();
    
    useEffect(()=> {
        // 토큰의 State가 useEffect보다 느려서 토큰없이 실행 방지(Error 방지)
        if(token!=null && token!=='')  select();
    }, [token])

    const select = () => {
        axiosInToken(token).get(`complainDetailMain/${complainNum}`)
            .then(res=> {
                if(res.headers.authorization!=null) { setToken(res.headers.authorization) }

                console.log(res.data)
                let resComplain = res.data.complain;
                setComplain({...resComplain});
            })
    }

    const edit = (e) => {
        setComplain({ ...complain, ['complainAnswer']: e.target.value });
        console.log(complain);
    }

    const addAnswer = () => {
        axiosInToken(token).post('addComplainAnswer',complain)
            .then(res=> {
                if(res.headers.authorization!=null) { setToken(res.headers.authorization) }

                console.log(res);
                alert('코멘트 등록 및 가맹점 전송이 완료되었습니다.');
                navigate(`/complainDetailMain/${res.data}`);
            })
            .catch(err=>{
                console.log(err.response.data);
            })
    }

    return (
        <>
            <s.ContentListDiv>
            <h.MainTitleText>컴플레인 상세</h.MainTitleText>

            <h.TableInfo>
                    <thead><m.TableInfoTh></m.TableInfoTh><m.TableInfoTh></m.TableInfoTh></thead>
                <tbody>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>지점명</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>{complain.storeName}</m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>제목</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>{complain.complainTitle}</m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>작성자</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>{complain.userName}</m.TableInfoTd>
                        <m.TableInfoTd><m.TableTitleSpan>작성일</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>{complain.complainDate}</m.TableInfoTd>
                    </m.TableInfoTr>
                </tbody>
            </h.TableInfo>
            <h.TableInfo>
                <thead><m.TableInfoTh></m.TableInfoTh><m.TableInfoTh></m.TableInfoTh></thead>
                <tbody>
                <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>내용</m.TableTitleSpan></m.TableInfoTd>
                    </m.TableInfoTr>
                <m.TableInfoTr>
                        <m.TableInfoTd><m.TableInfoTd>{complain.complainContent}</m.TableInfoTd></m.TableInfoTd>
                    </m.TableInfoTr>
                </tbody>
            </h.TableInfo>
            <h.TableInfo>
                <thead><m.TableInfoTh></m.TableInfoTh><m.TableInfoTh></m.TableInfoTh></thead>
                <tbody>
                <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>가맹점 참고사항</m.TableTitleSpan></m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd>
                            <h.Textarea type='text' value={complain.complainAnswer} onChange={edit}/>
                        </m.TableInfoTd>
                    </m.TableInfoTr>
            <h.SaveButtonDiv>
                <s.ButtonStyle width='70px' style={{textAlign:'center'}} onClick={addAnswer}>가맹점 공유</s.ButtonStyle>
            </h.SaveButtonDiv>
                </tbody>
            </h.TableInfo>
            
            </s.ContentListDiv >
        </>
    )
}
export default ComplainDetailMain;