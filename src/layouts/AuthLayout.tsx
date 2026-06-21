import { Outlet } from "react-router-dom";
import { Seigaiha } from "@/components/common/Seigaiha";

export function AuthLayout() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-5">
      <Seigaiha className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full" color="#22d3a6" opacity={0.07} />
      <span aria-hidden className="font-jp pointer-events-none absolute -right-12 top-1/3 select-none text-[22rem] leading-none text-indigo-500/[0.05]">
        学
      </span>

      <div className="relative z-10 w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500 font-jp text-3xl font-medium text-paper shadow-lg">
            語
          </span>
          <h1 className="font-display text-4xl text-ink-900">JAP</h1>
          <p className="mt-1 font-jp text-sm tracking-[0.2em] text-ink-500">
            日本語学習
          </p>
        </div>
        <div className="paper-card p-7">
          <Outlet />
        </div>
        <p className="mt-6 text-center font-jp text-[11px] tracking-[0.3em] text-ink-400">
          継続は力なり
        </p>
      </div>
    </div>
  );
}
