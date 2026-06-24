import { api } from "@/lib/axios";
import type { GrammarLibraryItem } from "@/types/grammar.types";

export const grammarService = {
  getLibrary: async (): Promise<GrammarLibraryItem[]> => {
    const { data } = await api.get<{ items: GrammarLibraryItem[] }>("/cards/grammar/library");
    return data.items;
  },
};
