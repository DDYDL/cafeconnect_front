import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ko } from "date-fns/locale/ko";

import ApexCharts from "apexcharts"; // ApexCharts 임포트
import axios from "axios";
import { useAtomValue } from "jotai/react";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { tokenAtom } from "../../atoms";
import { axiosInToken, url } from "../../config.js";
import { CustomButton } from "../styledcomponent/Button.style";
import { ContentListDiv } from "../styles/StyledStore.tsx";
import Customize from "./Customize.js";
import Monthly from "./Monthly.js";
import Quarterly from "./Quarterly.js";
import Yearly from "./Yearly.js";

const SalesAnalysis = () => {
  const [title, setTitle] = useState(""); // 제목 상태
  const [content, setContent] = useState(""); // 내용 상태
  const [selectedPeriod, setSelectedPeriod] = useState(); // 선택된 기간
  const [startDate, setStartDate] = useState(""); // 시작일
  const [endDate, setEndDate] = useState(""); // 종료일
  const [category, setCategory] = useState(""); // 선택된 카테고리
  const [metricsData, setMetricsData] = useState([]); // 지표 데이터
  const [majorCategory, setMajorCategory] = useState([]);
  const [middleCategory, setMiddleCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [analysis, setAnalysis] = useState([]);
  const [salesData, setSalesData] = useState("");

  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  }); // 날짜 범위 상태
  const chartRef = useRef(null); // 차트 참조용 useRef
  const [storeCode, setStoreCode] = useState(null);
  const [chartOptions, setChartOptions] = useState(options); // 차트 옵션 상태
  const token = useAtomValue(tokenAtom);

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
      const response = await axiosInToken(token).get(`/itemRevenue`);
      const formattedData = response.data.map(ask => ({
        ...ask,
        askDate: new Date(ask.askDate).toLocaleDateString("ko-KR"),
      }));
      setAnalysis(formattedData);
    } catch (err) {
      console.error("컴플레인 리스트 요청 중 오류 발생:", err);
    }
  };

  // useEffect는 그대로 유지
  useEffect(() => {
    fetchStoreCode();
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [token, storeCode]);

  //최초 카테고리 리스트 가져오기
  const getItemCategory = () => {
    axios
      .get(`${url}/selectCategory`)
      .then(res => {
        console.log("Category Data:", res.data);
        if (res.data && res.data.major) {
          setMajorCategory(res.data.major);
        } else {
          console.log("카테고리 데이터가 없습니다.");
        }
      })
      .catch(err => {
        console.log("데이터 오류:", err);
      });
  };

  useEffect(() => {
    getItemCategory(); // 컴포넌트가 처음 렌더링될 때 한 번만 호출
  }, []); // 빈 배열을 두 번째 인자로 전달하여 한 번만 호출되도록 설정

  // 차트 렌더링
  useEffect(() => {
    if (chartRef.current && typeof ApexCharts !== "undefined") {
      const existingChart = ApexCharts.getChartByID("line-chart");
      if (existingChart) {
        existingChart.destroy();
      }

      const chart = new ApexCharts(chartRef.current, chartOptions); // chartRef 사용
      chart.render();
    }
  }, [chartOptions]);

  // 데이터 가져오는 함수 (API 요청 예시)
  const fetchMetricsData = async () => {
    try {
      // API 요청 (필터 파라미터로 데이터를 가져옴)
      const response = await axios.post("/api/salesData", {
        selectedPeriod,
        startDate,
        endDate,
        category,
      });
      setMetricsData(response.data); // 받아온 데이터를 metricsData에 저장
    } catch (error) {
      console.error("데이터 요청 중 오류 발생:", error);
    }
  };

  // 데이터 조회 버튼 클릭 시 호출되는 함수
  const handleQuery = () => {
    fetchMetricsData(); // 선택한 필터에 맞는 데이터를 가져옴
  };

  const renderPeriodComponent = () => {
    switch (selectedPeriod) {
      case "연간":
        return <Yearly />;
      case "월별":
        return <Monthly />;
      case "분기별":
        return <Quarterly />;
      case "사용자 지정":
        return <Customize />;
      default:
    }
  };

  useEffect(() => {}, [selectedPeriod]);

  return (
    <ContentListDiv>
      <HeadingContainer>
        <Heading>매출 분석</Heading>
      </HeadingContainer>

      <Form>
        <HeadingContainer1>
          <HeadingDataAndSave>
            <Option1>
              <Label>기간</Label> {/* 기간 텍스트 추가 */}
              <Select onChange={e => setSelectedPeriod(e.target.value)} value={selectedPeriod}>
                <option value="기간 선택">기간 선택</option> {/* 기본값으로 "기간 선택"을 표시 */}
                <option value="연간">연간</option>
                <option value="분기별">분기별</option>
                <option value="월별">월별</option>
                <option value="사용자 지정">사용자 지정</option>
              </Select>
            </Option1>

            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
              <Option2>
                <DatePicker
                  slotProps={{ textField: { size: "small" } }}
                  label="연-월-일"
                  format="yyyy-MM-dd"
                  value={startDate}
                  onChange={newValue => setStartDate(new Date(newValue))}
                  disabled={
                    selectedPeriod === "기간 선택" ||
                    selectedPeriod === "연간" ||
                    selectedPeriod === "분기별" ||
                    selectedPeriod === "월별"
                  }
                />
                <span style={{ margin: "0 8px" }}> ~ </span>
                <DatePicker
                  slotProps={{ textField: { size: "small" } }}
                  label="연-월-일"
                  format="yyyy-MM-dd"
                  value={endDate}
                  onChange={newValue => setEndDate(new Date(newValue))}
                  disabled={
                    selectedPeriod === "기간 선택" ||
                    selectedPeriod === "연간" ||
                    selectedPeriod === "분기별" ||
                    selectedPeriod === "월별"
                  }
                />
              </Option2>
            </LocalizationProvider>

            <Option3>
              {/* <Title3>카테고리</Title3> */}
              <Select onChange={e => setCategory(e.target.value)} value={category}>
                <option value="">카테고리 선택</option>
                {majorCategory.map((category, index) => (
                  <option key={index} value={category.id}>
                    {category.itemCategoryName}
                  </option>
                ))}
              </Select>
            </Option3>

            <CustomButtonContainer>
              <CustomButton type="button" onClick={handleQuery}>
                조회
              </CustomButton>
            </CustomButtonContainer>
          </HeadingDataAndSave>
        </HeadingContainer1>
      </Form>

      {/* 기간에 맞는 컴포넌트 렌더링 */}
      {renderPeriodComponent()}

      {/* 차트 */}
      <GraphContainer>
        <div id="line-chart" ref={chartRef}></div>
      </GraphContainer>
    </ContentListDiv>
  );
};

