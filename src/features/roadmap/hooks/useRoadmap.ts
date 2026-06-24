import { useQuery } from "@tanstack/react-query";
import { roadmapService } from "@/services/roadmap.service";
import { QUERY_KEYS } from "@/constants/queryKeys";

export function useRoadmap() {
  return useQuery({
    queryKey: QUERY_KEYS.ROADMAP,
    queryFn: roadmapService.get,
    staleTime: 60_000,
  });
}
