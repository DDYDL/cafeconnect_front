// Yearly.js
import { Accordion, AccordionBody, AccordionHeader } from "@material-tailwind/react";
import axios from "axios";
import { useAtomValue } from "jotai/react";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { tokenAtom } from "../../atoms";
import { axiosInToken, url } from "../../config.js";

const Monthly = ({ storeCode }) => {
  const [salesData, setSalesData] = useState([]);
  const [analysis, setAnalysis] = useState([{}]);
  const [menuCategory, setMenuCategory] = useState([]);
  const [open, setOpen] = React.useState(0);
  const token = useAtomValue(tokenAtom);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
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

  // useEffect(() => {
  //   const fetchData = () => {
  //     axiosInToken(token)
  //       .get(`monthlyAnalysis/${storeCode}`)
  //       .then(res => {
  //         const groupedData = res.data.reduce((acc, item) => {
  //           const { menuName, price, monthValue, salesCount, menuCategoryName } = item;

  //           // 카테고리별로 처리
  //           if (!acc[menuCategoryName]) {
  //             acc[menuCategoryName] = {};
  //           }

  //           if (!acc[menuCategoryName][menuName]) {
  //             acc[menuCategoryName][menuName] = {
  //               price,
  //               monthValue,
  //               salesCount,
  //             };
  //           }

  //           // 월별 판매 수량 누적 처리
  //           if (monthValue === 7) acc[menuCategoryName][menuName][7] += salesCount || 0;
  //           if (monthValue === 8) acc[menuCategoryName][menuName][7] += salesCount || 0;
  //           if (monthValue === 9) acc[menuCategoryName][menuName][7] += salesCount || 0;
  //           if (monthValue === 10) acc[menuCategoryName][menuName][7] += salesCount || 0;
  //           if (monthValue === 11) acc[menuCategoryName][menuName][7] += salesCount || 0;
  //           if (monthValue === 12) acc[menuCategoryName][menuName][7] += salesCount || 0;

  //           // 2024년 판매 금액 계산 (판매 수량 * 가격)
  //           if (monthValue === 12) {
  //             acc[menuCategoryName][menuName].salesAmount12 += (salesCount || 0) * price || 0;
  //           }

  //           return acc;
  //         }, {});

  //         // 그룹화된 데이터 확인
  //         console.log("groupedData" + JSON.stringify(groupedData));

  //         setSalesData(groupedData); // 카테고리별로 상품 데이터 설정

  //         // 총 판매 수량과 금액 계산 (2024년 기준)
  //         let totalQuantity2024 = 0;
  //         let totalRevenue2024 = 0;

  //         Object.values(groupedData).forEach(category => {
  //           Object.values(category).forEach(item => {
  //             totalQuantity2024 += item[2024] || 0;
  //             totalRevenue2024 += item.salesAmount12 || 0; // 2024년 판매 금액 누적
  //           });
  //         });

  //         setTotalQuantity(totalQuantity2024); // 총 판매 수량 설정
  //         setTotalRevenue(totalRevenue2024); // 총 판매 금액 설정
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   };

  useEffect(() => {
    const fetchData = () => {
      axiosInToken(token)
        .get(`monthlyAnalysis/${storeCode}`)
        .then(res => {
          const groupedData = res.data.reduce((acc, item) => {
            const { menuName, price, monthValue, salesCount, menuCategoryName } = item;

            // 카테고리별로 처리
            if (!acc[menuCategoryName]) {
              acc[menuCategoryName] = {};
            }

            if (!acc[menuCategoryName][menuName]) {
              // 월별 기본값을 설정 (7월부터 12월까지 초기화)
              acc[menuCategoryName][menuName] = {
                menuName,
                price,
                salesCountByMonth: { 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0 },
                salesAmountByMonth: { 12: 0 },
              };
            }

            // 월별 판매 수량 누적 처리
            if (monthValue >= 7 && monthValue <= 12) {
              acc[menuCategoryName][menuName].salesCountByMonth[monthValue] += salesCount || 0;
            }

            // 12월 판매 금액 계산 (판매 수량 * 가격)
            if (monthValue === 12) {
              acc[menuCategoryName][menuName].salesAmountByMonth[12] +=
                (salesCount || 0) * price || 0;
            }

            return acc;
          }, {});

          // 그룹화된 데이터 확인
          console.log("groupedData", groupedData);

          setSalesData(groupedData); // 카테고리별로 상품 데이터 설정

          // 총 판매 수량과 금액 계산 (2024년 기준)
          let totalQuantity2024 = 0;
          let totalRevenue2024 = 0;

          Object.values(groupedData).forEach(category => {
            Object.values(category).forEach(item => {
              // 월별 판매 수량과 금액 계산
              totalQuantity2024 += item.salesCountByMonth[12] || 0;
              totalRevenue2024 += item.salesAmountByMonth[12] || 0; // 2024년 판매 금액 누적
            });
          });

          setTotalQuantity(totalQuantity2024); // 총 판매 수량 설정
          setTotalRevenue(totalRevenue2024); // 총 판매 금액 설정
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
        <Title4>매출 현황(당월)</Title4>

        {/* 3개의 박스 추가 */}
        <SummaryRow>
          <SummaryBox>
            <SummaryTitle>총 판매 수량</SummaryTitle>
            <SummaryValue>{totalQuantity.toLocaleString()}개</SummaryValue>
            <SummaryCategory>모든 상품</SummaryCategory>
          </SummaryBox>
          <SummaryBox>
            <SummaryTitle>총 판매 금액</SummaryTitle>
            <SummaryValue>{totalRevenue.toLocaleString()}원</SummaryValue>
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
                    <TableColumn style={{ width: "30%" }}>상품명</TableColumn>
                    <TableColumn>7월</TableColumn>
                    <TableColumn>8월</TableColumn>
                    <TableColumn>9월</TableColumn>
                    <TableColumn>10월</TableColumn>
                    <TableColumn>11월</TableColumn>
                    <TableColumn>12월</TableColumn>
                    <TableColumn>차이</TableColumn>
                  </TableRow>
                </thead>
                <tbody>
                  {Object.values(salesData[category.menuCategoryName] || {}).length > 0 ? (
                    Object.values(salesData[category.menuCategoryName] || {}).map((data, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{data.menuName}</TableCell>
                        <TableCell>{data.salesCountByMonth[7] || "-"}</TableCell> {/* 7월 */}
                        <TableCell>{data.salesCountByMonth[8] || "-"}</TableCell> {/* 8월 */}
                        <TableCell>{data.salesCountByMonth[9] || "-"}</TableCell> {/* 9월 */}
                        <TableCell>{data.salesCountByMonth[10] || "-"}</TableCell> {/* 10월 */}
                        <TableCell>{data.salesCountByMonth[11] || "-"}</TableCell> {/* 11월 */}
                        <TableCell>{data.salesCountByMonth[12] || "-"}</TableCell> {/* 12월 */}
                        <TableCell>
                          {data.salesCountByMonth[12] - data.salesCountByMonth[11] || "-"}
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
  // margin-top: 10px;
  margin-bottom: 10px;
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

export default Monthly;
