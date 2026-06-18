import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { useDeleteDeck } from "../hooks/useDecks";
import { EditDeckForm } from "./EditDeckForm";
import type { Deck } from "@/types/deck.types";

interface Props {
  deck: Deck;
}

export function DeckCard({ deck }: Props) {
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const navigate = useNavigate();
  const { mutate: deleteDeck, isPending: deleting } = useDeleteDeck();

  if (editing) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <p className="text-sm font-medium text-slate-700 mb-4">Edit Deck</p>
        <EditDeckForm deck={deck} onClose={() => setEditing(false)} />
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-3 hover:border-slate-300 hover:shadow-sm transition group">
      <div
        className="flex-1 cursor-pointer"
        onClick={() => navigate(ROUTES.DECK(deck.id))}
      >
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-slate-900 group-hover:text-slate-700 leading-tight">
            {deck.name}
          </h3>
          <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full shrink-0">
            {deck.language.toUpperCase()}
          </span>
        </div>
        {deck.description && (
          <p className="text-sm text-slate-500 mt-1.5 line-clamp-2">
            {deck.description}
          </p>
        )}
        <p className="text-xs text-slate-400 mt-3">
          Created {new Date(deck.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
        <button
          onClick={() => navigate(ROUTES.DECK(deck.id))}
          className="flex-1 text-xs text-slate-600 hover:text-slate-900 py-1.5 rounded-lg hover:bg-slate-50 transition cursor-pointer"
        >
          View Cards
        </button>
        <button
          onClick={() => setEditing(true)}
          className="flex-1 text-xs text-slate-600 hover:text-slate-900 py-1.5 rounded-lg hover:bg-slate-50 transition cursor-pointer"
        >
          Edit
        </button>
        {confirmDelete ? (
          <div className="flex gap-1 flex-1">
            <button
              onClick={() => deleteDeck(deck.id)}
              disabled={deleting}
              className="flex-1 text-xs text-white bg-red-500 hover:bg-red-600 py-1.5 rounded-lg transition disabled:opacity-50 cursor-pointer"
            >
              {deleting ? "…" : "Confirm"}
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="flex-1 text-xs text-slate-600 hover:bg-slate-50 py-1.5 rounded-lg transition cursor-pointer"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmDelete(true)}
            className="flex-1 text-xs text-red-500 hover:text-red-700 py-1.5 rounded-lg hover:bg-red-50 transition cursor-pointer"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
