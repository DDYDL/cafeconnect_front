import {Routes,Route, NavLink} from 'react-router-dom';
import IntroMain from '../Main/IntroMain';
import * as h from '../styles/StyledHeader.tsx';
import Store from '../Main/Store.js';
import MenuList from '../Main/MenuList.js';
import Complain from '../Main/Complain.js';
import LoginStore from '../Main/LoginStore.js';

const Header = ()=>{
    return(
        <div>
            <h.Div class="navbar">
                <h.DivLogo>
                    <NavLink to="/"><h.Logo src="/logo.svg"/></NavLink>
                </h.DivLogo>

                <h.DivSide>
                    <h.NavLinkSide to="/loginStore">로그인</h.NavLinkSide>
                    <h.VerticalLine/>
                    <h.NavLinkSide to="/joinStore">회원가입</h.NavLinkSide>
                </h.DivSide>

                <h.DivMenu>
                    <h.DivMenuInside>
                    <h.NavLinkMenu to="/store">가맹점</h.NavLinkMenu>
                    <h.NavLinkMenu to="/menu">메뉴</h.NavLinkMenu>
                    <h.NavLinkMenu to="/complain">고객의 소리</h.NavLinkMenu>
                    </h.DivMenuInside>
                </h.DivMenu>
            </h.Div>
            <Routes>
                <Route exect path="/" element={<IntroMain/>}/>
                <Route exect path="/loginStore" element={<LoginStore/>}/>
                {/* <Route exect path="/joinStore" element={<JoinStore/>}/> */}
                
                <Route exect path="/store" element={<Store/>}/>
                <Route exect path="/menu" element={<MenuList/>}/>
                <Route exect path="/complain" element={<Complain/>}/>
            </Routes>
        </div>
    )
}
export default Header;