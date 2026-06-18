import { useEffect, useCallback } from "react";
import { RatingButtons } from "./RatingButtons";
import type { DueCard } from "@/types/review.types";

interface Props {
  card: DueCard;
  revealed: boolean;
  submitting: boolean;
  onReveal: () => void;
  onRate: (rating: number) => void;
}

export function ReviewCard({ card, revealed, submitting, onReveal, onRate }: Props) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (!revealed) {
        if (e.code === "Space") { e.preventDefault(); onReveal(); }
        return;
      }

      if (e.key === "1") onRate(1);
      else if (e.key === "2") onRate(2);
      else if (e.key === "3") onRate(3);
      else if (e.key === "4") onRate(4);
    },
    [revealed, onReveal, onRate]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="space-y-6">
      {/* Card face */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {/* Question */}
        <div className="px-8 py-10 text-center border-b border-slate-100">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
            Question
          </p>
          <p className="text-3xl font-bold text-slate-900 leading-snug break-words">
            {card.question}
          </p>
          {card.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-1.5 mt-4">
              {card.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-slate-100 text-slate-400 px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Answer — hidden until revealed */}
        <div
          className={`px-8 py-8 text-center transition-all duration-300 ${
            revealed ? "opacity-100" : "opacity-0 pointer-events-none h-0 py-0"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
            Answer
          </p>
          <p className="text-2xl font-semibold text-slate-700 leading-snug break-words">
            {card.answer}
          </p>
        </div>
      </div>

      {/* Action area */}
      {!revealed ? (
        <button
          onClick={onReveal}
          className="w-full py-4 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-700 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
        >
          Show Answer
          <span className="ml-2 text-sm text-slate-400 font-normal">[Space]</span>
        </button>
      ) : (
        <RatingButtons onRate={onRate} disabled={submitting} />
      )}

      {/* Keyboard hint */}
      {!revealed && (
        <p className="text-center text-xs text-slate-300">
          Press <kbd className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded text-xs">Space</kbd> to reveal
        </p>
      )}
    </div>
  );
}
