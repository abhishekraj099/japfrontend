import { useQuery } from "@tanstack/react-query";
import { missionService } from "@/services/mission.service";
import { QUERY_KEYS } from "@/constants/queryKeys";

export function useMissions() {
  return useQuery({
    queryKey: QUERY_KEYS.MISSIONS,
    queryFn: missionService.getToday,
    staleTime: 60_000,
  });
}
