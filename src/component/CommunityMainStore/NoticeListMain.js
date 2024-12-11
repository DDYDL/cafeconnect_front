import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Input } from "@material-tailwind/react";
import axios from "axios";
import { useAtomValue } from "jotai/react";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { tokenAtom } from "../../atoms.js";
import { axiosInToken } from "../../config.js";
import { StyledButton } from "../styledcomponent/button.tsx";
import { CustomHorizontal } from "../styledcomponent/Horizin.style.js";
import * as s from "../styles/StyledStore.tsx";
import { ContentListDiv } from "../styles/StyledStore.tsx";

// todo 답변 저장 -> 해당 답변이 계속 보여지도록 해야함.
const NoticeListMain = () => {
  const [notice, setNotice] = useState([]);
  const [storeCode, setStoreCode] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null); // Track the selected item
  const [answers, setAnswers] = useState({}); // 항목별 답변을 저장하는 객체
  const [selectedAnswer, setSelectedAnswer] = useState(null); // 클릭한 항목의 답변을 저장하는 상태
  const navigate = useNavigate(); // useNavigate 훅을 호출하여 navigate 함수 정의
  const token = useAtomValue(tokenAtom);
  const [isSearchActive, setIsSearchActive] = useState(false); // 검색 버튼 클릭 여부
  const [searchNotice, setSearchNotice] = useState("");

  // useCallback 제거된 fetchData
  const fetchData = async () => {
    if (!token || !storeCode) return;
    try {
      const response = await axiosInToken(token).get(`/noticeListMain`);
      const formattedData = response.data.map(notice => ({
        ...notice,
        noticeDate: new Date(notice.noticeDate).toLocaleDateString("ko-KR"),
      }));
      setNotice(formattedData);
    } catch (err) {
      console.error("컴플레인 리스트 요청 중 오류 발생:", err);
    }
  };

  // / fetchStoreCode를 useCallback으로 래핑
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

  // useEffect는 그대로 유지
  useEffect(() => {
    fetchStoreCode();
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [token, storeCode]);

  // 검색 버튼 클릭 핸들러
  const onSearchClick = () => {
    setIsSearchActive(true);
  };

  const handleItemClick = noticeNum => {
    setSelectedItem(selectedItem === noticeNum ? null : noticeNum); // askNum으로 비교
    navigate(`/noticeDetailMain/${noticeNum}`);
  };

  const noticeWrite = () => {
    navigate("/noticeWriteMain");
  };

  const onChangeNotice = e => {
    setSearchNotice(e.target.value);
  };

  const filterNotice = notice.filter(a =>
    a.noticeTitle.toLowerCase().includes(searchNotice.toLowerCase())
  );

  // 리스트를 불러오는 함수
  const fetchNoticeList = async () => {
    try {
      if (!storeCode) return; // storeCode가 없는 경우 요청을 하지 않음
      const response = await axios.get(`http://localhost:8080/noticeListMain`);
      setNotice(response.data); // ask 리스트를 상태에 저장
      console.log("response.data" + response.data);
      console.log("notice" + notice);
    } catch (err) {
      console.error("리스트 불러오기 오류:", err);
    }
  };

  useEffect(() => {
    fetchNoticeList(); // 컴포넌트가 처음 렌더링될 때 ask 리스트를 불러옴
  }, [storeCode]);

  return (
    // <Wrapper>
    <ContentListDiv>
      <HeadingContainer>
        <Heading>공지사항</Heading>
      </HeadingContainer>

      <HeadingContainer1>
        <StyledButton size="md" theme="brown" onClick={noticeWrite} style={{ marginTop: "30px" }}>
          글 작성
        </StyledButton>

        <s.ButtonDiv width="200px" float="right">
          <s.SearchDiv width="200px">
            <Input
              name="search"
              label="제목 검색"
              value={searchNotice}
              onChange={onChangeNotice}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  onSearchClick(); // Enter 키를 누르면 onSearchClick 실행
                }
              }}
            />
            <MagnifyingGlassIcon
              onClick={onSearchClick} // 검색 버튼으로 사용
              className="h-5 w-5"
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#333",
              }}
            />
          </s.SearchDiv>
        </s.ButtonDiv>
      </HeadingContainer1>

      <CustomHorizontal width="basic" bg="black" />

      <TableHeader>
        <div>번호</div>
        <div>제목</div>
        <div>작성일</div>
      </TableHeader>

      <CustomHorizontal width="basic" bg="black" />

      {
        <div>
          {(isSearchActive ? filterNotice : notice).length > 0 ? (
            (isSearchActive ? filterNotice : notice).map((a, index) => (
              <React.Fragment key={a.noticeNum}>
                <TableInfoList onClick={() => handleItemClick(a.noticeNum)}>
                  <div>{index + 1}</div>
                  <div
                    style={{
                      paddingLeft: "100px",
                      display: "flex",
                      justifyContent: "left",
                      width: "440px",
                    }}
                  >
                    <span style={{ color: a.noticeType === "주요 공지사항" ? "red" : "black" }}>
                      [{a.noticeType}]
                    </span>{" "}
                    {a.noticeTitle}
                  </div>
                  <div style={{ paddingRight: "20px" }}>
                    {new Date(a.noticeDate).toLocaleDateString()}
                  </div>
                </TableInfoList>
                {selectedItem === a.noticeNum && (
                  <AnswerContainer>
                    <h3
                      style={{
                        display: "flex",
                        justifyContent: "left",
                        paddingTop: "10px",
                        paddingLeft: "20px",
                        fontSize: "20px",
                      }}
                    >
                      본사 답변
                    </h3>

                    <AnswerContent
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        padding: "20px",
                        textAlign: "left",
                      }}
                      readOnly
                    >
                      {answers[a.askNum] || "아직 답변이 작성되지 않았습니다."}
                    </AnswerContent>
                  </AnswerContainer>
                )}
              </React.Fragment>
            ))
          ) : (
            <div
              style={{
                display: "flex", // flexbox 사용
                justifyContent: "center", // 수평 가운데 정렬
                alignItems: "center", // 수직 가운데 정렬
                height: "200px", // 적절한 높이 설정 (화면 중앙에 맞추고 싶다면 부모 컨테이너의 높이도 설정 필요)
                fontSize: "16px", // 텍스트 크기 설정
                color: "#555", // 텍스트 색상 설정
              }}
            >
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      }
    </ContentListDiv>
  );
};

