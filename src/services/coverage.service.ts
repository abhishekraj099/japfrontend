import { api } from "@/lib/axios";
import type { CoverageResult } from "@/types/coverage.types";

export const coverageService = {
  getCoverage: async (): Promise<CoverageResult> => {
    const { data } = await api.get<CoverageResult>("/coverage");
    return data;
  },
};
