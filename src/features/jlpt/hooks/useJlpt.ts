import { useQuery } from "@tanstack/react-query";
import { jlptService } from "@/services/jlpt.service";
import { QUERY_KEYS } from "@/constants/queryKeys";

export function useJlpt() {
  return useQuery({ queryKey: QUERY_KEYS.JLPT, queryFn: jlptService.get, staleTime: 60_000 });
}
