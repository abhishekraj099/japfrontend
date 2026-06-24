import { useQuery } from "@tanstack/react-query";
import { reviewService, type FocusParams } from "@/services/review.service";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { DEFAULT_REVIEW_LIMIT } from "@/constants/app";

export function useDueCards(opts: { enabled?: boolean } = {}) {
  return useQuery({
    queryKey: QUERY_KEYS.DUE_CARDS,
    queryFn: () => reviewService.getDueCards(DEFAULT_REVIEW_LIMIT),
    staleTime: 0,
    refetchOnWindowFocus: false,
    enabled: opts.enabled ?? true,
  });
}

/** Focus Review Sessions (Phase 40) — weakness-targeted cards. Same DueCard
 *  shape as useDueCards, so the review flow is identical. */
export function useFocusCards(params: FocusParams, enabled: boolean) {
  return useQuery({
    queryKey: [...QUERY_KEYS.FOCUS_CARDS, params.type, params.jlpt ?? "", params.band ?? ""],
    queryFn: () => reviewService.getFocusCards(params),
    staleTime: 0,
    refetchOnWindowFocus: false,
    enabled,
  });
}
