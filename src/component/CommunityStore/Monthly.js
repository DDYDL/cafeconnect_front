// Yearly.js
import { Accordion, AccordionBody, AccordionHeader } from "@material-tailwind/react";
import { useAtomValue } from "jotai/react";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { tokenAtom } from "../../atoms";

const Monthly = ({ menu, analyzeData }) => {
  const [menuCategory, setMenuCategory] = useState([]);
  const [open, setOpen] = React.useState(0);
  const token = useAtomValue(tokenAtom);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const handleOpen = value => {
    setOpen(prevOpen => (prevOpen === value ? 0 : value));
  };

  useEffect(() => {
    const tmc = menu.map(x => x.menuCategoryName);
    const mn = tmc.filter((m, i) => tmc.indexOf(m) === i).map(c => ({ menuCategoryName: c }));
    console.log(mn);
    setMenuCategory(mn);
    console.log(analyzeData);
    if (analyzeData !== null) {
      const quart = analyzeData[Object.keys(analyzeData)[5]];
      let count = 0,
        amount = 0;
      quart.forEach(s => {
        count += s.salesCount;
        amount += s.salesAmount;
      });

      setTotalQuantity(count);
      setTotalRevenue(amount);
    }
  }, [menu, analyzeData]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textalign: "center",
        width: "1200px",
        marginLeft: "-110px", // 왼쪽으로 200px 이동
      }}
    >
      <FirstBody>
        <Title4>매출 현황(당월)</Title4>

        {/* 3개의 박스 추가 */}
        <SummaryRow>
          <SummaryBox>
            <SummaryTitle>총 판매 수량</SummaryTitle>
            <SummaryValue>{totalQuantity.toLocaleString()}개</SummaryValue>
          </SummaryBox>
          <SummaryBox>
            <SummaryTitle>총 판매 금액</SummaryTitle>
            <SummaryValue>{totalRevenue.toLocaleString()}원</SummaryValue>
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
                  <TableRow style={{ backgroundColor: "#DEDEDE", border: "solid 1px lightgray" }}>
                    <TableColumn1
                      style={{ width: "20%", border: "solid 1px lightgray" }}
                      rowSpan={2}
                    >
                      상품명
                    </TableColumn1>
                    {analyzeData !== null &&
                      Object.keys(analyzeData).map(s => (
                        <TableColumn style={{ border: "solid 1px lightgray" }} colSpan={2}>
                          {s}
                        </TableColumn>
                      ))}
                    <TableColumn2 rowSpan={2} style={{ border: "solid 1px lightgray" }}>
                      전월대비
                    </TableColumn2>
                  </TableRow>
                  <TableRow style={{ backgroundColor: "#DEDEDE", border: "solid 1px lightgray" }}>
                    <TableColumn style={{ border: "solid 1px lightgray" }}>수량</TableColumn>
                    <TableColumn style={{ border: "solid 1px lightgray" }}>매출액</TableColumn>
                    <TableColumn style={{ border: "solid 1px lightgray" }}>수량</TableColumn>
                    <TableColumn style={{ border: "solid 1px lightgray" }}>매출액</TableColumn>
                    <TableColumn style={{ border: "solid 1px lightgray" }}>수량</TableColumn>
                    <TableColumn style={{ border: "solid 1px lightgray" }}>매출액</TableColumn>
                    <TableColumn style={{ border: "solid 1px lightgray" }}>수량</TableColumn>
                    <TableColumn style={{ border: "solid 1px lightgray" }}>매출액</TableColumn>
                    <TableColumn style={{ border: "solid 1px lightgray" }}>수량</TableColumn>
                    <TableColumn style={{ border: "solid 1px lightgray" }}>매출액</TableColumn>
                    <TableColumn style={{ border: "solid 1px lightgray" }}>수량</TableColumn>
                    <TableColumn style={{ border: "solid 1px lightgray" }}>매출액</TableColumn>
                  </TableRow>
                </thead>
                <tbody>
                  {analyzeData !== null &&
                    menu
                      .filter(m => m.menuCategoryName === category.menuCategoryName)
                      .map(data => (
                        <TableRow key={data.menuCode}>
                          <TableCell>{data.menuName}</TableCell>
                          <TableCell>
                            {analyzeData[Object.keys(analyzeData)[0]]
                              .find(d => d.menuCode === data.menuCode)
                              ?.salesCount.toLocaleString() || "-"}
                          </TableCell>
                          <TableCell>
                            {" "}
                            {analyzeData[Object.keys(analyzeData)[0]]
                              .find(d => d.menuCode === data.menuCode)
                              ?.salesAmount.toLocaleString() || "-"}
                          </TableCell>
                          <TableCell>
                            {analyzeData[Object.keys(analyzeData)[1]]
                              .find(d => d.menuCode === data.menuCode)
                              ?.salesCount.toLocaleString() || "-"}
                          </TableCell>
                          <TableCell>
                            {analyzeData[Object.keys(analyzeData)[1]]
                              .find(d => d.menuCode === data.menuCode)
                              ?.salesAmount.toLocaleString() || "-"}
                          </TableCell>
                          <TableCell>
                            {analyzeData[Object.keys(analyzeData)[2]]
                              .find(d => d.menuCode === data.menuCode)
                              ?.salesCount.toLocaleString() || "-"}
                          </TableCell>
                          <TableCell>
                            {analyzeData[Object.keys(analyzeData)[2]]
                              .find(d => d.menuCode === data.menuCode)
                              ?.salesAmount.toLocaleString() || "-"}
                          </TableCell>
                          <TableCell>
                            {analyzeData[Object.keys(analyzeData)[3]]
                              .find(d => d.menuCode === data.menuCode)
                              ?.salesCount.toLocaleString() || "-"}
                          </TableCell>
                          <TableCell>
                            {analyzeData[Object.keys(analyzeData)[3]]
                              .find(d => d.menuCode === data.menuCode)
                              ?.salesAmount.toLocaleString() || "-"}
                          </TableCell>
                          <TableCell>
                            {analyzeData[Object.keys(analyzeData)[4]]
                              .find(d => d.menuCode === data.menuCode)
                              ?.salesCount.toLocaleString() || "-"}
                          </TableCell>
                          <TableCell>
                            {analyzeData[Object.keys(analyzeData)[4]]
                              .find(d => d.menuCode === data.menuCode)
                              ?.salesAmount.toLocaleString() || "-"}
                          </TableCell>
                          <TableCell>
                            {analyzeData[Object.keys(analyzeData)[5]]
                              .find(d => d.menuCode === data.menuCode)
                              ?.salesCount.toLocaleString() || "-"}
                          </TableCell>
                          <TableCell>
                            {analyzeData[Object.keys(analyzeData)[5]]
                              .find(d => d.menuCode === data.menuCode)
                              ?.salesAmount.toLocaleString() || "-"}
                          </TableCell>
                          <TableCell>
                            {analyzeData[Object.keys(analyzeData)[5]].find(
                              d => d.menuCode === data.menuCode
                            ) === undefined &&
                            analyzeData[Object.keys(analyzeData)[4]].find(
                              d => d.menuCode === data.menuCode
                            ) === undefined
                              ? "-"
                              : (
                                  analyzeData[Object.keys(analyzeData)[5]].find(
                                    d => d.menuCode === data.menuCode
                                  )?.salesAmount ||
                                  0 -
                                    analyzeData[Object.keys(analyzeData)[4]].find(
                                      d => d.menuCode === data.menuCode
                                    )?.salesAmount ||
                                  0
                                ).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                </tbody>
              </SalesTable>
            </StyledAccordionBody>
          </Accordion>
        ))}
      </StyledAccordionContainer>
    </div>
  );
};

