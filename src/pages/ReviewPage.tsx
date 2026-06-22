import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDueCards } from "@/features/reviews/hooks/useDueCards";
import { useSubmitReview } from "@/features/reviews/hooks/useSubmitReview";
import { ReviewCard } from "@/features/reviews/components/ReviewCard";
import { ReviewProgress } from "@/features/reviews/components/ReviewProgress";
import { ROUTES } from "@/constants/routes";
import { MemoryArt } from "@/components/common/FeatureArt";
import { Confetti } from "@/components/common/Confetti";
import { BouncyMascot } from "@/components/common/BouncyMascot";

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
        <div className="h-4 bg-line rounded-full w-full" />
        <div className="paper-card h-64" />
        <div className="h-12 bg-line rounded-xl" />
      </div>
    );
  }

  // ─── Error ──────────────────────────────────────────────────────────────────
  if (sessionState === "error") {
    return (
      <div className="max-w-xl mx-auto mt-20 text-center space-y-4">
        <div className="text-4xl">⚠️</div>
        <h2 className="font-display text-2xl text-ink-900">Failed to load cards</h2>
        <p className="text-ink-500 text-sm">Check your connection and try again.</p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => refetch()}
            className="px-5 py-2.5 bg-indigo-500 text-paper text-sm font-semibold rounded-xl hover:bg-indigo-600 transition cursor-pointer"
          >
            Try Again
          </button>
          <button
            onClick={() => navigate(ROUTES.DASHBOARD)}
            className="px-5 py-2.5 border border-line text-sm rounded-xl text-ink-700 hover:bg-paper transition cursor-pointer"
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
      <div className="max-w-xl mx-auto mt-16 text-center space-y-4">
        <BouncyMascot className="mx-auto" size="h-28 w-28" />
        <h2 className="font-display text-3xl text-ink-900">You're all caught up!</h2>
        <p className="text-ink-500 text-sm">
          No cards are due for review right now. Come back later!
        </p>
        <button
          onClick={() => navigate(ROUTES.DASHBOARD)}
          className="mt-2 px-6 py-3 bg-indigo-500 text-paper text-sm font-semibold rounded-xl hover:bg-indigo-600 transition cursor-pointer"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  // ─── Complete ───────────────────────────────────────────────────────────────
  if (sessionState === "complete") {
    return (
      <div className="relative max-w-xl mx-auto mt-16 text-center space-y-5">
        <div className="relative mx-auto h-32 w-40">
          <Confetti count={32} />
          <MemoryArt className="h-32 w-40" />
        </div>
        <h2 className="font-display text-3xl text-ink-900">Session complete!</h2>
        <p className="text-ink-500 text-sm">
          You reviewed{" "}
          <span className="font-semibold text-ink-900">{reviewed}</span>{" "}
          {reviewed === 1 ? "card" : "cards"} in this session.
        </p>
        <div className="paper-card p-5 text-left">
          <p className="section-label mb-3">Session Summary</p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-ink-500">Cards reviewed</span>
            <span className="font-semibold text-ink-900">{reviewed}</span>
          </div>
        </div>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => {
              setCurrentIndex(0);
              setReviewed(0);
              refetch();
            }}
            className="px-5 py-2.5 border border-line text-sm rounded-xl text-ink-700 hover:bg-paper transition cursor-pointer"
          >
            Review Again
          </button>
          <button
            onClick={() => navigate(ROUTES.DASHBOARD)}
            className="px-5 py-2.5 bg-indigo-500 text-paper text-sm font-semibold rounded-xl hover:bg-indigo-600 transition cursor-pointer"
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
    <div className="relative mx-auto max-w-xl space-y-6">
      {/* anime backdrop behind the card */}
      <div className="sunburst spin-slow pointer-events-none absolute left-1/2 top-24 -z-0 h-[560px] w-[560px] -translate-x-1/2 opacity-[0.06]" style={{ maskImage: "radial-gradient(circle, black 0%, transparent 62%)", WebkitMaskImage: "radial-gradient(circle, black 0%, transparent 62%)" }} />

      {/* Header */}
      <div className="relative flex items-center justify-between">
        <button
          onClick={() => navigate(ROUTES.DASHBOARD)}
          className="flex items-center gap-1.5 text-sm font-semibold text-ink-400 transition hover:text-ink-900 cursor-pointer"
        >
          ← Exit
        </button>
        <span className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-ink-400 ring-1 ring-white/10">
          <span className="font-jp text-sakura-500">復習</span>
          {submitting ? "Saving…" : "Review Session"}
        </span>
      </div>

      {/* Progress */}
      <div className="relative">
        <ReviewProgress current={currentIndex + 1} total={dueCards!.length} />
      </div>

      {/* Card */}
      <div className="relative">
        <ReviewCard
          card={card}
          revealed={revealed}
          submitting={submitting}
          onReveal={handleReveal}
          onRate={handleRate}
        />
      </div>

      {/* Keyboard legend */}
      {revealed && (
        <p className="text-center text-xs text-ink-400">
          Keyboard:{" "}
          <kbd className="bg-paper text-ink-500 px-1.5 py-0.5 rounded text-xs">1</kbd> Again &nbsp;
          <kbd className="bg-paper text-ink-500 px-1.5 py-0.5 rounded text-xs">2</kbd> Hard &nbsp;
          <kbd className="bg-paper text-ink-500 px-1.5 py-0.5 rounded text-xs">3</kbd> Good &nbsp;
          <kbd className="bg-paper text-ink-500 px-1.5 py-0.5 rounded text-xs">4</kbd> Easy
        </p>
      )}
    </div>
  );
}
