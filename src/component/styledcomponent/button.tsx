import styled from 'styled-components';

const ICON_SIZES = {
  extrasm: 14,
  sm: 16,
  md: 18,
  lg: 20,
  extralg: 24,
  itemAdd: 16
};

// 버튼 Props 타입 정의 필수!! 프롭 종류 <{이름:type}> 이렇게도 가능 함
interface StyledButtonProps {
  size?: keyof typeof SIZES;
  theme?: keyof typeof THEMES;
  hasIcon?: boolean;
}

const SIZES = {
  extrasm: `
    height: 24px; 
    font-size: 12px; 
    font-weight: 500;
    line-height: 18px;
    padding: 0 10px;
    min-width: 36px;
  `,
  sm: `
    height: 32px;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    padding: 0 12px;
    min-width: 52px;
  `,
  md: `
    height: 42px;
    font-size: 15px;
    font-weight: 500;
    line-height: 22px;
    padding: 0 16px;
    min-width: 110px;
  `,
  lg: `
    height: 56px;
    font-size: 18px;
    font-weight: 700;
    line-height: 54px;
    letter-spacing: -0.5px;
    padding: 0 24px;
    min-width: 160px;
  `,
  extralg: `
    height: 62px;
    font-size: 18px;
    font-weight: 700;
    line-height: 54px;
    letter-spacing: -0.5px;
    padding: 0 32px;
    min-width: 380px;
  `
};

// 버튼 테마 스타일
const THEMES = {
  white: (props: StyledButtonProps) => `
    background: #FDFDFD;
    border: 1px solid #959595;
    color: #000000;
    
    &:hover {
      background: #f5f5f5;
    }

    svg {
      width: ${ICON_SIZES[props.size || 'md']}px;
      height: ${ICON_SIZES[props.size || 'md']}px;
      flex-shrink: 0;
    }
  `,
  brown: (props: StyledButtonProps) => `
    background: #54473F;
    border: 1px solid #E5E5E5;
    color: #FDFDFD;
    
    &:hover {
      background: #645347;
    }

    svg {
      width: ${ICON_SIZES[props.size || 'md']}px;
      height: ${ICON_SIZES[props.size || 'md']}px;
      flex-shrink: 0;
    }
  `
};

export const StyledButton = styled.button<StyledButtonProps>`
  box-sizing: border-box;
  border-radius: 4px;
  font-family: 'Noto Sans KR', sans-serif;
  font-style: normal;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  gap: 8px;
  width: fit-content; 
  
  /* 크기 스타일 적용 */
  ${props => SIZES[props.size || 'md']}
  
  //테마 지정 
  ${props => THEMES[props.theme || 'white'](props)}
  
 /* 아이콘만 있는 경우 너비 설정 기본은 md이 됨 */
 ${({ hasIcon, children, size = 'md' }) =>
    hasIcon && !children && `
      padding: 0;
      width: ${ICON_SIZES[size] + 10}px;
  `}

  /* 비활성화 스타일 */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;