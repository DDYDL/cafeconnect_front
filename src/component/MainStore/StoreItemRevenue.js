import { Card, Option, Select, Typography } from "@material-tailwind/react";
import { Datepicker } from "flowbite-react";
import { useAtomValue } from "jotai/react";
import { useEffect, useState } from "react";
import styled from "styled-components"; // styled-components 임포트
import { tokenAtom } from "../../atoms";
import { axiosInToken } from "../../config.js";
import { StyledButton } from "../styledcomponent/button.tsx";
import { CommonContainer, CommonWrapper, ContainerTitleArea } from "../styledcomponent/common.tsx";
import * as sr from "../styledcomponent/mainstorerevenue.tsx";

function StoreItemRevenue() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [storeCode, setStoreCode] = useState(null);
  const token = useAtomValue(tokenAtom);
  const [item, setItem] = useState([]);
  const [storeList, setStoreList] = useState([]);

  // 가맹점 리스트를 가져오기
  useEffect(() => {
    const fetchData = () => {
      axiosInToken(token)
        .get("allStoreList")
        .then(res => {
          console.log("allStoreList" + JSON.stringify(res.data));
          setStoreList([...res.data]);
        })
        .catch(err => {
          console.log(err);
        });
    };
    // if(token!=null && token!=='') fetchData();
    fetchData();
  }, [token]);

  const [totalAmount, setTotalAmount] = useState(0); // 총금액 상태 추가

  const handleSearch = async () => {
    if (!token || !storeCode) return; // 토큰 또는 storeCode가 없는 경우 요청 생략

    // 날짜를 yyyy-MM-dd 형식으로 변환
    const formattedStartDate = startDate.toISOString().split("T")[0]; // "yyyy-MM-dd" 형식으로 변환
    const formattedEndDate = endDate.toISOString().split("T")[0]; // "yyyy-MM-dd" 형식으로 변환

    try {
      const response = await axiosInToken(token).get("/itemRevenue", {
        params: {
          storeCode: storeCode,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        },
      });

      const formattedData = response.data.map(item => ({
        ...item,
        // startDate: new Date(item.startDate).toLocaleDateString("ko-KR"),
      }));
      console.log("res.data", formattedData);
      setItem(formattedData);

      // 총금액 계산
      const total = formattedData.reduce((acc, curr) => acc + (curr.itemAmount || 0), 0);
      setTotalAmount(total);
    } catch (err) {
      console.error("매출 조회 중 오류 발생:", err);
      alert("데이터를 불러오는 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <CommonWrapper>
      <CommonContainer type="submit">
        <ContainerTitleArea>
          <h2>상품별 매출 조회</h2>
        </ContainerTitleArea>

        <sr.FilterWrapWithDatePicker>
          <sr.StoreChooseWrap>
            <Select label="선택" className="selectbox" onChange={value => setStoreCode(value)}>
              {storeList.map(store => (
                <Option key={store.storeCode} value={store.storeCode}>
                  {store.storeName}
                </Option>
              ))}
            </Select>
          </sr.StoreChooseWrap>

          <sr.DatePickerInputWrap>
            <Datepicker
              value={startDate}
              onChange={date => setStartDate(date)}
              className="flowbite-datepicker"
              showTodayButton={true}
              showClearButton={true}
              dateFormat="yyyy-MM-dd"
            />
            <span>~</span>
            <Datepicker
              value={endDate}
              onChange={date => setEndDate(date)}
              className="flowbite-datepicker"
              showTodayButton={true}
              showClearButton={true}
              dateFormat="yyyy-MM-dd"
            />
          </sr.DatePickerInputWrap>
          <StyledButton size="sm" theme="brown" onClick={handleSearch}>
            조회
          </StyledButton>

          {/* 총금액 표시 */}
          <div className="ml-4 flex items-center">
            <Typography variant="small" color="blue-gray" className="font-bold">
              총금액: {totalAmount.toLocaleString()} 원
            </Typography>
          </div>
        </sr.FilterWrapWithDatePicker>

        {/* 테이블로 데이터 표시 */}
        <div className="mt-4 overflow-x-auto max-w-full">
          <Card className="h-full w-full overflow-scroll border border-gray-300 px-6">
            <table className="w-full min-w-max table-auto text-left">
              <thead className="bg-gray-100">
                <tr>
                  <TableHeaderCell>대분류</TableHeaderCell>
                  <TableHeaderCell>중분류</TableHeaderCell>
                  <TableHeaderCell>소분류</TableHeaderCell>

                  <TableHeaderCell>상품명</TableHeaderCell>
                  <TableHeaderCell>상품단가</TableHeaderCell>
                  <TableHeaderCell>상품수량</TableHeaderCell>
                  <TableHeaderCell>상품금액</TableHeaderCell>

                  <TableHeaderCell>소분류 총 수량</TableHeaderCell>
                  <TableHeaderCell>소분류 총 금액</TableHeaderCell>
                  <TableHeaderCell>중분류 총 수량</TableHeaderCell>
                  <TableHeaderCell>중분류 총 금액</TableHeaderCell>
                  <TableHeaderCell>대분류 총 수량</TableHeaderCell>
                  <TableHeaderCell>대분류 총 금액</TableHeaderCell>
                </tr>
              </thead>
              <tbody>
                {item.length > 0 ? (
                  item.map((data, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <TableCell>{data.itemMajorCategoryName}</TableCell>
                      <TableCell>{data.itemMiddleCategoryName}</TableCell>
                      <TableCell>{data.itemSubCategoryName}</TableCell>

                      <TableCell>{data.itemName}</TableCell>
                      <TableCell>{data.itemStandard}</TableCell>
                      <TableCell>{data.orderCount}</TableCell>
                      <TableCell>{data.itemPrice}</TableCell>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="13" className="text-center py-4">
                      데이터가 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Card>
        </div>
      </CommonContainer>
    </CommonWrapper>
  );
}

// 공통 테두리 스타일
const TableCell = styled.td`
  padding: 8px 16px;
  border-bottom: 1px solid #dedede;
`;

const TableHeaderCell = styled.th`
  padding: 8px 16px;
  border-bottom: 1px solid #dedede;
  background-color: #f5f5f5;
`;

export default StoreItemRevenue;
