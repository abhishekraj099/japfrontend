import { api } from "@/lib/axios";
import type { AnalyticsDashboard } from "@/types/analytics.types";

export const analyticsService = {
  getDashboard: async (): Promise<AnalyticsDashboard> => {
    const { data } = await api.get<AnalyticsDashboard>("/analytics");
    return data;
  },
};
