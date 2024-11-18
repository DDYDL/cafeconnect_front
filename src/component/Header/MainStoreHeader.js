import { NavLink } from 'react-router-dom';
import * as h from '../styles/StyledHeader.tsx';

import {useState} from "react";
import {
    Menu, MenuHandler, MenuItem, DialogHeader, DialogBody } from "@material-tailwind/react";


const MainStoreHeader = ()=>{
    const [openMenu, setOpenMenu] = useState(false);
    return(
        <div>
            <h.Div class="navbar">
                
                 {/* <h.NavLinkMenu to="/mainStoreOrderList">주문접수관리</h.NavLinkMenu> */}
              
            </h.Div>

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
                <Menu placement="bottom-start" open={openMenu}
                    handler={setOpenMenu} allowHover offset={0}>
                    <MenuHandler className="items-center justify-between">
                        <h.DivMenuItem>
                            <h.DivMenuInside>
                                <h.NavLinkMenu to="/storeList">가맹점관리</h.NavLinkMenu>
                                <h.NavLinkMenu to="/itemList">판매상품관리</h.NavLinkMenu>
                                <h.NavLinkMenu to="/menuList">메뉴관리</h.NavLinkMenu>
                                <h.NavLinkMenu to="/itemRevenue">매출관리</h.NavLinkMenu>
                                <h.NavLinkMenu to="/noticeList">커뮤니티</h.NavLinkMenu>
                            </h.DivMenuInside>
                        </h.DivMenuItem>
                    </MenuHandler>
                    <h.MenuListOut>
                        <h.MenuListDiv>
                            <MenuItem>가맹점 조회</MenuItem>
                            <MenuItem>가맹점 등록</MenuItem>
                            <MenuItem>가맹점 복구</MenuItem>
                            <MenuItem>가맹점 삭제</MenuItem>
                        </h.MenuListDiv>
                        <h.MenuListDiv>
                            <MenuItem>상품 조회</MenuItem>
                        </h.MenuListDiv>
                        <h.MenuListDiv>
                            <MenuItem>메뉴 조회</MenuItem>
                        </h.MenuListDiv>
                        <h.MenuListDiv>
                            <MenuItem>상품별 매출 조회</MenuItem>
                            <MenuItem><NavLink to="/mainStoreOrderList">주문접수관리</NavLink></MenuItem>
                        </h.MenuListDiv>
                        <h.MenuListDiv>
                            <MenuItem><NavLink to="/noticeListMain">공지사항</NavLink></MenuItem>
                            <MenuItem><NavLink to="/complainListMain">컴플레인 공지</NavLink></MenuItem>
                            <MenuItem><NavLink to="/askListMain">1:1 문의</NavLink></MenuItem>
                        </h.MenuListDiv>
                    </h.MenuListOut>
                </Menu>
                </h.DivMenu>
                
                <h.DivIcon>
                    <h.NavLinkIcon to="/joinAccount"><h.Icon src="/addmainstore.png" /></h.NavLinkIcon>
                    <h.NavLinkIcon to="/shopMain"><h.Icon src="/shop.png" /></h.NavLinkIcon>
                </h.DivIcon>
            </h.Div>
        </div>
    )
}
export default MainStoreHeader;