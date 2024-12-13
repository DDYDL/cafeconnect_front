import * as m from '../styles/StyledMypage.tsx';
import * as s from '../styles/StyledStore.tsx';
import * as h from '../styles/HStyledStore.tsx';

// 로그인 토큰
import { axiosInToken } from '../../config.js'
import { useAtom } from 'jotai/react';
import { tokenAtom } from '../../atoms';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const StoreDetailMain = ()=>{
    const [store, setStore] = useState({});
    const [token,setToken] = useAtom(tokenAtom);
    const {storeCode} = useParams();
    const navigate = useNavigate();

    useEffect(()=> {
        // 토큰의 State가 useEffect보다 느려서 토큰없이 실행 방지(Error 방지)
        if(token!=null && token!=='')  select();
    }, [token])

    const select = () => {
        axiosInToken(token).get(`storeDetailMain/${storeCode}`)
            .then(res=> {
                if(res.headers.authorization!=null) { setToken(res.headers.authorization) }
                console.log(res.data)
                let resStore = res.data.store;
                const resStoreOpenTime = new Date();
                resStoreOpenTime.setHours(resStore.storeOpenTime.split(':')[0], resStore.storeOpenTime.split(':')[1], 0, 0);
                const formattedOpenTime = resStoreOpenTime.toTimeString().slice(0, 5);
                
                const resStoreCloseTime = new Date();
                resStoreCloseTime.setHours(resStore.storeCloseTime.split(':')[0], resStore.storeCloseTime.split(':')[1], 0, 0);
                const formattedCloseTime = resStoreCloseTime.toTimeString().slice(0, 5);
                setStore({...resStore, ['storeOpenTime']: formattedOpenTime, ['storeCloseTime']: formattedCloseTime});
            })
    }

    const deleteStore = () => {
        axiosInToken(token).post(`deleteStoreMain/${storeCode}`)
            .then(res=> {
                if(res.headers.authorization!=null) { setToken(res.headers.authorization) }
                console.log(res.data)
                let resStore = res.data.store;
                setStore({...resStore});
                navigate("/storeListMain");
            })
    }

    return (
        <>
            <s.ContentListDiv>
            <s.MainTitleText>CnC coffee&nbsp;&nbsp;{store.storeName}</s.MainTitleText>

            <m.TableInfo>
                    <thead><m.TableInfoTh></m.TableInfoTh><m.TableInfoTh></m.TableInfoTh></thead>
                <tbody>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>가맹점 코드</m.TableTitleSpan></m.TableInfoTd>
                        <h.TableInfoTd><m.TableTitleSpan>{store.storeCode}</m.TableTitleSpan></h.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>가맹점 주소</m.TableTitleSpan></m.TableInfoTd>
                        <h.TableInfoTd>({store.storeAddressNum})&nbsp;{store.storeAddress}</h.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>가맹점/HP</m.TableTitleSpan></m.TableInfoTd>
                        <h.TableInfoTd>{store.storePhone}</h.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>영업시간</m.TableTitleSpan></m.TableInfoTd>
                        <h.TableInfoTd>{store.storeOpenTime} ~ {store.storeCloseTime}</h.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>휴무일</m.TableTitleSpan></m.TableInfoTd>
                        <h.TableInfoTd>{store.storeCloseDate!==''? "연중무휴": store.storeCloseDate}</h.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>계약체결일</m.TableTitleSpan></m.TableInfoTd>
                        <h.TableInfoTd>{store.contractDate}</h.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>계약기간</m.TableTitleSpan></m.TableInfoTd>
                        <h.TableInfoTd>{store.contractPeriodStart} ~ {store.contractPeriodEnd}</h.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>최초개점일</m.TableTitleSpan></m.TableInfoTd>
                        <h.TableInfoTd>{store.openingDate}</h.TableInfoTd>
                    </m.TableInfoTr>
                </tbody>
            </m.TableInfo>

             <m.TableInfo>
                <thead><m.TableInfoTh></m.TableInfoTh><m.TableInfoTh></m.TableInfoTh></thead>
                <tbody>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>점주명</m.TableTitleSpan></m.TableInfoTd>
                        <h.TableInfoTd>{store.ownerName}</h.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>점주/HP</m.TableTitleSpan></m.TableInfoTd>
                        <h.TableInfoTd>{store.ownerPhone}</h.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>매니저명</m.TableTitleSpan></m.TableInfoTd>
                        <h.TableInfoTd>{store.managerName}</h.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>매니저/HP</m.TableTitleSpan></m.TableInfoTd>
                        <h.TableInfoTd>{store.managerPhone}</h.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd colSpan={2}>
                       <s.SearchButtonDiv style={{textAlign:'right'}}>
                            <s.ButtonStyle width='70px' style={{marginLeft:'10px'}} onClick={deleteStore}>삭제</s.ButtonStyle>
                            <s.ButtonStyle width='70px' style={{marginLeft:'10px'}}><Link to={`/modifyStoreMain/${store.storeCode}`}>수정</Link></s.ButtonStyle>
                        </s.SearchButtonDiv>
                        </m.TableInfoTd>
                    </m.TableInfoTr>
                </tbody>
            </m.TableInfo>
            </s.ContentListDiv >
        </>
    )
}
export default StoreDetailMain;