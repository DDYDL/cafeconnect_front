import styled from "styled-components";

export const InputSmall = styled.input`
  width: 300px;
  height: 56px;
  padding: 8px;
  font-size: 14px;
  border: 1px solid;
  text-align: center;
  border-radius: 8px;
`;

export const InputMedium = styled.input`
  // width: 823px; 피그마 기준

  //적당히 맞춘 기준
  width: 500px;
  height: 56px;
  padding-left: 10px;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid #ccc9; /* 90% 불투명한 연한 회색 */
`;

export const Textarea = styled.textarea`
  // width: 823px; 피그마 기준

  //적당히 맞춘 기준
  width: 500px;
  height: 180px;
  font-size: 14px;
  border-radius: 8px;
  padding-top: 10px;
  padding-left: 10px;

  border: 1px solid #ccc9; /* 90% 불투명한 연한 회색 */
`;
