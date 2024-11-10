import { Button } from '@material-tailwind/react';
import * as s from '../styles/StyledStore.tsx';
import { Link } from 'react-router-dom';

const LoginMainStore = () => {
    return (
        <>
            <s.ContentDiv>
                <img src="./fullLogo.png"/>
                <p><Link to='/loginStore'>가맹점</Link></p>
                <p><Link to='/loginMainStore'>본사</Link></p>

                <table>
                    <tbody>
                        <tr><td><input type="text" placeholder='Username' /></td></tr>
                        <tr><td><input type="password" placeholder='Password' /></td></tr>
                    </tbody>
                </table>
                <p>아이디 찾기</p>
                <p>비밀번호 찾기</p>
                <Button><Link to='shopMain'>로그인</Link></Button>

            </s.ContentDiv>
        </>
    )
}
export default LoginMainStore;