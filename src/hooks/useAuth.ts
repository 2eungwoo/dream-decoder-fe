import { useAuthState } from "./useAuthState";
import { useAuthActions } from "./useAuthActions";

export const useAuth = () => {
  const authState = useAuthState();
  const authActions = useAuthActions();

  return {
    ...authState,
    ...authActions,
  };
};
