import * as s from '../styles/StyledStore.tsx';
import * as h from '../styles/HStyledStore.tsx';

import { useState, useEffect } from 'react';
import { axiosInToken } from '../../config.js'
import { useAtom } from 'jotai/react';
import { tokenAtom } from '../../atoms';
import { Input } from "@material-tailwind/react";
import ReactSelect from "react-select";

const DeleteReqStoreMain = ()=>{
    const [storeList, setStoreList] = useState([]);
    const [pageBtn, setPageBtn] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [type, setType] = useState('');
    const [keyword, setKeyword] = useState('');
    const [regionArr, setRegionArr] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [token,setToken] = useAtom(tokenAtom);

    useEffect(()=> {
        if(token!=null && token!=='')  { makeRegionArr(); select(1); };
    }, [token])

    useEffect(()=> {
        select(1);
    }, [keyword])

    const select = (page) => {
        axiosInToken(token).get(`deleteReqList?page=${page}&type=${type}&keyword=${keyword}`)
            .then(res=> {

                if(res.headers.authorization!=null) { setToken(res.headers.authorization) }

                let pageInfo = res.data.pageInfo;
                console.log(res.data.storeList)
                setStoreList([...res.data.storeList])
                let page = [];
                for(let i=pageInfo.startPage; i<=pageInfo.endPage; i++) {
                    page.push(i);
                }
                setPageBtn([...page]);
                setPageInfo(pageInfo);
            })
    }

    const searchRegion = (selectedOption) => {
        setSelectedRegion(selectedOption);
        setType("storeAddress");
        setKeyword(selectedOption.value);
      };

    const searchName = (e) => {
        setType("storeName");
        setKeyword(e.target.value);
      };

    const deleteSubmit = (storeCode) => {
        axiosInToken(token).post(`deleteStoreMain/${storeCode}`)
                    .then(res=> {

                        if(res.headers.authorization!=null) { setToken(res.headers.authorization) }

                       console.log(res);
                       select(1);
                    })
    };

      const makeRegionArr = () => {
        const regions = [
            {value: '', label: '지역 전체'},
            {value: '강원특별자치도', label: '강원도'},
            {value: '경기', label: '경기도'},
            {value: '경남', label: '경상남도'},
            {value: '경북', label: '경상북도'},
            {value: '광주', label: '광주광역시'},
            {value: '대구', label: '대구광역시'},
            {value: '대전', label: '대전광역시'},
            {value: '부산', label: '부산광역시'},
            {value: '서울', label: '서울특별시'},
            {value: '울산', label: '울산광역시'},
            {value: '인천', label: '인천광역시'},
            {value: '제주특별자치도', label: '제주도'},
            {value: '전남', label: '전라남도'},
            {value: '전북특별자치도', label: '전라북도'},
            {value: '충남', label: '충청남도'},
            {value: '충북', label: '충청북도'}
        ];
        
        setRegionArr(regions);
        console.log(regionArr);
    };

    return (
        <>
            <s.ContentListDiv>
                <s.MainTitleText>가맹점 삭제 요청</s.MainTitleText>
                <h.CategoryButtonGroupDiv>
                    <h.SearchDiv>
                        <Input icon={<h.SearchIcon className="h-5 w-5" onClick={select(1)}/> } label="매장명 검색" onChange={searchName}/>
                    </h.SearchDiv>
                    <h.ReactSelectDiv>
                        <ReactSelect
                            isSearchable={false}
                            className="w-full"
                            placeholder="지역 전체"
                            value={selectedRegion} 
                            options={regionArr} 
                            onChange={searchRegion}
                        />
                    </h.ReactSelectDiv>
                </h.CategoryButtonGroupDiv>

                <s.TableList>
                    <s.TableListThead>
                        <s.TableTextTh width='160px'>가맹점코드</s.TableTextTh>
                        <s.TableTextTh width='160px'>매장명</s.TableTextTh>
                        <s.TableTextTh width='500px'>주소</s.TableTextTh>
                        <s.TableTextTh width='160px'></s.TableTextTh></s.TableListThead>
                        <tbody>
                        {storeList.map(store=>(
                        <s.TableTextTr key={store.storeCode}>
                            <h.TableTextTd>{store.storeCode}</h.TableTextTd >
                            <h.TableTextTd>{store.storeName}</h.TableTextTd >
                            <h.TableTextTd>{store.storeAddress}</h.TableTextTd >
                            <h.TableTextTd>
                                    <s.ButtonStyle width='70px' onClick={() => {deleteSubmit(store.storeCode)}}>삭제하기</s.ButtonStyle>
                            </h.TableTextTd >
                        </s.TableTextTr>
                    ))}
                    </tbody>
                </s.TableList>
            </s.ContentListDiv>
        </>
    )
}
export default DeleteReqStoreMain;