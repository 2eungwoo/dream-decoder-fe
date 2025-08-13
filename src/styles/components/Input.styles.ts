import styled, { css } from "styled-components";
import { colors, spacing, typography } from "../theme";

// Input 스타일 인터페이스 - transient props 사용
interface InputStyleProps {
  $hasError?: boolean;
  $hasHelperText?: boolean;
}

// Input 컨테이너 스타일
export const InputContainer = styled.div`
  width: 100%;
`;

// Input 라벨 스타일
export const InputLabel = styled.label`
  display: block;
  font-size: ${typography.sizes.sm};
  font-weight: ${typography.weights.medium};
  color: ${colors.gray[700]};
  margin-bottom: ${spacing.xs};
`;

// Input 필드 스타일
export const StyledInput = styled.input<InputStyleProps>`
  width: 100%;
  padding: ${spacing.input};
  border: 1px solid ${colors.gray[300]};
  border-radius: 0.375rem;
  font-size: ${typography.sizes.sm};
  transition: all 0.2s ease-in-out;

  &::placeholder {
    color: ${colors.gray[400]};
  }

  &:focus {
    outline: none;
    border-color: ${colors.primary[500]};
    box-shadow: 0 0 0 3px ${colors.primary[100]};
  }

  /* 에러 상태 스타일 */
  ${({ $hasError }) =>
    $hasError &&
    css`
      border-color: ${colors.error[700]};
      &:focus {
        border-color: ${colors.error[700]};
        box-shadow: 0 0 0 3px ${colors.error[50]};
      }
    `}
`;

// 에러 메시지 스타일
export const ErrorMessage = styled.p`
  margin-top: ${spacing.xs};
  font-size: ${typography.sizes.sm};
  color: ${colors.error[700]};
`;

// 도움말 텍스트 스타일
export const HelperText = styled.p<{ $hasError?: boolean }>`
  margin-top: ${spacing.xs};
  font-size: ${typography.sizes.sm};
  color: ${({ $hasError }) =>
    $hasError ? colors.error[700] : colors.gray[500]};
`;