const Form = styled.form`
  // height: 669px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  width: 100%;
`;

const CustomButtonContainer = styled.div`
  margin-left: auto; /* 왼쪽 여백을 최대한 추가하여 오른쪽으로 정렬 */
  display: flex;
  align-items: center;
  height: 100%; /* 부모 높이에 맞춤 */
  padding-bottom: 10px;
`;

const Label = styled.label`
  display: flex;
  font-size: 16px;
  margin-left: 5px;
  font-weight: bold;
  margin-bottom: 8px; /* Select와 간격 조정 */
  color: #333;
`;

const Navigation = styled.div`
  font-size: 10px;
  position: absolute;
  right: 0;
`;

const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  // margin-bottom: 38px;
  margin-bottom: 60px;
`;

const HeadingContainer1 = styled.div`
  display: flex;
  justify-content: flex-left;
  // align-items: center;
  margin-bottom: 15px;
  // width: 100%;
`;

const HeadingDataAndSave = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-right: 30px;
  padding-left: 20px;
  width: 1000px;
  height: 120px;
  border-radius: 5px;

  background-color: #f2f2f2;
`;

const Heading = styled.h2`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  flex-grow: 1;
`;

const Title1 = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
`;

const Title2 = styled.div`
  font-size: 20px;
  width: 200px;
  margin-bottom: 10px;
  margin-left: 40px;
`;

const Title3 = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
`;

const Title4 = styled.div`
  display: flex;
  justify-content: left;
  font-size: 20px;
  margin-top: 30px;
  margin-left: 20px;
`;

const Separator = styled.span`
  margin: 0 8px; /* 왼쪽과 오른쪽 공백 추가 */
  font-size: 16px; /* 적절한 글자 크기 설정 */
  color: #333; /* 글자 색상 */
  display: flex;
  align-items: center; /* 세로 정렬 */
`;

const Select = styled.select`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 5px;
  position: relative;
  font-size: 12px;
  height: 38px;
`;

const Option1 = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  margin-bottom: 30px;
  width: 120px;
`;

const Option2 = styled.div`
  position: relative; /* 부모 컨테이너를 상대적 위치로 설정 */
  width: 380px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const Option3 = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 50px;
  margin-bottom: 10px;
  width: 130px;
`;

const FirstBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
`;

const MetricsRow = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px;
  margin-bottom: 20px;
  gap: 30px;
`;

const MetricBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-around;
  border-radius: 5px;
  width: 180px;
  height: 100px;
  padding-left: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
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
    // width: "900px",
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
