import styled from "styled-components";



// revenue filter 공통 사용 
export const FilterWrapWithDatePicker = styled.div`
    width: 100%;
    height: 70px;
    background-color: #f2f2f2;
    margin: 30px 0 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px; 

 
  // > div:first-child { // 셀렉트 박스 div에 적용 ,가맹점 선택
  //   min-width: 36px; 
  //   max-height: 30px; 
  // }

  .selecbox{
     min-width: 36px !important; 
     max-height: 30px !important;
  }

  div, input, span, li, p {
      font-family: 'Noto Sans KR' !important;
      font-size: 16px !important;
      color: #333 !important;
    }
    
    .flowbite-datepicker {
      width: 200px;
      
      input {
        height: 30px;
        padding: 0 8px;
        text-align: center;
      }

      button {
        height: 30px;
        color: #333 !important;
        padding: 0 8px;
      }
      
    }
`;

export const DatePickerInputWrap = styled.div`
    display: flex;
    align-items: center;
    margin-right: 20px;

    span {
      color: #666;
      margin: 0 10px;
    }
    svg {
    margin-top: 5px;
    margin-left: 5px;
    color: #333;
  }
`;


export const StoreChooseWrap = styled.div`
  // display: flex;
  // align-items: center;
  // gap: 5px;
  // justify-content: center;

  // > div:first-child { // 셀렉트 박스 div에 적용 
  //   min-width: 36px;
    
  // }

  // div, input, span, li, p {
  //     font-family: 'Noto Sans KR' !important;
  //     font-size: 16px !important;
  //     color: #333 !important;
  //   }
`;

export const StoreItemRevenueContainer = styled.div`
    position: relative;
    margin: 0 auto; 
    margin-bottom: 60px;
`;