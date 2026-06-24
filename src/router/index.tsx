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
import { AnalyticsPage } from "@/pages/AnalyticsPage";
import { DictionaryPage } from "@/pages/DictionaryPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { OnboardingPage, ONBOARDED_KEY } from "@/pages/OnboardingPage";
import { IntegrationsPage } from "@/pages/IntegrationsPage";
import { AccountPage } from "@/pages/AccountPage";
import { LandingPage } from "@/pages/LandingPage";
import { PricingPage } from "@/pages/PricingPage";
import { DownloadPage } from "@/pages/DownloadPage";
import { CheckoutPage } from "@/pages/CheckoutPage";
import { useAuthContext } from "@/providers/AuthProvider";

void ONBOARDED_KEY;

function Home() {
  const { user, isLoading } = useAuthContext();
  if (isLoading) return null;
  if (user) return <Navigate to={ROUTES.DASHBOARD} replace />;
  return <LandingPage />;
}

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Home />,
  },
  {
    path: ROUTES.PRICING,
    element: <PricingPage />,
  },
  {
    path: ROUTES.DOWNLOAD,
    element: <DownloadPage />,
  },
  {
    path: ROUTES.CHECKOUT,
    element: <CheckoutPage />,
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
          { path: ROUTES.ANALYTICS, element: <AnalyticsPage /> },
          { path: ROUTES.DICTIONARY, element: <DictionaryPage /> },
          { path: ROUTES.ACCOUNT, element: <AccountPage /> },
          { path: ROUTES.INTEGRATIONS, element: <IntegrationsPage /> },
        ],
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);
