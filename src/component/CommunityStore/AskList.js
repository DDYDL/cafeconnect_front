import { ArrowLeftIcon, ArrowRightIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Input } from "@material-tailwind/react";
import axios from "axios";
import { useAtomValue } from "jotai/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { tokenAtom } from "../../atoms";
import { axiosInToken } from "../../config.js";
import { StyledButton } from "../styledcomponent/button.tsx";
import { CustomHorizontal } from "../styledcomponent/Horizin.style.js";
import * as h from "../styles/HStyledStore.tsx";
import * as s from "../styles/StyledStore.tsx";
import { ContentListDiv } from "../styles/StyledStore.tsx";

// todo 답변 저장 -> 해당 답변이 계속 보여지도록 해야함.
const AskList = () => {
  const [ask, setAsk] = useState([]);
  const [storeCode, setStoreCode] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null); // Track the selected item
  const [answers, setAnswers] = useState({}); // 항목별 답변을 저장하는 객체
  const [selectedAnswer, setSelectedAnswer] = useState(null); // 클릭한 항목의 답변을 저장하는
  const [filteredAsk, setFilteredAsk] = useState([]); // 필터링된 데이터 상태 추가상태
  const navigate = useNavigate(); // useNavigate 훅을 호출하여 navigate 함수 정의
  const token = useAtomValue(tokenAtom);
  const [isSearchActive, setIsSearchActive] = useState(false); // 검색 버튼 클릭 여부
  const [searchAsk, setSearchAsk] = useState("");

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const itemsPerPage = 10; // 한 페이지에 보여줄 항목 수

  const pageCount = Math.ceil(ask.length / itemsPerPage); // 총 페이지 수
  const pageBtn = Array.from({ length: pageCount }, (_, index) => index + 1); // 페이지 번호 배열 생성

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1); // 이전 페이지로 이동
    }
  };

  const handleNextPage = () => {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1); // 다음 페이지로 이동
    }
  };
  // const getFilteredAsk = () => {
  //   // 이 함수에서 바로 필터링이 아닌, handleSearch에서 필터링된 ask를 반환하도록 변경
  //   const filtered = ask.filter(a => a.askTitle.toLowerCase().includes(searchAsk.toLowerCase()));
  //   // 페이지에 맞는 데이터만 필터링
  //   const indexOfLastItem = currentPage * itemsPerPage;
  //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //   return filtered.slice(indexOfFirstItem, indexOfLastItem);
  // };

  const getFilteredAsk = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredAsk.slice(indexOfFirstItem, indexOfLastItem);
  };

  // useCallback 제거된 fetchStoreCode
  const fetchStoreCode = async () => {
    try {
      if (!token) return;
      const response = await axiosInToken(token).get("/store");
      const storeCodeFromResponse = response.data?.storeCode;
      setStoreCode(storeCodeFromResponse);
    } catch (err) {
      console.error("storeCode 요청 중 오류 발생:", err);
    }
  };

  // useCallback 제거된 fetchData
  const fetchData = async () => {
    if (!token || !storeCode) return;
    try {
      const response = await axiosInToken(token).get(`/askList/${storeCode}`);
      const formattedData = response.data.map(ask => ({
        ...ask,
        askDate: new Date(ask.askDate).toLocaleDateString("ko-KR"),
      }));
      setAsk(formattedData);
    } catch (err) {
      console.error("컴플레인 리스트 요청 중 오류 발생:", err);
    }
  };

  // useEffect는 그대로 유지
  useEffect(() => {
    fetchStoreCode();
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [token, storeCode]);

  const handleItemClick = async askNum => {
    if (selectedItem === askNum) {
      // 이미 선택된 항목을 다시 클릭하면 초기화
      setSelectedItem(null);
      setSelectedAnswer(null);
    } else {
      setSelectedItem(askNum);
      await fetchAnswerForSelectedItem(askNum); // 답변 가져오기
    }
  };

  // const handleSearch = () => {
  //   // 검색어가 비어 있지 않을 경우에만 필터링
  //   if (searchAsk.trim() !== "") {
  //     const filtered = ask.filter(a => a.askTitle.toLowerCase().includes(searchAsk.toLowerCase()));
  //     setFilteredAsk(filtered); // 필터링된 데이터 상태 업데이트
  //   } else {
  //     setFilteredAsk(ask); // 검색어가 비어 있으면 원래 데이터로 되돌리기
  //   }
  // };
  const handleSearch = () => {
    // 검색어가 비어 있지 않을 경우에만 필터링
    if (searchAsk.trim() !== "") {
      const filtered = ask.filter(a => a.askTitle.toLowerCase().includes(searchAsk.toLowerCase()));
      setFilteredAsk(filtered); // 필터링된 데이터 상태 업데이트
      setCurrentPage(1); // 검색 후 페이지를 1로 초기화
    } else {
      setFilteredAsk(ask); // 검색어가 비어 있으면 원래 데이터로 되돌리기
      setCurrentPage(1); // 검색 후 페이지를 1로 초기화
    }
  };

  // Enter 키로 검색
  const handleKeyDown = e => {
    if (e.key === "Enter") {
      handleSearch(); // Enter 키가 눌렸을 때 검색 실행
    }
  };

  const askWrite = () => {
    navigate("/askWrite");
  };

  const onChangeAsk = e => {
    setSearchAsk(e.target.value);
  };

  const fetchAnswerForSelectedItem = async askNum => {
    try {
      if (!storeCode) return;
      const response = await axios.get(
        `http://localhost:8080/askDetailStore/${storeCode}/getAnswer/${askNum}`
      );
      console.log("response data:", response.data); // 응답 데이터 확인

      const answer = response.data.askAnswer; // 서버에서 받은 답변
      setAnswers(prev => {
        console.log("Previous answers:", prev); // 상태 업데이트 전 로그
        const updatedAnswers = { ...prev, [askNum]: answer };
        console.log("Updated answers:", updatedAnswers); // 업데이트된 상태 로그
        return updatedAnswers;
      });
    } catch (err) {
      console.error("답변 요청 중 오류 발생:", err);
    }
  };

  // 검색 버튼 클릭 핸들러
  const onSearchClick = () => {
    // setIsSearchActive(true);
    handleSearch();
  };

  // 데이터 fetching 함수들 (생략)
  useEffect(() => {
    // fetchData() 호출해서 ask 데이터를 가져올 때 필터링된 상태를 초기화
    setFilteredAsk(ask); // 초기 데이터를 filteredAsk에 저장
  }, [ask]);

  // 리스트를 불러오는 함수
  const fetchAskList = async () => {
    try {
      if (!storeCode) return; // storeCode가 없는 경우 요청을 하지 않음
      const response = await axios.get(`http://localhost:8080/askList/${storeCode}/`);
      setAsk(response.data); // ask 리스트를 상태에 저장
    } catch (err) {
      console.error("리스트 불러오기 오류:", err);
    }
  };

  useEffect(() => {
    fetchAskList(); // 컴포넌트가 처음 렌더링될 때 ask 리스트를 불러옴
  }, [storeCode]);

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  return (
    <ContentListDiv>
      <HeadingContainer>
        <Heading>1:1 문의</Heading>
      </HeadingContainer>

      <HeadingContainer1>
        <StyledButton size="md" theme="brown" onClick={askWrite} style={{ marginTop: "30px" }}>
          글 작성
        </StyledButton>

        <s.ButtonDiv width="200px" float="right">
          <s.SearchDiv width="200px">
            <Input
              value={searchAsk}
              onChange={e => setSearchAsk(e.target.value)} // 검색어 입력시 상태 업데이트
              onKeyDown={handleKeyDown}
            />
            <MagnifyingGlassIcon
              className="h-5 w-5"
              style={searchIconStyle}
              onClick={onSearchClick} // 아이콘 클릭 시 검색 실행
            />
          </s.SearchDiv>
        </s.ButtonDiv>
      </HeadingContainer1>

      <CustomHorizontal width="basic" bg="black" />

      <TableHeader>
        <div>번호</div>
        <div>제목</div>
        <div>작성일</div>
        <div>답변 상태</div>
      </TableHeader>

      <CustomHorizontal width="basic" bg="black" />

      {/* 조건부 렌더링 */}
      <div>
        {getFilteredAsk().length > 0 ? (
          getFilteredAsk().map((a, index) => (
            <React.Fragment key={a.askNum}>
              <TableInfoList onClick={() => handleItemClick(a.askNum)} key={a.askNum}>
                <div>{(currentPage - 1) * itemsPerPage + index + 1}</div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "left",
                    width: "440px",
                    marginLeft: "80px",
                    paddingLeft: "130px",
                  }}
                >
                  <span style={{ color: "red", marginRight: "5px" }}>[{a.askType}]</span>
                  {a.askTitle}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "150px",
                    paddingLeft: "40px",
                  }}
                >
                  {new Date(a.askDate).toLocaleDateString()}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "140px",
                    paddingLeft: "50px",
                    paddingTop: "40px",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <h.TableTextTd
                    width="130px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {a.askStatus === "answered" ? (
                      <h.StatusTextTrue>답변완료</h.StatusTextTrue>
                    ) : (
                      <h.StatusTextFalse>미답변</h.StatusTextFalse>
                    )}
                  </h.TableTextTd>
                </div>
              </TableInfoList>

              {/* 선택된 항목인 경우 문의 상세와 본사 답변 렌더링 */}
              {selectedItem === a.askNum && (
                <React.Fragment>
                  <DetailContainer>
                    <h2
                      style={{
                        display: "flex",
                        justifyContent: "left",
                        paddingTop: "10px",
                        paddingLeft: "20px",
                        fontSize: "20px",
                      }}
                    >
                      문의 상세
                    </h2>
                    <AnswerContent
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        padding: "20px",
                        textAlign: "left",
                      }}
                      readOnly
                    >
                      {a.askContent || "문의 내용이 없습니다."}
                    </AnswerContent>
                  </DetailContainer>

                  <DetailContainer1>
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
                  </DetailContainer1>
                </React.Fragment>
              )}
            </React.Fragment>
          ))
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
              fontSize: "16px",
              color: "#555",
            }}
          >
            검색 결과가 없습니다.
          </div>
        )}
      </div>

      <s.ButtonGroupStyle variant="outlined" style={{ paddingTop: "40px", paddingLeft: "380px" }}>
        <s.IconButtonStyle
          onClick={handlePrevPage}
          style={{
            backgroundColor: "transparent",
            color: "black",
          }}
        >
          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
        </s.IconButtonStyle>

        {pageBtn.map(page => (
          <s.IconButtonStyle
            key={page}
            onClick={() => handlePageChange(page)}
            style={{
              color: "black",
              backgroundColor: page === currentPage ? "white" : "transparent",
            }}
          >
            {page}
          </s.IconButtonStyle>
        ))}

        <s.IconButtonStyle
          onClick={handleNextPage}
          style={{ backgroundColor: "transparent", color: "black" }}
        >
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </s.IconButtonStyle>
      </s.ButtonGroupStyle>
    </ContentListDiv>
  );
};

const searchIconStyle = {
  position: "absolute",
  right: "10px",
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer",
  color: "#333",
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

  & > div:nth-child(2) {
    display: flex;
    justify-content: center;
    margin-left: 120px;
    width: 240px;
  }

  & > div:nth-child(3) {
    display: flex;
    justify-content: center;
    width: 100px;
    margin-left: 60px; /* 간격을 줄임 */
  }

  & > div:last-child {
    margin-right: 50px;
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

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;

  text-align: center;

  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #ffffff;

  min-height: 100px; /* 최소 높이를 300px로 설정 */
  max-height: 100%; /* 최대 높이 제한 해제 (선택 사항) */
  overflow-y: auto; /* 내용이 길 경우 스크롤 가능 */
`;

const DetailContainer1 = styled.div`
  display: flex;
  flex-direction: column;

  text-align: center;

  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fafafa;
  font-weight: bold;

  min-height: 100px; /* 최소 높이를 300px로 설정 */
  max-height: 100%; /* 최대 높이 제한 해제 (선택 사항) */
  overflow-y: auto; /* 내용이 길 경우 스크롤 가능 */
`;

const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;

  text-align: center;

  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: #ffffff;

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

export default AskList;
