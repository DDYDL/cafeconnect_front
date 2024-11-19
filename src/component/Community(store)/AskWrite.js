import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // navigate를 사용하려면 이 임포트가 필요합니다.
import styled from "styled-components";
import { ButtonContainer, CustomButton } from "../styledcomponent/Button.style.js";
import { CustomHorizontal } from "../styledcomponent/Horizin.style.js";
import { InputMedium, Textarea } from "../styledcomponent/Input.style.js";

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
    <Wrapper>
      <HeadingContainer>
        <Heading>1:1문의 작성</Heading>
        <Navigation>
          <span>홈 / 커뮤니티</span>
          <span> / </span>
          <BoldText>1:1 문의 작성</BoldText>
        </Navigation>
      </HeadingContainer>

      <CustomHorizontal width="basic" bg="black" />

      <Form onSubmit={handleSubmit}>
        <FormContainer1>
          {/* <Label> */}
          <Form1div>요구사항 유형 *</Form1div>

          <Select
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
        </FormContainer1>

        <CustomHorizontal width="basic" bc="grey" />

        <FormContainer2>
          {/* <Label> */}
          <Form2div>제목 *</Form2div>
          <InputMedium type="text" value={title} onChange={e => setTitle(e.target.value)} />
          {/* </Label> */}
        </FormContainer2>

        <CustomHorizontal width="basic" bg="grey" />

        <FormContainer3>
          <Form3div>내용 *</Form3div>
          <Textarea value={content} onChange={e => setContent(e.target.value)} />
        </FormContainer3>

        <CustomHorizontal width="basic" bg="black" />

        <ButtonContainer>
          <CustomButton variant="cancel" onClick={handleCancel}>
            취소
          </CustomButton>
          <CustomButton variant="register" type="submit" onClick={handleRegister}>
            등록하기
          </CustomButton>
        </ButtonContainer>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  width: 100%;

  margin-top: 120px;
  box-sizing: border-box;

  position: relative;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
`;

const HeadingContainer = styled.div`
  width: 800px;
  display: flex;
  justify-content: center; /* 좌우로 배치 */
  align-items: center;
  margin-bottom: 38px;
`;

const Heading = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-top: 0;
  text-align: center;
  flex-grow: 1; /* 중앙에 위치하도록 성장 */
`;

const Navigation = styled.div`
  font-size: 10px;
  position: absolute; /* 절대 위치 */
  margin-right: 470px;
  right: 0; /* 오른쪽에 배치 */
`;

const Select = styled.select`
  width: 150px;
  height: 45px;
  padding-left: 30px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;

  background-color: yellow;
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
  padding: 10px;
  font-size: 16px;
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

  margin-left: 280px;
`;

const Form2div = styled.div`
  /* 직속 자식 div에만 적용 */
  font-size: 20px;
  font-weight: bold;
  margin-right: 82px;
  // margin-right: 120px;
`;

const FormContainer3 = styled.div`
  display: flex;
  justify-content: flex-start;
  text-align: center;
  align-items: center;
  width: 800px;

  margin-top: 30px;
  margin-bottom: 30px;

  margin-left: 280px;
  }
`;

const Form3div = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-right: 82px;
`;

const BoldText = styled.span`
  font-weight: bold;
`;

export default AskWrite;
