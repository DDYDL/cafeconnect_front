import axios from "axios";
import { useAtomValue } from "jotai/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // navigate를 사용하려면 이 임포트가 필요합니다.
import styled from "styled-components";
import { tokenAtom } from "../../atoms";
import { axiosInToken } from "../../config.js";
import { ButtonContainer } from "../styledcomponent/Button.style.js";
import * as s from "../styles/StyledStore.tsx";
import { ContentListDiv } from "../styles/StyledStore.tsx";

const JoinStore = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate(); // useNavigate 훅을 호출하여 navigate 함수 정의
  const [selectedInquiryType, setSelectedInquiryType] = useState("default");
  const [username, setUsername] = useState(""); // username 상태
  const [errorMessage, setErrorMessage] = useState(""); // 중복 메시지를 저장할 상태
  const [successMessage, setSuccessMessage] = useState(""); // 성공 메시지를 위한 상태 추가
  const [storeCode, setStoreCode] = useState(null);
  const token = useAtomValue(tokenAtom);
  const [storeName, setStoreName] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [storeCodeMessage, setStoreCodeMessage] = useState(""); // 가맹점 아이디 조회 메시지 상태

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

  // // useEffect는 그대로 유지
  useEffect(() => {
    fetchStoreCode();
  }, [token]);

  // 아이디 중복 확인
  const checkDoubleId = async () => {
    try {
      // 쿼리 파라미터는 params로 전달해야 합니다.
      const response = await axios.get(`http://localhost:8080/joinStore/checkDoubleId`, {
        params: {
          username: username, // 상태로 저장된 username 값 전송
        },
      });

      // 백엔드에서 중복 여부를 확인한 후 응답 데이터로 처리
      if (response.data) {
        setErrorMessage("해당 아이디는 사용 중입니다.");
        setSuccessMessage(""); // 중복된 경우, 성공 메시지 초기화
      } else {
        setErrorMessage(""); // 중복되지 않으면 에러 메시지 초기화
        setSuccessMessage("아이디 사용 가능합니다."); // 중복되지 않으면 성공 메시지 표시
      }
    } catch (err) {
      console.error("중복 확인 중 오류 발생:", err);
      setErrorMessage("중복 확인 중 오류가 발생했습니다.");
      setSuccessMessage(""); // 오류 발생 시 성공 메시지 초기화
    }
  };

  // storeCode 조회
  const searchStoreCode = async () => {
    try {
      // 쿼리 파라미터로 storeCode 전달
      const response = await axios.get(`http://localhost:8080/joinStore/checkStoreCode`, {
        params: {
          storeCode: storeCode,
        },
      });

      // 조회된 데이터가 있을 경우
      if (response.data) {
        setStoreCodeMessage("해당 가맹점 아이디 조회되었습니다."); // 조회된 경우 메시지
        setStoreName(response.data.storeName);
      } else {
        setStoreCodeMessage("해당 가맹점 아이디는 없습니다."); // 여기 작동 안됨.
      }
    } catch (err) {
      console.error("조회 중 오류 발생:", err);
      setStoreCodeMessage("해당 가맹점 아이디는 없습니다."); // 조회되지 않은 경우 메시지
    }
  };

  // onChange 핸들러 함수 정의
  const handleStoreCodeChange = async e => {
    const value = e.target.value;
    setStoreCode(value);
  };

  // 취소 시, 홈으로 리디렉션
  const handleCancel = () => {
    navigate("/");
  };

  const handleRegister = () => {
    navigate("/askList");
  };

  // const handleSubmit = event => {
  //   event.preventDefault();

  //   // 작성한 글을 서버로 전송
  //   const newNotice = {
  //     type: "주요 공지사항", // 항상 공지사항
  //     title,
  //     content,
  //     date: new Date().toISOString(),
  //   };

  //   fetch("https://www.localhost:8080/joinStore", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newNotice),
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log("Notice added:", data);
  //       // 글 작성 후 입력 필드 초기화
  //       setTitle("");
  //       setContent("");

  //       // 공지사항 작성이 완료된 후, noticeList 페이지로 리디렉션
  //       navigate("/noticeList");
  //     })
  //     .catch(error => console.error("Error posting notice:", error));
  // };

  return (
    <ContentListDiv>
      <HeadingContainer>
        <Heading>회원가입</Heading>
      </HeadingContainer>

      <Form
      //  onSubmit={handleSubmit}
      >
        <s.TrStyle
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: "200px",
            borderBottom: "none",
            position: "relative", // 메시지 위치를 상대적으로 설정
          }}
        >
          <s.TableTextTd
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              marginRight: "20px",
            }}
          >
            아이디 *
          </s.TableTextTd>

          <s.TableTextTd
            style={{
              marginTop: "10px",
              position: "relative", // input 내부의 메시지 위치 설정을 위해 relative 설정
            }}
          >
            <s.InputStyle
              style={{
                width: "300px",
                paddingRight: "40px", // 메시지 공간을 확보하기 위한 padding
              }}
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)} // input 값 변경 시 상태 업데이트
            />

            {/* 메시지를 input 내부의 오른쪽에 작게 표시 */}
            {(errorMessage || successMessage) && (
              <div
                style={{
                  width: "300px",
                  // position: "absolute",
                  display: "flex-start",
                  justifyContent: "left",
                  paddingTop: "5px",
                  // marginLeft: "30px",
                  paddingLeft: "10px",
                  // top: "50%", // 수직 중앙 정렬
                  // right: 0, // 오른쪽 끝에 위치
                  // transform: "translateY(-50%)", // 수직 중앙 정렬
                  color: errorMessage ? "red" : "blue",
                  fontSize: "12px", // 작은 폰트 크기
                }}
              >
                {errorMessage || successMessage}
              </div>
            )}
          </s.TableTextTd>

          <s.ButtonStyle
            style={{
              marginLeft: "232px",
              marginTop: "13px",
              height: "36px",
            }}
            variant="outlined"
            bgColor="white"
            onClick={checkDoubleId} // 버튼 클릭 시 중복 확인 요청
          >
            중복 확인
          </s.ButtonStyle>
        </s.TrStyle>

        <s.TrStyle
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: "200px",
            paddingTop: "10px",
            borderBottom: "none",
          }}
        >
          <s.TableTextTd
            style={{
              paddingTop: "12px",
            }}
          >
            비밀번호 *
          </s.TableTextTd>
          <s.TableTextTd>
            <s.InputStyle
              style={{ width: "300px", marginLeft: "20px" }}
              type="text"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </s.TableTextTd>
        </s.TrStyle>

        <s.TrStyle
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: "200px",
            paddingTop: "10px",
            borderBottom: "none",
          }}
        >
          <s.TableTextTd
            style={{
              width: "110px",
              paddingTop: "12px",
            }}
            onChange={handleStoreCodeChange}
          >
            가맹점 코드 *
          </s.TableTextTd>

          <s.TableTextTd>
            <s.InputStyle
              style={{
                width: "300px",
                marginLeft: "10px",
              }}
              type="text"
              value={storeCode}
              onChange={e => setStoreCode(e.target.value)}
            />
          </s.TableTextTd>
          <s.ButtonStyle
            style={{ marginLeft: "240px", marginTop: "3px", height: "36px" }}
            variant="outlined"
            bgColor="white"
            onClick={searchStoreCode}
          >
            <Link
            //  to="/checkStoreCode"
            >
              조회
            </Link>
          </s.ButtonStyle>
        </s.TrStyle>

        {/* 가맹점 조회 메시지 */}
        {storeCodeMessage && (
          <div
            style={{
              width: "300px",
              display: "flex",
              justifyContent: "flex-start",
              fontSize: "12px",
              color: storeCodeMessage.includes("조회되었습니다.") ? "blue" : "red", // 메시지 색상
            }}
          >
            {storeCodeMessage}
          </div>
        )}

        <s.TrStyle
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: "200px",
            paddingTop: "10px",
            borderBottom: "none",
          }}
        >
          <s.TableTextTd
            style={{
              paddingTop: "12px",
            }}
          >
            가맹점명 *
          </s.TableTextTd>
          <s.TableTextTd>
            <s.InputStyle
              style={{ width: "300px", marginLeft: "20px" }}
              type="text"
              value={storeName}
              onChange={e => setStoreName(e.target.value)}
            />
          </s.TableTextTd>
        </s.TrStyle>

        <ButtonContainer>
          <s.ButtonStyle variant="outlined" bgColor="white" onClick={handleCancel}>
            <Link to="/complain">취소</Link>
          </s.ButtonStyle>
          &nbsp;&nbsp;
          <s.ButtonStyle onClick={handleRegister}>
            <Link to="/complain">등록하기</Link>
          </s.ButtonStyle>
        </ButtonContainer>
      </Form>
    </ContentListDiv>
  );
};

