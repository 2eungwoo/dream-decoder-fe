export const navigation = {
  // 로그인 페이지로 이동
  toLogin: (): void => {
    window.location.href = "/login";
  },

  // 대시보드로 이동
  toDashboard: (): void => {
    window.location.href = "/dashboard";
  },

  // 회원가입 페이지로 이동
  toSignUp: (): void => {
    window.location.href = "/signup";
  },
};
