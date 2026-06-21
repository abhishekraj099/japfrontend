import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center p-5">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-[20px] bg-gradient-to-br from-blue-500 to-indigo-500 font-jp text-3xl font-medium text-white shadow-lg">
            語
          </span>
          <h1 className="ios-large-title text-[28px] text-label">JAP</h1>
          <p className="mt-1 text-[15px] text-ink-500">Learn Japanese, one card at a time</p>
        </div>
        <div className="ios-card p-7">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
