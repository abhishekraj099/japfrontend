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

/* stable gradient + glyph per deck */
const THEMES = [
  { from: "#6366f1", to: "#7c5cff", soft: "bg-indigo-50", text: "text-indigo-500", jp: "語" },
  { from: "#ff6a4d", to: "#ff3d8b", soft: "bg-sakura-50", text: "text-sakura-600", jp: "学" },
  { from: "#1ad3b0", to: "#34c08a", soft: "bg-jade-500/10", text: "text-jade-500", jp: "字" },
  { from: "#ffb454", to: "#ff6a4d", soft: "bg-gold-500/12", text: "text-gold-500", jp: "空" },
  { from: "#5bd1ff", to: "#7c5cff", soft: "bg-indigo-50", text: "text-indigo-400", jp: "花" },
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
      <button
        className="block flex-1 cursor-pointer text-left"
        onClick={() => navigate(ROUTES.DECK(deck.id))}
      >
        {/* gradient cover */}
        <div className="relative h-24 overflow-hidden" style={{ background: `linear-gradient(135deg,${t.from},${t.to})` }}>
          <div className="absolute right-5 top-3 h-10 w-10 rounded-full bg-white/40 blur-[1px]" />
          <svg className="absolute inset-x-0 bottom-0 w-full" viewBox="0 0 200 50" preserveAspectRatio="none">
            <path d="M0 38 C 50 18 90 30 130 22 S 200 18 200 30 L200 50 L0 50 Z" fill="rgba(255,255,255,0.2)" />
            <path d="M0 44 C 60 30 110 40 150 34 S 200 32 200 40 L200 50 L0 50 Z" fill="rgba(255,255,255,0.16)" />
          </svg>
          <span className="font-jp absolute inset-0 flex items-center justify-center text-5xl font-bold text-white/90 drop-shadow transition-transform duration-300 group-hover:scale-105">
            {t.jp}
          </span>
          <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-slate-700">
            {deck.language.toUpperCase()}
          </span>
        </div>

        {/* body */}
        <div className="p-5">
          <h3 className="font-display text-xl leading-tight text-ink-900 line-clamp-1">
            {deck.name}
          </h3>
          <p className="mt-1 line-clamp-2 min-h-[2.5rem] text-[15px] text-ink-500">
            {deck.description || "No description yet."}
          </p>
          <p className="mt-3 text-xs font-medium text-ink-400">
            {new Date(deck.createdAt).toLocaleDateString(undefined, {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </button>

      {/* footer */}
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
