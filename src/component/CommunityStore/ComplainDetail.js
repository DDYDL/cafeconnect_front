import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // navigate를 사용하려면 이 임포트가 필요합니다.
import styled from "styled-components";
import { ButtonContainer } from "../styledcomponent/Button.style.js";
// import { CustomHorizontal } from "../styledcomponent/Horizin.style.js";
import { useAtom } from "jotai/react";
import { Link, useParams } from "react-router-dom";
import { tokenAtom } from "../../atoms";
import { axiosInToken } from "../../config.js";
import { Textarea } from "../styledcomponent/Input.style.js";
import * as s from "../styles/StyledStore.tsx";
import { ContentListDiv } from "../styles/StyledStore.tsx";

const ComplainDetail = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate(); // useNavigate 훅을 호출하여 navigate 함수 정의
  const [complain, setComplain] = useState({});
  const { complainNum } = useParams();
  const [token, setToken] = useAtom(tokenAtom);

  useEffect(() => {
    if (token != null && token !== "") select();
  }, [token]);

  const select = () => {
    axiosInToken(token)
      .get(`http://localhost:8080/complainDetailStore/${complainNum}`)
      .then(res => {
        if (res.headers.authorization != null) {
          setToken(res.headers.authorization);
        }

        const complainData = res.data;

        // complainDate를 한국식 날짜 형식으로 변환
        const formattedDate = new Date(complainData.complainDate).toLocaleDateString("ko-KR");

        setComplain({
          ...complainData,
          complainDate: formattedDate, // 날짜 포맷 변경
        });
      })
      .catch(error => {
        console.error("Error fetching complain details:", error);
      });
  };

  return (
    <ContentListDiv>
      <HeadingContainer>
        <Heading>컴플레인 상세</Heading>
      </HeadingContainer>

      <Form>
        <s.TrStyle>
          <s.TableTextTd>제목 *</s.TableTextTd>
          <s.TableTextTd>
            <s.InputStyle
              type="text"
              style={{
                width: "290px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
              placeholder="직원이 불친절함"
              disabled
              value={complain.complainTitle}
            />
          </s.TableTextTd>

          <s.TableTextTd>작성일 *</s.TableTextTd>
          <s.TableTextTd>
            <s.InputStyle
              type="text"
              style={{
                width: "290px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
              placeholder="작성일(예_2024-12-11)"
              disabled
              value={complain.complainDate}
            />
          </s.TableTextTd>
        </s.TrStyle>

        <s.TrStyle>
          <s.TableTextTd>글 내용 *</s.TableTextTd>
          <s.TableTextTd>
            <s.InputStyle
              type="text"
              style={{
                width: "680px",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start", // 수직 정렬을 위쪽으로
                textAlign: "left", // 텍스트를 왼쪽 정렬
                paddingLeft: "20px", // 왼쪽 여백
              }}
              placeholder="글 내용 입니다."
              disabled
              value={complain.complainContent}
            />
          </s.TableTextTd>
        </s.TrStyle>

        <s.TrStyle style={{ height: "200px", margin: "30px" }}>
          <s.TableTextTd>코멘트 *</s.TableTextTd>
          <s.TableTextTd>
            <Textarea
              onChange={e => setContent(e.target.value)}
              style={{
                width: "680px",
                display: "flex",
                alignItems: "flex-start", // 수직 정렬을 위쪽으로
                textAlign: "left", // 텍스트를 왼쪽 정렬
                paddingLeft: "20px", // 왼쪽 여백
              }}
              value={complain.complainAnswer}
            />
            {/* <s.InputStyle type="text" value={title} onChange={e => setTitle(e.target.value)} /> */}
          </s.TableTextTd>
        </s.TrStyle>

        {/* <div> */}
        {/* <CustomHorizontal width="basic" bc="grey" /> */}
        {/* </div> */}

        {/* <Button variant="outline"></Button> */}

        <ButtonContainer>
          <s.ButtonStyle>
            <Link to="/complainList">목록으로</Link>
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

export default ComplainDetail;
