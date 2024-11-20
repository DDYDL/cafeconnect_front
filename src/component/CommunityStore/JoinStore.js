import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // navigate를 사용하려면 이 임포트가 필요합니다.
import styled from "styled-components";
import { ButtonContainer } from "../styledcomponent/Button.style.js";
import * as s from "../styles/StyledStore.tsx";
import { ContentListDiv } from "../styles/StyledStore.tsx";

const JoinStore = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate(); // useNavigate 훅을 호출하여 navigate 함수 정의
  const [selectedInquiryType, setSelectedInquiryType] = useState("default");

  // 취소 시, 홈으로 리디렉션
  const handleCancel = () => {
    navigate("/shopMain");
  };

  const handleRegister = () => {
    navigate("/askList");
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
        navigate("/noticeList");
      })
      .catch(error => console.error("Error posting notice:", error));
  };

  return (
    <ContentListDiv>
      <HeadingContainer>
        <Heading>회원가입</Heading>
      </HeadingContainer>

      <Form onSubmit={handleSubmit}>
        <s.TrStyle style={{ display: "flex", flexDirection: "row", marginLeft: "200px", borderBottom: "none"}}>
          <s.TableTextTd>아이디 *</s.TableTextTd>
          <s.TableTextTd>
            <s.InputStyle
              style={{ width: "300px", marginLeft: "20px"}}
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </s.TableTextTd>

          <s.ButtonStyle
            style={{ marginLeft: "230px", marginTop: "3px", height: "36px" }}
            variant="outlined"
            bgColor="white"
            onClick={handleCancel}
          >
            <Link to="/checkDoubleId">중복 확인</Link>
          </s.ButtonStyle>
        </s.TrStyle>

        <s.TrStyle
          style={{ display: "flex", flexDirection: "row", marginLeft: "200px", paddingTop: "10px",borderBottom: "none" }}
        >
          <s.TableTextTd>비밀번호 *</s.TableTextTd>
          <s.TableTextTd>
            <s.InputStyle
              style={{ width: "300px", marginLeft: "20px" }}
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </s.TableTextTd>
        </s.TrStyle>

        <s.TrStyle
          style={{ display: "flex", flexDirection: "row", marginLeft: "200px", paddingTop: "10px",borderBottom: "none" }}
        >
          <s.TableTextTd>가맹점 코드 *</s.TableTextTd>
          <s.TableTextTd>
            <s.InputStyle
              style={{ width: "300px", marginLeft: "20px" }}
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </s.TableTextTd>
          <s.ButtonStyle
            style={{ marginLeft: "230px", marginTop: "3px", height: "36px" }}
            variant="outlined"
            bgColor="white"
            onClick={handleCancel}
          >
            <Link to="/checkStoreCode">조회</Link>
          </s.ButtonStyle>
        </s.TrStyle>

        <s.TrStyle
          style={{ display: "flex", flexDirection: "row", marginLeft: "200px", paddingTop: "10px",borderBottom: "none" }}
        >
          <s.TableTextTd>가맹점명 *</s.TableTextTd>
          <s.TableTextTd>
            <s.InputStyle
              style={{ width: "300px", marginLeft: "20px" }}
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </s.TableTextTd>
        </s.TrStyle>

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
  flex-direction: column;

  justify-content: center;
  align-items: center;
  text-align: center;
  margin-left: 50px;
  padding-top: 30px;
`;

const Select = styled.select`
  display: flex;
  justify-content: center;
  text-align: center;
  algin-items: center;

  height: 38px;
  font-size: 12px;
  border-radius: 5px;
  border: 1px solid #ccc;

  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }

  &:focus {
    outline: none;
    border-color: #4caf50;
  }
`;

const Option = styled.option`
  // padding: 10px;
  // font-size: 16px;
`;

const FormContainer1 = styled.div`
  display: flex;
  // justify-content: flex-start;
  align-items: center;
  text-align: center;

  margin-top: 30px;
  margin-bottom: 30px;

  margin-left: 200px;
`;

const Form1div = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const FormContainer2 = styled.div`
  display: flex;
  // justify-content: flex-start;
  text-align: center;
  align-items: center;

  margin-top: 30px;
  margin-bottom: 30px;

  margin-left: 200px;
`;

const Form2div = styled.div`
  /* 직속 자식 div에만 적용 */
  font-size: 20px;
  font-weight: bold;
  // margin-right: 82px;
  // margin-right: 120px;
`;

const FormContainer3 = styled.div`
  display: flex;
  // justify-content: flex-start;
  text-align: center;
  align-items: center;

  margin-top: 30px;
  margin-bottom: 30px;

    margin-left: 200px;
  }
`;

const Form3div = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-right: 120px;
`;

const BoldText = styled.span`
  font-weight: bold;
`;

export default JoinStore;
