import { useState } from 'react';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { StyledButton } from "../styledcomponent/button.tsx";
import * as c from "../styledcomponent/cartlist.tsx";

const PreviousOrderItemsModal = ({ open, handleClose, onAddItems }) => {
  const [selectedDate, setSelectedDate] = useState("2024/10/20");
  const [selectedItems, setSelectedItems] = useState([]);

  const sampleItems = [
    {
      id: 1,
      name: "제다치즈 단백질 쿠키(8개입)",
      category: "웰빙/쿠키류/-",
      price: 26900,
      quantity: 50,
      orderDate: "2024/10/20"
    },
    {
      id: 2,
      name: "더블 볼랜드 하우스5PK",
      category: "웰빙/쿠키류/-",
      price: 26900,
      quantity: 50,
      orderDate: "2024/10/20"
    }
  ];

  const handleDateChange = (direction) => {
    const currentDate = new Date(selectedDate);
    const newDate = new Date(currentDate);
    
    if (direction === 'prev') {
      newDate.setMonth(currentDate.getMonth() - 1);
    } else {
      newDate.setMonth(currentDate.getMonth() + 1);
    }
    
    setSelectedDate(newDate.toLocaleDateString('ko-KR').replace(/\./g, '/'));
  };

  const handleCheckboxChange = (item) => {
    setSelectedItems(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        return prev.filter(i => i.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const handleAddSelected = () => {
    onAddItems(selectedItems);
    handleClose();
  };

  return (
    <c.StyledDialog open={open} handler={handleClose} size="lg">
      <c.ModalHeader>
        <c.ModalTitle>이전 상품 추가</c.ModalTitle>
        <XMarkIcon className="h-5 w-5 cursor-pointer" onClick={handleClose} />
      </c.ModalHeader>

      <c.DateNavigation>
        <button onClick={() => handleDateChange('prev')}>
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <div className="date">{selectedDate}</div>
        <button onClick={() => handleDateChange('next')}>
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
            {sampleItems.map(item => (
              <tr key={item.id}>
                <c.CheckboxCell>
                  <input
                    type="checkbox"
                    checked={selectedItems.some(i => i.id === item.id)}
                    onChange={() => handleCheckboxChange(item)}
                  />
                </c.CheckboxCell>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.price.toLocaleString()}원</td>
                <td>상온</td>
                <td>{item.quantity}개</td>
              </tr>
            ))}
          </tbody>
        </c.ModalTable>
      </div>

      <c.ModalFooter>
        <StyledButton size="sm" theme="brown" onClick={handleAddSelected}>
          장바구니에 추가
        </StyledButton>
      </c.ModalFooter>
    </c.StyledDialog>
  );
};

export default PreviousOrderItemsModal;