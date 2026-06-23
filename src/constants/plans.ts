export interface Plan {
  id: "monthly" | "yearly" | "lifetime";
  name: string;
  jp: string;
  price: number; // INR
  period: string;
  perMonth?: string;
  badge?: string;
  save?: string;
  highlight?: boolean;
}

/* Extension + App combined. Market-based INR pricing. */
export const PLANS: Plan[] = [
  {
    id: "monthly",
    name: "Monthly",
    jp: "月額",
    price: 299,
    period: "per month",
  },
  {
    id: "yearly",
    name: "Yearly",
    jp: "年額",
    price: 1999,
    period: "per year",
    perMonth: "≈ ₹166 / month",
    badge: "Best value",
    save: "Save 44%",
    highlight: true,
  },
  {
    id: "lifetime",
    name: "Lifetime",
    jp: "永久",
    price: 4999,
    period: "one-time",
    badge: "Pay once",
  },
];

export function planById(id?: string | null): Plan {
  return PLANS.find((p) => p.id === id) ?? PLANS[1];
}

/* everything every plan unlocks (extension + app combined) */
export const INCLUDED = [
  "Browser extension — save words from any website",
  "Send saved cards straight to Anki",
  "All in-app lessons, decks & flashcards",
  "Spaced-repetition reviews that actually stick",
  "Built-in dictionary with readings & pitch accent",
  "Native + AI text-to-speech audio",
  "Sync your progress across extension & app",
];

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
