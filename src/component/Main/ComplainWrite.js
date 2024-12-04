import { Link, useNavigate } from "react-router-dom";
import * as s from "../styles/StyledStore.tsx";
import axios from "axios";
import { url } from "../../config.js";
import { useEffect, useState } from "react";
import ReactSelect from "react-select";

const ComplainWrite = () => {
  const [complain, setComplain] = useState({userName:'', userPhone:'', complainTitle:'', complainContent:''});
  const [storeList, setStoreList] = useState([]);

  const [selectedStore, setSelectedStore] = useState(null); // value
  const [storeNameList, setStoreNameList] = useState([]); // 전체 가맹점 리스트
  const [storeName, setStoreName] = useState("");
  const [store, setStore] = useState({
    storeCode: "",
    storeName: ""
  });
  const navigate = useNavigate();

  useEffect(()=>{
    setComplain({});
    getStore();
  }, [])

  // 검색어 자동완성
  useEffect(() => {
    // 사용자가 입력한 단어를 바로 검색하는게 아니라 0.2초 정도 기다림
    const debounce = setTimeout(() => {
      if(storeName) updateData();
    },200)
    return () => {
      clearTimeout(debounce)
    }
  },[storeName])

  const updateData = () => {
    // 데이터 먼저 가져오기
    if(storeList.length > 0) {
      // 배열 깊은 복사로 가져오기
      let tempArray = Array.from(storeList);
      // 사용자가 검색한 단어가 포함된 store 이름만 주기
      let nameList = tempArray.filter(storeN => storeN.storeName.includes(storeName) === true);
      setStoreNameList(nameList);
    }
    console.log(storeNameList);
  }

  const clickKeyword = (storeName)=>{
    setStoreName(storeName);
    // 자동 완성된 검색어 클릭 시 초기화
    setStoreNameList([]);
  }

  const edit = (e)=>{
    setComplain({...complain, [e.target.name]:e.target.value});
  }

  const getStore = ()=>{
    axios.get(`${url}/allStoreList`)
    .then(res=>{
      console.log(res.data);
      setStoreList([...res.data]);
      setStoreNameList(res.data.map(item=>({
        value:item.storeCode,
        label:item.storeName
      })))
    })
    .catch(err=>{
      console.log(err);
      alert("잠시후 다시 시도해주세요.");
    })
  }

  const writeComplain = (e)=>{
    e.preventDefault();
    const formData = new FormData();

    formData.append("userName", complain.userName);
    formData.append("userPhone", complain.userPhone);
    formData.append("storeName", store.storeName);
    formData.append("complainTitle", complain.complainTitle);
    formData.append("complainContent", complain.complainContent);

    axios.post(`${url}/complainWrite`, formData)
    .then(res=>{
      console.log(res.data);
      navigate("/complain");
    })
    .catch(err=>{
        console.log(err);
    })
  }

  //자동완성에서 입력한 상품명의 이름과 코드 변경 및 저장 
  const selectStore = (selectedOption) => {
    setSelectedStore(selectedOption);
    setStore((prev) => ({
      ...prev,
      storeCode: selectedOption.value,
      storeName: selectedOption.label,
    }));
  };

  return (
    <>
      <s.ContentListDiv width="800px;" marginLeft="580px">
        <s.MainTitleText>글 작성</s.MainTitleText>

        <s.TableList width="800px" textAlign="left">
          <thead>
            <s.TableTextTh width="150px"></s.TableTextTh>
            <s.TableTextTh width="650px"></s.TableTextTh>
          </thead>
          <tbody>
            <s.TrStyle>
              <s.TableTextTd>성함 *</s.TableTextTd>
              <s.TableTextTd>
                <s.InputStyle type="text" name='userName' onChange={edit} required/>
              </s.TableTextTd>
            </s.TrStyle>

            <s.TrStyle>
              <s.TableTextTd>전화번호 *</s.TableTextTd>
              <s.TableTextTd>
                <s.InputStyle type="text" name='userPhone' onChange={edit} required/>
              </s.TableTextTd>
            </s.TrStyle>
            <s.TrStyle>
              <s.TableTextTd>가맹점명 *</s.TableTextTd>
              <s.TableTextTd>
              <div className="flex gap-2 items-center">
               <ReactSelect
                  className="w-full"
                  placeholder="가맹점명을 입력해주세요"
                  value={selectedStore}
                  options={storeNameList}
                  onChange={selectStore}
                />
              </div>
                {/* <s.InputStyle type="text" name='storeName' value={storeName} onChange={(e)=>{setStoreName(e.target.value)}} autocomplete='off' required/>
                {storeNameList.length > 0 && storeName && ( //키워드가 존재하고,해당키워드에 맞는 이름이 있을때만 보여주기 
                  <s.AutoSearchContainer>
                  <s.AutoSearchWrap>
                    {storeNameList.map((store, idx) => (
                      <s.AutoSearchData
                        key={store.storeName}
                        onClick={() => {
                          setStoreName(store.storeName);
                        }}
                      >
                      <a onClick={()=>clickKeyword(store.storeName)}>{store.storeName}</a>
                    </s.AutoSearchData>
                    ))}
                    </s.AutoSearchWrap>
                  </s.AutoSearchContainer>
                )} */}
              </s.TableTextTd>
            </s.TrStyle>
            <s.TrStyle>
              <s.TableTextTd>제목 *</s.TableTextTd>
              <s.TableTextTd>
                <s.InputStyle type="text" name='complainTitle' onChange={edit} required/>
              </s.TableTextTd>
            </s.TrStyle>
            <s.TrStyle>
              <s.TableTextTd>내용 *</s.TableTextTd>
              <s.TableTextTd>
                <s.TextareaStyle rows={4} cols={79} name='complainContent' onChange={edit} required/>
              </s.TableTextTd>
            </s.TrStyle>
          </tbody>
        </s.TableList>
        <s.ButtonDiv>
          <s.ButtonStyle variant="outlined" bgColor="white">
            <Link to="/complain">취소</Link>
          </s.ButtonStyle>
          &nbsp;&nbsp;
          <s.ButtonStyle>
            <Link onClick={e=>writeComplain(e)}>등록하기</Link>
          </s.ButtonStyle>
        </s.ButtonDiv>
      </s.ContentListDiv>
    </>
  );
};
export default ComplainWrite;
