import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDueCards } from "@/features/reviews/hooks/useDueCards";
import { useSubmitReview } from "@/features/reviews/hooks/useSubmitReview";
import { ReviewCard } from "@/features/reviews/components/ReviewCard";
import { ReviewProgress } from "@/features/reviews/components/ReviewProgress";
import { ROUTES } from "@/constants/routes";

type SessionState = "loading" | "error" | "empty" | "reviewing" | "complete";

export function ReviewPage() {
  const navigate = useNavigate();
  const { data: dueCards, isLoading, isError, refetch } = useDueCards();
  const { mutate: submitReview, isPending: submitting } = useSubmitReview();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [reviewed, setReviewed] = useState(0);

  // Track time spent on current card
  const cardStartTime = useRef<number>(Date.now());

  // Reset timer when card changes
  useEffect(() => {
    cardStartTime.current = Date.now();
    setRevealed(false);
  }, [currentIndex]);

  const handleReveal = useCallback(() => {
    setRevealed(true);
  }, []);

  const handleRate = useCallback(
    (rating: number) => {
      if (!dueCards) return;
      const card = dueCards[currentIndex];
      const duration = Date.now() - cardStartTime.current;

      submitReview(
        { cardId: card.id, rating, duration },
        {
          onSuccess: () => {
            setReviewed((n) => n + 1);
            const isLast = currentIndex >= dueCards.length - 1;
            if (isLast) {
              setCurrentIndex(dueCards.length); // triggers complete
            } else {
              setCurrentIndex((i) => i + 1);
            }
          },
        }
      );
    },
    [dueCards, currentIndex, submitReview]
  );

  // Derive session state
  const sessionState: SessionState = (() => {
    if (isLoading) return "loading";
    if (isError) return "error";
    if (!dueCards || dueCards.length === 0) return "empty";
    if (currentIndex >= dueCards.length) return "complete";
    return "reviewing";
  })();

  // ─── Loading ────────────────────────────────────────────────────────────────
  if (sessionState === "loading") {
    return (
      <div className="max-w-xl mx-auto mt-20 space-y-6 animate-pulse">
        <div className="h-4 bg-slate-100 rounded w-full" />
        <div className="bg-white border border-slate-200 rounded-2xl h-64" />
        <div className="h-12 bg-slate-100 rounded-xl" />
      </div>
    );
  }

  // ─── Error ──────────────────────────────────────────────────────────────────
  if (sessionState === "error") {
    return (
      <div className="max-w-xl mx-auto mt-20 text-center space-y-4">
        <div className="text-4xl">⚠️</div>
        <h2 className="text-xl font-semibold text-slate-800">Failed to load cards</h2>
        <p className="text-slate-500 text-sm">Check your connection and try again.</p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => refetch()}
            className="px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition cursor-pointer"
          >
            Try Again
          </button>
          <button
            onClick={() => navigate(ROUTES.DASHBOARD)}
            className="px-5 py-2.5 border border-slate-300 text-sm rounded-lg hover:bg-slate-50 transition cursor-pointer"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // ─── Empty ──────────────────────────────────────────────────────────────────
  if (sessionState === "empty") {
    return (
      <div className="max-w-xl mx-auto mt-20 text-center space-y-4">
        <div className="text-5xl">✅</div>
        <h2 className="text-2xl font-bold text-slate-800">You're all caught up!</h2>
        <p className="text-slate-500 text-sm">
          No cards are due for review right now. Come back later!
        </p>
        <button
          onClick={() => navigate(ROUTES.DASHBOARD)}
          className="mt-2 px-6 py-3 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition cursor-pointer"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  // ─── Complete ───────────────────────────────────────────────────────────────
  if (sessionState === "complete") {
    return (
      <div className="max-w-xl mx-auto mt-20 text-center space-y-5">
        <div className="text-5xl">🎉</div>
        <h2 className="text-2xl font-bold text-slate-800">Session Complete!</h2>
        <p className="text-slate-500 text-sm">
          You reviewed{" "}
          <span className="font-semibold text-slate-700">{reviewed}</span>{" "}
          {reviewed === 1 ? "card" : "cards"} in this session.
        </p>
        <div className="bg-white border border-slate-200 rounded-xl p-5 text-left">
          <p className="text-xs text-slate-400 uppercase font-semibold tracking-wide mb-3">
            Session Summary
          </p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Cards reviewed</span>
            <span className="font-semibold text-slate-900">{reviewed}</span>
          </div>
        </div>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => {
              setCurrentIndex(0);
              setReviewed(0);
              refetch();
            }}
            className="px-5 py-2.5 border border-slate-300 text-sm rounded-lg hover:bg-slate-50 transition cursor-pointer"
          >
            Review Again
          </button>
          <button
            onClick={() => navigate(ROUTES.DASHBOARD)}
            className="px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition cursor-pointer"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // ─── Reviewing ──────────────────────────────────────────────────────────────
  const card = dueCards![currentIndex];

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(ROUTES.DASHBOARD)}
          className="text-sm text-slate-400 hover:text-slate-700 transition cursor-pointer"
        >
          ← Exit
        </button>
        <span className="text-xs text-slate-400">
          {submitting ? "Saving…" : "Review Session"}
        </span>
      </div>

      {/* Progress */}
      <ReviewProgress current={currentIndex + 1} total={dueCards!.length} />

      {/* Card */}
      <ReviewCard
        card={card}
        revealed={revealed}
        submitting={submitting}
        onReveal={handleReveal}
        onRate={handleRate}
      />

      {/* Keyboard legend */}
      {revealed && (
        <p className="text-center text-xs text-slate-300">
          Keyboard:{" "}
          <kbd className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded text-xs">1</kbd> Again &nbsp;
          <kbd className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded text-xs">2</kbd> Hard &nbsp;
          <kbd className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded text-xs">3</kbd> Good &nbsp;
          <kbd className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded text-xs">4</kbd> Easy
        </p>
      )}
    </div>
  );
}
