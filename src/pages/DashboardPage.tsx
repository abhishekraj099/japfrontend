import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, ArrowUpRight } from "lucide-react";
import { useDecks } from "@/features/decks/hooks/useDecks";
import { DeckList } from "@/features/decks/components/DeckList";
import { CreateDeckForm } from "@/features/decks/components/CreateDeckForm";
import { useDueCards } from "@/features/reviews/hooks/useDueCards";
import { useAuthContext } from "@/providers/AuthProvider";
import { ROUTES } from "@/constants/routes";
import { Seigaiha } from "@/components/common/Seigaiha";

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
  { jp: "一期一会", en: "Treasure every encounter." },
  { jp: "千里の道も一歩から", en: "A thousand-mile journey begins with one step." },
  { jp: "塵も積もれば山となる", en: "Even dust, piled up, becomes a mountain." },
];

function greeting() {
  const h = new Date().getHours();
  if (h < 5) return { en: "Good night", jp: "こんばんは" };
  if (h < 12) return { en: "Good morning", jp: "おはよう" };
  if (h < 17) return { en: "Good afternoon", jp: "こんにちは" };
  return { en: "Good evening", jp: "こんばんは" };
}

export function DashboardPage() {
  const [showCreate, setShowCreate] = useState(false);
  const { data: decks, isLoading, isError, refetch } = useDecks();
  const { data: due } = useDueCards();
  const { user } = useAuthContext();

  const g = greeting();
  const deckCount = decks?.length ?? 0;
  const dueCount = due?.length ?? 0;
  const seed = dayOfYear();
  const kanji = KANJI[seed % KANJI.length];
  const proverb = PROVERBS[seed % PROVERBS.length];

  return (
    <div className="space-y-8">
      {/* Editorial hero */}
      <div className="flex items-end justify-between">
        <div>
          <p className="font-jp text-sm tracking-[0.28em] text-sakura-500">{g.jp}</p>
          <h1 className="font-display mt-1.5 text-[44px] leading-[1.05] text-ink-900">
            {g.en}
            {user?.name ? (
              <>
                ,<br />
                <span className="italic">{user.name.split(" ")[0]}</span>
              </>
            ) : null}
          </h1>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-ink-900 text-paper transition active:scale-90"
          title="New deck"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      {/* Review — hero card with mint glow */}
      <Link
        to={ROUTES.REVIEW}
        className="paper-card tap group relative block overflow-hidden p-7"
      >
        {/* mint + violet glow blobs */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-indigo-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-10 h-44 w-44 rounded-full bg-jade-500/20 blur-3xl" />
        <Seigaiha className="pointer-events-none absolute inset-0 h-full w-full" color="#22d3a6" opacity={0.07} />
        <span aria-hidden className="font-jp pointer-events-none absolute -right-4 -bottom-12 select-none text-[12rem] leading-none text-indigo-500/10">
          復習
        </span>
        <div className="relative">
          <p className="section-label text-indigo-400">今日の復習 · Daily review</p>
          <h2 className="font-display mt-3 max-w-md text-3xl leading-tight text-ink-900">
            {dueCount > 0 ? (
              <>
                <span className="text-gradient">{dueCount} card{dueCount === 1 ? "" : "s"}</span>{" "}
                are waiting for you
              </>
            ) : (
              "You're all caught up today"
            )}
          </h2>
          <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-indigo-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 transition group-hover:bg-indigo-600">
            {dueCount > 0 ? "Begin review" : "Practice freely"}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>

      {/* Kanji + proverb */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-5">
        <div className="paper-card sm:col-span-3 p-6">
          <p className="section-label text-sakura-500">Kanji of the day</p>
          <div className="mt-3 flex items-center gap-6">
            <span className="font-jp text-7xl leading-none text-ink-900">{kanji.k}</span>
            <div>
              <p className="font-display text-2xl capitalize text-indigo-500">
                {kanji.meaning}
              </p>
              <p className="font-jp mt-1 text-[15px] text-ink-500">
                訓 {kanji.kun} ・ 音 {kanji.on}
              </p>
            </div>
          </div>
        </div>

        <div className="paper-card sm:col-span-2 flex flex-col justify-between p-6">
          <p className="section-label text-sakura-500">Today's proverb</p>
          <div className="mt-3">
            <p className="font-jp text-xl leading-snug text-ink-900">{proverb.jp}</p>
            <p className="font-display mt-2 text-lg italic leading-snug text-ink-500">
              {proverb.en}
            </p>
          </div>
        </div>
      </div>

      {/* Create panel */}
      {showCreate && (
        <div className="paper-card p-6">
          <p className="font-display mb-4 text-xl text-ink-900">New deck</p>
          <CreateDeckForm onClose={() => setShowCreate(false)} />
        </div>
      )}

      {/* Decks */}
      <div className="flex items-center justify-between px-1">
        <p className="section-label">
          My decks{deckCount > 0 ? ` · ${deckCount}` : ""}
        </p>
        <button
          onClick={() => setShowCreate(true)}
          className="text-sm font-semibold text-indigo-500 hover:text-indigo-600"
        >
          + Add
        </button>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="paper-card h-36 animate-pulse p-5">
              <div className="mb-3 h-12 w-12 rounded-2xl bg-line" />
              <div className="mb-2 h-3.5 w-2/3 rounded-full bg-line" />
              <div className="h-3 w-full rounded-full bg-line" />
            </div>
          ))}
        </div>
      )}

      {isError && (
        <div className="paper-card flex flex-col items-center py-12 text-center">
          <p className="mb-3 text-[15px] text-ink-500">Couldn’t load your decks.</p>
          <button
            onClick={() => refetch()}
            className="rounded-full bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-paper"
          >
            Try again
          </button>
        </div>
      )}

      {!isLoading && !isError && deckCount === 0 && (
        <div className="paper-card relative flex flex-col items-center overflow-hidden px-6 py-16 text-center">
          <Seigaiha className="pointer-events-none absolute inset-x-0 bottom-0 h-24 w-full" color="#22d3a6" opacity={0.08} />
          <span className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500 font-jp text-3xl text-paper">
            空
          </span>
          <h3 className="font-display relative text-2xl text-ink-900">No decks yet</h3>
          <p className="relative mt-1 max-w-xs text-[15px] text-ink-500">
            Create a deck to start adding flashcards and learning Japanese.
          </p>
          <button
            onClick={() => setShowCreate(true)}
            className="relative mt-6 rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-paper transition active:scale-95"
          >
            Create your first deck
          </button>
        </div>
      )}

      {!isLoading && !isError && decks && deckCount > 0 && (
        <DeckList decks={decks} />
      )}
    </div>
  );
}
