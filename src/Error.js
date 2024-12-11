import { useAtom, useSetAtom } from "jotai/react";
import { alarmsAtom, initMember, memberAtom, tokenAtom } from "./atoms";
import { useNavigate } from "react-router";
import { forwardRef, useEffect, useImperativeHandle } from "react";

const Error = forwardRef((props, ref)=>{
    // Jotai에 있는 member 가져오기
    const [member, setMember] = useAtom(memberAtom);
    // Jotai에 있는 로그인 token 가져오기
    const [token, setToken] = useAtom(tokenAtom);
    // Jotai에 있는 알람 가져오기
    const setAlarms = useSetAtom(alarmsAtom);

    const navigate = useNavigate();

    // 로그아웃
    const logout = ()=> {
        setMember({...initMember});
        setToken('');
        setAlarms([]);
        navigate("/loginStore");
    }

    function logoutError(err) {
        console.log(err);
        if(err.response.status === 401) {
            alert('로그인 시간이 만료되었습니다.');
            logout();
        }
    }

    useImperativeHandle(ref, () => ({
        logoutError
    }));

    return(
        <></>
    )
});

export default Error;