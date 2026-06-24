import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, ArrowUpRight, Flame, Layers, GraduationCap } from "lucide-react";
import { useDecks } from "@/features/decks/hooks/useDecks";
import { DeckList } from "@/features/decks/components/DeckList";
import { CreateDeckForm } from "@/features/decks/components/CreateDeckForm";
import { useDueCards } from "@/features/reviews/hooks/useDueCards";
import { MissionsSection } from "@/features/missions/components/MissionsSection";
import { AchievementsSection } from "@/features/achievements/components/AchievementsSection";
import { RoadmapSection } from "@/features/roadmap/components/RoadmapSection";
import { useAuthContext } from "@/providers/AuthProvider";
import { ROUTES } from "@/constants/routes";
import { Mascot, Onigiri, Lantern, Torii, KStar } from "@/components/common/Kawaii";
import { AnimeScene } from "@/components/common/AnimeScene";
import { AudioButton } from "@/components/common/AudioButton";
import { Reveal } from "@/components/common/Reveal";

function HeroStat({
  icon: Icon,
  tint,
  value,
  label,
}: {
  icon: typeof Flame;
  tint: string;
  value: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className={`flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 ${tint}`}>
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <div>
        <p className="font-display text-xl leading-none text-white">{value}</p>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-white/55">{label}</p>
      </div>
    </div>
  );
}

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
      {/* ── premium scene hero with integrated glass stats ── */}
      <Reveal className="relative overflow-hidden rounded-[2rem] shadow-[0_30px_70px_-30px_rgba(0,0,0,0.85)] ring-1 ring-white/10">
        <AnimeScene className="absolute inset-0 h-full w-full" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(130% 110% at 110% -10%, transparent 30%, rgba(14,8,40,0.55)), linear-gradient(to top, rgba(14,8,40,0.95) 6%, rgba(14,8,40,0.25) 55%, transparent)",
          }}
        />

        <div className="relative flex min-h-[360px] flex-col justify-between p-7 sm:p-9">
          {/* top */}
          <div className="flex items-start justify-between">
            <div>
              <p className="font-jp text-sm tracking-[0.26em] text-sakura-300">{g.jp}</p>
              <h1 className="font-display mt-1.5 text-4xl font-extrabold leading-[1.04] text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.4)] sm:text-[44px]">
                {g.en}
                {user?.name ? <>, {user.name.split(" ")[0]}</> : ""}
              </h1>
            </div>
            <button
              onClick={() => setShowCreate(true)}
              className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-bold text-white ring-1 ring-white/20 backdrop-blur transition hover:bg-white/25 active:scale-95"
            >
              <Plus className="h-4 w-4" /> <span className="hidden sm:inline">New deck</span>
            </button>
          </div>

          {/* bottom: glass stats strip + CTA */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="inline-flex items-center gap-5 self-start rounded-2xl border border-white/15 bg-white/[0.08] px-5 py-3 backdrop-blur-md">
              <HeroStat icon={Flame} tint="text-[#ffb454]" value={streak} label="streak" />
              <span className="h-9 w-px bg-white/15" />
              <HeroStat icon={GraduationCap} tint="text-[#1ad3b0]" value={dueCount} label="due" />
              <span className="h-9 w-px bg-white/15" />
              <HeroStat icon={Layers} tint="text-[#a99bff]" value={deckCount} label="decks" />
            </div>

            <Link
              to={ROUTES.REVIEW}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-extrabold text-[#d6406a] shadow-xl transition hover:scale-[1.03]"
            >
              <span className="font-jp">復習</span>
              {dueCount > 0 ? "Begin review" : "Practice freely"}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </Reveal>

      {/* ── Today's Missions (Phase 41) ── */}
      <Reveal delay={60}>
        <MissionsSection />
      </Reveal>

      {/* ── Achievements (Phase 42) ── */}
      <Reveal delay={70}>
        <AchievementsSection />
      </Reveal>

      {/* ── Learning Roadmap (Phase 43) ── */}
      <Reveal delay={80}>
        <RoadmapSection />
      </Reveal>

      {/* ── Today: kanji + proverb (refined) ── */}
      <Reveal delay={80} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* kanji of the day */}
        <div className="paper-card overflow-hidden">
          <div className="relative flex h-28 items-center justify-center bg-gradient-to-br from-indigo-500 via-[#6a4bd6] to-[#7c5cff]">
            <span className="font-jp text-6xl font-bold text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
              {kanji.k}
            </span>
            <span className="absolute right-3 top-3">
              <AudioButton text={kanji.k} className="text-white/80 hover:text-white" />
            </span>
            <Onigiri className="pointer-events-none absolute -left-3 -bottom-4 h-16 w-16 rotate-12 opacity-90" />
          </div>
          <div className="p-5">
            <p className="section-label text-indigo-400">漢字 · Kanji of the day</p>
            <p className="font-display mt-1.5 text-2xl capitalize text-ink-900">{kanji.meaning}</p>
            <p className="font-jp mt-1 text-[15px] text-ink-500">
              訓 {kanji.kun} ・ 音 {kanji.on}
            </p>
          </div>
        </div>

        {/* proverb of the day */}
        <div className="paper-card relative flex flex-col justify-between overflow-hidden p-6">
          <Lantern className="pointer-events-none absolute -right-3 -bottom-3 h-20 w-20 opacity-90" />
          <p className="section-label text-sakura-500">諺 · Proverb of the day</p>
          <div className="relative mt-4">
            <span className="font-display absolute -left-1 -top-6 text-5xl text-sakura-500/30">“</span>
            <p className="font-jp text-2xl leading-snug text-ink-900">{proverb.jp}</p>
            <p className="font-display mt-2 text-lg italic leading-snug text-ink-500">
              {proverb.en}
            </p>
          </div>
        </div>
      </Reveal>

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
