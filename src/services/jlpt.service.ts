import { api } from "@/lib/axios";
import type { JlptOverview } from "@/types/jlpt.types";

export const jlptService = {
  get: async (): Promise<JlptOverview> => (await api.get<JlptOverview>("/jlpt")).data,
};
