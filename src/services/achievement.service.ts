import { api } from "@/lib/axios";
import type { AchievementsResponse } from "@/types/achievement.types";

export const achievementService = {
  getAll: async (): Promise<AchievementsResponse> => (await api.get<AchievementsResponse>("/achievements")).data,
};
