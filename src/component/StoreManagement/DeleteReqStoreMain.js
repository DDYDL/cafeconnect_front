import * as s from '../styles/StyledStore.tsx';
import * as h from '../styles/HStyledStore.tsx';

import {useState, useEffect} from 'react';
import {axiosInToken} from '../../config.js'
import { useAtomValue } from 'jotai/react';
import { tokenAtom } from '../../atoms';
import { Link } from 'react-router-dom';
import { Input, Select, Option } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const DeleteReqStoreMain = ()=>{
    const [storeList, setStoreList] = useState([]);
    const [pageBtn, setPageBtn] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [type, setType] = useState('');
    const [keyword, setKeyword] = useState('');
    const token = useAtomValue(tokenAtom);

    useEffect(()=> {
        if(token!=null && token!=='')  submit(1);
    }, [token])

    const submit = (page) => {
        axiosInToken(token).get(`deleteReqList?page=${page}&type=${type}&keyword=${keyword}`)
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
                <s.MainTitleText>가맹점 삭제 요청</s.MainTitleText>
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
                            <h.TableTextTd></h.TableTextTd >
                        </s.TableTextTr>
                    ))}
                    </tbody>
                </s.TableList>
            </s.ContentListDiv>
        </>
    )
}
export default DeleteReqStoreMain;