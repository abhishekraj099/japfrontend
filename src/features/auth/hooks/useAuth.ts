import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/auth.service";
import { useAuthContext } from "@/providers/AuthProvider";
import { ROUTES } from "@/constants/routes";

export function useLogin() {
  const { setAuth } = useAuthContext();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      navigate(ROUTES.DASHBOARD);
    },
  });
}

export function useRegister() {
  const { setAuth } = useAuthContext();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      navigate(ROUTES.DASHBOARD);
    },
  });
}
