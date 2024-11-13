import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const ComplainDetail = () => {
  const { id } = useParams(); // URL에서 ID를 가져옴
  const navigate = useNavigate();

  const [complainDetail, setComplainDetail] = useState(true); // 컴플레인 상세 데이터 상태

  // 페이지 로드 시 해당 ID의 컴플레인 데이터 불러오기
  useEffect(() => {
    fetch(`http://localhost:8080/complainDetail/${id}`)
      .then(response => response.json())
      .then(data => {
        setComplainDetail(data);
      })
      .catch(error => console.error("컴플레인 상세 조회 오류:", error));
  }, [id]);

  // 목록으로 버튼 클릭 시 컴플레인 목록 페이지로 이동
  const handleBackToList = () => {
    navigate("/ComplainList");
  };

  return (
    <Wrapper>
      {complainDetail ? (
        <>
          <HeadingContainer>
            <Heading>컴플레인 상세</Heading>
            <Navigation>
              <span>홈 / 커뮤니티</span>
              <span> / </span>
              <BoldText>컴플레인 공지 상세</BoldText>
            </Navigation>
          </HeadingContainer>

          <DetailContainer>
            <FirstInfo>
              <FirstLabel1>제목</FirstLabel1>
              <FirstDetail1>{complainDetail.title}</FirstDetail1>
              <FirstLabel2>작성일</FirstLabel2>
              <FirstDetail2>{complainDetail.date}</FirstDetail2>
            </FirstInfo>

            <SecondInfo>
              <SecondLabel>내용</SecondLabel>
              <SecondDetail>{complainDetail.content}</SecondDetail>
            </SecondInfo>

            <ThirdInfo>
              <ThirdLabel>코멘트</ThirdLabel>
              <ThirdDetail>
                {complainDetail.comments || "혹시 직원교육 신청 또는 직접 교육 참여하시려면..."}
              </ThirdDetail>
            </ThirdInfo>

            <ButtonContainer>
              <BackButton onClick={handleBackToList}>목록으로</BackButton>
            </ButtonContainer>
          </DetailContainer>
        </>
      ) : (
        <Loading>로딩 중...</Loading>
      )}
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
  margin-bottom: 38px;
`;

const Heading = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-top: 0;
  text-align: center;
  flex-grow: 1;
`;

const Navigation = styled.div`
  font-size: 10px;
  position: absolute;
  margin-right: 560px;
  right: 0;
`;

const BoldText = styled.span`
  font-weight: bold;
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: space-between;

  background-color: #d5d5d5;

  width: 800px;
  height: 600px;

  // margin-bottom: 20px;
`;

const FirstInfo = styled.div`
  // height: 50px;

  display: flex;
  flex-direction: row;

  justify-content: flex-start;
  algin-items: center;
  text-align: center;

  padding-top: 30px;
  padding-left: 30px;
`;

const SecondInfo = styled.div`
  // height: 50px;

  display: flex;

  justify-content: flex-start;
  algin-items: center;
  text-align: center;

  padding-top: 30px;
  padding-left: 30px;
`;

const ThirdInfo = styled.div`
  // height: 50px;

  display: flex;

   justify-content: flex-start
  algin-items: center;
  text-align: center;

  padding-top: 30px;
  padding-left: 30px;  

`;

const FirstLabel1 = styled.div`
  font-weight: bold;
  font-size: 16px;

  margin-right: 65px;

  // margin-bottom: 10px;

  // text-align: left;
  margin-top: 10px;
`;

const FirstLabel2 = styled.div`
  font-weight: bold;
  font-size: 16px;

  margin-right: 65px;
  margin-left: 90px;

  // margin-bottom: 10px;

  // text-align: left;
  margin-top: 10px;
`;

const SecondLabel = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 10px;
  margin-right: 65px;
  text-align: left;
`;

const ThirdLabel = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 10px;
  margin-right: 50px;
  text-align: left;
`;

const FirstDetail1 = styled.div`
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;

  width: 200px;
  height: 50px;

  white-space: pre-line; /* 텍스트가 줄바꿈되도록 처리 */
  word-wrap: break-word; /* 긴 텍스트가 자동으로 줄바꿈 */
`;

const FirstDetail2 = styled.div`
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;

  width: 200px;
  height: 50px;

  white-space: pre-line; /* 텍스트가 줄바꿈되도록 처리 */
  word-wrap: break-word; /* 긴 텍스트가 자동으로 줄바꿈 */
`;

const SecondDetail = styled.div`
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;

  width: 600px;
  height: 200px;

  white-space: pre-line; /* 텍스트가 줄바꿈되도록 처리 */
  word-wrap: break-word; /* 긴 텍스트가 자동으로 줄바꿈 */
`;

const ThirdDetail = styled.div`
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;

  width: 600px;
  height: 200px;

  white-space: pre-line; /* 텍스트가 줄바꿈되도록 처리 */
  word-wrap: break-word; /* 긴 텍스트가 자동으로 줄바꿈 */
`;

const Detail = styled.div`
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
  margin-bottom: 20px;
  min-height: 50px;
  white-space: pre-line; /* 텍스트가 줄바꿈되도록 처리 */
  word-wrap: break-word; /* 긴 텍스트가 자동으로 줄바꿈 */
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 50px;
`;

const BackButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #ccc;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: lightblue;
  }
`;

const Loading = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #555;
`;

export default ComplainDetail;
