import { useLocation } from 'react-router';
import * as s from '../styles/StyledStore.tsx';
import { Input } from "@material-tailwind/react";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../../config.js';

import { Map } from "react-kakao-maps-sdk";

const StockOrderStoreItem = () => {
    // 이전 페이지에서 navigate로 넘겨준 itemCode 받아오기
    const location = useLocation();
    const itemCode = location.state.itemCode;
    const itemName = location.state.itemName;

    const [storeList, setStoreList] = useState([]);

    useEffect(()=>{
        setStoreList([]);
        getStoreList();
    }, [])

    const getStoreList = ()=>{
        axios.get(`${url}/selectStoreByItemCode/${itemCode}`)
        .then(res=>{
            console.log(res.data);
            setStoreList([...res.data]);
        })
        .catch(err=>{
            console.log(err);
            alert("잠시후 다시 시도해주세요.");
        })
    }

    return (
        <>
            <s.ContentListDiv>
                <s.MainTitleText>타매장재고조회</s.MainTitleText>
                <s.SearchButtonDiv>
                    <s.SearchDiv>
                        <Input type='text' value={itemName} disabled/>
                    </s.SearchDiv>
                    <Map
                        center={{ lat: 33.450701, lng: 126.570667 }}
                        style={{ width: '1000px', height: '600px' }}
                        level={3}
                    />
                </s.SearchButtonDiv>
            </s.ContentListDiv>
        </>
    )
}
export default StockOrderStoreItem;