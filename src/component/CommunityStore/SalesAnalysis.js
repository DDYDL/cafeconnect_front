import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ko } from "date-fns/locale/ko";
import { useAtomValue } from "jotai/react";
import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";
import styled from "styled-components";
import { memberAtom, tokenAtom } from "../../atoms";
import { axiosInToken } from "../../config.js";
import { StyledButton } from "../styledcomponent/button.tsx";
import { ContentListDiv } from "../styles/StyledStore.tsx";
import Customize from "./Customize.js";
import Monthly from "./Monthly.js";
import Quarterly from "./Quarterly.js";
import Yearly from "./Yearly.js";

const SalesAnalysis = () => {
  const [periodType, setPeriodType] = useState("year"); // 선택된 기간
  const [startDate, setStartDate] = useState(new Date()); // 시작일
  const [endDate, setEndDate] = useState(new Date()); // 종료일
  const [analyzeData, setAnalyzeData] = useState(null);
  const token = useAtomValue(tokenAtom);
  const [menuList, setMenuList] = useState([]);
  const store = useAtomValue(memberAtom);
  const [periodArr, setPeriodArr] = useState(null);

  const options = [
    { value: "year", label: "연간" },
    { value: "quart", label: "분기별" },
    { value: "month", label: "월별" },
    { value: "user", label: "사용자 지정" },
  ];

  const fetchSales = type => {
    if (!token) return;
    axiosInToken(token)
      .post("/sales", { storeCode: store.storeCode, period: type })
      .then(res => {
        console.log(res);
        setAnalyzeData({ ...res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const fetchSalesCustom = e => {
    e.preventDefault();
    if (!token) return;
    axiosInToken(token)
      .post("/salesCustom", {
        storeCode: store.storeCode,
        start: startDate.toISOString().split("T")[0],
        end: endDate.toISOString().split("T")[0],
      })
      .then(res => {
        console.log("res.data, fetchSalesCusom" + JSON.stringify(res.data));
        setAnalyzeData([...res.data]);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("useEffect");
    const getMenuList = () => {
      axiosInToken(token)
        .get("/menuList")
        .then(res => {
          console.log(res);
          setMenuList([...res.data]);
        })
        .catch(err => {
          console.log(err);
        });
    };
    if (token != null && token !== "") {
      getMenuList();
      fetchSales(periodType);
    }
  }, [token]);

  // 기간별 컴포넌트 렌더링
  const renderPeriodComponent = () => {
    if (menuList !== null && menuList.length !== 0 && analyzeData !== null) {
      switch (periodType) {
        case "year":
          return <Yearly menu={menuList} analyzeData={analyzeData} />;
        case "quart":
          return <Quarterly menu={menuList} analyzeData={analyzeData} />;
        case "month":
          return <Monthly menu={menuList} analyzeData={analyzeData} />;
        case "user":
          if (analyzeData !== null) return <Customize menu={menuList} analyzeData={analyzeData} />;
          else return null;
        default:
          return null;
      }
    } else {
      return null;
    }
  };

  const changeType = selectedOption => {
    setAnalyzeData(null);
    console.log("selectedOption.value" + selectedOption.value);

    setPeriodType(selectedOption?.value); // 선택이 없을 경우 기본값 처리

    if (selectedOption?.value !== "user") {
      fetchSales(selectedOption.value);
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
              <ReactSelect
                className="w-full CustomSelect"
                defaultValue={options[0]}
                options={options}
                onChange={changeType}
              ></ReactSelect>
            </Option1>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
              <Option2>
                <DatePicker
                  slotProps={{ textField: { size: "small" } }}
                  format="yyyy-MM-dd"
                  value={startDate}
                  onChange={newValue => setStartDate(new Date(newValue))}
                  disabled={periodType !== "user"}
                />
                <span style={{ margin: "0 8px" }}> ~ </span>
                <DatePicker
                  slotProps={{ textField: { size: "small" } }}
                  format="yyyy-MM-dd"
                  value={endDate}
                  onChange={newValue => setEndDate(new Date(newValue))}
                  disabled={periodType !== "user"}
                />
              </Option2>
            </LocalizationProvider>

            <CustomButtonContainer>
              <StyledButton
                size="sm"
                theme="brown"
                onClick={fetchSalesCustom}
                disabled={periodType !== "user"}
              >
                조회
              </StyledButton>
            </CustomButtonContainer>
          </HeadingDataAndSave>
        </HeadingContainer1>
      </Form>

      {renderPeriodComponent()}
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
  // padding-left: 200px;
`;

const CustomButtonContainer = styled.div`
  // margin-left: auto; /* 왼쪽 여백을 최대한 추가하여 오른쪽으로 정렬 */
  display: flex;
  align-items: center;
  height: 100%; /* 부모 높이에 맞춤 */
  padding-bottom: 10px;
  font-weight: bold;
`;

const HeadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 60px;
  // padding-left: 70px;
`;

const HeadingContainer1 = styled.div`
  display: flex;
  justify-content: flex-left;
  margin-bottom: 15px;
`;

const HeadingDataAndSave = styled.div`
  display: flex;
  // justify-content: flex-start;
  gap: 10px;
  justify-content: center;
  align-items: center;
  padding-right: 30px;
  padding-left: 20px;
  width: 1000px;
  height: 90px;
  border-radius: 5px;

  background-color: #f2f2f2;
`;

const Heading = styled.h2`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  flex-grow: 1;
`;

const Option1 = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  margin-bottom: 30px;
  padding-top: 20px;
  font-size: 15px;
  width: 160px;
  caret-color: transparent;
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

export default SalesAnalysis;
