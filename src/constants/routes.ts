export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  DECK: (id: string) => `/decks/${id}`,
  REVIEW: "/review",
  DICTIONARY: "/dictionary",
} as const;
