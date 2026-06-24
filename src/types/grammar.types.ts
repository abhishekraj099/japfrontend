export interface GrammarSchedule {
  state: string;
  dueDate: string;
  stability: number;
  difficulty: number;
  reps: number;
  lapses: number;
}

export interface GrammarLibraryItem {
  id: string;
  pattern: string;
  meaning: string;
  detail: string | null;
  jlptLevel: string | null;
  patternId: string | null;
  examples: string[];
  createdAt: string;
  schedule: GrammarSchedule | null;
  lastReviewedAt: string | null;
}

/** Derived learning status (reuses FSRS schedule; no new tracking). */
export type GrammarStatus = "new" | "learning" | "known" | "mastered";
