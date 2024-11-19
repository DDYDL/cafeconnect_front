import ApexCharts from "apexcharts"; // ApexCharts 임포트
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { CustomButton } from "../styledcomponent/Button.style";

const SalesAnalysis = () => {
  const [title, setTitle] = useState(""); // 제목 상태
  const [content, setContent] = useState(""); // 내용 상태
  const [selectedPeriod, setSelectedPeriod] = useState("1개월"); // 선택된 기간
  const [startDate, setStartDate] = useState(""); // 시작일
  const [endDate, setEndDate] = useState(""); // 종료일
  const [category, setCategory] = useState("음료"); // 선택된 카테고리
  const [metricsData, setMetricsData] = useState([]); // 지표 데이터
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  }); // 날짜 범위 상태
  const chartRef = useRef(null); // 차트 참조용 useRef

  const [chartOptions, setChartOptions] = useState(options); // 차트 옵션 상태

  // useEffect(() => {
  //   if (document.getElementById("line-chart") && typeof ApexCharts !== "undefined") {
  //     // 기존 차트가 있다면 파괴하고 새로 그리기
  //     const existingChart = ApexCharts.getChartByID("line-chart");
  //     if (existingChart) {
  //       existingChart.destroy();
  //     }

  //     // 새로운 차트 생성
  //     const chart = new ApexCharts(document.getElementById("line-chart"), chartOptions);
  //     chart.render();
  //   }
  // }, [chartOptions]);

  useEffect(() => {
    // 차트가 있는지 확인 후 파괴 및 새로 렌더링
    if (chartRef.current && typeof ApexCharts !== "undefined") {
      const existingChart = ApexCharts.getChartByID("line-chart");
      if (existingChart) {
        existingChart.destroy();
      }

      const chart = new ApexCharts(chartRef.current, chartOptions); // chartRef 사용
      chart.render();
    }
  }, [chartOptions]);

  useEffect(() => {
    const exampleData = [
      { title: "평균 고객 수", value: "250명", category: "모든 상품" },
      { title: "월 평균 매출액", value: "2,400,000원", category: "모든 상품" },
      { title: "총 합계", value: "2,700,000원", category: "모든 상품" },
      { title: "전월 대비", value: "+500,000원", category: "모든 상품" },
    ];
    setMetricsData(exampleData);
  }, []);

  useEffect(() => {
    // 기존 차트가 있다면 파괴하고 새로 그리기
    const existingChart = ApexCharts.getChartByID("line-chart");
    if (existingChart) {
      existingChart.destroy(); // 차트 파괴
    }

    // 새로운 차트 옵션 설정
    // const newChartOptions = {
    //   chart: {
    //     type: "line",
    //     height: 350,
    //     width: 700,
    //   },
    //   series: [
    //     {
    //       name: "매출액",
    //       data: [100, 200, 300, 400, 500, 600, 700], // 예시 데이터
    //     },
    //     {
    //       name: "Revenue",
    //       data: [50, 150, 250, 350, 450, 550, 650], // 두 번째 선의 데이터
    //     },
    //   ],
    //   xaxis: {
    //     categories: [
    //       "1월",
    //       "2월",
    //       "3월",
    //       "4월",
    //       "5월",
    //       "6월",
    //       "7월",
    //       "8월",
    //       "9월",
    //       "10월",
    //       "11월",
    //       "12월",
    //     ], // 예시 데이터
    //   },
    //   yaxis: {
    //     title: {
    //       text: "매출액",
    //     },
    //   },
    // };

    // const chart = ApexCharts.getChartByID("line-chart");
    // if (chart) {
    //   chart.updateOptions({
    //     xaxis: {
    //       categories: newCategories, // 업데이트된 카테고리
    //     },
    //     series: newSeries, // 업데이트된 데이터
    //   });
    // }

    // chart.render(); // 새로 렌더링
  }, [chartOptions]); // chartOptions 변경 시마다 새로 렌더링

  const handleQuery = () => {
    console.log("조회 clicked with values:", {
      selectedPeriod,
      startDate,
      endDate,
      category,
    });

    let queryStartDate = "";
    let queryEndDate = "";
    let newCategories = [];
    let newSeries = [];

    // db값넣고 해당 부분으로 옮겨서 테스트 해보기.

    //   // 연간 선택 시: 최근 4년간의 데이터
    //   if (selectedPeriod === "연간") {
    //     const currentYear = new Date().getFullYear();
    //     queryStartDate = `${currentYear - 4}-01-01`; // 4년 전
    //     queryEndDate = `${currentYear}-12-31`; // 현재 년도
    //     newCategories = ["2019", "2020", "2021", "2022", "2023"];
    //     newSeries = [{ name: "매출액", data: [500000, 600000, 700000, 800000, 900000] }];
    //   }

    //   // 분기별 선택 시: 최근 4분기(3개월 간격)
    //   else if (selectedPeriod === "분기별") {
    //     const today = new Date();
    //     const currentYear = today.getFullYear();
    //     const currentMonth = today.getMonth(); // 0부터 시작 (0: 1월, 11: 12월)

    //     const months = [
    //       "1월",
    //       "2월",
    //       "3월",
    //       "4월",
    //       "5월",
    //       "6월",
    //       "7월",
    //       "8월",
    //       "9월",
    //       "10월",
    //       "11월",
    //       "12월",
    //     ];
    //     const quarters = [
    //       months[currentMonth - 2 < 0 ? 10 : currentMonth - 2],
    //       months[currentMonth - 1 < 0 ? 11 : currentMonth - 1],
    //       months[currentMonth],
    //     ];

    //     queryStartDate = `${currentYear}-${
    //       (currentMonth - 2 < 0 ? 12 + currentMonth - 2 : currentMonth - 2) + 1
    //     }-01`;
    //     queryEndDate = `${currentYear}-${(currentMonth + 1).toString().padStart(2, "0")}-01`;
    //     newCategories = [
    //       `${currentYear} Q1`,
    //       `${currentYear} Q2`,
    //       `${currentYear} Q3`,
    //       `${currentYear} Q4`,
    //     ];
    //     newSeries = [{ name: "매출액", data: [300000, 400000, 500000, 600000] }];
    //   }

    //   // 월별 선택 시: 최근 12개월의 데이터
    //   else if (selectedPeriod === "월별") {
    //     const today = new Date();
    //     const currentYear = today.getFullYear();
    //     const currentMonth = today.getMonth(); // 0부터 시작 (0: 1월, 11: 12월)

    //     queryStartDate = `${currentYear - (currentMonth < 11 ? 1 : 0)}-${(currentMonth + 1)
    //       .toString()
    //       .padStart(2, "0")}-01`;
    //     queryEndDate = `${currentYear}-${(currentMonth + 1).toString().padStart(2, "0")}-01`;

    //     newCategories = Array.from(
    //       { length: 12 },
    //       (_, i) =>
    //         `${currentYear - (i < currentMonth ? 1 : 0)}-${(currentMonth - i + 12)
    //           .toString()
    //           .padStart(2, "0")}`
    //     );
    //     newSeries = [
    //       { name: "매출액", data: Array(12).fill(500000) }, // 예시 데이터를 넣음
    //     ];
    //   }

    //   // 사용자 지정 기간 선택 시:
    //   if (selectedPeriod === "사용자 지정") {
    //     queryStartDate = startDate;
    //     queryEndDate = endDate;
    //   }

    //   // 차트 옵션 설정
    //   setChartOptions({
    //     ...chartOptions,
    //     xaxis: {
    //       categories: newCategories, // Updated categories based on period
    //     },
    //     series: newSeries, // Updated series based on period
    //   });

    //   // 데이터 가져오기 요청
    //   fetch(
    //     `/salesAnalysis/salesData?period=${selectedPeriod}&start=${queryStartDate}&end=${queryEndDate}&category=${category}`
    //   )
    //     .then(response => response.json())
    //     .then(data => {
    //       setMetricsData(data);
    //     })
    //     .catch(error => console.error("데이터 가져오기 오류:", error));
    // };

    // 예시 데이터 설정
    if (selectedPeriod === "연간") {
      const currentYear = new Date().getFullYear();
      queryStartDate = `${currentYear - 4}-01-01`; // 4년 전
      queryEndDate = `${currentYear}-12-31`; // 현재 년도
      newCategories = ["2019", "2020", "2021", "2022", "2023"];
      newSeries = [{ name: "매출액", data: [500000, 600000, 700000, 800000, 900000] }];
    } else if (selectedPeriod === "분기별") {
      const today = new Date();
      const currentYear = today.getFullYear();
      const currentMonth = today.getMonth(); // 0부터 시작 (0: 1월, 11: 12월)

      const months = [
        "1월",
        "2월",
        "3월",
        "4월",
        "5월",
        "6월",
        "7월",
        "8월",
        "9월",
        "10월",
        "11월",
        "12월",
      ];
      const quarters = [
        months[currentMonth - 2 < 0 ? 10 : currentMonth - 2],
        months[currentMonth - 1 < 0 ? 11 : currentMonth - 1],
        months[currentMonth],
      ];

      queryStartDate = `${currentYear}-${
        (currentMonth - 2 < 0 ? 12 + currentMonth - 2 : currentMonth - 2) + 1
      }-01`;
      queryEndDate = `${currentYear}-${(currentMonth + 1).toString().padStart(2, "0")}-01`;
      newCategories = ["2023 Q1", "2023 Q2", "2023 Q3", "2023 Q4"];
      newSeries = [{ name: "매출액", data: [300000, 400000, 500000, 600000] }];
    } else if (selectedPeriod === "월별") {
      const today = new Date();
      const currentYear = today.getFullYear();
      const currentMonth = today.getMonth(); // 0부터 시작 (0: 1월, 11: 12월)

      queryStartDate = `${currentYear - (currentMonth < 11 ? 1 : 0)}-${(currentMonth + 1)
        .toString()
        .padStart(2, "0")}-01`;
      queryEndDate = `${currentYear}-${(currentMonth + 1).toString().padStart(2, "0")}-01`;

      newCategories = Array.from(
        { length: 12 },
        (_, i) =>
          `${currentYear - (i < currentMonth ? 1 : 0)}-${(currentMonth - i + 12)
            .toString()
            .padStart(2, "0")}`
      );
      newSeries = [
        { name: "매출액", data: Array(12).fill(500000) }, // 예시 데이터를 넣음
      ];
    }

    if (selectedPeriod === "사용자 지정") {
      queryStartDate = startDate;
      queryEndDate = endDate;
    }

    // 차트 옵션 설정
    setChartOptions({
      ...chartOptions,
      xaxis: {
        categories: newCategories, // Updated categories based on period
      },
      series: newSeries, // Updated series based on period
    });

    // 예시 데이터를 metricsData에 설정
    setMetricsData([
      { title: "평균 고객 수", value: "250명", category: "모든 상품" },
      { title: "월 평균 매출액", value: "2,400,000원", category: "모든 상품" },
      { title: "총 합계", value: "2,700,000원", category: "모든 상품" },
      { title: "전월 대비", value: "+500,000원", category: "모든 상품" },
    ]);
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

      <Form>
        <HeadingContainer1>
          <HeadingDataAndSave>
            <Option1>
              <Title1>기간</Title1>
              <Select onChange={e => setSelectedPeriod(e.target.value)} value={selectedPeriod}>
                <option value="연간">연간</option>
                <option value="분기별">분기별</option>
                <option value="월별">월별</option>
                <option value="사용자 지정">사용자 지정</option>
              </Select>
            </Option1>
            <Option2>
              <Title2>기간 상세</Title2>
              {selectedPeriod === "사용자 지정" ? (
                <DateRow>
                  <CustomDatepicker
                    useRange={false}
                    asSingle={true}
                    value={value}
                    onChange={newValue => setValue(newValue)}
                  />
                  <CustomDatepicker
                    useRange={false}
                    asSingle={true}
                    value={value}
                    onChange={newValue => setValue(newValue)}
                  />
                </DateRow>
              ) : (
                <DateRow>
                  <CustomDatepicker
                    useRange={false}
                    asSingle={true}
                    value={value}
                    onChange={newValue => setValue(newValue)}
                    disabled={true} // 비활성화 처리
                  />
                  <CustomDatepicker
                    useRange={false}
                    asSingle={true}
                    value={value}
                    onChange={newValue => setValue(newValue)}
                    disabled={true} // 비활성화 처리
                  />
                </DateRow>
              )}
            </Option2>

            <Option3>
              <Title3>카테고리:</Title3>
              <Select onChange={e => setCategory(e.target.value)} value={category}>
                <option value="음료">음료</option>
                <option value="식품">식품</option>
                <option value="의류">의류</option>
              </Select>
            </Option3>

            <CustomButton type="button" onClick={handleQuery} style={{ marginLeft: "50px" }}>
              조회
            </CustomButton>
          </HeadingDataAndSave>
        </HeadingContainer1>

        <Title4>매출 현황</Title4>
        <MetricsRow>
          {metricsData.map((metric, index) => (
            <MetricBox key={index}>
              <MetricTitle>{metric.title}</MetricTitle>
              <MetricValue>{metric.value}</MetricValue>
              <MetricCategory>{metric.category}</MetricCategory>
            </MetricBox>
          ))}
        </MetricsRow>

        {/* 전체 상품 데이터 테이블 */}
        <SalesTable>
          <TableHeader>
            <TableColumn>상품명</TableColumn>
            <TableColumn>수량</TableColumn>
            <TableColumn>매출합계</TableColumn>
            <TableColumn>전월대비</TableColumn>
            <TableColumn>전월대비 금액</TableColumn>
          </TableHeader>
          {/* 예시 데이터를 테이블에 렌더링 */}
          <TableRow>
            <TableCell>콜라</TableCell>
            <TableCell>50</TableCell>
            <TableCell>500,000원</TableCell>
            <TableCell>+5%</TableCell>
            <TableCell>25,000원</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>사이다</TableCell>
            <TableCell>30</TableCell>
            <TableCell>300,000원</TableCell>
            <TableCell>-2%</TableCell>
            <TableCell>-5,000원</TableCell>
          </TableRow>
        </SalesTable>
      </Form>

      <GraphContainer>
        <div id="line-chart" ref={chartRef}></div> {/* chartRef를 div에 연결 */}
      </GraphContainer>
    </Wrapper>
  );
};

