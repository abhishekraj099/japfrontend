import { useEffect, useCallback, useMemo } from "react";
import { RatingButtons } from "./RatingButtons";
import { CardTypeBadge } from "@/features/cards/components/CardTypeBadge";
import { templateRegistry } from "@/features/templates/registry";
import { TemplateRenderer } from "@/features/templates/TemplateRenderer";
import type { DueCard } from "@/types/review.types";

interface Props {
  card: DueCard;
  revealed: boolean;
  submitting: boolean;
  onReveal: () => void;
  onHide: () => void;
  onRate: (rating: number) => void;
}

export function ReviewCard({ card, revealed, submitting, onReveal, onHide, onRate }: Props) {
  // Resolve + memoize the template (Phase 33). Re-resolves only when the card's
  // identity/type/combined-ness changes — never per render.
  const template = useMemo(
    () => templateRegistry.resolve(card),
    [card.cardType, !!card.exampleSentence, card.id]
  );
  const frontLabel = template.frontLabel;
  const backLabel = template.backLabel;
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
      <div className="paper-card overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-[#7c5cff] to-sakura-500" />
        {/* Question */}
        <div className="relative border-b border-line px-8 py-12 text-center">
          <div className="mb-5 flex items-center justify-center gap-2">
            <CardTypeBadge cardType={card.cardType} />
            <span className="section-label">{frontLabel}</span>
          </div>
          <TemplateRenderer template={template} card={card} face="front" />
          {card.tags.length > 0 && (
            <div className="mt-5 flex flex-wrap justify-center gap-1.5">
              {card.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs text-indigo-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Answer — hidden until revealed */}
        <div
          className={`px-8 py-9 text-center transition-all duration-300 ${
            revealed ? "opacity-100" : "pointer-events-none h-0 py-0 opacity-0"
          }`}
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <p className="section-label text-sakura-500">{backLabel}</p>
            <button
              onClick={onHide}
              className="rounded-full bg-white/[0.08] px-3 py-1 text-[11px] font-bold text-ink-400 ring-1 ring-white/10 transition hover:text-ink-900"
            >
              ↑ Hide
            </button>
          </div>
          <TemplateRenderer template={template} card={card} face="back" />
        </div>
      </div>

      {/* Action area */}
      {!revealed ? (
        <button
          onClick={onReveal}
          className="w-full rounded-2xl bg-indigo-500 py-4 font-semibold text-paper transition hover:bg-indigo-600 active:scale-[0.99] cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-200"
        >
          Show Answer
          <span className="ml-2 text-sm font-normal text-indigo-100">[Space]</span>
        </button>
      ) : (
        <RatingButtons onRate={onRate} disabled={submitting} />
      )}

      {/* Keyboard hint */}
      {!revealed && (
        <p className="text-center text-xs text-ink-400">
          Press <kbd className="rounded bg-paper px-1.5 py-0.5 text-xs text-ink-500">Space</kbd> to reveal
        </p>
      )}
    </div>
  );
}
