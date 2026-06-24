import { api } from "@/lib/axios";
import type { MissionsResponse } from "@/types/mission.types";

export const missionService = {
  getToday: async (): Promise<MissionsResponse> => (await api.get<MissionsResponse>("/missions/today")).data,
};
