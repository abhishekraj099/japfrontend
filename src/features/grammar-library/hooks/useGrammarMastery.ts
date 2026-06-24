import { useQuery } from "@tanstack/react-query";
import { grammarMasteryService } from "@/services/grammarMastery.service";
import { QUERY_KEYS } from "@/constants/queryKeys";

export function useGrammarMastery() {
  return useQuery({
    queryKey: QUERY_KEYS.GRAMMAR_MASTERY,
    queryFn: grammarMasteryService.get,
    staleTime: 60_000,
  });
}
