import {
  CommonWrapper,
  CommonContainer,
  ContainerTitleArea,
} from "../styledcomponent/common.tsx";
import { StyledButton } from "../styledcomponent/button.tsx";
import { FilterWrapForMainStore } from "../styledcomponent/orderlist.tsx";
import * as r from "../styledcomponent/repair.tsx";
import { Select, Option, Input} from "@material-tailwind/react";
import { useState } from "react";
import { XMarkIcon} from "@heroicons/react/24/outline";
import {useNavigate} from 'react-router-dom';


function RepairRequestList() {
  const [searchType, setSearchType] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedStatus, setSelectedStatus] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRepair, setSelectedRepair] = useState(null);
  const navigate = useNavigate();
  const handleOpenModal = (repair) => {
    setSelectedRepair(repair);
    setIsModalOpen(true);
  };

  const repairList = [
    {
      id: 1,
      imageUrl: "/image/machine.jpg",
      code: "abc001def",
      date: "22/10/23",
      type: "부품교체",
      status: "수리완료",
    },
    {
      id: 2,
      imageUrl: "/image/machine.jpg",
      code: "abc001def",
      date: "22/10/23",
      type: "세척",
      status: "수리완료",
    },
    {
      id: 3,
      imageUrl: "/image/machine.jpg",
      code: "abc001def",
      date: "22/10/23",
      type: "고장수리",
      status: "수리완료",
    },
  ];

  const RepairDetailModal = ({ open, handleClose, repairData }) => {
    return (
      <r.StyledDialog open={open} handler={handleClose} size="lg">
      <r.StyledDialogHeader className="flex items-center justify-between">
        <r.ModalTitle>신청 상세 보기</r.ModalTitle>
        <XMarkIcon className="h-5 w-5 cursor-pointer" onClick={handleClose} />
      </r.StyledDialogHeader>
      
      <r.StyledDialogBody divider>
        <r.DetailSection>
          <r.ProductInfo>
            <img src={repairData?.imageUrl || "/image/machine.jpg"} alt="기계" />
            <div>
              <r.InfoLabel>상품코드</r.InfoLabel>
              <r.InfoValue>{repairData?.code}</r.InfoValue>
              <r.InfoLabel>접수일</r.InfoLabel>
              <r.InfoValue>{repairData?.date}</r.InfoValue>
            </div>
          </r.ProductInfo>

          <r.ContentSection>
            <r.ContentTitle>제목</r.ContentTitle>
            <r.ContentBox>{repairData?.title || "부품교체"}</r.ContentBox>
          </r.ContentSection>

          <r.ContentSection>
            <r.ContentTitle>내용</r.ContentTitle>
            <r.ContentBox>{repairData?.content || "수리 내용"}</r.ContentBox>
          </r.ContentSection>

          <r.ContentSection>
            <r.ContentTitle>수리 답변</r.ContentTitle>
            <r.ContentBox>{repairData?.content || "수리 답변"}</r.ContentBox>
          </r.ContentSection>

          <r.RepairStatusSection>
            <r.ContentTitle>수리단계</r.ContentTitle>
            <r.StatusFlow>
              <r.StatusCircle $isActive={repairData?.status === "수리접수"}>
                수리접수
              </r.StatusCircle>
              <r.StatusArrow />
              <r.StatusCircle $isActive={repairData?.status === "수리중"}>
                수리중
              </r.StatusCircle>
              <r.StatusArrow />
              <r.StatusCircle $isActive={repairData?.status === "수리완료"}>
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
            <div className="total-count">
              총 <strong>2</strong>건
            </div>
            <form>
              <div className="select-wrap">
                <Select
                  value={searchType}
                  onChange={(val) => setSearchType(val)}
                  label="검색구분"
                >
                  <Option value="">전체</Option>
                  <Option value="status">주문상태</Option>
                  <Option value="store">가맹점</Option>
                </Select>
              </div>
              <div className="input-wrap">
                <Input
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  label="검색어를 입력하세요"
                />
              </div>
              <StyledButton size="sm" theme="brown">
                검색
              </StyledButton>
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

          {repairList.map((item) => (
            <r.RepairItem key={item.id} onClick={() => handleOpenModal(item)}>
              <div className="flex items-center gap-4">
                <img src={item.imageUrl} alt="상품" className="w-20 h-20" />
                <div>
                  <div className="text-sm text-gray-500">상품코드</div>
                  <div>{item.code}</div>
                </div>
              </div>
              <div>{item.date}</div>
              <div>{item.type}</div>
              <div>{item.status}</div>
            </r.RepairItem>
          ))}
        </r.RepaireListWrap>

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
