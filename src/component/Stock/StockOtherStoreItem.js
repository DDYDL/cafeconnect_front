import * as s from '../styles/StyledStore.tsx';
import { Input } from "@material-tailwind/react";

const StockOrderStoreItem = () => {
    return (
        <>
            <s.ContentListDiv>
                <s.MainTitleText>타매장재고조회</s.MainTitleText>
                <s.SearchButtonDiv>
                    <s.SearchDiv>
                        <Input type='text' value='    24OZ 종이컵' disabled/>
                    </s.SearchDiv>
                    <img src='/map.png'/>
                </s.SearchButtonDiv>
            </s.ContentListDiv>
        </>
    )
}
export default StockOrderStoreItem;