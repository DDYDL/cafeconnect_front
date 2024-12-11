import { ArrowLeftIcon, ArrowRightIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Input } from "@material-tailwind/react";
import { useAtomValue } from "jotai/react";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { tokenAtom } from "../../atoms";
import { axiosInToken } from "../../config.js";
import { CustomHorizontal } from "../styledcomponent/Horizin.style.js";
import * as s from "../styles/StyledStore.tsx";
import { ContentListDiv } from "../styles/StyledStore.tsx";

// 공지사항 리스트(가맹점)
const NoticeList = () => {
  const [storeCode, setStoreCode] = useState(null);
  const [notice, setNotice] = useState([]);
  const token = useAtomValue(tokenAtom);
  const navigate = useNavigate();
  const [searchNotice, setSearchNotice] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const itemsPerPage = 10; // 한 페이지에 보여줄 항목 수

  const pageCount = Math.ceil(notice.length / itemsPerPage); // 총 페이지 수
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

  const fetchStoreCode = useCallback(async () => {
    try {
      if (!token) return;
      const response = await axiosInToken(token).get("/store");
      const storeCodeFromResponse = response.data?.storeCode;
      setStoreCode(storeCodeFromResponse);
    } catch (err) {
      console.error("storeCode 요청 중 오류 발생:", err);
    }
  }, [token]);

  useEffect(() => {
    fetchStoreCode();
  }, [fetchStoreCode]);

  const fetchData = useCallback(async () => {
    if (!token || !storeCode) return;
    try {
      const response = await axiosInToken(token).get(`/noticeList`);
      const formattedData = response.data.map(item => ({
        ...item,
        noticeDate: new Date(item.noticeDate).toLocaleDateString("ko-KR"),
      }));
      setNotice(formattedData);
    } catch (err) {
      console.error("컴플레인 리스트 요청 중 오류 발생:", err);
      alert("데이터를 불러오는 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  }, [token, storeCode]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const getFilteredComplains = () => {
    const filtered = notice.filter(n =>
      n.noticeTitle.toLowerCase().includes(searchNotice.toLowerCase())
    );
    // 페이지에 맞는 데이터만 필터링
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filtered.slice(indexOfFirstItem, indexOfLastItem);
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
          {getFilteredComplains().length > 0 ? (
            getFilteredComplains().map((n, index) => (
              <TableInfoList onClick={() => handleItemClick(n.noticeNum)} key={n.noticeNum}>
                <div style={{ paddingLeft: "30px" }}>
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
                  <span style={{ color: n.noticeType === "주요" ? "red" : "black"}}>
                    [&nbsp;{n.noticeType}&nbsp;]
                  </span>&nbsp;&nbsp;
                  {/* {" "} */}
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
                  {n.noticeDate}
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
