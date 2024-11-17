import * as m from '../styles/StyledMypage.tsx';
import * as s from '../styles/StyledStore.tsx';

import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Input, Button, Dialog, IconButton, Typography, DialogBody, DialogHeader, DialogFooter } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const MyStoreManage = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    return (
        <>
            <s.ContentListDiv width='800px' marginLeft='580px'>
                <s.MainTitleText>내 가맹점 관리</s.MainTitleText>
                <s.SearchButtonDiv textAlign='right'>
                    <s.ButtonStyle><Link onClick={handleOpen}>가맹점 추가</Link></s.ButtonStyle>
                </s.SearchButtonDiv>

                <m.AlarmDiv height='120px' marginTop='10px'>
                    <m.StoreButtonDiv>
                        <s.ButtonStyle width='70px'><Link to="/">삭제 신청</Link></s.ButtonStyle>
                    </m.StoreButtonDiv>
                    <m.AlarmInnerDiv><m.AlarmSpan>Kosta커피 독산역점</m.AlarmSpan></m.AlarmInnerDiv>
                    <m.AlarmInnerDiv><m.AlarmSpan fontWeight='normal'>서울 금천구 독산동 986-13(세림상가, 2층)</m.AlarmSpan></m.AlarmInnerDiv>
                    <m.AlarmInnerDiv><m.AlarmSpan fontWeight='normal'>02)471-2087</m.AlarmSpan></m.AlarmInnerDiv>
                </m.AlarmDiv>
                <m.AlarmDiv height='120px' marginTop='10px'>
                    <m.StoreButtonDiv>
                        <s.ButtonStyle width='70px'><Link to="/">삭제 신청</Link></s.ButtonStyle>
                    </m.StoreButtonDiv>
                    <m.AlarmInnerDiv><m.AlarmSpan>Kosta커피 독산역점</m.AlarmSpan></m.AlarmInnerDiv>
                    <m.AlarmInnerDiv><m.AlarmSpan fontWeight='normal'>서울 금천구 독산동 986-13(세림상가, 2층)</m.AlarmSpan></m.AlarmInnerDiv>
                    <m.AlarmInnerDiv><m.AlarmSpan fontWeight='normal'>02)471-2087</m.AlarmSpan></m.AlarmInnerDiv>
                </m.AlarmDiv>
            </s.ContentListDiv>

            <Dialog size="xs" open={open} handler={handleOpen} className="p-4">
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
                            name="name"
                            className="placeholder:opacity-100 focus:!border-t-gray-900"
                            containerProps={{
                                className: "!min-w-full",
                            }}
                            labelProps={{
                                className: "hidden",
                            }}
                        />&nbsp;&nbsp;
                        <s.ButtonStyle variant="outlined" bgColor="white" width='60px'>조회</s.ButtonStyle>
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
                            className="placeholder:opacity-100 focus:!border-t-gray-900"
                            containerProps={{
                                className: "!min-w-full",
                            }}
                            labelProps={{
                                className: "hidden",
                            }}
                        />
                    </div>
                </DialogBody>
                <DialogFooter>
                    <s.ButtonStyle width='60px' className="ml-auto" onClick={handleOpen}>추가</s.ButtonStyle>
                </DialogFooter>
            </Dialog>
        </>
    )
}
 
export default MyStoreManage;