import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom"; // navigate를 사용하려면 이 임포트가 필요합니다.
import styled from "styled-components";
import { ButtonContainer } from "../styledcomponent/Button.style.js";
// import { CustomHorizontal } from "../styledcomponent/Horizin.style.js";
import { Link } from "react-router-dom";
import { Textarea } from "../styledcomponent/Input.style.js";
import * as s from "../styles/StyledStore.tsx";
import { ContentListDiv } from "../styles/StyledStore.tsx";
import {axiosInToken} from "../../config";
import {useParams} from "react-router";
import axios from "axios";


// todo noticeDate String으로 받아지는 부분, date형식으로 변환 필요
const NoticeDetail = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate(); // useNavigate 훅을 호출하여 navigate 함수 정의
  const { noticeNum } = useParams(); // URL에서 noticeNum 추출
  const [notice, setNotice] = useState("");

  // const noticeDate = notice.noticeDate;  // 백엔드에서 받은 타임스탬프
  // const date = new Date(noticeDate);  // 타임스탬프를 Date 객체로 변환
  // const formattedDate = new Intl.DateTimeFormat('ko-KR').format(date);  // 한국 형식으로 변환
  // console.log(formattedDate);  // 예: "2024년 12월 10일"

  // useEffect(() => {
  //   const fetchData = () => {
  //     axiosInToken(token).get('noticeList')
  //         .then(res=> {
  //           console.log(res.data)
  //           setNotice([...res.data]);
  //         })
  //         .catch(err=>{
  //           console.log(err);
  //         })
  //   };
  //   // if(token!=null && token!=='') fetchData();
  //   fetchData();
  // }, [token]);

  useEffect(() => {

    const fetchNoticeDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/noticeList/${noticeNum}`);
        setNotice(response.data);
        console.log("Notice:", response.data);  // noticeNum이 제대로 전달되었는지 확인
      } catch (error) {
        console.error("Error fetching notice:", error);
      }
    };
    fetchNoticeDetail();  // 컴포넌트가 마운트될 때 공지사항 상세 정보 가져오기
  }, [noticeNum]);  // noticeNum이 변경될 때마다 다시 실행



  return (
    <ContentListDiv>
      <HeadingContainer>
        <Heading>공지사항 상세</Heading>
      </HeadingContainer>

      <Form
          // onSubmit={handleSubmit}
      >
        <s.TrStyle>
          <s.TableTextTd>공지 유형 *</s.TableTextTd>
          <s.TableTextTd>
            <s.InputStyle
              // type="text"
              // style={{ width: "290px", paddingLeft: "110px" }}
              // placeholder="상품"
              // disabled

              type="text"
              style={{ width: "290px", paddingLeft: "110px" }}
              // placeholder="상품"
              value={notice.noticeType} // 받아온 값으로 input을 채웁니다
              disabled // 수정 불가
            />
          </s.TableTextTd>

          <s.TableTextTd>작성일 *</s.TableTextTd>
          <s.TableTextTd>
            <s.InputStyle
              type="text"
              style={{ width: "290px", paddingLeft: "90px" }}
              // placeholder="2024-12-20"
              disabled
              value={notice.noticeDate}
            />
          </s.TableTextTd>
        </s.TrStyle>

        <s.TrStyle>
          <s.TableTextTd>제목 *</s.TableTextTd>
          <s.TableTextTd>
            <s.InputStyle
              type="text"
              style={{ width: "290px", paddingLeft: "80px" }}
              // placeholder="판매상품 재고문의"
              disabled
              value={notice.noticeTitle}
            />
          </s.TableTextTd>
        </s.TrStyle>

        <s.TrStyle style={{ height: "200px", margin: "30px" }}>
          <s.TableTextTd>공지 상세 *</s.TableTextTd>
          <s.TableTextTd>
            <Textarea
              onChange={e => setContent(e.target.value)}
              // placeholder="공지 상세 작성"
              style={{ width: "680px" }}
              value={notice.noticeContent}
            />
            {/* <s.InputStyle type="text" value={title} onChange={e => setTitle(e.target.value)} /> */}
          </s.TableTextTd>
        </s.TrStyle>

        {/* <div> */}
        {/* <CustomHorizontal width="basic" bc="grey" /> */}
        {/* </div> */}

        {/* <Button variant="outline"></Button> */}

        <ButtonContainer>
          <s.ButtonStyle
              // onClick={handleRegister}
          >
            <Link to="/noticeList">목록으로</Link>
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
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  padding-top: 10px;
`;

const FormContainer1 = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  width: 600px;

  margin-top: 30px;
  margin-bottom: 30px;
`;

const Form1div = styled.div`
  /* 직속 자식 div에만 적용 */
  font-size: 20px;
  font-weight: bold;
  margin-right: 50px;
`;

const FormContainer2 = styled.div`
  display: flex;
  justify-content: flex-start;
  text-align: center;
  align-items: center;
  width: 800px;

  margin-top: 30px;
  margin-bottom: 30px;

  margin-left: 200px;
`;

const Form2div = styled.div`
  /* 직속 자식 div에만 적용 */
  font-size: 20px;
  font-weight: bold;
  margin-right: 82px;
`;

const FormContainer3 = styled.div`
  display: flex;
  justify-content: flex-start;
  text-align: center;
  align-items: center;
  width: 800px;

  margin-top: 30px;
  margin-bottom: 30px;

  margin-left: 200px;
`;

const Form3div = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-right: 82px;
`;

const BoldText = styled.span`
  font-weight: bold;
`;

export default NoticeDetail;
