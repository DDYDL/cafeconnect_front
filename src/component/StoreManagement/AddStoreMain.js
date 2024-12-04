import * as m from '../styles/StyledMypage.tsx';
import * as s from '../styles/StyledStore.tsx';
import * as h from '../styles/HStyledStore.tsx';

import {useState} from 'react';
import {axiosInToken} from '../../config.js'
import { useAtomValue } from 'jotai/react';
import { tokenAtom } from '../../atoms';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {useNavigate} from 'react-router-dom';
import DaumPostcode from 'react-daum-postcode';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { Dialog, DialogBody} from "@material-tailwind/react";
import {ko} from 'date-fns/locale';
import {format} from 'date-fns';

const AddStoreMain = ()=>{
    const token = useAtomValue(tokenAtom);
    const [isOpen, setIsOpen] = useState(false);
    const [store, setStore] = useState({});
    const [timeDate, setTimeDate] = useState({});
    const navigate = useNavigate();
    
    const edit = (e) => {
        setStore({ ...store, [e.target.name]: e.target.value });
        console.log(store);
    }
    
    const onCompletePost = (data) => {
        console.log(data);
        const {address, zonecode, bname, buildingName} = data;
        setStore({...store, storeAddressNum:zonecode, storeAddress:address +(', '+bname + buildingName!==' '&& ', '+buildingName)});
        }
        
    const submit = () => {
        if (!store.storeName) {
            alert("가맹점명을 입력하세요"); return;
          }
        if (!store.storeAddress) {
            alert("주소를 입력하세요"); return;
          }
        if (!timeDate.contractDate) {
            alert("가맹계약 체결일을 입력하세요"); return;
          }
        if (!timeDate.contractPeriodStart||!timeDate.contractPeriodEnd) {
            alert("계약기간을 입력하세요"); return;
          }
        if (!store.ownerName||!store.ownerPhone) {
            alert("점주 정보를 입력하세요"); return;
          }
        if (timeDate.openingDate) { 
            setTimeDate({ ...timeDate, ['openingDate']: format(timeDate.openingDate, 'yyyyMMdd')});
          }
        setStore({ ...store, ['contractDate']: format(timeDate.contractDate, 'yyyyMMdd'),
            ['contractPeriodStart']: format(timeDate.contractPeriodStart, 'yyyyMMdd'),
            ['contractPeriodEnd']: format(timeDate.contractPeriodEnd, 'yyyyMMdd'),
            ['storeRegion']: store.storeAddress.split(" ")[0]
        })
        console.log(timeDate);
        console.log(store);
        axiosInToken(token).post('addStoreMain',store)
        .then(res=> {
            console.log(res);
            alert(`${store.storeName} 등록이 완료되었습니다.`);
            navigate("/storeListMain");
        })
        .catch(err=>{
                console.log(store);
                console.log(err.response.data);
                alert("가맹점 등록에 실패했습니다.");
            })
    }
        
        return (
            <>
            <s.ContentListDiv>
            <s.MainTitleText>가맹점 등록</s.MainTitleText>

            <m.TableInfo>
                    <thead><m.TableInfoTh></m.TableInfoTh><m.TableInfoTh></m.TableInfoTh></thead>
                <tbody>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>가맹점 코드</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd textAlign="center">-</m.TableInfoTd>{/* 저장 시 자동생성 */}
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan for="storeName">가맹점명<h.Required>*</h.Required></m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd><s.InputStyle width='300px' type='text' name="storeName" value={store.storeName} id="storeName" onChange={edit}/></m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd style={{verticalAlign:'top', paddingTop:'10px'}}><m.TableTitleSpan for="storeAddress">가맹점 주소<h.Required>*</h.Required></m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>
                        <s.SearchDiv width='300px' marginBottom='10px' margin='0px'>
                        <s.InputStyleSearch icon={<MagnifyingGlassIcon className="h-5 w-5" onClick={()=>setIsOpen(!isOpen)}/>} value={store.storeAddressNum} onChange={edit} style={{borderColor:'rgba(234, 234, 234, 1)'}} readOnly/></s.SearchDiv>
                        <s.InputStyle width='300px' type='text' value={store.storeAddress} onChange={edit}/>
                        </m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>가맹점/HP</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd><s.InputStyle width='300px' type='text' name="storePhone" value={store.storePhone} onChange={edit}/></m.TableInfoTd>
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
                        <m.TableInfoTd><s.InputStyle width='300px' type='text' name="storeCloseDate" value={store.storeCloseDate} onChange={edit}/></m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>계약체결일<h.Required>*</h.Required></m.TableTitleSpan></m.TableInfoTd>
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
                        </h.DatePickerWrap>
                        </m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>계약기간<h.Required>*</h.Required></m.TableTitleSpan></m.TableInfoTd>
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
                                onChange={(date) => setStore({ ...store, ['openingDate']: date })}
                                className="CustomPicker"
                                format='yyyy.MM.dd'
                            />
                        </LocalizationProvider>
                        </h.DatePickerWrap>
                        </m.TableInfoTd>
                    </m.TableInfoTr>
                </tbody>
            </m.TableInfo>

             <m.TableInfo>
                <thead><m.TableInfoTh></m.TableInfoTh><m.TableInfoTh></m.TableInfoTh></thead>
                <tbody>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>점주명<h.Required>*</h.Required></m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd><s.InputStyle width='300px' type='text' name="ownerName" value={store.ownerName} onChange={edit}/></m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>점주/HP<h.Required>*</h.Required></m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd><s.InputStyle width='300px' type='text' name="ownerPhone" value={store.ownerPhone} onChange={edit}/></m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>매니저명</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd><s.InputStyle width='300px' type='text' name="managerName" value={store.managerName} onChange={edit}/></m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>매니저/HP</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd><s.InputStyle width='300px' type='text' name="managerPhone" value={store.managerPhone} onChange={edit}/></m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd colSpan={2}>
                       <s.SearchButtonDiv textAlign='right'>
                            <s.ButtonStyle width='70px' style={{marginTop:'30px', marginRight:'65px'}} onClick={submit}>저장</s.ButtonStyle>
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
export default AddStoreMain;