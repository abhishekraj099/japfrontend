import { api } from "@/lib/axios";
import type { DueCard, ReviewLog, SubmitReviewInput } from "@/types/review.types";

export interface FocusParams {
  type: string;
  jlpt?: string;
  band?: string;
  limit?: number;
}

export const reviewService = {
  getDueCards: (limit = 20) =>
    api.get<DueCard[]>("/reviews/due", { params: { limit } }).then((r) => r.data),

  getFocusCards: (params: FocusParams) =>
    api.get<DueCard[]>("/reviews/focus", { params }).then((r) => r.data),

  submitReview: (data: SubmitReviewInput) =>
    api.post<ReviewLog>("/reviews/submit", data).then((r) => r.data),
};
