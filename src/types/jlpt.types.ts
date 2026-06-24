export interface JlptLevelInfo {
  level: string;
  vocabKnown: number;
  vocabTarget: number;
  grammarKnown: number;
  grammarTotal: number;
  grammarMissing: number;
  coverage: number;
  retention: number;
  readiness: number;
  status: string;
  strengths: string[];
  weaknesses: string[];
}

export interface JlptOverview {
  currentLevel: string;
  readiness: number;
  status: string;
  levels: JlptLevelInfo[];
  recommendations: Array<{ text: string; route: string }>;
}
