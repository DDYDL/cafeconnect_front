import styled from 'styled-components';


export const ProductDetail = styled.div`
    
    position: relative;
    //width: 1240px;
    width:1000px;
    margin:0 auto;
    padding: 0;
`;
export const PdtDetailHead = styled.div`
    position: relative;
    display: flex; /* flex로 좌우 배치 */
    justify-content:space-between;
    width: 100%;
    margin-bottom: 30px; /* 아래 요소와의 간격 */
    gap: 60px;
`
;
export const PdtDetailLeft = styled.div`
    width: 525px; //400(1000)
    position: relative;
`;
export const PdtDetailItemImg = styled.div`
    position: relative;
    margin-bottom: 30px;
`;
export const PdtDetailItemImgArea = styled.div`
    width: 100%;
    height: 540px; 
    position: relative;
    img {
        width: 100%;
        height: inherit;
        object-fit: cover;
    }
`;

export const PdtDetailRight = styled.div`
    width: 540px; //615(1240ver)
    height: 520px;
`
;
export const PdtDetailItemTitleGroup = styled.div`
    position: relative;
    /* 추가 */
    border-bottom: 2px solid #000;
    padding-bottom: 1rem;
`
    ;
export const PdtDetailItemTitle = styled.h2`
    position: relative;
    font-size: 24px;
    font-weight: 600;
    line-height: 29px;
    padding: 0 100px 8px 0;
`
    ;
export const PdtDetailItemInfoGroup = styled.div`
  position: relative;
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 3rem;
  padding: 3rem 0;
  &::after {
    content: "";
    display: table;
    clear: both;
  }
 ` 
  ;
export const PdtDetailItemInfoDl = styled.dl`
      margin: 0 0 1.8rem;
`
    ;
export const PdtDetailItemInfoDt = styled.dt`
 width: 125px;
 color: #333;
 float: left;
 margin: 0;
 font-size: 16px;
 font-weight: 500;
 padding: 7px 0;
 clear: both;

`
;
export const PdtDetailItemInfoDd = styled.dd`
    font-size: 16px;
    font-weight: 400;
    color: #000;
    padding: 7px 0;
    float: left;
    margin: 0;
`;
export const PdtDetailItemOtherGroup = styled.div`
  display: block;
`;
export const QuantityControlWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-top: 1rem;
`;

export const QuantityButton = styled.button`
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    border: 1px solid #cccccc; /* 깔끔한 회색 보더 추가 */
    border-radius: 4px; /* 살짝 둥근 모서리 */
    color: #333;
    font-size: 1.2rem;
    cursor: pointer;
    transition: background-color 0.2s ease, border-color 0.2s ease;

    &:hover {
        background-color: #f9f9f9; /* 살짝 밝은 회색 배경 */
        border-color: #999999; /* 보더 색상 변경 */
    }

    &:active {
        background-color: #eeeeee; /* 클릭 시 약간 더 어두운 회색 */
    }
`;

export const QuantityDisplay = styled.span`
    margin: 0 1rem;
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
`;

export const PriceWapper = styled.div`
    border-top: 1px solid #000;
    margin-top: 2rem;
    padding: 3rem 0;
    align-items: center;
    display: flex;
    font-weight: 500;
    font-size: 20px;
    justify-content: space-between;
 
`;
export const ButtonWrapper = styled.div`
    align-items: center;
    display: flex;
    margin: 0 auto;
    width: 100%;
    justify-content: space-between;
`;

export const TotalPrice = styled.span`
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;
`;

export const WishlistIcon = styled.div<{ isWished: boolean }>`
    width: 24px;
    height: 24px;
    color: ${({ isWished }) => (isWished ? '#F28787' : '#959595')}; /* 찜 추가 시 브라운, 기본 회색 */
    transition: color 0.3s ease;
`;

export const WishlistButton = styled.button`
    box-sizing: border-box;
    width: 63px;
    height: 62px;
    background: #FDFDFD;
    border: 1px solid #959595;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    
    &:hover {
        transform: scale(1.05); /* 살짝 확대 효과 */
    }
`;

export const PdtDetailBottom = styled.div`
  position: relative;
  margin-top: 30px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
  height: 64px;
`;

export const DividerLine = styled.div`
  height: 3px;
  background-color: #729E07;
  flex: 1; // 남은 공간을 모두 차지
`;

export const PdtExtraInfoTitle = styled.h4`
  font-family: 'Noto Sans KR';
  font-weight: 600;
  font-size: 20px;
  line-height: 64px;
  color: #333;
  margin: 0;
  padding: 0 20px;
  white-space: nowrap;
`;

export const PdtExtraInfoTable = styled.table`
    width: 100%;
    border-collapse: separate;
    border-top: 2px solid #171717;
    border-bottom: 2px solid #171717;
    table-layout: fixed;
    margin-top: 30px;
       /* 첫 번째 tr의 모든 td에 border-top 제거 */
       tr:first-child td {
        border-top: none;
    }
`;
export const PdtExtraInfoTableTh = styled.th`
    padding-right: 15px;
    width:315px;
    word-break: keep-all;
    overflow-wrap: break-word;
    height: 48px;
    font-size: 16px;
`;
export const PdtExtraInfoTableTd = styled.td`
    padding: 0;
    padding: 0 19px;
    color: #000;
    font-size: 16px;
    border-top: 1px solid #d9d9d9;

`;