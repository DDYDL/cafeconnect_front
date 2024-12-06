// Yearly.js
import { Accordion, AccordionBody, AccordionHeader } from "@material-tailwind/react";
import axios from "axios";
import { useAtomValue } from "jotai/react";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { tokenAtom } from "../../atoms";
import { axiosInToken, url } from "../../config.js";

const Customize = ({ storeCode, startDate, endDate }) => {
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

  const formattedStartDate = new Date(startDate).toISOString().split("T")[0]; // YYYY-MM-DD
  const formattedEndDate = new Date(endDate).toISOString().split("T")[0]; // YYYY-MM-DD

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
        .get(`customAnalysis/${storeCode}`, {
          params: {
            startDate: formattedStartDate,
            endDate: formattedEndDate,
          },
        })
        .then(res => {
          const groupedData = res.data.reduce((acc, item) => {
            const { menuName, menuCategoryName, salesCount, price } = item;

            // 카테고리 이름 없으면, 새로 생성
            if (!acc[menuCategoryName]) {
              acc[menuCategoryName] = {};
            }

            // 카테고리 안에 menuName 없으면 새로운 객체 생성
            if (!acc[menuCategoryName][menuName]) {
              acc[menuCategoryName][menuName] = {
                menuName,
                salesCount,
                price,
              };
            }
            // 수량과 금액 합산
            acc[menuCategoryName][menuName].salesCount += salesCount;
            acc[menuCategoryName][menuName].price += price * salesCount; // 금액은 가격 * 수량으로 계산

            return acc;
          }, {});

          // 그룹화된 데이터 확인
          console.log("groupedData" + JSON.stringify(groupedData));

          setSalesData(groupedData); // 카테고리별로 상품 데이터 설정

          // 총 합계 계산
          let totalQuantity = 0;
          let totalRevenue = 0;
          Object.values(groupedData).forEach(category => {
            Object.values(category).forEach(item => {
              totalQuantity += item.salesCount;
              totalRevenue += item.price;
            });
          });

          setTotalQuantity(totalQuantity); // 총 판매 수량 설정
          setTotalRevenue(totalRevenue); // 총 판매 금액 설정
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
        <Title4>매출 현황(사용자 지정)</Title4>

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
                    <TableColumn style={{ width: "70%" }}>상품명</TableColumn>
                    <TableColumn style={{ width: "15%" }}>합계 수량</TableColumn>
                    <TableColumn style={{ width: "15%" }}>합계 금액</TableColumn>
                  </TableRow>
                </thead>
                <tbody>
                  {Object.values(salesData[category.menuCategoryName] || {}).length > 0 ? (
                    Object.values(salesData[category.menuCategoryName] || {}).map((data, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{data.menuName}</TableCell>
                        <TableCell>{data.salesCount}</TableCell>
                        <TableCell>{data.price.toLocaleString()}</TableCell>
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

export default Customize;
