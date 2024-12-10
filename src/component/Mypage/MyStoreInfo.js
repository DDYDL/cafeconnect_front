import { useEffect, useRef, useState } from 'react';
import * as m from '../styles/StyledMypage.tsx';
import * as s from '../styles/StyledStore.tsx';

import { Link, useNavigate } from 'react-router-dom';
import { useAtom, useAtomValue, useSetAtom } from 'jotai/react';
import { alarmsAtom, initMember, memberAtom, tokenAtom } from '../../atoms.js';
import axios from 'axios';
import { axiosInToken, url } from '../../config.js';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { ko } from 'date-fns/locale';
import { format, parse } from 'date-fns';
import ReactSelect from "react-select";

const MyStoreInfo = () => {
    // Jotai의 member 가져오기
    const [member, setMember] = useAtom(memberAtom);
    // Jotai에 있는 로그인 token 가져오기
    const [token, setToken] = useAtom(tokenAtom);

    const navigate = useNavigate();
    // Jotai에 있는 알람 가져오기
    const setAlarms = useSetAtom(alarmsAtom);
    const inputRef = useRef();
    
    const [store, setStore] = useState(
        {
            storeCode:0, storeName:'', storeAddress:'', storeAddressNum:0, storePhone:'',
            storeOpenTime:'', storeCloseTime:'', storeCloseDate:'', storeOpenTimeStr:'', storeCloseTimeStr:'',
            contractDate:'', contractPeriodStart:'', contractPeriodEnd:'', openingDate:'',
            username:member.username, password:'********',
            ownerName:'', ownerPhone:'', managerName:'', managerPhone:''
        });

    // 기본 날짜, 시간 설정
    const [selectedDay, setSelectedDay] = useState(null);
    const [timeDate, setTimeDate] = useState({
        contractDate: new Date(2020,0,1,0,0,0),
        openingDate: new Date(2020,0,1,0,0,0),
        contractPeriodStart: new Date(2020,0,1,0,0,0),
        contractPeriodEnd: new Date(2020,0,1,0,0,0),
        storeOpenTime: new Date(2000,0,1,0,0,0),
        storeCloseTime: new Date(2000,0,1,0,0,0)      
    });

    // DB용 날짜, 시간 변환
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


    useEffect(()=>{
        setStore({});
        getStore();
    }, [])

    // DB에서 가져온 날짜, 시간 변환
    const setDefaultTimeDate = (data)=>{
        console.log(data.storeOpenTime);
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

    const edit = (e)=>{
        console.log(e);
        
        setStore({...store, [e.target.name]:e.target.value});
    }

    const passwordEdit = (e)=>{
        if(e.target.value === '********') {
            inputRef.current.value = '';
        }
    }

    const getStore = ()=>{
        axiosInToken(token).get(`${url}/selectStore/${member.storeCode}`)
        .then(res=>{
            if(res.headers.authorization!=null) {
                setToken(res.headers.authorization);
            }
            console.log(res.data);
            setStore(res.data);
            setDefaultTimeDate(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    }

    // 로그아웃
    const logout = ()=>{
        setMember({...initMember});
        setToken('');
        setAlarms([]);

        navigate("/loginStore");
    }

    const updateStore = (e)=>{
        console.log(store);
        const formData = new FormData();

        formData.append("storeCode", member.storeCode);
        formData.append("storePhone", store.storePhone);
        formData.append("storeOpenTime", store.storeOpenTime);
        formData.append("storeCloseTime", store.storeCloseTime);
        formData.append("storeCloseDate", store.storeCloseDate);

        formData.append("username", store.username);
        formData.append("password", store.password);
        formData.append("ownerName", store.ownerName);
        formData.append("ownerPhone", store.ownerPhone);
        formData.append("managerName", store.managerName);
        formData.append("managerPhone", store.managerPhone);
        console.log(store.ownerName);
        e.preventDefault();

        axiosInToken(token).post(`${url}/updateStore`, formData)
        .then(res=>{
            if(res.headers.authorization!=null) {
                setToken(res.headers.authorization);
            }
            console.log(res.data);
            if(res.data === 'changePassword') {
                alert("수정이 완료되었습니다. 다시 로그인해주세요.");
                logout();
            } else {
                console.log(res.data);
                alert("수정이 완료되었습니다.");
                setStore(store);
                setMember(res.data);
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }

    const selectDay = (selectedOption) => {
        setSelectedDay(selectedOption);
        setStore({...store, ['storeCloseDate']: selectedOption.value})
    };

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

    return (
        <>
            <s.ContentListDiv>
            <s.MainTitleText>가맹점 정보 수정하기</s.MainTitleText>

            <m.TableInfo>
                    <thead><m.TableInfoTh></m.TableInfoTh><m.TableInfoTh></m.TableInfoTh></thead>
                <tbody>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>가맹점 코드</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>{store.storeCode}</m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>가맹점명</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>{store.storeName}</m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>가맹점 주소</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>({store.storeAddressNum})&nbsp;{store.storeAddress}</m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>가맹점/HP</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd><s.InputStyle width='300px' type='text' name='storePhone' value={store.storePhone} onChange={edit}/></m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>영업시간</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>
                            <m.TimePickerPeriodWrap>
                            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
                                <TimePicker
                                    value={timeDate.storeOpenTime}
                                    onChange={(time) => setStore({timeDate, ['storeOpenTime']: time })}
                                    className="CustomPicker"
                                    format='HH:mm'
                                /><div>~</div>
                                <TimePicker
                                    value={timeDate.storeCloseTime}
                                    onChange={(time) => setStore({timeDate, ['storeCloseTime']: time })}
                                    className="CustomPicker"
                                    format='HH:mm'
                                />
                            </LocalizationProvider>
                            </m.TimePickerPeriodWrap>
                            </m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>휴무일</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>
                            <m.ReactSelectDiv>
                                <ReactSelect
                                    isSearchable={false}
                                    value={selectedDay} 
                                    options={dayOfweekArr} 
                                    onChange={selectDay}
                                />
                            </m.ReactSelectDiv>
                        </m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                    <m.TableInfoTd><m.TableTitleSpan>계약체결일</m.TableTitleSpan></m.TableInfoTd>
                    <m.TableInfoTd>{store.contractDate}</m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                    <m.TableInfoTd><m.TableTitleSpan>계약기간</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>{store.contractPeriodStart}&nbsp;~&nbsp;{store.contractPeriodEnd}</m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>최초개점일</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>{store.openingDate}</m.TableInfoTd>
                    </m.TableInfoTr>
                </tbody>
            </m.TableInfo>

             <m.TableInfo>
                <thead><m.TableInfoTh></m.TableInfoTh><m.TableInfoTh></m.TableInfoTh></thead>
                <tbody>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>아이디</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd><s.InputStyle width='300px' type='text' name='username' value={store.username} onChange={edit}/></m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>비밀번호</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd><s.InputStyle ref={inputRef} width='300px' type='password' name='password' value={store.password} onClick={(e)=>passwordEdit(e)} onChange={edit}/></m.TableInfoTd>
                    </m.TableInfoTr>
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
                       <s.SearchButtonDiv textAlign='right'>
                            <s.ButtonStyle width='70px' style={{marginTop:'30px', marginRight:'65px'}}><Link onClick={updateStore}>저장</Link></s.ButtonStyle>
                        </s.SearchButtonDiv>
                        </m.TableInfoTd>
                    </m.TableInfoTr>
                </tbody>
            </m.TableInfo>
            </s.ContentListDiv>
        </>
    )
}
export default MyStoreInfo;