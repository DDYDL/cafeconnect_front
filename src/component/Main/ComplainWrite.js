import { Link } from 'react-router-dom';
import * as s from '../styles/StyledStore.tsx';

import { Button } from "@material-tailwind/react";

const ComplainWrite = ()=>{
    return (
        <>
            <s.ContentListDiv width='800px;' marginLeft='580px'>
                <s.MainTitleText>글 작성</s.MainTitleText>

                <s.TableList width='800px' textAlign='left'>
                    <tbody>
                        <s.TrStyle><s.TableTextTd>성함 *</s.TableTextTd><s.TableTextTd><s.InputStyle type='text'/></s.TableTextTd></s.TrStyle>
                        <s.TrStyle><s.TableTextTd>전화번호 *</s.TableTextTd><s.TableTextTd><s.InputStyle type='text'/></s.TableTextTd></s.TrStyle>
                        <s.TrStyle><s.TableTextTd>가맹점명 *</s.TableTextTd><s.TableTextTd><s.InputStyle type='text' width='520px'/>&nbsp;&nbsp;<s.ButtonStyle>조회</s.ButtonStyle></s.TableTextTd></s.TrStyle>
                        <s.TrStyle><s.TableTextTd>제목 *</s.TableTextTd><s.TableTextTd><s.InputStyle type='text'/></s.TableTextTd></s.TrStyle>
                        <s.TrStyle><s.TableTextTd>내용 *</s.TableTextTd><s.TableTextTd><s.TextareaStyle rows={4} cols={77}/></s.TableTextTd></s.TrStyle>
                    </tbody>
                </s.TableList>
                <s.ButtonDiv>
                    <s.ButtonStyle variant="outlined" bgColor="white"><Link to='/complain'>취소</Link></s.ButtonStyle>&nbsp;&nbsp;
                    <s.ButtonStyle><Link to='/complain'>등록하기</Link></s.ButtonStyle>
                </s.ButtonDiv>
            </s.ContentListDiv>
        </>
    )
}
export default ComplainWrite;