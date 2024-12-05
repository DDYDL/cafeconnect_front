import { useAtomValue } from "jotai/react";
import { useEffect, useState } from "react";
import Select, { components } from "react-select";
import Datepicker from "react-tailwindcss-datepicker";
import styled from "styled-components";
import { tokenAtom } from "../../atoms.js";
import { axiosInToken } from "../../config.js";
import { CustomButton, TempSaveButton } from "../styledcomponent/Button.style";
import { CustomHorizontal } from "../styledcomponent/Horizin.style";
import { ContentListDiv } from "../styles/StyledStore.tsx";

const Input = props => <components.Input {...props} isHidden={false} />;
//!! 해당 페이지 접속 시, db에 MenuList요청하기
const SalesWrite = () => {
  const token = useAtomValue(tokenAtom);
  // menuList가 undefined일 경우 기본값으로 빈 배열을 설정
  const [menuList, setMenuList] = useState([]);
  const initSaleItem = {
    salesCount: 1,
    salesStatus: 1,
    menuCode: "",
    menuName: "",
    storeCode: 1,
    salesAmount: 0,
    salesDate: "",
  };
  const [saleItem, setSaleItem] = useState(initSaleItem);
  const [salesList, setSalesList] = useState([]);
  const [datePicker, setDatePicker] = useState({ startDate: null, endDate: null });
  const [date, setDate] = useState();
  const [isTemp, setIsTemp] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [value, setValue] = useState();
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  // 메뉴 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchData = () => {
      axiosInToken(token)
        .get("menuList")
        .then(res => {
          console.log(res.data);
          setOptions(res.data.map(m => ({ label: m.menuName, value: m.menuCode })));
          setMenuList([...res.data]);
        })
        .catch(err => {
          console.log(err);
        });
    };
    //if(token!=null && token!=='') fetchData();
    fetchData();
  }, [token]);

  // 순번, 상품명, 수량, 매출 합계 상태 (배열로 관리)
  const [rows, setRows] = useState([
    { 순번: 1, 상품명: "", 수량: "", 매출합계: "", filteredProducts: [] },
  ]);

  // 총합계 계산
  const calculateTotal = () => {
    const total = salesList.reduce((sum, s) => {
      return +sum + +s.salesAmount;
    }, 0);
    return total.toLocaleString("ko-KR");
  };

  const addSaleItem = () => {
    if (datePicker.startDate === null) {
      alert("날짜를 선택하세요");
      return;
    }
    if (value.label === undefined) {
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
    setSalesList([...salesList, { ...saleItem, menuCode: value.value, menuName: value.label }]);
    setSaleItem(initSaleItem);
    setValue({});
    setInputValue("");
    calculateTotal();
  };

  const removeSaleItem = saleItem => {
    setSalesList([...salesList.filter(s => s !== saleItem)]);
  };

  const submit = flag => {
    if (flag === 1 && isSaved) {
      alert("등록된 매출은 임시저장할 수 없습니다");
      return;
    }
    const sendSalesList = salesList.map(s => {
      s.salesStatus = flag;
      s.salesDate = date;
      return s;
    });
    console.log(sendSalesList);
    setSalesList([...sendSalesList]);
    axiosInToken(token)
      .post("salesWrite", {
        salesDate: date,
        storeCode: initSaleItem.storeCode,
        salesList: sendSalesList,
      })
      .then(res => {
        console.log(res.data);
        setIsTemp(flag === 1);
        if (flag === 1) {
          alert(`${date}일 매출이 임시저장되었습니다`);
        } else if (flag === 2) {
          setIsSaved(true);
          alert(`${date}일 매출이 등록되었습니다`);
        }
      })
      .catch(err => {
        console.log(err);
        alert("매출 입력시 오류가 발생했습니다");
      });
  };

  const changeDate = newDate => {
    setDatePicker(newDate);
    if (newDate.startDate === null) return;
    const d = newDate.startDate;
    const year = d.getFullYear(); // 2023
    const month = (d.getMonth() + 1).toString().padStart(2, "0"); // 06
    const day = d.getDate().toString().padStart(2, "0"); // 18
    const dateString = year + "-" + month + "-" + day; // 2023-06-18
    console.log(dateString);
    setDate(dateString);

    setSalesList([]);
    axiosInToken(token)
      .post("salesTemp", { salesDate: dateString, storeCode: initSaleItem.storeCode })
      .then(res => {
        console.log(res);
        setSalesList([...res.data]);
        if (res.data.length > 0 && res.data[0].salesStatus === 1) {
          setIsTemp(true);
        } else {
          setIsTemp(false);
        }

        if (res.data.length > 0 && res.data[0].salesStatus === 2) {
          setIsSaved(true);
        } else {
          setIsSaved(false);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onInputChange = (inputValue, { action }) => {
    if (action === "input-change") {
      setInputValue(inputValue);
    }
  };
  const onChange = option => {
    console.log(option);
    setValue(option);
    setInputValue(option ? option.label : "");
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
          <TempSave>{isTemp && "* 임시저장 *"}</TempSave>
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
        <TableHeaderItem5>삭제</TableHeaderItem5>
      </TableHeader>

      <CustomHorizontal width="basic" bg="black" />
      <div className="App"></div>
      {salesList.length > 0 && (
        <>
          {salesList.map((s, index) => (
            <TableRow key={s.menuCode}>
              <ProductSearchWrapper>
                <OrderInput value={index + 1} readOnly />
                <ProductSearchInput type="text" value={s.menuName} />
                <QuantityInput
                  defaultValue={s.salesCount}
                  type="number"
                  min={"1"}
                  onChange={e => (s.salesCount = e.target.value)}
                />
                <TotalInput
                  defaultValue={s.salesAmount}
                  type="number"
                  min={"0"}
                  onChange={e => (s.salesAmount = e.target.value)}
                />
                <CustomButton
                  style={{ width: "60px", borderRadius: "4px", marginLeft: "18px" }}
                  onClick={() => removeSaleItem(s)}
                >
                  삭제
                </CustomButton>
              </ProductSearchWrapper>
            </TableRow>
          ))}
        </>
      )}

      <TableRow>
        <ProductSearchWrapper>
          <OrderInput readOnly />
          <div style={{ display: "inline-block", width: "530px" }}>
            <Select
              options={options.filter(
                o => salesList.filter(s => o.value === s.menuCode).length === 0
              )}
              isClearable={true}
              value={value}
              inputValue={inputValue}
              onInputChange={onInputChange}
              onChange={onChange}
              controlShouldRenderValue={false}
              components={{ Input }}
            />
          </div>

          <QuantityInput
            name="수량"
            type="number"
            placeholder="수량"
            min={"1"}
            value={saleItem.salesCount}
            onChange={e => setSaleItem({ ...saleItem, salesCount: e.target.value })}
          />
          <TotalInput
            name="매출합계"
            type="number"
            min={"0"}
            value={saleItem.salesAmount}
            placeholder="매출 합계"
            onChange={e => setSaleItem({ ...saleItem, salesAmount: e.target.value })}
            onKeyDown={e => {
              if (e.keyCode !== 13) return;
              addSaleItem();
            }}
          />
          <CustomButton
            style={{ width: "60px", borderRadius: "4px", marginLeft: "18px" }}
            onClick={addSaleItem}
          >
            추가
          </CustomButton>
        </ProductSearchWrapper>
      </TableRow>
    </ContentListDiv>
  );
};

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
  margin-left: 30px; /* 순번의 좌측 여백 */
`;

const TableHeaderItem2 = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1; /* 상품명 부분의 공간 확장 */
`;

const TableHeaderItem3 = styled.div`
  display: flex;
  justify-content: center;
  //margin-right: 40px; /* 매출 합계와 간격 추가 */
`;

const TableHeaderItem4 = styled.div`
  display: flex;
  justify-content: center;
  // margin-right: 10px; /* 매출 합계와 간격 추가 */
  // margin-right: 70px; /* 테이블 우측 여백 */
  margin-left: 95px;
`;

const TableHeaderItem5 = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 30px; /* 테이블 우측 여백 */
  margin-left: 100px;
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

const TempSave = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 100px;
  padding-left: 10px;
  color: darkgray;
  font-weight: bold;
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
  width: 30px;
  height: 38px;

  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #f8f8f8;

  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 7px;

  font-size: 16px;
  // border: 1px solid #ddd;
  border: none;
  border-radius: 5px;
  margin-left: 20px;
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
  width: 530px;
  height: 38px;

  padding: 8px;
  font-size: 16px;
  border: 1px solid hsl(0, 0%, 80%);
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
  width: 80px;
  height: 38px;

  font-size: 12px;
  border: 1px solid hsl(0, 0%, 80%);
  border-radius: 5px;
  margin-left: 20px;

  padding: 8px;
`;

const TotalInput = styled.input`
  width: 150px;
  height: 38px;

  font-size: 12px;
  border: 1px solid hsl(0, 0%, 80%);
  border-radius: 5px;
  margin-left: 20px;
  margin-right: 10px;

  padding: 8px;
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