const HeadingContainer = styled.div`
  display: flex;
  justify-content: center; /* 좌우로 배치 */
  align-items: center;
  text-align: center;
  margin-bottom: 38px;
`;

const Heading = styled.h2`
  font-size: 24px;
  font-weight: bold;
  position: absolute;
`;

const Navigation = styled.div`
  font-size: 10px;
  margin-left: 850px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
  text-align: center;
  margin-left: 50px;
  padding-top: 30px;
`;

const Select = styled.select`
  display: flex;
  justify-content: center;
  text-align: center;
  algin-items: center;

  height: 38px;
  font-size: 12px;
  border-radius: 5px;
  border: 1px solid #ccc;

  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }

  &:focus {
    outline: none;
    border-color: #4caf50;
  }
`;

const Option = styled.option`
  // padding: 10px;
  // font-size: 16px;
`;

const FormContainer1 = styled.div`
  display: flex;
  // justify-content: flex-start;
  align-items: center;
  text-align: center;

  margin-top: 30px;
  margin-bottom: 30px;

  margin-left: 200px;
`;

const Form1div = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const FormContainer2 = styled.div`
  display: flex;
  // justify-content: flex-start;
  text-align: center;
  align-items: center;

  margin-top: 30px;
  margin-bottom: 30px;

  margin-left: 200px;
`;

const Form2div = styled.div`
  /* 직속 자식 div에만 적용 */
  font-size: 20px;
  font-weight: bold;
  // margin-right: 82px;
  // margin-right: 120px;
`;

const FormContainer3 = styled.div`
  display: flex;
  // justify-content: flex-start;
  text-align: center;
  align-items: center;

  margin-top: 30px;
  margin-bottom: 30px;

    margin-left: 200px;
  }
`;

const Form3div = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-right: 120px;
`;

const BoldText = styled.span`
  font-weight: bold;
`;

export default JoinStore;
