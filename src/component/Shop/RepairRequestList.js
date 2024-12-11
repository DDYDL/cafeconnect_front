import {
  CommonWrapper,
  CommonContainer,
  ContainerTitleArea,
} from "../styledcomponent/common.tsx";
import * as r from "../styledcomponent/repair.tsx";
import * as s from '../styles/StyledStore.tsx';
import { StyledButton } from "../styledcomponent/button.tsx";
import { FilterWrapForMainStore } from "../styledcomponent/orderlist.tsx";
import { Select, Option, Input} from "@material-tailwind/react";
import { useState,useEffect} from "react";
import { XMarkIcon,MagnifyingGlassIcon, ArrowRightIcon, ArrowLeftIcon} from "@heroicons/react/24/outline";
import {useNavigate} from 'react-router-dom';
import { tokenAtom, memberAtom } from "../../atoms";
import { axiosInToken,url } from "../../config.js";
import { useAtomValue,useAtom } from "jotai/react";
import { format } from 'date-fns';


function RepairRequestList() {
  const [token,setToken] = useAtom(tokenAtom);
  const store = useAtomValue(memberAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRepair, setSelectedRepair] = useState({});//modal에 넘김
  const [repairList,setRepairList] = useState([]);
  const [searchType, setSearchType] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [pageBtn, setPageBtn] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  
  const navigate = useNavigate();
  
  //modal열기
  const handleOpenModal = (repair) => {
    if(!repair) return;
    setSelectedRepair(repair);
    setIsModalOpen(true);
  };

  useEffect(()=>{
    getRepairRequest(1);
  },[token]);

  // 목록 불러오기 
  const getRepairRequest=(page)=>{
    const formData  = new FormData();
    formData.append("storeCode",store.storeCode);
    formData.append("page",page);
    formData.append("keyword",searchKeyword);
    formData.append("type",searchType);
    axiosInToken(token).post('repairRequestList',formData)
    .then (res=>{

      if(res.headers.authorization!=null) {
        setToken(res.headers.authorization)
    }
        let pageInfo = res.data.pageInfo;
        console.log(pageInfo);
        let page = [];
          for(let i=pageInfo.startPage; i<=pageInfo.endPage; i++) {
              page.push(i);
          }

        setPageBtn([...page]);
        setPageInfo(pageInfo);
        console.log(res.data.repairRequestList);
        setRepairList(res.data.repairRequestList);

    })
    .catch(err=>{
      console.log(err.data);
    })
  }

  // 카테고리 폼 변환
  const formatCategory = (item) => {
  let categoryFormat = item.itemCategoryMajorName + '/';  
  categoryFormat += item.itemCategoryMiddleName + '/';    
  
  // 소분류가 없는경우엔 "-"
  if (item.itemCategorySubName) {
    categoryFormat += item.itemCategorySubName;
  } else {
    categoryFormat += '-';
  }
  return categoryFormat;
};
  //날짜 폼 변환 
  //백(boot)에서 프론트에게 데이터를 JSON으로 넘기려고 할 때 java.sql.Date->timestamp밀리초로 자동 변환 함 
  //결과적으로 프론트는 number타입의 밀리초값을 받는다!!!
  //모달의 경우엔 date가 선택해야 데이터가 넘어가기 때문에 초기에 빈데이터로 렌더링 되어 에러 발생됨 
  const formatDate=(date)=>{
    let newDate = format(new Date(date),'yyyy-MM-dd');
    return newDate;
  }
  const search=()=>{
     
    if(!searchType) {
        alert("필수 항목을 모두 입력해주세요");
      }
      getRepairRequest(1);    
  }
  //모달
  const RepairDetailModal = ({ open, handleClose, repairData }) => {
    console.log('repairData:', repairData);
    console.log('repairDate:', repairData?.repairDate);
    return (
      <r.StyledDialog open={open} handler={handleClose} size="lg">
      <r.StyledDialogHeader className="flex items-center justify-between">
        <r.ModalTitle>신청 상세 보기</r.ModalTitle>
        <XMarkIcon className="h-5 w-5 cursor-pointer" onClick={handleClose} />
      </r.StyledDialogHeader>
      
      <r.StyledDialogBody divider>
        <r.DetailSection>
          <r.ProductInfo>
            <img src={repairData?.imageUrl ||`${url}/image/${repairData.itemFileNum}`} alt={repairData.itemFileName} />
            <div>
              <r.InfoLabel>상품명</r.InfoLabel>
              <r.InfoValue>{repairData?.itemName}</r.InfoValue>
              <r.InfoLabel>접수일</r.InfoLabel>
              <r.InfoValue>{repairData.repairDate && formatDate(repairData.repairDate)}</r.InfoValue> 
              
            </div>
          </r.ProductInfo>

          <r.ContentSection>
            <r.ContentTitle>제목</r.ContentTitle>
            <r.ContentBox>{repairData?.repairTitle}</r.ContentBox>
          </r.ContentSection>

          <r.ContentSection>
            <r.ContentTitle>내용</r.ContentTitle>
            <r.ContentBox>{repairData?.repairContent}</r.ContentBox>
          </r.ContentSection>

          <r.ContentSection>
            <r.ContentTitle>수리 답변</r.ContentTitle>
            <r.ContentBox>{repairData?.repairAnswer ||"아직 작성된 답변이 없습니다."}</r.ContentBox>
          </r.ContentSection>

          <r.RepairStatusSection>
            <r.ContentTitle>수리단계</r.ContentTitle>
            <r.StatusFlow>
              <r.StatusCircle $isActive={repairData?.repairStatus === "접수"}>
                접수
              </r.StatusCircle>
              <r.StatusArrow />
              <r.StatusCircle $isActive={repairData?.repairStatus === "수리중"}>
                수리중
              </r.StatusCircle>
              <r.StatusArrow />
              <r.StatusCircle $isActive={repairData?.repairStatus === "수리완료"}>
                수리완료
              </r.StatusCircle>
            </r.StatusFlow>
          </r.RepairStatusSection>
        </r.DetailSection>
      </r.StyledDialogBody>
    </r.StyledDialog>
    );
  };

  return (
    <CommonWrapper>
      <CommonContainer>
        <ContainerTitleArea>
          <h2>수리접수내역</h2>
        </ContainerTitleArea>
        <r.RepaireListWrap>
          <FilterWrapForMainStore>
            {/* <div className="total-count">
              총 <strong>2</strong>건
            </div> */}
            <form>
              <div className="select-wrap">
                <Select
                  value={searchType}
                  onChange={(val) => setSearchType(val)}
                  label="검색구분"
                >
                  <Option value="">전체</Option>
                  <Option value="name">상품명</Option>
                  <Option value="status">처리상태</Option>
                  <Option value="kind">수리항목</Option>
                </Select>
              </div>
              <div className="input-wrap">
              <Input icon={<MagnifyingGlassIcon className="h-5 w-5" onClick={search}/> } label="검색어를 입력하세요"  onChange={(e) => setSearchKeyword(e.target.value)}/>
                {/* <Input
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  label="검색어를 입력하세요"
                /> */}
              </div>
            </form>
            <StyledButton size="md" theme="brown" onClick={()=>navigate("/repairRequest")}>
              수리신청
            </StyledButton>
          </FilterWrapForMainStore>
          <r.RepairHeader>
            <div>상품정보</div>
            <div>접수일</div>
            <div>수리항목</div>
            <div>처리상태</div>
          </r.RepairHeader>

          {repairList && repairList.map((item) => (
            <r.RepairItem key={item.repairNum} onClick={() => handleOpenModal(item)}> 
              <div className="flex items-center gap-4">
                <img src={`${url}/image/${item.itemFileNum}`} alt={item.itemFileName}  className="w-20 h-20" />
                <div>
                  <div className="text-sm text-gray-500">{formatCategory(item)}</div>
                  <div>{item.itemName}</div>
                </div>
              </div>
              <div>{formatDate(item.repairDate)}</div>
              <div>{item.repairType}</div>
              <div>{item.repairStatus}</div>
            </r.RepairItem>
          ))}

        </r.RepaireListWrap>
      
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
        {/* 모달컴포넌트 */}
        <RepairDetailModal
          open={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
          repairData={selectedRepair}
        />
      </CommonContainer>
    </CommonWrapper>
  );
}
export default RepairRequestList;
