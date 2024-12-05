import React, { useState } from "react";
import styled from "styled-components";

const Monthly = () => {
  const [salesData, setSalesData] = useState([]);
  const [analysis, setAnalysis] = useState([]);

  const totalQuantity = 250000;
  const totalRevenue = 70000000;
  const yearComparison = 500000;

  return (
    <>
      <FirstBody>
        <Title4>매출 현황 (최근 30일 기준)</Title4>

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
          <SummaryBox>
            <SummaryTitle>전월 대비</SummaryTitle>
            <SummaryValue>+ {yearComparison.toLocaleString()}원</SummaryValue>
            <SummaryCategory>모든 상품</SummaryCategory>
          </SummaryBox>
        </SummaryRow>
      </FirstBody>

      {/* SalesTable */}
      <SalesTable>
        <TableHeader>
          <TableColumn width="60%">상품명</TableColumn>
          <TableColumn width="10%">수량</TableColumn>
          <TableColumn width="10%">매출합계</TableColumn>
          <TableColumn width="10%">수량 증감</TableColumn>
          <TableColumn width="10%">금액 증감</TableColumn>
        </TableHeader>

        {analysis.length > 0 ? (
          analysis.map((data, index) => (
            <TableRow key={index}>
              <TableCell>{data.itemName}</TableCell>
              <TableCell>{data.quantity}</TableCell>
              <TableCell>{data.totalRevenue}원</TableCell>
              <TableCell>{data.quantityChange}%</TableCell>
              <TableCell>{data.revenueChange}원</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} style={{ textAlign: "center", padding: "20px" }}>
              {analysis.length === 0 ? "데이터가 없습니다." : "데이터를 조회 해주세요."}
            </TableCell>
          </TableRow>
        )}
      </SalesTable>
    </>
  );
};

const SummaryRow = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
  gap: 80px;
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
  margin-top: 20px;
  margin-bottom: 50px;
`;

const TableHeader = styled.tr`
  background-color: #dedede;
`;

const TableColumn = styled.th`
  padding: 10px;
  text-align: center;
  border-left: none; /* 필요 시 왼쪽 라인 제거 */
  &:last-child {
    border-right: none; /* 마지막 열은 오른쪽 라인 제거 */
  }
`;
const TableRow = styled.tr``;

const TableCell = styled.td`
  padding: 10px;
  text-align: center;
  border: 1px solid #ddd;
`;

export default Monthly;
