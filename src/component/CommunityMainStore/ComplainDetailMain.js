import * as m from '../styles/StyledMypage.tsx';
import * as s from '../styles/StyledStore.tsx';

import { Link } from 'react-router-dom';

const ComplainDetailMain = ()=>{
    return (
        <>
            <s.ContentListDiv>
            <s.MainTitleText>컴플레인 상세</s.MainTitleText>

            <m.TableInfo>
                    <thead><m.TableInfoTh></m.TableInfoTh><m.TableInfoTh></m.TableInfoTh></thead>
                <tbody>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>지점명</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>가산호서대점</m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>제목</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>직원이 굉장히 불친절함</m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>작성자</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>김**</m.TableInfoTd>
                        <m.TableInfoTd><m.TableTitleSpan>작성일</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>2024.10.23</m.TableInfoTd>
                    </m.TableInfoTr>
                </tbody>
            </m.TableInfo>

             <m.TableInfo>
                <thead><m.TableInfoTh></m.TableInfoTh><m.TableInfoTh></m.TableInfoTh></thead>
                <tbody>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan></m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd></m.TableInfoTd>
                    </m.TableInfoTr>
                </tbody>
            </m.TableInfo>

            <m.TableInfo>
                <thead><m.TableInfoTh></m.TableInfoTh><m.TableInfoTh></m.TableInfoTh></thead>
                <tbody>
                <m.TableInfoTr>
                    </m.TableInfoTr>
                </tbody>
            </m.TableInfo>
            <m.TableInfo>
                <thead><m.TableInfoTh></m.TableInfoTh><m.TableInfoTh></m.TableInfoTh></thead>
                <tbody>
                <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>내용</m.TableTitleSpan></m.TableInfoTd>
                    </m.TableInfoTr>
                <m.TableInfoTr>
                        <m.TableInfoTd><m.TableInfoTd>자주 가던 지점인데 지난 주말 오전에 갈색 단발머리 여자분이 진짜 불친절해서 한동안 그 시간은 피해서 방문할 것 같아요</m.TableInfoTd></m.TableInfoTd>
                    </m.TableInfoTr>
                </tbody>
            </m.TableInfo>
            <m.TableInfo>
                <thead><m.TableInfoTh></m.TableInfoTh><m.TableInfoTh></m.TableInfoTh></thead>
                <tbody>
                <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>코멘트</m.TableTitleSpan></m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><s.InputStyle width='800px' type='text'/></m.TableInfoTd>
                    </m.TableInfoTr>
                </tbody>
            </m.TableInfo>
            </s.ContentListDiv >
        </>
    )
}
export default ComplainDetailMain;