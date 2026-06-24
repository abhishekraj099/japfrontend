import { useQuery } from "@tanstack/react-query";
import { plannerService } from "@/services/planner.service";
import { QUERY_KEYS } from "@/constants/queryKeys";

export function useTodayPlan() {
  return useQuery({ queryKey: QUERY_KEYS.PLANNER, queryFn: plannerService.getToday, staleTime: 30_000 });
}
