import { createBrowserRouter, Navigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { ProtectedRoute, PublicOnlyRoute } from "./ProtectedRoute";
import { AuthLayout } from "@/layouts/AuthLayout";
import { AppLayout } from "@/layouts/AppLayout";
import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { DeckDetailPage } from "@/pages/DeckDetailPage";
import { ReviewPage } from "@/pages/ReviewPage";
import { DictionaryPage } from "@/pages/DictionaryPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { OnboardingPage, ONBOARDED_KEY } from "@/pages/OnboardingPage";

function HomeRedirect() {
  const onboarded =
    typeof window !== "undefined" && localStorage.getItem(ONBOARDED_KEY) === "1";
  return (
    <Navigate to={onboarded ? ROUTES.DASHBOARD : ROUTES.ONBOARDING} replace />
  );
}

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <HomeRedirect />,
  },
  {
    element: <PublicOnlyRoute />,
    children: [{ path: ROUTES.ONBOARDING, element: <OnboardingPage /> }],
  },
  {
    element: <PublicOnlyRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: ROUTES.LOGIN, element: <LoginPage /> },
          { path: ROUTES.REGISTER, element: <RegisterPage /> },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: ROUTES.DASHBOARD, element: <DashboardPage /> },
          { path: "/decks/:deckId", element: <DeckDetailPage /> },
          { path: ROUTES.REVIEW, element: <ReviewPage /> },
          { path: ROUTES.DICTIONARY, element: <DictionaryPage /> },
        ],
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);
