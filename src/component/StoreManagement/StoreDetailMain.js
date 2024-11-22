import * as m from '../styles/StyledMypage.tsx';
import * as s from '../styles/StyledStore.tsx';

import { Link } from 'react-router-dom';

const StoreDetailMain = ()=>{
    return (
        <>
            <s.ContentListDiv>
            <s.MainTitleText>Kosta커피 독산역점</s.MainTitleText>

            <m.TableInfo>
                    <thead><m.TableInfoTh></m.TableInfoTh><m.TableInfoTh></m.TableInfoTh></thead>
                <tbody>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>가맹점 코드</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>01230</m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>가맹점 주소</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>(04872)서울 금천구 독산동 271-1 1층</m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>가맹점/HP</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>02)452-7851</m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>영업시간</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>9:00 ~ 21:00</m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>휴무일</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>매주 월요일</m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>계약체결일</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>2024.10.12</m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>계약기간</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>2024.10.13 ~ 2026.10.12</m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>최초개점일</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>2024.11.13</m.TableInfoTd>
                    </m.TableInfoTr>
                </tbody>
            </m.TableInfo>

             <m.TableInfo>
                <thead><m.TableInfoTh></m.TableInfoTh><m.TableInfoTh></m.TableInfoTh></thead>
                <tbody>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>점주명</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>김커피</m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>점주/HP</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>010-1234-5678</m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>매니저명</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>강아침</m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>매니저/HP</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>010-4678-4256</m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd colSpan={2}>
                       <s.SearchButtonDiv textAlign='right'>
                            <s.ButtonStyle width='70px' style={{marginTop:'30px', marginRight:'65px'}}><Link to="/modifyStoreMain">수정</Link></s.ButtonStyle>
                            {/* <Button onClick={()=>deleteStore(store.storeCode)}>삭제</Button> */}
                        </s.SearchButtonDiv>
                        </m.TableInfoTd>
                    </m.TableInfoTr>
                </tbody>
            </m.TableInfo>
            </s.ContentListDiv >
        </>
    )
}
export default StoreDetailMain;