const StyledAccordionContainer = styled.div`
  width: 1400px;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const StyledAccordionHeader = styled(AccordionHeader)`
  padding: 16px 32px;
  font-size: 18px;
  width: 100%;
`;

const TableColumn2 = styled.th`
  vertical-align: middle; /* 수직 방향 중앙 정렬 */
  text-align: center; /* 수평 방향 중앙 정렬 */
  border: 1px solid lightgray;
  width: 1200px;
`;

const TableColumn1 = styled.th`
  vertical-align: middle; /* 수직 방향 중앙 정렬 */
  text-align: center; /* 수평 방향 중앙 정렬 */
  border: 1px solid lightgray;
  // width: 1200px;
  width: 25%;
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
  gap: 40px;
  padding-top: 20px;
`;

const SummaryBox = styled.div`
  width: 230px;
  height: 60px;
  border: 1px solid lightgray;
  border-radius: 5px;
  // padding: 20px;
  padding-top: 8px;
  padding-right: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 10px;
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
  // flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 50px;
  padding-right: 140px;
  height: 80px;
`;

const Title4 = styled.div`
  display: flex;
  justify-content: left;
  font-weight: bold;
  font-size: 18px;
  margin-top: 30px;
  // margin-left: 32px;
  margin-left: 120px;
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
