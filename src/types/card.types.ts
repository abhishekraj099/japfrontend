export type JlptLevel = "N5" | "N4" | "N3" | "N2" | "N1";

/** Discriminator shared with the backend Card.cardType column. */
export type CardType = "vocab" | "grammar" | "sentence";

export interface Card {
  id: string;
  cardType: CardType;
  question: string;
  answer: string;
  tags: string[];
  reading: string | null;
  meaning: string | null;
  grammarNotes: string | null;
  jlptLevel: JlptLevel | null;
  frequency: number | null;
  pitchAccent: string | null;
  patternId: string | null;
  examples: string[];
  sourceType: string | null;
  sourceUrl: string | null;
  contextSentence: string | null;
  // Combined-card fields (Phase 18C) — an example attached to a vocab card.
  exampleSentence: string | null;
  exampleReading: string | null;
  exampleTranslation: string | null;
  pageTitle: string | null;
  extractionSource: string | null;
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
  pitchAccent?: string;
  sourceType?: string;
  sourceUrl?: string;
  contextSentence?: string;
  exampleSentence?: string;
  exampleReading?: string;
  exampleTranslation?: string;
  pageTitle?: string;
  extractionSource?: string;
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
  pitchAccent?: string;
  sourceType?: string;
  sourceUrl?: string;
  contextSentence?: string;
  examples?: string[];
  exampleSentence?: string;
  exampleReading?: string;
  exampleTranslation?: string;
}
