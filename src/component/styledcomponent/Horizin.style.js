import styled from "styled-components";

// 사이즈 ( basic 800px, basic 아니라면 1000px)
// 바탕색 ( black 검은색, black 아니라면 회색 )
export const CustomHorizontal = styled.div`
  width: ${props => (props.width === "basic" ? "800px" : "1000px")};
  height: 1px; /* 세로 크기 */
  background-color: ${props => (props.bg === "black" ? "#000" : "#dddddd")};
`;

export const LongHorizontal = styled(CustomHorizontal)`

width : 1200px;
height: 1px;
background
background-color: ${props => (props.bg === "black" ? "#000" : "#dddddd")};
`;
