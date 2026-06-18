export const QUERY_KEYS = {
  DECKS: ["decks"] as const,
  DECK: (id: string) => ["decks", id] as const,
  CARDS: (deckId: string) => ["cards", deckId] as const,
  CARD: (id: string) => ["cards", "detail", id] as const,
  DUE_CARDS: ["reviews", "due"] as const,
  REVIEWS: ["reviews"] as const,
  DICTIONARY: (q: string) => ["dictionary", q] as const,
};
