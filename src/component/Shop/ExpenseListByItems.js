import {
  CommonWrapper,
  CommonContainer,
  ContainerTitleArea,
} from "../styledcomponent/common.tsx";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { StyledButton } from "../styledcomponent/button.tsx";
import * as ol from "../styledcomponent/orderlist.tsx";
import { useState, useEffect } from "react";
import { axiosInToken } from "../../config.js";
import { useAtomValue, useAtom } from "jotai/react";
import { tokenAtom, memberAtom } from "../../atoms";
import { ko } from "date-fns/locale/ko";
import { format } from "date-fns";

function ExpenseListByItems() {
  const today = new Date();
  const monthAgo = new Date(today);
  monthAgo.setMonth(today.getMonth() - 1);

  const [startDate, setStartDate] = useState(monthAgo);
  const [endDate, setEndDate] = useState(today);
  const store = useAtomValue(memberAtom);
  const [token, setToken] = useAtom(tokenAtom);
  const [orderItemSummary, setOrderItemSummary] = useState([]);
  const [summaryByMajor, setSummaryByMajor] = useState([]);
  const [summaryByMiddle, setSummaryByMiddle] = useState([]);
  const [summaryBySub, setSummaryBySub] = useState([]);

  useEffect(() => {
    // 토큰의 State가 useEffect보다 느려서 토큰없이 실행 방지(Error 방지)
    if (token != null && token !== "") submit(startDate, endDate);
  }, [token, store.storeCode]);

  const submit = () => {
    const formData = new FormData();
    formData.append("storeCode", store.storeCode);
    formData.append("startDate", format(startDate, "yyyy-MM-dd")); // String으로 바꿔서 보내기
    formData.append("endDate", format(endDate, "yyyy-MM-dd"));

    axiosInToken(token)
      .post("expenseList", formData)
      .then((res) => {
        if (res.headers.authorization != null) {
          setToken(res.headers.authorization);
        }
        console.log(res.data);

        setOrderItemSummary(res.data.itemOrderExpsenSummary);
        setSummaryByMajor(res.data.itemOrderExpsenSummaryByMajor);
        setSummaryByMiddle(res.data.itemOrderExpsenSummaryByMiddle);
        setSummaryBySub(res.data.itemOrderExpsenSummaryBySub);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderTableRows = () => {
    if (orderItemSummary.length === 0) {
      return (
        <tr>
          <td
            colSpan={12}
            className="px-6 py-3 border text-center text-gray-500"
          >
            데이터가 없습니다.
          </td>
        </tr>
      );
    }

    //데이터 반복 시작, 주문 아이템을 기준으로 반복시킴
    return orderItemSummary.map((item, index) => {
      // 이전 행과 비교하여 조건 판단 첫번째 항목이거나, 변경된 경우 true , 그대로 유지중이면 false반환
      const showMajor =
        index === 0 ||
        orderItemSummary[index - 1].majorCategoryNum !== item.majorCategoryNum;
      const showMiddle =
        index === 0 ||
        orderItemSummary[index - 1].middleCategoryNum !==
          item.middleCategoryNum;
      const showSub =
        index === 0 ||
        orderItemSummary[index - 1].subCategoryNum !== item.subCategoryNum ||
        orderItemSummary[index - 1].middleCategoryNum !==
          item.middleCategoryNum ||
        orderItemSummary[index - 1].majorCategoryNum !== item.majorCategoryNum;

      // 각 카테고리의 통계 데이터 찾기, 아이템의 고유 카테고리번호와 비교
      const majorSummary = summaryByMajor.find(
        (m) => m.majorCategoryNum === item.majorCategoryNum
      );

      const middleSummary = summaryByMiddle.find(
        (m) =>
          m.majorCategoryNum === item.majorCategoryNum &&
          (m.middleCategoryNum === item.middleCategoryNum ||
            (m.middleCategoryNum === null && item.middleCategoryNum === null))
      );

      const subSummary = summaryBySub.find(
        (s) =>
          s.majorCategoryNum === item.majorCategoryNum &&
          s.middleCategoryNum === item.middleCategoryNum &&
          (s.subCategoryNum === item.subCategoryNum ||
            (s.subCategoryNum === null && item.subCategoryNum === null))
      );

      return (
        // 행시작 아이템을 기준으로 반복문이 돌아감
        <tr key={item.itemCode} className="hover:bg-gray-50">
          {/* 대분류 카테고리명 */}
          {/* ?. 옵셔닝 체인지 : undefine이거나 null인경우 오류 방지  || 1 로 대체된다.  */}
          {showMajor && (
            <td rowSpan={majorSummary?.rowspanCount || 1} className="px-6 py-3">
              {item.majorCategoryName}
            </td>
          )}

          {/* 중분류 카테고리명 */}
          {showMiddle && (
            <td
              rowSpan={middleSummary?.rowspanCount || 1}
              className="px-6 py-3 border"
            >
              {item.middleCategoryName}
            </td>
          )}

          {/* 소분류 카테고리명 */}
          {showSub && (
            <td
              rowSpan={subSummary?.rowspanCount || 1}
              className="px-6 py-3 border"
            >
              {item.subCategoryName || "-"}
            </td>
          )}

          {/* 주문 상품별 통계*/}
          <td className="px-6 py-3 border">{item.itemName}</td>
          <td className="px-6 py-3 border text-right">
            {item.itemPrice?.toLocaleString()}
          </td>
          <td className="px-6 py-3 border text-right">
            {item.totalOrderCount}
          </td>
          <td className="px-6 py-3 border text-right">
            {item.totalOrderPrice?.toLocaleString()}
          </td>

          {/* 소분류 합계 */}
          {showSub && (
            <>
              <td
                className="px-6 py-3 border text-right"
                rowSpan={subSummary?.rowspanCount || 1}
              >
                {subSummary?.totalOrderCount}
              </td>
              <td
                className="px-6 py-3 border text-right"
                rowSpan={subSummary?.rowspanCount || 1}
              >
                {subSummary?.totalOrderPrice?.toLocaleString() || "-"}
              </td>
            </>
          )}

          {/* 중분류 합계 */}
          {showMiddle && (
            <>
              <td
                className="px-6 py-3 border text-right"
                rowSpan={middleSummary?.rowspanCount || 1}
              >
                {middleSummary?.totalOrderCount}
              </td>
              <td
                className="px-6 py-3 border text-right"
                rowSpan={middleSummary?.rowspanCount || 1}
              >
                {middleSummary?.totalOrderPrice?.toLocaleString()}
              </td>
            </>
          )}

          {/* 대분류 합계 */}
          {showMajor && (
            <>
              <td
                className="px-6 py-3 border text-right"
                rowSpan={majorSummary?.rowspanCount || 1}
              >
                {majorSummary?.totalOrderCount}
              </td>
              <td
                className="px-6 py-3 border text-right"
                rowSpan={majorSummary?.rowspanCount || 1}
              >
                {majorSummary?.totalOrderPrice?.toLocaleString()}
              </td>
            </>
          )}
        </tr>
      );
    });
  };

  return (
    <CommonWrapper>
      <CommonContainer size="1500px">
        <ContainerTitleArea>
          <h2>지출내역</h2>
        </ContainerTitleArea>

        <ol.DatePickerWrap>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
            <DatePicker
              slotProps={{ textField: { size: "small" } }}
              format="yyyy-MM-dd"
              value={startDate}
              onChange={(newValue) => setStartDate(new Date(newValue))}
            />
            <span>~</span>
            <DatePicker
              slotProps={{ textField: { size: "small" } }}
              format="yyyy-MM-dd"
              value={endDate}
              onChange={(newValue) => setEndDate(new Date(newValue))}
            />
            <StyledButton size="sm" theme="brown" onClick={submit}>
              조회
            </StyledButton>
          </LocalizationProvider>
        </ol.DatePickerWrap>

        <ol.ExpenseListTableDiv>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg table-auto">
            <table class="min-w-full w-max text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-auto">
              <thead class="w-full text-xs text-gray-700 uppercase bg-gray-200   dark:bg-gray-700 dark:text-gray-400 table-auto">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    대분류명
                  </th>
                  <th scope="col" class="px-6 py-3 border-r">
                    중분류명
                  </th>
                  <th scope="col" class="px-6 py-3">
                    소분류명
                  </th>
                  <th scope="col" class="px-6 py-3">
                    상품명
                  </th>
                  <th scope="col" class="px-6 py-3">
                    상품단가
                  </th>
                  <th scope="col" class="px-6 py-3">
                    구매수량
                  </th>
                  <th scope="col" class="px-6 py-3">
                    구매금액
                  </th>
                  <th scope="col" class="px-6 py-3">
                    소분류총수량
                  </th>
                  <th scope="col" class="px-6 py-3">
                    소분류총금액
                  </th>
                  <th scope="col" class="px-6 py-3">
                    중분류 총수량
                  </th>
                  <th scope="col" class="px-6 py-3">
                    중분류 총금액
                  </th>
                  <th scope="col" class="px-6 py-3">
                    대분류 총수량
                  </th>
                  <th scope="col" class="px-6 py-3">
                    대분류 총금액
                  </th>
                </tr>
              </thead>
              <tbody>{renderTableRows()}</tbody>
            </table>
          </div>
        </ol.ExpenseListTableDiv>
      </CommonContainer>
    </CommonWrapper>
  );
}
export default ExpenseListByItems;
