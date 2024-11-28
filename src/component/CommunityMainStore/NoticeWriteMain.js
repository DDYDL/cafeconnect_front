import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ButtonContainer } from "../styledcomponent/Button.style.js";
// import { CustomHorizontal } from "../styledcomponent/Horizin.style.js";
import { Link } from "react-router-dom";
import { Textarea } from "../styledcomponent/Input.style.js";
import * as s from "../styles/StyledStore.tsx";
import { ContentListDiv } from "../styles/StyledStore.tsx";
import {axiosInToken} from "../../config";
import {useAtomValue} from "jotai/react";
import {tokenAtom} from "../../atoms";
import axios from "axios";

const NoticeWriteMain = () => {
  const token = useAtomValue(tokenAtom);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate(); // useNavigate 훅을 호출하여 navigate 함수 정의
  const [notice, setNotice] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInToken(token).get('noticeWriteMain');
                console.log(response.data);
                setNotice([...response.data]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        console.log("token" + token)

        if (token) fetchData();
    }, [token]);

  // 취소 시, 홈으로 리디렉션
  const handleCancel = () => {
    navigate("/noticeListMain");
  };

    // 등록 버튼 클릭 시 처리
    const handleRegister = async () => {
        const isSuccess = await handleSubmit(); // handleSubmit 호출 및 성공 여부 확인

        console.log("isSuccess = " + isSuccess)
        if (isSuccess) {
            navigate("/noticeListMain"); // 성공 시 페이지 이동
        } else {
            alert("등록에 실패했습니다. 다시 시도해주세요."); // 실패 시 알림
        }
    };



    // 작성한 글을 서버로 전송
const handleSubmit = async () => {
    const notice = {
        noticeType: "주요 공지사항",
        noticeTitle: "",
        noticeContent: "",
        date: new Date().toISOString(),
    };

    try {
        const response = await axios.post("https://localhost:8080/noticeWriteMain", notice, {

            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("Notice:",notice);
        console.log("Notice added:", response.data);

        // 입력 필드 초기화
        setTitle("");
        setContent("");

        // 공지사항 작성 완료 후, 리스트 페이지로 이동
        navigate("/noticeListMain");
    } catch (error) {
        console.error("Error posting notice:", error);
    }
};

  return (
    <ContentListDiv>
      <HeadingContainer>
        <Heading>공지사항 작성</Heading>
      </HeadingContainer>

      <Form onSubmit={handleSubmit}>
        <s.TrStyle>
          <s.TableTextTd>공지유형 *</s.TableTextTd>
          <s.TableTextTd>
            <s.InputStyle
              type="text"
              style={{ width: "300px", paddingLeft: "90px" }}
              placeholder="주요 공지사항"
              disabled
            />
          </s.TableTextTd>
        </s.TrStyle>

        <s.TrStyle>
          <s.TableTextTd>제목 *</s.TableTextTd>
          <s.TableTextTd>
            <s.InputStyle
              type="text"
              style={{ width: "680px" }}
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </s.TableTextTd>
        </s.TrStyle>

        <s.TrStyle style={{ height: "200px", margin: "30px" }}>
          <s.TableTextTd>내용 *</s.TableTextTd>
          <s.TableTextTd>
            <Textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              style={{ width: "680px" }}
            />
          </s.TableTextTd>
        </s.TrStyle>

        <ButtonContainer>
          <s.ButtonStyle variant="outlined" bgColor="white" onClick={handleCancel}>
            <Link to="/noticeListMain">취소</Link>
          </s.ButtonStyle>
          &nbsp;&nbsp;
          <s.ButtonStyle onClick={handleRegister}>
            <Link to="/noticeListMain">등록하기</Link>
          </s.ButtonStyle>
        </ButtonContainer>
      </Form>
    </ContentListDiv>
  );
};

const HeadingContainer = styled.div`
  display: flex;
  justify-content: center; /* 좌우로 배치 */
  align-items: center;
  text-align: center;
  margin-bottom: 38px;
`;

const Heading = styled.h2`
  font-size: 24px;
  font-weight: bold;
  position: absolute;
`;

const Navigation = styled.div`
  font-size: 10px;
  margin-left: 850px;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
`;

const FormContainer1 = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  width: 600px;

  margin-top: 30px;
  margin-bottom: 30px;
`;

const Form1div = styled.div`
  /* 직속 자식 div에만 적용 */
  font-size: 20px;
  font-weight: bold;
  margin-right: 50px;
`;

const FormContainer2 = styled.div`
  display: flex;
  justify-content: flex-start;
  text-align: center;
  align-items: center;
  width: 800px;

  margin-top: 30px;
  margin-bottom: 30px;

  margin-left: 200px;
`;

const Form2div = styled.div`
  /* 직속 자식 div에만 적용 */
  font-size: 20px;
  font-weight: bold;
  margin-right: 82px;
`;

const FormContainer3 = styled.div`
  display: flex;
  justify-content: flex-start;
  text-align: center;
  align-items: center;
  width: 800px;

  margin-top: 30px;
  margin-bottom: 30px;

  margin-left: 200px;
`;

const Form3div = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-right: 82px;
`;

const BoldText = styled.span`
  font-weight: bold;
`;

export default NoticeWriteMain;
