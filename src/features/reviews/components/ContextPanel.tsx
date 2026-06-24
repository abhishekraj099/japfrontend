import { useMemo } from "react";
import { AudioButton } from "@/components/common/AudioButton";
import { computeSentenceContext } from "../lib/sentenceContext";
import type { DueCard } from "@/types/review.types";

const BAND_ACCENT: Record<string, string> = {
  Easy: "bg-emerald-50 text-emerald-600",
  Intermediate: "bg-amber-50 text-amber-600",
  Challenging: "bg-orange-50 text-orange-600",
  Advanced: "bg-sakura-50 text-sakura-600",
};

/** Resolve the immersion sentence + translation + reading from the card. */
function sentenceOf(card: DueCard) {
  if (card.exampleSentence) {
    return { sentence: card.exampleSentence, translation: card.exampleTranslation, reading: card.exampleReading };
  }
  if (card.cardType === "sentence") {
    return { sentence: card.question, translation: card.answer, reading: card.reading };
  }
  return null;
}

/**
 * Rich review Context Panel (Phase 48). Connects the card back to its original
 * immersion sentence + a lightweight local difficulty / grammar read. Computed
 * lazily (only mounted when the answer is revealed) and memoized.
 */
export function ContextPanel({ card }: { card: DueCard }) {
  const src = sentenceOf(card);
  const ctx = useMemo(() => (src ? computeSentenceContext(src.sentence) : null), [src?.sentence]);
  if (!src || !ctx) return null;

  return (
    <div className="mx-auto mt-6 max-w-md rounded-xl border border-line bg-paper/40 p-4 text-left">
      <p className="section-label mb-1">From your immersion</p>
      <p className="font-jp text-base leading-snug text-ink-800">
        {src.sentence}
        <AudioButton text={src.sentence} className="ml-1.5 align-middle text-sm" />
      </p>
      {src.reading && <p className="font-jp mt-1 text-xs text-ink-400">{src.reading}</p>}
      {src.translation && <p className="mt-1 text-sm text-ink-500">{src.translation}</p>}

      <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[11px]">
        <span className={`rounded-full px-2 py-0.5 font-semibold ${BAND_ACCENT[ctx.band]}`}>
          Difficulty {ctx.difficulty} · {ctx.band}
        </span>
        <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-indigo-500">{ctx.charCount} chars · {ctx.kanjiCount} kanji</span>
        {ctx.grammar.length > 0 && (
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-600">{ctx.grammar.length} grammar</span>
        )}
      </div>

      {ctx.grammar.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {ctx.grammar.map((g) => (
            <span key={g.name} className="rounded-full bg-white px-2 py-0.5 text-[11px] text-ink-600 ring-1 ring-line">
              <span className="font-jp">{g.name}</span> <span className="text-[9px] text-ink-400">{g.jlptLevel}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
