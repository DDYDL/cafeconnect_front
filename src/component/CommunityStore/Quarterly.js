// Yearly.js
import { Accordion, AccordionBody, AccordionHeader } from "@material-tailwind/react";
import axios from "axios";
import { useAtomValue } from "jotai/react";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { tokenAtom } from "../../atoms";
import { axiosInToken, url } from "../../config.js";

const Quarterly = ({ storeCode }) => {
  const [salesData, setSalesData] = useState([]);
  const [analysis, setAnalysis] = useState([{}]);
  const [menuCategory, setMenuCategory] = useState([]);
  const [open, setOpen] = React.useState(0);
  const token = useAtomValue(tokenAtom);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalSum2024, settotalSum2024] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalRevenue2023, setTotalRevenue2023] = useState(0);
  const handleOpen = value => {
    setOpen(prevOpen => (prevOpen === value ? 0 : value));
  };

  // menu category 가져오기
  const getMenuCategory = () => {
    axios
      .get(`${url}/selectMenuCategory`)
      .then(res => {
        console.log(res.data);
        setMenuCategory(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMenuCategory(); // 카테고리 데이터 가져오기
  }, []);

  useEffect(() => {
    const fetchData = () => {
      axiosInToken(token)
        .get(`quarterlyAnalysis/${storeCode}`)
        .then(res => {
          const groupedData = res.data.reduce((acc, item) => {
            const { menuName, salesDate, salesCount, quarter, price, menuCategoryName } = item;

            const validPrice = price || 0; // 가격이 없으면 0으로 처리
            // salesDate를 Date 객체로 변환하여 연도 추출
            const salesDateObj = new Date(salesDate);
            const year = salesDateObj.getFullYear(); // 연도 추출

            if (!acc[menuCategoryName]) {
              acc[menuCategoryName] = {};
            }

            if (!acc[menuCategoryName][menuName]) {
              acc[menuCategoryName][menuName] = {
                menuName,
                salesDate,
                salesCount: { 1: 0, 2: 0, 3: 0, 4: 0 },
                quarter,
                price: validPrice,
                menuCategoryName,
                salesAmount2023: { 1: 0, 2: 0, 3: 0, 4: 0 },
                salesAmount2024: { 1: 0, 2: 0, 3: 0, 4: 0 },
                totalSum2024: 0, // totalSum2024 필드를 추가
              };
            }

            // 분기별 판매 수량 누적
            if (salesCount) {
              acc[menuCategoryName][menuName].salesCount[quarter] += salesCount;
            }

            // 2023년 4분기 판매 금액 계산
            if (quarter === 4 && year === 2023) {
              acc[menuCategoryName][menuName].salesAmount2023[4] += salesCount || 0;
            }

            // 2024년 총 판매 수량
            if (year === 2024) {
              acc[menuCategoryName][menuName].salesCount2024 += salesCount || 0;

              // 2024년 상품 가격 * 수량으로 totalSum2024 계산
              acc[menuCategoryName][menuName].totalSum2024 += validPrice * salesCount;
            }

            // 2024년 총 판매 수량
            if (year === 2024) {
              acc[menuCategoryName][menuName].salesCount2024 += salesCount || 0;
            }

            return acc;
          }, {});

          // groupedData 확인
          console.log("groupedData1", groupedData);

          setSalesData(groupedData); // 카테고리별로 상품 데이터 설정

          // 총 판매 수량 및 금액 계산 (2024년 기준)
          let totalQuantity2024 = 0;
          let totalSum2024 = 0;
          let totalRevenue2024 = 0;
          let totalRevenue2023 = 0; // 2023년 총 판매 금액

          Object.values(groupedData).forEach(category => {
            Object.values(category).forEach(item => {
              totalQuantity2024 += Object.values(item.salesCount).reduce((a, b) => a + b, 0);
              // totalSum2024 += Object.values(item.price).reduce((a, b) => a + b, 0);

              totalSum2024 += item.totalSum2024 || 0; // totalSum2024 누적

              totalRevenue2024 += item.salesAmount2024[4] || 0; // 2024년 판매 금액 누적
              totalRevenue2023 += item.salesAmount2023[4] || 0; // 2023년 판매 금액 누적

              console.log("groupedData2", groupedData);
            });
          });

          settotalSum2024(totalSum2024);
          setTotalQuantity(totalQuantity2024); // 총 판매 수량 설정
          setTotalRevenue(totalRevenue2024); // 총 2024년 판매 금액 설정
          setTotalRevenue2023(totalRevenue2023); // 총 2023년 판매 금액 설정

          console.log("totalRevenue" + JSON.stringify(totalRevenue));
        })
        .catch(err => {
          console.log(err);
        });
    };

    if (token != null && token !== "") fetchData();
  }, [token, storeCode]);

  function Icon({ id, open }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className={`${open === id ? "rotate-180" : ""} h-5 w-5 transition-transform`}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    );
  }

  return (
    <>
      <FirstBody>
        <Title4>매출 현황 (현재 분기)</Title4>

        {/* 3개의 박스 추가 */}
        <SummaryRow>
          <SummaryBox>
            <SummaryTitle>총 판매 수량</SummaryTitle>
            <SummaryValue>{totalQuantity.toLocaleString()}개</SummaryValue>
            <SummaryCategory>모든 상품</SummaryCategory>
          </SummaryBox>
          <SummaryBox>
            <SummaryTitle>총 판매 금액</SummaryTitle>
            <SummaryValue>{totalSum2024.toLocaleString()}원</SummaryValue>
            <SummaryCategory>모든 상품</SummaryCategory>
          </SummaryBox>
        </SummaryRow>
      </FirstBody>

      <StyledAccordionContainer>
        {menuCategory.map((category, index) => (
          <Accordion key={category.menuCategoryName} open={open === index}>
            <StyledAccordionHeader onClick={() => handleOpen(index)}>
              {category.menuCategoryName}
            </StyledAccordionHeader>
            <StyledAccordionBody>
              <SalesTable>
                <thead>
                  <TableRow style={{ backgroundColor: "#DEDEDE" }}>
                    <TableColumn>상품명</TableColumn>
                    <TableColumn>1분기</TableColumn>
                    <TableColumn>2분기</TableColumn>
                    <TableColumn>3분기</TableColumn>
                    <TableColumn>4분기(2024)</TableColumn>
                    <TableColumn>4분기(2023)</TableColumn>
                    <TableColumn>차이(2024-2023)</TableColumn>
                  </TableRow>
                </thead>
                <tbody>
                  {Object.values(salesData[category.menuCategoryName] || {}).length > 0 ? (
                    Object.values(salesData[category.menuCategoryName] || {}).map((data, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{data.menuName}</TableCell>
                        <TableCell>{data.salesCount[1] || "-"}</TableCell>
                        <TableCell>{data.salesCount[2] || "-"}</TableCell>
                        <TableCell>{data.salesCount[3] || "-"}</TableCell>
                        <TableCell>{data.salesCount[4] || "-"}</TableCell>
                        <TableCell>{data.salesAmount2023[4] || "-"}</TableCell>
                        <TableCell>
                          {data.salesAmount2023[4] - data.salesAmount2024[4] || "-"}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan="5" style={{ textAlign: "center" }}>
                        데이터가 없습니다
                      </TableCell>
                    </TableRow>
                  )}
                </tbody>
              </SalesTable>
            </StyledAccordionBody>
          </Accordion>
        ))}
      </StyledAccordionContainer>
    </>
  );
};

const StyledAccordionContainer = styled.div`
  // width: 1000px;
  // max-width: 600px; /* 최대 너비 설정 */
  // margin: 0 auto; /* 가운데 정렬 */

  width: 100%;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const StyledAccordionHeader = styled(AccordionHeader)`
  padding: 16px 32px;
  font-size: 18px;
  width: 100%;
`;

const StyledAccordionBody = styled(AccordionBody)`
  width: 100%;
  // padding: 10px;
  font-size: 16px;

  // transition: all 0.3s ease; /* 부드러운 애니메이션 추가 */
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
  gap: 80px;
  padding-top: 20px;
`;

const SummaryBox = styled.div`
  width: 230px;
  height: 110px;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const SummaryTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  padding-bottom: 5px;
`;

const SummaryValue = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
  color: #6366f1;
  padding-bottom: 5px;
`;

const SummaryCategory = styled.div`
  font-size: 14px;
  color: gray;
`;

const FirstBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
`;

const Title4 = styled.div`
  display: flex;
  justify-content: left;
  font-weight: bold;
  font-size: 18px;
  margin-top: 30px;
  margin-left: 32px;
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
  margin-bottom: 10px;
  overflow-x: auto; /* 가로 스크롤 추가 */
  display: block; /* 테이블을 블록 요소로 처리하여 스크롤이 가능하도록 설정 */
  white-space: nowrap; /* 테이블 셀 내 내용이 줄바꿈되지 않도록 설정 */
`;

const TableColumn = styled.th`
  padding: 10px;
  text-align: center; /* 추가 */
  // border-left: none;
  // &:last-child {
  //   border-right: none;
  // }
  width: 1000px;
  // width: ${({ width }) => width || "auto"}; /* 동적 width 처리 */
`;

const TableRow = styled.tr``;

const TableCell = styled.td`
  padding: 10px;
  text-align: center;
  border: 1px solid #ddd;
`;

export default Quarterly;
