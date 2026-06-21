import { useEffect, useCallback } from "react";
import { RatingButtons } from "./RatingButtons";
import { CardTypeBadge } from "@/features/cards/components/CardTypeBadge";
import { AudioButton } from "@/components/common/AudioButton";
import { PitchAccent } from "@/components/common/PitchAccent";
import type { DueCard } from "@/types/review.types";

interface Props {
  card: DueCard;
  revealed: boolean;
  submitting: boolean;
  onReveal: () => void;
  onRate: (rating: number) => void;
}

export function ReviewCard({ card, revealed, submitting, onReveal, onRate }: Props) {
  const isGrammar = card.cardType === "grammar";
  const isSentence = card.cardType === "sentence";
  const frontLabel = isSentence ? "Sentence" : isGrammar ? "Pattern" : "Question";
  const backLabel = isSentence ? "Translation" : isGrammar ? "Meaning" : "Answer";
  const showExamples = (isGrammar || isSentence) && card.examples.length > 0;
  // Combined card (Phase 18C): a vocab card carrying an example sentence.
  const isCombined = !isGrammar && !isSentence && !!card.exampleSentence;
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
        {/* Question */}
        <div className="border-b border-line px-8 py-12 text-center">
          <div className="mb-5 flex items-center justify-center gap-2">
            <CardTypeBadge cardType={card.cardType} />
            <span className="section-label">{frontLabel}</span>
          </div>
          <p className="font-jp text-4xl leading-snug text-ink-900 break-words">
            {card.question}
            <AudioButton text={card.question} className="ml-2 align-middle text-2xl" />
          </p>
          {!isGrammar && !isSentence && card.reading && (
            <p className="font-jp mt-3 text-lg text-ink-500">{card.reading}</p>
          )}
          {!isGrammar && !isSentence && (
            <div className="mt-1 flex items-center justify-center gap-2">
              <PitchAccent reading={card.reading} pitchAccent={card.pitchAccent} />
              {card.pitchAccent && (
                <span className="text-sm font-semibold text-sakura-500">[{card.pitchAccent}]</span>
              )}
            </div>
          )}
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
          <p className="section-label mb-4 text-sakura-500">{backLabel}</p>
          <p className="font-jp text-3xl leading-snug text-indigo-500 break-words">
            {card.answer}
          </p>

          {isSentence && card.reading && (
            <p className="font-jp mt-2 text-sm text-ink-500">{card.reading}</p>
          )}

          {isCombined && (
            <div className="mx-auto mt-5 max-w-sm space-y-1 text-left">
              {card.reading && (
                <p className="font-jp text-sm text-ink-500">{card.reading}</p>
              )}
              <p className="section-label mt-3">Example</p>
              <p className="font-jp text-sm leading-snug text-ink-700">
                {card.exampleSentence}
                <AudioButton text={card.exampleSentence} className="ml-1.5 align-middle text-xs" />
              </p>
              {card.exampleReading && (
                <p className="font-jp text-xs text-ink-400">{card.exampleReading}</p>
              )}
              {card.exampleTranslation && (
                <p className="text-sm text-ink-500">{card.exampleTranslation}</p>
              )}
            </div>
          )}

          {showExamples && (
            <ul className="mx-auto mt-5 max-w-sm space-y-1 text-left">
              {card.examples.map((ex, i) => (
                <li key={i} className="text-sm leading-snug text-ink-500">
                  {ex.replace("—", "→")}
                </li>
              ))}
            </ul>
          )}

          {card.jlptLevel && (
            <div className="mt-5">
              <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-500">
                JLPT {card.jlptLevel}
              </span>
            </div>
          )}
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
