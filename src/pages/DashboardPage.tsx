import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, ArrowUpRight, Flame, Layers } from "lucide-react";
import { ProgressRing } from "@/components/common/ProgressRing";
import { DEFAULT_REVIEW_LIMIT } from "@/constants/app";
import { useDecks } from "@/features/decks/hooks/useDecks";
import { DeckList } from "@/features/decks/components/DeckList";
import { CreateDeckForm } from "@/features/decks/components/CreateDeckForm";
import { useDueCards } from "@/features/reviews/hooks/useDueCards";
import { useAuthContext } from "@/providers/AuthProvider";
import { ROUTES } from "@/constants/routes";
import { Mascot, Onigiri, Lantern, Sakura, Torii, KStar } from "@/components/common/Kawaii";
import { AnimeScene } from "@/components/common/AnimeScene";
import { photoFor } from "@/components/common/MediaCard";
import { AudioButton } from "@/components/common/AudioButton";

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

/* a real daily streak, tracked locally */
function useStreak() {
  const [streak, setStreak] = useState(1);
  useEffect(() => {
    try {
      const today = new Date().toDateString();
      const yesterday = new Date(Date.now() - 86_400_000).toDateString();
      const raw = localStorage.getItem("jap_streak");
      const data = raw ? (JSON.parse(raw) as { last: string; count: number }) : null;
      if (data?.last === today) {
        setStreak(data.count);
        return;
      }
      const count = data?.last === yesterday ? data.count + 1 : 1;
      localStorage.setItem("jap_streak", JSON.stringify({ last: today, count }));
      setStreak(count);
    } catch {
      setStreak(1);
    }
  }, []);
  return streak;
}

