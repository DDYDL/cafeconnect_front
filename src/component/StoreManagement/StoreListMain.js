import * as s from '../styles/StyledStore.tsx';
import * as h from '../styles/HStyledStore.tsx';

import {useState, useEffect} from 'react';
import {axiosInToken} from '../../config.js'
import { useAtomValue } from 'jotai/react';
import { tokenAtom } from '../../atoms';
import { Input, Select, Option} from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const StoreListMain = ()=>{
    const [storeList, setStoreList] = useState([]);
    const [pageBtn, setPageBtn] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [type, setType] = useState('');
    const [keyword, setKeyword] = useState('');
    const token = useAtomValue(tokenAtom);
    let region;

    useEffect(()=> {
        submit(1);
    }, [])
    
    const regionPart = (address)=>{
        region = address.split(' ')[0];
        return region;
    }
    
    const submit = (page) => {
        axiosInToken(token).get(`storeListMain?page=${page}&type=${type}&keyword=${keyword}`)
            .then(res=> {
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

    const search = () => {
        submit(1);
    }

    const searchRegion = (selectedValue) => {
        setType("storeAddress");
        setKeyword(selectedValue);
        submit(1);
      };

    const searchName = (e) => {
        setType("storeName");
        setKeyword(e.target.value);
      };

    return (
        <>
            <s.ContentListDiv>
                <h.MainTitleText>가맹점 조회</h.MainTitleText>
                <h.CategoryButtonGroupDiv>
                    <h.SearchDiv>
                        <Input icon={<MagnifyingGlassIcon className="h-5 w-5" onClick={search}/> } label="매장명 검색" onChange={searchName}/>
                    </h.SearchDiv>
                    <h.ButtonInnerDiv className='w-16'>
                        <Select name="storeAddress" label="지역" onChange={searchRegion}>
                            <Option value="서울">서울특별시</Option>
                            <Option value='경기'>경기도</Option>
                            <Option value='인천광역시'>인천광역시</Option>
                            <Option value='대전광역시'>대전광역시</Option>
                            <Option value='충청북도'>충청북도</Option>
                            <Option value='충청남도'>충청남도</Option>
                            <Option value='강원도'>강원도</Option>
                            <Option value='경상북도'>경상북도</Option>
                            <Option value='경상남도'>경상남도</Option>
                            <Option value='제주도'>제주도</Option>
                            <Option value='울산광역시'>울산광역시</Option>
                            <Option value='부산광역시'>부산광역시</Option>
                            <Option value='광주광역시'>광주광역시</Option>
                            <Option value='전라북도'>전라북도</Option>
                            <Option value='전라남도'>전라남도</Option>
                            <Option value='대구광역시'>대구광역시</Option>
                            <Option value='세종특별자치시'>세종특별자치시</Option>
                        </Select>
                    </h.ButtonInnerDiv>
                </h.CategoryButtonGroupDiv>
                <s.TableList>
                    <s.TableListThead>
                        <h.TableTextTh width='150px'>지역</h.TableTextTh>
                        <h.TableTextTh width='120px'>매장명</h.TableTextTh>
                        <h.TableTextTh width='500px'>주소</h.TableTextTh>
                        <h.TableTextTh width='150px'>전화번호</h.TableTextTh></s.TableListThead>
                    <tbody>
                        {storeList.map(store=>(
                        <s.TableTextTr key={store.storeCode}>
                            <h.TableTextTd>{regionPart(store.storeAddress)}</h.TableTextTd >
                            <h.TableTextTd>{store.storeName}</h.TableTextTd >
                            <h.TableTextTd><a href={`/storeDetailMain/${store.storeCode}`}>{store.storeAddress}</a></h.TableTextTd >
                            <h.TableTextTd>{store.storePhone}</h.TableTextTd >
                        </s.TableTextTr>
                    ))}
                    </tbody>
                </s.TableList>
                <s.PageButtonGroupDiv>
                  <s.ButtonGroupStyle variant="outlined">
                    <s.IconButtonStyle>
                      <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" previous/>
                    </s.IconButtonStyle>
                    {pageBtn.map(page=>(
                    <s.IconButtonStyle key={page}>{page}</s.IconButtonStyle>
                    ))}
                    <s.IconButtonStyle>
                      <ArrowRightIcon strokeWidth={2} className="h-4 w-4" next/>
                    </s.IconButtonStyle>
                  </s.ButtonGroupStyle>
                </s.PageButtonGroupDiv>
            </s.ContentListDiv>
        </>
    )
}
export default StoreListMain;