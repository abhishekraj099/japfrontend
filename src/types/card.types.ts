export type JlptLevel = "N5" | "N4" | "N3" | "N2" | "N1";

export interface Card {
  id: string;
  question: string;
  answer: string;
  tags: string[];
  reading: string | null;
  meaning: string | null;
  grammarNotes: string | null;
  jlptLevel: JlptLevel | null;
  frequency: number | null;
  sourceType: string | null;
  sourceUrl: string | null;
  contextSentence: string | null;
  deckId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCardInput {
  deckId: string;
  question: string;
  answer: string;
  tags?: string[];
  reading?: string;
  meaning?: string;
  grammarNotes?: string;
  jlptLevel?: JlptLevel;
  frequency?: number;
  sourceType?: string;
  sourceUrl?: string;
  contextSentence?: string;
}

export interface UpdateCardInput {
  question?: string;
  answer?: string;
  tags?: string[];
  reading?: string;
  meaning?: string;
  grammarNotes?: string;
  jlptLevel?: JlptLevel;
  frequency?: number;
  sourceType?: string;
  sourceUrl?: string;
  contextSentence?: string;
}
