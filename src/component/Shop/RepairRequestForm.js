import {
  CommonWrapper,
  CommonContainer,
  ContainerTitleArea,
} from "../styledcomponent/common.tsx";
import { Select, Option } from "@material-tailwind/react";
import * as r from "../styledcomponent/repair.tsx";
import { StyledButton } from "../styledcomponent/button.tsx";
import { useState, useEffect } from "react";
import { tokenAtom, memberAtom } from "../../atoms";
import { axiosInToken } from "../../config.js";
import { useAtomValue } from "jotai/react";
import { useNavigate } from "react-router"; 
import ReactSelect from "react-select";

function RepairRequsetForm() {
  const token = useAtomValue(tokenAtom);
  const store = useAtomValue(memberAtom);
  const [storeInfo, setStoreInfo] = useState({ storeName: "" }); //session에 담아줄 수 있을까..?
  const [machines, setMachines] = useState([]); // 전체 머신 가져오기[]

  const [selectedMachine, setSelectedMachine] = useState(null); //ReactSelect의 value속성에 활용 {value:string,label:string}형태 {}
  
  const [respairRequest, setRepairRequest] = useState({
    repairType: "",
    itemCode: "",
    itemName: "",
    repairTitle: "",
    repairContent: "",
    storeCode:store.storeCode
  });
  const navigate = useNavigate();

  useEffect(() => {
    getMachinList();
    getStore();
  }, [token]);
 
 
  //지점명 가져오기
  const getStore = () => {
    axiosInToken(token)
      .get(`selectStore/${store.storeCode}`)
      .then((res) => {
        console.log(res.data);
        setStoreInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //머신명과 코드를 셋트로 가져옴  {"itemName": "아리가또그라인더","itemCode":"I20241130652"}
  const getMachinList = () => {
    axiosInToken(token)
      .get("machineFormList")
      .then((res) => {
        // ReactSelect 컴포넌트의 value형식과 일치시켜야함{value:string,label:string}
        setMachines(res.data.map(item=>({
          value:item.itemCode,
          label:item.itemName
        })))
      })
      .catch((err) => {
        console.log(err);
      });
  };

  
  const edit = (e) => {
    setRepairRequest({ ...respairRequest, [e.target.name]: e.target.value });
  };
  
  //자동완성에서 입력한 상품명의 이름과 코드 변경 및 저장 
  const selectMachine = (selectedOption) => {
    setSelectedMachine(selectedOption);
    setRepairRequest((prev) => ({
      ...prev,
      itemCode: selectedOption.value,
      itemName: selectedOption.label,
    }));
  };

  //제출
  const submitRepairRequest=()=>{
     //null이면 알럿 띄우고 제출
     if (!respairRequest.repairType || !respairRequest.itemCode || !respairRequest.repairTitle || !respairRequest.repairContent) {
      alert("필수 항목을 모두 입력해주세요");
      return;
    }
     axiosInToken(token).post('writeRepairRequest',respairRequest)
     .then(res=>{
       if(res.data===true){
        alert("수리 신청이 등록되었습니다.");
        navigate('/repairRequestList');
       }
     })
     .catch(err=>{
      console.log(err);
      alert("수리 신청 등록에 실패했습니다.");
      console.log(respairRequest);
     })

  }
  return (
    <CommonWrapper>
      <CommonContainer>
        <ContainerTitleArea>
          <h2>수리신청</h2>
        </ContainerTitleArea>
        <r.RepairFormtWrap>
          <r.FormTr>
            <r.FormTh>가맹점명</r.FormTh>
            <r.FormTd>{storeInfo.storeName}</r.FormTd>
          </r.FormTr>
          <r.FormTr>
            <r.FormTh>
              수리유형<span>*</span>
            </r.FormTh>
            <r.FormTd>
              {/* material select컴포넌트는 event객체가 아니라 value를 직접 전달해서 edit 함수 사용불가 */}
              <Select
                size="md"
                label="수리유형을 선택해 주세요"
                className="min-w-[200px] select"
                name="repairType"
                value={respairRequest.repairType}
                onChange={(value) =>
                  setRepairRequest((prev) => ({ ...prev, repairType: value }))
                }
              >
                <Option value="고장수리">고장수리</Option>
                <Option value="기기세척">기기세척</Option>
                <Option value="부품교체">부품교체</Option>
              </Select>
            </r.FormTd>
          </r.FormTr>
          <r.FormTr>
            <r.FormTh>
              상품코드<span>*</span>
            </r.FormTh>
            <r.FormTd>
              <div className="flex gap-2 items-center">
               <ReactSelect
                  className="w-full"
                  placeholder="상품명을 입력해주세요"
                  value={selectedMachine} 
                  options={machines} 
                  onChange={selectMachine}
                />
              </div>
            </r.FormTd>
          </r.FormTr>
          <r.FormTr>
            <r.FormTh>
              제목<span>*</span>
            </r.FormTh>
            <r.FormTd>
              <r.StyledInput placeholder="제목을 입력해주세요" width="100%" required
              name="repairTitle" value={respairRequest.repairTitle} onChange={edit}/>
            </r.FormTd>
          </r.FormTr>
          <r.FormTr>
            <r.FormTh>
              내용<span>*</span>
            </r.FormTh>
            <r.FormTd>
              <r.StyledTextarea placeholder="내용을 입력해주세요" required
               name="repairContent"  value={respairRequest.repairContent} onChange={edit}
              />
            </r.FormTd>
          </r.FormTr>
          <div className="flex justify-center gap-4 mt-8">
            <StyledButton size="md" theme="white" onClick={() => navigate('/repairRequestList')}>
              취소
            </StyledButton>
            <StyledButton size="md" theme="brown" onClick={submitRepairRequest}>
              등록하기
            </StyledButton>
          </div>
        </r.RepairFormtWrap>
      </CommonContainer>
    </CommonWrapper>
  );
}
export default RepairRequsetForm;
