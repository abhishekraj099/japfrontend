export interface MasteryTotals {
  total: number;
  discovered: number;
  learned: number;
  known: number;
  mastered: number;
  missing: number;
}

export interface JlptMasteryRow extends MasteryTotals {
  level: string;
  masteredPct: number;
  discoveredPct: number;
}

export interface MasteryPattern {
  id: string;
  name: string;
  jlptLevel: string;
}

export interface GrammarMastery {
  totals: MasteryTotals;
  jlptBreakdown: JlptMasteryRow[];
  discovered: Array<MasteryPattern & { discovered: boolean; learned: boolean; known: boolean; mastered: boolean }>;
  mastered: Array<MasteryPattern & { mastered: boolean }>;
  missing: MasteryPattern[];
  recommendations: string[];
}
