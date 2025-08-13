import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Alert } from '../components/ui/Alert';
import { useAuth } from '../hooks/useAuth';
import { signUpSchema, type SignUpFormData } from '../schemas/auth';

export const SignUpPage: React.FC = () => {
  const [error, setError] = useState<string>('');
  const [errorStyle, setErrorStyle] = useState<{ type: 'error' | 'warning' | 'info', icon: string }>({ type: 'error', icon: '❌' });
  const [success, setSuccess] = useState<string>('');
  const { signUp, isLoading, setLoading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    setError('');
    setSuccess('');
    setLoading(true);
    
    const result = await signUp(data.username, data.email, data.password, data.confirmPassword);
    setLoading(false);
    
    if (result.success) {
      setSuccess('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      setError(result.error || '회원가입에 실패했습니다.');
      if (result.errorStyle) {
        setErrorStyle(result.errorStyle);
      }
    }
  };

  const clearError = () => {
    setError('');
  };

  const clearSuccess = () => {
    setSuccess('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            회원가입
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            이미 계정이 있으신가요?{' '}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              로그인
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
          
          {success && (
            <Alert
              type="success"
              message={success}
              onClose={clearSuccess}
            />
          )}
          
          <div className="space-y-4">
            <Input
              label="사용자 이름"
              type="text"
              placeholder="사용자 이름을 입력하세요"
              error={errors.username?.message}
              {...register('username')}
            />
            
            <Input
              label="이메일"
              type="email"
              placeholder="이메일을 입력하세요"
              error={errors.email?.message}
              {...register('email')}
            />
            
            <Input
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력하세요"
              error={errors.password?.message}
              helperText="8자 이상 입력해주세요"
              {...register('password')}
            />
            
            <Input
              label="비밀번호 확인"
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />
          </div>

          <div>
            <Button
              type="submit"
              className="w-full"
              isLoading={isLoading}
            >
              회원가입
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
