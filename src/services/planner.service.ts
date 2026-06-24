import { api } from "@/lib/axios";
import type { TodayPlan } from "@/types/planner.types";

export const plannerService = {
  getToday: async (): Promise<TodayPlan> => (await api.get<TodayPlan>("/planner/today")).data,
};
