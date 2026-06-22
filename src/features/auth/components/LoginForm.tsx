import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { loginSchema, type LoginSchema } from "../schemas/auth.schema";
import { useLogin } from "../hooks/useAuth";
import { ROUTES } from "@/constants/routes";

export function LoginForm() {
  const { mutate: login, isPending, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const errorMessage = error
    ? (error as { response?: { data?: { error?: string } } }).response?.data
        ?.error ?? "Login failed. Please try again."
    : null;

  return (
    <form onSubmit={handleSubmit((data) => login(data))} className="space-y-5">
      <div>
        <h2 className="font-display text-3xl text-ink-900">Welcome back</h2>
        <p className="text-[15px] text-ink-500 mt-1">Sign in to keep learning</p>
      </div>

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
          {errorMessage}
        </div>
      )}

      <div className="space-y-1">
        <label className="text-[13px] font-medium text-ink-500" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[16px] text-ink-900 outline-none transition placeholder:text-ink-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-[13px] font-medium text-ink-500" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[16px] text-ink-900 outline-none transition placeholder:text-ink-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-xs text-red-500">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xl bg-indigo-500 py-3.5 text-[16px] font-semibold text-paper transition hover:bg-indigo-600 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {isPending ? "Signing in…" : "Sign in"}
      </button>

      <p className="text-center text-[15px] text-ink-500">
        New here?{" "}
        <Link to={ROUTES.REGISTER} className="font-semibold text-sakura-600">
          Create an account
        </Link>
      </p>
    </form>
  );
}
