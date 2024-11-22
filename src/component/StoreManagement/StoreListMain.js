import * as s from '../styles/StyledStore.tsx';
import * as h from '../styles/HStyledStore.tsx';

import {useState, useEffect} from 'react';
import {url} from '../../config.js';
import axios from 'axios';
import {axiosInToken} from '../../config.js'
import { useAtomValue } from 'jotai/react';
import { memberAtom, tokenAtom } from '../../atoms';
import { Input, Option, FormGroup } from "@material-tailwind/react";
import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const StoreListMain = ()=>{
    const [storeList, setStoreList] = useState([]);
    const [pageBtn, setPageBtn] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [type, setType] = useState('');
    const [keyword, setKeyword] = useState('');
    const token = useAtomValue(tokenAtom);

    useEffect(()=> {
        submit(1);
    }, [])

    const submit = (page) => {
        const listUrl = `${url}/storeListMain?page=${page}&type=${type}&keyword=${keyword}`;
        axios.get(listUrl,
            {
                headers: {
                    Authorization:token
                }
            }
        )
        // axiosInToken(token).get(`storeListMain?page=${page}&type=${type}&keyword=${keyword}`)
            .then(res=> {
                let pageInfo = res.data.pageInfo;
                console.log(res.data.storeList)
                setStoreList([...res.data.storeList])
                let page = [];
                for(let i=pageInfo.startPage; i<=pageInfo.endPage; i++) {
                    page.push(i);
                }
                setPageBtn([...page]);
                setPageInfo(pageInfo);
            })
    }
    const search = () => {
        submit(1);
    }

    return (
        <>
            <s.ContentListDiv>
                <s.MainTitleText>가맹점 조회</s.MainTitleText>
                <h.CategoryButtonGroupDiv>
                    <h.SearchDiv>
                        <Input icon={<MagnifyingGlassIcon className="h-5 w-5" onClick={search}/> } label="매장명 검색" onChange={(e)=>{setKeyword(e.target.value);setType("storeName");}}/>
                    </h.SearchDiv>
                    <h.ButtonInnerDiv className='w-16'>
                        <h.SelectStyle name="type" label="지역" onChange={(e)=>{setKeyword(e.target.value);setType("storeAddress");submit(1);}}>
                            <Option name="keyword" value=''>Material Tailwind HTML</Option>
                        </h.SelectStyle>
                    </h.ButtonInnerDiv>
                </h.CategoryButtonGroupDiv>
                <s.TableList>
                    <s.TableListThead><s.TableTextTh width='160px'>지역</s.TableTextTh>
                        <s.TableTextTh width='160px'>매장명</s.TableTextTh>
                        <s.TableTextTh width='500px'>주소</s.TableTextTh>
                        <s.TableTextTh width='130px'>전화번호</s.TableTextTh></s.TableListThead>
                    <tbody  textAlign='center'>
                        {storeList.map(store=>(
                        <s.TableTextTr key={store.storeCode}>
                            <s.TableTextTd ></s.TableTextTd >
                            <s.TableTextTd >{store.storeName}</s.TableTextTd >
                            <s.TableTextTd ><a href={`/storeDetailMain/${store.storeCode}`}>{store.storeAddress}</a></s.TableTextTd >
                            <s.TableTextTd >{store.storePhone}</s.TableTextTd >
                        </s.TableTextTr>
                    ))}
                    </tbody>
                </s.TableList>
            </s.ContentListDiv>
        </>
    )
}
export default StoreListMain;