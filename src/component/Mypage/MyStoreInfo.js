import { useEffect, useState } from 'react';
import * as m from '../styles/StyledMypage.tsx';
import * as s from '../styles/StyledStore.tsx';

import { Link, useNavigate } from 'react-router-dom';
import { useAtom, useSetAtom } from 'jotai/react';
import { alarmsAtom, initMember, memberAtom, tokenAtom } from '../../atoms.js';
import axios from 'axios';
import { url } from '../../config.js';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import {ko} from 'date-fns/locale';
import { format } from 'date-fns';

const MyStoreInfo = () => {
    // Jotai의 member 가져오기
    const [member, setMember] = useAtom(memberAtom);

    const navigate = useNavigate();
    // Jotai에 있는 로그인 token 가져오기
    const setToken = useSetAtom(tokenAtom);
    // Jotai에 있는 알람 가져오기
    const setAlarms = useSetAtom(alarmsAtom);

    const [store, setStore] = useState(
    {
        storeCode:0, storeName:'', storeAddress:'', storeAddressNum:0, storePhone:'',
        storeOpenTime:'', storeCloseTime:'', storeCloseDate:'', storeOpenTimeStr:'', storeCloseTimeStr:'',
        contractDate:'', contractPeriodStart:'', contractPeriodEnd:'', openingDate:'',
        username:member.username, password:'********',
        ownerName:'', ownerPhone:'', managerName:'', managerPhone:''
    });

    useEffect(()=>{
        setStore({});
        setMember(member);
        getStore();
    }, [])

    const edit = (e)=>{
        setStore({...store, [e.target.name]:e.target.value});
    }

    const getStore = ()=>{
        axios.get(`${url}/selectStore/${member.storeCode}`)
        .then(res=>{
            console.log(res.data);
            setStore(res.data);
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

        axios.post(`${url}/updateStore`, formData)
        .then(res=>{
            console.log(res.data);
            if(res.data === 'changePassword') {
                alert("수정이 완료되었습니다. 다시 로그인해주세요.");
                logout();
            } else {
                console.log(res.data);
                alert("수정이 완료되었습니다.");
                setStore(store);
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }

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
                        <m.TableInfoTd>({store.storeAddressNum}){store.storeAddress}</m.TableInfoTd>
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
                                    value={store.storeOpenTime}
                                    onChange={(time) => setStore({store, ['storeOpenTime']: format(time, 'HH:mm:SS') })}
                                    className="CustomPicker"
                                    format='HH:mm'
                                /><div>~</div>
                                <TimePicker
                                    value={store.storeCloseTime}
                                    onChange={(time) => setStore({store, ['storeCloseTime']: format(time, 'HH:mm:SS') })}
                                    className="CustomPicker"
                                    format='HH:mm'
                                />
                            </LocalizationProvider>
                            </m.TimePickerPeriodWrap>
                            </m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>휴무일</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd><s.InputStyle width='300px' type='text' name='storeCloseDate' value={store.storeCloseDate} onChange={edit}/></m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>계약채결일</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>{store.contractDate}</m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>계약기간</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>{store.contractPeriodStart} ~ {store.contractPeriodEnd}</m.TableInfoTd>
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
                        <m.TableInfoTd><s.InputStyle width='300px' type='password' name='password' value={store.password} onChange={edit}/></m.TableInfoTd>
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