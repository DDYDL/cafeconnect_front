import * as m from '../styles/StyledMypage.tsx';
import * as s from '../styles/StyledStore.tsx';

import { Link } from 'react-router-dom';

const AskDetailMain = ()=>{
    return (
        <>
            <s.ContentListDiv>
            <s.MainTitleText>1:1문의 상세</s.MainTitleText>

            <m.TableInfo>
                    <thead><m.TableInfoTh></m.TableInfoTh><m.TableInfoTh></m.TableInfoTh></thead>
                <tbody>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>문의유형</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>상품문의</m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>제목</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>판매상품 재고문의</m.TableInfoTd>
                    </m.TableInfoTr>
                </tbody>
            </m.TableInfo>

             <m.TableInfo>
                <thead><m.TableInfoTh></m.TableInfoTh><m.TableInfoTh></m.TableInfoTh></thead>
                <tbody>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>작성일</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>2024.10.23</m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>지점명</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>독산역점</m.TableInfoTd>
                    </m.TableInfoTr>
                </tbody>
            </m.TableInfo>

            <m.TableInfo>
                <thead><m.TableInfoTh></m.TableInfoTh><m.TableInfoTh></m.TableInfoTh></thead>
                <tbody>
                <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>문의내용</m.TableTitleSpan></m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd>대량주문 하려고 하는데 콜라보 컵홀더 추가재고 입고 날짜나 따로 현재 재고보다 넘게 주문 가능한지 된다면 언제쯤 받을 수 있는지 궁금합니다.</m.TableInfoTd>
                    </m.TableInfoTr>
                </tbody>
            </m.TableInfo>
            <m.TableInfo>
                <thead><m.TableInfoTh></m.TableInfoTh><m.TableInfoTh></m.TableInfoTh></thead>
                <tbody>
                <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>답변</m.TableTitleSpan></m.TableInfoTd>
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
export default AskDetailMain;