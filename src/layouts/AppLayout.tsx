import { Link, NavLink, Outlet } from "react-router-dom";
import { Layers, GraduationCap, BookOpen, Settings } from "lucide-react";
import { useAuthContext } from "@/providers/AuthProvider";
import { ROUTES } from "@/constants/routes";
import { AppAmbience } from "@/components/common/AppAmbience";
import { WelcomeOverlay } from "@/components/common/WelcomeOverlay";

const NAV = [
  { to: ROUTES.DASHBOARD, label: "Decks", jp: "札", icon: Layers },
  { to: ROUTES.REVIEW, label: "Review", jp: "復習", icon: GraduationCap },
  { to: ROUTES.DICTIONARY, label: "Dictionary", jp: "辞書", icon: BookOpen },
  { to: ROUTES.INTEGRATIONS, label: "Settings", jp: "設定", icon: Settings },
];

function initials(name?: string) {
  if (!name) return "?";
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

export function AppLayout() {
  const { user } = useAuthContext();

  return (
    <div className="relative min-h-screen">
      <AppAmbience />
      <WelcomeOverlay name={user?.name} />
      <header className="paper-blur sticky top-0 z-20 border-b border-line/70">
        <div className="mx-auto flex h-[58px] max-w-3xl items-center justify-between px-5">
          <Link to={ROUTES.DASHBOARD} className="flex items-center gap-2.5" style={{ perspective: "600px" }}>
            <span className="logo-spin flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-400 to-indigo-600 font-jp text-lg font-medium text-white shadow-md shadow-indigo-500/30">
              語
            </span>
            <span className="font-display text-[26px] leading-none text-ink-900">
              JAP
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-ink-500 sm:inline">
              {user?.name?.split(" ")[0]}
            </span>
            <Link
              to={ROUTES.ACCOUNT}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 text-xs font-bold text-white shadow-sm transition hover:scale-105"
              title="Account"
            >
              {initials(user?.name)}
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-3xl px-5 pb-28 pt-7">
        <Outlet />
      </main>

      {/* floating bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-20 flex justify-center px-4 pb-[max(16px,env(safe-area-inset-bottom))]">
        <div className="paper-blur flex items-center gap-1 rounded-full border border-line p-1.5 shadow-[0_12px_36px_-12px_rgba(40,54,101,0.4)]">
          {NAV.map(({ to, label, jp, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === ROUTES.DASHBOARD}
              className={({ isActive }) =>
                [
                  "flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition",
                  isActive
                    ? "bg-indigo-500 text-paper shadow-md"
                    : "text-ink-500 hover:bg-indigo-50",
                ].join(" ")
              }
            >
              {({ isActive }) =>
                isActive ? (
                  <>
                    <span className="font-jp text-sm text-sakura-300">{jp}</span>
                    {label}
                  </>
                ) : (
                  <Icon className="h-5 w-5" strokeWidth={2} />
                )
              }
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
