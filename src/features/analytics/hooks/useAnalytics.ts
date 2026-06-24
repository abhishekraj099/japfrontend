import { useQuery } from "@tanstack/react-query";
import { analyticsService } from "@/services/analytics.service";
import { QUERY_KEYS } from "@/constants/queryKeys";

export function useAnalytics() {
  return useQuery({
    queryKey: QUERY_KEYS.ANALYTICS,
    queryFn: analyticsService.getDashboard,
    staleTime: 60_000, // metrics change slowly; avoid refetch storms
  });
}
