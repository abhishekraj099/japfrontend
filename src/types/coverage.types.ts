export interface CoverageCategory {
  id: string;
  label: string;
  coveragePercent: number;
  band: string;
  description: string;
}

export interface CoverageVocabulary {
  knownWords: number;
  learningWords: number;
  totalTrackedWords: number;
  rankedKnownWords: number;
}

export interface CoverageResult {
  vocabulary: CoverageVocabulary;
  categories: CoverageCategory[];
}
