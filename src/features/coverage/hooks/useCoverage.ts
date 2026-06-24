import { useQuery } from "@tanstack/react-query";
import { coverageService } from "@/services/coverage.service";
import { QUERY_KEYS } from "@/constants/queryKeys";

export function useCoverage() {
  return useQuery({
    queryKey: QUERY_KEYS.COVERAGE,
    queryFn: coverageService.getCoverage,
    staleTime: 60_000,
  });
}
