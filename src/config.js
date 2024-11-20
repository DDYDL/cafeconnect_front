import axios from "axios";

export const url = "http://localhost:8080";

// token을 가지고 갈 axios
export const axiosInToken = (token) => axios.create ({
    baseURL : url,
    timeout: 5000, // 5초 정도 문제있으면 포기
    headers : {
        Authorization:token
    }
})