import { Link } from 'react-router-dom';
import * as s from '../styles/StyledStore.tsx';
import axios from 'axios';
import { url } from '../../config.js';
import { useState } from 'react';

const FindPassword = () => {
    const [username, setUsername] = useState('');

    const checkUsername = (username)=>{
        console.log(username);
        axios.get(`${url}/checkUsername/${username}`)
        .then(res=>{
            console.log(res.data);
            if(res.date.username !== '') {
                console.log(res.date.username);
            }
        })
        .catch(err=>{
            console.log(err);
            alert("해당하는 아이디가 없습니다.");
        })
    }

    return(
        <>
        <s.ContentListDiv width='400px' marginLeft='780px'>
            <s.LoginAlign>
                <table>
                    <tbody>
                        <tr>
                            {/* 1. 아이디를 입력받아 일치하는 아이디가 있는지 확인
                            2. 비밀번호 재발급 - 입력받아 데이터베이스에 저장 */}
                        <td><span>아이디를 입력하세요</span></td>
                        <td><s.InputStyle name='username' width='320px' marginTop='20px' type="text" placeholder='Username' style={{padding:'15px'}} onChange={(e)=>setUsername(e.value)}/></td>
                        </tr>
                        <tr><td>
                        <s.ButtonDiv>
                            <s.ButtonStyle onClick={()=>checkUsername(username)}>다음</s.ButtonStyle>
                        </s.ButtonDiv></td></tr>
                    </tbody>
                </table>
            </s.LoginAlign>
        </s.ContentListDiv>
        </>
    )
}

export default FindPassword;