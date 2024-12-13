import { ArrowLeftIcon, ArrowRightIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Input } from "@material-tailwind/react";
import { useAtom, useAtomValue } from "jotai/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { memberAtom, tokenAtom } from "../../atoms";
import { axiosInToken } from "../../config.js";
import { CustomHorizontal } from "../styledcomponent/Horizin.style.js";
import * as s from "../styles/StyledStore.tsx";
import { ContentListDiv } from "../styles/StyledStore.tsx";

// 공지사항 리스트(가맹점)
const NoticeList = () => {
  // const [storeCode, setStoreCode] = useState(null);
  const [notice, setNotice] = useState([]);
  const [orderNotice, setOrderNotice] = useState([]);
  const navigate = useNavigate();
  const [searchNotice, setSearchNotice] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const itemsPerPage = 10; // 한 페이지에 보여줄 항목 수
  const store = useAtomValue(memberAtom);
  const [token, setToken] = useAtom(tokenAtom);

  const pageCount = Math.ceil(notice.length / itemsPerPage); // 총 페이지 수
  const pageBtn = Array.from({ length: pageCount }, (_, index) => index + 1); // 페이지 번호 배열 생성
  const storeCode = store.storeCode;

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

  const fetchData = () => {
    axiosInToken(token)
      .get(`http://localhost:8080/noticeList`)
      .then(res => {
        if (res.headers.authorization != null) {
          setToken(res.headers.authorization);
        }
        const noticeData = res.data;
        console.log("noticeData" + JSON.stringify(noticeData));

        // 데이터가 배열인지 확인 후 처리
        if (Array.isArray(noticeData)) {
          setNotice(noticeData);
        } else {
          console.error("API 응답이 배열이 아닙니다:", noticeData);
          setNotice([]);
        }
      })
      .catch(error => {
        console.error("데이터 요청 오류:", error);
        setNotice([]); // 오류 발생 시 빈 배열로 초기화
      });
  };
  useEffect(() => {
    if (token != null && token !== "") fetchData();
  }, [token]);

  const handleItemClick = noticeNum => {
    navigate(`/noticeDetail/${noticeNum}`);
  };

  const handleSearch = () => {
    if (searchNotice.trim() === "") {
      fetchData();
    } else {
      const filteredNoticeList = notice.filter(a =>
        a.noticeTitle.toLowerCase().includes(searchNotice.toLowerCase())
      );
      setNotice(filteredNoticeList);
    }
  };

  // 등록순으로 오름차순
  useEffect(() => {
    if (notice) {
      const sortedData = [...notice].sort(
        (a, b) => new Date(b.noticeDate) - new Date(a.noticeDate)
      );
      setOrderNotice(sortedData);
    }
  }, [notice]);

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const getFilteredNoticeList = () => {
    // 페이지에 맞는 데이터만 필터링
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return orderNotice.slice(indexOfFirstItem, indexOfLastItem);
  };

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(notice.length / itemsPerPage); // 총 페이지 수 계산

  return (
    <div style={{ maxHeight: "1200px", overflowY: "auto" }}>
      <ContentListDiv>
        <HeadingContainer>
          <Heading>공지사항</Heading>
        </HeadingContainer>
        <HeadingContainer1>
          <s.ButtonDiv width="200px" float="right">
            <s.SearchDiv width="200px">
              <Input
                name="search"
                label="제목 검색"
                value={searchNotice}
                onChange={e => setSearchNotice(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <MagnifyingGlassIcon
                className="h-5 w-5"
                style={searchIconStyle}
                onClick={handleSearch}
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

        <div>
          {getFilteredNoticeList().length > 0 ? (
            getFilteredNoticeList().map((n, index) => (
              <TableInfoList onClick={() => handleItemClick(n.noticeNum)} key={n.noticeNum}>
                <div style={{ paddingLeft: "30px", width: "80px" }}>
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </div>{" "}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "left",
                    textAlign: "left",
                    alignItems: "left",
                    width: "440px",
                    paddingLeft: "100px",
                    paddingTop: "10px",
                  }}
                >
                  <span
                    style={{ fontWeight: "bold", color: n.noticeType === "주요" ? "red" : "black" }}
                  >
                    [&nbsp;{n.noticeType}&nbsp;]
                  </span>
                  &nbsp;&nbsp;
                  {n.noticeTitle}
                </div>
                <div
                  style={{
                    paddingRight: "20px",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  {new Date(n.noticeDate).toLocaleDateString()}
                </div>
              </TableInfoList>
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

        <CustomHorizontal width="basic" bg="grey" />

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
    </div>
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
  justify-content: right;
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
  justify-content: space-between;
  align-items: center;
  height: 50px;
  font-weight: bold;
  padding-left: 20px;
  padding-right: 40px;
`;

const TableInfoList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  margin-bottom: 5px;
  cursor: pointer;
`;

export default NoticeList;
