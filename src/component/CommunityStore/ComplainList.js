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

const ComplainList = () => {
  const [complain, setComplain] = useState([]);
  const [orderComplain, setOrderComplain] = useState([]);
  const [selectedButton, setSelectedButton] = useState(null);
  const [searchComplain, setSearchComplain] = useState("");
  const navigate = useNavigate();
  const buttonLabels = ["1주일", "1개월", "3개월"];
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const itemsPerPage = 10; // 한 페이지에 보여줄 항목 수
  const store = useAtomValue(memberAtom);
  const [token, setToken] = useAtom(tokenAtom);
  const [complainData, setComplainData] = useState([]);

  const pageCount = Math.ceil(complain.length / itemsPerPage); // 총 페이지 수
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

  useEffect(() => {}, []);

  const fetchData = () => {
    axiosInToken(token)
      .get(`http://localhost:8080/complainListStore/${storeCode}`)
      .then(res => {
        if (res.headers.authorization != null) {
          setToken(res.headers.authorization);
        }
        const complainData = res.data;
        console.log("complainData: " + JSON.stringify(complainData));

        // 데이터가 배열인지 확인 후 처리
        if (Array.isArray(complainData)) {
          // 작성일 기준 내림차순 정렬
          const sortedData = complainData.sort(
            (a, b) => new Date(a.complainDate) - new Date(b.complainDate)
          );
          setComplain(sortedData); // 정렬된 데이터를 상태로 설정
          setComplainData(sortedData); // 검색과 필터링에 사용할 데이터도 동일하게 설정
        } else {
          console.error("API 응답이 배열이 아닙니다:", complainData);
          setComplain([]);
        }
      })
      .catch(error => {
        console.error("데이터 요청 오류:", error);
        setComplain([]); // 오류 발생 시 빈 배열로 초기화
      });
  };

  useEffect(() => {
    if (token != null && token !== "") fetchData();
  }, [token]);

  const handleSearch = () => {
    if (searchComplain.trim() === "") {
      fetchData();
    } else {
      const filteredComplainList = complain.filter(
        c => c.complainTitle.toLowerCase().includes(searchComplain.toLowerCase()) //
      );
      setComplain(filteredComplainList);
    }
  };

  // 등록순으로 오름차순
  useEffect(() => {
    if (complain) {
      const sortedData = [...complain].sort((a, b) => b.complainDate - a.complainDate);
      console.log("sortedDate" + JSON.stringify(sortedData));
      setOrderComplain(sortedData);
    }
  }, [complain]);

  // Enter 키로 검색
  const handleKeyDown = e => {
    if (e.key === "Enter") {
      handleSearch(); // Enter 키가 눌렸을 때 검색 실행
    }
  };

  // 기간 필터링
  const getPeriodStartDate = period => {
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

    return periodStartDate;
  };

  // 검색 및 기간 필터링을 적용한 컴플레인 리스트를 반환
  const getFilteredComplains = () => {
    let filtered = complainData;

    // Search filtering
    if (searchComplain.trim() !== "") {
      filtered = filtered.filter(c =>
        c.complainTitle.toLowerCase().includes(searchComplain.toLowerCase())
      );
    }

    // Period filtering
    if (selectedButton !== null) {
      const periodStartDate = getPeriodStartDate(buttonLabels[selectedButton]); // 버튼에 따라 시작 날짜 계산
      filtered = filtered.filter(c => new Date(c.complainDate) >= periodStartDate); // 조건에 맞는 데이터만 필터링
    }

    // Sort by date (ascending)
    filtered.sort((a, b) => new Date(b.complainDate) - new Date(a.complainDate));

    // 페이지네이션 적용
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filtered.slice(indexOfFirstItem, indexOfLastItem); // 필터링된 데이터를 페이지 단위로 반환
  };

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  // const handleButtonClick = index => {
  //   setSelectedButton(selectedButton === index ? null : index);
  // };

  const handleButtonClick = index => {
    setSelectedButton(index);
    setCurrentPage(1); // 페이지를 첫 번째로 초기화
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
              <div style={{ paddingLeft: "30px" }}>
                {(currentPage - 1) * itemsPerPage + index + 1}
              </div>{" "}
              <div style={{ paddingLeft: "20px" }}>{c.complainTitle}</div>
              <div style={{ paddingRight: "20px" }}>
                {new Date(c.complainDate).toLocaleDateString()}
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

const PeriodButton = styled.button`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;

  width: 60px;
  height: 40px;
  margin-top: 30px;

  background-color: ${props => (props.isSelected ? "#CECEF6" : "white")};
  font-size: 16px;
  border: ${props => (props.isSelected ? "2px solid grey" : "1px solid #ddd")};
  border-radius: 5px;
  cursor: pointer;
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

export default ComplainList;