const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  // margin-bottom: 38px;
`;

const HeadingContainer1 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Heading = styled.h2`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  flex-grow: 1;
`;

const Navigation = styled.div`
  font-size: 10px;
  position: absolute;
  right: 0;
`;

const SearchContainer = styled.div`
  width: 800px;
  display: flex;
  align-items: center;
  justify-content: right;
  gap: 10px;
  margin-left: 200px;
`;

const SearchTitle = styled.div`
  width: 50px;
  font-weight: bold;
  font-size: 16px;
`;

const SearchInput = styled.input`
  padding: 6px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const SearchButton = styled.button`
  padding: 8px;
  display: flex;
  align-items: center;

  font-size: 16px;
  border: 1px solid;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: lightblue;
  }
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 40px;
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 5px;

  & > div:first-child {
    margin-left: 30px;
  }

  & > div:last-child {
    margin-right: 80px;
  }
`;

const TableInfoList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  // width: 800px;
  height: 50px;

  margin-top: 5px;
  margin-bottom: 5px;

  cursor: pointer;

  & > div {
    onClick =>() = > {
      color: red;
    }
  }

  & > div:first-child {
    margin-left: 37px;
  }

  & > div:last-child {
    margin-right: 37px;
  }
`;

const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;

  text-align: center;

  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #eeeeee;

  min-height: 100px; /* 최소 높이를 300px로 설정 */
  max-height: 100%; /* 최대 높이 제한 해제 (선택 사항) */
  overflow-y: auto; /* 내용이 길 경우 스크롤 가능 */
`;

const AnswerContent = styled.div`
  padding: 15px;
  font-size: 16px;
  line-height: 1.5;
  color: #333; /* 글자 색 변경 */
  // background-color: white; /* 답변 배경색 */

  border-radius: 5px;

  min-height: 100px; /* 최소 높이를 300px로 설정 */
  max-height: 100%; /* 최대 높이 제한 해제 (선택 사항) */
  overflow-y: auto; /* 내용이 많을 경우 스크롤 표시 */
`;

const AnswerTextarea = styled.textarea`
  min-height: 150px;

  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: grey;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: lightblue;
  }
`;

const CancelButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: grey;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  background-color: pink;

  &:hover {
    background-color: lightblue;
  }
`;

const BoldText = styled.span`
  font-weight: bold;
`;

export default NoticeListMain;
