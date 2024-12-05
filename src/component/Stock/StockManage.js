import * as s from '../styles/StyledStore.tsx';
import axios from 'axios';
import { url } from '../../config.js';

import { Link } from 'react-router-dom';
import { Input, Select, Option } from "@material-tailwind/react";
import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useAtom } from 'jotai/react';
import { memberAtom } from '../../atoms.js';
import ReactSelect from "react-select";
import * as c from "../styledcomponent/cartlist.tsx";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import {ko} from 'date-fns/locale';
import { format } from 'date-fns';

const StockManage = ({major, middle, sub})=>{
    const [add, setAdd] = useState(false);
    const [info, setInfo] = useState(false);
    const [stockList, setStockList] = useState([]);
    const [majorCategory, setMajorCategory] = useState([]);
    const [middleCategory, setMiddleCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [itemName, setItemName] = useState("");
    const [expirationDate, setExpirationDate] = useState(false);
    const [itemCategoryStr, setItemCategoryStr] = useState("");
    const [itemCategoryNum, setItemCategoryNum] = useState("");
    const [stock, setStock] = useState({storeCode:0, itemCode:0, stockExpirationDate:'', stockReceiptDate:'', stockCount:0});

    const [selectedItem, setSelectedItem] = useState(null); // value
    const [itemNameList, setItemNameList] = useState([]); // 전체 아이템 리스트
    const [item, setItem] = useState({
        itemCode: "",
        itemName: "",
        itemMajorCategoryName:"",
        itemMiddleCategoryName:"",
        itemSubCategoryName:"",
        itemCapacity:"",
        itemUnitQuantity:"",
        itemUnit:"",
        itemStorage:""
    });

    // 아이템 리스트
    const [itemList, setItemList] = useState([]);
    // 필터링된 아이템 리스트를 담을 변수
    const [itmeListFilter, setItemListFilter] = useState([]);
    const [itemNameFilter, setItemNameFilter] = useState("");

    const [selectedCategory, setSelectedCategory] = useState({'major':'', 'middle':'', 'sub':''});
    const [middleCategoryFilter, setMiddleCategoryFilter] = useState(middle);
    const [subCategoryFilter, setSubCategoryFilter] = useState(sub);

    // Jotai의 member 가져오기
    const [member, setMember] = useAtom(memberAtom);

    useEffect(()=>{
        categorySetting();
        setStockList([]);
        setMember(member);
        getStockList();
        getItem();
    }, [])

    // 검색어 자동완성
    useEffect(() => {
        // 사용자가 입력한 단어를 바로 검색하는게 아니라 0.2초 정도 기다림
        const debounce = setTimeout(() => {
            if(itemNameFilter) updateData();
        },200)
        return () => {
            clearTimeout(debounce)
        }
    },[itemNameFilter])

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

    const edit = (e)=>{
        setStock({...stock, [e.target.name]:e.target.value});
    }    

    const addStock = (e)=>{
        console.log(stock);
        const formData = new FormData();

        formData.append("storeCode", member.storeCode);
        formData.append("itemCode", item.itemCode);
        // 유통기한, 입고날짜, 수량만 입력
        formData.append("stockExpirationDate", stock.stockExpirationDate);
        formData.append("stockReceiptDate", stock.stockReceiptDate);
        formData.append("stockCount", stock.stockCount);
        e.preventDefault();
        
        axios.post(`${url}/addStock`, formData)
        .then(res=>{
            console.log(res.data);
            alert("재고가 추가 되었습니다.");
            // stockList에 추가
            setStockList([...stockList, formData]);
            setItem({});
            setItemNameFilter("");
            setItemListFilter([]);
            setAdd(false);
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
        formData.append("itemCode",  stock.itemCode);
        // 유통기한, 입고날짜, 수량만 입력
        formData.append("stockExpirationDate", stock.stockExpirationDate);
        formData.append("stockReceiptDate", stock.stockReceiptDate);
        formData.append("stockCount", stock.stockCount);
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

    const searchCategory = (e, expirationDate, itemCateStr, itemCateNum)=>{
        e.preventDefault();
        const formData = new FormData();

        setExpirationDate(expirationDate);
        setItemCategoryStr(itemCateStr);
        setItemCategoryNum(itemCateNum);

        formData.append("storeCode", member.storeCode);
        console.log(member.storeCode);
        formData.append("category", itemCateStr);
        console.log(itemCateStr);
        formData.append("categoryNum", itemCateNum);
        console.log(itemCateNum);

        if(expirationDate) {
            formData.append("expirationDate", "true");
            console.log("true");
        } else {
            formData.append("expirationDate", "");
            console.log("false");
        }
        
        axios.post(`${url}/selectStockByCategory`, formData)
        .then(res=>{
            console.log(res.data);
            setStockList([...res.data]);
        })
        .catch(err=>{
            console.log(err);
            alert("잠시후 다시 시도해주세요.");
        });
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

            // 다시 모든 middleCategory 가져오기(배열 깊은 복사)
            let tempArrayM = Array.from(middleCategory);
            // majorCategoryNum이 동일한 것만 설정
            setMiddleCategoryFilter(tempArrayM.filter(item=>item.itemCategoryMajorNum===value));
        } else if(category === 'middle') {
            selectedCategory.sub = '';
            selectedCategory.middle = value;

            // 다시 모든 subCategory 가져오기(배열 깊은 복사)
            let tempArrayS = Array.from(subCategory);
            // middleCategoryNum이 동일한 것만 설정
            setSubCategoryFilter(tempArrayS.filter(item=>item.itemCategoryMiddleNum===value));
        }
    }

    // 아이템 리스트 가져오기
    const getItem = ()=>{
        axios.get(`${url}/allItemList`)
        .then(res=>{
          console.log(res.data);
          setItemList([...res.data]);
          setItemListFilter([...res.data]);
          setItemNameList(res.data.map(item=>({
            value:item.itemCode,
            label:item.itemName
          })))
        })
        .catch(err=>{
          console.log(err);
          alert("잠시후 다시 시도해주세요.");
        })
      }

    const updateData = () => {
        // 데이터 먼저 가져오기
        if(itemList.length > 0) {
          // 배열 깊은 복사로 가져오기
          let tempArray = Array.from(itemList);
          // 사용자가 검색한 단어가 포함된 store 이름만 주기
          let nameList = tempArray.filter(item=>item.itemName.includes(itemNameFilter)===true);
          setItemListFilter(nameList);
        }
        console.log(itmeListFilter);
    }

    const clickKeyword = (itemName)=>{
        setItemNameFilter(itemName);
        // 자동 완성된 검색어 클릭 시 초기화
        setItemListFilter([]);
    }

    //자동완성에서 입력한 상품명의 이름과 코드 변경 및 저장 
    const selectItem = (selectedOption) => {
        setSelectedItem(selectedOption);
        setItem((prev) => ({
        ...prev,
        itemCode: selectedOption.value,
        itemName: selectedOption.label,
        }));
    };

    return (
        <>
            <s.ContentListDiv>
                <s.MainTitleText>매장재고관리</s.MainTitleText>
                <s.CategoryButtonGroupDiv>
                <s.ButtonDiv>
                    <s.ButtonInnerDiv>
                        <s.dateCheckbox type='checkbox' value='유통기한' checked={expirationDate} onClick={(e)=>searchCategory(e, !expirationDate, itemCategoryStr, itemCategoryNum)}/>
                    </s.ButtonInnerDiv>
                    <s.ButtonInnerDiv>
                    <s.SelectStyle label="대분류" onChange={(e)=>selectCategory('major', e)}>
                        {majorCategory.map(major=>(
                            <Option key={major.itemCategoryNum} value={major.itemCategoryNum} onClick={(e)=>searchCategory(e, expirationDate, 'major', major.itemCategoryNum)}>{major.itemCategoryName}</Option>
                        ))}
                        </s.SelectStyle>
                    </s.ButtonInnerDiv>
                    <s.ButtonInnerDiv>
                        <s.SelectStyle label="중분류" onChange={(e)=>selectCategory('middle', e)} disabled={!selectedCategory.major}>
                        {middleCategoryFilter.map(middle=>(
                            <Option key={middle.itemCategoryNum} value={middle.itemCategoryNum} onClick={(e)=>searchCategory(e, expirationDate, 'middle', middle.itemCategoryNum)}>{middle.itemCategoryName}</Option>
                        ))}
                        </s.SelectStyle>
                    </s.ButtonInnerDiv>
                    <s.ButtonInnerDiv>
                        <s.SelectStyle label="소분류" onChange={(e)=>selectCategory('sub', e)} disabled={!selectedCategory.middle}>
                        {subCategoryFilter.map(sub=>(
                            <Option key={sub.itemCategoryNum} value={sub.itemCategoryNum} onClick={(e)=>searchCategory(e, expirationDate, 'sub', sub.itemCategoryNum)}>{sub.itemCategoryName}</Option>
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
                            <s.TableTextTd>
                            <div className="flex gap-2 items-center">
                                <ReactSelect
                                    className="w-full"
                                    placeholder="상품명 입력"
                                    value={selectedItem}
                                    options={itemNameList}
                                    onChange={selectItem}
                                    />
                            </div>
                            {/* <s.InputStyle width='250px' name='itemName' value={itemNameFilter} onChange={(e)=>{setItemNameFilter(e.target.value)}} autocomplete='off' required/>
                            {itmeListFilter.length > 0 && itemNameFilter && ( //키워드가 존재하고,해당키워드에 맞는 이름이 있을때만 보여주기 
                                <s.AutoSearchContainer top='400px' width='250px' left='505px'>
                                <s.AutoSearchWrap>
                                    {itmeListFilter.map((item, idx) => (
                                    <s.AutoSearchData
                                        key={item.itemName}
                                        onClick={() => {
                                            setItemNameFilter(item.itemName);
                                            setItem(item);
                                        }}
                                    >
                                    <a onClick={()=>clickKeyword(item.itemName)}>{item.itemName}</a>
                                    </s.AutoSearchData>
                                    ))}
                                    </s.AutoSearchWrap>
                                </s.AutoSearchContainer>
                            )} */}
                            {/* Object.keys(item).length===0 */}
                            </s.TableTextTd>
                            <s.TableTextTd><s.InputStyle width='150px' value={item.itemCode==='' ? "" : `${item.itemMajorCategoryName}/${item.itemMiddleCategoryName}/${item.itemSubCategoryName}`} readOnly/></s.TableTextTd>
                            <s.TableTextTd><s.InputStyle width='80px' value={item.itemCode==='' ? "" : `${item.itemCapacity}*${item.itemUnitQuantity}/${item.itemUnit}`} readOnly/></s.TableTextTd>
                            <s.TableTextTd><s.InputStyle width='80px' value={item.itemCode==='' ? "" : item.itemStorage} readOnly/></s.TableTextTd>
                            <s.TableTextTd>
                            <s.DatePickerWrap>
                            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
                            <DatePicker
                                value={stock.stockExpirationDate}
                                showDaysOutsideCurrentMonth
                                onChange={(date) => setStock({ ...stock, ['stockExpirationDate']: format(date, 'yyyy-MM-dd') })}
                                className="CustomPicker"
                                format='yyyy-MM-dd'
                            />
                            </LocalizationProvider>
                            </s.DatePickerWrap>
                            </s.TableTextTd>
                            <s.TableTextTd>
                            <s.DatePickerWrap>
                            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
                            <DatePicker
                                value={stock.stockReceiptDate}
                                showDaysOutsideCurrentMonth
                                onChange={(date) => setStock({ ...stock, ['stockReceiptDate']: format(date, 'yyyy-MM-dd') })}
                                className="CustomPicker"
                                format='yyyy-MM-dd'
                            />
                            </LocalizationProvider>
                            </s.DatePickerWrap>
                            </s.TableTextTd>
                            <s.TableTextTd>
                            <c.QuantityControl>
                                <c.QuantityInput
                                type="number"
                                min="1"
                                max="999"
                                name='stockCount'
                                value={stock.stockCount}
                                onChange={edit} autocomplete='off' required
                                />
                            </c.QuantityControl>
                            </s.TableTextTd>
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