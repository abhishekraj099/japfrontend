export interface AnalyticsOverview {
  knownWords: number;
  learningWords: number;
  ignoredWords: number;
  totalSavedWords: number;
  knownFrequencyCoverage: number;
  learningFrequencyCoverage: number;
  overallRetention: number;
  currentStreak: number;
  longestStreak: number;
}

export interface JlptProgress {
  jlptN5Known: number;
  jlptN4Known: number;
  jlptN3Known: number;
  jlptN2Known: number;
  jlptN1Known: number;
}

export interface ReviewStats {
  totalReviews: number;
  reviewsToday: number;
  reviewsThisWeek: number;
  reviewsThisMonth: number;
  sevenDayRetention: number;
  thirtyDayRetention: number;
}

export interface GrowthStats {
  wordsAddedToday: number;
  wordsAddedThisWeek: number;
  wordsAddedThisMonth: number;
}

export interface AnalyticsDashboard {
  overview: AnalyticsOverview;
  jlpt: JlptProgress;
  reviews: ReviewStats;
  growth: GrowthStats;
  jlptLevels: string[];
}
