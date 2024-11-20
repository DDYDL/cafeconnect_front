import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // navigate를 사용하려면 이 임포트가 필요합니다.
import styled from "styled-components";
import { ButtonContainer } from "../styledcomponent/Button.style.js";
// import { CustomHorizontal } from "../styledcomponent/Horizin.style.js";
import { Link } from "react-router-dom";
import { Textarea } from "../styledcomponent/Input.style.js";
import * as s from "../styles/StyledStore.tsx";
import { ContentListDiv } from "../styles/StyledStore.tsx";

const NoticeListMain = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate(); // useNavigate 훅을 호출하여 navigate 함수 정의

  // 취소 시, 홈으로 리디렉션
  const handleCancel = () => {
    navigate("/shopMain");
  };

  const handleRegister = () => {
    navigate("/noticeList");
  };

  const handleSubmit = event => {
    event.preventDefault();

    // 작성한 글을 서버로 전송
    const newNotice = {
      type: "주요 공지사항", // 항상 공지사항
      title,
      content,
      date: new Date().toISOString(),
    };

    fetch("https://www.localhost:8080/notice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNotice),
    })
      .then(response => response.json())
      .then(data => {
        console.log("Notice added:", data);
        // 글 작성 후 입력 필드 초기화
        setTitle("");
        setContent("");

        // 공지사항 작성이 완료된 후, noticeList 페이지로 리디렉션
        navigate("/community/noticeList");
      })
      .catch(error => console.error("Error posting notice:", error));
  };

  return (
    <ContentListDiv>
      <HeadingContainer>
        <Heading>공지사항 상세</Heading>
      </HeadingContainer>

      <Form onSubmit={handleSubmit}>
        <s.TrStyle>
          <s.TableTextTd>제목 *</s.TableTextTd>
          <s.TableTextTd>
            <s.InputStyle
              type="text"
              style={{ width: "290px", paddingLeft: "90px" }}
              placeholder="직원이 불친절함"
              disabled
            />
          </s.TableTextTd>

          <s.TableTextTd>작성일 *</s.TableTextTd>
          <s.TableTextTd>
            <s.InputStyle
              type="text"
              style={{ width: "290px", paddingLeft: "90px" }}
              placeholder="2024-12-20"
              disabled
            />
          </s.TableTextTd>
        </s.TrStyle>

        <s.TrStyle style={{ height: "200px", margin: "30px" }}>
          <s.TableTextTd>글 내용 *</s.TableTextTd>
          <s.TableTextTd>
            <Textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              style={{ width: "680px" }}
            />
            {/* <s.InputStyle type="text" value={title} onChange={e => setTitle(e.target.value)} /> */}
          </s.TableTextTd>
        </s.TrStyle>

        {/* <div> */}
        {/* <CustomHorizontal width="basic" bc="grey" /> */}
        {/* </div> */}

        {/* <Button variant="outline"></Button> */}

        <ButtonContainer>
          <s.ButtonStyle variant="outlined" bgColor="white" onClick={handleCancel}>
            <Link to="/complain">취소</Link>
          </s.ButtonStyle>
          &nbsp;&nbsp;
          <s.ButtonStyle onClick={handleRegister}>
            <Link to="/complain">등록하기</Link>
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
  padding-top: 10px;
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

export default NoticeListMain;
