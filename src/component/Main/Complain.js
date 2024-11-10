import * as s from '../styles/StyledStore.tsx';

import { IconButton, ButtonGroup, Button } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Link } from 'react-router-dom';

const Complain = () => {
    return (
        <>
            <s.ContentListDiv>
            <s.MainTitleText>고객의 소리</s.MainTitleText>
            <s.ButtonDiv textAlign='right'>
            <s.ButtonStyle><Link to="/complainWrite">글 작성</Link></s.ButtonStyle>
            </s.ButtonDiv>

            <s.TableList>
                <s.TableListThead><s.TableTextTh>번호</s.TableTextTh><s.TableTextTh>제목</s.TableTextTh><s.TableTextTh>작성자</s.TableTextTh>
                    <s.TableTextTh>작성일</s.TableTextTh><s.TableTextTh>상태</s.TableTextTh></s.TableListThead>
                <tbody>
                    <s.TableTextTr>
                        <s.TableTextTd>21</s.TableTextTd>
                        <s.TableTextTd>[독산역점]아침 근무하는 알바 불친절함</s.TableTextTd>
                        <s.TableTextTd>김*영</s.TableTextTd>
                        <s.TableTextTd>2024.07.11 13:23</s.TableTextTd>
                        <s.TableTextTd>전달중</s.TableTextTd>
                    </s.TableTextTr>
                    <s.TableTextTr>
                        <s.TableTextTd>21</s.TableTextTd>
                        <s.TableTextTd>[독산역점]아침 근무하는 알바 불친절함</s.TableTextTd>
                        <s.TableTextTd>김*영</s.TableTextTd>
                        <s.TableTextTd>2024.07.11 13:23</s.TableTextTd>
                        <s.TableTextTd>전달완료</s.TableTextTd>
                    </s.TableTextTr>
                    <s.TableTextTr>
                        <s.TableTextTd>21</s.TableTextTd>
                        <s.TableTextTd>[독산역점]아침 근무하는 알바 불친절함</s.TableTextTd>
                        <s.TableTextTd>김*영</s.TableTextTd>
                        <s.TableTextTd>2024.07.11 13:23</s.TableTextTd>
                        <s.TableTextTd>전달완료</s.TableTextTd>
                    </s.TableTextTr>
                </tbody>
            </s.TableList>

                <s.ButtonGroupDiv>
                    <s.ButtonGroupStyle variant="outlined">
                    <s.IconButtonStyle>
                        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                    </s.IconButtonStyle>
                    <s.IconButtonStyle>1</s.IconButtonStyle>
                    <s.IconButtonStyle>2</s.IconButtonStyle>
                    <s.IconButtonStyle>3</s.IconButtonStyle>
                    <s.IconButtonStyle>4</s.IconButtonStyle>
                    <s.IconButtonStyle>5</s.IconButtonStyle>
                    <s.IconButtonStyle>
                        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                    </s.IconButtonStyle>
                    </s.ButtonGroupStyle>
                </s.ButtonGroupDiv>
            </s.ContentListDiv>
        </>
    )
}
export default Complain;