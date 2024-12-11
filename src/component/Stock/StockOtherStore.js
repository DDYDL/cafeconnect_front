import * as s from '../styles/StyledStore.tsx';

import { Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { axiosInToken, url } from '../../config.js';
import { useAtom, useAtomValue } from 'jotai/react';
import { tokenAtom } from '../../atoms.js';

const StockOrderStore = () => {
    const navigate = useNavigate();
    const [itemList, setItemList] = useState([]);
    const [itemName, setItemName] = useState("");
    const [token, setToken] = useAtom(tokenAtom);

    useEffect(()=>{
        setItemList([]);
        setItemName("");
        getItemList();
    }, [])

    const getItemList = ()=>{
        axiosInToken(token).get(`${url}/selectItemList`)
        .then(res=>{
            if(res.headers.authorization!=null) {
                setToken(res.headers.authorization);
            }
            console.log(res.data);
            setItemList([...res.data]);
        })
        .catch(err=>{
            console.log(err);
            alert("잠시후 다시 시도해주세요.");
        })
    }

    const searchKeyword = (itemName)=>{
        console.log(itemName);
        axiosInToken(token).get(`${url}/selectItemByName/${itemName}`)
        .then(res=>{
            if(res.headers.authorization!=null) {
                setToken(res.headers.authorization);
            }
            console.log(res.data);
            setItemList([...res.data]);
        })
        .catch(err=>{
            console.log(err);
            alert("잠시후 다시 시도해주세요.");
        })
    }

    const selectItem = (itemCode, itemName)=>{
        navigate("/stockOtherStoreItem", {state: {"itemCode":itemCode, "itemName":itemName}});
    }

    return (
        <>
            <s.ContentListDiv>
                <s.MainTitleText>타매장재고조회</s.MainTitleText>
                <s.SearchButtonDiv>
                    <s.SearchDiv>
                        <Input icon={<MagnifyingGlassIcon className="h-5 w-5" onClick={()=>searchKeyword(itemName)}/>} label="상품명 검색" onChange={(e)=>setItemName(e.target.value)}/>
                    </s.SearchDiv>
                </s.SearchButtonDiv>

                <s.TableList>
                    <s.TableListThead><tr><s.TableTextTh width='300px'>상품정보</s.TableTextTh><s.TableTextTh width='150px'>카테고리</s.TableTextTh><s.TableTextTh>규격</s.TableTextTh>
                        <s.TableTextTh>보관상태</s.TableTextTh><s.TableTextTh>공급가</s.TableTextTh></tr></s.TableListThead>
                    <tbody>
                        {
                            itemList.map(item=>(
                                <s.TableTextTr key={item.itemCode} onClick={()=>selectItem(item.itemCode, item.itemName)}>
                                    <s.TableTextTd paddingLeft='20px'><s.ImageSize src={`${url}/image/${item.itemFileName}`}/><s.SpanSizeDiv width='300px'><s.SpanSize>{item.itemCode}</s.SpanSize><br/><s.SpanSize>{item.itemName}</s.SpanSize></s.SpanSizeDiv></s.TableTextTd>
                                    <s.TableTextTd>{item.itemMajorCategoryName}/{item.itemMiddleCategoryName}/{item.itemSubCategoryName}</s.TableTextTd>
                                    <s.TableTextTd>{item.itemCapacity}*{item.itemUnitQuantity}/{item.itemUnit}</s.TableTextTd>
                                    <s.TableTextTd>{item.itemStorage}</s.TableTextTd>
                                    <s.TableTextTd>{item.itemPrice}</s.TableTextTd>
                                </s.TableTextTr>
                            ))
                        }
                    </tbody>
                </s.TableList>
            </s.ContentListDiv>
        </>
    )
}
export default StockOrderStore;