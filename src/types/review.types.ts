import type { CardType, JlptLevel } from "./card.types";

export interface ReviewLog {
  id: string;
  cardId: string;
  rating: number;
  duration: number;
  reviewedAt: string;
  createdAt: string;
}

export interface SubmitReviewInput {
  cardId: string;
  rating: number;
  duration: number;
}

export interface DueCard {
  id: string;
  cardType: CardType;
  question: string;
  answer: string;
  tags: string[];
  reading: string | null;
  jlptLevel: JlptLevel | null;
  examples: string[];
  deckId: string;
  schedule: {
    dueDate: string;
    stability: number;
    difficulty: number;
    reps: number;
    lapses: number;
    state: string;
  } | null;
}
