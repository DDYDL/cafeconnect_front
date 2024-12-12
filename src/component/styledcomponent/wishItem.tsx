import styled from 'styled-components';
export const WishItemWrapper = styled.div`
    //width: 1240px;
    width:1000px;
    padding: 0;
    margin: 0 auto;


`;
export const FilterWrapper = styled.div`    
    margin-top: 60px;
    display: flex;
    gap: 10px;
    justify-content: flex-start;
`;

export const CountWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    margin-top: 1rem;
    
    /* .all_counter 클래스 스타일 */
    .all_counter {
        font-size: 16px;
        color: #333;
        display: flex;
        align-items: center;
    }

    /* .numbering 클래스 스타일 */
    .numbering {
        color: #CBD2A4; /* numbering 색상을 #CBD2A4로 설정 */
        font-weight: bold;
        margin-left: 5px;
    }
`;

export const WishtemDeleteWrapper= styled.div`
    align-items: center;
    display: flex;
    height: 4rem;
    justify-content: space-between;
    margin-bottom: 2rem;
    width: 100%;
    border-bottom: 2px solid #333;
`;

export const CheckDeleteWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
`;

export const CheckWrap = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    
    input[type="checkbox"] {
        width: 18px;
        height: 18px;
        cursor: pointer;
    }

    label {
        font-size: 14px;
        cursor: pointer;
    }
`;
//그리드 시작 
export const ItemListUl = styled.ul`
    display: grid;
     grid-template-columns: repeat(4, 235px); // 고정된 너비
    /* grid-template-columns: repeat(auto-fill, minmax(242px, 1fr)); 1240ver. */
    gap: 20px;
    margin: 0;
    padding: 0;
    list-style: none;
     width: 100%;
    //position: relative; // 아이콘 포함시킴 
`;

export const ItemListLi = styled.li`
    // position: relative;
    // margin-bottom: 30px;
    position: relative;
    width: 235px; // 고정된 너비
    //width: 100%;
    background: #fff;
    border: 1px solid #eee;
    border-radius: 8px;

     &:hover {
        transform: translateY(-2px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
`;

export const ItemListChekcWrap = styled.div`
    // margin-bottom: 5px;
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 2;

    input[type="checkbox"] {
        width: 18px;
        height: 18px;
        cursor: pointer;
    }
`;

export const ItemListImg = styled.div`
    width: 100%;
    height: 0;
    padding-bottom: 100%; // 1:1 비율 유지
    position: relative;
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
`;

export const ItemListTextBox = styled.div`
    padding: 16px;
    min-height: 100px;
    position: relative;
`;

export const ItemTitle = styled.div`
    font-size: 15px;
    line-height: 1.4;
    margin: 0 0 8px 0;
    font-family: "Noto Sans KR";
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 40px; // 장바구니 아이콘 공간 확보
`;

export const ItemPrice = styled.div`
font-family: "Noto Sans KR";
    font-weight: 500;
    font-size: 16px;
    margin-bottom: 8px;
    color: #333;
`;
export const CartIconWrapper = styled.div`
    position: absolute;
    bottom: 16px;
    right: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #CBD2A4;
    transition: all 0.2s ease;

    &:hover {
        background-color: #b0bc8f;
        transform: scale(1.1);
    }

    svg {
        width: 20px;
        height: 20px;
        color: #fff;
    }
`;

export const ItemStorageLabelP = styled.p`
    display: block;
    overflow: hidden;
    margin: 0;
`;
// porps는 소문자로!!!
export const ItemStorageType = styled.span<{ $storageway?: string }>`
${({ $storageway }) =>

    
    ($storageway === "냉동"||$storageway === "냉장") &&
    `
    background: #45b0da;
    color: #fff;
    padding: 2px 4px;
    font-size: 10px;
    line-height: 20px;
    border-radius: 2px;
  `||
  $storageway != "냉동" &&
    `
    background: #d26717;
    color: #fff;
    padding: 2px 4px;
    font-size: 10px;
    line-height: 20px;
    border-radius: 2px;
  `
}
`;

