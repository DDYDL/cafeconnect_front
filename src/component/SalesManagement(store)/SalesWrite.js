import React, { useState } from "react";
import styled from "styled-components";
import { Button, TempSaveButton } from "../Button/Button.style";
import { CustomHorizontal } from "../Horizin/Horizin.style";

const SalesWrite = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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
  const [rows, setRows] = useState([{ 순번: 1, 상품명: "", 수량: "", 매출합계: "" }]);

  // 총합계 계산
  const calculateTotal = () => {
    return rows.reduce((total, row) => {
      const 매출합계 = parseFloat(row.매출합계) || 0;
      return total + 매출합계;
    }, 0);
  };

  // 상품 선택
  const handleProductSelect = (index, product) => {
    const updatedRows = [...rows];
    updatedRows[index].상품명 = product.name;
    setRows(updatedRows);
    setFilteredProducts([]); // 검색결과 리스트 숨기기
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
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <HeadingContainer>
          <Heading>매출 입력</Heading>
        </HeadingContainer>
        <HeadingContainer1>
          <HeadingDataAndSave>
            <div>매출일자</div>
            <div>달력 선택</div>
            <TempSaveButton>임시저장</TempSaveButton>
            <Button>등록</Button>
          </HeadingDataAndSave>

          <HeadingSummary>
            <div>총합계: </div>
            <div>{calculateTotal()}원</div> {/* 총합계 계산된 값 표시 */}
          </HeadingSummary>
        </HeadingContainer1>
        <CustomHorizontal width="basic" bg="black" />
        <TableHeader>
          <TableHeaderItem>순번</TableHeaderItem>
          <TableHeaderItem>상품명</TableHeaderItem>
          <TableHeaderItem>수량</TableHeaderItem>
          <TableHeaderItem>매출 합계</TableHeaderItem>
        </TableHeader>
        <CustomHorizontal width="basic" bg="black" />

        {/* {rows.map((row, index) => (
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
            {/* <ProductList>
              {filteredProducts.map(product => (
                <ProductItem key={product.id} onClick={() => handleProductSelect(index, product)}>
                  {product.name}
                </ProductItem>
              ))}
            </ProductList> */}
        {/* <QuantityInput
              name="수량"
              type="number"
              placeholder="수량 입력"
              value={row.수량}
              onChange={event => handleInputChange(index, event)}
            />
            <TotalInput
              name="매출합계"
              type="number"
              placeholder="매출 합계 입력"
              value={row.매출합계}
              onChange={event => handleInputChange(index, event)}
              onKeyDown={event => handleEnterKey(event, index)} */}
        {/* /> */}
        {/* </TableRow> */}
        {/* ))} */}

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
              placeholder="수량 입력"
              value={row.수량}
              onChange={event => handleInputChange(index, event)}
            />
            <TotalInput
              name="매출합계"
              type="number"
              placeholder="매출 합계 입력"
              value={row.매출합계}
              onChange={event => handleInputChange(index, event)}
              onKeyDown={event => handleEnterKey(event, index)}
            />
          </TableRow>
        ))}
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  background-color: lightgrey;
  width: 800px;
  height: 600px;
`;

const Form = styled.form`
  width: 800px;
  height: 669px;
  display: flex;
  flex-direction: column;
`;

const HeadingContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-bottom: 38px;
`;

const HeadingContainer1 = styled.div`
  width: 800px;
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
//   width: 800px;
//   justify-content: space-between;
//   align-items: center;
//   padding-left: 20px;
//   padding-right: 20px;
//   box-sizing: border-box;
// `;

const TableHeader = styled.div`
  display: flex;
  width: 100%; /* 부모 컨테이너와 동일한 너비 */
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box; /* padding을 포함하여 크기 설정 */
`;

const TableHeaderItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

// const TableRow = styled.div`
//   display: flex;
//   width: 800px;
//   justify-content: space-between;
//   align-items: center;
//   margin-top: 10px;
// `;

const TableRow = styled.div`
  display: flex;
  width: 800px;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  position: relative; /* 여기에 추가 */
`;

const OrderInput = styled.input`
  width: 80px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-left: 10px;
  margin-right: 10px;
`;

const ProductSearchInput = styled.input`
  width: 200px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  position: relative;
`;

const QuantityInput = styled.input`
  width: 100px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const TotalInput = styled.input`
  width: 120px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-left: 10px;
  margin-right: 10px;
`;

// const ProductList = styled.div`
//   position: absolute;
//   top: 40px; /* input 아래쪽으로 위치 설정 */
//   left: 0; /* 왼쪽 정렬 */
//   background-color: white;
//   width: 200px;
//   max-height: 150px;
//   overflow-y: auto;
//   z-index: 10;
//   border: 1px solid #ddd;
// `;

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
