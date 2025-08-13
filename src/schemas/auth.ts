import { z } from "zod";

// 로그인 검증 스키마
export const loginSchema = z.object({
  username: z.string().min(1, "아이디를 입력해주세요."),
  password: z.string().min(1, "비밀번호를 입력해주세요."),
});

// 회원가입 검증 스키마
export const signUpSchema = z
  .object({
    username: z.string().min(2, "사용자 이름은 2자 이상이어야 합니다."),
    email: z.string().email("올바른 이메일 형식이어야 합니다."),
    password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),
    confirmPassword: z.string().min(1, "비밀번호 확인을 입력해주세요."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

// 타입 추론
export type LoginFormData = z.infer<typeof loginSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
