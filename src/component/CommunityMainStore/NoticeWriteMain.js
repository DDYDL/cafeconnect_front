import * as h from "../styles/HStyledStore.tsx";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ButtonContainer } from "../styledcomponent/Button.style.js";
// import { CustomHorizontal } from "../styledcomponent/Horizin.style.js";
import { useAtom, useAtomValue } from "jotai/react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { memberAtom, tokenAtom } from "../../atoms.js";
import { axiosInToken } from "../../config.js";
import { Textarea } from "../styledcomponent/Input.style.js";
import * as s from "../styles/StyledStore.tsx";
import { ContentListDiv } from "../styles/StyledStore.tsx";

const NoticeWriteMain = () => {
  const [member, setMemeber] = useAtom(memberAtom);
  const initSaleItem = {
    noticeType: "",
    noticeTitle: "",
    noticeContent: "",
    mainStoreId: member.memberNum,
  };
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate(); // useNavigate 훅을 호출하여 navigate 함수 정의
  const [notice, setNotice] = useState([initSaleItem]);
  const [token, setToken] = useAtom(tokenAtom);
  const [selectedNoticeType, setSelectedNoticeType] = useState([
    { value: "일반", label: "공지사항" },
  ]);
  const { noticeNum } = useParams(); // URL에서 noticeNum 추출
  const store = useAtomValue(memberAtom);
  const storeCode = store.storeCode;

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

  const handleSubmit = event => {
    // event.preventDefault();

    // 필수 필드 검증
    if (!noticeType) {
      alert("요구사항 유형을 선택해주세요");
      return;
    }
    if (!notice.noticeTitle) {
      alert("제목을 입력해주세요");
      return;
    }
    if (!notice.noticeContent) {
      alert("내용을 입력해주세요");
      return;
    }

    const newNotice = {
      // ...notice,
      noticeType: notice.noticeType,
      noticeTitle: notice.noticeTitle,
      noticeContent: notice.noticeContent,
      noticeDate: new Date().toISOString(),
      mainStoreId: member.memberNum,
    };

    console.log("newNotice 객체:", newNotice);

    axiosInToken(token)
      .post(`http://localhost:8080/noticeWriteMain`, newNotice)
      .then(res => {
        if (res.headers.authorization != null) {
          console.log("notice", newNotice);
          console.log("res.data", res.data);
          setToken(res.headers.authorization);
        }
        alert("문의가 성공적으로 등록되었습니다.");
        navigate(`/noticeListMain`);
      })
      .catch(err => {
        console.error(err);
        alert("문의 등록 중 오류가 발생했습니다.");
      });
  };

  const noticeType = [
    { value: "일반", label: "공지사항" },
    { value: "주요", label: "주요 공지사항" },
  ];

  return (
    <ContentListDiv>
      <HeadingContainer>
        <Heading>공지사항 작성</Heading>
      </HeadingContainer>

      <Form>
        <s.TrStyle style={{ paddingLeft: "20px" }}>
          <s.TableTextTd>
            <h.TableTitleSpan>
              공지유형<h.Required>*</h.Required>
            </h.TableTitleSpan>
          </s.TableTextTd>
          <s.TableTextTd>
            <h.NoticeSelectDiv style={{ marginLeft: "20px" }}>
              <ReactSelect
                isSearchable={false}
                className="w-full CustomSelect"
                placeholder="공지유형 선택"
                options={noticeType}
                onChange={e => setNotice({ noticeType: e.value })}
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
              value={notice.noticeTitle}
              onChange={e => setNotice({ ...notice, noticeTitle: e.target.value })}
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
              value={notice.noticeContent}
              onChange={e => setNotice({ ...notice, noticeContent: e.target.value })}
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

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  padding-top: 30px;
`;

export default NoticeWriteMain;
