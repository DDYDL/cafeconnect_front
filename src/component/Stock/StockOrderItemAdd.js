import { useEffect, useState } from 'react';
import * as s from '../styles/StyledStore.tsx';
import axios from 'axios';
import { url } from '../../config.js';

import { Link } from 'react-router-dom';
import { useAtom } from 'jotai/react';
import { memberAtom } from '../../atoms.js';

const StockOrderItemAdd = () => {
    const [orderList, setOrderList] = useState([]);

    // 체크박스 체크여부 확인
    const [checkOrder, setCheckOrder] = useState(false);
    // 체크한 orderNum 리스트 저장
    const [orderNumList, setOrderNumList] = useState([]);

    // Jotai의 member 가져오기
    const [member, setMember] = useAtom(memberAtom);

    useEffect(()=>{
        setOrderList([]);
        setOrderNumList([]);
        getOrderList();
    }, [])

    useEffect(()=>{
        console.log(orderNumList);
    }, [orderNumList]);

    const getOrderList = ()=>{
        console.log(member.storeCode);
        axios.get(`${url}/selectOrderList/${member.storeCode}`)
        .then(res=>{
            console.log(res.data);
            setOrderList([...res.data]);
        })
        .catch(err=>{
            console.log(err);
        })
    }

    const deleteCheckNum = (orderNum)=>{
        setOrderNumList(orderNumList.filter((item)=>item.orderNum!=orderNum));
    }

    const orderConfirm = ((checked, orderNum)=>{
        if(checked) {
            // 체크박스가 클릭되면 리스트에 추가
            setOrderNumList([...orderNumList, orderNum]);
        } else if(!checked) {
            // 체크박스가 해제되면 리스트에서 삭제(orderNum이 아닌 것들만 가져옴)
            deleteCheckNum(orderNum);
        }
    })

    const addStock = ()=>{
        axios.get(`${url}/addStockByOrderNum/${orderNumList}`)
        .then(res=>{
            console.log(res.data);
            alert("재고가 추가 되었습니다.");
            orderNumList.forEach(function(orderNum) {
                // 재고 추가된 order 제외
                setOrderList(orderList.filter(item=>item.orderNum!==orderNum));
                //setOrderList(orderList.map(item=>(item.orderNum===orderNum ? {...item, orderState:item.orderState} : item)));
            });
        })
        .catch(err=>{
            console.log(err);
            alert("잠시후 다시 시도해주세요.");
        })
    }

    return (
        <>
            <s.ContentListDiv>
            <s.MainTitleText>주문상품 재고추가</s.MainTitleText>
            <s.SearchButtonDiv textAlign='right'>
                <s.ButtonStyle><Link onClick={addStock}>재고 추가</Link></s.ButtonStyle>
            </s.SearchButtonDiv>

            <s.TableList>
                    <s.TableListThead><s.TableTextTh width='20px'></s.TableTextTh><s.TableTextTh>주문번호</s.TableTextTh><s.TableTextTh>주문날짜</s.TableTextTh><s.TableTextTh width='270px'>상품정보</s.TableTextTh>
                        <s.TableTextTh width='120px'>카테고리</s.TableTextTh><s.TableTextTh width='80px'>규격</s.TableTextTh><s.TableTextTh width='60px'>단위</s.TableTextTh>
                        <s.TableTextTh width='100px'>보관상태</s.TableTextTh><s.TableTextTh width='60px'>수량</s.TableTextTh><s.TableTextTh width='80px'>공급가</s.TableTextTh></s.TableListThead>
                <tbody>
                    {
                        orderList.map(order=>(
                            <s.TableTextTr key={order.orderNum}>
                                <s.TableTextTd><input type='checkbox' onChange={(e)=>orderConfirm(e.target.checked, order.orderNum)}/></s.TableTextTd>
                                <s.TableTextTd>{order.orderCode}</s.TableTextTd>
                                <s.TableTextTd>{order.orderDateStr}</s.TableTextTd>
                                <s.TableTextTd><s.ImageSize src={`${url}/image/${order.itemFileNum}`}/><s.SpanSizeDiv><s.SpanSize>{order.itemCode}</s.SpanSize><br/><s.SpanSize>{order.itemName}</s.SpanSize></s.SpanSizeDiv></s.TableTextTd>
                                <s.TableTextTd>{order.itemMajorCategoryName}/{order.itemMiddleCategoryName}/{order.itemSubCategoryName}</s.TableTextTd>
                                <s.TableTextTd>{order.itemCapacity}*{order.itemUnitQuantity}/{order.itemUnit}</s.TableTextTd>
                                <s.TableTextTd>{order.itemUnit}</s.TableTextTd>
                                <s.TableTextTd>{order.itemStorage}</s.TableTextTd>
                                <s.TableTextTd>{order.orderCount}</s.TableTextTd>
                                <s.TableTextTd>{order.itemPrice}</s.TableTextTd>
                            </s.TableTextTr>
                        ))
                    }
                </tbody>
            </s.TableList>
            </s.ContentListDiv>
        </>
    )
}
export default StockOrderItemAdd;