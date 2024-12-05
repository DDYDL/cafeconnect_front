// Customize.js
import React, { useState } from "react";
import styled from "styled-components";

const Customize = () => {
  const [salesData, setSalesData] = useState([]);

  return (
    <>
      <FirstBody>
        <Title4>매출 현황</Title4>
        <MetricsRow>
          {salesData.map((sale, index) => (
            <MetricBox key={index}>
              <MetricTitle>{sale.title}</MetricTitle>
              <MetricValue>{sale.value}</MetricValue>
              <MetricCategory>{sale.category}</MetricCategory>
            </MetricBox>
          ))}
        </MetricsRow>
      </FirstBody>

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
    </>
  );
};

const FirstBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
`;

const Title4 = styled.div`
  display: flex;
  justify-content: left;
  font-size: 20px;
  margin-top: 30px;
  margin-left: 20px;
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

export default Customize;
