import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // navigate를 사용하려면 이 임포트가 필요합니다.
import styled from "styled-components";
import { ButtonContainer } from "../styledcomponent/Button.style.js";
import { Textarea } from "../styledcomponent/Input.style.js";
import * as s from "../styles/StyledStore.tsx";
import { ContentListDiv } from "../styles/StyledStore.tsx";

const AskWrite = () => {
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
        <Heading>1:1문의 작성</Heading>
        {/* <Navigation>
          <span>홈 / 커뮤니티</span>
          <span> / </span>
          <BoldText>1:1 문의 작성</BoldText>
        </Navigation> */}
      </HeadingContainer>

      <Form onSubmit={handleSubmit}>
        <s.TrStyle>
          <s.TableTextTd>요구사항 유형 *</s.TableTextTd>
          <s.TableTextTd>
            {/* <s.InputStyle type="text" style={{ width: "680px" }} disabled /> */}

            <Select
              style={{ marginLeft: "20px" }}
              id="inquiryType"
              value={selectedInquiryType}
              onChange={e => setSelectedInquiryType(e.target.value)}
            >
              <Option value="default">선택</Option>
              <Option value="상품 문의">상품 문의</Option>
              <Option value="배송 문의">배송 문의</Option>
              <Option value="수리 문의">수리 문의</Option>
              <Option value="이벤트 문의">이벤트 문의</Option>
              <Option value="기타 문의">기타 문의</Option>
            </Select>
          </s.TableTextTd>
        </s.TrStyle>

        <s.TrStyle>
          <s.TableTextTd>제목 *</s.TableTextTd>
          <s.TableTextTd>
            <s.InputStyle
              style={{ width: "680px", marginLeft: "20px" }}
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </s.TableTextTd>
        </s.TrStyle>

        <s.TrStyle style={{ height: "200px", paddingTop: "20px" }}>
          <s.TableTextTd>내용 *</s.TableTextTd>
          <s.TableTextTd>
            <Textarea
              style={{ width: "680px", marginLeft: "20px" }}
              value={content}
              onChange={e => setContent(e.target.value)}
            />
            {/* <s.InputStyle type="text" value={title} onChange={e => setTitle(e.target.value)} /> */}
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

export default AskWrite;
