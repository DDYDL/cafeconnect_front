import axios from "axios";
import { initMember, memberAtom } from "./atoms";
import { useAtom } from "jotai/react";

export const url = "http://localhost:8080";

// token을 가지고 갈 axios
export const axiosInToken = (token) => {
    const axiosInstance = axios.create ({
        baseURL : url,
        timeout: 5000, // 5초 정도 문제있으면 포기
        headers : {
            Authorization:token
        }
    })

    // refresh token 만료시 에러잡고 로그아웃
    axiosInstance.interceptors.response.use(  
        function (response) {
            return response
        },
        function (error) {
            console.log(error);
            if (error.response.status === 401) {
                console.log(error);
                alert("로그인 시간 만료");
                window.sessionStorage.clear();
                window.location.href="/loginStore";
            } else {
                console.log(error);
            }
            return Promise.reject(error);
        },
    )
    return axiosInstance;
}