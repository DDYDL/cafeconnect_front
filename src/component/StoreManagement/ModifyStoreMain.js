import * as m from '../styles/StyledMypage.tsx';
import * as s from '../styles/StyledStore.tsx';
import * as h from '../styles/HStyledStore.tsx';


import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import { Select, Option} from "@material-tailwind/react";
import {axiosInToken} from '../../config.js'
import { useAtomValue } from 'jotai/react';
import { tokenAtom } from '../../atoms';
import {useNavigate} from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DatePicker, PickersDay, TimePicker } from '@mui/x-date-pickers';
import {ko} from 'date-fns/locale';
import {format} from 'date-fns';

const ModifyStoreMain = ()=>{
    const [store, setStore] = useState({});
    const token = useAtomValue(tokenAtom);
    const {storeCode} = useParams();
    const navigate = useNavigate();

    useEffect(()=> {
        // 토큰의 State가 useEffect보다 느려서 토큰없이 실행 방지(Error 방지)
        if(token!=null && token!=='')  select();
    }, [token])

    const select = () => {
        console.log(token)
        axiosInToken(token).get(`storeDetailMain/${storeCode}`)
            .then(res=> {
                console.log(res.data)
                let resStore = res.data.store;
                setStore({...resStore});
            })
    }

    const edit = (e) => {
        setStore({ ...store, [e.target.name]: e.target.value });
        console.log(store);
    }
    
    const option = (val) => {
        setStore({ ...store, ['storeCloseDate']: val });
    }

    const modify = () => {
        axiosInToken(token).post('modifyStoreMain',store)
            .then(res=> {
                console.log(res);
                alert('수정이 완료되었습니다.');
                navigate(`/storeDetailMain/${store.storeCode}`);
            })
            .catch(err=>{
                console.log(err.response.data);
            })
    }

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
                        <m.TableInfoTd><m.TableTitleSpan>가맹점 주소</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd><s.InputStyle width='300px' type='text' name='storeAddress' value={store.storeAddress} onChange={edit}/></m.TableInfoTd>
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
                                value={store.storeOpenTime}
                                onChange={(time) => setStore({ ...store, ['storeOpenTime']: time })}
                                className="CustomPicker"
                                format='HH:mm'
                            /><div>~</div>
                            <TimePicker
                                value={store.storeCloseTime}
                                onChange={(time) => setStore({ ...store, ['storeCloseTime']: time })}
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
                            <h.DateSelectDiv>
                            <h.TableTdDiv>매주</h.TableTdDiv>
                            <h.SelectInnerDiv>
                                
                            <Select name='storeCloseDate' label='휴무일' defaultValue={store.storeCloseDate} onChange={option}>
                                <Option value='월'>월</Option>
                                <Option value='화'>화</Option>
                                <Option value='수'>수</Option>
                                <Option value='목'>목</Option>
                                <Option value='금'>금</Option>
                                <Option value='토'>토</Option>
                                <Option value='일'>일</Option>
                            </Select>
                            </h.SelectInnerDiv>
                            </h.DateSelectDiv>
                        </m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>계약체결일</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd> 
                        <h.DatePickerWrap>
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
                            <DatePicker
                                value={store.contractDate}
                                showDaysOutsideCurrentMonth
                                onChange={(date) => setStore({ ...store, ['contractDate']: format(date, 'yyyy.MM.dd') })}
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
                                value={store.contractPeriodStart}
                                showDaysOutsideCurrentMonth
                                onChange={(date) => setStore({ ...store, ['contractPeriodStart']: format(date, 'yyyy.MM.dd') })}
                                className="CustomPicker"
                                format='yyyy.MM.dd'
                            /><div>~</div>
                            <DatePicker
                                value={store.contractPeriodEnd}
                                showDaysOutsideCurrentMonth
                                onChange={(date) => setStore({ ...store, ['contractPeriodEnd']: format(date, 'yyyy.MM.dd') })}
                                className="CustomPicker"
                                format='yyyy.MMdd'
                            />
                            </LocalizationProvider>
                         </h.DatePickerPeriodWrap></m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>최초개점일</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>                        
                        <h.DatePickerWrap>
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
                            <DatePicker
                                value={store.openingDate}
                                showDaysOutsideCurrentMonth
                                onChange={(date) => setStore({ ...store, ['openingDate']: format(date, 'yyyy.MM.dd') })}
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
            </s.ContentListDiv>
        </>
    )
}
export default ModifyStoreMain;