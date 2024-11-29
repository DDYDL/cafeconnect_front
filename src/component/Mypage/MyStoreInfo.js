import { useEffect, useState } from 'react';
import * as m from '../styles/StyledMypage.tsx';
import * as s from '../styles/StyledStore.tsx';

import { Link } from 'react-router-dom';
import { useAtom } from 'jotai/react';
import { memberAtom } from '../../atoms.js';
import axios from 'axios';
import { url } from '../../config.js';

const MyStoreInfo = () => {
    // Jotai의 member 가져오기
    const [member, setMember] = useAtom(memberAtom);

    const [store, setStore] = useState(
    {
        storeCode:0, storeName:'', storeAddress:'', storeAddressNum:0, storePhone:'',
        storeOpenTime:'', storeCloseTime:'', storeCloseDate:'',
        contractDate:'', contractPeriodStart:'', contractPeriodEnd:'', openingDate:'',
        username:member.username, password:member.password,
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

    const updateStore = (e)=>{
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
            setStore(store);
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
                        <m.TableInfoTd><s.InputStyle width='140px' type='text' name='storeOpenTime' value={store.storeOpenTime} onChange={edit}/>&nbsp;~&nbsp;
                            <s.InputStyle width='140px' type='text' name='storeCloseTime' value={store.storeCloseTime} onChange={edit}/></m.TableInfoTd>
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
                        <m.TableInfoTd><s.InputStyle width='300px' type='text' name='password' value={store.password} onChange={edit}/></m.TableInfoTd>
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