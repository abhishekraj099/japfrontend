import { api } from "@/lib/axios";
import type { GrammarMastery } from "@/types/grammarMastery.types";

export const grammarMasteryService = {
  get: async (): Promise<GrammarMastery> => (await api.get<GrammarMastery>("/grammar/mastery")).data,
};
