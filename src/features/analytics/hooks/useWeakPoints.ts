import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { QUERY_KEYS } from "@/constants/queryKeys";
import type { WeakPoints } from "@/types/weakpoint.types";

export function useWeakPoints() {
  return useQuery({
    queryKey: QUERY_KEYS.WEAK_POINTS,
    queryFn: async (): Promise<WeakPoints> => (await api.get<WeakPoints>("/analytics/weak-points")).data,
    staleTime: 60_000,
  });
}
