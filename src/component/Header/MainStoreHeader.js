import { NavLink } from 'react-router-dom';
import * as h from '../styles/StyledHeader.tsx';

import {useState} from "react";
import {
    Menu, MenuHandler, MenuItem, DialogHeader, DialogBody } from "@material-tailwind/react";

import { useNavigate } from 'react-router';
import { useAtom } from 'jotai/react';
import { initMember, memberAtom, tokenAtom } from '../../atoms.js';
import { useSetAtom } from 'jotai/react';

const MainStoreHeader = ()=>{
    const [openMenu, setOpenMenu] = useState(false);
    const navigate = useNavigate();
    const [member, setMember] = useAtom(memberAtom);
    const setToken = useSetAtom(tokenAtom);

    const logout = ()=>{
        setMember({...initMember});
        setToken('');
        navigate("/loginStore");
    }

    return(
        <div>
            <h.Div className="navbar">
                <h.DivLogo>
                    <NavLink to="/storeListMain"><h.Logo src="/logo.svg"/></NavLink>
                </h.DivLogo>

                <h.DivSide>
                    <h.NavLinkSide to="/">본사1</h.NavLinkSide>
                    <h.VerticalLine/>
                    <h.NavLinkSide to="/logout" onClick={logout}>로그아웃</h.NavLinkSide>
                </h.DivSide>

                <h.DivMenu>
                <Menu placement="bottom-start" open={openMenu}
                    handler={setOpenMenu} allowHover offset={0}>
                    <MenuHandler className="items-center justify-between">
                        <h.DivMenuItem>
                            <h.DivMenuInside>
                                <h.NavLinkMenu to="/storeListMain">가맹점 관리</h.NavLinkMenu>
                                <h.NavLinkMenu to="/mainItemList">판매상품 관리</h.NavLinkMenu>
                                <h.NavLinkMenu to="/mainMenuList">메뉴 관리</h.NavLinkMenu>
                                <h.NavLinkMenu to="/storeItemRevenue">매출 관리</h.NavLinkMenu>
                                <h.NavLinkMenu to="/noticeListMain">커뮤니티</h.NavLinkMenu>
                            </h.DivMenuInside>
                        </h.DivMenuItem>
                    </MenuHandler>
                    <h.MenuListOut marginLeft='550px'>
                        <h.MenuListDiv height='170px'>
                            <MenuItem><NavLink to="/storeListMain">가맹점 조회</NavLink></MenuItem>
                            <MenuItem><NavLink to="/addStoreMain">가맹점 등록</NavLink></MenuItem>
                            <MenuItem><NavLink to="/restoreStoreMain">가맹점 복구</NavLink></MenuItem>
                            <MenuItem><NavLink to="/deleteReqStoreMain">가맹점 삭제</NavLink></MenuItem>
                            <MenuItem><NavLink to="/repairList">수리 목록</NavLink></MenuItem>
                        </h.MenuListDiv>
                        <h.MenuListDiv style={{ marginLeft: '20px' }}>
                            <MenuItem><NavLink to="/mainItemList">상품 조회</NavLink></MenuItem>
                            <MenuItem><NavLink to="/Category">상품 카테고리 관리</NavLink></MenuItem>
                        </h.MenuListDiv>
                        <h.MenuListDiv style={{ marginLeft: '20px' }}>
                            <MenuItem><NavLink to="/mainMenuList">메뉴 조회</NavLink></MenuItem>
                            <MenuItem><NavLink to="/menuCategory">메뉴 카테고리 관리</NavLink></MenuItem>
                        </h.MenuListDiv>
                        <h.MenuListDiv style={{ marginLeft: '20px' }}>
                            <MenuItem><NavLink to="/storeItemRevenue">상품별 매출 조회</NavLink></MenuItem>
                            <MenuItem><NavLink to="/mainStoreOrderList">주문접수 관리</NavLink></MenuItem>
                        </h.MenuListDiv>
                        <h.MenuListDiv style={{ marginLeft: '20px' }}>
                            <MenuItem><NavLink to="/noticeListMain">공지사항</NavLink></MenuItem>
                            <MenuItem><NavLink to="/complainListMain">컴플레인 공지</NavLink></MenuItem>
                            <MenuItem><NavLink to="/askListMain">1:1 문의</NavLink></MenuItem>
                        </h.MenuListDiv>
                    </h.MenuListOut>
                </Menu>
                </h.DivMenu>
                
                <h.DivIcon>
                    <h.NavLinkIcon to="/insertMainStore"><h.Icon src="/addmainstore.png"/></h.NavLinkIcon>
                    <h.NavLinkIcon to="/shopMain"><h.Icon src="/shop.png" /></h.NavLinkIcon>
                </h.DivIcon>
            </h.Div>
        </div>
    )
}
export default MainStoreHeader;