export function DashboardPage() {
  const [showCreate, setShowCreate] = useState(false);
  const { data: decks, isLoading, isError, refetch } = useDecks();
  const { data: due } = useDueCards();
  const { user } = useAuthContext();

  const g = greeting();
  const deckCount = decks?.length ?? 0;
  const dueCount = due?.length ?? 0;
  const streak = useStreak();
  const seed = dayOfYear();
  const kanji = KANJI[seed % KANJI.length];
  const proverb = PROVERBS[seed % PROVERBS.length];

  return (
    <div className="space-y-8">
      {/* ── Anime key-visual hero banner ── */}
      <div className="holo relative overflow-hidden rounded-[1.9rem]" style={{ boxShadow: "0 30px 70px -28px rgba(214,64,106,0.55)" }}>
        <AnimeScene className="absolute inset-0 h-full w-full" />
        {/* readability scrim */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#150a36] via-[#150a36]/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#150a36] to-transparent" />

        <div className="relative flex min-h-[300px] flex-col justify-between p-7 sm:p-9">
          <div className="flex items-start justify-between">
            <p className="flex items-center gap-2 font-jp text-sm tracking-[0.28em] text-sakura-300">
              <Sakura className="h-5 w-5" /> {g.jp}
            </p>
            <button
              onClick={() => setShowCreate(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25 active:scale-90"
              title="New deck"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>

          <div className="max-w-lg">
            <h1 className="font-display text-[40px] font-extrabold leading-[1.04] text-white glow-coral sm:text-5xl">
              {g.en}
              {user?.name ? <>, {user.name.split(" ")[0]}</> : ""}
            </h1>
            <p className="mt-3 text-[15px] text-white/75">
              {dueCount > 0
                ? `You have ${dueCount} card${dueCount === 1 ? "" : "s"} ready to review today.`
                : "You're all caught up — explore your decks or the dictionary."}
            </p>
            <Link
              to={ROUTES.REVIEW}
              className="pulse-glow group mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-[#d6406a] shadow-lg transition hover:scale-[1.03]"
            >
              <span className="font-jp">復習</span>
              {dueCount > 0 ? "Begin review" : "Practice freely"}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── modern stats bento ── */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {/* streak */}
        <div className="paper-card tap holo-hover relative flex items-center gap-3 overflow-hidden p-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff8a4c] to-[#ff4d6a] text-white shadow-lg">
            <Flame className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <p className="font-display text-2xl leading-none text-ink-900">{streak}</p>
            <p className="mt-1 truncate text-xs font-semibold text-ink-400">day streak</p>
          </div>
        </div>

        {/* due today with ring */}
        <Link to={ROUTES.REVIEW} className="paper-card tap holo-hover relative flex items-center gap-3 overflow-hidden p-4">
          <ProgressRing
            value={dueCount > 0 ? Math.min(1, dueCount / DEFAULT_REVIEW_LIMIT) : 1}
            size={48}
            stroke={6}
            from="#1ad3b0"
            to="#5bd1ff"
          >
            <span className="font-display text-sm font-bold text-ink-900">{dueCount}</span>
          </ProgressRing>
          <div className="min-w-0">
            <p className="font-display text-2xl leading-none text-ink-900">{dueCount}</p>
            <p className="mt-1 truncate text-xs font-semibold text-ink-400">due today</p>
          </div>
        </Link>

        {/* decks */}
        <div className="paper-card tap holo-hover relative flex items-center gap-3 overflow-hidden p-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7c5cff] to-[#5bd1ff] text-white shadow-lg">
            <Layers className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <p className="font-display text-2xl leading-none text-ink-900">{deckCount}</p>
            <p className="mt-1 truncate text-xs font-semibold text-ink-400">
              deck{deckCount === 1 ? "" : "s"}
            </p>
          </div>
        </div>
      </div>

      {/* Kanji + proverb */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-5">
        <div className="paper-card relative overflow-hidden sm:col-span-3">
          <Onigiri className="pointer-events-none absolute right-3 top-3 z-10 h-14 w-14 rotate-12 opacity-90" />
          <div className="flex flex-col sm:flex-row">
            {/* real themed photo */}
            <div className="relative h-32 w-full shrink-0 sm:h-auto sm:w-40">
              <img
                src={photoFor(kanji.meaning, 400, 400)}
                alt={kanji.meaning}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <span className="font-jp absolute bottom-2 left-2 rounded-xl bg-black/45 px-2.5 py-1 text-3xl font-bold text-white backdrop-blur-sm">
                {kanji.k}
              </span>
            </div>
            {/* details */}
            <div className="flex-1 p-6">
              <p className="section-label text-sakura-500">Kanji of the day</p>
              <div className="mt-2 flex items-center gap-2">
                <p className="font-display text-2xl capitalize text-indigo-500">{kanji.meaning}</p>
                <AudioButton text={kanji.k} className="text-ink-400 hover:text-indigo-400" />
              </div>
              <p className="font-jp mt-1 text-[15px] text-ink-500">
                訓 {kanji.kun} ・ 音 {kanji.on}
              </p>
            </div>
          </div>
        </div>

        <div className="paper-card relative overflow-hidden sm:col-span-2 flex flex-col justify-between p-6">
          <Lantern className="pointer-events-none absolute -right-2 bottom-2 h-20 w-20 opacity-90" />
          <p className="section-label text-sakura-500">Today's proverb</p>
          <div className="relative mt-3">
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
        <div className="flex items-center gap-2.5">
          <span className="h-7 w-1.5 rounded-full bg-gradient-to-b from-indigo-400 to-sakura-500" />
          <h2 className="font-display text-xl text-ink-900">
            My Decks <span className="font-jp text-sm text-ink-400">· 札</span>
            {deckCount > 0 && (
              <span className="ml-1.5 rounded-full bg-white/8 px-2 py-0.5 text-sm font-bold text-ink-400">
                {deckCount}
              </span>
            )}
          </h2>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="text-sm font-bold text-indigo-400 hover:text-indigo-300"
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
          <Torii className="pointer-events-none absolute left-6 top-6 h-16 w-16 opacity-80" />
          <KStar className="pointer-events-none absolute right-10 top-10 h-5 w-5" />
          <Mascot className="relative mb-3 h-24 w-24" />
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
