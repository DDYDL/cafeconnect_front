import { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import styled from "styled-components";
import { CustomButton, TempSaveButton } from "../styledcomponent/Button.style";
import { CustomHorizontal } from "../styledcomponent/Horizin.style";
import { ContentListDiv } from "../styles/StyledStore.tsx";
import {axiosInToken} from '../../config.js';
import { useAtomValue } from 'jotai/react';
import { tokenAtom } from '../../atoms.js';
import axios from "axios";

//!! 해당 페이지 접속 시, db에 MenuList요청하기
const SalesWrite = () => {
  const token = useAtomValue(tokenAtom);
  // menuList가 undefined일 경우 기본값으로 빈 배열을 설정
  const [menuList, setMenuList] = useState([]);
  const [selMenu, setSelMenu] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const initSaleItem = {salesCount:1,salesStatus:1,menuCode:'',
    menuName:'',storeCode:1,salesAmount:0, salesDate:''};
  const [saleItem, setSaleItem] = useState(initSaleItem)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 열림 상태
  const [salesList, setSalesList] = useState([]);
  const [datePicker, setDatePicker] = useState({startDate: null,endDate: null});
  const [date, setDate] = useState();

  // 메뉴 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchData = () => {
      axiosInToken(token).get('menuList')
          .then(res=> {
            console.log(res.data)
            setMenuList([...res.data]);
          })
          .catch(err=>{
            console.log(err);
          })
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

  // 드롭다운 아이템 선택 처리
  const handleItemClick = item => {
    setSelMenu(item); // 선택한 값으로 검색어 업데이트
    setIsDropdownOpen(false); // 드롭다운 닫기
  };

  const handleEnterKey = (event, index) => {
    if(event.keyCode!==13) return;
    console.log(selMenu.menuName)
    if(selMenu.menuName===undefined) {
      alert("메뉴를 선택하세요")
      return;
    }
    if(saleItem.salesCount==='' || saleItem.salesCount===0) {
      alert("수량을 선택하세요")
      return;
    }
    if(saleItem.salesAmount==='' || saleItem.salesAmount===0) {
      alert("매출금액을 선택하세요")
      return;
    }
    // setSalesList([...salesList, saleItem])
    console.log("salesList1 = " + salesList);

    setSalesList([...salesList,
      {...saleItem, menuCode:selMenu.menuCode, menuName:selMenu.menuName}]);
    console.log("salesList2 = " + salesList);
    setSaleItem(initSaleItem)
    setSelMenu({})
  };

  const submit = (flag) => {
    console.log(saleItem)
    // setSalesList([saleItem])

    console.log(date)
    console.log("salesList = " + salesList);
    // const sendSalesList = salesList.map(s=>{s.salesStatus=flag; s.salesDate=date; return s});
    // setSalesList([...sendSalesList])

      axiosInToken(token).get("store")

      const postdata = [...salesList, {...saleItem, menuCode: selMenu.menuCode, menuName: selMenu.menuName, storeCode: token}];
      const dataToSend = {
          salesList: postdata,
          storeCode: initSaleItem.storeCode
      };

      //   [...salesList,
      // {...saleItem, menuCode:selMenu.menuCode, menuName:selMenu.menuName}]);

    // console.log("sendSalesList = " + sendSalesList);
    // console.log("salesList = " + salesList);

      console.log("dataToSend" + dataToSend);


    // axiosInToken(token).post("salesWrite", {salesList:dataToSend})
      axios.post('/salesWrite', JSON.stringify(dataToSend), {
          headers: {
              'Content-Type': 'application/json',
          }
      })
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
          console.log(err);
        })
  };

const newList = () => {
    axiosInToken(token).post("salesWrite", {salesList: salesList})
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
          console.log(err);
        })
  }

  const changeDate = (newDate) => {
    setDatePicker(newDate)
    const d = newDate.startDate;
    const year = d.getFullYear(); // 2023
    const month = (d.getMonth() + 1).toString().padStart(2, '0'); // 06
    const day = d.getDate().toString().padStart(2, '0'); // 18
    const dateString = year + '-' + month + '-' + day; // 2023-06-18
    console.log(dateString); setDate(dateString)

    axiosInToken(token).post("salesTemp", {salesDate:dateString, storeCode:initSaleItem.storeCode})
        .then(res=> {
          console.log(res)
          setSalesList([...res.data])
        })
        .catch(err=> {
          console.log(err)
        })
  }

  return (
      <ContentListDiv>
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
                  value={datePicker} onChange={changeDate}
              />
            </SelectData>

            <TempSaveButton style={{ borderRadius: "4px", marginTop: "3px" }} onClick={()=>submit(1)}>
              임시저장
            </TempSaveButton>
            <CustomButton style={{ borderRadius: "4px", marginTop: "3px" }} onClick={()=>submit(2)}>등록</CustomButton>
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

        {salesList.length > 0 && (<>
              {salesList.map((s,index) => (
                  <TableRow key={s.menuCode}>
                    <ProductSearchWrapper>
                      <OrderInput value={index+1} readOnly />
                      <ProductSearchInput type="text" value={s.menuName}/>
                      <QuantityInput value={s.salesCount} type="number"/>
                      <TotalInput value={s.salesAmount}/>
                    </ProductSearchWrapper>
                  </TableRow>
              ))}
            </>
        )}

        <TableRow>
          <ProductSearchWrapper menuList={menuList}>
            <OrderInput readOnly />
            <ProductSearchInput
                name="상품명"
                type="text"
                placeholder={
                  menuList && menuList.length > 0 ? "검색어를 입력하세요" : "검색 결과 없음"
                }
                value={selMenu.menuName===undefined? '': selMenu.menuName}
                onChange={(e)=>setSelMenu({...selMenu, menuName:e.target.value})}
                onClick={() => setIsDropdownOpen(true)} // 클릭 시 드롭다운 열기
            />
            {isDropdownOpen && selMenu.menuName!=='' && menuList && menuList.length > 0 && (
                <DropdownList>
                  <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
                    {menuList.filter(m=>m.menuName.includes(selMenu.menuName)).map(fm => (
                        <DropdownItem key={fm.menuCode} onClick={() => handleItemClick(fm)}>
                          {fm.menuName}
                        </DropdownItem>
                    ))}
                  </ul>
                </DropdownList>
            )}
          </ProductSearchWrapper>

          <QuantityInput
              name="수량"
              type="number"
              placeholder="수량"
              value={saleItem.salesCount}
              onChange={e => setSaleItem({...saleItem, salesCount:e.target.value})}
          />
          <TotalInput
              name="매출합계"
              type="number"
              value={saleItem.salesAmount}
              placeholder="매출 합계"
              onChange={e => setSaleItem({...saleItem, salesAmount:e.target.value})

          }
              onKeyDown={event => handleEnterKey(event)}
          />
        </TableRow>

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
  width:500px;
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
