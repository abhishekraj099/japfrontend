import { useState } from "react";
import { useDeleteCard } from "../hooks/useCards";
import { EditCardForm } from "./EditCardForm";
import { CardTypeBadge } from "./CardTypeBadge";
import type { Card } from "@/types/card.types";

interface Props {
  card: Card;
  deckId: string;
}

export function CardItem({ card, deckId }: Props) {
  const [editing, setEditing] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { mutate: deleteCard, isPending: deleting } = useDeleteCard(deckId);
  const isGrammar = card.cardType === "grammar";

  if (editing) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <p className="text-sm font-semibold text-slate-700 mb-4">Edit Card</p>
        <EditCardForm card={card} deckId={deckId} onClose={() => setEditing(false)} />
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-slate-300 hover:shadow-sm transition">
      {/* Question row — always visible */}
      <button
        className="w-full text-left px-5 py-4 flex items-start justify-between gap-4 cursor-pointer"
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="flex-1">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">
            {isGrammar ? "Pattern" : "Question"}
          </p>
          <p className="text-slate-900 font-medium leading-snug">{card.question}</p>
          {card.reading && (
            <p className="text-sm text-slate-400 mt-0.5">{card.reading}</p>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <CardTypeBadge cardType={card.cardType} />
          {card.jlptLevel && (
            <span className="text-xs font-semibold bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">
              {card.jlptLevel}
            </span>
          )}
          <span className="text-slate-400 text-lg mt-0.5">
            {expanded ? "▲" : "▼"}
          </span>
        </div>
      </button>

      {/* Answer — revealed on expand */}
      {expanded && (
        <div className="px-5 pb-4 border-t border-slate-100">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mt-3 mb-1">
            {isGrammar ? "Explanation" : "Answer"}
          </p>
          <p className="text-slate-700 leading-snug">{card.answer}</p>

          {card.grammarNotes && (
            <div className="mt-3">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">
                {isGrammar ? "Grammar notes" : "Grammar"}
              </p>
              <p className="text-sm text-slate-600 leading-snug">
                {card.grammarNotes}
              </p>
            </div>
          )}

          {card.examples.length > 0 && (
            <div className="mt-3">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">
                {card.examples.length === 1 ? "Example" : "Examples"}
              </p>
              <ul className="space-y-0.5">
                {card.examples.map((ex, i) => (
                  <li key={i} className="text-sm text-slate-600 leading-snug">
                    {ex.replace("—", "→")}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {card.contextSentence && (
            <div className="mt-3">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">
                {isGrammar ? "In context" : "Example"}
              </p>
              <p className="text-sm text-slate-600 italic leading-snug">
                {card.contextSentence}
              </p>
            </div>
          )}

          {card.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
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
      )}

      {/* Actions */}
      <div className="flex items-center gap-1 px-4 py-2 border-t border-slate-100 bg-slate-50">
        <button
          onClick={() => setEditing(true)}
          className="text-xs text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-lg hover:bg-white transition cursor-pointer"
        >
          Edit
        </button>

        {confirmDelete ? (
          <div className="flex gap-1 ml-auto">
            <button
              onClick={() => deleteCard(card.id)}
              disabled={deleting}
              className="text-xs text-white bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-lg transition disabled:opacity-50 cursor-pointer"
            >
              {deleting ? "…" : "Confirm delete"}
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="text-xs text-slate-500 hover:bg-white px-3 py-1.5 rounded-lg transition cursor-pointer"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmDelete(true)}
            className="text-xs text-red-400 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-white transition ml-auto cursor-pointer"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
