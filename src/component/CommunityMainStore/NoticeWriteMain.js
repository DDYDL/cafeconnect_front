import * as h from '../styles/HStyledStore.tsx';

import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ButtonContainer } from "../styledcomponent/Button.style.js";
// import { CustomHorizontal } from "../styledcomponent/Horizin.style.js";
import axios from "axios";
import { useAtom, useAtomValue } from "jotai/react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { memberAtom, tokenAtom } from "../../atoms.js";
import { axiosInToken, url } from "../../config.js";
import { Textarea } from "../styledcomponent/Input.style.js";
import * as s from "../styles/StyledStore.tsx";
import { ContentListDiv } from "../styles/StyledStore.tsx";
import ReactSelect from "react-select";

const NoticeWriteMain = () => {
  const token = useAtomValue(tokenAtom);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate(); // useNavigate 훅을 호출하여 navigate 함수 정의
  const [notice, setNotice] = useState([]);
  const [selectedNoticeType, setSelectedNoticeType] = useState([{value:'일반', label:'공지사항'}]);
  const { noticeNum } = useParams(); // URL에서 noticeNum 추출
  const [storeCode, setStoreCode] = useState(null);
  const [member, setMemeber] = useAtom(memberAtom);

  // / fetchStoreCode를 useCallback으로 래핑
  const fetchStoreCode = useCallback(async () => {
    try {
      if (!token) return; // 토큰 없으면 요청 생략
      const response = await axiosInToken(token).get("/store");
      const storeCodeFromResponse = response.data?.storeCode; // 응답에서 storeCode 추출
      setStoreCode(storeCodeFromResponse);
      console.log("StoreCode:", storeCodeFromResponse);
      console.log("token" + token);
    } catch (err) {
      console.error("storeCode 요청 중 오류 발생:", err);
    }
  }, [token]); // 의존성 배열에 token 추가

  useEffect(() => {
    fetchStoreCode();
  }, [fetchStoreCode]); // fetchStoreCode를 의존성 배열에 추가

  // 등록 버튼 클릭 시 처리
  const handleRegister = async () => {
    console.log("제목:", title); // title 상태값 출력
    console.log("내용:", content); // content 상태값 출력

    await handleSubmit(); // handleSubmit 호출 및 성공 여부 확인
  };

  // 취소 시, 홈으로 리디렉션
  const handleCancel = () => {
    navigate("/noticeListMain");
  };

  // 작성한 글을 서버로 전송
  const handleSubmit = () => {
    console.log("제목 (서버로 전송):", title);
    console.log("내용 (서버로 전송):", content);

    const notice = {
      noticeType: "주요 공지사항",
      noticeTitle: title,
      noticeContent: content,
      noticeDate: new Date().toISOString(),
      mainStoreId: member.memberNum,
    };
    console.log("notice 객체:", notice);

    const res = axios
      .post(`${url}/noticeWriteMain`, notice, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(res => {
        console.log(res.data);
        // 입력 필드 초기화
        setTitle("");
        setContent("");

        console.log("Notice:", notice);
        console.log("Notice added:", res.data);
        alert("등록 완료");
        navigate("/noticeListMain"); // 성공 시 페이지 이동
      })
      .catch(err => {
        alert("등록에 실패했습니다. 다시 시도해주세요."); // 실패 시 알림
        console.log(err);
      });
  };

  const noticeType = [{value:'일반', label:'공지사항'}, {value:'주요', label:'주요 공지사항'}]

  return (
    <ContentListDiv>
      <HeadingContainer>
        <Heading>공지사항 작성</Heading>
      </HeadingContainer>

      <Form>
        <s.TrStyle>
          <s.TableTextTd><h.TableTitleSpan>공지유형<h.Required>*</h.Required></h.TableTitleSpan></s.TableTextTd>
          <s.TableTextTd>
            <h.NoticeSelectDiv>
              <ReactSelect
                  isSearchable={false}
                  className="w-full CustomSelect"
                  value={selectedNoticeType} 
                  options={noticeType}
                  onChange={(val)=>{setSelectedNoticeType(val)}}
              />
            </h.NoticeSelectDiv>
          </s.TableTextTd>
        </s.TrStyle>

        <s.TrStyle>
          <s.TableTextTd><h.TableTitleSpan>제목<h.Required>*</h.Required></h.TableTitleSpan></s.TableTextTd>
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
          <s.TableTextTd><h.TableTitleSpan>내용<h.Required>*</h.Required></h.TableTitleSpan></s.TableTextTd>
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
