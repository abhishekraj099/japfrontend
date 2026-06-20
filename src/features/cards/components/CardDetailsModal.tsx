import { useEffect } from "react";
import { CardTypeBadge } from "./CardTypeBadge";
import type { Card } from "@/types/card.types";

interface Props {
  card: Card;
  onClose: () => void;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">
        {label}
      </p>
      {children}
    </div>
  );
}

/**
 * Read-only details view for a card. Opens without entering edit mode, so a
 * user can inspect a grammar card's pattern, explanation, notes and examples
 * without any risk of mutating it.
 */
export function CardDetailsModal({ card, onClose }: Props) {
  const isGrammar = card.cardType === "grammar";
  const isSentence = card.cardType === "sentence";
  const frontLabel = isSentence ? "Sentence" : isGrammar ? "Pattern" : "Question";
  const backLabel = isSentence ? "Translation" : isGrammar ? "Explanation" : "Answer";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-6 py-4 border-b border-slate-100 sticky top-0 bg-white">
          <div className="flex items-center gap-2">
            <CardTypeBadge cardType={card.cardType} />
            {card.jlptLevel && (
              <span className="text-xs font-semibold bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">
                {card.jlptLevel}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 text-xl leading-none px-2 cursor-pointer"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          <Field label={frontLabel}>
            <p className="text-lg font-semibold text-slate-900 leading-snug">
              {card.question}
            </p>
            {card.reading && (
              <p className="text-sm text-slate-400 mt-0.5">{card.reading}</p>
            )}
          </Field>

          <Field label={backLabel}>
            <p className="text-slate-700 leading-snug whitespace-pre-line">
              {card.answer}
            </p>
          </Field>

          {card.grammarNotes && (
            <Field label="Grammar notes">
              <p className="text-sm text-slate-600 leading-snug whitespace-pre-line">
                {card.grammarNotes}
              </p>
            </Field>
          )}

          {card.examples.length > 0 && (
            <Field label={card.examples.length === 1 ? "Example" : "Examples"}>
              <ul className="space-y-1">
                {card.examples.map((ex, i) => (
                  <li key={i} className="text-sm text-slate-600 leading-snug">
                    {ex.replace("—", "→")}
                  </li>
                ))}
              </ul>
            </Field>
          )}

          {card.contextSentence && (
            <Field label={isGrammar ? "In context" : "Example"}>
              <p className="text-sm text-slate-600 italic leading-snug">
                {card.contextSentence}
              </p>
            </Field>
          )}

          {card.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {card.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
