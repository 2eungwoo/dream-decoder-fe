import React from "react";
import {
  InputContainer,
  InputLabel,
  StyledInput,
  ErrorMessage,
  HelperText,
} from "../../styles/components/Input.styles";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className = "",
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <InputContainer>
      {label && <InputLabel htmlFor={inputId}>{label}</InputLabel>}
      <StyledInput
        id={inputId}
        $hasError={!!error}
        $hasHelperText={!!helperText}
        className={className}
        {...props}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {helperText && !error && <HelperText>{helperText}</HelperText>}
    </InputContainer>
  );
};
