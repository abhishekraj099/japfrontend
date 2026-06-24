export interface WeakItem {
  id: string;
  label: string;
  jlptLevel: string | null;
  total: number;
  fails: number;
  retentionPct: number | null;
  cardType?: string;
}

export interface WeakTypeAnalysis {
  mostFailed: WeakItem[];
  lowestRetention: WeakItem[];
  mostReviewed: WeakItem[];
}

export interface JlptWeakRow {
  level: string;
  saved: number;
  known: number;
  reviews: number;
  retentionPct: number | null;
  failurePct: number | null;
}

export interface FreqWeakRow {
  band: string;
  reviews: number;
  retentionPct: number | null;
  failurePct: number | null;
}

export interface WeakPoints {
  vocabulary: WeakTypeAnalysis;
  grammar: WeakTypeAnalysis;
  jlpt: JlptWeakRow[];
  frequency: FreqWeakRow[];
  recommendations: {
    weakestGrammar: WeakItem | null;
    weakestJlpt: JlptWeakRow | null;
    weakestFrequencyBand: FreqWeakRow | null;
    topReviewTargets: WeakItem[];
    messages: string[];
  };
}
