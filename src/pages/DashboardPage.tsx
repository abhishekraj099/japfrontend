import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, ChevronRight, GraduationCap } from "lucide-react";
import { useDecks } from "@/features/decks/hooks/useDecks";
import { DeckList } from "@/features/decks/components/DeckList";
import { CreateDeckForm } from "@/features/decks/components/CreateDeckForm";
import { useDueCards } from "@/features/reviews/hooks/useDueCards";
import { useAuthContext } from "@/providers/AuthProvider";
import { ROUTES } from "@/constants/routes";

function dayOfYear() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now.getTime() - start.getTime()) / 86_400_000);
}

const KANJI = [
  { k: "水", on: "スイ", kun: "みず", meaning: "water" },
  { k: "火", on: "カ", kun: "ひ", meaning: "fire" },
  { k: "木", on: "モク", kun: "き", meaning: "tree" },
  { k: "空", on: "クウ", kun: "そら", meaning: "sky" },
  { k: "心", on: "シン", kun: "こころ", meaning: "heart" },
  { k: "光", on: "コウ", kun: "ひかり", meaning: "light" },
  { k: "道", on: "ドウ", kun: "みち", meaning: "road" },
  { k: "夢", on: "ム", kun: "ゆめ", meaning: "dream" },
];

const PROVERBS = [
  { jp: "七転び八起き", en: "Fall seven times, rise eight." },
  { jp: "継続は力なり", en: "Persistence is power." },
  { jp: "一期一会", en: "Treasure every moment." },
  { jp: "千里の道も一歩から", en: "A journey of a thousand miles begins with a single step." },
  { jp: "塵も積もれば山となる", en: "Many a little makes a mickle." },
];

function greeting() {
  const h = new Date().getHours();
  if (h < 5) return "Good night";
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}
function todayLabel() {
  return new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function DashboardPage() {
  const [showCreate, setShowCreate] = useState(false);
  const { data: decks, isLoading, isError, refetch } = useDecks();
  const { data: due } = useDueCards();
  const { user } = useAuthContext();

  const deckCount = decks?.length ?? 0;
  const dueCount = due?.length ?? 0;
  const seed = dayOfYear();
  const kanji = KANJI[seed % KANJI.length];
  const proverb = PROVERBS[seed % PROVERBS.length];

  return (
    <div className="space-y-7">
      {/* Large title */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[13px] font-medium uppercase tracking-wide text-ink-500">
            {todayLabel()}
          </p>
          <h1 className="ios-large-title mt-0.5 text-[34px] leading-tight text-label">
            {greeting()}
            {user?.name ? `, ${user.name.split(" ")[0]}` : ""}
          </h1>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-white shadow-sm transition active:scale-90"
          title="New deck"
        >
          <Plus className="h-5 w-5" strokeWidth={2.5} />
        </button>
      </div>

      {/* Featured: Daily Review */}
      <Link to={ROUTES.REVIEW} className="ios-card ios-card-tap block p-4">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-md">
            <GraduationCap className="h-7 w-7" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[17px] font-semibold text-label">Daily Review</p>
            <p className="mt-0.5 text-[15px] text-ink-500">
              {dueCount > 0
                ? `${dueCount} card${dueCount === 1 ? "" : "s"} ready to review`
                : "You're all caught up for today"}
            </p>
          </div>
          {dueCount > 0 ? (
            <span className="shrink-0 rounded-full bg-blue-500 px-4 py-2 text-[15px] font-semibold text-white">
              Review
            </span>
          ) : (
            <ChevronRight className="h-5 w-5 shrink-0 text-ink-300" />
          )}
        </div>
      </Link>

      {/* Two-up: kanji + proverb */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="ios-card p-5">
          <p className="ios-section">Kanji of the Day</p>
          <div className="mt-3 flex items-center gap-4">
            <span className="font-jp text-[56px] font-medium leading-none text-label">
              {kanji.k}
            </span>
            <div>
              <p className="text-[17px] font-semibold capitalize text-blue-500">
                {kanji.meaning}
              </p>
              <p className="font-jp mt-0.5 text-[15px] text-ink-500">
                {kanji.kun}・{kanji.on}
              </p>
            </div>
          </div>
        </div>

        <div className="ios-card flex flex-col justify-between p-5">
          <p className="ios-section">Proverb of the Day</p>
          <div className="mt-3">
            <p className="font-jp text-[19px] font-medium leading-snug text-label">
              {proverb.jp}
            </p>
            <p className="mt-1.5 text-[14px] leading-snug text-ink-500">{proverb.en}</p>
          </div>
        </div>
      </div>

      {/* Create panel */}
      {showCreate && (
        <div className="ios-card p-5">
          <p className="mb-4 text-[17px] font-semibold text-label">New Deck</p>
          <CreateDeckForm onClose={() => setShowCreate(false)} />
        </div>
      )}

      {/* Decks section */}
      <div className="flex items-center justify-between px-1 pt-1">
        <p className="ios-section">
          My Decks{deckCount > 0 ? ` · ${deckCount}` : ""}
        </p>
        <button
          onClick={() => setShowCreate(true)}
          className="text-[15px] font-medium text-blue-500"
        >
          Add
        </button>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="ios-card h-32 animate-pulse p-4">
              <div className="mb-3 h-11 w-11 rounded-2xl bg-group" />
              <div className="mb-2 h-3.5 w-2/3 rounded-full bg-group" />
              <div className="h-3 w-full rounded-full bg-group" />
            </div>
          ))}
        </div>
      )}

      {isError && (
        <div className="ios-card flex flex-col items-center py-10 text-center">
          <p className="mb-3 text-[15px] text-ink-500">Couldn’t load your decks.</p>
          <button
            onClick={() => refetch()}
            className="rounded-full bg-blue-500 px-5 py-2 text-[15px] font-semibold text-white"
          >
            Try Again
          </button>
        </div>
      )}

      {!isLoading && !isError && deckCount === 0 && (
        <div className="ios-card flex flex-col items-center px-6 py-14 text-center">
          <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-[20px] bg-gradient-to-br from-blue-500 to-indigo-500 font-jp text-3xl text-white shadow-md">
            語
          </span>
          <h3 className="text-[20px] font-semibold text-label">No Decks Yet</h3>
          <p className="mt-1 max-w-xs text-[15px] text-ink-500">
            Create a deck to start adding flashcards and learning Japanese.
          </p>
          <button
            onClick={() => setShowCreate(true)}
            className="mt-6 rounded-full bg-blue-500 px-6 py-2.5 text-[15px] font-semibold text-white shadow-sm transition active:scale-95"
          >
            Create Deck
          </button>
        </div>
      )}

      {!isLoading && !isError && decks && deckCount > 0 && (
        <DeckList decks={decks} />
      )}
    </div>
  );
}
