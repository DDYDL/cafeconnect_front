import { useAtom, useAtomValue } from "jotai/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // navigate를 사용하려면 이 임포트가 필요합니다.
import ReactSelect from "react-select";
import styled from "styled-components";
import { memberAtom, tokenAtom } from "../../atoms";
import { axiosInToken } from "../../config.js";
import { ButtonContainer } from "../styledcomponent/Button.style.js";
import { Textarea } from "../styledcomponent/Input.style.js";
import * as h from "../styles/HStyledStore.tsx";
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
  // const { storeCode } = useParams();
  const [ask, setAsk] = useState(initSaleItem);
  const [token, setToken] = useAtom(tokenAtom);
  const store = useAtomValue(memberAtom);
  const navigate = useNavigate(); // useNavigate 훅을 호출하여 navigate 함수 정의
  // const [selectedAskType, setSelectedAskType] = useState([{ value: "일반", label: "공지사항" }]);

  const storeCode = store.storeCode;

  // 취소 시, 홈으로 리디렉션
  const handleCancel = () => {
    navigate(`/askList/${storeCode}`);
  };

  const handleRegister = () => {
    navigate(`/askList/${storeCode}`);
  };

  const handleSubmit = event => {
    event.preventDefault();

    // 필수 필드 검증
    if (!ask.askType) {
      alert("요구사항 유형을 선택해주세요");
      return;
    }
    if (!ask.askTitle) {
      alert("제목을 입력해주세요");
      return;
    }
    if (!ask.askContent) {
      alert("내용을 입력해주세요");
      return;
    }

    const newAsk = {
      ...ask,
      askType: ask.askType,
      askTitle: ask.askTitle,
      askContent: ask.askContent,
      storeCode: storeCode,
      askDate: new Date().toISOString(),
    };
    console.log("newAsk" + newAsk);

    axiosInToken(token)
      .post(`http://localhost:8080/askWrite`, newAsk)
      .then(res => {
        if (res.headers.authorization != null) {
          console.log("newAsk", newAsk);
          console.log("res.data", res.data);
          setToken(res.headers.authorization);
        }
        alert("문의가 성공적으로 등록되었습니다.");
        navigate(`/askList`);
      })
      .catch(err => {
        console.error(err);
        alert("문의 등록 중 오류가 발생했습니다.");
      });
  };

  const askType = [
    { value: "선택", label: "선택" },
    { value: "상품 문의", label: "상품 문의" },
    { value: "배송 문의", label: "배송 문의" },
    { value: "수리 문의", label: "수리 문의" },
    { value: "이벤트 문의", label: "이벤트 문의" },
    { value: "기타 문의", label: "기타 문의" },
  ];

  return (
    <ContentListDiv>
      <HeadingContainer>
        <Heading>1:1문의 작성</Heading>
      </HeadingContainer>

      <Form onSubmit={handleSubmit}>
        <s.TrStyle>
          <s.TableTextTd style={{ width: "120px" }}>
            <h.TableTitleSpan>
              요구사항 유형<h.Required>*</h.Required>
            </h.TableTitleSpan>
          </s.TableTextTd>
          <s.TableTextTd style={{ paddingLeft: "22px" }}>
            <h.NoticeSelectDiv>
              <ReactSelect
                isSearchable={false}
                className="w-full CustomSelect"
                placeholder="문의 유형 선택"
                options={askType}
                onChange={e => setAsk({ askType: e.value })}
              />
            </h.NoticeSelectDiv>
          </s.TableTextTd>
        </s.TrStyle>

        <s.TrStyle>
          <s.TableTextTd style={{ width: "120px" }}>
            <h.TableTitleSpan>
              제목<h.Required>*</h.Required>
            </h.TableTitleSpan>
          </s.TableTextTd>
          <s.TableTextTd>
            <s.InputStyle
              style={{ width: "630px", marginLeft: "20px" }}
              type="text"
              value={ask.askTitle}
              onChange={e => setAsk({ ...ask, askTitle: e.target.value })}
            />
          </s.TableTextTd>
        </s.TrStyle>

        <s.TrStyle style={{ height: "250px", paddingTop: "20px" }}>
          <s.TableTextTd style={{ width: "120px" }}>
            <h.TableTitleSpan>
              내용<h.Required>*</h.Required>
            </h.TableTitleSpan>
          </s.TableTextTd>
          <s.TableTextTd>
            <Textarea
              style={{
                width: "630px",
                marginLeft: "20px",
                border: "1px solid rgba(234, 234, 234, 1)",
                resize: "none",
              }}
              value={ask.askContent}
              onChange={e => setAsk({ ...ask, askContent: e.target.value })}
            />
          </s.TableTextTd>
        </s.TrStyle>

        <ButtonContainer>
          <s.ButtonStyle variant="outlined" bgColor="white">
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

const Form = styled.form`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
  text-align: center;
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

export default AskWrite;
