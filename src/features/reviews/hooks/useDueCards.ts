import { useQuery } from "@tanstack/react-query";
import { reviewService } from "@/services/review.service";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { DEFAULT_REVIEW_LIMIT } from "@/constants/app";

export function useDueCards() {
  return useQuery({
    queryKey: QUERY_KEYS.DUE_CARDS,
    queryFn: () => reviewService.getDueCards(DEFAULT_REVIEW_LIMIT),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
}
