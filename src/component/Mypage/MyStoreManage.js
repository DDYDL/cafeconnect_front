import * as m from '../styles/StyledMypage.tsx';
import * as s from '../styles/StyledStore.tsx';

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Input, Button, Dialog, IconButton, Typography, DialogBody, DialogHeader, DialogFooter } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from 'axios';
import { axiosInToken, url } from '../../config.js';
import { useAtom, useAtomValue } from 'jotai/react';
import { memberAtom, tokenAtom } from '../../atoms.js';

const MyStoreManage = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const [token, setToken] = useAtom(tokenAtom);

    const [storeList, setStoreList] = useState([]);
    const [store, setStore] = useState({storeCode:0, storeName:'', storeStatus:''});

    // Jotai의 member 가져오기
    const [member, setMember] = useAtom(memberAtom);

    useEffect(()=>{
        setStore({});
        setStoreList([]);
        getStoreList();
    }, [])

    const getStoreList = ()=>{
        axiosInToken(token).get(`${url}/selectStoreList/${member.username}`)
        .then(res=>{
            if(res.headers.authorization!=null) {
                setToken(res.headers.authorization);
            }
            console.log(res.data);
            setStoreList([...res.data]);
        })
        .catch(err=>{
            console.log(err);
        })
    }

    // 가맹점 추가 전 가맹점 조회
    const selectStore = (storeCode)=>{
        axiosInToken(token).get(`${url}/selectStore/${storeCode}`)
        .then(res=>{
            if(res.headers.authorization!=null) {
                setToken(res.headers.authorization);
            }
            console.log(res.data);
            setStore(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    }

    const edit = (e)=>{
        setStore({...store, [e.target.name]:e.target.value});
    } 

    const addStore = (e)=>{
        setOpen(false);
        axiosInToken(token).get(`${url}/addStore/${store.storeCode}/${member.username}`)
        .then(res=>{
            if(res.headers.authorization!=null) {
                setToken(res.headers.authorization);
            }
            console.log(res.data);
            alert("가맹점이 추가 되었습니다.");
            setStoreList([...storeList, res.data]);
        })
        .catch(err=>{
            console.log(err);
            alert("잠시후 다시 시도해주세요.");
        })
    }

    const deleteStore = (storeCode)=>{
        axiosInToken(token).get(`${url}/deleteStore/${storeCode}`)
        .then(res=>{
            console.log(res.data);
            if(res.headers.authorization!=null) {
                setToken(res.headers.authorization);
            }
            alert("가맹점 삭제신청이 되었습니다.");
            // 삭제 신청된 가맹점은 삭제 버튼 없애기
            setStoreList(storeList.map(store=>(store.storeCode===storeCode ? {...store, storeStatus:"request"} : store)));
        })
        .catch(err=>{
            console.log(err);
            alert("잠시후 다시 시도해주세요.");
        })
    }

    return (
        <>
            <s.ContentListDiv width='800px' marginLeft='580px'>
                <s.MainTitleText>내 가맹점 관리</s.MainTitleText>
                <s.SearchButtonDiv textAlign='right'>
                    <s.ButtonStyle><Link onClick={handleOpen}>가맹점 추가</Link></s.ButtonStyle>
                </s.SearchButtonDiv>

                {
                    storeList.map(store=>(
                        <m.AlarmDiv height='120px' marginTop='10px'>
                            <m.StoreButtonDiv>
                                {store.storeStatus==='active' ? <s.ButtonStyle width='70px'><Link onClick={()=>deleteStore(store.storeCode)}>삭제 신청</Link></s.ButtonStyle>:<></>}
                            </m.StoreButtonDiv>
                            <m.AlarmInnerDiv><m.AlarmSpan>{store.storeName}</m.AlarmSpan></m.AlarmInnerDiv>
                            <m.AlarmInnerDiv><m.AlarmSpan fontWeight='normal'>{store.storeAddress}</m.AlarmSpan></m.AlarmInnerDiv>
                            <m.AlarmInnerDiv><m.AlarmSpan fontWeight='normal'>{store.storePhone}</m.AlarmSpan></m.AlarmInnerDiv>
                        </m.AlarmDiv>
                    ))
                }
            </s.ContentListDiv>

            <s.DialogDiv open={open} handler={handleOpen} className="p-4">
                <DialogHeader className="relative m-0 block">
                    가맹점 추가
                    <IconButton
                        size="sm"
                        variant="text"
                        className="!absolute right-3.5 top-3.5"
                        onClick={handleOpen}
                    >
                        <XMarkIcon className="h-4 w-4 stroke-2" />
                    </IconButton>
                </DialogHeader>
                <DialogBody className="space-y-4 pb-6">
                    <div>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="mb-2 text-left font-medium">가맹점 코드</Typography>
                        <s.InputStyle width='340px'
                            color="gray"
                            size="lg"
                            name="storeCode"
                            style={{padding:'15px'}}
                            className="placeholder:opacity-100 focus:!border-t-gray-900"
                            containerProps={{
                                className: "!min-w-full",
                            }}
                            labelProps={{
                                className: "hidden",
                            }}
                            value={store.storeCode===0 ? "" : store.storeCode}
                            onChange={edit}
                        />&nbsp;&nbsp;
                        <s.ButtonStyle variant="outlined" bgColor="white" width='60px' onClick={()=>selectStore(store.storeCode)}>조회</s.ButtonStyle>
                    </div>
                    <div>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="mb-2 text-left font-medium">가맹점명</Typography>
                        <s.InputStyle width='410px'
                            color="gray"
                            size="lg"
                            name="number"
                            style={{padding:'15px'}}
                            className="placeholder:opacity-100 focus:!border-t-gray-900"
                            containerProps={{
                                className: "!min-w-full",
                            }}
                            labelProps={{
                                className: "hidden",
                            }}
                            value={store.storeName} readOnly
                        />
                    </div>
                </DialogBody>
                <DialogFooter>
                    <s.ButtonStyle width='60px' className="ml-auto" onClick={addStore}>추가</s.ButtonStyle>
                </DialogFooter>
            </s.DialogDiv>
        </>
    )
}
 
export default MyStoreManage;