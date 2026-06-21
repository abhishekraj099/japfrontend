import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Layers, GraduationCap, BookOpen } from "lucide-react";
import { useAuthContext } from "@/providers/AuthProvider";
import { ROUTES } from "@/constants/routes";

const NAV = [
  { to: ROUTES.DASHBOARD, label: "Decks", icon: Layers },
  { to: ROUTES.REVIEW, label: "Review", icon: GraduationCap },
  { to: ROUTES.DICTIONARY, label: "Dictionary", icon: BookOpen },
];

function initials(name?: string) {
  if (!name) return "?";
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

export function AppLayout() {
  const { user, clearAuth } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className="min-h-screen">
      <header className="ios-blur sticky top-0 z-20">
        <div className="mx-auto flex h-[52px] max-w-3xl items-center justify-between px-5">
          <Link to={ROUTES.DASHBOARD} className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-blue-500 font-jp text-base font-semibold text-white">
              語
            </span>
            <span className="text-[17px] font-bold tracking-tight text-label">JAP</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden text-[15px] font-medium text-ink-500 sm:inline">
              {user?.name?.split(" ")[0]}
            </span>
            <button
              onClick={handleLogout}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white"
              title="Account · Log out"
            >
              {initials(user?.name)}
            </button>
          </div>
        </div>
        <div className="hairline h-px" />
      </header>

      <main className="mx-auto max-w-3xl px-5 pb-28 pt-6">
        <Outlet />
      </main>

      {/* iOS tab bar */}
      <nav className="fixed inset-x-0 bottom-0 z-20">
        <div className="ios-blur border-t border-black/5">
          <div className="mx-auto flex max-w-3xl items-stretch justify-around px-2 pb-[max(8px,env(safe-area-inset-bottom))] pt-2">
            {NAV.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === ROUTES.DASHBOARD}
                className={({ isActive }) =>
                  [
                    "flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 transition",
                    isActive ? "text-blue-500" : "text-ink-400",
                  ].join(" ")
                }
              >
                <Icon className="h-[22px] w-[22px]" strokeWidth={2} />
                <span className="text-[11px] font-medium">{label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
