import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center">
      <div>
        <h1 className="text-6xl font-bold text-slate-200">404</h1>
        <p className="text-slate-500 mt-2 mb-4">Page not found</p>
        <Link to={ROUTES.DASHBOARD} className="text-blue-600 hover:underline text-sm">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
