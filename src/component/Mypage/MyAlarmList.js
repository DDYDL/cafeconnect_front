import * as m from '../styles/StyledMypage.tsx';
import * as s from '../styles/StyledStore.tsx';
import * as h from '../styles/StyledHeader.tsx';

import { Select, Option } from "@material-tailwind/react";
import { useAtom } from 'jotai/react';
import { memberAtom } from '../../atoms.js';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../../config.js';
import styled from 'styled-components';

const MyAlarmList = ()=>{
    const [alarmList, setAlarmList] = useState([]);

    // Jotai의 member 가져오기
    const [member, setMember] = useAtom(memberAtom);

    useEffect(()=>{
        setAlarmList([]);
        setMember(member);
        getAlarmList();
    }, [])

    const getAlarmList = ()=>{
        axios.get(`${url}/selectAlarmList/${member.storeCode}`)
        .then(res=>{
            console.log(res.data);
            setAlarmList([...res.data]);
        })
        .catch(err=>{
            console.log(err);
        })
    }

    const checkAlarmConfirm = (e, alarmNum)=>{
        axios.get(`${url}/checkAlarmConfirm/${alarmNum}`)
        .then(res=>{
            console.log(res.data);
            console.log(alarmNum);
            console.log(alarmList);
            setAlarmList(alarmList.map(alarm=>(alarm.alarmNum === alarmNum ? {...alarm, alarmStatus:!alarm.alarmStatus} : alarm)));
        })
        .catch(err=>{
            console.log(err);
        })
    }

    return (
        <>
            <s.ContentListDiv width='800px' marginLeft='580px'>
                <s.MainTitleText>알림 모아보기</s.MainTitleText>

                <m.SelectDiv>
                    <m.SelectInnerDiv>
                        <m.SelectBox label="종류">
                            <Option>유통기한</Option>
                            <Option>재고</Option>
                            <Option>주요공지사항</Option>
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