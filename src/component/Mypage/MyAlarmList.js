import * as m from '../styles/StyledMypage.tsx';
import * as s from '../styles/StyledStore.tsx';
import * as h from '../styles/StyledHeader.tsx';

import { Select, Option } from "@material-tailwind/react";

const MyAlarmList = ()=>{
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

                <m.AlarmDiv>
                    <m.AlarmCheckboxDiv><m.AlarmCheckbox/></m.AlarmCheckboxDiv>
                    <m.AlarmInnerDiv>
                        <m.AlarmSpan>유통기한 알림</m.AlarmSpan>
                        <h.VerticalLine marginRight='10px'/>
                        <m.AlarmSpan fontWeight='normal' fontColor='rgba(148, 148, 148, 1)'>10월 18일</m.AlarmSpan>
                    </m.AlarmInnerDiv>
                    <m.AlarmSpanContent>10월 12일에 들어온 [어메이징 오트(12Pk/Box)] 유통기한이 3일 남았습니다.</m.AlarmSpanContent>
                </m.AlarmDiv>
                <m.AlarmDiv>
                    <m.AlarmCheckboxDiv><m.AlarmCheckbox /></m.AlarmCheckboxDiv>
                    <m.AlarmInnerDiv>
                        <m.AlarmSpan>유통기한 알림</m.AlarmSpan>
                        <h.VerticalLine marginRight='10px' />
                        <m.AlarmSpan fontWeight='normal' fontColor='rgba(148, 148, 148, 1)'>10월 18일</m.AlarmSpan>
                    </m.AlarmInnerDiv>
                    <m.AlarmSpanContent>10월 12일에 들어온 [어메이징 오트(12Pk/Box)] 유통기한이 3일 남았습니다.</m.AlarmSpanContent>
                </m.AlarmDiv>
                <m.AlarmDiv>
                    <m.AlarmCheckboxDiv><m.AlarmCheckbox /></m.AlarmCheckboxDiv>
                    <m.AlarmInnerDiv>
                        <m.AlarmSpan>유통기한 알림</m.AlarmSpan>
                        <h.VerticalLine marginRight='10px' />
                        <m.AlarmSpan fontWeight='normal' fontColor='rgba(148, 148, 148, 1)'>10월 18일</m.AlarmSpan>
                    </m.AlarmInnerDiv>
                    <m.AlarmSpanContent>10월 12일에 들어온 [어메이징 오트(12Pk/Box)] 유통기한이 3일 남았습니다.</m.AlarmSpanContent>
                </m.AlarmDiv>
            </s.ContentListDiv>
        </>
    )
}
export default MyAlarmList;