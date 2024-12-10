import { Link, useNavigate, useParams } from 'react-router-dom';
import * as s from '../styles/StyledStore.tsx';
import axios from 'axios';
import { url } from '../../config.js';
import { useRef, useState } from 'react';

const NewPassword = () => {
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [text, setText] = useState('');
    const {username} = useParams();
    const inputRef = useRef();

    const navigate = useNavigate();

    const checkPassword = ()=>{
        if(password === passwordConfirm) {
            setText('비밀번호가 일치합니다');
        } else {
            setText("비밀번호가 다릅니다");
        }
    }

    const changePassword = (e)=>{
        if(text !== '비밀번호가 일치합니다') {
            alert('비밀번호를 확인해주세요');
            console.log(inputRef.current);
            inputRef.current.focus();
            inputRef.current.value = '';
            return;
        }
        e.preventDefault();
        console.log(username);
        console.log(password);
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        axios.post(`${url}/changePassword`, formData)
        .then(res=>{
            alert('비밀번호가 변경되었습니다');
            navigate('/loginStore');
        })
        .catch(err=>{
            alert('비밀번호 변경 실패');
        })
    }

    return(
        <>
        <s.ContentListDiv width='400px' marginLeft='780px'>
            <s.LoginAlign>
                <table>
                    <tbody>
                        <tr><td><s.FindSpan>새비밀번호</s.FindSpan></td></tr>
                        <tr><td><s.InputStyle name='password' width='320px' marginTop='10px' type="password" placeholder='Password' style={{padding:'15px', marginBottom:'15px'}} onChange={(e)=>setPassword(e.target.value)}/></td></tr>
                        <tr><td><s.FindSpan>비밀번호 확인</s.FindSpan>&nbsp;&nbsp;&nbsp;&nbsp;<s.FindSpan style={{fontSize:'10px', fontWeight:'normal'}}>{text}</s.FindSpan></td></tr>
                        <tr>
                        <td>
                        <s.InputStyle ref={inputRef} name='password' width='260px' marginTop='10px' type="password" placeholder='Password' style={{padding:'15px'}} onChange={(e)=>setPasswordConfirm(e.target.value)}/>
                        <s.ButtonStyle style={{marginLeft:'10px', verticalAlign:'baseline'}} width='50px' height='35px' onClick={()=>checkPassword()}>확인</s.ButtonStyle>
                        </td>
                        </tr>
                        <tr>
                            <td><s.FindDiv><s.ButtonStyle width='320px' height='40px' onClick={(e)=>changePassword(e)}>완료</s.ButtonStyle></s.FindDiv></td>
                        </tr>
                    </tbody>
                </table>
            </s.LoginAlign>
        </s.ContentListDiv>
        </>
    )
}
export default NewPassword;