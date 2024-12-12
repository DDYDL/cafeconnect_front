import { ArrowLeftIcon, ArrowRightIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Input } from "@material-tailwind/react";
import { useAtom, useAtomValue } from "jotai/react";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { memberAtom, tokenAtom } from "../../atoms";
import { axiosInToken } from "../../config.js";
import { StyledButton } from "../styledcomponent/button.tsx";
import { CustomHorizontal } from "../styledcomponent/Horizin.style.js";
import * as h from "../styles/HStyledStore.tsx";
import * as s from "../styles/StyledStore.tsx";
import { ContentListDiv } from "../styles/StyledStore.tsx";

// 공지사항 리스트(가맹점)
const AskList = () => {
  const [ask, setAsk] = useState([]);
  const navigate = useNavigate();
  const [searchAsk, setSearchAsk] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const itemsPerPage = 10; // 한 페이지에 보여줄 항목 수
  const pageCount = Math.ceil(ask.length / itemsPerPage); // 총 페이지 수
  const pageBtn = Array.from({ length: pageCount }, (_, index) => index + 1); // 페이지 번호 배열 생성
  const [selectedItem, setSelectedItem] = useState(null); // Track the selected item
  const [orderAsk, setOrderAsk] = useState([]);

  const store = useAtomValue(memberAtom);
  const storeCode = store.storeCode;

  const { noticeNum } = useParams();
  const [token, setToken] = useAtom(tokenAtom);

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

  const fetchStoreCode = useCallback(async () => {
    try {
      if (!token) return;
      const response = await axiosInToken(token).get("/store");
      const storeCodeFromResponse = response.data?.storeCode;
      // setStoreCode(storeCodeFromResponse);
    } catch (err) {
      console.error("storeCode 요청 중 오류 발생:", err);
    }
  }, [token]);

  useEffect(() => {
    fetchStoreCode();
  }, [fetchStoreCode]);

  useEffect(() => {
    if (token != null && token !== "") fetchData();
  }, [token]);

  const fetchData = () => {
    axiosInToken(token)
      .get(`http://localhost:8080/askList/${storeCode}`)
      .then(res => {
        if (res.headers.authorization != null) {
          setToken(res.headers.authorization);
        }

        const askData = res.data;

        console.log("askData" + JSON.stringify(askData));
        // complainDate를 한국식 날짜 형식으로 변환
        const formattedDate = new Date(askData.askDate).toLocaleDateString("ko-KR");

        // 데이터가 배열인지 확인 후 처리
        if (Array.isArray(askData)) {
          setAsk(askData);
        } else {
          console.error("API 응답이 배열이 아닙니다:", askData);
          setAsk([]);
        }
      })
      .catch(error => {
        console.error("데이터 요청 오류:", error);
        setAsk([]); // 오류 발생 시 빈 배열로 초기화
      });
  };

  const handleItemClick = askNum => {
    setSelectedItem(prevItem => (prevItem === askNum ? null : askNum));
    // navigate(`/askDetail/${askNum}`);
  };

  const askWrite = () => {
    navigate("/askWrite");
  };

  const handleSearch = () => {
    if (searchAsk.trim() === "") {
      fetchData();
    } else {
      const filteredAskList = ask.filter(a =>
        a.askTitle.toLowerCase().includes(searchAsk.toLowerCase())
      );
      setAsk(filteredAskList);
    }
  };

  // 등록순으로 오름차순
  useEffect(() => {
    if (ask) {
      const sortedData = [...ask].sort((a, b) => b.askDate - a.askDate);
      setOrderAsk(sortedData);
    }
  }, [ask]);

  const onSearchClick = () => {
    // setIsSearchActive(true);
    handleSearch();
  };

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const getFilteredAskList = () => {
    // const filtered = ask.filter(a => a.askTitle.toLowerCase().includes(searchAsk.toLowerCase()));
    // 페이지에 맞는 데이터만 필터링
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return orderAsk.slice(indexOfFirstItem, indexOfLastItem);
  };

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };
  const getFilteredAsk = () => {
    const filtered = ask.filter(a => a.askTitle.toLowerCase().includes(searchAsk.toLowerCase()));

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    return filtered.slice(indexOfFirstItem, indexOfLastItem);
  };

  const totalPages = Math.ceil(ask.length / itemsPerPage); // 총 페이지 수 계산

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
              label="검색어를 입력하세요"
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
        {getFilteredAskList().length > 0 ? (
          getFilteredAskList().map((a, index) => (
            <React.Fragment key={a.askNum}>
              <TableInfoList
                style={{ paddingTop: "20px" }}
                onClick={() => handleItemClick(a.askNum)}
                key={a.askNum}
              >
                <div style={{ paddingLeft: "30px" }}>
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "left",
                    width: "440px",
                    marginLeft: "80px",
                    paddingLeft: "180px",
                  }}
                >
                  <span style={{ color: "red", marginRight: "5px" }}>[{a.askType}]</span>
                  {a.askTitle}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "160px",
                    marginLeft: "80px",
                    paddingLeft: "50px",
                  }}
                >
                  {new Date(a.askDate).toLocaleDateString()}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "140px",
                    // paddingLeft: "50px",
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
                    <h3
                      style={{
                        display: "flex",
                        justifyContent: "left",
                        paddingTop: "10px",
                        paddingLeft: "20px",
                        fontSize: "20px",
                      }}
                    >
                      문의 상세
                    </h3>
                    <AnswerContent
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        padding: "20px",
                        textAlign: "left",
                        fontSize: "14px",
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
                        fontSize: "14px",
                      }}
                      readOnly
                    >
                      {a.askAnswer || "아직 답변이 작성되지 않았습니다."}
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

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  font-weight: bold;
  padding-left: 20px;
  padding-right: 40px;

  /* 각 필드 간격 및 위치 조정 */
  & > div:nth-child(1) {
    flex: 1; /* 번호 */
    text-align: left;
  }
  & > div:nth-child(2) {
    flex: 3; /* 제목 */
    text-align: center;
  }
  & > div:nth-child(3),
  & > div:nth-child(4) {
    flex: 1; /* 작성일과 답변 상태 */
    text-align: right;
  }

  & > div:nth-child(3) {
    margin-left: auto; /* 작성일을 오른쪽으로 이동 */
  }
`;

const TableInfoList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  margin-bottom: 5px;
  cursor: pointer;
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

export default AskList;
