import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Alert } from "../components/ui/Alert";
import { useAuth } from "../hooks/useAuth";
import { loginSchema, type LoginFormData } from "../schemas/auth";

export const LoginPage: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [errorStyle, setErrorStyle] = useState<{
    type: "error" | "warning" | "info";
    icon: string;
  }>({ type: "error", icon: "❌" });
  const { login, isLoading, setLoading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setError("");
    setLoading(true);
    const result = await login(data.username, data.password);
    setLoading(false);

    if (!result.success) {
      setError(result.error || "로그인에 실패했습니다.");
      if (result.errorStyle) {
        setErrorStyle(result.errorStyle);
      }
    }
  };

  const clearError = () => {
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            로그인
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            계정이 없으신가요?{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              회원가입
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <Alert
              type={errorStyle.type}
              message={error}
              icon={errorStyle.icon}
              onClose={clearError}
            />
          )}

          <div className="space-y-4">
            <Input
              label="아이디"
              type="text"
              placeholder="아이디를 입력하세요"
              error={errors.username?.message}
              {...register("username")}
            />

            <Input
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력하세요"
              error={errors.password?.message}
              {...register("password")}
            />
          </div>

          <div>
            <Button type="submit" className="w-full" isLoading={isLoading}>
              로그인
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
