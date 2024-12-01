import * as s from '../styles/StyledStore.tsx';
import axios from 'axios';
import { url } from '../../config.js';

import { Link } from 'react-router-dom';
import { Input, Select, Option } from "@material-tailwind/react";
import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useAtom } from 'jotai/react';
import { memberAtom } from '../../atoms.js';

const StockManage = ({major, middle, sub})=>{
    const [add, setAdd] = useState(false);
    const [info, setInfo] = useState(false);
    const [stockList, setStockList] = useState([]);
    const [majorCategory, setMajorCategory] = useState([]);
    const [middleCategory, setMiddleCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [itemName, setItemName] = useState("");

    const [selectedCategory, setSelectedCategory] = useState({'major':'', 'middle':'', 'sub':''});
    const [middleCategoryFilter, setMiddleCategoryFilter] = useState(middle);

    // Jotai의 member 가져오기
    const [member, setMember] = useAtom(memberAtom);

    useEffect(()=>{
        categorySetting();
        setStockList([]);
        setMember(member);
        getStockList();
    }, [])

    const categorySetting = ()=>{
        setMajorCategory(major);
        setMiddleCategory(middle);
        setSubCategory(sub);
    }

    const getStockList = ()=>{
        axios.get(`${url}/selectStockByStoreCode/${member.storeCode}`)
        .then(res=>{
            console.log(res.data);
            setStockList([...res.data]);
        })
        .catch(err=>{
            console.log(err);
        })
    }

    const openStock = ()=>{
        setAdd(!add);
    }

    const addStock = (e)=>{
        const formData = new FormData();

        formData.append("storeCode", member.storeCode);
        // 상품정보 선택 시 카테고리, 규격, 보관상태 자동으로 들어감
        formData.append("itemCode", member.password);
        // 유통기한, 입고날짜, 수량만 입력
        formData.append("stockExpirationDate", member.password);
        formData.append("stockReceiptDate", member.password);
        formData.append("stockCount", member.username);
        e.preventDefault();
        
        axios.post(`${url}/addStock`, formData)
        .then(res=>{
            if(res.data === "true") {
                console.log(res.data);
                alert("재고가 추가 되었습니다.");
                // stockList에 추가
                setStockList([...stockList, formData]);
            }
        })
        .catch(err=>{
            console.log(err);
            alert("잠시후 다시 시도해주세요.");
        })
    }

    const updateStock = (e, stockNum)=>{
        const formData = new FormData();

        formData.append("stockNum", stockNum);
        formData.append("storeCode", member.storeCode);
        // 상품정보 선택 시 카테고리, 규격, 보관상태 자동으로 들어감
        formData.append("itemCode", member.password);
        // 유통기한, 입고날짜, 수량만 입력
        formData.append("stockExpirationDate", member.password);
        formData.append("stockReceiptDate", member.password);
        formData.append("stockCount", member.username);
        e.preventDefault();
        
        axios.post(`${url}/updateStock`, formData)
        .then(res=>{
            if(res.data === "true") {
                console.log(res.data);
                alert("재고가 수정 되었습니다.");
                // stockList에 추가
                setStockList([...stockList, formData]);
            }
        })
        .catch(err=>{
            console.log(err);
            alert("잠시후 다시 시도해주세요.");
        })
    }

    const deleteStock = (stockNum)=>{
        axios.get(`${url}/deleteStock/${stockNum}`)
        .then(res=>{
            if(res.data === "true") {
                console.log(res.data);
                alert("재고가 삭제 되었습니다.");
                setStockList(stockList.filter(item=>item.stockNum!==stockNum));
            }
        })
        .catch(err=>{
            console.log(err);
            alert("잠시후 다시 시도해주세요.");
        })
    }

    const stockInfo = ()=>{
        setInfo(!info);
    }

    const selectDate = (e)=>{
        const formData = new FormData();

        formData.append("storeCode", member.storeCode);
        formData.append("category", "");
        formData.append("categoryNum");
        formData.append("expirationDate", "true");
        e.preventDefault();
        
        axios.post(`${url}/selectStockByCategory`, formData)
        .then(res=>{
            console.log(res.data);
            setStockList([...res.data]);
        })
        .catch(err=>{
            console.log(err);
            alert("잠시후 다시 시도해주세요.");
        })
    }

    const searchCategory = (e)=>{
        const formData = new FormData();

        formData.append("storeCode", member.storeCode);
        formData.append("category", "");
        formData.append("categoryNum", 0);
        formData.append("expirationDate");
        e.preventDefault();
        
        axios.post(`${url}/selectStockByCategory`, formData)
        .then(res=>{
            console.log(res.data);
            setStockList([...res.data]);
        })
        .catch(err=>{
            console.log(err);
            alert("잠시후 다시 시도해주세요.");
        })
    }

    const searchKeyword = (keyword)=>{
        axios.get(`${url}/selectStockByKeyword/${member.storeCode}/${keyword}`)
        .then(res=>{
            console.log(res.data);
            setStockList([...res.data]);
        })
        .catch(err=>{
            console.log(err);
            alert("잠시후 다시 시도해주세요.");
        })
    }

    const selectCategory = (category, value)=>{
        if(category === 'major') {
            selectedCategory.middle = '';
            selectedCategory.sub = '';
            selectedCategory.major = value;
            console.log(selectedCategory.major);

            // 다시 모든 middleCategory 가져오기
            setMiddleCategoryFilter([middleCategory]);
            console.log(middleCategoryFilter);
            // majorCategoryNum이 동일한 것만 설정
            setMiddleCategoryFilter(middleCategoryFilter.filter(item=>item.itemCategoryMajorNum===value));
            console.log(middleCategoryFilter);
        } else if(category === 'middle') {
            selectedCategory.sub = '';
            selectedCategory.middle = value;
            console.log(selectedCategory.middle);

            // 다시 모든 subCategory 가져오기
            categorySetting();
            // middleCategoryNum이 동일한 것만 설정
            setSubCategory(subCategory.filter(item=>item.itemCategoryMiddleNum===value));
        }
    }

    return (
        <>
            <s.ContentListDiv>
                <s.MainTitleText>매장재고관리</s.MainTitleText>
                <s.CategoryButtonGroupDiv>
                <s.ButtonDiv>
                    <s.ButtonInnerDiv>
                        <input type='checkbox' value='유통기한' onChange={selectDate}/>
                    </s.ButtonInnerDiv>
                    <s.ButtonInnerDiv className='w-16'>
                    <s.SelectStyle label="대분류" onChange={(e)=>selectCategory('major', e)}>
                        {majorCategory.map(major=>(
                            <Option key={major.itemCategoryNum} value={major.itemCategoryNum}>{major.itemCategoryName}</Option>
                        ))}
                        </s.SelectStyle>
                    </s.ButtonInnerDiv>
                    <s.ButtonInnerDiv className="w-16">
                        <s.SelectStyle label="중분류" onChange={(e)=>selectCategory('middle', e)} disabled={!selectedCategory.major}>
                        {middleCategoryFilter.map(middle=>(
                            <Option key={middle.itemCategoryNum} value={middle.itemCategoryNum}>{middle.itemCategoryName}</Option>
                        ))}
                        </s.SelectStyle>
                    </s.ButtonInnerDiv>
                    <s.ButtonInnerDiv className="w-16">
                        <s.SelectStyle label="소분류" onChange={(e)=>selectCategory('sub', e)} disabled={!selectedCategory.middle}>
                        {subCategory.map(sub=>(
                            <Option key={sub.itemCategoryNum} value={sub.itemCategoryNum} onClick={searchCategory}>{sub.itemCategoryName}</Option>
                        ))}
                        </s.SelectStyle>
                    </s.ButtonInnerDiv>
                </s.ButtonDiv>
                <s.ButtonDiv width='200px' float='right'>
                    <s.SearchDiv width='200px'>
                        <Input icon={<MagnifyingGlassIcon className="h-5 w-5" onClick={()=>searchKeyword(itemName)}/>} label="상품명 검색" onChange={(e)=>setItemName(e.target.value)}/>
                    </s.SearchDiv>
                </s.ButtonDiv>
                </s.CategoryButtonGroupDiv>

                <s.TableList>
                    <s.TableListThead><s.TableTextTh width='280px'>상품정보</s.TableTextTh><s.TableTextTh width='160px'>카테고리</s.TableTextTh><s.TableTextTh width='100px'>규격</s.TableTextTh>
                        <s.TableTextTh width='100px'>보관상태</s.TableTextTh><s.TableTextTh width='100px'>유통기한</s.TableTextTh><s.TableTextTh width='100px'>입고날짜</s.TableTextTh>
                        <s.TableTextTh width='80px'>수량</s.TableTextTh><s.TableTextTh width='50px'></s.TableTextTh><s.TableTextTh width='50px'></s.TableTextTh></s.TableListThead>
                    <tbody>
                        <s.TableTextTr onClick={openStock}><PlusIcon style={{marginLeft:'520px', marginTop:'11px'}} className="h-6 w-6"/></s.TableTextTr>
                        {add && <s.TableTextTr>
                            <s.TableTextTd><s.InputStyle width='250px'/></s.TableTextTd>
                            <s.TableTextTd><s.InputStyle width='150px'/></s.TableTextTd>
                            <s.TableTextTd><s.InputStyle width='80px'/></s.TableTextTd>
                            <s.TableTextTd><s.InputStyle width='80px'/></s.TableTextTd>
                            <s.TableTextTd><s.InputStyle width='80px'/></s.TableTextTd>
                            <s.TableTextTd><s.InputStyle width='50px'/></s.TableTextTd>
                            <s.TableTextTd><s.InputStyle width='50px'/></s.TableTextTd>
                            <s.TableTextTd width='50px'><s.ButtonStyle width="50px" onClick={addStock}><Link>저장</Link></s.ButtonStyle></s.TableTextTd>
                            </s.TableTextTr>}

                        {
                            stockList.map(stock=>(
                                <>
                                    <s.TableTextTr onClick={stockInfo}>
                                        <s.TableTextTd width='250px'><s.ImageSize src={`${url}/image/${stock.itemFileNum}`} /><s.SpanSizeDiv><s.SpanSize>{stock.itemCode}</s.SpanSize><br/><s.SpanSize>{stock.itemName}</s.SpanSize></s.SpanSizeDiv></s.TableTextTd>
                                        <s.TableTextTd width='150px'>{stock.itemMajorCategoryName}/{stock.itemMiddleCategoryName}/{stock.itemSubCategoryName}</s.TableTextTd>
                                        <s.TableTextTd width='100px'>{stock.itemCapacity}*{stock.itemUnitQuantity}/{stock.itemUnit}</s.TableTextTd>
                                        <s.TableTextTd width='100px'>{stock.itemStorage}</s.TableTextTd>
                                        <s.TableTextTd width='80px'>-</s.TableTextTd>
                                        <s.TableTextTd width='80px'>-</s.TableTextTd>
                                        <s.TableTextTd width='80px'>{stock.itemAllCount}</s.TableTextTd>
                                    </s.TableTextTr>
                                    {info && 
                                        stock.stockInnerList.map(stockInner=>(
                                        <s.TableTextTr height='45px' bgColor='rgba(234, 234, 234, 1)'>
                                            <s.TableTextTd width='600px'><s.SpanSize>{stock.itemCode}</s.SpanSize><br /></s.TableTextTd>
                                            <s.TableTextTd width='80px'>{stock.stockExpirationDate}</s.TableTextTd>
                                            <s.TableTextTd width='80px'>{stock.stockReceiptDate}</s.TableTextTd>
                                            <s.TableTextTd width='80px'>{stock.stockCount}</s.TableTextTd>
                                            <s.TableTextTd width='50px'><s.ButtonStyle width="50px"><Link onClick={updateStock(stockInner.stockNum)}>저장</Link></s.ButtonStyle></s.TableTextTd>
                                            <s.TableTextTd width='50px'><s.ButtonStyle width="50px"><Link onClick={deleteStock(stockInner.stockNum)}>삭제</Link></s.ButtonStyle></s.TableTextTd>
                                        </s.TableTextTr>
                                    ))
                                    }
                                </>
                            ))
                        }
                    </tbody>
                </s.TableList>
            </s.ContentListDiv>
        </>
    )
}
export default StockManage;