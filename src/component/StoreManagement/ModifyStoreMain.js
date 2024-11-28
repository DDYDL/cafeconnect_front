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

const ModifyStoreMain = ()=>{
    const [store, setStore] = useState({
        storeCode:'',
        storeName: '',
        storeAddress: '',
        storeAddressNum: '',
        storePhone: '',
        storeOpenTime:'',
        storeCloseTime: '',
        storeCloseDate: '',
        ownerName:'',
        ownerPhone:'',
        managerName:'',
        managerPhone:'',
        contractPeriodStart:'',
        contractPeriodEnd:'',
        contractDate:'',
        openingDate:'',
        storeStatus:'',
        memberNum:''
        ,stockCount:''
    });
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
                        <m.TableInfoTd><s.InputStyle width='140px' type='text' name='storeOpenTime' value={store.storeOpenTime} onChange={edit}/> ~ <s.InputStyle width='140px' type='text' name='storeCloseTime' value={store.storeCloseTime}/></m.TableInfoTd>
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
                        <m.TableInfoTd><s.InputStyle width='300px' type='text' name='contractDate' value={store.contractDate} onChange={edit}/></m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>계약기간</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd><s.InputStyle width='140px' type='text' name='contractPeriodStart' value={store.contractPeriodStart} onChange={edit}/> ~ <s.InputStyle width='140px' type='text' name='contractPeriodEnd' value={store.contractPeriodEnd}/></m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>최초개점일</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd><s.InputStyle width='300px' type='text' name='openingDate' value={store.openingDate} onChange={edit}/></m.TableInfoTd>
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