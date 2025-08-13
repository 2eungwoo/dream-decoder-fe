import styled, { css } from 'styled-components';
import { colors, spacing, typography } from '../theme';

// Alert 스타일 인터페이스
interface AlertStyleProps {
  type: 'error' | 'warning' | 'info' | 'success';
}

// Alert 컨테이너 스타일
export const AlertContainer = styled.div<AlertStyleProps>`
  display: flex;
  align-items: flex-start;
  gap: ${spacing.md};
  padding: ${spacing.md};
  border-radius: 0.375rem;
  border: 1px solid;
  font-size: ${typography.sizes.sm};
  font-weight: ${typography.weights.medium};

  /* 타입별 스타일 */
  ${({ type }) => {
    switch (type) {
      case 'error':
        return css`
          background-color: ${colors.error[50]};
          border-color: ${colors.error[200]};
          color: ${colors.error[700]};
        `;
      case 'warning':
        return css`
          background-color: ${colors.warning[50]};
          border-color: ${colors.warning[200]};
          color: ${colors.warning[700]};
        `;
      case 'info':
        return css`
          background-color: ${colors.info[50]};
          border-color: ${colors.info[200]};
          color: ${colors.info[700]};
        `;
      case 'success':
        return css`
          background-color: ${colors.success[50]};
          border-color: ${colors.success[200]};
          color: ${colors.success[700]};
        `;
    }
  }}
`;

// Alert 아이콘 스타일
export const AlertIcon = styled.span`
  flex-shrink: 0;
  font-size: 1.25rem;
  line-height: 1;
`;

// Alert 메시지 스타일
export const AlertMessage = styled.div`
  flex: 1;
  min-width: 0;
`;

// Alert 닫기 버튼 스타일
export const AlertCloseButton = styled.button<{ type: string }>`
  flex-shrink: 0;
  margin-left: auto;
  margin-top: -0.125rem;
  margin-right: -0.125rem;
  padding: 0.375rem;
  border-radius: 0.375rem;
  border: none;
  background: none;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${({ type }) => {
      switch (type) {
        case 'error':
          return colors.error[100];
        case 'warning':
          return colors.warning[100];
        case 'info':
          return colors.info[100];
        case 'success':
          return colors.success[100];
        default:
          return colors.gray[100];
      }
    }};
  }

  &:focus {
    outline: 2px solid ${colors.primary[500]};
    outline-offset: 2px;
  }
`;

// Alert 닫기 아이콘 스타일
export const CloseIcon = styled.svg`
  width: 1rem;
  height: 1rem;
  fill: currentColor;
`;
