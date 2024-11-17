import * as m from '../styles/StyledMypage.tsx';
import * as s from '../styles/StyledStore.tsx';

import { Link } from 'react-router-dom';

const MyStoreManage = () => {
    return (
        <>
            <s.ContentListDiv width='800px' marginLeft='580px'>
                <s.MainTitleText>내 가맹점 관리</s.MainTitleText>
                <s.SearchButtonDiv textAlign='right'>
                    <s.ButtonStyle><Link to="/">가맹점 추가</Link></s.ButtonStyle>
                </s.SearchButtonDiv>

                <m.AlarmDiv height='120px' marginTop='10px'>
                    <m.StoreButtonDiv>
                        <s.ButtonStyle width='70px'><Link to="/">삭제 신청</Link></s.ButtonStyle>
                    </m.StoreButtonDiv>
                    <m.AlarmInnerDiv><m.AlarmSpan>Kosta커피 독산역점</m.AlarmSpan></m.AlarmInnerDiv>
                    <m.AlarmInnerDiv><m.AlarmSpan fontWeight='normal'>서울 금천구 독산동 986-13(세림상가, 2층)</m.AlarmSpan></m.AlarmInnerDiv>
                    <m.AlarmInnerDiv><m.AlarmSpan fontWeight='normal'>02)471-2087</m.AlarmSpan></m.AlarmInnerDiv>
                </m.AlarmDiv>
                <m.AlarmDiv height='120px' marginTop='10px'>
                    <m.StoreButtonDiv>
                        <s.ButtonStyle width='70px'><Link to="/">삭제 신청</Link></s.ButtonStyle>
                    </m.StoreButtonDiv>
                    <m.AlarmInnerDiv><m.AlarmSpan>Kosta커피 독산역점</m.AlarmSpan></m.AlarmInnerDiv>
                    <m.AlarmInnerDiv><m.AlarmSpan fontWeight='normal'>서울 금천구 독산동 986-13(세림상가, 2층)</m.AlarmSpan></m.AlarmInnerDiv>
                    <m.AlarmInnerDiv><m.AlarmSpan fontWeight='normal'>02)471-2087</m.AlarmSpan></m.AlarmInnerDiv>
                </m.AlarmDiv>
            </s.ContentListDiv>
        </>
    )
}
 
export default MyStoreManage;