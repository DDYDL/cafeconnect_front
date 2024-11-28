import * as m from '../styles/StyledMypage.tsx';
import * as s from '../styles/StyledStore.tsx';
import * as h from '../styles/HStyledStore.tsx';

import {useState} from 'react';
import {axiosInToken} from '../../config.js'
import { useAtomValue } from 'jotai/react';
import { tokenAtom } from '../../atoms';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import DaumPostcode from 'react-daum-postcode';
import {useNavigate} from 'react-router-dom';
// import { Modal } from 'flowbite-react';
// import { DatePicker } from 'react-datepicker';
import {ko} from 'date-fns/locale';

const AddStoreMain = ()=>{
    const token = useAtomValue(tokenAtom);
    const [isOpen, setIsOpen] = useState(false);
    const [store, setStore] = useState({
        storeCode:'',
        storeName: '',
        storeAddress: '',
        storeAddressNum: '',
        storePhone: '',
        storeOpenTime: '',
        storeCloseTime: '',
        storeCloseDate: '',
        ownerName:'',
        ownerPhone:'',
        managerName:'',
        managerPhone:'',
        contractPeriodStart:new Date(),
        contractPeriodEnd:new Date(),
        contractDate:new Date(),
        openingDate:new Date(),
        storeStatus:'',
        memberNum:''
        ,stockCount:''
    });
    const navigate = useNavigate();
    
    const edit = (e) => {
        setStore({ ...store, [e.target.name]: e.target.value });
        console.log(store);
    }
    
    // const option = (val) => {
    //     setStore({ ...store, [val.name]: val });
    // }

    const onCompletePost = (data) => {
        console.log(data);
        const {address, zonecode, bname, buildingName} = data;
        setStore({...store, postCode:zonecode, address:address, 
            extraAddress: bname + buildingName!==''&& buildingName});
        }
        
    const submit = () => {
        axiosInToken(token).post('addStoreMain',store)
            .then(res=> {
                console.log(res);
                alert(`${store.storeName} 등록이 완료되었습니다.`);
                navigate("/storeListMain");
            })
            .catch(err=>{
                console.log(err.response.data);
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
                        <m.TableInfoTd><m.TableTitleSpan for="storeName">가맹점명</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd><s.InputStyle width='300px' type='text' name="storeName" value={store.storeName} id="storeName" onChange={edit}/></m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd style={{verticalAlign:'top', paddingTop:'10px'}}><m.TableTitleSpan for="storeAddress">가맹점 주소</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>
                        <s.SearchDiv width='300px' marginBottom='10px' margin='0px'>
                        <s.InputStyleSearch icon={<MagnifyingGlassIcon className="h-5 w-5" onClick={()=>setIsOpen(!isOpen)}/>} style={{borderColor:'rgba(234, 234, 234, 1)'}} readOnly/></s.SearchDiv>
                        <s.InputStyle width='300px' type='text' name={store.storeAddress} readOnly/>
                        </m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>가맹점/HP</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd><s.InputStyle width='300px' type='text' name={store.storePhone} onChange={edit}/></m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>영업시간</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd></m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>휴무일</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd><s.InputStyle width='300px' type='text' name={store.storeCloseDate} onChange={edit}/></m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>계약체결일</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>
                        {/* <Datepicker
                                    value={store.contractDate}
                                    onChange={(date) => setStore({ ...store, ['contractDate']: date })}
                                    className="flowbite-datepicker"
                                    showTodayButton={true}
                                    showClearButton={true}
                                    dateFormat="yyyy-MM-dd"
                                    /> */}
                        </m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>계약기간</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>
                        {/* <Datepicker
                                value={store.contractPeriodStart}
                                onChange={(date) => setStore({ ...store, ['contractPeriodStart']: date })}
                                className="flowbite-datepicker"
                                showTodayButton={true}
                                showClearButton={true}
                                dateFormat="yyyy-MM-dd"
                                />
                                <div>~</div>
                                <Datepicker
                                locale={ko}
                                formatDay={(locale, date) =>
                                    date.toLocaleString("en", { day: "numeric" })
                                  }
                                value={store.contractPeriodEnd}
                                onChange={(date) => setStore({ ...store, ['contractPeriodEnd']: date })}
                                className="flowbite-datepicker"
                                showTodayButton={true}
                                showClearButton={true}
                                dateFormat="yyyy-MM-dd"
                                /> */}
                        </m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>최초개점일</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>
                        {/* <DatePicker
                            value={store.openingDate}
                            onChange={(date) => setStore({ ...store, ['openingDate']: date })}
                            /> */}
                        </m.TableInfoTd>
                    </m.TableInfoTr>
                </tbody>
            </m.TableInfo>

             <m.TableInfo>
                <thead><m.TableInfoTh></m.TableInfoTh><m.TableInfoTh></m.TableInfoTh></thead>
                <tbody>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>점주명</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd><s.InputStyle width='300px' type='text' name={store.ownerName} onChange={edit}/></m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>점주/HP</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd><s.InputStyle width='300px' type='text' name={store.ownerPhone} onChange={edit}/></m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>매니저명</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd><s.InputStyle width='300px' type='text' name={store.managerName} onChange={edit}/></m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>매니저/HP</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd><s.InputStyle width='300px' type='text' name={store.managerPhone} onChange={edit}/></m.TableInfoTd>
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

            </s.ContentListDiv>
        </>
    )
}
export default AddStoreMain;