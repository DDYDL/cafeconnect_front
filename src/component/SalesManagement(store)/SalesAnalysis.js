import React, { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import styled from "styled-components";
import { CustomButton } from "../Button/Button.style";

const SalesAnalysis = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("1개월");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [category, setCategory] = useState("음료");
  const [metricsData, setMetricsData] = useState([]);
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  // DB에서 데이터 가져오기 << db설정 후 해당 부분으로 변경하기
  // useEffect(() => {
  //   fetch("/SalesAnalysis") // 실제 API 엔드포인트로 변경
  //     .then(response => response.json())
  //     .then(data => setMetricsData(data)) // 가져온 데이터를 상태에 저장
  //     .catch(error => console.error("데이터 가져오기 오류:", error));
  // }, []);

  //임시
  useEffect(() => {
    // 예시 데이터 설정
    const exampleData = [
      {
        title: "평균 고객 수",
        value: "250명",
        category: "모든 상품",
      },
      {
        title: "월 평균 매출액",
        value: "2,400,000원",
        category: "모든 상품",
      },
      {
        title: "총 합계",
        value: "2,700,000원",
        category: "모든 상품",
      },
      {
        title: "전월 대비",
        value: "+500,000원",
        category: "모든 상품",
      },
    ];

    console.log(exampleData); // 예시 데이터를 콘솔에 출력하여 확인
    // 예시 데이터를 상태에 설정
    setMetricsData(exampleData);
  }, []);

  const handleQuery = () => {
    console.log("조회 clicked with values:", {
      selectedPeriod,
      startDate,
      endDate,
      category,
    });

    // 백엔드 API 호출 예시
    fetch(
      `/salesAnalysis/salesData?period=${selectedPeriod}&start=${startDate}&end=${endDate}&category=${category}`
    )
      .then(response => response.json())
      .then(data => {
        // DB에서 받아온 데이터를 상태에 설정
        setMetricsData(data); // 이 부분을 데이터 구조에 맞게 설정
      })
      .catch(error => {
        console.error("데이터 가져오기 오류:", error);
      });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const newNotice = {
      type: "주요 공지사항",
      title,
      content,
      date: new Date().toISOString(),
    };

    fetch("https://www.localhost:8080/notice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNotice),
    })
      .then(response => response.json())
      .then(data => {
        console.log("Notice added:", data);
        setTitle("");
        setContent("");
      })
      .catch(error => console.error("Error posting notice:", error));
  };

  return (
    <Wrapper>
      <HeadingContainer>
        <Heading>매출 분석</Heading>
        <Navigation>
          <span>홈 / 재무관리 / 매출관리 </span>
          <span> / </span>
          <BoldText>매출 분석</BoldText>
        </Navigation>
      </HeadingContainer>

      <Form onSubmit={handleSubmit}>
        <HeadingContainer1>
          <HeadingDataAndSave>
            <Option1>
              <Title1>기간</Title1>
              <Select onChange={e => setSelectedPeriod(e.target.value)} value={selectedPeriod}>
                <option value="1개월">1개월</option>
                <option value="3개월">3개월</option>
                <option value="6개월">6개월</option>
                <option value="1년">1년</option>
              </Select>
            </Option1>

            <Option2>
              <Title2>기간 상세:</Title2>

              <DateRow>
                <Datepicker
                  value={value}
                  onChange={newValue => setValue(newValue)}
                  showShortcuts={true}
                />
              </DateRow>
            </Option2>

            <Option3>
              <Title3>카테고리:</Title3>
              <Select onChange={e => setCategory(e.target.value)} value={category}>
                <option value="음료">음료</option>
                <option value="식품">식품</option>
                <option value="의류">의류</option>
              </Select>
            </Option3>

            <CustomButton type="button" onClick={handleQuery} style={{ marginLeft: "160px" }}>
              조회
            </CustomButton>
          </HeadingDataAndSave>
        </HeadingContainer1>

        {/* <BodyContent> */}
        <Title4>매출 현황</Title4>

        {/* MetricsRow: 동적으로 데이터를 출력 */}
        <MetricsRow>
          {metricsData.map((metric, index) => (
            <MetricBox key={index}>
              <MetricTitle>{metric.title}</MetricTitle>
              <MetricValue>{metric.value}</MetricValue>
              <MetricCategory>{metric.category}</MetricCategory>
            </MetricBox>
          ))}
        </MetricsRow>

        <SalesTable>
          <TableHeader>
            <TableColumn>상품명</TableColumn>
            <TableColumn>수량</TableColumn>
            <TableColumn>매출합계</TableColumn>
            <TableColumn>전월대비</TableColumn>
            <TableColumn>전월대비 금액</TableColumn>
          </TableHeader>
          <TableRow>
            <TableCell>콜라</TableCell>
            <TableCell>50</TableCell>
            <TableCell>500,000원</TableCell>
            <TableCell>+5%</TableCell>
            <TableCell>25,000원</TableCell>
          </TableRow>
        </SalesTable>
        {/* </BodyContent> */}
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 800px;
  height: 600px;
  margin-top: 120px;
`;

const Form = styled.form`
  width: 800px;
  height: 669px;
  display: flex;
  flex-direction: column;
`;

const Navigation = styled.div`
  font-size: 10px;
  position: absolute;
  margin-left: 290px;
`;

const HeadingContainer = styled.div`
  // width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 38px;
`;

const HeadingContainer1 = styled.div`
  width: 800px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const HeadingDataAndSave = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 120px;

  background-color: #f2f2f2;
`;

const Heading = styled.h2`
  font-size: 24px;
  text-align: center;
  flex-grow: 1;
`;

const Select = styled.select`
  padding: 5px;
  border-radius: 5px;
`;

const Title1 = styled.div`
  font-size: 20px;

  margin-bottom: 10px;
`;

const Title2 = styled.div`
  font-size: 20px;
  width: 200px;
  margin-bottom: 10px;
`;

const Title3 = styled.div`
  font-size: 20px;

  margin-bottom: 10px;
`;

const Title4 = styled.div`
  font-size: 20px;

  margin-top: 30px;
  // margin-bottom: 10px;
  margin-left: 20px;
`;

const Option1 = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: 30px;
  margin-right: 30px;
`;

const Option2 = styled.div`
  display: flex;
  flex-direction: column;

  margin-right: 30px;
`;

const Option3 = styled.div`
  display: flex;
  flex-direction: column;

  margin-right: 50px;
`;

// const BodyContent = styled.div`
//   display: flex;

//   background-color: grey;
// `;

const DateRow = styled.div`
  display: flex;
  justify-content: center;
`;

const DateInput = styled.input`
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Title = styled.h2`
  font-size: 20px;
  margin-top: 30px;
  margin-bottom: 20px;
  // margin-lett: 20px;
`;

const MetricsRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;

  gap: 10px;
  margin-bottom: 20px;
`;

const MetricBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-around;

  border-radius: 5px;

  width: 180px;
  height: 100px;

  padding-left: 10px;
  background-color: white;
  border: 1px solid lightblue;
`;

const MetricTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const MetricValue = styled.div`
  font-size: 18x;
  color: #6366f1;
`;

const MetricCategory = styled.div`
  font-size: 12px;
  color: #666;
`;

// const SalesTable = styled.div`
//   width: 100%;
//   background-color: white;
//   border: 1px solid #ddd;
//   border-radius: 4px;
//   overflow: hidden;
// `;

const SalesTable = styled.div`
  width: 100%;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow-y: auto; // 수직 스크롤이 생기도록 설정
  min-height: 200px; // 최소 높이 지정
`;

const TableHeader = styled.div`
  display: flex;
  background-color: #f5f5f5;
  padding: 10px 0;
`;

const TableColumn = styled.div`
  flex: 1;
  text-align: center;
  font-weight: bold;
`;

// const TableRow = styled.div`
//   display: flex;
//   padding: 10px 0;
//   border-top: 1px solid #ddd;
// `;

const TableRow = styled.div`
  display: flex;
  padding: 10px 0;
  border-top: 1px solid #ddd;
  height: 40px; // 각 행의 높이를 지정하여 보이도록 설정
`;

// const TableCell = styled.div`
//   flex: 1;
//   text-align: center;
// `;

const TableCell = styled.div`
  flex: 1;
  text-align: center;
  padding: 0 10px; // 셀에 패딩 추가
`;

const BoldText = styled.span`
  font-weight: bold;
`;
export default SalesAnalysis;
