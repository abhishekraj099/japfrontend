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
  question: string;
  answer: string;
  tags: string[];
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
