import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CustomButton } from "../Button/Button.style.js";
import { CustomHorizontal } from "../Horizin/Horizin.style.js";

const AskList = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedItem, setSelectedItem] = useState(null); // Track the selected item
  const [answers, setAnswers] = useState({}); // 항목별 답변을 저장하는 객체
  const [searchQuery, setSearchQuery] = useState(""); // 검색 요청 시, 사용
  const [searchResults, setSearchResults] = useState([]); // 검색 결과를 저장하는 상태
  const navigate = useNavigate(); // useNavigate 훅을 호출하여 navigate 함수 정의

  const handleItemClick = id => {
    setSelectedItem(selectedItem === id ? null : id); // Toggle answer form visibility
  };

  const askWrite = () => {
    navigate("/community/askWrite");
  };

  const handleChange = (id, value) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [id]: value, // 해당 id에 대한 답변 업데이트
    }));
  };

  // 검색어 입력 시 상태 업데이트
  const handleSearchChange = e => {
    setSearchQuery(e.target.value);
  };

  // 검색 버튼 클릭 시 백엔드로 검색 요청
  const handleSearch = () => {
    fetch(`http://localhost:8080/AskList/search?query=${searchQuery}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log("검색 결과:", data);
        // 결과 처리
      })
      .catch(error => console.error("검색 오류:", error));
  };

  const handleSubmit = (id, event) => {
    event.preventDefault();

    const newNotice = {
      type: "주요 공지사항",
      title,
      content,
      date: new Date().toISOString(),
    };

    // 만약 답변을 저장하는 로직이 있다면 해당 로직에 맞춰 데이터를 저장
    // 예시: id에 해당하는 답변도 함께 저장
    // 각 항목에 대한 답변을 저장하는 로직
    console.log("Saving answer for item", id, "with content:", answers[id]);

    fetch("https://www.localhost:8080/AskList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNotice),
    })
      .then(response => response.json())
      .then(data => {
        console.log("Ask added:", data);
        setTitle("");
        setContent("");
      })
      .catch(error => console.error("Error posting notice:", error));
  };

  return (
    <Wrapper>
      <HeadingContainer>
        <Heading>1:1 문의</Heading>
        <Navigation>
          <span>홈 / 커뮤니티</span>
          <span> / </span>
          <BoldText>1:1 문의</BoldText>
        </Navigation>
      </HeadingContainer>

      <HeadingContainer1>
        <CustomButton background onClick={askWrite}>
          글 작성
        </CustomButton>

        <SearchContainer>
          <SearchTitle>제목</SearchTitle>
          <SearchInput placeholder="검색어를 입력하세요" />
          <SearchButton>찾기</SearchButton>
        </SearchContainer>
      </HeadingContainer1>

      <CustomHorizontal width="basic" bg="black" />

      <TableHeader>
        <div>번호</div>
        <div>제목</div>
        <div>작성일</div>
      </TableHeader>

      <CustomHorizontal width="basic" bg="black" />

      {/* // 백엔드 작업하고, 아래의 map부분 바꾸기 */}
      {/* 검색 결과가 있을 경우 해당 결과를 렌더링
      {searchResults.length > 0 ? (
        searchResults.map((item) => (
          <div key={item.id}>
            <TableInfoList onClick={() => handleItemClick(item.id)}>
              <div>{item.id}</div>
              <div>{item.title}</div>
              <div>{item.date}</div>
            </TableInfoList> */}

      {[1, 2, 3, 4, 5].map(id => (
        <div key={id}>
          <TableInfoList onClick={() => handleItemClick(id)}>
            <div>{id}</div>
            <div>[주요 공지사항] 더치원액 팩 1000ml 액상 (브라질산으로 변경됨)</div>
            <div>2024-10-11 13:49:46</div>
          </TableInfoList>

          <CustomHorizontal width="basic" bg="grey" />
          {selectedItem === id && (
            <AnswerContainer>
              <h4>답변 작성</h4>
              <AnswerTextarea
                value={answers[id] || ""}
                onChange={e => handleChange(id, e.target.value)}
                placeholder="답변을 작성하세요"
              />
              <SubmitButton onClick={e => handleSubmit(id, e)}>답변 저장</SubmitButton>
            </AnswerContainer>
          )}
        </div>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;

  margin-top: 120px;
  box-sizing: border-box;

  position: relative;
`;

const HeadingContainer = styled.div`
  width: 800px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-bottom: 38px;
`;

const HeadingContainer1 = styled.div`
  width: 800px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const Heading = styled.h2`
  font-size: 24px;
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

  width: 800px;
  height: 50px;
  font-weight: bold;

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

  width: 800px;
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

export default AskList;
