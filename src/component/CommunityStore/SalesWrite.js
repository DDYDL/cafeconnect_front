import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import styled from "styled-components";
import { CustomButton, TempSaveButton } from "../styledcomponent/Button.style";
import { CustomHorizontal } from "../styledcomponent/Horizin.style";
import { ContentListDiv } from "../styles/StyledStore.tsx";

const SalesWrite = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  // 가상의 상품 목록 데이터
  const products = [
    { id: 1, name: "콜라 1" },
    { id: 2, name: "콜라 2" },
    { id: 3, name: "사이다" },
    { id: 4, name: "콜라 제로" },
    { id: 5, name: "오렌지 주스" },
    { id: 6, name: "콜라 500ml" },
    { id: 7, name: "레몬에이드" },
    { id: 8, name: "콜라 1L" },
    { id: 9, name: "포도 주스" },
    { id: 10, name: "콜라 다이어트" },
  ];

  // 상품명 검색 결과 상태
  const [filteredProducts, setFilteredProducts] = useState([]);

  // 순번, 상품명, 수량, 매출 합계 상태 (배열로 관리)
  const [rows, setRows] = useState([
    { 순번: 1, 상품명: "", 수량: "", 매출합계: "", filteredProducts: [] },
  ]);

  // 총합계 계산
  const calculateTotal = () => {
    const total = rows.reduce((total, row) => {
      const 매출합계 = parseFloat(row.매출합계) || 0;
      return total + 매출합계;
    }, 0);
    return total.toLocaleString();
  };

  // 상품 선택
  const handleProductSelect = (index, product) => {
    const updatedRows = [...rows];
    updatedRows[index].상품명 = product.name;
    updatedRows[index].filteredProducts = []; // 해당 행의 검색결과만 비움
    setRows(updatedRows);

    // 전역 검색 결과 비움
    setFilteredProducts([]);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedRows = [...rows];
    updatedRows[index][name] = value;
    setRows(updatedRows);

    // 상품명 필터링
    if (name === "상품명") {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const handleEnterKey = (event, index) => {
    if (event.key === "Enter" && rows[index].매출합계) {
      // 매출합계가 입력되었을 때, 새 입력 항목을 추가
      const next순번 = rows.length + 1; // 새로운 순번은 현재 rows 길이에 +1
      setRows([...rows, { 순번: next순번, 상품명: "", 수량: "", 매출합계: "" }]);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    const newNotice = {
      type: "주요 공지사항",
      title,
      content,
      date: new Date().toISOString(),
    };

    fetch("https://www.localhost:8080/notice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNotice),
    })
      .then(response => response.json())
      .then(data => {
        console.log("Notice added:", data);
        setTitle("");
        setContent("");
      })
      .catch(error => console.error("Error posting notice:", error));
  };

  return (
    <ContentListDiv>
      <Form onSubmit={handleSubmit}>
        <HeadingContainer>
          <Heading>매출 입력</Heading>
        </HeadingContainer>

        <HeadingContainer1>
          <HeadingDataAndSave>
            <SelectData>
              <SalesDateText>매출 일자</SalesDateText>

              <Datepicker
                useRange={false}
                asSingle={true}
                value={value}
                onChange={newValue => setValue(newValue)}
              />
            </SelectData>

            <TempSaveButton style={{ borderRadius: "4px", marginTop: "3px" }}>
              임시저장
            </TempSaveButton>
            <CustomButton style={{ borderRadius: "4px", marginTop: "3px" }}>등록</CustomButton>
          </HeadingDataAndSave>

          <HeadingSummary>
            <div style={{ fontWeight: "bold", marginRight: "20px" }}>총 합계: </div>
            <div style={{ color: "blue", fontWeight: "bold" }}>{calculateTotal()}원</div>{" "}
            {/* 총합계 계산된 값 표시 */}
          </HeadingSummary>
        </HeadingContainer1>
        <CustomHorizontal width="basic" bg="black" style={{ marginTop: "10px" }} />

        <TableHeader>
          <TableHeaderItem1>순번</TableHeaderItem1>
          <TableHeaderItem2>상품명</TableHeaderItem2>
          <TableHeaderItem3>수량</TableHeaderItem3>
          <TableHeaderItem4>매출 합계</TableHeaderItem4>
        </TableHeader>

        <CustomHorizontal width="basic" bg="black" />

        {rows.map((row, index) => (
          <TableRow key={index}>
            <OrderInput name="순번" type="number" placeholder="순번" value={row.순번} readOnly />
            <ProductSearchInput
              name="상품명"
              type="text"
              placeholder="상품명 검색"
              value={row.상품명}
              onChange={event => handleInputChange(index, event)}
              onKeyDown={event => handleEnterKey(event, index)}
            />
            {filteredProducts.length > 0 && (
              <ProductList>
                {filteredProducts.map(product => (
                  <ProductItem key={product.id} onClick={() => handleProductSelect(index, product)}>
                    {product.name}
                  </ProductItem>
                ))}
              </ProductList>
            )}
            <QuantityInput
              name="수량"
              type="number"
              placeholder="수량"
              value={row.수량}
              onChange={event => handleInputChange(index, event)}
            />
            <TotalInput
              name="매출합계"
              type="number"
              placeholder="매출 합계"
              value={row.매출합계}
              onChange={event => handleInputChange(index, event)}
              onKeyDown={event => handleEnterKey(event, index)}
            />
          </TableRow>
        ))}
      </Form>
    </ContentListDiv>
  );
};

const Form = styled.form`
  height: 669px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  // margin-bottom: 38px;
  margin-bottom: 50px;
`;

const HeadingContainer1 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const HeadingDataAndSave = styled.div`
  display: flex;
  gap: 10px;
  margin-left: 20px;
`;

const HeadingSummary = styled.div`
  display: flex;
  margin-right: 20px;
`;

const Heading = styled.h2`
  font-size: 24px;
  text-align: center;
  flex-grow: 1;
`;

// const TableHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   text-align: center;

//   height: 50px;
//   font-weight: bold;
//   font-size: 14px;
// `;

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  height: 50px;
  font-weight: bold;
  font-size: 14px;
`;

// const TableHeaderItem1 = styled.div`
//   display: flex;
//   justify-content: center;
//   text-align: left;
//   align-items: center;
//   // width: 100px;
//   margin-left: 30px;
// `;

// const TableHeaderItem2 = styled.div`
//   display: flex;
//   justify-content: center;
//   text-align: left;
//   align-items: center;
//   margin-left: 70px;
//   // width: 450px;
// `;

// const TableHeaderItem3 = styled.div`
//   display: flex;
//   justify-content: center;
//   text-align: left;
//   align-items: center;

//   // margin-right: 20px;
// `;

// const TableHeaderItem4 = styled.div`
//   display: flex;
//   justify-content: center;
//   text-align: left;
//   align-items: center;

//   margin-right: 20px;
//   // width: 140px;
// `;

const TableHeaderItem1 = styled.div`
  display: flex;
  justify-content: center;
  text-align: left;
  align-items: center;
  margin-left: 30px; /* 순번의 좌측 여백 */
`;

const TableHeaderItem2 = styled.div`
  display: flex;
  justify-content: center;
  text-align: left;
  align-items: center;
  flex-grow: 1; /* 상품명 부분의 공간 확장 */
`;

const TableHeaderItem3 = styled.div`
  display: flex;
  justify-content: center;
  text-align: left;
  align-items: center;
  margin-right: 10px; /* 매출 합계와 간격 추가 */
`;

const TableHeaderItem4 = styled.div`
  display: flex;
  justify-content: center;
  text-align: left;
  align-items: center;
  margin-right: 40px; /* 테이블 우측 여백 */
  margin-left: 90px;
`;

const TableRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  position: relative; /* 여기에 추가 */
`;

const SelectData = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
  text-align: center;
  width: 340px;
  // border: 1px solid lightblue;
  border-radius: 5px;
  padding-left: 10px;
`;

const SalesDate = styled.div`
  display: flex;
  width: 200px;
`;

const SalesDateText = styled.div`
  display: flex;
  width: 100px;
`;

const OrderInput = styled.input`
  width: 50px;
  height: 40px;

  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #f8f8f8;

  padding-left: 13px;
  padding-top: 5px;
  padding-bottom: 7px;

  font-size: 16px;
  // border: 1px solid #ddd;
  border: none;
  border-radius: 5px;
  margin-left: 30px;
  margin-right: 50px;
`;

const ProductSearchInput = styled.input`
  width: 600px;
  height: 40px;

  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  position: relative;

  // margin-right: 30px;
`;

const QuantityInput = styled.input`
  width: 64px;
  height: 40px;

  // padding: 8px;
  font-size: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-left: 20px;

  // padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 7px;
`;

const TotalInput = styled.input`
  width: 140px;
  height: 40px;

  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-left: 20px;
  margin-right: 10px;

  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 7px;
`;

const ProductList = styled.div`
  position: absolute;
  top: 45px; /* input 아래쪽으로 위치 설정 */
  // left: 0; /* 왼쪽 정렬 */

  margin-left: 187px;
  background-color: white;
  width: 200px;
  max-height: 150px;
  overflow-y: auto;
  z-index: 10;
  border: 1px solid #ddd;
`;

const ProductItem = styled.div`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export default SalesWrite;
