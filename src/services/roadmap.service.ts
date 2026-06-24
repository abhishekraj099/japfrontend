import { api } from "@/lib/axios";
import type { Roadmap } from "@/types/roadmap.types";

export const roadmapService = {
  get: async (): Promise<Roadmap> => (await api.get<Roadmap>("/roadmap")).data,
};
