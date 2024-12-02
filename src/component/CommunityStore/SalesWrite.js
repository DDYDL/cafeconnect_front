import { Option, Select } from "@material-tailwind/react";
import axios from "axios";
import { useAtomValue } from "jotai/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Datepicker from "react-tailwindcss-datepicker";
import styled from "styled-components";
import { tokenAtom } from "../../atoms.js";
import { axiosInToken } from "../../config.js";
import { CustomButton, TempSaveButton } from "../styledcomponent/Button.style";
import { CustomHorizontal } from "../styledcomponent/Horizin.style";
import { ContentListDiv } from "../styles/StyledStore.tsx";

//!! 해당 페이지 접속 시, db에 MenuList요청하기
const SalesWrite = () => {
  const token = useAtomValue(tokenAtom);

  const initSaleItem = {
    salesCount: 1,
    salesStatus: 1,
    menuCode: "",
    menuName: "",
    storeCode: 1,
    salesAmount: 1,
    salesDate: "",
  };

  // menuList가 undefined일 경우 기본값으로 빈 배열을 설정
  const [menuList, setMenuList] = useState([]);
  const [selMenu, setSelMenu] = useState([initSaleItem]);
  const [salesCount, setSaleCount] = useState(0);
  const [salesTotal, setSaleTotal] = useState(0);
  const [sale, setSale] = useState(initSaleItem);
  const navigate = useNavigate(); // useNavigate 훅을 호출하여 navigate 함수 정의

  // const [saleItem, setSaleItem] = useState(initSaleItem);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 열림 상태
  const [salesList, setSalesList] = useState([]);
  const [datePicker, setDatePicker] = useState({ startDate: null, endDate: null });
  const [date, setDate] = useState();

  const handleSubmit = event => {
    event.preventDefault();

    const newSale = {
      ...sale,
      menuName: sale.salesMenu,
      salesCount: sale.salesCount,
      salesAmount: sale.salesAmount,
      salesDate: new Date().toISOString(),
    };
    console.log("newSale" + newSale);

    // !! 작성 완료, post내부 url 문제로 백엔드에 전송 안됐었음.
    axios
      .post(`http://localhost:8080/salesWrite`, JSON.stringify(newSale), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 필요한 경우 인증 토큰 추가
        },
      })
      .then(res => {
        console.log("newSale", newSale);
        console.log("res.data", res.data);

        // 등록 완료 후 alert을 먼저 띄운 뒤, 일정 시간이 지나면 페이지 이동
        alert("매출이 성공적으로 등록되었습니다.");
        navigate(`/salesWrite`);
      })
      .catch(err => {
        console.error(err);
        alert("문의 등록 중 오류가 발생했습니다.");
      });
  };

  // 메뉴 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchData = () => {
      axiosInToken(token)
        .get("menuList")
        .then(res => {
          console.log("menuList" + res.data);
          setMenuList([...res.data]);
          console.log("menuList" + menuList);
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

  // 입력값 변경 핸들러
  const handleInputChange = (index, field, value) => {
    const updatedMenu = [...selMenu]; // 기존 상태 복사
    updatedMenu[index][field] = value; // 해당 항목의 값 업데이트
    setSelMenu(updatedMenu); // 업데이트된 상태 설정
  };

  // 항목 추가 핸들러
  const handleAddItem = () => {
    const newIndex = selMenu.length > 0 ? selMenu[selMenu.length - 1].index + 1 : 0;
    setSelMenu([...selMenu, { index: newIndex, 상품명: "", 수량: "", 합계: "" }]);
  };

  // 드롭다운 아이템 선택 처리
  const handleItemClick = item => {
    setSelMenu(item); // 선택한 값으로 검색어 업데이트
    setIsDropdownOpen(false); // 드롭다운 닫기
  };
  const handleSelect = (index, value) => {
    console.log(value); // value를 확인
    handleInputChange(index, "menuName", value); // 해당 항목에 menuName 값 업데이트
  };

  const handleEnterKey = (event, index) => {
    if (event.keyCode !== 13) return;
    console.log(sale.menuName);
    if (sale.menuName === undefined) {
      alert("메뉴를 선택하세요");
      return;
    }
    if (sale.salesCount === "" || sale.salesCount === 0) {
      alert("수량을 선택하세요");
      return;
    }
    if (sale.salesAmount === "" || sale.salesAmount === 0) {
      alert("매출금액을 선택하세요");
      return;
    }
    // setSalesList([...salesList, saleItem])
    console.log("salesList1 = " + salesList);

    setSalesList([...salesList, { ...sale, menuCode: sale.menuCode, menuName: sale.menuName }]);
    console.log("salesList2 = " + salesList);
    setSale(initSaleItem);
    // setSelMenu({});
  };

  const submit = flag => {
    console.log(sale);
    // setSalesList([saleItem])

    console.log(date);
    console.log("salesList = " + salesList);
    // const sendSalesList = salesList.map(s=>{s.salesStatus=flag; s.salesDate=date; return s});
    // setSalesList([...sendSalesList])

    axiosInToken(token).get("store");

    const postdata = [
      ...salesList,
      { ...sale, menuCode: sale.menuCode, menuName: sale.menuName, storeCode: token },
    ];

    const dataToSend = {
      salesList: postdata,
      storeCode: initSaleItem.storeCode,
    };

    const handleMenuSelect = selectedMenu => {
      setSale(selectedMenu);
      setSale(prevState => ({
        ...prevState,
        menuName: selectedMenu.menuName,
        menuCode: selectedMenu.menuCode,
      }));
    };

    //   [...salesList,
    // {...saleItem, menuCode:selMenu.menuCode, menuName:selMenu.menuName}]);

    // console.log("sendSalesList = " + sendSalesList);
    // console.log("salesList = " + salesList);

    console.log("dataToSend" + dataToSend);

    // axiosInToken(token).post("salesWrite", {salesList:dataToSend})
    axios
      .post("/salesWrite", JSON.stringify(dataToSend), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
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

    axiosInToken(token)
      .post("salesTemp", { salesDate: dateString, storeCode: initSaleItem.storeCode })
      .then(res => {
        console.log(res);
        setSalesList([...res.data]);
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
          <div style={{ color: "blue", fontWeight: "bold" }}>{calculateTotal()}원</div>
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

      <TableRowBody>
        {sale.map((row, index) => (
          <TableRow key={index}>
            {/* 순번을 동적으로 표시 */}
            <OrderDiv>{index + 1}</OrderDiv>

            <SelectDataWrapper>
              <Select
                style={{ width: "100%" }}
                size="md"
                value={selMenu.menuName || ""}
                onChange={e => handleInputChange({ ...selMenu, selMenu: e.target.value })}
              >
                {menuList.map(menu => (
                  <Option key={menu.menuCode} value={menu.menuName}>
                    {menu.menuName}
                  </Option>
                ))}
              </Select>
            </SelectDataWrapper>

            <QuantityInputWrapper>
              <QuantityInput
                type="number"
                value={selMenu.count}
                // onChange={e => setCount({ ...selMenu, count: e.target.value })}
              />
            </QuantityInputWrapper>

            <TotalInputWrapper>
              <TotalInput
                type="number"
                value={selMenu[index].salesAmount} // 매출 금액을 해당 항목으로 변경
                onChange={e => handleInputChange({ ...selMenu, total: e.target.value })} // 값 변경 처리
                onKeyDown={e => handleEnterKey(e, index)} // 엔터 키 이벤트 추가
              />
            </TotalInputWrapper>

            {/* 추가된 매출 항목 표시 */}
            {salesList.map((item, index) => (
              <div key={index}>
                {/* 메뉴 선택 */}
                <select
                  value={item.menuCode}
                  onChange={e => {
                    const newSalesList = [...salesList];
                    newSalesList[index].menuCode = e.target.value;
                    setSalesList(newSalesList);
                  }}
                >
                  <option value="">메뉴를 선택하세요</option>
                  {/* 메뉴 선택 옵션들 */}
                </select>

                {/* 수량 입력 */}
                <input
                  type="number"
                  value={item.salesCount}
                  onChange={e => {
                    const newSalesList = [...salesList];
                    newSalesList[index].salesCount = e.target.value;
                    setSalesList(newSalesList);
                  }}
                />

                {/* 매출 금액 입력 */}
                <input
                  type="number"
                  value={item.salesAmount}
                  onChange={e => {
                    const newSalesList = [...salesList];
                    newSalesList[index].salesAmount = e.target.value;
                    setSalesList(newSalesList);
                  }}
                />
              </div>
            ))}
          </TableRow>
        ))}
      </TableRowBody>
    </ContentListDiv>
  );
};

const Form = styled.form`
  display: flex;
  // flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const TableInfoList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 50px;

  // margin-top: 5px;
  margin-bottom: 5px;

  cursor: pointer;

  & > div {
    onClick =>() = > {
      color: red;
    }
  }

  & > div:first-child {
    margin-left: 37px;
  }

  & > div:last-child {
    margin-right: 37px;
  }
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

const TableRowBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 10px;
  width: 1000px;
`;

const TableRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  width: 1000px; /* 너비를 지정하여 일정한 크기 유지 */
`;

const SelectDataWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 560px; /* Select의 너비를 좁혀줍니다 */
  padding-right: 30px;
`;

const QuantityInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px; /* 수량 입력 영역의 너비 조정 */
  margin-right: 20px;
`;

const TotalInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px; /* 매출 합계 입력 영역의 너비 조정 */
`;

const SelectData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 340px;
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

const OrderDiv = styled.div`
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

const ProductSearchWrapper = styled.div`
  // position: relative;
  // width: 100%;
`;

const ProductSearchWrapper1 = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px; /* 각 요소 간의 간격을 적당히 추가 */
`;

const ProductSearchInput = styled.input`
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
  height: 40px;
  font-size: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-left: 10px; /* 왼쪽 여백 */
  padding-top: 5px;
  padding-bottom: 7px;
`;

const TotalInput = styled.input`
  width: 140px;
  height: 40px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-left: 10px; /* 왼쪽 여백 */
  margin-right: 10px;
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 7px;
`;

const ProductList = styled.div`
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
