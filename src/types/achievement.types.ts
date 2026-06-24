export type AchievementCategory = "Review" | "Vocabulary" | "Grammar" | "Streak" | "Coverage" | "Mastery";

export interface Achievement {
  id: string;
  category: AchievementCategory;
  title: string;
  description: string;
  unlocked: boolean;
  progress: number;
  target: number;
}

export interface AchievementsResponse {
  achievements: Achievement[];
  unlockedCount: number;
  total: number;
}
