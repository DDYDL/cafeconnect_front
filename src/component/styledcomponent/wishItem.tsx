import styled from 'styled-components';
export const WishItemWrapper = styled.div`
    position: relative;
    //width: 1240px;
    width:1000px;
    padding: 0;

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
export const ItemListUl = styled.ul`
    display: grid;
    grid-template-columns: repeat(4, 1fr);  // 4개의 균등한 컬
    /* grid-template-columns: repeat(auto-fill, minmax(242px, 1fr)); 1240ver. */
    gap: 20px;
    margin: 0;
    padding: 0;
    list-style: none;
    position: relative; // 아이콘 포함시킴 
`;

export const ItemListLi = styled.li`
    position: relative;
    margin-bottom: 30px;
`;

export const ItemListChekcWrap = styled.div`
    margin-bottom: 5px;
`;

export const ItemListImg = styled.div`
    height: 230px;
    position: relative;
    margin-bottom: 16px;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const ItemListTextBox = styled.div`
    padding: 0 4px 0 6px;
    height: 80px;
`;

export const ItemTitle = styled.div`
    font-size: 14px;
    line-height: 16px;
    margin: 0 0 7px 0 !important;
    font-family: "Noto Sans KR";
    font-weight: 500;
    max-height: initial;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;

export const ItemPrice = styled.div`
    position: relative;
    font-family: "Noto Sans KR";
    font-weight: 400;
    line-height: normal;
    margin-bottom: 14px;
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
`;

export const ItemStorageLabelP = styled.p`
    display: block;
    overflow: hidden;
    margin: 0;
`;

export const ItemStorageType = styled.span<{ storageWay?: string }>`
${({ storageWay }) =>
    storageWay === "냉동" &&
    `
    background: #45b0da;
    color: #fff;
    padding: 4px 6px;
    font-size: 10px;
    line-height: 14px;
    border-radius: 2px;
  `||
  storageWay != "냉동" &&
    `
    background: #d26717;
    color: #fff;
    padding: 4px 6px;
    font-size: 10px;
    line-height: 14px;
    border-radius: 2px;
  `
}
`;

export const CartIconWrapper = styled.div`
    position: absolute;
    bottom: 10px;
    right: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    border-radius: 50%;
    transition: all 0.2s ease;

    &:hover {
        background-color: rgba(203, 210, 164, 0.2);
        transform: scale(1.1);
    }

    svg {
        width: 20px;
        height: 20px;
        color: #54473F;
    }
`;