import { useQuery } from "@tanstack/react-query";
import { grammarService } from "@/services/grammar.service";
import { QUERY_KEYS } from "@/constants/queryKeys";

export function useGrammarLibrary() {
  return useQuery({
    queryKey: QUERY_KEYS.GRAMMAR_LIBRARY,
    queryFn: grammarService.getLibrary,
    staleTime: 30_000,
  });
}
