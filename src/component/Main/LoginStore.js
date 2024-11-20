import { Link } from 'react-router-dom';
import * as s from '../styles/StyledStore.tsx';
import * as h from '../styles/StyledHeader.tsx';

const LoginStore = () => {
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
                        <tr><td><s.InputStyle width='400px' marginTop='20px' type="text" placeholder='   Username'/></td></tr>
                        <tr><td><s.InputStyle width='400px' marginTop='10px' type="password" placeholder='   Password' /></td></tr>
                    </tbody>
                </table>
                </s.LoginAlign>

                <s.LoginAlignLeft marginTop='10px' textAlign='left' fontSize='12px'>
                    <span>아이디 찾기</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <h.VerticalLine/>
                    <span>비밀번호 찾기</span>
                </s.LoginAlignLeft>
                <s.ButtonDiv textAlign='right'>
                    <s.ButtonStyle style={{marginRight:'400px'}}><Link to='shopMain'>로그인</Link></s.ButtonStyle>
                </s.ButtonDiv>

                <s.LoginAlignLeft marginTop='13px' fontSize='12px'><s.HrStyle/><span style={{ float: 'left' }}>&nbsp;&nbsp;또는&nbsp;&nbsp;</span><s.HrStyle/></s.LoginAlignLeft>
                
                <s.LoginAlign>
                    <span><img src='./kakaologin.png'/></span>&nbsp;&nbsp;&nbsp;
                    <span><img src='./naverLogin.png'/></span>
                </s.LoginAlign>

            </s.ContentListDiv>
        </>
    )
}
export default LoginStore;