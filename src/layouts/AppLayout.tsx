import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Layers, GraduationCap, BookOpen, BarChart3, Gauge, Settings, ChevronRight } from "lucide-react";
import { useAuthContext } from "@/providers/AuthProvider";
import { ROUTES } from "@/constants/routes";
import { AppAmbience } from "@/components/common/AppAmbience";
import { WelcomeOverlay } from "@/components/common/WelcomeOverlay";

const NAV = [
  { to: ROUTES.DASHBOARD, label: "Decks", jp: "札", icon: Layers },
  { to: ROUTES.REVIEW, label: "Review", jp: "復習", icon: GraduationCap },
  { to: ROUTES.ANALYTICS, label: "Analytics", jp: "統計", icon: BarChart3 },
  { to: ROUTES.COVERAGE, label: "Coverage", jp: "網羅", icon: Gauge },
  { to: ROUTES.DICTIONARY, label: "Dictionary", jp: "辞書", icon: BookOpen },
  { to: ROUTES.INTEGRATIONS, label: "Settings", jp: "設定", icon: Settings },
];

function initials(name?: string) {
  if (!name) return "?";
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

export function AppLayout() {
  const { user } = useAuthContext();
  const { pathname } = useLocation();

  return (
    <div className="relative min-h-screen">
      <AppAmbience />
      <WelcomeOverlay name={user?.name} />

      {/* ── desktop sidebar ── */}
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r border-white/[0.07] bg-[#0e0828]/70 px-4 py-6 backdrop-blur-xl lg:flex">
        <Link to={ROUTES.DASHBOARD} className="flex items-center gap-2.5 px-2" style={{ perspective: "600px" }}>
          <span className="logo-spin flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-400 to-indigo-600 font-jp text-lg text-white shadow-md shadow-indigo-500/30">
            語
          </span>
          <span className="font-display text-2xl text-white">JAP</span>
        </Link>

        <nav className="mt-8 flex flex-col gap-1">
          {NAV.map(({ to, label, jp, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === ROUTES.DASHBOARD}
              className={({ isActive }) =>
                [
                  "group flex items-center gap-3 rounded-2xl px-3.5 py-3 text-[15px] font-bold transition-all duration-300",
                  isActive
                    ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                    : "text-ink-500 hover:bg-white/5 hover:text-white",
                ].join(" ")
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className="h-5 w-5" strokeWidth={2.2} />
                  <span className="flex-1">{label}</span>
                  <span className={`font-jp text-xs ${isActive ? "text-white/70" : "text-ink-300"}`}>{jp}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex-1" />

        <Link
          to={ROUTES.ACCOUNT}
          className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.04] p-2.5 transition hover:bg-white/[0.08]"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 text-sm font-bold text-white">
            {initials(user?.name)}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-white">{user?.name}</p>
            <p className="truncate text-xs text-ink-400">View account</p>
          </div>
          <ChevronRight className="h-4 w-4 shrink-0 text-ink-400" />
        </Link>
      </aside>

      {/* ── mobile top bar ── */}
      <header className="paper-blur sticky top-0 z-20 border-b border-white/[0.07] lg:hidden">
        <div className="flex h-16 items-center justify-between px-5">
          <Link to={ROUTES.DASHBOARD} className="flex items-center gap-2.5" style={{ perspective: "600px" }}>
            <span className="logo-spin flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-400 to-indigo-600 font-jp text-lg text-white">語</span>
            <span className="font-display text-2xl text-white">JAP</span>
          </Link>
          <Link to={ROUTES.ACCOUNT} className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 text-xs font-bold text-white">
            {initials(user?.name)}
          </Link>
        </div>
      </header>

      {/* ── main content ── */}
      <main className="relative z-10 lg:pl-64">
        <div key={pathname} className="route-fade mx-auto max-w-4xl px-5 pb-28 pt-7 sm:px-8 lg:pb-12">
          <Outlet />
        </div>
      </main>

      {/* ── mobile bottom nav ── */}
      <nav className="fixed inset-x-0 bottom-0 z-20 flex justify-center px-4 pb-[max(16px,env(safe-area-inset-bottom))] lg:hidden">
        <div className="paper-blur flex items-center gap-1 rounded-full border border-white/10 p-1.5 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.6)]">
          {NAV.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === ROUTES.DASHBOARD}
              className={({ isActive }) =>
                [
                  "flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition-all duration-300",
                  isActive
                    ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/30"
                    : "text-ink-500 hover:bg-white/5 hover:text-white",
                ].join(" ")
              }
            >
              <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} />
              <span className="hidden sm:inline">{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
