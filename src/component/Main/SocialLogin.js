import { useAtom, useAtomValue, useSetAtom } from "jotai/react";
import { useLocation, useNavigate } from "react-router";
import { alarmsAtom, fcmTokenAtom, memberAtom, tokenAtom } from "../../atoms";
import { useEffect, useState } from "react";
import { axiosInToken, url } from "../../config";
import axios from "axios";

const SocialLogin = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // storeHeader에서 storeCode 바꿀 수 있음
    const [member, setMember] = useState({username:'',password:'',deptName:'',roles:'', storeCode:0, storeName:''})

    // fcm token value 가져오기
    const [fcmToken, setFcmToken] = useAtom(fcmTokenAtom);
    // 알람 리스트 가져오기
    const [alarms, setAlarms] = useAtom(alarmsAtom);

    // 세션 스토리지 token 설정
    const setToken = useSetAtom(tokenAtom);
    // 세션 스토리지 member 설정
    const setSessionMember = useSetAtom(memberAtom);

    const getToken = ()=>{
        console.log(location);
        // 로그인 성공 시 Url에 토큰 받아옴
        const queryParams = new URLSearchParams(location.search);
        let token = queryParams.get('token');
        //token = decodeURIComponent(token);
        console.log(token);

        // 세션 스토리지에 토큰 설정
        setToken(token);

        // token을 가지고 다시 사용자 정보 요청
        axiosInToken(token).get("store")
        .then(res=>{
            // 성공 시 세션 스토리지에 사용자 정보 저장
            setSessionMember(res.data);
            console.log(res.data);

            console.log(res.data.username);
            
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
    }

    useEffect(()=>{
        getToken();
    }, [])

    return(
        <>
        </>
    )
}
export default SocialLogin;