import * as s from '../styles/StyledStore.tsx';

import { IconButton, ButtonGroup, Button } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Link } from 'react-router-dom';

const Complain = () => {
    return (
        <>
            <s.ContentDiv>
            <p>고객의 소리</p>
            <Button><Link to="/complainWrite">글 작성</Link></Button>

            <table>
                <thead><th>번호</th><th>제목</th><th>작성자</th><th>작성일</th><th>상태</th></thead>
                <tbody>
                    <tr>
                        <td>21</td>
                        <td>[독산역점]아침 근무하는 알바 불친절함</td>
                        <td>김*영</td>
                        <td>2024.07.11 13:23</td>
                        <td>전달중</td>
                    </tr>
                    <tr>
                        <td>21</td>
                        <td>[독산역점]아침 근무하는 알바 불친절함</td>
                        <td>김*영</td>
                        <td>2024.07.11 13:23</td>
                        <td>전달완료</td>
                    </tr>
                    <tr>
                        <td>21</td>
                        <td>[독산역점]아침 근무하는 알바 불친절함</td>
                        <td>김*영</td>
                        <td>2024.07.11 13:23</td>
                        <td>전달완료</td>
                    </tr>
                </tbody>
            </table>

                <ButtonGroup variant="outlined">
                    <IconButton>
                        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                    </IconButton>
                    <IconButton>1</IconButton>
                    <IconButton>2</IconButton>
                    <IconButton>3</IconButton>
                    <IconButton>4</IconButton>
                    <IconButton>5</IconButton>
                    <IconButton>
                        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                    </IconButton>
                </ButtonGroup>
            </s.ContentDiv>
        </>
    )
}
export default Complain;