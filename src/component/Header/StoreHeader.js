import { NavLink } from 'react-router-dom';
import * as h from '../styles/StyledHeader.tsx';
import * as m from '../styles/StyledMypage.tsx';

import {useState} from "react";
import { Menu, MenuHandler, MenuItem, DialogHeader, DialogBody } from "@material-tailwind/react";
import { useNavigate } from 'react-router';
import { useAtom } from 'jotai/react';
import { alarmsAtom, initMember, memberAtom, tokenAtom } from '../../atoms.js';
import { useSetAtom } from 'jotai/react';
import axios from 'axios';
import { url } from '../../config.js';

const StoreHeader = ({alarms})=>{
    // 메뉴 모달을 위한 state 변수
    const [openMenu, setOpenMenu] = useState(false);
    // 알람 모달을 위한 state 변수
    const [open, setOpen] = useState(false);
    const handleOpen = () =>{
        setOpen(!open);
    }

    const navigate = useNavigate();
    // Jotai에 있는 member 가져오기
    const [member, setMember] = useAtom(memberAtom);
    // Jotai에 있는 로그인 token 가져오기
    const setToken = useSetAtom(tokenAtom);
    // Jotai에 있는 알람 가져오기
    const setAlarms = useSetAtom(alarmsAtom);

    // 알람 체크박스 클릭 시 alarmStatus 바꾸기
    const alarmConfirm = (alarmNum)=>{
        axios.get(`${url}/alarmConfirm/${alarmNum}`)
        .then(res=>{
            if(res.data===true) {
                // 알람 확인 시 확인한 알람은 제외하기
                setAlarms(alarms.filter(item=>item.alarmNum!==alarmNum));
            }
        })
        .catch(err=>{
            console.log(err);
            alert("잠시후 다시 시도해주세요");
        })
    }

    // 로그아웃
    const logout = ()=>{
        setOpenMenu(false);
        setOpen(false);

        setMember({...initMember});
        setToken('');
        setAlarms([]);

        navigate("/loginStore");
    }

    return(
        <div>
            <h.Div className="navbar">
                <h.DivLogo>
                    <NavLink to="/shopMain"><h.Logo src="/logo.svg" /></NavLink>
                </h.DivLogo>

                <h.DivSide>
                    <h.NavLinkSide to="/changeStore">독산역점</h.NavLinkSide>
                    <h.VerticalLine/>
                    <h.NavLinkSide to="/logout" onClick={logout}>로그아웃</h.NavLinkSide>
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
                            <MenuItem><NavLink to="/salesWrite">매출입력</NavLink></MenuItem>
                            <MenuItem><NavLink to="/salesAnalysis">매출분석</NavLink></MenuItem>
                            <MenuItem><NavLink to="/expenseList">지출내역</NavLink></MenuItem>
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
                    <h.NavLinkIcon>
                        <h.Icon src="/alarm.png" onClick={handleOpen}/>
                        {/* 알람 개수 표시 */}
                        <span>{alarms.length!==0 && alarms.length}</span>
                    </h.NavLinkIcon>
                    <h.NavLinkIcon to="/repairRequestList"><h.Icon src="/repair.png"/></h.NavLinkIcon>
                    <h.NavLinkIcon to="/wishList"><h.Icon src="/wish.png"/></h.NavLinkIcon>
                    <h.NavLinkIcon to="/cartList"><h.Icon src="/cart.png"/></h.NavLinkIcon>
                </h.DivIcon>
            </h.Div>

            {open && <m.ModalDialog>
                <DialogHeader style={{ padding:'10px 0px'}}>알림</DialogHeader>
                <DialogBody style={{padding:'0px'}}>

                    {/* Jotai에 있는 알람 리스트 출력하기 */}
                    {alarms.length===0 ? <m.AlarmDiv width='100%' height='130px'>알람이 없습니다.</m.AlarmDiv> :
                        alarms.map((item)=>
                            <m.AlarmDiv key={item.alarmNum} width='100%' height='130px'>
                                <m.AlarmCheckboxDiv><m.AlarmCheckbox onChange={(e)=>alarmConfirm(item.alarmNum)}/></m.AlarmCheckboxDiv>
                                    <m.AlarmInnerDiv>
                                    <m.AlarmSpan>{item.alarmType}</m.AlarmSpan>
                                    <h.VerticalLine marginRight='10px'/>
                                    <m.AlarmSpan fontWeight='normal' fontColor='rgba(148, 148, 148, 1)'>{item.alarmDate}</m.AlarmSpan>
                                    </m.AlarmInnerDiv>
                                <m.AlarmSpanContent>{item.alarmContent}</m.AlarmSpanContent>
                            </m.AlarmDiv>
                        )
                    }
                </DialogBody>
            </m.ModalDialog>
            }
        </div>
    )
}
export default StoreHeader;