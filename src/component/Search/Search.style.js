import styled from "styled-components";

export const SearchContainer = styled.div`
  width: 1000px;
  display: flex;
  align-items: center;
  justify-content: right;
  gap: 10px;
  margin-left: 200px;
`;

export const SearchTitle = styled.div`
  width: 50px;
  font-weight: bold;
  font-size: 18px;
`;

export const SearchInput = styled.input`
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

export const SearchButton = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  border: 1px solid;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: lightblue;
  }
`;

/** 
  <SearchContainer>
<SearchTitle>제목</SearchTitle>
<SearchInput placeholder="검색어를 입력하세요" />
<SearchButton>찾기</SearchButton>
</SearchContainer>
*/
