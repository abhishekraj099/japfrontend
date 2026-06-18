import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "@/providers/AuthProvider";
import { ROUTES } from "@/constants/routes";
import { APP_NAME } from "@/constants/app";

export function AppLayout() {
  const { user, clearAuth } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to={ROUTES.DASHBOARD} className="font-bold text-slate-900 text-lg">
              {APP_NAME}
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link to={ROUTES.DASHBOARD} className="text-slate-600 hover:text-slate-900">
                Decks
              </Link>
              <Link to={ROUTES.REVIEW} className="text-slate-600 hover:text-slate-900">
                Review
              </Link>
              <Link to={ROUTES.DICTIONARY} className="text-slate-600 hover:text-slate-900">
                Dictionary
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-slate-500">{user?.name}</span>
            <button
              onClick={handleLogout}
              className="text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
