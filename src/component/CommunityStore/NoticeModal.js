import React, { useState } from "react";
import styled from "styled-components";

// 메인 컴포넌트
const NoticeModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    return (
        <div>
            {/* 모달 열기 버튼 */}
            {/*<button onClick={() => setIsModalOpen(true)}>공지사항 보기</button>*/}

            {/* 모달 */}
            {/*{isModalOpen && (*/}
                <ModalBackground>
                    <ModalContainer>
                        <ModalHeader>공지사항</ModalHeader>

                        <NoticeType>
                        {/* 주요 공지사항 */}
                        <Section>
                            <SectionTitle1>주요 공지사항</SectionTitle1>
                            <SectionContent1>
                                {importantNotices.map((notice, index) => (
                                    <ListItem key={index}>{notice}</ListItem>
                                ))}
                            </SectionContent1>
                        </Section>

                        {/* 최근 공지사항 */}
                        <Section>
                            <SectionTitle2>최근 공지사항</SectionTitle2>
                            <SectionContent2>
                                {recentNotices.map((notice, index) => (
                                    <ListItem key={index}>{notice}</ListItem>
                                ))}
                            </SectionContent2>
                        </Section>
                        </NoticeType>

                        <ButtonType>
                        {/* 다시보지않기 버튼 */}
                        <DoNotShowAgain onClick={() => setIsModalOpen(false)}>다시보지 않기</DoNotShowAgain>
                        {/* 닫기 버튼 */}
                        <CloseButton onClick={() => setIsModalOpen(false)}>닫기</CloseButton>
                        </ButtonType>
                    </ModalContainer>
                </ModalBackground>

        {/*}*/}
        </div>
    );
};


// 모달 스타일 컴포넌트
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
  //background: white;
  background-color: #C9D4FF;
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
  text-align: center;
  align-items: center;
  
  margin-top: 50px;
  margin-bottom: 50px;
  gap: 20px;
 
  
`

const Section = styled.div`
  margin-bottom: 60px;
`;

const SectionTitle1 = styled.h3`
  margin-bottom: 40px;
  
  font-weight: bold;
  font-size: 20px;
  
`;

const SectionTitle2 = styled.h3`
  margin-bottom: 40px;
  margin-right: 80px;
  
  font-weight: bold;
  font-size: 20px;
  
  
`;

const SectionContent1 = styled.ul`
  //padding-left: 20px;
  text-align: left;
  margin-left: 60px;
`;

const SectionContent2 = styled.ul`
  padding-left: 40px;
  text-align: left;
  //margin-left: 30px;
  margin-right: 20px;
  //gap: 30px;
`;

const ListItem = styled.li`
  margin-bottom: 5px;
`;

const CloseButton = styled.button`
  background: #54473F;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  align-self: center;

  &:hover {
    background: #0056b3;
  }
`;

const DoNotShowAgain = styled.button`
  background: #54473F;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  align-self: center;

  &:hover {
    background: #0056b3;
  }
`;

const ButtonType = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 60px;
`

export default NoticeModal;