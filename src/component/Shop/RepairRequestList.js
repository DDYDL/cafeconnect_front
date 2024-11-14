import {
  CommonWrapper,
  CommonContainer,
  ContainerTitleArea,
} from "../styledcomponent/common.tsx";
import { StyledButton } from "../styledcomponent/button.tsx";
import { FilterWrapForMainStore } from "../styledcomponent/orderlist.tsx";
import * as r from "../styledcomponent/repair.tsx";
import { Select, Option, Input } from "@material-tailwind/react";
import { useState } from "react";

import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

function RepairRequestList() {
  const [searchType, setSearchType] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedStatus, setSelectedStatus] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRepair, setSelectedRepair] = useState(null);

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
      <Dialog open={open} handler={handleClose} size="lg">
        <DialogHeader className="flex items-center justify-between">
          <h4 className="text-xl font-semibold">신청 상세 보기</h4>
          <XMarkIcon className="h-5 w-5 cursor-pointer" onClick={handleClose} />
        </DialogHeader>
        <DialogBody divider className="h-[40rem] overflow-y-auto">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <img
                src={repairData?.imageUrl || "/image/machine.jpg"}
                alt="기계"
                className="w-24 h-24 object-cover"
              />
              <div>
                <div className="text-sm text-gray-600">상품코드</div>
                <div className="font-medium">{repairData?.code}</div>
                <div className="text-sm text-gray-600 mt-2">접수일</div>
                <div>{repairData?.date}</div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h5 className="font-medium mb-2">제목</h5>
              <div className="p-3 bg-gray-50 rounded">
                {repairData?.title || "부품교체"}
              </div>
            </div>

            <div>
              <h5 className="font-medium mb-2">내용</h5>
              <div className="p-3 bg-gray-50 rounded min-h-[100px]">
                {repairData?.content || "수리 내용이 여기에 표시됩니다."}
              </div>
            </div>

            <div>
              <h5 className="font-medium mb-2">수리단계</h5>
              <div className="flex items-center justify-between max-w-md mx-auto mt-4">
                <div
                  className={`flex flex-col items-center ${
                    repairData?.status === "수리접수" ? "text-blue-500" : ""
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    1
                  </div>
                  <span className="mt-2 text-sm">수리접수</span>
                </div>
                <div className="flex-1 h-[2px] bg-gray-200" />
                <div
                  className={`flex flex-col items-center ${
                    repairData?.status === "수리중" ? "text-blue-500" : ""
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    2
                  </div>
                  <span className="mt-2 text-sm">수리중</span>
                </div>
                <div className="flex-1 h-[2px] bg-gray-200" />
                <div
                  className={`flex flex-col items-center ${
                    repairData?.status === "수리완료" ? "text-blue-500" : ""
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    3
                  </div>
                  <span className="mt-2 text-sm">수리완료</span>
                </div>
              </div>
            </div>
          </div>
        </DialogBody>
      </Dialog>
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
            <StyledButton size="md" theme="brown" hasIcon>
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
