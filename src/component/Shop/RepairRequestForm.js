import {
  CommonWrapper,
  CommonContainer,
  ContainerTitleArea,
} from "../styledcomponent/common.tsx";
import { Select, Option, Input } from "@material-tailwind/react";
import * as r from "../styledcomponent/repair.tsx";
import { StyledButton } from "../styledcomponent/button.tsx";


function RepairRequsetForm() {
  return (
    <CommonWrapper>
      <CommonContainer>
        <ContainerTitleArea>
          <h2>수리신청</h2>
        </ContainerTitleArea>
        <r.RepairFormtWrap>
          <r.FormTr>
            <r.FormTh>가맹점명</r.FormTh>
            <r.FormTd>독산역1호점</r.FormTd>
          </r.FormTr>
          <r.FormTr>
            <r.FormTh>
              수리유형<span>*</span>
            </r.FormTh>
            <r.FormTd>
              <Select
                size="md"
                label="수리유형을 선택해 주세요"
                className="min-w-[200px]"
              >
                <Option>고장수리</Option>
                <Option>기기세척</Option>
                <Option>부품교체</Option>
              </Select>
            </r.FormTd>
          </r.FormTr>
          <r.FormTr>
            <r.FormTh>
              상품코드<span>*</span>
            </r.FormTh>
            <r.FormTd>
              <div className="flex gap-2">
                <Input
                  placeholder="상품코드를 입력해주세요"
                  className="min-w-[200px]"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <StyledButton size="sm" theme="brown">
                  조회
                </StyledButton>
              </div>
            </r.FormTd>
          </r.FormTr>
          <r.FormTr>
            <r.FormTh>
              제목<span>*</span>
            </r.FormTh>
            <r.FormTd>
              <Input
                labelProps={{
                  className: "hidden", // label 자체를 숨김
                }}
                placeholder="제목을 입력해주세요"
                className="min-w-[500px]"
              />
            </r.FormTd>
          </r.FormTr>
          <r.FormTr>
            <r.FormTh>
              내용<span>*</span>
            </r.FormTh>
            <r.FormTd>
             <r.StyledTextarea rows={4} placeholder="내용을 입력해주세요" />
            </r.FormTd>
          </r.FormTr>

          <div className="flex justify-center gap-4 mt-8">
            <StyledButton size="md" theme="white">
              취소
            </StyledButton>
            <StyledButton size="md" theme="brown">
              등록하기
            </StyledButton>
          </div>
        </r.RepairFormtWrap>
      </CommonContainer>
    </CommonWrapper>
  );
}
export default RepairRequsetForm;
