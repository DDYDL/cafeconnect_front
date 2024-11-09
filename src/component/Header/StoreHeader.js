import { Routes, Route, NavLink } from 'react-router-dom';
import * as h from '../styles/StyledHeader.tsx';

import {useState} from "react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import { Menu,MenuHandler,MenuList,MenuItem,Button } from "@material-tailwind/react";

const StoreHeader = ()=>{
    return(
        <div>
            <Menu>
                <MenuHandler>
                    <Button>Menu</Button>
                </MenuHandler>
                <MenuList>
                    <MenuItem>Menu Item 1</MenuItem>
                    <MenuItem>Menu Item 2</MenuItem>
                    <MenuItem>Menu Item 3</MenuItem>
                </MenuList>
            </Menu>
            
            <h.Div class="navbar">
                <h.DivLogo>
                    <NavLink to="/shopMain"><h.Logo src="/logo.svg" /></NavLink>
                </h.DivLogo>

                <h.DivSide>
                    <h.NavLinkSide to="/changeStore">독산역점</h.NavLinkSide>
                    <h.VerticalLine/>
                    <h.NavLinkSide to="/logout">로그아웃</h.NavLinkSide>
                </h.DivSide>

                <h.DivMenu>
                    <h.NavLinkMenu to="/shopMain">쇼핑몰</h.NavLinkMenu>
                    <h.NavLinkMenu to="/stockAdd">재고관리</h.NavLinkMenu>
                    <h.NavLinkMenu to="/orderList">주문관리</h.NavLinkMenu>
                    <h.NavLinkMenu to="/salesManagement">재무관리</h.NavLinkMenu>
                    <h.NavLinkMenu to="/noticeList">커뮤니티</h.NavLinkMenu>
                    <h.NavLinkMenu to="/myAlarmList">마이페이지</h.NavLinkMenu>
                </h.DivMenu>

                <h.DivIcon>
                    <h.NavLinkIcon to="/alarm"><h.Icon src="/alarm.png" /></h.NavLinkIcon>
                    <h.NavLinkIcon to="/repairList"><h.Icon src="/repair.png" /></h.NavLinkIcon>
                    <h.NavLinkIcon to="/wishList"><h.Icon src="/wish.png" /></h.NavLinkIcon>
                    <h.NavLinkIcon to="/cartList"><h.Icon src="/cart.png" /></h.NavLinkIcon>
                </h.DivIcon>
            </h.Div>
            <Routes>
                {/* <Route exect path="/changeStore" element={<Store/>} /> */}
                {/* <Route exect path="/logout" element={<IntroMain/>} /> */}

                {/* <Route exect path="/shopMain" element={<MenuList/>} /> */}
                {/* <Route exect path="/stockAdd" element={<Complain/>} /> */}
                {/* <Route exect path="/orderList" element={<LoginStore/>} /> */}
                {/* <Route exect path="/salesManagement" element={<JoinStore/>}/> */}
                {/* <Route exect path="/noticeList" element={<JoinStore/>}/> */}
                {/* <Route exect path="/myAlarmList" element={<JoinStore/>}/> */}

                {/* <Route exect path="/alarm" element={<JoinStore/>}/> */}
                {/* <Route exect path="/repairList" element={<JoinStore/>}/> */}
                {/* <Route exect path="/wishList" element={<JoinStore/>}/> */}
                {/* <Route exect path="/cartList" element={<JoinStore/>}/> */}
            </Routes>
        </div>
    )
}
export default StoreHeader;