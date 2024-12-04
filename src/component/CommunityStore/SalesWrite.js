import { Option, Select } from "@material-tailwind/react";
import { useAtomValue } from "jotai/react";
import { useCallback, useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import styled from "styled-components";
import { tokenAtom } from "../../atoms.js";
import { axiosInToken } from "../../config.js";
import { CustomButton, TempSaveButton } from "../styledcomponent/Button.style";
import { CustomHorizontal } from "../styledcomponent/Horizin.style";
import { ContentListDiv } from "../styles/StyledStore.tsx";

//!! 해당 페이지 접속 시, db에 MenuList요청하기
const SalesWrite = () => {
  const [storeCode, setStoreCode] = useState(null);
  const token = useAtomValue(tokenAtom);
  // menuList가 undefined일 경우 기본값으로 빈 배열을 설정
  const [menuList, setMenuList] = useState([]);
  const [selMenu, setSelMenu] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 열림 상태
  const [salesList, setSalesList] = useState([]);
  const [datePicker, setDatePicker] = useState({ startDate: null, endDate: null });
  const [date, setDate] = useState();
  const initSaleItem = {
    storeCode: 1,
    salesDate: "",
    menuName: "",
    menuCode: "",
    salesCount: 1,
    salesStatus: 1,
    salesAmount: 0,
  };
  const [saleItem, setSaleItem] = useState(initSaleItem);

  // / fetchStoreCode를 useCallback으로 래핑
  const fetchStoreCode = useCallback(async () => {
    try {
      if (!token) return; // 토큰 없으면 요청 생략
      const response = await axiosInToken(token).get("/store");
      const storeCodeFromResponse = response.data?.storeCode; // 응답에서 storeCode 추출
      setStoreCode(storeCodeFromResponse);
      console.log("StoreCode:", storeCodeFromResponse);
    } catch (err) {
      console.error("storeCode 요청 중 오류 발생:", err);
    }
  }, [token]); // 의존성 배열에 token 추가

  useEffect(() => {
    fetchStoreCode();
  }, [fetchStoreCode]); // fetchStoreCode를 의존성 배열에 추가

  // 메뉴 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchData = () => {
      axiosInToken(token)
        .get("menuList")
        .then(res => {
          console.log("menuList" + res.data);
          setMenuList([...res.data]);
        })
        .catch(err => {
          console.log(err);
        });
    };
    // if(token!=null && token!=='') fetchData();
    fetchData();
  }, [token]);

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

  // 매출 합계 수정
  const handleSalesAmountChange = (index, value) => {
    const updatedRows = [...rows];
    updatedRows[index].매출합계 = value;
    setRows(updatedRows);
  };

  const handleItemClick = item => {
    setSelMenu(item); // 선택한 메뉴 정보를 selMenu에 업데이트
    setSaleItem(prev => ({
      ...prev,
      menuCode: item.menuCode, // 선택된 메뉴의 코드
      menuName: item.menuName, // 선택된 메뉴의 이름
    })); // saleItem에도 선택된 메뉴 정보 반영
    setIsDropdownOpen(false); // 드롭다운 닫기
  };

  const handleEnterKey = event => {
    if (event.keyCode !== 13) return;

    if (!selMenu.menuName) {
      alert("메뉴를 선택하세요");
      return;
    }

    if (saleItem.salesCount === "" || saleItem.salesCount === 0) {
      alert("수량을 선택하세요");
      return;
    }

    if (saleItem.salesAmount === "" || saleItem.salesAmount === 0) {
      alert("매출금액을 선택하세요");
      return;
    }

    // 첫 번째 항목을 rows에 추가
    setRows(prevRows => [
      ...prevRows,
      {
        순번: prevRows.length + 1,
        상품명: saleItem.menuName,
        수량: saleItem.salesCount,
        매출합계: saleItem.salesAmount,
      },
    ]);
    // 두 번째 항목을 위한 초기화
    setSaleItem({
      menuCode: "",
      menuName: "",
      salesCount: 1,
      salesAmount: 0,
    });

    // 기존 salesList에 해당 menuCode와 menuName이 이미 있는지 확인하고, 있다면 해당 항목을 수정
    setSalesList(prevSalesList => {
      if (!saleItem.menuName || !saleItem.salesCount || !saleItem.salesAmount) {
        console.warn("유효하지 않은 saleItem:", saleItem);
        return prevSalesList; // saleItem이 유효하지 않으면 추가하지 않음
      }

      const updatedSalesList = prevSalesList.map(item =>
        item.menuCode === saleItem.menuCode ? { ...item, ...saleItem } : item
      );

      if (!prevSalesList.some(item => item.menuCode === saleItem.menuCode)) {
        updatedSalesList.push({ ...saleItem });
      }
      return updatedSalesList;
    });

    setSaleItem(initSaleItem);
    setSelMenu({});
  };

  useEffect(() => {
    console.log("salesList updated", salesList);
  }, [salesList]); // salesList가 업데이트될 때마다 로그 출력

  const submit = flag => {
    console.log("date", date); // 날짜 확인
    console.log("salesList before send:", salesList); // 전송 전 salesList 확인
    console.log("storeCode", storeCode);

    // salesList의 각 항목에 대해 salesStatus를 flag로 설정
    const sendSalesList = salesList.map(s => {
      s.salesStatus = flag;
      s.salesDate = date;
      s.storeCode = storeCode;
      return s;
    });

    console.log("sendSalesList", sendSalesList); // 전송할 리스트 확인

    // flag가 1이면 salesTemp 호출 (임시저장)
    if (flag === 1) {
      axiosInToken(token)
        .post("/salesTemp", { salesList: sendSalesList })
        .then(res => {
          console.log(res);
          // 기존 값 대신 서버 응답 데이터로 정확히 상태 설정
          setSalesList(res.data);
          alert("임시 저장 완료");
        })
        .catch(err => {
          console.error(err);
        });
    }
    // flag가 2이면 salesWrite 호출 (저장)
    else if (flag === 2) {
      axiosInToken(token)
        .post("/salesWrite", { salesList: sendSalesList })
        .then(res => {
          console.log(res.data);
          alert("등록 완료");
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const changeDate = newDate => {
    setDatePicker(newDate);
    const d = newDate.startDate;
    const year = d.getFullYear(); // 2023
    const month = (d.getMonth() + 1).toString().padStart(2, "0"); // 06
    const day = d.getDate().toString().padStart(2, "0"); // 18
    const dateString = year + "-" + month + "-" + day; // 2023-06-18
    console.log(dateString);
    setDate(dateString);

    // salesDate는 dateString으로 설정하고 나머지 필드는 기본값으로 사용합니다.
    axiosInToken(token)
      .get("salesTemp", {
        params: {
          salesDate: dateString,
          storeCode: storeCode, // storeCode 파라미터 전달
        },
      })
      .then(res => {
        console.log(res);
        setSalesList([...res.data]); // 임시저장된 데이터를 salesList에 설정
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <ContentListDiv>
      <HeadingContainer>
        <Heading>매출 입력</Heading>
      </HeadingContainer>

      <HeadingContainer1>
        <HeadingDataAndSave>
          <SelectData>
            <SalesDateText>매출 일자</SalesDateText>

            <Datepicker useRange={false} asSingle={true} value={datePicker} onChange={changeDate} />
          </SelectData>

          <TempSaveButton
            style={{ borderRadius: "4px", marginTop: "3px" }}
            onClick={() => submit(1)}
          >
            임시저장
          </TempSaveButton>
          <CustomButton style={{ borderRadius: "4px", marginTop: "3px" }} onClick={() => submit(2)}>
            등록
          </CustomButton>
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

      {[...salesList, saleItem].map((saleItem, index) => (
        <TableRow key={index}>
          {/* 순번 */}
          <div className="w-10 text-center">{index + 1}</div>

          {/* 상품명 */}
          <div className="flex w-72 flex-col gap-6" style={{ width: "600px", paddingLeft: "40px" }}>
            <Select
              name="상품명"
              value={saleItem.menuName || ""}
              onChange={value => {
                // 선택된 메뉴 항목 찾기
                const selectedMenu = menuList.find(menu => menu.menuName === value);

                if (selectedMenu) {
                  setSelMenu(selectedMenu); // 선택된 메뉴 저장
                  setSaleItem(prev => ({
                    ...prev,
                    menuCode: selectedMenu.menuCode,
                    menuName: selectedMenu.menuName,
                  }));
                  setIsDropdownOpen(false); // 드롭다운 닫기
                }
              }}
              placeholder="상품명을 선택하세요"
            >
              {menuList && menuList.length > 0 ? (
                menuList.map(menu => (
                  <Option key={menu.menuCode} value={menu.menuName}>
                    {menu.menuName}
                  </Option>
                ))
              ) : (
                <Option disabled>검색 결과 없음</Option>
              )}
            </Select>
          </div>

          {/* 수량, 합계 등 다른 입력 필드 */}
          <QuantityInput
            name="수량"
            type="number"
            placeholder="수량"
            value={saleItem.salesCount || ""}
            onChange={e => setSaleItem({ ...saleItem, salesCount: e.target.value })}
          />
          <TotalInput
            name="매출합계"
            type="number"
            value={saleItem.salesAmount || ""}
            placeholder="매출 합계"
            onChange={e => setSaleItem({ ...saleItem, salesAmount: e.target.value })}
            onKeyDown={event => handleEnterKey(event)}
          />
        </TableRow>
      ))}
    </ContentListDiv>
  );
};

const Form = styled.form`
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
  text-align: center;
  margin-bottom: 10px;
  width: 1000px;
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

const TableHeader = styled.div`
  display: flex;
  //justify-content: left;
  align-items: center;
  text-align: center;
  height: 50px;
  width: 1000px;
  font-weight: bold;
  font-size: 14px;
`;

const TableHeaderItem1 = styled.div`
  display: flex;
  justify-content: center;
  text-align: left;
  align-items: center;
  margin-left: 50px; /* 순번의 좌측 여백 */
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
  margin-right: 70px; /* 테이블 우측 여백 */
  margin-left: 70px;
`;

const TableRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding-left: 42px;
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

// const ProductSearchInput = styled.input`
//   width: 600px;
//   height: 40px;

//   padding: 8px;
//   font-size: 16px;
//   border: 1px solid #ddd;
//   border-radius: 5px;
//   position: relative;

//   // margin-right: 30px;
// `;

export const ProductSearchWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const ProductSearchInput = styled.input`
  width: 600px;
  height: 40px;

  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const DropdownList = styled.div`
  // position: absolute;
  top: 100%;
  width: 500px;
  right: 0;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ddd;
  background-color: #fff;
  z-index: 1000;
`;

export const DropdownItem = styled.li`
  padding: 8px;
  cursor: pointer;
  border-bottom: 1px solid #eee;

  &:hover {
    background-color: #f1f1f1;
  }
`;

export const NoResults = styled.div`
  padding: 8px;
  color: #888;
`;

const QuantityInput = styled.input`
  width: 64px;
  height: 40px
  display: flex;
  justify-content: left;

  font-size: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  // margin-left: 80px;
  padding-top: 5px;
  padding-bottom: 7px;
`;

const TotalInput = styled.input`
  width: 140px;
  height: 40px;

  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
  // margin-left: 20px;
  margin-right: 10px;

  // padding-left: 10px;
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
