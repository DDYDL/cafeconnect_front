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

const ComplainList = () => {
  const [complain, setComplain] = useState([]);
  const [storeCode, setStoreCode] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const [searchComplain, setSearchComplain] = useState("");
  const navigate = useNavigate();
  const token = useAtomValue(tokenAtom);
  const buttonLabels = ["1주일", "1개월", "3개월"];
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const itemsPerPage = 10; // 한 페이지에 보여줄 항목 수

  const pageCount = Math.ceil(complain.length / itemsPerPage); // 총 페이지 수
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

  useEffect(() => {}, []);

  const fetchData = useCallback(async () => {
    if (!token || !storeCode) return; // 토큰 또는 storeCode가 없는 경우 요청 생략
    try {
      const response = await axiosInToken(token).get(`/complainListStore/${storeCode}`);
      const formattedData = response.data.map(item => ({
        ...item,
        complainDate: new Date(item.complainDate).toLocaleDateString("ko-KR"),
      }));
      setComplain(formattedData);
    } catch (err) {
      console.error("컴플레인 리스트 요청 중 오류 발생:", err);
      alert("데이터를 불러오는 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  }, [token, storeCode]); // token, storeCode를 의존성 배열에 추가

  useEffect(() => {
    fetchData();
  }, [fetchData]); // fetchData를 의존성 배열에 추가

  const handleSearch = () => {
    if (searchComplain.trim() === "") {
      // 검색어가 비어있으면 전체 complain 목록으로 되돌리기
      fetchData(); // fetchData 함수는 전체 데이터를 다시 가져오는 함수입니다.
    } else {
      // 검색어가 있을 경우, complain 리스트 필터링
      const filteredComplains = complain.filter(
        c => c.complainTitle.toLowerCase().includes(searchComplain.toLowerCase()) // 대소문자 구분 없이 검색
      );

      setComplain(filteredComplains); // 필터링된 complain 리스트 상태로 업데이트
    }
  };

  // Enter 키로 검색
  const handleKeyDown = e => {
    if (e.key === "Enter") {
      handleSearch(); // Enter 키가 눌렸을 때 검색 실행
    }
  };

  // 기간 필터링
  const filterComplainsByPeriod = period => {
    const currentDate = new Date();
    let periodStartDate;

    switch (period) {
      case "1주일":
        periodStartDate = new Date(currentDate.setDate(currentDate.getDate() - 7));
        break;
      case "1개월":
        periodStartDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
        break;
      case "3개월":
        periodStartDate = new Date(currentDate.setMonth(currentDate.getMonth() - 3));
        break;
      default:
        periodStartDate = new Date(0);
    }

    return complain.filter(c => new Date(c.complainDate) >= periodStartDate);
  };

  // 검색 및 기간 필터링을 적용한 컴플레인 리스트를 반환
  const getFilteredComplains = () => {
    let filtered = complain;

    // 검색 필터링
    if (searchComplain.trim() !== "") {
      filtered = filtered.filter(c =>
        c.complainTitle.toLowerCase().includes(searchComplain.toLowerCase())
      );
    }

    // 기간 필터링
    if (selectedButton !== null) {
      filtered = filterComplainsByPeriod(buttonLabels[selectedButton]);
    }

    // 페이지네이션 적용
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filtered.slice(indexOfFirstItem, indexOfLastItem);
  };

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const handleButtonClick = index => {
    setSelectedButton(selectedButton === index ? null : index);
  };

  const handleItemClick = complainNum => {
    navigate(`/complainDetailStore/${complainNum}`);
  };

  return (
    <ContentListDiv>
      <HeadingContainer>
        <Heading>컴플레인 공지</Heading>
      </HeadingContainer>

      <HeadingContainer1>
        <div style={{ display: "flex", gap: "2px" }}>
          {buttonLabels.map((label, index) => (
            <PeriodButton
              key={index}
              isSelected={selectedButton === index}
              onClick={() => handleButtonClick(index)}
            >
              {label}
            </PeriodButton>
          ))}
        </div>
        <s.ButtonDiv width="200px" float="right">
          <s.SearchDiv width="200px">
            <Input
              name="search"
              label="제목 검색"
              value={searchComplain}
              onChange={e => setSearchComplain(e.target.value)}
              onKeyDown={handleKeyDown} // Enter 키 눌렸을 때 handleSearch 실행
            />
            {/* <MagnifyingGlassIcon className="h-5 w-5" style={searchIconStyle} /> */}
            <MagnifyingGlassIcon
              className="h-5 w-5"
              style={searchIconStyle}
              onClick={handleSearch} // 아이콘 클릭 시 검색 함수 실행
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
          getFilteredComplains().map((c, index) => (
            <TableInfoList onClick={() => handleItemClick(c.complainNum)} key={c.complainNum}>
              {/* <div>{index + 1}</div> */}
              <div style={{ paddingLeft: "30px" }}>
                {(currentPage - 1) * itemsPerPage + index + 1}
              </div>{" "}
              <div style={{ paddingLeft: "20px" }}>{c.complainTitle}</div>
              <div style={{ paddingRight: "20px" }}>{c.complainDate}</div>
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
          // ) : (
          //   <div
          //     style={{
          //       display: "flex", // flexbox 사용
          //       justifyContent: "center", // 수평 가운데 정렬
          //       alignItems: "center", // 수직 가운데 정렬
          //       height: "200px", // 적절한 높이 설정 (화면 중앙에 맞추고 싶다면 부모 컨테이너의 높이도 설정 필요)
          //       fontSize: "16px", // 텍스트 크기 설정
          //       color: "#555", // 텍스트 색상 설정
          //     }}
          //   >
          //     검색 결과가 없습니다.
          //   </div>
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

const NoResults = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 15px;
  color: grey;
`;

const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-bottom: 20px;
`;

const HeadingContainer1 = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  text-align: center;
  gap: 10px;
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

const PeriodButton = styled.button`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;

  width: 60px;
  height: 40px;
  margin-top: 30px;

  background-color: ${props => (props.isSelected ? "lightgreen" : "white")};
  font-size: 16px;
  border: ${props => (props.isSelected ? "2px solid grey" : "1px solid #ddd")};
  border-radius: 5px;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  // width: 800px;
  display: flex;
  align-items: center;
  justify-content: right;
  gap: 10px;
  margin-left: 20px;
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

  height: 50px;
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 5px;
  padding-left: 28px;

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
  background-color: #f9f9f9;
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

const BoldText = styled.span`
  font-weight: bold;
`;

export default ComplainList;
