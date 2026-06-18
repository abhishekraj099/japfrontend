import { Outlet } from "react-router-dom";
import { APP_NAME } from "@/constants/app";

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">{APP_NAME}</h1>
          <p className="text-slate-500 mt-1">Japanese Learning App</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
