import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ShopMainWrapper = styled.div`
    display: block;
    margin-top: 150px;
`;
export const ShopMainContainer = styled.div`
    
    width:1580px;
    //width: 1000px;
    display: block;
    clear: both;
    content: '';
    margin: 120px auto 0;
`
    ;
export const ShopMainContent = styled.div`
    margin-top: 60px;
`
    ;
export const ShopMainTitle = styled.h2`
    height: 52px;
    color: #333;
    font-family: "Noto Sans KR";
    font-size: 48px;
    text-align: center;
    margin-bottom: 15px;
    
`
    ;
export const ShopMaintTitlePlus = styled.a`
    
    display: inline-block;
    position: relative;
    margin-left: 10px;
    margin-top: -5px;
    font-size: 80px;
    font-weight: 100;
    vertical-align: sub;

`
    ;
export const ShopMainItemList = styled.div`
    width: 100%;
    position: relative;
    overflow: hidden;
    margin-top: 60px;
`
    ;
export const ItemListUl = styled.ul`
    margin: 0;
    padding: 0;
    display: flex;
    /* gap:16px; */

`;
export const ItemListLi = styled.li`
    width: 242px;
    margin-right: 22px;
    float: left;
    margin-bottom: 50px;
    position: relative;
`
    ;
export const ItemListA = styled(Link)`
    text-decoration: none;
    display: block;  //전체 선택하면 장바구니가 안됨..
    color: inherit;

`
    ;
export const ItemListImg = styled.div`
    height: 272px;
    position: relative;
    margin-bottom: 16px;
    overflow: hidden;

      //마우스 호버 기능 추가
    &:hover .hover-controls {
        opacity: 1;
        transform: translateY(0); //수직으로 올라왔다가 내려감

    }
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`
    ;
export const ItemListTextBox = styled.div`
    padding: 0 4px 0 6px;
    height: 94px; 
`;
export const ItemTitle = styled.div`
   
    font-size: 14px;
    line-height: 16px;
    margin: 0 0 7px 0 !important;
    font-family: "Noto Sans KR";
    font-weight: 500;
    width: auto;
    min-height: auto;
    max-height: initial;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`
    ;
export const ItemPrice = styled.div`
    position: relative;
    font-family: "Noto Sans KR";
    font-weight: 400;
    line-height: normal;
    margin-bottom: 14px;
    -webkit-display: flex;
    -ms-display: flex;
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
`
    ;
export const ItemStorageLabelP = styled.p`
        display: block;
        overflow: hidden;
        margin: 0;
`
    ;

export const ItemStorageType = styled.span<{ $storageway?: string }>`
     ${({ $storageway }) => 
        ($storageway === "냉동"||$storageway === "냉장") &&
    `
    background: #45b0da;
    color: #fff;
    width: auto;
    padding: 2px 4px;
    text-indent: initial;
    font-size: 10px;
    line-height: 20px;
  `
  ||
  $storageway != "냉동" &&
    `
    background: #d26717;
    color: #fff;
    padding: 2px 4px;
    font-size: 10px;
    line-height: 20px;
    border-radius: 2px;
  `}

`;

    export const HoverControls = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    opacity: 0;
    transform: translateY(100%);
    transition: opacity 0.3s ease, transform 0.3s ease;
    z-index: 10;
`;

export const QuantityControl = styled.div`
    display: flex;
    align-items: center;
    background-color: #CBD2A4;
    border-radius: 4px; /* 각지게 조정 */
    width: 130px;
    height: 36px; /* 높이 조금 줄임 */
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
`;

export const QuantityButton = styled.button`

    width: 38px;
    height: 36px; /* 높이 줄임 */
    background-color: #CBD2A4; /* CartButton과 같은 색상으로 설정 */
    border: 1px solid #cccccc;
    font-size: 18px;
    font-weight: 600;
    color: #333;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease, color 0.2s ease;

    &:first-of-type {
        border-radius: 4px 0 0 4px; /* 왼쪽 각진 모서리 */
        border-right: none;
    }

    &:last-of-type {
        border-radius: 0 4px 4px 0; /* 오른쪽 각진 모서리 */
        border-left: none;
    }

    &:hover {
        background-color: #b0bc8f; /* 호버 시 CartButton과 동일한 색상으로 */
    }

    &:active {
        background-color: #9aa87e; /* 클릭 시 더 진한 색상 */
    }
`;

export const QuantityDisplay = styled.span`
    width: 54px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Arial', sans-serif;
    font-size: 18px;
    font-weight: 600;
    color: #333;
    background-color: #CBD2A4;
    border-top: 1px solid #cccccc;
    border-bottom: 1px solid #cccccc;
    line-height: 36px; /* 수직 중앙 정렬 */
    text-align: center;
`;

export const CartButton = styled.button`
    width: 40px;
    height: 36px; /* 높이 줄임 */
    background-color: #CBD2A4;
    border: 1px solid #cccccc;
    border-radius: 4px; /* 각진 모서리 */
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
        background-color: #b0bc8f;
        transform: scale(1.05);
    }

    svg {
        width: 20px;
        height: 20px;
        color: #333;
    }
`;
//장바구니 수량선택 컴포넌트 추가 끝 


//카테고리ShopList시작
export const ItemCategoryListWrapper = styled.div`
    width: 100%;
    padding: 20px 0;
`;

export const ItemListAlignWrapper= styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px; 
`;
export const CountWrapper = styled.div`
    display: flex;
    align-items: center;
    
    .all_counter {
        font-size: 16px;
        color: #333;
        display: flex;
        align-items: center;
    }

    .numbering {
        color: #CBD2A4;
        font-weight: bold;
        margin: 0 5px;
    }
`;
export const CategoryItemListUl = styled.ul`
    display: grid;
    grid-template-columns: repeat(4, minmax(200px, 1fr)); // 최소 너비 지정
    gap: 20px;
    padding: 0;
    margin: 0;
    list-style: none;
    width: 100%;
`;
export const CategoryItemListLi = styled.li`
    position: relative;
    width: 100%; // 부모 그리드 셀에 맞춤
    margin-bottom: 30px;
    
`;

export const CategoryItemListImg = styled.div`
   width: 100%;
    height: 0;
    padding-bottom: 100%; // 1:1 비율 유지
    position: relative;
    margin-bottom: 16px;
    overflow: hidden;
    border-radius: 8px;
    background-color: #f8f8f8;
    
    img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

    &:hover .hover-controls {
        opacity: 1;
        transform: translateY(0);
    }
`;
export const CategoryItemListTextBox = styled.div`
    padding: 8px 4px;
    height: auto;
    min-height: 94px;
`;
export const CategoryItemTitle = styled.div`
    font-size: 15px;
    line-height: 1.4;
    margin: 0 0 8px 0;
    font-family: "Noto Sans KR";
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;
export const CategoryItemPrice = styled.div`
    font-family: "Noto Sans KR";
    font-weight: 500;
    font-size: 16px;
    margin-bottom: 8px;
    color: #333;
`;