export interface PlanPriority { key: string; label: string; count: number; route: string; minutes: number; }
export interface PlanSession { reviewTarget: number; grammarTarget: number; minutes: number; }
export interface QuickStart { label: string; route: string; count: number; }

export interface TodayPlan {
  dailyScore: number;
  scoreBreakdown: { dueCompletion: number; retention: number; streak: number; coverage: number };
  priorities: PlanPriority[];
  recommended: { text: string; route: string };
  estimates: { dueReviews: { count: number; minutes: number }; leeches: { count: number; minutes: number }; total: { minutes: number } };
  sessions: { quick: PlanSession; standard: PlanSession; deep: PlanSession };
  quickStart: QuickStart[];
}
