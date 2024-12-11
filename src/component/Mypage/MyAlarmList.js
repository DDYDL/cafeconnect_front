import * as m from '../styles/StyledMypage.tsx';
import * as s from '../styles/StyledStore.tsx';
import * as h from '../styles/StyledHeader.tsx';

import { Select, Option } from "@material-tailwind/react";
import { useAtom, useAtomValue } from 'jotai/react';
import { alarmsAtom, memberAtom, tokenAtom } from '../../atoms.js';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { axiosInToken, url } from '../../config.js';
import styled from 'styled-components';
import Error, { logoutError } from '../../Error.js';

const MyAlarmList = ()=>{
    const [alarmList, setAlarmList] = useState([]);
    const [token, setToken] = useAtom(tokenAtom);

    // Jotai의 member 가져오기
    const [member, setMember] = useAtom(memberAtom);
    const [alarms, setAlarms] = useAtom(alarmsAtom);

    let childRef = useRef();

    useEffect(()=>{
        setAlarmList([]);
        getAlarmList();
    }, [])

    const getAlarmList = ()=>{
        axiosInToken(token).get(`${url}/selectAlarmList/${member.storeCode}`)
        .then(res=>{
            if(res.headers.authorization!=null) {
                setToken(res.headers.authorization);
            }
            console.log(res.data);
            setAlarmList([...res.data]);
        })
        .catch(err=>{
            console.log(err);
            childRef.current.logoutError(err);
        })
    }

    const checkAlarmConfirm = (e, alarmNum)=>{
        axiosInToken(token).get(`${url}/checkAlarmConfirm/${alarmNum}`)
        .then(res=>{
            if(res.headers.authorization!=null) {
                setToken(res.headers.authorization);
            }
            console.log(res.data);
            console.log(alarmNum);
            console.log(alarmList);

            // 체크한 알람 상태 변경하기(변경되면 리렌더링 된다)
            setAlarmList(alarmList.map(alarm=>(alarm.alarmNum===alarmNum ? {...alarm, alarmStatus:!alarm.alarmStatus} : alarm)));
            setAlarms(alarms.filter(item=>item.alarmNum!==alarmNum));
        })
        .catch(err=>{
            console.log(err);
            childRef.current.logoutError(err);
        })
    }
    
    const selectAlarmType = (alarmType)=>{
        if(alarmType==='전체') {
            getAlarmList();
            return;
        }
        axiosInToken(token).get(`${url}/selectAlarmType/${member.storeCode}/${alarmType}`)
        .then(res=>{
            if(res.headers.authorization!=null) {
                setToken(res.headers.authorization);
            }
            console.log(res.data);
            setAlarmList([...res.data]);
        })
        .catch(err=>{
            console.log(err);
            childRef.current.logoutError(err);
        })
    }

    return (
        <>
            <Error ref={childRef}/>
            <s.ContentListDiv width='800px' marginLeft='580px'>
                <s.MainTitleText>알림 모아보기</s.MainTitleText>

                <m.SelectDiv>
                    <m.SelectInnerDiv>
                        <m.SelectBox label="종류" onChange={(e)=>selectAlarmType(e)}>
                            <Option value='전체'>전체</Option>
                            <Option value='유통기한'>유통기한</Option>
                            <Option value='재고'>재고</Option>
                            <Option value='주요공지사항'>주요공지사항</Option>
                        </m.SelectBox>
                    </m.SelectInnerDiv>
                </m.SelectDiv>

                {
                    alarmList.map(alarm=>(
                        <m.AlarmDiv style={{backgroundColor: alarm.alarmStatus ? "rgba(234, 234, 234, 1)" : "rgba(255, 255, 255, 1)"}}>
                            {alarm.alarmStatus ? <></> : <m.AlarmCheckboxDiv><m.AlarmCheckbox onChange={(e)=>checkAlarmConfirm(e, alarm.alarmNum)}/></m.AlarmCheckboxDiv>}
                            <m.AlarmInnerDiv>
                                <m.AlarmSpan>{alarm.alarmType}</m.AlarmSpan>
                                <h.VerticalLine marginRight='10px'/>
                                <m.AlarmSpan fontWeight='normal' fontColor='rgba(148, 148, 148, 1)'>{alarm.alarmDate}</m.AlarmSpan>
                            </m.AlarmInnerDiv>
                            <m.AlarmSpanContent>{alarm.alarmContent}</m.AlarmSpanContent>
                        </m.AlarmDiv>
                    ))
                }
            </s.ContentListDiv>
        </>
    )
}
export default MyAlarmList;