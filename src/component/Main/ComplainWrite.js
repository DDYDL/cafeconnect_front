import { Link } from 'react-router-dom';
import * as s from '../styles/StyledStore.tsx';

import { Button } from "@material-tailwind/react";

const ComplainWrite = ()=>{
    return (
        <>
            <s.ContentDiv>
                <p>글 작성</p>

                <table>
                    <tbody>
                        <tr><td><label>성함</label><input type='text' /></td></tr>
                        <tr><td><label>전화번호</label><input type='text' /></td></tr>
                        <tr><td><label>가맹점명</label><input type='text'/><Button>조회</Button></td></tr>
                        <tr><td><label>제목</label><input type='text' /></td></tr>
                        <tr><td><label>내용</label><input type='textarea'/></td></tr>
                    </tbody>
                </table>
                <Button variant="outlined"><Link to='/complain'>취소</Link></Button>
                <Button><Link to='/complain'>등록하기</Link></Button>
            </s.ContentDiv>
        </>
    )
}
export default ComplainWrite;