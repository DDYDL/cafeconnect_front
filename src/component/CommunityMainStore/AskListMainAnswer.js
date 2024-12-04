import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Input } from "@material-tailwind/react";
import axios from "axios";
import { useAtomValue } from "jotai/react";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { tokenAtom } from "../../atoms.js";
import { axiosInToken } from "../../config.js";
import { CustomHorizontal } from "../styledcomponent/Horizin.style.js";
import * as s from "../styles/StyledStore.tsx";
import { ContentListDiv } from "../styles/StyledStore.tsx";

// todo 답변 저장 -> 해당 답변이 계속 보여지도록 해야함.
const AskWriteMain = () => {
  const [ask, setAsk] = useState([]);
  const [storeCode, setStoreCode] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null); // Track the selected item
  const [answers, setAnswers] = useState({}); // 항목별 답변을 저장하는 객체
  const [selectedAnswer, setSelectedAnswer] = useState(null); // 클릭한 항목의 답변을 저장하는 상태
  const navigate = useNavigate(); // useNavigate 훅을 호출하여 navigate 함수 정의
  const token = useAtomValue(tokenAtom);
  const [isSearchActive, setIsSearchActive] = useState(false); // 검색 버튼 클릭 여부
  const [searchAsk, setSearchAsk] = useState("");

  const fetchStoreCode = useCallback(async () => {
    try {
      if (!token) return; // 토큰 없으면 요청 생략
      console.log("storeCode1:", storeCode);

      const response = await axiosInToken(token).get("/store");
      console.log("Response Data:", response.data); // 응답 데이터를 출력
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

  const fetchData = useCallback(async () => {
    if (!token || !storeCode) return; // 토큰 또는 storeCode가 없는 경우 요청 생략
    try {
      const response = await axiosInToken(token).get(`/askListStore/${storeCode}`);
      const formattedData = response.data.map(ask => ({
        ...ask,
        askDate: new Date(ask.askDate).toLocaleDateString("ko-KR"),
      }));
      console.log(response.data);
      setAsk(formattedData);
    } catch (err) {
      console.error("컴플레인 리스트 요청 중 오류 발생:", err);
      alert("데이터를 불러오는 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  }, [token, storeCode]); // token, storeCode를 의존성 배열에 추가

  useEffect(() => {
    fetchData();
  }, [fetchData]); // fetchData를 의존성 배열에 추가

  // 검색 버튼 클릭 핸들러
  const onSearchClick = () => {
    setIsSearchActive(true);
  };

  // const handleItemClick = askNum => {
  //   setSelectedItem(selectedItem === askNum ? null : askNum); // askNum으로 비교
  //   navigate(`/askDetailStore/${storeCode}`);
  // };

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

  const askWrite = () => {
    navigate("/askWrite");
  };

  // todo AskList페이지는 상세보기 대신에, 해당 게시글 클릭 시, 답변 보기로 진행<<<<<<<

  // // 검색된 항목에서 클릭한 경우에 대해 답변을 가져오는 함수
  const fetchAnswerForSelectedItem = async askNum => {
    try {
      console.log("Fetching answer for askNum:", askNum);
      if (!storeCode) return;
      const response = await axios.get(
        `http://localhost:8080/askDetailStore/${storeCode}/getAnswer/${askNum}`
      );
      setAnswers(prev => ({ ...prev, [askNum]: response.data.answer })); // 선택된 항목에 대한 답변 저장
      console.log("response.data" + response.data);
    } catch (err) {
      console.error("답변 요청 중 오류 발생:", err);
    }
  };

  // const handleItemClick = askNum => {
  //   if (selectedItem !== askNum) {
  //     fetchAnswerForSelectedItem(askNum);
  //     setSelectedItem(askNum); // 클릭한 게시글의 번호를 저장
  //     navigate(`/askDetailStore/${storeCode}/getAnswer/${askNum}`); // 답변 페이지로 이동
  //   } else {
  //     setSelectedItem(null); // 이미 선택된 게시글이면 선택 해제
  //     setSelectedAnswer(null); // 답변 초기화
  //   }
  // };

  const onChangeAsk = e => {
    setSearchAsk(e.target.value);
  };

  const filterAsk = ask.filter(a => a.askTitle.toLowerCase().includes(searchAsk.toLowerCase()));

  // 공지사항 데이터를 가져오는 useEffect
  // useEffect(() => {
  //   const fetchData = () => {
  //     axiosInToken(token)
  //       .get("askListStore/{storeCode}")
  //       .then(res => {
  //         console.log(res.data);
  //         setAsk([...res.data]);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   };
  //   if (token != null && token !== "") fetchData();
  //   fetchData();
  // }, [token]);

  // / fetchStoreCode를 useCallback으로 래핑

  // 리스트를 불러오는 함수
  const fetchAskList = async () => {
    try {
      if (!storeCode) return; // storeCode가 없는 경우 요청을 하지 않음
      const response = await axios.get(`http://localhost:8080/askListStore/${storeCode}/`);
      setAsk(response.data); // ask 리스트를 상태에 저장
    } catch (err) {
      console.error("리스트 불러오기 오류:", err);
    }
  };

  useEffect(() => {
    fetchAskList(); // 컴포넌트가 처음 렌더링될 때 ask 리스트를 불러옴
  }, [storeCode]);

  //답변 저장
  // const handleSubmit = (askNum, e) => {
  //   e.preventDefault(); // 기본 폼 제출 동작 방지

  //   const answer = answers[askNum]; // 해당 askNum에 대한 답변을 가져옴

  //   if (!answer) {
  //     alert("답변을 작성해주세요.");
  //     return;
  //   }
  //   const answerData = {
  //     askAnswer: answer,
  //   };
  //   console.log(answerData); // 추가: 서버에 보내는 데이터 확인

  //   // 서버에 답변을 제출하는 API 요청
  //   axios
  //     .post(`http://localhost:8080/askListStore/${storeCode}/save/${askNum}`, answerData)
  //     .then(res => {
  //       alert("답변이 저장되었습니다.");
  //       // 답변 저장 후, 상태 초기화
  //       setAnswers(prevAnswers => ({
  //         ...prevAnswers,
  //         [askNum]: "", // 답변 필드 초기화
  //       }));
  //       setSelectedItem(null); // 답변 작성 후 해당 게시글 닫기
  //     })
  //     .catch(err => {
  //       alert("답변 저장에 실패했습니다.");
  //       console.error("답변 저장 실패:", err);
  //     });
  // };

  // 답글 삭제 함수
  // const handleDelete = askNum => {
  //   axios
  //     .post(`http://localhost:8080/askListStore/${storeCode}/delete/${askNum}`)
  //     .then(() => {
  //       alert("답변이 삭제되었습니다.");
  //       setAnswers(prevAnswers => {
  //         const newAnswers = { ...prevAnswers };
  //         delete newAnswers[askNum]; // 삭제한 답변 상태에서 제거
  //         return newAnswers;
  //       });
  //       setSelectedItem(null); // 답변 삭제 후 해당 게시글 닫기
  //     })
  //     .catch(err => {
  //       alert("답변 삭제에 실패했습니다.");
  //       console.error("답변 삭제 실패:", err);
  //     });
  // };

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
        <s.ButtonDiv width="200px" float="right">
          <s.SearchDiv width="200px">
            <Input
              name="search"
              label="제목 검색"
              value={searchAsk}
              onChange={onChangeAsk}
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

      {/* 조건부 렌더링 */}
      <div>
        {(isSearchActive ? filterAsk : ask).length > 0 ? (
          (isSearchActive ? filterAsk : ask).map((a, index) => (
            <React.Fragment key={a.askNum}>
              <TableInfoList onClick={() => handleItemClick(a.askNum)}>
                <div>{index + 1}</div>
                <div style={{ paddingLeft: "20px" }}>{a.askTitle}</div>
                <div style={{ paddingRight: "20px" }}>
                  {new Date(a.askDate).toLocaleDateString()}
                </div>
              </TableInfoList>
              {selectedItem === a.askNum && (
                <AnswerContainer>
                  <h3>본사의 답변:</h3>
                  <AnswerTextarea
                    value={answers[a.askNum] || "아직 답변이 작성되지 않았습니다."}
                    style={{ display: "flex", justifyContent: "flex-start", padding: "20px" }}
                    readOnly
                  />
                </AnswerContainer>
              )}
            </React.Fragment>
          ))
        ) : (
          <div>검색 결과가 없습니다.</div>
        )}
      </div>
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
  justify-content: right;
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

export default AskWriteMain;
