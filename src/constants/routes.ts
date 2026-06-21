export const ROUTES = {
  HOME: "/",
  ONBOARDING: "/welcome",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  DECK: (id: string) => `/decks/${id}`,
  REVIEW: "/review",
  DICTIONARY: "/dictionary",
  ACCOUNT: "/account",
  INTEGRATIONS: "/settings/integrations",
} as const;
