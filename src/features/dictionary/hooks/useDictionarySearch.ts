import { useQuery } from "@tanstack/react-query";
import { dictionaryService } from "@/services/dictionary.service";
import { QUERY_KEYS } from "@/constants/queryKeys";

export function useDictionarySearch(query: string) {
  return useQuery({
    queryKey: QUERY_KEYS.DICTIONARY(query),
    queryFn: () => dictionaryService.search(query),
    enabled: query.trim().length > 0,
    staleTime: 1000 * 60 * 5,
  });
}
