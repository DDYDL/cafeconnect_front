import styled from 'styled-components';

export const CommonWrapper = styled.div`
    display: block;
    margin-top: 150px;
`
;
// CommonContainer의 width를 props로 제어
export const CommonContainer = styled.div<{ size?: string }>`
    position: relative;
    width: ${(props) => props.size || '1000px'};
    margin: 0 auto;
    font-family: "Noto Sans KR";
`;

export const ContainerTitleArea =styled.div`
    text-align: center;
    position: relative;
    min-height: 0;

    h2{
    display: block;
    color: #202020;
    font-size: 24px;
    font-weight: 600;
    line-height: 1.1;
    letter-spacing: -1px
    }
`;


// 기본 리스트 컴포넌트
export const BaseGridHeader = styled.div`
  display: grid;
  background: #f9f9f9;
  padding: 20px 0;
  border-top: 2px solid #000;
  border-bottom: 1px solid #000;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  align-items: center;

  > div {
    padding: 0 10px;  //0 15px (1240ver)
  }
`;
export const BaseGridItem = styled.div`
  display: grid;
  padding: 20px 0;
  border-bottom: 1px solid #e8e8e8;
  align-items: center;
  text-align: center;
  font-size: 16x;
  font-weight: 400;
  width: 100%;
  min-height: 60px;  

  > div {
    padding: 0 10px;  //0 15px (1240ver)
    display: flex;
    justify-content: center;
    align-items: center; 
    overflow: hidden;

  }
`;
