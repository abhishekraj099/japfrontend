import { useQuery } from "@tanstack/react-query";
import { achievementService } from "@/services/achievement.service";
import { QUERY_KEYS } from "@/constants/queryKeys";

export function useAchievements() {
  return useQuery({
    queryKey: QUERY_KEYS.ACHIEVEMENTS,
    queryFn: achievementService.getAll,
    staleTime: 60_000,
  });
}
