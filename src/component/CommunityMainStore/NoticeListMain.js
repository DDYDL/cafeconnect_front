import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Input } from "@material-tailwind/react";
import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { StyledButton } from "../styledcomponent/button.tsx";
import { CustomHorizontal } from "../styledcomponent/Horizin.style.js";
import * as s from "../styles/StyledStore.tsx";
import { ContentListDiv } from "../styles/StyledStore.tsx";
import {axiosInToken} from "../../config";
import {useAtomValue} from "jotai/react";
import {tokenAtom} from "../../atoms";

const NoticeListMain = () => {
  const [notice, setNotice] = useState([]);
  const token = useAtomValue(tokenAtom);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedItem, setSelectedItem] = useState(null); // Track the selected item
  const [answers, setAnswers] = useState({}); // 항목별 답변을 저장하는 객체
  const [searchQuery, setSearchQuery] = useState(""); // 검색 요청 시, 사용
  const [searchResults, setSearchResults] = useState([]); // 검색 결과를 저장하는 상태

  const [selectedButton, setSelectedButton] = useState(null);

  const navigate = useNavigate(); // useNavigate 훅을 호출하여 navigate 함수 정의

  const handleItemClick = id => {
    setSelectedItem(selectedItem === id ? null : id); // Toggle answer form visibility
    navigate(`/noticeDetailMain/${id}`);
  };

  const handleButtonClick = buttonId => {
    setSelectedButton(buttonId);
  };

  // 공지사항 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchData = () => {
      axiosInToken(token).get('noticeListMain')
          .then(res=> {
            console.log(res.data)
            setNotice([...res.data]);
          })
          .catch(err=>{
            console.log(err);
          })
    };
    // if(token!=null && token!=='') fetchData();
    fetchData();
  }, [token]);

  const noticeWrite = () => {
    navigate("/noticeWriteMain");
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
  }


  return (
    <ContentListDiv>
      <HeadingContainer>
        <Heading>공지사항</Heading>
        <Navigation>
          <span>홈 / 커뮤니티</span>
          <span> / </span>
          <BoldText>공지사항</BoldText>
        </Navigation>
      </HeadingContainer>
      <HeadingContainer1>
        <StyledButton
          size="md"
          theme="brown"
          onClick={noticeWrite}
          style={{ height: "39px", marginTop: "32px" }}
        >
          글 작성
        </StyledButton>

        <s.ButtonDiv width="200px" float="right">
          <s.SearchDiv width="200px">
            <Input icon={<MagnifyingGlassIcon className="h-5 w-5" />} label="제목 검색" />
          </s.SearchDiv>
        </s.ButtonDiv>
      </HeadingContainer1>
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
      {/* {[1, 2, 3, 4, 5].map(id => (
        <div key={id}>
          <TableInfoList onClick={() => handleItemClick(id)}>
            <div>{id}</div>
            <div>[주요 공지사항] 더치원액 팩 1000ml 액상 (브라질산으로 변경됨)</div>
            <div>2024-10-11 13:49:46</div>
          </TableInfoList> */}
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
      {notice.map((item) => (
          <TableInfoList key={item.noticeNum} onClick={() => handleItemClick(item.noticeNum)}>
            <div>{item.noticeNum}</div>
            <div>{item.noticeTitle}</div>
            <div>{new Date(item.noticeDate).toLocaleDateString()}</div>
          </TableInfoList>
          ))}

        <CustomHorizontal width="basic" bg="grey" />
      <CustomHorizontal width="basic" bg="grey" />
    </ContentListDiv>
  );
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

  // margin-bottom: 15px;
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
  // flex-direction: row;
  justify-content: center;
  text-align: center;
  align-items: center;

  width: 120px;
  height: 40px;
  padding: 8px 16px;
  background-color: ${props => (props.isSelected ? "lightblue" : "white")};
  font-size: 16px;
  border: ${props => (props.isSelected ? "2px solid grey" : "1px solid #ddd")};
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${props => (props.isSelected ? "lightblue" : "#f0f0f0")};
  }
`;

const SearchContainer = styled.div`
  // width: 800px;
  display: flex;
  align-items: center;
  justify-content: right;
  gap: 10px;
  // margin-left: 200px;
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

  // margin-top: 5px;
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

const NoticeContent = styled.textarea`
  min-height: 150px;

  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const CloseButton = styled.button`
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

export default NoticeListMain;
