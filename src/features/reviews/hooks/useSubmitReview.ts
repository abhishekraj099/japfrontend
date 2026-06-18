import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewService } from "@/services/review.service";
import { QUERY_KEYS } from "@/constants/queryKeys";
import type { SubmitReviewInput } from "@/types/review.types";

export function useSubmitReview() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: SubmitReviewInput) => reviewService.submitReview(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.DUE_CARDS });
    },
  });
}
