import { api } from "@/lib/axios";
import type { DueCard, ReviewLog, SubmitReviewInput } from "@/types/review.types";

export const reviewService = {
  getDueCards: (limit = 20) =>
    api.get<DueCard[]>("/reviews/due", { params: { limit } }).then((r) => r.data),

  submitReview: (data: SubmitReviewInput) =>
    api.post<ReviewLog>("/reviews/submit", data).then((r) => r.data),
};
