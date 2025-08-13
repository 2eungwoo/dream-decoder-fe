import styled, { css } from "styled-components";
import { colors, spacing, typography } from "../theme";

// Button 스타일 인터페이스 - transient props 사용
interface ButtonStyleProps {
  $variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  $size?: 'sm' | 'md' | 'lg';
  $isLoading?: boolean;
}

// 기본 Button 스타일
export const StyledButton = styled.button<ButtonStyleProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  font-weight: ${typography.weights.medium};
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  border: none;
  outline: none;
  
  &:focus-visible {
    outline: 2px solid ${colors.primary[500]};
    outline-offset: 2px;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* 크기별 스타일 */
  ${({ $size = 'md' }) => {
    switch ($size) {
      case 'sm':
        return css`
          height: 2rem;
          padding: 0 ${spacing.sm};
          font-size: ${typography.sizes.sm};
        `;
      case 'lg':
        return css`
          height: 3rem;
          padding: 0 ${spacing.xl};
          font-size: ${typography.sizes.base};
        `;
      default: // md
        return css`
          height: 2.5rem;
          padding: 0 ${spacing.md};
          font-size: ${typography.sizes.sm};
        `;
    }
  }}

  /* 변형별 스타일 */
  ${({ $variant = 'primary' }) => {
    switch ($variant) {
      case 'secondary':
        return css`
          background-color: ${colors.gray[600]};
          color: white;
          &:hover:not(:disabled) {
            background-color: ${colors.gray[700]};
          }
        `;
      case 'outline':
        return css`
          background-color: transparent;
          border: 1px solid ${colors.gray[300]};
          color: ${colors.gray[700]};
          &:hover:not(:disabled) {
            background-color: ${colors.gray[50]};
          }
        `;
      case 'ghost':
        return css`
          background-color: transparent;
          color: ${colors.gray[700]};
          &:hover:not(:disabled) {
            background-color: ${colors.gray[100]};
          }
        `;
      default: // primary
        return css`
          background-color: ${colors.primary[600]};
          color: white;
          &:hover:not(:disabled) {
            background-color: ${colors.primary[700]};
          }
        `;
    }
  }}
`;

// 로딩 스피너 스타일
export const LoadingSpinner = styled.span`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: ${spacing.sm};

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
