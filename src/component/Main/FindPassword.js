import { Link, useNavigate } from 'react-router-dom';
import * as s from '../styles/StyledStore.tsx';
import axios from 'axios';
import { url } from '../../config.js';
import { useState } from 'react';

const FindPassword = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const checkUsername = (username)=>{
        console.log(username);
        axios.get(`${url}/checkUsername/${username}`)
        .then(res=>{
            console.log(res.data);
            if(res.data.username !== '') {
                console.log(res.data.username);
                navigate(`/newPassword/${username}`);
            }
        })
        .catch(err=>{
            console.log(err);
            alert("해당하는 아이디가 없습니다");
        })
    }

    return(
        <>
        <s.ContentListDiv width='400px' marginLeft='780px'>
            <s.LoginAlign>
                <table>
                    <tbody>
                        {/* 1. 아이디를 입력받아 일치하는 아이디가 있는지 확인
                            2. 비밀번호 재발급 - 입력받아 데이터베이스에 저장 */}
                        <tr><td><s.FindSpan>아이디를 입력하세요</s.FindSpan></td></tr>
                        <tr><td><s.InputStyle name='username' width='320px' marginTop='10px' type="text" placeholder='Username' style={{padding:'15px'}} onChange={(e)=>setUsername(e.target.value)}/></td></tr>
                        <tr><td>
                        <s.FindDiv>
                            <s.ButtonStyle width='320px' height='40px' onClick={()=>checkUsername(username)}>다음</s.ButtonStyle>
                        </s.FindDiv></td></tr>
                    </tbody>
                </table>

            </s.LoginAlign>
        </s.ContentListDiv>
        </>
    )
}
export default FindPassword;