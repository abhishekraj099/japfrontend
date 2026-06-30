import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/auth.service";
import { useAuthContext } from "@/providers/AuthProvider";
import { ROUTES } from "@/constants/routes";
import { WEB_SETUP_COMPLETE_KEY } from "@/pages/SetupPage";

function syncAuthToExtension(token: string, user: { id: string; email: string; name: string }) {
  try {
    const reqId = Math.random().toString(36).slice(2);
    window.postMessage(
      { source: "jap_setup_bridge", type: "JAP_AUTH_SYNC", data: { token, user }, reqId },
      window.location.origin,
    );
  } catch { /* ignore — extension may not be installed */ }
}

export function useLogin() {
  const { setAuth } = useAuthContext();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      syncAuthToExtension(data.token, data.user);
      const setupDone = localStorage.getItem(WEB_SETUP_COMPLETE_KEY);
      navigate(setupDone ? ROUTES.DASHBOARD : ROUTES.SETUP);
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
      syncAuthToExtension(data.token, data.user);
      navigate(ROUTES.SETUP);
    },
  });
}
