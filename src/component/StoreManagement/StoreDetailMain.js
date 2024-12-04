import * as m from '../styles/StyledMypage.tsx';
import * as s from '../styles/StyledStore.tsx';

// 로그인 토큰
import {axiosInToken} from '../../config.js'
import { useAtomValue } from 'jotai/react';
import { tokenAtom } from '../../atoms';
import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

const StoreDetailMain = ()=>{
    const [store, setStore] = useState({});
    const token = useAtomValue(tokenAtom);
    const {storeCode} = useParams();
    const navigate = useNavigate();

    useEffect(()=> {
        // 토큰의 State가 useEffect보다 느려서 토큰없이 실행 방지(Error 방지)
        if(token!=null && token!=='')  select();
    }, [token])

    const select = () => {
        axiosInToken(token).get(`storeDetailMain/${storeCode}`)
            .then(res=> {
                console.log(res.data)
                let resStore = res.data.store;
                const resStoreOpenTime = new Date();
                // resStoreOpenTime.setHours(resStore.storeOpenTime.split(':')[0], resStore.storeOpenTime.split(':')[1], 0, 0);
                // const formattedOpenTime = resStoreOpenTime.toTimeString().slice(0, 8);
                
                // const resStoreCloseTime = new Date();
                // resStoreCloseTime.setHours(resStore.storeCloseTime.split(':')[0], resStore.storeCloseTime.split(':')[1], 0, 0);
                // const formattedCloseTime = resStoreCloseTime.toTimeString().slice(0, 8);
                // setStore({...resStore, ['storeOpenTime']: formattedOpenTime, ['storeCloseTime']: formattedCloseTime});
            })
    }

    const deleteStore = () => {
        axiosInToken(token).post(`deleteStoreMain/${storeCode}`)
            .then(res=> {
                console.log(res.data)
                let resStore = res.data.store;
                setStore({...resStore});
                navigate("/restoreStoreMain");
            })
    }

    return (
        <>
            <s.ContentListDiv>
            <s.MainTitleText>Kosta커피 {store.storeName}</s.MainTitleText>

            <m.TableInfo>
                    <thead><m.TableInfoTh></m.TableInfoTh><m.TableInfoTh></m.TableInfoTh></thead>
                <tbody>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>가맹점 코드</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>{store.storeCode}</m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>가맹점 주소</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>{store.storeAddress}</m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>가맹점/HP</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>{store.storePhone}</m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>영업시간</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>{store.storeOpenTime} ~ {store.storeCloseTime}</m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>휴무일</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>{store.storeCloseDate}</m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>계약체결일</m.TableTitleSpan></m.TableInfoTd>
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
                        <m.TableInfoTd><m.TableTitleSpan>점주명</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>{store.ownerName}</m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>점주/HP</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>{store.ownerPhone}</m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>매니저명</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>{store.managerName}</m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd><m.TableTitleSpan>매니저/HP</m.TableTitleSpan></m.TableInfoTd>
                        <m.TableInfoTd>{store.managerPhone}</m.TableInfoTd>
                    </m.TableInfoTr>
                    <m.TableInfoTr>
                        <m.TableInfoTd colSpan={2}>
                       <s.SearchButtonDiv style={{textAlign:'right'}}>
                            <s.ButtonStyle width='70px' style={{marginTop:'30px', marginLeft:'10px'}} onClick={deleteStore}>삭제</s.ButtonStyle>
                            <s.ButtonStyle width='70px' style={{marginTop:'30px', marginLeft:'10px'}}><Link to={`/modifyStoreMain/${store.storeCode}`}>수정</Link></s.ButtonStyle>
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