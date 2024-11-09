import { Routes, Route, NavLink } from 'react-router-dom';
import * as h from '../styles/StyledHeader.tsx';

const MainStoreHeader = ()=>{
    return(
        <div>
            <h.Div class="navbar">
                <h.DivLogo>
                    <NavLink to="/storeList"><h.Logo src="/logo.svg"/></NavLink>
                </h.DivLogo>

                <h.DivSide>
                    <h.NavLinkSide to="/">본사1</h.NavLinkSide>
                    <h.VerticalLine/>
                    <h.NavLinkSide to="/logout">로그아웃</h.NavLinkSide>
                </h.DivSide>

                <h.DivMenu>
                    <h.NavLinkMenu to="/storeList">가맹점관리</h.NavLinkMenu>
                    <h.NavLinkMenu to="/itemList">판매상품관리</h.NavLinkMenu>
                    <h.NavLinkMenu to="/menuList">메뉴관리</h.NavLinkMenu>
                    <h.NavLinkMenu to="/itemRevenue">매출관리</h.NavLinkMenu>
                    <h.NavLinkMenu to="/noticeList">커뮤니티</h.NavLinkMenu>
                </h.DivMenu>

                <h.DivIcon>
                    <h.NavLinkIcon to="/joinAccount"><h.Icon src="/addmainstore.png" /></h.NavLinkIcon>
                    <h.NavLinkIcon to="/shopMain"><h.Icon src="/shop.png" /></h.NavLinkIcon>
                </h.DivIcon>
            </h.Div>
            <Routes>
                {/* <Route exect path="/logout" element={<Store/>} /> */}

                {/* <Route exect path="/storeList" element={<IntroMain/>} /> */}
                {/* <Route exect path="/itemList" element={<MenuList/>} /> */}
                {/* <Route exect path="/menuList" element={<Complain/>} /> */}
                {/* <Route exect path="/itemRevenue" element={<LoginStore/>} /> */}
                {/* <Route exect path="/noticeList" element={<JoinStore/>}/> */}

                {/* <Route exect path="/joinAccount" element={<JoinStore/>}/> */}
                {/* <Route exect path="/shopMain" element={<JoinStore/>}/> */}
            </Routes>
        </div>
    )
}
export default MainStoreHeader;