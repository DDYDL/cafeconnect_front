import styled from 'styled-components';

// 버튼 크기 스타일 정의
const SIZES = {
  sm: `
    width: 56.11px;
    height: 36px;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
  `,
  md: `
    width: 120px;
    height: 48px;
    font-size: 18px;
    font-weight: 500;
    line-height: 48px;
  `,
  lg: `
    width: 177px;
    height: 62px;
    font-size: 20px;
    font-weight: 700;
    line-height: 60px;
    letter-spacing: -0.5px;
  `,
  extralg:`
    width: 510px;
    height: 62px;
    font-size: 20px;
    font-weight: 700;
    line-height: 60px;
    letter-spacing: -0.5px;

  `
};

// 버튼 테마 스타일 정의
const THEMES = {
  white: `
    background: #FDFDFD;
    border: 1px solid #959595;
    color: #000000;
    
    &:hover {
      background: #f5f5f5;
    }
  `,
  brown: `
    background: #54473F;
    border: 1px solid #E5E5E5;
    color: #FDFDFD;
    
    &:hover {
      background: #645347;
    }
  `
};

// 타입 정의
interface StyledButtonProps {
    size?: keyof typeof SIZES;
    theme?: keyof typeof THEMES;
}
export const StyledButton = styled.button<StyledButtonProps>`
  box-sizing: border-box;
  border-radius: 4px;
  font-family: 'Noto Sans KR', sans-serif;
  font-style: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;
  
  /* 크기 스타일 적용 */
  ${props => SIZES[props.size || 'md']}
  
  /* 테마 스타일 적용 */
  ${props => THEMES[props.theme || 'white']}
  
  /* 비활성화 스타일 */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

