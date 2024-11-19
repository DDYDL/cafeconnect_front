import { NavLink } from 'react-router-dom';
import * as h from '../styles/StyledHeader.tsx';
import * as m from '../styles/StyledMypage.tsx';

import {useState} from "react";
import {
    Menu, MenuHandler, MenuItem, DialogHeader, DialogBody } from "@material-tailwind/react";

const StoreHeader = ()=>{
    const [openMenu, setOpenMenu] = useState(false);

    const [open, setOpen] = useState(false);
    const handleOpen = () =>{
        setOpen(!open);
    }

    return(
        <div>
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
                <Menu placement="bottom-start" open={openMenu}
                    handler={setOpenMenu} allowHover offset={0}>
                    <MenuHandler className="items-center justify-between">
                        <h.DivMenuItem>
                            <h.DivMenuInside>
                                <h.NavLinkMenu to="/shopMain">쇼핑몰</h.NavLinkMenu>
                                <h.NavLinkMenu to="/stockOrderItemAdd">재고관리</h.NavLinkMenu>
                                <h.NavLinkMenu to="/orderList">주문관리</h.NavLinkMenu>
                                <h.NavLinkMenu to="/salesManagement">재무관리</h.NavLinkMenu>
                                <h.NavLinkMenu to="/noticeList">커뮤니티</h.NavLinkMenu>
                                <h.NavLinkMenu to="/myAlarmList">마이페이지</h.NavLinkMenu>
                            </h.DivMenuInside>
                        </h.DivMenuItem>
                    </MenuHandler>
                    <h.MenuListOut>
                        <h.MenuListDiv>
                            <MenuItem><NavLink to="/shopMain">쇼핑몰</NavLink></MenuItem>
                        </h.MenuListDiv>
                        <h.MenuListDiv>
                            <MenuItem><NavLink to="/stockOrderItemAdd">주문상품재고추가</NavLink></MenuItem>
                            <MenuItem><NavLink to="/stockManage">매장재고관리</NavLink></MenuItem>
                            <MenuItem><NavLink to="/stockOtherStore">타매장재고조회</NavLink></MenuItem>
                        </h.MenuListDiv>
                        <h.MenuListDiv>
                            <MenuItem><NavLink to="/orderList">주문내역</NavLink></MenuItem>
                        </h.MenuListDiv>
                        <h.MenuListDiv>
                            <MenuItem>매출입력</MenuItem>
                            <MenuItem>매출분석</MenuItem>
                            <MenuItem>지출내역</MenuItem>
                            {/* <h.NavLinkMenu to="/expenseList">지출내역</h.NavLinkMenu> */}
                        </h.MenuListDiv>
                        <h.MenuListDiv>
                            <MenuItem><NavLink to="/noticeList">공지사항</NavLink></MenuItem>
                            <MenuItem><NavLink to="/complainList">컴플레인 공지</NavLink></MenuItem>
                            <MenuItem><NavLink to="/askList">1:1 문의</NavLink></MenuItem>
                        </h.MenuListDiv>
                        <h.MenuListDiv>
                            <MenuItem><NavLink to="/myAlarmList">알림 모아보기</NavLink></MenuItem>
                            <MenuItem><NavLink to="/myStoreInfo">가맹점 정보</NavLink></MenuItem>
                            <MenuItem><NavLink to="/myStoreManage">내 가맹점 관리</NavLink></MenuItem>
                        </h.MenuListDiv>
                    </h.MenuListOut>
                </Menu>
                </h.DivMenu>
                
                <h.DivIcon>
                    <h.NavLinkIcon><h.Icon src="/alarm.png" onClick={handleOpen}/></h.NavLinkIcon>
                    <h.NavLinkIcon to="/repairList"><h.Icon src="/repair.png"/></h.NavLinkIcon>
                    <h.NavLinkIcon to="/wishList"><h.Icon src="/wish.png"/></h.NavLinkIcon>
                    <h.NavLinkIcon to="/cartList"><h.Icon src="/cart.png"/></h.NavLinkIcon>
                </h.DivIcon>
            </h.Div>

            {open && <m.ModalDialog>
                <DialogHeader style={{ padding:'10px 0px'}}>알림</DialogHeader>
                <DialogBody style={{padding:'0px'}}>
                    <m.AlarmDiv width='100%' height='130px'>
                        <m.AlarmCheckboxDiv><m.AlarmCheckbox /></m.AlarmCheckboxDiv>
                        <m.AlarmInnerDiv>
                            <m.AlarmSpan>유통기한 알림</m.AlarmSpan>
                            <h.VerticalLine marginRight='10px'/>
                            <m.AlarmSpan fontWeight='normal' fontColor='rgba(148, 148, 148, 1)'>10월 18일</m.AlarmSpan>
                        </m.AlarmInnerDiv>
                        <m.AlarmSpanContent>10월 12일에 들어온 [어메이징 오트(12Pk/Box)] 유통기한이 3일 남았습니다.</m.AlarmSpanContent>
                    </m.AlarmDiv>
                    <m.AlarmDiv width='100%' height='130px'>
                        <m.AlarmCheckboxDiv><m.AlarmCheckbox /></m.AlarmCheckboxDiv>
                        <m.AlarmInnerDiv>
                            <m.AlarmSpan>유통기한 알림</m.AlarmSpan>
                            <h.VerticalLine marginRight='10px' />
                            <m.AlarmSpan fontWeight='normal' fontColor='rgba(148, 148, 148, 1)'>10월 18일</m.AlarmSpan>
                        </m.AlarmInnerDiv>
                        <m.AlarmSpanContent>10월 12일에 들어온 [어메이징 오트(12Pk/Box)] 유통기한이 3일 남았습니다.</m.AlarmSpanContent>
                    </m.AlarmDiv>
                    <m.AlarmDiv width='100%' height='130px'>
                        <m.AlarmCheckboxDiv><m.AlarmCheckbox /></m.AlarmCheckboxDiv>
                        <m.AlarmInnerDiv>
                            <m.AlarmSpan>유통기한 알림</m.AlarmSpan>
                            <h.VerticalLine marginRight='10px' />
                            <m.AlarmSpan fontWeight='normal' fontColor='rgba(148, 148, 148, 1)'>10월 18일</m.AlarmSpan>
                        </m.AlarmInnerDiv>
                        <m.AlarmSpanContent>10월 12일에 들어온 [어메이징 오트(12Pk/Box)] 유통기한이 3일 남았습니다.</m.AlarmSpanContent>
                    </m.AlarmDiv>
                    <m.AlarmDiv width='100%' height='130px'>
                        <m.AlarmCheckboxDiv><m.AlarmCheckbox /></m.AlarmCheckboxDiv>
                        <m.AlarmInnerDiv>
                            <m.AlarmSpan>유통기한 알림</m.AlarmSpan>
                            <h.VerticalLine marginRight='10px' />
                            <m.AlarmSpan fontWeight='normal' fontColor='rgba(148, 148, 148, 1)'>10월 18일</m.AlarmSpan>
                        </m.AlarmInnerDiv>
                        <m.AlarmSpanContent>10월 12일에 들어온 [어메이징 오트(12Pk/Box)] 유통기한이 3일 남았습니다.</m.AlarmSpanContent>
                    </m.AlarmDiv>
                </DialogBody>
            </m.ModalDialog>
            }
        </div>
    )
}
export default StoreHeader;