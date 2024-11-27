import { NavLink } from 'react-router-dom';
import * as h from '../styles/StyledHeader.tsx';

const Header = ()=>{
    if (window.location.pathname === '/loginStore') return;
    else if (window.location.pathname === '/loginMainStore') return;
    return(
        <div>
            <h.Div className="navbar">
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
        </div>
    )
}
export default Header;