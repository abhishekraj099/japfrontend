import { Link, Outlet, useLocation } from "react-router-dom";
import { Layers, BookOpen, RefreshCw } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { AnimeScene } from "@/components/common/AnimeScene";

const CORAL = "linear-gradient(135deg,#ff8a4c 0%,#ff4d6a 100%)";

const PILLS = [
  { icon: Layers, label: "Smart cards" },
  { icon: BookOpen, label: "Dictionary" },
  { icon: RefreshCw, label: "Spaced repetition" },
];

export function AuthLayout() {
  const { pathname } = useLocation();
  const isLogin = pathname.includes("login");

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden" style={{ background: "#0e0828" }}>
      {/* full-screen anime scene */}
      <AnimeScene className="absolute inset-0 h-full w-full" />
      {/* readability scrims */}
      <div className="absolute inset-0 bg-gradient-to-l from-[#0e0828]/85 via-[#0e0828]/25 to-[#0e0828]/45" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0e0828] to-transparent" />

      {/* top bar */}
      <header className="relative z-10 mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5" style={{ perspective: "600px" }}>
          <span className="logo-spin flex h-10 w-10 items-center justify-center rounded-xl font-jp text-lg text-white shadow-lg" style={{ background: CORAL }}>語</span>
          <span className="text-2xl font-extrabold tracking-tight text-white">JAP</span>
        </Link>
        <Link to={isLogin ? ROUTES.REGISTER : ROUTES.LOGIN} className="text-sm font-bold text-white/80 transition hover:text-white">
          {isLogin ? "Create account" : "Log in"}
        </Link>
      </header>

      {/* body: branding (left) + floating form (right) */}
      <div className="relative z-10 mx-auto grid w-full max-w-6xl flex-1 items-center gap-10 px-6 py-8 lg:grid-cols-2">
        {/* branding */}
        <div className="hidden lg:block">
          <h2 className="font-display text-5xl font-extrabold leading-[1.06] text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
            Really learn Japanese,
            <br />
            the{" "}
            <span className="relative">
              fun
              <span className="absolute -bottom-1 left-0 h-1.5 w-full rounded-full" style={{ background: "#ff3d8b" }} />
            </span>{" "}
            way 🌸
          </h2>
          <p className="mt-4 max-w-md text-lg text-white/80 drop-shadow">
            Smart flashcards, a built-in dictionary and spaced repetition — in one playful place.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {PILLS.map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-2 text-sm font-semibold text-white/90 ring-1 ring-white/15 backdrop-blur">
                <Icon className="h-4 w-4 text-[#1ad3b0]" />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* floating form card */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-sm">
            <p className="mb-3 text-center font-jp text-sm tracking-[0.22em] text-white/70 lg:text-left">
              {isLogin ? "おかえりなさい" : "はじめまして"}
            </p>
            <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#1a1448]/85 p-8 shadow-2xl backdrop-blur-xl">
              <span className="absolute inset-x-0 top-0 h-1.5" style={{ background: CORAL }} />
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
