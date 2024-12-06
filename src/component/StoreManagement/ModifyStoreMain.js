import * as m from '../styles/StyledMypage.tsx';
import * as s from '../styles/StyledStore.tsx';
import * as h from '../styles/HStyledStore.tsx';


import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { axiosInToken } from '../../config.js'
import { useAtomValue } from 'jotai/react';
import { tokenAtom } from '../../atoms';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { Dialog, DialogBody } from "@material-tailwind/react";
import ReactSelect from "react-select";
import { ko } from 'date-fns/locale';
import { format, parse } from 'date-fns';

const ModifyStoreMain = ()=>{
    const {storeCode} = useParams();
    const navigate = useNavigate();
    const token = useAtomValue(tokenAtom);
    const [isOpen, setIsOpen] = useState(false);
    const [store, setStore] = useState({});
    const [timeDate, setTimeDate] = useState({
        contractDate: new Date(2020,0,1,0,0,0),
        openingDate: new Date(2020,0,1,0,0,0),
        contractPeriodStart: new Date(2020,0,1,0,0,0),
        contractPeriodEnd: new Date(2020,0,1,0,0,0),
        storeOpenTime: new Date(2000,0,1,0,0,0),
        storeCloseTime: new Date(2000,0,1,0,0,0)      
    });
    const [selectedDay, setSelectedDay] = useState(null);

    const setDefaultTimeDate = (data)=>{
        setTimeDate({
            contractDate: new Date(data.contractDate),
            contractPeriodStart: new Date(data.contractPeriodStart),
            contractPeriodEnd: new Date(data.contractPeriodEnd),
            openingDate: data.openingDate? new Date(data.openingDate):new Date(2000,0,1,0,0,0) ,
            storeOpenTime: data.storeOpenTime? parse("2000-01-01T"+data.storeOpenTime,"yyyy-MM-dd'T'HH:mm:ss", new Date()):new Date(2000,0,1,0,0,0),
            storeCloseTime: data.storeCloseTime? parse("2000-01-01T"+data.storeCloseTime,"yyyy-MM-dd'T'HH:mm:ss", new Date()):new Date(2000,0,1,0,0,0),
        });
        console.log(timeDate.storeOpenTime);
        setSelectedDay({value:data.storeCloseDate, label:data.storeCloseDate==''? "연중무휴":data.storeCloseDate});
    }

    useEffect(()=> {
        // 토큰의 State가 useEffect보다 느려서 토큰없이 실행 방지(Error 방지)
        if(token!=null && token!=='')  select();
    }, [token])

    useEffect(()=> {
        setStore({ ...store, ['contractDate']: format(timeDate.contractDate, 'yyyy-MM-dd')});
    }, [timeDate.contractDate])
    useEffect(()=> {
        setStore({ ...store, ['openingDate']: format(timeDate.openingDate, 'yyyy-MM-dd')});
    }, [timeDate.openingDate])
    useEffect(()=> {
        setStore({ ...store, ['contractPeriodStart']: format(timeDate.contractPeriodStart, 'yyyy-MM-dd')});
    }, [timeDate.contractPeriodStart])
    useEffect(()=> {
        setStore({ ...store, ['contractPeriodEnd']: format(timeDate.contractPeriodEnd, 'yyyy-MM-dd')});
    }, [timeDate.contractPeriodEnd])
    useEffect(()=> {
        setStore({ ...store, ['storeOpenTime']: format(timeDate.storeOpenTime, 'HH:mm:SS') });
    }, [timeDate.storeOpenTime])
    useEffect(()=> {
        setStore({ ...store, ['storeCloseTime']: format(timeDate.storeCloseTime, 'HH:mm:SS') });
    }, [timeDate.storeCloseTime])

    const select = () => {
        console.log(token)
        axiosInToken(token).get(`storeDetailMain/${storeCode}`)
            .then(res=> {
                console.log(res.data)
                let resStore = res.data.store;
                console.log(resStore.storeOpenTime);
                setDefaultTimeDate(resStore);
                setStore({...resStore});
            })
    }

    const edit = (e) => {
        setStore({ ...store, [e.target.name]: e.target.value });
        console.log(store);
    }
    
    const onCompletePost = (data) => {
        console.log(data);
        const {address, zonecode, bname, buildingName} = data;
        setStore({...store, storeAddressNum:zonecode, storeAddress:address +(', '+bname + buildingName!==', '&& ', '+buildingName), storeRegion: address.split(" ")[0]});
        }

    const modify = () => {
        axiosInToken(token).post('modifyStoreMain',store)
            .then(res=> {
                console.log(res);
                alert('정보 수정이 완료되었습니다.');
                navigate(`/storeDetailMain/${store.storeCode}`);
            })
            .catch(err=>{
                console.log(store);
                console.log(err.response.data);
                alert("정보 수정에 실패했습니다.");
            })
    }

    const dayOfweekArr = [
        {value: '', label: '연중무휴'},
        {value: '월', label: '월'},
        {value: '화', label: '화'},
        {value: '수', label: '수'},
        {value: '목', label: '목'},
        {value: '금', label: '금'},
        {value: '토', label: '토'},
        {value: '일', label: '일'}
    ];

    const selectDay = (selectedOption) => {
        setSelectedDay(selectedOption);
        setStore({...store, ['storeCloseDate']: selectedOption.value})
    };

    return (
        <>
            <s.ContentListDiv>
            <s.MainTitleText>가맹점 정보 수정</s.MainTitleText>

            <m.TableInfo>
                    <thead><m.TableInfoTh></m.TableInfoTh><m.TableInfoTh></m.TableInfoTh></thead>
                <tbody>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>가맹점 코드</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd><m.TableTitleSpan>{storeCode}</m.TableTitleSpan></m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>가맹점명</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd><s.InputStyle width='300px' type='text' name='storeName' value={store.storeName} onChange={edit}/></m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                    <m.TableInfoTd style={{verticalAlign:'top', paddingTop:'10px'}}><m.TableTitleSpan for="storeAddress">가맹점 주소<h.Required>*</h.Required></m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>
                        <s.SearchDiv width='300px' marginBottom='10px' margin='0px'>
                        <s.InputStyleSearch icon={<h.SearchIcon className="h-5 w-5" onClick={()=>setIsOpen(!isOpen)}/>} value={store.storeAddressNum} onChange={edit} style={{borderColor:'rgba(234, 234, 234, 1)'}}/></s.SearchDiv>
                        <s.InputStyle width='300px' type='text' value={store.storeAddress} onChange={edit}/>
                        </m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>가맹점/HP</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd><s.InputStyle width='300px' type='text' name='storePhone' value={store.storePhone} onChange={edit}/></m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>영업시간</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>    
                        <h.TimePickerPeriodWrap>          
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
                            <TimePicker
                                value={timeDate.storeOpenTime}
                                onChange={(time) => setTimeDate({ ...timeDate, ['storeOpenTime']: time})}
                                className="CustomPicker"
                                format='HH:mm'
                            /><div>~</div>
                            <TimePicker
                                value={timeDate.storeCloseTime}
                                onChange={(time) => setTimeDate({ ...timeDate, ['storeCloseTime']: time})}
                                className="CustomPicker"
                                format='HH:mm'
                            />
                            </LocalizationProvider>
                            </h.TimePickerPeriodWrap>
                            </m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>휴무일</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>
                        <h.ReactSelectDiv>
                                <ReactSelect
                                    isSearchable={false}
                                    value={selectedDay}
                                    options={dayOfweekArr} 
                                    onChange={selectDay}
                                />
                            </h.ReactSelectDiv>
                        </m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>계약체결일</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd> 
                        <h.DatePickerWrap>
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
                            <DatePicker
                                value={timeDate.contractDate}
                                showDaysOutsideCurrentMonth
                                onChange={(date) => setTimeDate({ ...timeDate, ['contractDate']: date })}
                                className="CustomPicker"
                                format='yyyy.MM.dd'
                            />
                        </LocalizationProvider>
                        </h.DatePickerWrap></m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>계약기간</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>
                        <h.DatePickerPeriodWrap>
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
                            <DatePicker
                                value={timeDate.contractPeriodStart}
                                showDaysOutsideCurrentMonth
                                onChange={(date) => setTimeDate({ ...timeDate, ['contractPeriodStart']: date })}
                                className="CustomPicker"
                                format='yyyy.MM.dd'
                            />
                            <div>~</div>
                            <DatePicker
                                value={timeDate.contractPeriodEnd}
                                showDaysOutsideCurrentMonth
                                onChange={(date) => setTimeDate({ ...timeDate, ['contractPeriodEnd']: date })}
                                className="CustomPicker"
                                format='yyyy.MM.dd'
                            />
                        </LocalizationProvider>
                        </h.DatePickerPeriodWrap>
                        </m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>최초개점일</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>                        
                        <h.DatePickerWrap>
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
                        <DatePicker
                                value={timeDate.openingDate}
                                showDaysOutsideCurrentMonth
                                onChange={(date) => setTimeDate({ ...timeDate, ['openingDate']: date })}
                                className="CustomPicker"
                                format='yyyy.MM.dd'
                            />
                        </LocalizationProvider>
                        </h.DatePickerWrap></m.TableInfoTd>
                    </m.TableInfoTr>
                </tbody>
            </m.TableInfo>

             <m.TableInfo>
                <thead><m.TableInfoTh></m.TableInfoTh><m.TableInfoTh></m.TableInfoTh></thead>
                <tbody>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>점주명</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd><s.InputStyle width='300px' type='text' name='ownerName' value={store.ownerName} onChange={edit}/></m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>점주/HP</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd><s.InputStyle width='300px' type='text' name='ownerPhone' value={store.ownerPhone} onChange={edit}/></m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>매니저명</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd><s.InputStyle width='300px' type='text' name='managerName' value={store.managerName} onChange={edit}/></m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>매니저/HP</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd><s.InputStyle width='300px' type='text' name='managerPhone' value={store.managerPhone} onChange={edit}/></m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd colSpan={2}>
                       <s.SearchButtonDiv style={{textAlign:'right'}}>
                            <s.ButtonStyle width='70px' style={{marginTop:'30px', marginRight:'65px'}} onClick={modify}>저장</s.ButtonStyle>
                        </s.SearchButtonDiv>
                        </m.TableInfoTd>
                    </m.TableInfoTr>
                </tbody>
            </m.TableInfo>
            <Dialog open={isOpen} handler={()=>setIsOpen(!isOpen)}>
            <DialogBody>
            {
                isOpen && 
                    <DaumPostcode onComplete={onCompletePost} onClose={()=>setIsOpen(false)}/>
            }
            </DialogBody>
            </Dialog>
            </s.ContentListDiv>
        </>
    )
}
export default ModifyStoreMain;