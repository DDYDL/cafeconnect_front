import axios from "axios";
import { useAtomValue } from "jotai/react";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // navigate를 사용하려면 이 임포트가 필요합니다.
import styled from "styled-components";
import { tokenAtom } from "../../atoms";
import { axiosInToken } from "../../config.js";
import { ButtonContainer } from "../styledcomponent/Button.style.js";
import { Textarea } from "../styledcomponent/Input.style.js";
import * as s from "../styles/StyledStore.tsx";
import { ContentListDiv } from "../styles/StyledStore.tsx";

const AskWrite = () => {
  const initSaleItem = {
    askType: "",
    askTitle: "",
    askContent: "",
    storeCode: 1,
    // askDate: new Date(), // 현재 날짜와 시간으로 초기화
  };
  const [askTitle, setAskTitle] = useState("");
  const [askContent, setAskContent] = useState("");
  const token = useAtomValue(tokenAtom);
  // const { storeCode } = useParams();
  const [ask, setAsk] = useState(initSaleItem);
  const [storeCode, setStoreCode] = useState(null);

  const navigate = useNavigate(); // useNavigate 훅을 호출하여 navigate 함수 정의
  const [askType, setAskType] = useState("default");

  // / fetchStoreCode를 useCallback으로 래핑 // storecode사용 가능
  const fetchStoreCode = useCallback(async () => {
    try {
      if (!token) return; // 토큰 없으면 요청 생략
      const response = await axiosInToken(token).get("/store");
      const storeCodeFromResponse = response.data?.storeCode; // 응답에서 storeCode 추출
      setStoreCode(storeCodeFromResponse);
      console.log("StoreCode:", storeCodeFromResponse);
    } catch (err) {
      console.error("storeCode 요청 중 오류 발생:", err);
    }
  }, [token]); // 의존성 배열에 token 추가

  useEffect(() => {
    fetchStoreCode();
  }, [fetchStoreCode]); // fetchStoreCode를 의존성 배열에 추가

  // 취소 시, 홈으로 리디렉션
  const handleCancel = () => {
    navigate(`/askList/${storeCode}`);
  };

  const handleRegister = () => {
    navigate(`/askList/${storeCode}`);
  };

  const handleSubmit = event => {
    event.preventDefault();

    const newAsk = {
      ...ask,
      askType: ask.askType,
      askTitle: ask.askTitle,
      askContent: ask.askContent,
      storeCode: storeCode,
      askDate: new Date().toISOString(),
    };
    console.log("newAsk" + newAsk);

    // !! 작성 완료, post내부 url 문제로 백엔드에 전송 안됐었음.
    axios
      .post(`http://localhost:8080/askWrite`, JSON.stringify(newAsk), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 필요한 경우 인증 토큰 추가
        },
      })
      .then(res => {
        console.log("newAsk", newAsk);
        console.log("res.data", res.data);

        // 등록 완료 후 alert을 먼저 띄운 뒤, 일정 시간이 지나면 페이지 이동
        alert("문의가 성공적으로 등록되었습니다.");
        navigate(`/askList`);
      })
      .catch(err => {
        console.error(err);
        alert("문의 등록 중 오류가 발생했습니다.");
      });
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
          <s.TableTextTd style={{ width: "120px" }}>요구사항 유형 *</s.TableTextTd>
          <s.TableTextTd>
            {/* <s.InputStyle type="text" style={{ width: "680px" }} disabled /> */}

            <Select
              style={{ marginLeft: "20px" }}
              id="inquiryType"
              value={ask.askType}
              onChange={e => setAsk({ ...ask, askType: e.target.value })}
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
          <s.TableTextTd style={{ width: "120px" }}>제목 *</s.TableTextTd>
          <s.TableTextTd>
            <s.InputStyle
              style={{ width: "630px", marginLeft: "20px" }}
              type="text"
              value={ask.askTitle}
              onChange={e => setAsk({ ...ask, askTitle: e.target.value })}
            />
          </s.TableTextTd>
        </s.TrStyle>

        <s.TrStyle style={{ height: "200px", paddingTop: "20px" }}>
          <s.TableTextTd style={{ width: "120px" }}>내용 *</s.TableTextTd>
          <s.TableTextTd>
            <Textarea
              style={{ width: "630px", marginLeft: "20px" }}
              value={ask.askContent}
              onChange={e => setAsk({ ...ask, askContent: e.target.value })}
            />
            {/* <s.InputStyle type="text" value={title} onChange={e => setTitle(e.target.value)} /> */}
          </s.TableTextTd>
        </s.TrStyle>

        <ButtonContainer>
          <s.ButtonStyle
            variant="outlined"
            bgColor="white"
            // onClick={handleCancel}
          >
            <Link to="/askList">취소</Link>
          </s.ButtonStyle>
          &nbsp;&nbsp;
          <s.ButtonStyle type="submit">등록하기</s.ButtonStyle>
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
