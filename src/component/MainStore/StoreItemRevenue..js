import {
    CommonWrapper,
    CommonContainer,
    ContainerTitleArea,
} from "../styledcomponent/common.tsx";

import * as sr from '../styledcomponent/mainstorerevenue.tsx';
import { StyledButton } from "../styledcomponent/button.tsx";
import { Datepicker } from "flowbite-react";
import { Select, Option, Input } from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function StoreItemRevenue() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [stores, setStores] = useState([
        {
            storeCode: 1,
            storeName: "독산역1호점"
        },
        {
            storeCode: 2,
            storeName: "독산역2호점"
        },
        {
            storeCode: 3,
            storeName: "독산역3호점"
        },
    ])
    return (
        <CommonWrapper>
            <CommonContainer>
                <ContainerTitleArea><h2>가맹점별상세주문내역</h2></ContainerTitleArea>

                <sr.FilterWrapWithDatePicker>
                    <sr.StoreChooseWrap>
                        <Select
                        label="선택"
                        className="selectbox"
                    >
                        {stores.map((store) => (
                            <Option value="">{store.storeName}</Option>
                        ))}
                    </Select>
                    </sr.StoreChooseWrap>

                    <sr.DatePickerInputWrap>
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
                    </sr.DatePickerInputWrap>
                    <StyledButton size="sm" theme="brown">
                        조회
                    </StyledButton>
                </sr.FilterWrapWithDatePicker>
            </CommonContainer>
        </CommonWrapper >
    )
}
export default StoreItemRevenue;