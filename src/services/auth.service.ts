import { api } from "@/lib/axios";
import type { AuthResponse, LoginInput, RegisterInput } from "@/types/auth.types";

export const authService = {
  login: (data: LoginInput) =>
    api.post<AuthResponse>("/auth/login", data).then((r) => r.data),

  register: (data: RegisterInput) =>
    api.post<AuthResponse>("/auth/register", data).then((r) => r.data),
};
