import * as s from '../styles/StyledStore.tsx';
import * as h from '../styles/HStyledStore.tsx';

import { useState, useEffect } from 'react';
import { axiosInToken } from '../../config.js'
import { useAtom } from 'jotai/react';
import { tokenAtom } from '../../atoms';
import { Input } from "@material-tailwind/react";
import { useNavigate } from 'react-router';
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import ReactSelect from "react-select";

const StoreListMain = ()=>{
    const [storeList, setStoreList] = useState([]);
    const [pageBtn, setPageBtn] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [type, setType] = useState('');
    const [keyword, setKeyword] = useState('');
    const [inputValue, setInputValue] = useState();
    const navigate = useNavigate();
    const [token,setToken] = useAtom(tokenAtom);
    const [regionArr, setRegionArr] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState(null);

    useEffect(()=> {
        // 토큰의 State가 useEffect보다 느려서 토큰없이 실행 방지(Error 방지)
        if(token!=null && token!=='')  { makeRegionArr(); select(1); }
    }, [token, type, keyword, inputValue])
    
    const select = (page) => {
        axiosInToken(token).get(`storeListMain?page=${page}&type=${type}&keyword=${keyword}`)
            .then(res=> {
                if(res.headers.authorization!=null) { setToken(res.headers.authorization) }

                let pageInfo = res.data.pageInfo;
                console.log(res.data.storeList);
                setStoreList([...res.data.storeList]);

                let page = [];
                for(let i=pageInfo.startPage; i<=pageInfo.endPage; i++) {
                    page.push(i);
                }
                
                setPageBtn([...page]);
                setPageInfo(pageInfo);
            }).catch(err=>{
                console.log(err.response.data);
                alert("가맹점 조회에 실패했습니다.");
            })
    }

    const storeDetail = (storeCode)=>{
        navigate(`/storeDetailMain/${storeCode}`);
    }

    // 지역 검색
    const searchRegion = (selectedOption) => {
        setSelectedRegion(selectedOption);
        setKeyword(selectedOption.value);
        setType("storeAddress");
        // 매장명검색 초기화
        setInputValue('');
    };
    
    // 매장명 검색
    const searchName = (e) => {
        setInputValue(e.target.value);
        setKeyword(e.target.value);
        setType("storeName");

        // 지역 검색 초기화
        setSelectedRegion(regionArr[0]);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    // 매장명 검색 Input에서 엔터 허용
    const activeEnter = (e)=>{
        if(e.key === "Enter") {
            searchName(e);
        }
    }

    // 페이지네이션 화살표(이전, 다음) 함수
    const previousPage = () => {
        if (pageInfo.curPage  > 1) { select(pageInfo.curPage -1); }
      };
    const nextPage = () => {
        if (pageInfo.curPage != pageInfo.endPage) { select(pageInfo.curPage+1); }
      };
    
    // 지역 배열 (for ReactSelect)
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
    };

    return (
        <>
            <s.ContentListDiv>
                <h.MainTitleText>가맹점 조회</h.MainTitleText>
                <h.CategoryButtonGroupDiv>
                    <h.SearchDiv>
                        <Input icon={<h.SearchIcon className="h-5 w-5" onClick={searchName}/> } label="매장명 검색" spellCheck='false'
                        onChange={handleInputChange} value={inputValue} onKeyDown={(e)=>activeEnter(e)}/>
                    </h.SearchDiv>
                    <h.ReactSelectDiv>
                        <ReactSelect
                            isSearchable={false}
                            className="CustomSelect"
                            placeholder="지역 전체"
                            value={selectedRegion} 
                            options={regionArr} 
                            onChange={searchRegion}
                            />
                    </h.ReactSelectDiv>
                    <div className='w-2/4'></div>
                    <h.PageCntDiv>
                        <span>총<span>{pageInfo.allCnt}</span>개</span>
                    </h.PageCntDiv>
                </h.CategoryButtonGroupDiv>
                <s.TableList>
                    <s.TableListThead>
                        <s.TableTextTh width='150px'>지역</s.TableTextTh>
                        <h.TableTextTh width='150px'>매장명</h.TableTextTh>
                        <h.TableTextTh width='500px'>주소</h.TableTextTh>
                        <h.TableTextTh width='150px'>전화번호</h.TableTextTh></s.TableListThead>
                    <tbody>
                    {storeList!=null?(storeList.map(store=>(
                        <h.TableTextTr key={store.storeCode} onClick={()=>{storeDetail(store.storeCode)}}>
                            <s.TableTextTd>{regionArr.find(region => region.value === store.storeRegion)?.label}</s.TableTextTd >
                            <h.TableTextTd>{store.storeName}</h.TableTextTd >
                            <h.TableTextTd style={{cursor:'pointer'}}>{store.storeAddress}</h.TableTextTd >
                            <h.TableTextTd>{store.storePhone==''? '-':store.storePhone}</h.TableTextTd >
                        </h.TableTextTr>
                    ))):"가맹점이 없습니다."}
                    </tbody>
                </s.TableList>

                <s.PageButtonGroupDiv>
                  <s.ButtonGroupStyle variant="outlined">
                    <s.IconButtonStyle onClick={previousPage} disabled={pageInfo.curPage  === 1}>
                      <ArrowLeftIcon strokeWidth={2} className="h-4 w-4"/>
                    </s.IconButtonStyle>
                    {pageBtn.map(page=>(
                    <s.IconButtonStyle key={page} onClick={()=>{select(page)}}>{page}</s.IconButtonStyle>
                    ))}
                    <s.IconButtonStyle onClick={nextPage} disabled={pageInfo.curPage === pageInfo.endPage}>
                      <ArrowRightIcon strokeWidth={2} className="h-4 w-4"/>
                    </s.IconButtonStyle>
                  </s.ButtonGroupStyle>
                </s.PageButtonGroupDiv>
            </s.ContentListDiv>
        </>
    );
}
export default StoreListMain;