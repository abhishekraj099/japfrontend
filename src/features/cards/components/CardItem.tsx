import { useState } from "react";
import { useDeleteCard } from "../hooks/useCards";
import { EditCardForm } from "./EditCardForm";
import { CardTypeBadge } from "./CardTypeBadge";
import { CardDetailsModal } from "./CardDetailsModal";
import type { Card } from "@/types/card.types";

interface Props {
  card: Card;
  deckId: string;
}

export function CardItem({ card, deckId }: Props) {
  const [editing, setEditing] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { mutate: deleteCard, isPending: deleting } = useDeleteCard(deckId);
  const isGrammar = card.cardType === "grammar";
  const isSentence = card.cardType === "sentence";
  const frontLabel = isSentence ? "Sentence" : isGrammar ? "Pattern" : "Question";
  const backLabel = isSentence ? "Translation" : isGrammar ? "Explanation" : "Answer";

  if (editing) {
    return (
      <div className="paper-card p-5">
        <p className="text-sm font-semibold text-ink-700 mb-4">Edit Card</p>
        <EditCardForm card={card} deckId={deckId} onClose={() => setEditing(false)} />
      </div>
    );
  }

  return (
    <div className="paper-card overflow-hidden tap">
      {/* Question row — always visible */}
      <button
        className="w-full text-left px-5 py-4 flex items-start justify-between gap-4 cursor-pointer"
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="flex-1">
          <p className="text-xs font-medium text-ink-400 uppercase tracking-wide mb-1">
            {frontLabel}
          </p>
          <p className="text-ink-900 font-medium leading-snug">{card.question}</p>
          {card.reading && (
            <p className="text-sm text-ink-400 mt-0.5">{card.reading}</p>
          )}
          {!isGrammar && !isSentence && card.pitchAccent && (
            <p className="text-sm font-semibold text-sakura-500 mt-0.5">
              [{card.pitchAccent}]
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <CardTypeBadge cardType={card.cardType} />
          {card.jlptLevel && (
            <span className="text-xs font-semibold bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">
              {card.jlptLevel}
            </span>
          )}
          <span className="text-ink-400 text-lg mt-0.5">
            {expanded ? "▲" : "▼"}
          </span>
        </div>
      </button>

      {/* Answer — revealed on expand */}
      {expanded && (
        <div className="px-5 pb-4 border-t border-line">
          <p className="text-xs font-medium text-ink-400 uppercase tracking-wide mt-3 mb-1">
            {backLabel}
          </p>
          <p className="text-ink-700 leading-snug">{card.answer}</p>

          {card.grammarNotes && (
            <div className="mt-3">
              <p className="text-xs font-medium text-ink-400 uppercase tracking-wide mb-1">
                {isGrammar ? "Grammar notes" : "Grammar"}
              </p>
              <p className="text-sm text-ink-500 leading-snug">
                {card.grammarNotes}
              </p>
            </div>
          )}

          {card.examples.length > 0 && (
            <div className="mt-3">
              <p className="text-xs font-medium text-ink-400 uppercase tracking-wide mb-1">
                {card.examples.length === 1 ? "Example" : "Examples"}
              </p>
              <ul className="space-y-0.5">
                {card.examples.map((ex, i) => (
                  <li key={i} className="text-sm text-ink-500 leading-snug">
                    {ex.replace("—", "→")}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {card.contextSentence && (
            <div className="mt-3">
              <p className="text-xs font-medium text-ink-400 uppercase tracking-wide mb-1">
                {isGrammar ? "In context" : "Example"}
              </p>
              <p className="text-sm text-ink-500 italic leading-snug">
                {card.contextSentence}
              </p>
            </div>
          )}

          {/* Combined-card example preview (Phase 18C). */}
          {card.exampleSentence && (
            <div className="mt-3">
              <p className="text-xs font-medium text-ink-400 uppercase tracking-wide mb-1">
                Example
              </p>
              <p className="text-sm text-ink-700 leading-snug">{card.exampleSentence}</p>
              {card.exampleReading && (
                <p className="text-xs text-ink-400 leading-snug">{card.exampleReading}</p>
              )}
              {card.exampleTranslation && (
                <p className="text-sm text-ink-500 leading-snug">{card.exampleTranslation}</p>
              )}
            </div>
          )}

          {card.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {card.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-paper text-ink-500 px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-1 px-4 py-2 border-t border-line bg-paper">
        {(isGrammar || isSentence || card.exampleSentence || card.sourceUrl) && (
          <button
            onClick={() => setShowDetails(true)}
            className="text-xs text-ink-500 hover:text-ink-900 px-3 py-1.5 rounded-lg hover:bg-card transition cursor-pointer"
          >
            Details
          </button>
        )}

        <button
          onClick={() => setEditing(true)}
          className="text-xs text-ink-500 hover:text-ink-900 px-3 py-1.5 rounded-lg hover:bg-card transition cursor-pointer"
        >
          Edit
        </button>

        {confirmDelete ? (
          <div className="flex gap-1 ml-auto">
            <button
              onClick={() => deleteCard(card.id)}
              disabled={deleting}
              className="text-xs text-white bg-sakura-500 hover:bg-sakura-600 px-3 py-1.5 rounded-lg transition disabled:opacity-50 cursor-pointer"
            >
              {deleting ? "…" : "Confirm delete"}
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="text-xs text-ink-500 hover:bg-card px-3 py-1.5 rounded-lg transition cursor-pointer"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmDelete(true)}
            className="text-xs text-sakura-500 hover:text-sakura-600 px-3 py-1.5 rounded-lg hover:bg-card transition ml-auto cursor-pointer"
          >
            Delete
          </button>
        )}
      </div>

      {showDetails && (
        <CardDetailsModal card={card} onClose={() => setShowDetails(false)} />
      )}
    </div>
  );
}
