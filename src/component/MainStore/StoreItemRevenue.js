import { Option, Select, Typography } from "@material-tailwind/react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ko } from "date-fns/locale";
import { useAtomValue } from "jotai/react";
import { useEffect, useState } from "react";
import styled from "styled-components"; // styled-components 임포트
import { tokenAtom } from "../../atoms";
import { axiosInToken } from "../../config.js";
import { StyledButton } from "../styledcomponent/button.tsx";
import { CommonWrapper, ContainerTitleArea } from "../styledcomponent/common.tsx";
import * as sr from "../styledcomponent/mainstorerevenue.tsx";

function StoreItemRevenue() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [storeCode, setStoreCode] = useState(453287);
  const token = useAtomValue(tokenAtom);
  const [item, setItem] = useState([]);
  const [storeList, setStoreList] = useState([]);

  // 가맹점 리스트를 가져오기
  useEffect(() => {
    const fetchData = () => {
      axiosInToken(token)
        .get("allStoreList")
        .then(res => {
          const salesList = res.data;
          console.log("allStoreList" + JSON.stringify(salesList));
          setStoreList([...salesList]);
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
    console.log(startDate);
    console.log(endDate);
    // 날짜를 yyyy-MM-dd 형식으로 변환
    const formattedStartDate = startDate.toISOString().split("T")[0]; // "yyyy-MM-dd" 형식으로 변환
    const formattedEndDate = endDate.toISOString().split("T")[0]; // "yyyy-MM-dd" 형식으로 변환
    console.log(formattedStartDate);
    console.log(formattedEndDate);

    try {
      const response = await axiosInToken(token).get("/itemRevenue", {
        params: {
          storeCode: storeCode,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        },
      });

      console.log(response.data);
      setItem([...response.data]);

      // 총금액 계산
      const total = response.data.reduce((acc, curr) => acc + (curr.salesAmount || 0), 0);
      setTotalAmount(total);
    } catch (err) {
      console.error("매출 조회 중 오류 발생:", err);
      alert("데이터를 불러오는 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <CommonWrapper>
      <StoreCommonContainer>
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
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
              <DatePicker
                value={startDate}
                label="시작일자"
                onChange={date => setStartDate(date)}
                showDaysOutsideCurrentMonth
                format="yyyy.MM.dd"
              />
              <span>~</span>
              <DatePicker
                value={endDate}
                label="종료일자"
                onChange={date => setEndDate(date)}
                showDaysOutsideCurrentMonth
                format="yyyy.MM.dd"
              />
            </LocalizationProvider>
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
        {/* <div className="mt-4 overflow-x-auto max-w-full">
          <Card className="h-full w-full overflow-scroll border border-gray-300 px-6"> */}
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          {/* <table className="w-full min-w-max table-auto text-left"> */}
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            {/* <thead class="text-xs text-gray-700 uppercase dark:text-gray-400"> */}
            <thead className="bg-gray-100 text-s text-gray-700">
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
                    {index === 0 ||
                    item[index - 1].itemMajorCategoryNum !== data.itemMajorCategoryNum ? (
                      <TableCell
                        rowSpan={
                          item.filter(i => i.itemMajorCategoryNum === data.itemMajorCategoryNum)
                            .length
                        }
                        className="bg-gray-200"
                      >
                        {data.itemMajorCategoryName}
                      </TableCell>
                    ) : (
                      ""
                    )}
                    {index === 0 ||
                    item[index - 1].itemMiddleCategoryNum !== data.itemMiddleCategoryNum ? (
                      <TableCell
                        rowSpan={
                          item.filter(i => i.itemMiddleCategoryNum === data.itemMiddleCategoryNum)
                            .length
                        }
                        className="bg-gray-100"
                      >
                        {data.itemMiddleCategoryName}
                      </TableCell>
                    ) : (
                      ""
                    )}
                    {index === 0 ||
                    item[index - 1].itemSubCategoryNum !== data.itemSubCategoryNum ? (
                      <TableCell
                        rowSpan={
                          item.filter(i => i.itemSubCategoryNum === data.itemSubCategoryNum).length
                        }
                        className="bg-gray-200"
                      >
                        {data.itemSubCategoryName}
                      </TableCell>
                    ) : (
                      ""
                    )}

                    <TableCell>{data.itemName}</TableCell>
                    <TableCell>{data.itemPrice}</TableCell>
                    <TableCell>{data.salesCount}</TableCell>
                    <TableCell>{data.salesAmount}</TableCell>
                    {index === 0 ||
                    item[index - 1].itemSubCategoryNum !== data.itemSubCategoryNum ? (
                      <TableCell
                        rowSpan={
                          item.filter(i => i.itemSubCategoryNum === data.itemSubCategoryNum).length
                        }
                        className="bg-gray-200"
                      >
                        {item.reduce((acc, cur) => {
                          if (
                            cur.itemMajorCategoryNum === data.itemMajorCategoryNum &&
                            cur.itemMiddleCategoryNum === data.itemMiddleCategoryNum &&
                            cur.itemSubCategoryNum === data.itemSubCategoryNum
                          )
                            return acc + cur.salesCount;
                          else return acc;
                        }, 0)}
                      </TableCell>
                    ) : (
                      ""
                    )}
                    {index === 0 ||
                    item[index - 1].itemSubCategoryNum !== data.itemSubCategoryNum ? (
                      <TableCell
                        rowSpan={
                          item.filter(i => i.itemSubCategoryNum === data.itemSubCategoryNum).length
                        }
                        className="bg-gray-100"
                      >
                        {item.reduce((acc, cur) => {
                          if (
                            cur.itemMajorCategoryNum === data.itemMajorCategoryNum &&
                            cur.itemMiddleCategoryNum === data.itemMiddleCategoryNum &&
                            cur.itemSubCategoryNum === data.itemSubCategoryNum
                          )
                            return acc + cur.salesAmount;
                          else return acc;
                        }, 0)}
                      </TableCell>
                    ) : (
                      ""
                    )}
                    {index === 0 ||
                    item[index - 1].itemMiddleCategoryNum !== data.itemMiddleCategoryNum ? (
                      <TableCell
                        rowSpan={
                          item.filter(i => i.itemMiddleCategoryNum === data.itemMiddleCategoryNum)
                            .length
                        }
                        className="bg-gray-200"
                      >
                        {item.reduce((acc, cur) => {
                          if (
                            cur.itemMajorCategoryNum === data.itemMajorCategoryNum &&
                            cur.itemMiddleCategoryNum === data.itemMiddleCategoryNum
                          )
                            return acc + cur.salesCount;
                          else return acc;
                        }, 0)}
                      </TableCell>
                    ) : (
                      ""
                    )}
                    {index === 0 ||
                    item[index - 1].itemMiddleCategoryNum !== data.itemMiddleCategoryNum ? (
                      <TableCell
                        rowSpan={
                          item.filter(i => i.itemMiddleCategoryNum === data.itemMiddleCategoryNum)
                            .length
                        }
                        className="bg-gray-100"
                      >
                        {item.reduce((acc, cur) => {
                          if (
                            cur.itemMajorCategoryNum === data.itemMajorCategoryNum &&
                            cur.itemMiddleCategoryNum === data.itemMiddleCategoryNum
                          )
                            return acc + cur.salesAmount;
                          else return acc;
                        }, 0)}
                      </TableCell>
                    ) : (
                      ""
                    )}
                    {index === 0 ||
                    item[index - 1].itemMajorCategoryNum !== data.itemMajorCategoryNum ? (
                      <TableCell
                        rowSpan={
                          item.filter(i => i.itemMajorCategoryNum === data.itemMajorCategoryNum)
                            .length
                        }
                        className="bg-gray-200"
                      >
                        {item.reduce((acc, cur) => {
                          if (cur.itemMajorCategoryNum === data.itemMajorCategoryNum)
                            return acc + cur.salesCount;
                          else return acc;
                        }, 0)}
                      </TableCell>
                    ) : (
                      ""
                    )}
                    {index === 0 ||
                    item[index - 1].itemMajorCategoryNum !== data.itemMajorCategoryNum ? (
                      <TableCell
                        rowSpan={
                          item.filter(i => i.itemMajorCategoryNum === data.itemMajorCategoryNum)
                            .length
                        }
                        className="bg-gray-100"
                      >
                        {item.reduce((acc, cur) => {
                          if (cur.itemMajorCategoryNum === data.itemMajorCategoryNum)
                            return acc + cur.salesAmount;
                          else return acc;
                        }, 0)}
                      </TableCell>
                    ) : (
                      ""
                    )}
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
          {/* </Card> */}
        </div>
      </StoreCommonContainer>
    </CommonWrapper>
  );
}

// 공통 테두리 스타일
const TableCell = styled.td`
  padding: 8px 16px;
  text-align: center;
  vertical-align: middle;
  border-bottom: 1px solid #dedede;
`;

const TableHeaderCell = styled.th`
  padding: 8px 16px;
  border-bottom: 1px solid #dedede;
  background-color: #f5f5f5;
  text-align: center;
  vertical-align: middle;
`;

const StoreCommonContainer = styled.div`
  position: relative;
  width: ${props => props.size || "1400px"};
  margin: 0 auto;
  font-family: "Noto Sans KR";
`;
export default StoreItemRevenue;