// 스타일링 부분
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
  width: 100%;
  height: 120px;
  background-color: #f2f2f2;
`;

const Heading = styled.h2`
  font-size: 24px;
  text-align: center;
  flex-grow: 1;
`;

const Title1 = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
`;

const Title2 = styled.div`
  font-size: 20px;
  width: 200px;
  margin-bottom: 10px;
  margin-left: 40px;
`;

const Title3 = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
`;

const Title4 = styled.div`
  font-size: 20px;
  margin-top: 30px;
  margin-left: 20px;
`;

const Select = styled.select`
  padding: 5px;
  border-radius: 5px;
  position: relative;
  z-index: 10;
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
  justify-content: center;
  text-align: center;
  algin-items: center;
  margin-right: 30px;
`;

const Option3 = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 50px;
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
  font-size: 18px;
`;

const MetricCategory = styled.div`
  font-size: 12px;
  color: gray;
`;

const SalesTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  margin-bottom: 50px;
`;

const TableHeader = styled.tr`
  background-color: #f2f2f2;
`;

const TableColumn = styled.th`
  padding: 10px;
  text-align: center;
  border: 1px solid #ddd;
`;

const TableRow = styled.tr``;

const TableCell = styled.td`
  padding: 10px;
  text-align: center;
  border: 1px solid #ddd;
`;

const DateRow = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
`;

const CustomDatepicker = () => {
  return <input type="date" />; // 유효한 JSX 반환
};

const BoldText = styled.span`
  font-weight: bold;
`;

const GraphContainer = styled.div`
  flex-grow: 1; /* 나머지 공간을 차지 */
  display: flex;
  justify-content: center; /* 중앙 정렬 */
  align-items: flex-end; /* 하단 정렬 */
  padding-bottom: 50px;
  width: 1000px;
`;

const options = {
  chart: {
    type: "line",
    height: "350px",
    width: "900px",
  },
  series: [
    {
      name: "매출1",
      data: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200], // 12개의 데이터 추가
    },
    {
      name: "매출2",
      data: [50, 150, 250, 350, 450, 550, 650, 750, 850, 950, 1050, 1150], // 12개의 데이터 추가
    },
  ],
  xaxis: {
    categories: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
  },
  yaxis: {
    title: {
      text: "매출액",
    },
  },
};

export default SalesAnalysis;
