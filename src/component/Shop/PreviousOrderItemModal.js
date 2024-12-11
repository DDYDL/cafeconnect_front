import { useEffect, useState } from "react";
import {
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { StyledButton } from "../styledcomponent/button.tsx";
import * as c from "../styledcomponent/cartlist.tsx";
import { axiosInToken,url} from "../../config.js";
import { useAtom,useSetAtom } from "jotai/react";
import { tokenAtom,cartCountAtom} from "../../atoms";
import axios from 'axios';

const PreviousOrderItemsModal = ({
  open,
  handleClose,
  storeCode,
  prevOrderDateList,
  onSuccess,
}) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDateIndex, setSelectedDateIndex] = useState(0); // 날짜 목록의 인덱스
  const [selectedItems, setSelectedItems] = useState([]); // 선택한 주문했던 아이템 담기
  const [orderItems, setOrderItems] = useState([]); // 구매했던 아이템 리스트
  const [token,setToken] = useAtom(tokenAtom);

  useEffect(() => {
    //date가 있으면
    if (prevOrderDateList && prevOrderDateList.length > 0) {
      setSelectedDate(prevOrderDateList[0]); // 최근 날짜 셋
      getOrderItems(prevOrderDateList[0]); // 데이터 호출
    }
  }, [prevOrderDateList]);

  const getOrderItems = (selectDate) => {
    const formData = new FormData();
    formData.append("storeCode", storeCode);
    formData.append("orderDate", selectDate);
    formData.append("page", 1); // 1로 고정
    axiosInToken(token)
      .post("selectPreviouOrder", formData)
      .then((res) => {

        if(res.headers.authorization!=null) {
          setToken(res.headers.authorization)
      }
        setOrderItems(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 방향키로 데이터 변경 (인덱스값으로 조정하기)
  const handleDateChange = (direction) => {
    if (
      direction === "prev" &&
      selectedDateIndex < prevOrderDateList.length - 1
    ) {
      setSelectedDateIndex(selectedDateIndex + 1);
      const newDate = prevOrderDateList[selectedDateIndex + 1];
      setSelectedDate(newDate);
      getOrderItems(newDate);
    } else if (direction === "next" && selectedDateIndex > 0) {
      setSelectedDateIndex(selectedDateIndex - 1);
      const newDate = prevOrderDateList[selectedDateIndex - 1];
      setSelectedDate(newDate);
      getOrderItems(newDate);
    }
  };

  // 체크박스 상태 변경 처리
  const handleCheckboxChange = (itemCode, isChecked) => {
    //체크하면 기존꺼에 새로 추가 
    if (isChecked) {
      setSelectedItems((prev) => [...prev, itemCode]); 
    //체크해제하면 빼기 (code !== itemCode 애들만 새로운 배열로 만들어 저장 )
    } else {
      setSelectedItems((prev) => prev.filter((code) => code !== itemCode)); 
    }
  };

  const setCartCount = useSetAtom(cartCountAtom);
  const handleAddToCart = () => {
    if (selectedItems.length === 0) {
      alert("선택된 상품이 없습니다.");
      return;
    }
    const formData = new FormData();
    formData.append("storeCode", storeCode);
    formData.append("check", selectedItems);

    axiosInToken(token)
      .post("addPreOrderItemToCart", formData)
      .then((res) => {

        if(res.headers.authorization!=null) {
          setToken(res.headers.authorization)
      }

        alert("장바구니에 상품을 추가했습니다.");
        // cartCount를 업데이트
        axiosInToken(token).get(`${url}/cartAllCount?storeCode=${storeCode}`)
        .then(response => {
          
          if(response.headers.authorization!=null) {
            setToken(res.headers.authorization)
        }
          setCartCount(response.data);   //jotai 값 세팅
        });  
        onSuccess(); //장바구니 리스트 재로드;
        
      })
      .catch((err) => {
        console.log(err);
        alert("장바구니에 상품을 추가하는데 실패했습니다.");
      });
  };

  return (
    <c.StyledDialog open={open} handler={handleClose} size="lg">
      <c.ModalHeader>
        <c.ModalTitle>이전 상품 추가</c.ModalTitle>
        <XMarkIcon className="h-5 w-5 cursor-pointer" onClick={handleClose} />
      </c.ModalHeader>

      <c.DateNavigation>
        <button
          onClick={() => handleDateChange("prev")}
          disabled={selectedDateIndex === prevOrderDateList.length  - 1}
          className={`w-10 ${selectedDateIndex === prevOrderDateList.length - 1 ? 'invisible' : ''}`}
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <div className="date">{selectedDate}</div>
        <button
          onClick={() => handleDateChange("next")}
          disabled={selectedDateIndex === 0}
          className={`w-10 ${selectedDateIndex === 0 ? 'invisible' : ''}`}
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </c.DateNavigation>

      <div className="p-4">
        <c.ModalTable>
          <thead>
            <tr>
              <th>선택</th>
              <th>상품명</th>
              <th>카테고리</th>
              <th>금액</th>
              <th>주문상태</th>
              <th>주문수량</th>
            </tr>
          </thead>
          <tbody>
            {orderItems.map((item) => (
              <tr key={item.itemCode}>
                <c.CheckboxCell>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.itemCode)}
                    onChange={(e) => handleCheckboxChange(item.itemCode, e.target.checked)}
                  />
                </c.CheckboxCell>
                <td>{item.itemName}</td>
                <td>{`${item.majorCategoryName}/${item.middleCategoryName}/${
                  item.subCategoryName || "-"
                }`}</td>
                <td>{item.itemPrice?.toLocaleString()}원</td>
                <td>{item.itemStorage}</td>
                <td>{item.totalOrderCount}개</td>
              </tr>
            ))}
          </tbody>
        </c.ModalTable>
      </div>

      <c.ModalFooter>
        <StyledButton size="sm" theme="brown" onClick={handleAddToCart}>
          장바구니에 추가
        </StyledButton>
      </c.ModalFooter>
    </c.StyledDialog>
  );
};

export default PreviousOrderItemsModal;
