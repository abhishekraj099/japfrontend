import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoreHorizontal, Pencil, Trash2, ChevronRight } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { useDeleteDeck } from "../hooks/useDecks";
import { EditDeckForm } from "./EditDeckForm";
import type { Deck } from "@/types/deck.types";

interface Props {
  deck: Deck;
}

/* stable iOS system color + glyph per deck */
const THEMES = [
  { grad: "from-blue-500 to-indigo-500", soft: "bg-blue-50", text: "text-blue-500", jp: "語" },
  { grad: "from-[#FF9500] to-pink-500", soft: "bg-orange-500/10", text: "text-orange-500", jp: "学" },
  { grad: "from-green-500 to-teal-500", soft: "bg-green-500/10", text: "text-green-500", jp: "字" },
  { grad: "from-purple-500 to-pink-500", soft: "bg-purple-500/10", text: "text-purple-500", jp: "空" },
  { grad: "from-teal-400 to-blue-500", soft: "bg-teal-500/10", text: "text-teal-500", jp: "花" },
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
      <div className="ios-card p-5">
        <p className="mb-4 text-[17px] font-semibold text-label">Edit Deck</p>
        <EditDeckForm deck={deck} onClose={() => setEditing(false)} />
      </div>
    );
  }

  return (
    <div className="ios-card ios-card-tap relative flex items-center gap-4 p-4">
      <button
        className="flex min-w-0 flex-1 items-center gap-4 text-left"
        onClick={() => navigate(ROUTES.DECK(deck.id))}
      >
        <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${t.grad} font-jp text-2xl font-medium text-white shadow-md`}>
          {t.jp}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-[17px] font-semibold text-label">{deck.name}</p>
            <span className={`shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-bold tracking-wide ${t.soft} ${t.text}`}>
              {deck.language.toUpperCase()}
            </span>
          </div>
          <p className="mt-0.5 truncate text-[15px] text-ink-500">
            {deck.description || "No description"}
          </p>
          <p className="mt-0.5 text-[13px] text-ink-400">
            {new Date(deck.createdAt).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <ChevronRight className="h-5 w-5 shrink-0 text-ink-300" />
      </button>

      {/* context menu trigger */}
      <div className="relative">
        <button
          onClick={() => setMenuOpen((o) => !o)}
          onBlur={() => setTimeout(() => setMenuOpen(false), 120)}
          className="flex h-8 w-8 items-center justify-center rounded-full text-ink-400 transition hover:bg-group"
        >
          <MoreHorizontal className="h-5 w-5" />
        </button>
        {menuOpen && (
          <div className="absolute right-0 top-10 z-10 w-44 overflow-hidden rounded-2xl bg-white/90 py-1 shadow-2xl ring-1 ring-black/5 backdrop-blur-xl">
            {confirmDelete ? (
              <>
                <p className="px-4 py-2 text-[13px] text-ink-500">Delete this deck?</p>
                <button
                  onMouseDown={() => deleteDeck(deck.id)}
                  disabled={deleting}
                  className="flex w-full items-center justify-between px-4 py-2.5 text-[15px] font-medium text-red-500 hover:bg-group disabled:opacity-50"
                >
                  {deleting ? "Deleting…" : "Delete"}
                  <Trash2 className="h-4 w-4" />
                </button>
                <button
                  onMouseDown={() => setConfirmDelete(false)}
                  className="w-full px-4 py-2.5 text-left text-[15px] text-blue-500 hover:bg-group"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onMouseDown={() => setEditing(true)}
                  className="flex w-full items-center justify-between px-4 py-2.5 text-[15px] font-medium text-label hover:bg-group"
                >
                  Edit <Pencil className="h-4 w-4 text-ink-500" />
                </button>
                <div className="hairline mx-4 h-px" />
                <button
                  onMouseDown={() => setConfirmDelete(true)}
                  className="flex w-full items-center justify-between px-4 py-2.5 text-[15px] font-medium text-red-500 hover:bg-group"
                >
                  Delete <Trash2 className="h-4 w-4" />
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
