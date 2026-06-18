import { api } from "@/lib/axios";
import type { DictionaryResult } from "@/types/dictionary.types";

export const dictionaryService = {
  search: (q: string) =>
    api
      .get<DictionaryResult[]>("/dictionary/search", { params: { q } })
      .then((r) => r.data),
};
