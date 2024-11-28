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
import axios from "axios";

// todo 답변 저장 -> 해당 답변이 계속 보여지도록 해야함.
const AskList = () => {
  const [askList, setAskList] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedItem, setSelectedItem] = useState(null); // Track the selected item
  const [answers, setAnswers] = useState({}); // 항목별 답변을 저장하는 객체
  const [searchQuery, setSearchQuery] = useState(""); // 검색 요청 시, 사용
  const [searchResults, setSearchResults] = useState([]); // 검색 결과를 저장하는 상태
  const navigate = useNavigate(); // useNavigate 훅을 호출하여 navigate 함수 정의

    const handleItemClick = (askNum) => {
        setSelectedItem(selectedItem === askNum ? null : askNum); // askNum으로 비교
    };

  const askWrite = () => {
    navigate("/askWrite");
  };

  const handleChange = (id, value) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [id]: value, // 해당 id에 대한 답변 업데이트
    }));
  };

  // 검색어 입력 시 상태 업데이트
  // const handleSearchChange = e => {
  //   setSearchQuery(e.target.value);
  // };

  // 1:1문의 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchData = () => {
        axios.get('http://localhost:8080/askList')
          .then(res => {
            console.log(res.data);
            setAskList([...res.data]);
          })
          .catch(err => {
            console.log(err);
          });
    };

    fetchData();
  }, []);  // token은 더 이상 의존성 배열에 포함하지 않음

    //답변 저장
    const handleSubmit = (askNum, e) => {
        e.preventDefault(); // 기본 폼 제출 동작 방지

        const answer = answers[askNum]; // 해당 askNum에 대한 답변을 가져옴

        if (!answer) {
            alert("답변을 작성해주세요.");
            return;
        }

        const answerData = {
            askAnswer: answer
        };

        console.log(answerData);  // 추가: 서버에 보내는 데이터 확인

        // 서버에 답변을 제출하는 API 요청
        axios
            .post(`http://localhost:8080/askList/save/${askNum}`, answerData )
            .then((res) => {
                alert("답변이 저장되었습니다.");
                // 답변 저장 후, 상태 초기화
                setAnswers((prevAnswers) => ({
                    ...prevAnswers,
                    [askNum]: "", // 답변 필드 초기화
                }));
                setSelectedItem(null); // 답변 작성 후 해당 게시글 닫기
            })
            .catch((err) => {
                alert("답변 저장에 실패했습니다.");
                console.error("답변 저장 실패:", err);
            });
    };

    // 답글 삭제 함수
    const handleDelete = (askNum) => {

        axios
            .post(`http://localhost:8080/askList/delete/${askNum}`)
            .then(() => {
                alert("답변이 삭제되었습니다.");
                setAnswers((prevAnswers) => {
                    const newAnswers = { ...prevAnswers };
                    delete newAnswers[askNum]; // 삭제한 답변 상태에서 제거
                    return newAnswers;
                });
                setSelectedItem(null); // 답변 삭제 후 해당 게시글 닫기
            })
            .catch((err) => {
                alert("답변 삭제에 실패했습니다.");
                console.error("답변 삭제 실패:", err);
            });
    };


  return (
    // <Wrapper>
    <ContentListDiv>
      <HeadingContainer>
        <Heading>1:1 문의</Heading>
        <Navigation>
          <span>홈 / 커뮤니티</span>
          <span> / </span>
          <BoldText>1:1 문의</BoldText>
        </Navigation>
      </HeadingContainer>

      <HeadingContainer1>
        <StyledButton size="md" theme="brown" onClick={askWrite} style={{ marginTop: "30px" }}>
          글 작성
        </StyledButton>

        <s.ButtonDiv width="200px" float="right">
          <s.SearchDiv width="200px">
            <Input icon={<MagnifyingGlassIcon className="h-5 w-5" />} label="제목 검색" />
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

        {askList.map((askList) => (
            <div key={askList.askNum}>
                <TableInfoList onClick={() => handleItemClick(askList.askNum)}>
                    <div>{askList.askTitle}</div>
                    <div>{askList.askContent}</div>
                    <div>{new Date(askList.askDate).toLocaleDateString('ko-KR')}</div>
                </TableInfoList>

                <CustomHorizontal width="basic" bg="grey" />

                {selectedItem === Number(askList.askNum) && ( // selectedItem과 askNum 비교 시 Number 타입으로 일치시킴
                    <AnswerContainer>
                        <h4>답변 작성</h4>
                        <AnswerTextarea
                            value={answers[askList.askNum] || ""}
                            onChange={(e) => handleChange(askList.askNum, e.target.value)}
                            placeholder="답변을 작성하세요"
                        />
                        <SubmitButton onClick={(e) => handleSubmit(askList.askNum, e)}>답변 저장</SubmitButton>
                        <CancelButton onClick={(e) => handleDelete(askList.askNum, e)}>답변 삭제</CancelButton>
                    </AnswerContainer>
                )}
            </div>
        ))}
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
  text-align: center;
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
