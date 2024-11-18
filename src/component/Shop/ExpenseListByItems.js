import {
    CommonWrapper,
    CommonContainer,
    ContainerTitleArea,
} from "../styledcomponent/common.tsx";
import { Datepicker } from "flowbite-react";
import { StyledButton } from "../styledcomponent/button.tsx";
import * as ol from "../styledcomponent/orderlist.tsx";
import { useState, useMemo } from "react";

function ExpenseListByItems (){
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    
    return(
        <CommonWrapper>
        <CommonContainer>
            <ContainerTitleArea><h2>지출내역</h2></ContainerTitleArea>
            <ol.DatePickerWrap>
          <ol.DatePickerInputWrap>
            <Datepicker
              value={startDate}
              onChange={(date) => setStartDate(date)}
              className="flowbite-datepicker"
              showTodayButton={true}
              showClearButton={true}
              dateFormat="yyyy-MM-dd"
            />
            <span>~</span>
            <Datepicker
              value={endDate}
              onChange={(date) => setEndDate(date)}
              className="flowbite-datepicker"
              showTodayButton={true}
              showClearButton={true}
              dateFormat="yyyy-MM-dd"
            />
          </ol.DatePickerInputWrap>
          <StyledButton size="sm" theme="brown">
            조회
          </StyledButton>
        </ol.DatePickerWrap>
           
            </CommonContainer>
        </CommonWrapper >
    )
}
export default ExpenseListByItems;