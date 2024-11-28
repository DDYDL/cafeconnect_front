import { Link, useNavigate } from 'react-router-dom';
import * as s from '../styles/StyledStore.tsx';
import * as h from '../styles/StyledHeader.tsx';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { url, axiosInToken } from '../../config.js';
import { useAtom, useAtomValue, useSetAtom } from 'jotai/react';
import { alarmsAtom, fcmTokenAtom, memberAtom, tokenAtom } from '../../atoms.js';

const LoginStore = () => {
    // 로그인 하면 storeCode 하나 가지고 오기(여러개의 store를 가지고 있으면 대표 하나만 가져오기)
    // storeHeader에서 storeCode 바꿀 수 있음
    const [member, setMember] = useState({username:'',password:'',deptName:'',roles:'', storeCode:0})
    
    // 세션 스토리지 token 설정
    const setToken = useSetAtom(tokenAtom);
    // 세션 스토리지 member 설정
    const setSessionMember = useSetAtom(memberAtom);
    const navigate = useNavigate();

    // fcm token value 가져오기
    const fcmToken = useAtomValue(fcmTokenAtom);
    // 알람 리스트 가져오기
    const [alarms, setAlarms] = useAtom(alarmsAtom);

    // 소셜 로그인 url
    const kakaoAuthUrl = `${url}/oauth2/authorization/kakao`;
    const naverAuthUrl = `${url}/oauth2/authorization/naver`;

    // state 변수인 member 바뀔 때마다 설정
    const edit = (e)=>{
        setMember({...member, [e.target.name]:e.target.value});
    }

    const submit = (e)=>{
        const formData = new FormData();
        console.log(member);
        formData.append("username", member.username);
        formData.append("password", member.password);
        e.preventDefault();

        axios.post(`${url}/login`, formData)
        .then(res=>{
            // 로그인 성공 시 헤더에 토큰 받아옴
            const token = res.headers.authorization;
            // 세션 스토리지에 토큰 설정
            setToken(token);
            
            // token을 가지고 다시 사용자 정보 요청
            axiosInToken(token).get("store")
            .then(res=>{
                // 성공 시 세션 스토리지에 사용자 정보 저장
                setSessionMember(res.data);
                console.log(res.data);

                // 사용자 정보 저장 후 fcm token 요청
                axios.post(`${url}/fcmToken`,{username:member.username, fcmToken:fcmToken})
                .then(res=> {
                    if(res.data!==null) {
                        console.log(res.data);
                        // 토큰 저장에 성공 시 알람 리스트 요청
                        axios.post(`${url}/alarms`,{storeCode:res.data})
                            .then(res=> {
                                console.log(res.data)
                                if(res.data.length!==0) {
                                    setAlarms([...alarms,...res.data]);
                                }
                            })
                            .catch(err=>{
                                console.log(err);
                            })
                    }
                })
                .catch(err=>{
                    console.log(err)
                })

                // 가맹점일 시 쇼핑몰로 이동(가맹점 페이지)
                if(res.data.roles === 'ROLE_STORE') {
                    navigate('/shopMain');
                } else if(res.data.roles === 'ROLE_MAINSTORE') {
                    // 본사면 가맹점 리스트로 이동(본사 페이지)
                    navigate('/storeListMain');
                }
            })
            .catch(err=>{
                console.log(err);
                alert('로그인 실패');
            })
        })
        .catch(err=>{
            console.log(err);
            alert('로그인 실패');
        })
    }

    return (
        <>
            <s.ContentListDiv width='400px' marginLeft='780px'>
                <s.LoginAlign>
                    <img src="./fullLogo.png"/>
                </s.LoginAlign>

                <s.LoginAlignLeft>
                    <s.SwitchText>가맹점</s.SwitchText>
                    <s.SwitchText>본사</s.SwitchText>
                </s.LoginAlignLeft>

                <s.SwitchButtoninput type="checkbox" id="switch" /><s.SwitchButton for="switch"></s.SwitchButton>

                <s.LoginAlign>
                <table>
                    <tbody>
                        <tr><td><s.InputStyle name='username' width='400px' marginTop='20px' type="text" placeholder='   Username' onChange={edit}/></td></tr>
                        <tr><td><s.InputStyle name='password' width='400px' marginTop='10px' type="password" placeholder='   Password' onChange={edit}/></td></tr>
                    </tbody>
                </table>
                </s.LoginAlign>

                <s.LoginAlignLeft marginTop='10px' textAlign='left' fontSize='12px'>
                    <span>아이디 찾기</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <h.VerticalLine/>
                    <span>비밀번호 찾기</span>
                </s.LoginAlignLeft>
                <s.ButtonDiv textAlign='right'>
                    <s.ButtonStyle style={{marginRight:'400px'}} onClick={submit}><Link>로그인</Link></s.ButtonStyle>
                </s.ButtonDiv>

                <s.LoginAlignLeft marginTop='13px' fontSize='12px'><s.HrStyle/><span style={{ float: 'left' }}>&nbsp;&nbsp;또는&nbsp;&nbsp;</span><s.HrStyle/></s.LoginAlignLeft>
                
                <s.LoginAlign>
                    <span><a href={kakaoAuthUrl}><img src='./kakaologin.png'/></a></span>&nbsp;&nbsp;&nbsp;
                    <span><a href={naverAuthUrl}><img src='./naverLogin.png'/></a></span>
                </s.LoginAlign>

            </s.ContentListDiv>
        </>
    )
}
export default LoginStore;