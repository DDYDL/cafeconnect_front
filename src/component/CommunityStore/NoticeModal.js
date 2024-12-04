import { useAtomValue } from "jotai/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { tokenAtom } from "../../atoms";
import { axiosInToken } from "../../config.js";

// 메인 컴포넌트
const NoticeModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [storeCode, setStoreCode] = useState(null);
  const navigate = useNavigate(); // useNavigate 훅을 호출하여 navigate 함수 정의
  const token = useAtomValue(tokenAtom);
  const [notice, setNotice] = useState([]);
  const [daysLeft, setDaysLeft] = useState(null); // 남은 일수 상태 추가

  const recentNotices = [
    "1.프로모션 시작알림",
    "2.매장 위치 및 주차 안내",
    "3.정기 점검으로 인한 일시적 중단",
  ];

  const importantNotices = [
    "1.신제품 출시 안내",
    "2.카페 리뉴얼 공사 일정 안내",
    "3.카페 정기 휴무일 안내",
  ];

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

  // useCallback 제거된 fetchData
  const fetchData = async () => {
    if (!token || !storeCode) return;
    try {
      const response = await axiosInToken(token).get(`/noticeModal`);
      const formattedData = response.data.map(notice => ({
        ...notice,
        noticeDate: new Date(notice.noticeDate).toLocaleDateString("ko-KR"),
      }));
      console.log("formattedData" + JSON.stringify(formattedData));
      setNotice(formattedData);
    } catch (err) {
      console.error("컴플레인 리스트 요청 중 오류 발생:", err);
    }
  };

  // 공지사항 필터링 함수
  const getRecentNotices = () => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    return notice
      .filter(notice => {
        const noticeDate = new Date(notice.noticeDate);
        console.log("noticeDate" + noticeDate);
        return noticeDate >= oneWeekAgo;
      })
      .slice(0, 3); // 최근 3개 공지
  };

  const getImportantNotices = () => {
    return notice.filter(notice => notice.noticeType === "주요공지사항").slice(0, 3);
  };

  // 모달이 열리지 않도록 하기 위한 로직
  useEffect(() => {
    fetchStoreCode();
    // 로컬 스토리지에서 "modalClosedDate" 값을 확인
    const closedDate = localStorage.getItem("modalClosedDate");
    const currentDate = new Date();
    if (closedDate) {
      const closedDateObj = new Date(closedDate);
      const diffTime = currentDate - closedDateObj;
      const diffDays = diffTime / (1000 * 3600 * 24); // 일수로 차이 계산
      if (diffDays < 7) {
        setIsModalOpen(false); // 1주일 이내라면 모달 안 열리도록 설정
        setDaysLeft(7 - Math.ceil(diffDays)); // 남은 일수 계산
        console.log("남은 일수:", 7 - Math.ceil(diffDays)); // 콘솔에 출력
      } else {
        setIsModalOpen(true); // 1주일이 지났으면 모달 열기
        setDaysLeft(0); // 모달을 다시 보지 않음
        console.log("남은 일수: 0"); // 콘솔에 출력
      }
    } else {
      setIsModalOpen(true); // 로컬 스토리지에 값이 없다면 모달 열기
      setDaysLeft(7); // 7일 뒤까지 남은 상태로 설정
      console.log("남은 일수: 7"); // 콘솔에 출력
    }
  }, [token]);

  // useEffect는 그대로 유지
  useEffect(() => {
    fetchStoreCode();
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [token, storeCode]);

  const handleDoNotShowAgain = () => {
    // 1주일 후의 날짜를 로컬 스토리지에 저장
    const currentDate = new Date();
    localStorage.setItem("modalClosedDate", currentDate.toISOString());

    // 모달 닫기
    setIsModalOpen(false);

    // mainShop 페이지로 이동
    navigate("/shopMain");
  };

  return (
    <div>
      <ModalBackground>
        <ModalContainer>
          <ModalHeader>공지사항</ModalHeader>

          <NoticeType>
            {/* 주요 공지사항 */}
            <Section>
              <SectionTitle>주요 공지사항</SectionTitle>
              <NoticeList>
                {getImportantNotices().map((notice, index) => (
                  <NoticeItem key={index}>{notice.noticeContent}</NoticeItem>
                ))}
              </NoticeList>
            </Section>

            {/* 최근 공지사항 */}
            <Section>
              <SectionTitle>최근 공지사항</SectionTitle>
              <NoticeList>
                {getRecentNotices().map((notice, index) => (
                  <NoticeItem key={index}>{notice.noticeContent || notice.content}</NoticeItem>
                ))}
              </NoticeList>
            </Section>
          </NoticeType>

          <ButtonType>
            <DoNotShowAgain onClick={handleDoNotShowAgain}>다시보지 않기</DoNotShowAgain>
            <CloseButton
              onClick={() => {
                setIsModalOpen(false);
                navigate("/shopMain");
              }}
            >
              닫기
            </CloseButton>
          </ButtonType>
        </ModalContainer>
      </ModalBackground>
    </div>
  );
};

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background-color: white;
  width: 700px;
  height: 500px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const ModalHeader = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-top: 30px;
`;

const NoticeType = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 80px;
  margin-bottom: 80px;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 10px;
  display: flex;
  margin-right: 30px;
  padding: 10px;
`;

const Table = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  justify-content: space-between;
  flex-wrap: wrap;

  td {
    // background-color: #f9f9f9;
    padding: 10px;
    border-radius: 5px;
    flex: 1 1 45%; // 각 항목을 2개씩 나누어 배치
    text-align: left;
  }

  td div {
    margin-top: 10px; // 공지 내용 아래에 여백 추가
  }
`;

const ButtonType = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding-top: 20px;
`;

const DoNotShowAgain = styled.button`
  background: #54473f;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

const CloseButton = styled.button`
  background: #54473f;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

const NoticeList = styled.ul`
  list-style-type: none;
  display: flex;
  margin-top: 20px;
  flex-direction: column; /* 세로로 정렬 */
  gap: 10px; /* 각 항목 사이에 여백 추가 */
`;

const NoticeItem = styled.li`
  // background-color: #f9f9f9;
  padding: 10px;
  border-radius: 5px;
  // border: 1px solid #ddd;
`;

export default NoticeModal;
