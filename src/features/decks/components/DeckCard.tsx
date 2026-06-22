import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoreHorizontal, Pencil, Trash2, ArrowUpRight } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { useDeleteDeck } from "../hooks/useDecks";
import { EditDeckForm } from "./EditDeckForm";
import type { Deck } from "@/types/deck.types";

interface Props {
  deck: Deck;
}

/* stable muted accent per deck, all within the indigo/sakura family */
const THEMES = [
  { bg: "bg-indigo-500", soft: "bg-indigo-50", text: "text-indigo-500", jp: "語" },
  { bg: "bg-sakura-500", soft: "bg-sakura-50", text: "text-sakura-600", jp: "学" },
  { bg: "bg-jade-500", soft: "bg-jade-500/10", text: "text-jade-500", jp: "字" },
  { bg: "bg-gold-500", soft: "bg-gold-500/12", text: "text-gold-500", jp: "空" },
  { bg: "bg-indigo-400", soft: "bg-indigo-50", text: "text-indigo-400", jp: "花" },
];
function themeFor(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return THEMES[h % THEMES.length];
}

export function DeckCard({ deck }: Props) {
  const [editing, setEditing] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const navigate = useNavigate();
  const { mutate: deleteDeck, isPending: deleting } = useDeleteDeck();
  const t = themeFor(deck.id);

  if (editing) {
    return (
      <div className="paper-card p-5">
        <p className="font-display mb-4 text-xl text-ink-900">Edit deck</p>
        <EditDeckForm deck={deck} onClose={() => setEditing(false)} />
      </div>
    );
  }

  return (
    <div className="paper-card tap holo-hover group relative flex flex-col overflow-hidden">
      {/* glowing top accent in the deck's colour */}
      <span className={`pointer-events-none absolute inset-x-0 top-0 h-1 ${t.bg} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
      <span aria-hidden className="font-jp pointer-events-none absolute -bottom-8 -right-2 select-none text-[8.5rem] leading-none text-ink-900/[0.04] transition-transform duration-500 group-hover:scale-110">
        {t.jp}
      </span>

      <button
        className="relative flex-1 cursor-pointer p-5 text-left"
        onClick={() => navigate(ROUTES.DECK(deck.id))}
      >
        <div className="flex items-start justify-between">
          <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${t.bg} font-jp text-2xl font-medium text-paper`}>
            {t.jp}
          </span>
          <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide ${t.soft} ${t.text}`}>
            {deck.language.toUpperCase()}
          </span>
        </div>

        <h3 className="font-display mt-4 text-2xl leading-tight text-ink-900 line-clamp-1">
          {deck.name}
        </h3>
        <p className="mt-1 line-clamp-2 min-h-[2.5rem] text-[15px] text-ink-500">
          {deck.description || "No description yet."}
        </p>

        <p className="mt-4 text-xs font-medium text-ink-400">
          {new Date(deck.createdAt).toLocaleDateString(undefined, {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </button>

      <div className="relative flex items-center justify-between border-t border-line px-3 py-2.5">
        <button
          onClick={() => navigate(ROUTES.DECK(deck.id))}
          className={`flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold ${t.soft} ${t.text}`}
        >
          Open <ArrowUpRight className="h-3.5 w-3.5" />
        </button>

        <div className="relative">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            onBlur={() => setTimeout(() => setMenuOpen(false), 120)}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-ink-400 transition hover:bg-paper"
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>
          {menuOpen && (
            <div className="absolute bottom-11 right-0 z-10 w-44 overflow-hidden rounded-2xl border border-line bg-card py-1 shadow-2xl">
              {confirmDelete ? (
                <>
                  <p className="px-4 py-2 text-[13px] text-ink-400">Delete this deck?</p>
                  <button
                    onMouseDown={() => deleteDeck(deck.id)}
                    disabled={deleting}
                    className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium text-sakura-600 hover:bg-sakura-50 disabled:opacity-50"
                  >
                    {deleting ? "Deleting…" : "Delete"} <Trash2 className="h-4 w-4" />
                  </button>
                  <button
                    onMouseDown={() => setConfirmDelete(false)}
                    className="w-full px-4 py-2.5 text-left text-sm text-indigo-500 hover:bg-paper"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onMouseDown={() => setEditing(true)}
                    className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium text-ink-700 hover:bg-paper"
                  >
                    Edit <Pencil className="h-4 w-4 text-ink-400" />
                  </button>
                  <div className="mx-4 h-px bg-line" />
                  <button
                    onMouseDown={() => setConfirmDelete(true)}
                    className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium text-sakura-600 hover:bg-sakura-50"
                  >
                    Delete <Trash2 className="h-4 w-4" />
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
