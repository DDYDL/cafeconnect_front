import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ApexCharts from "apexcharts"; // ApexCharts 임포트
import axios from "axios";
import { ko } from "date-fns/locale/ko";
import { useAtomValue } from "jotai/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
  const [periodType, setPeriodType] = useState(""); // 선택된 기간
  const [startDate, setStartDate] = useState(null); // 시작일
  const [endDate, setEndDate] = useState(null); // 종료일
  const [menuCategoryNum, setMenuCategoryNum] = useState(""); // 선택된 카테고리
  const [analysisData, setAnalysisData] = useState([]);
  const chartRef = useRef(null); // 차트 참조용 useRef
  const [storeCode, setStoreCode] = useState(null);
  const [chartOptions, setChartOptions] = useState(options); // 차트 옵션 상태
  const token = useAtomValue(tokenAtom);
  const [renderedComponent, setRenderedComponent] = useState(null);
  const [majorCategory, setMajorCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 최초 카테고리 리스트 가져오기
  const getItemCategory = () => {
    axios
      .get(`${url}/selectCategory`)
      .then(res => {
        if (res.data && res.data.major) {
          setMajorCategory(res.data.major);
        }
      })
      .catch(err => {
        console.error("카테고리 데이터 오류:", err);
      });
  };

  const fetchStoreCode = useCallback(async () => {
    if (!token) return;
    try {
      const response = await axiosInToken(token).get("/store");
      const storeCodeFromResponse = response.data?.storeCode;
      setStoreCode(storeCodeFromResponse);
    } catch (err) {
      console.error("storeCode 요청 중 오류 발생:", err);
    }
  }, [token]);

  useEffect(() => {
    console.log("storeCode 랜더링 됨: ", storeCode);
  }, [storeCode]);

  useEffect(() => {
    fetchStoreCode();
  }, [fetchStoreCode]);

  useEffect(() => {
    getItemCategory(); // 카테고리 데이터 가져오기
  }, []);

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

  const handleQuery = () => {
    setIsLoading(true); // 조회 버튼 클릭 시 로딩 상태로 설정
    setAnalysisData([]); // 예시: analysisData 초기화

    const component = renderPeriodComponent();
    setRenderedComponent(component); // 상태에 저장하여 렌더링

    // 여기서 데이터를 가져오는 비동기 작업을 실행하고, 끝난 후에 버튼 초기화
    // 예시로 setTimeout을 사용하여 데이터 로딩 완료 후 버튼 초기화
    setTimeout(() => {
      setIsLoading(false); // 조회 완료 후 버튼 초기화
    }, 2000); // 예시로 2초 후에 완료 처리
  };

  // 기간별 컴포넌트 렌더링
  const renderPeriodComponent = () => {
    switch (periodType) {
      case "1":
        return <Yearly storeCode={storeCode} />;
      case "2":
        return <Quarterly storeCode={storeCode} />;
      case "3":
        return <Monthly storeCode={storeCode} />;
      case "4":
        return <Customize storeCode={storeCode} startDate={startDate} endDate={endDate} />;
      default:
        return null;
    }
  };

  return (
    <ContentListDiv>
      <HeadingContainer>
        <Heading>매출 분석</Heading>
      </HeadingContainer>

      <Form>
        <HeadingContainer1>
          <HeadingDataAndSave>
            <Option1>
              <Label>기간</Label>
              <Select onChange={e => setPeriodType(e.target.value)} value={periodType}>
                <option value="">기간 선택</option>
                <option value="1">연간</option>
                <option value="2">분기별</option>
                <option value="3">월별</option>
                <option value="4">사용자 지정</option>
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
                  disabled={periodType !== "4"}
                />
                <span style={{ margin: "0 8px" }}> ~ </span>
                <DatePicker
                  slotProps={{ textField: { size: "small" } }}
                  label="연-월-일"
                  format="yyyy-MM-dd"
                  value={endDate}
                  onChange={newValue => setEndDate(new Date(newValue))}
                  disabled={periodType !== "4"}
                />
              </Option2>
            </LocalizationProvider>

            <CustomButtonContainer>
              <CustomButton
                type="button"
                onClick={handleQuery}
                disabled={isLoading} // 로딩 중이면 버튼 비활성화
              >
                {isLoading ? "로딩 중..." : "조회"}
              </CustomButton>
            </CustomButtonContainer>
          </HeadingDataAndSave>
        </HeadingContainer1>
      </Form>

      {/* 렌더링된 컴포넌트 */}
      {renderedComponent}
      {/* <GraphContainer>
        <div id="line-chart" ref={chartRef}></div>
      </GraphContainer> */}
    </ContentListDiv>
  );
};

const NoDataMessage = styled.div`
  font-size: 20px;
  color: #333;
  text-align: center;
  margin-top: 50px;
`;

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
