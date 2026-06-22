import { Link } from "react-router-dom";
import { ArrowRight, Sparkles as SparkIcon } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { MemoryArt, ProgressArt } from "@/components/common/FeatureArt";
import { MediaCard } from "@/components/common/MediaCard";

/* ── Migaku palette ──────────────────────────────────────────── */
const CORAL = "linear-gradient(135deg,#ff8a4c 0%,#ff4d6a 100%)";
const TEAL = "#1ad3b0";
const PINK = "#ff3d8b";
const VIOLET = "#7c5cff";

function Star({ className = "", size = 22 }: { className?: string; size?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path d="M12 0c.6 6 1.4 6.8 12 12-10.6 5.2-11.4 6-12 12-.6-6-1.4-6.8-12-12 10.6-5.2 11.4-6 12-12Z" fill="#ffd23f" />
    </svg>
  );
}
function Orb({ style, from, to }: { style: React.CSSProperties; from: string; to: string }) {
  return <span aria-hidden className="pointer-events-none absolute rounded-full" style={{ background: `linear-gradient(135deg,${from},${to})`, ...style }} />;
}
function Mascot({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden>
      <defs>
        <linearGradient id="m-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#b8a6ff" /><stop offset="100%" stopColor="#7c5cff" />
        </linearGradient>
      </defs>
      <path d="M60 18c4-12 18-10 18 0 0 4-3 7-7 8" fill="#7c5cff" />
      <circle cx="78" cy="22" r="5" fill="#5bd1ff" />
      <ellipse cx="60" cy="72" rx="40" ry="38" fill="url(#m-body)" />
      <ellipse cx="60" cy="76" rx="30" ry="27" fill="#fff" />
      <circle cx="50" cy="72" r="5" fill="#1b1240" /><circle cx="70" cy="72" r="5" fill="#1b1240" />
      <path d="M54 84c4 4 8 4 12 0" stroke="#1b1240" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="44" cy="80" r="4" fill="#ff9ab7" opacity="0.7" /><circle cx="76" cy="80" r="4" fill="#ff9ab7" opacity="0.7" />
    </svg>
  );
}
function BrowserMock({ children, url = "youtube.com" }: { children: React.ReactNode; url?: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border-4 border-[#2a2060] bg-[#0e0a2e] shadow-2xl">
      <div className="flex items-center gap-1.5 bg-[#1a1448] px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 rounded-md bg-white/10 px-3 py-0.5 text-[10px] text-white/50">{url}</span>
      </div>
      {children}
    </div>
  );
}
function Nav() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#140b38]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl font-jp text-lg text-white" style={{ background: CORAL }}>語</span>
          <span className="text-2xl font-extrabold tracking-tight" style={{ background: CORAL, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>JAP</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-bold text-white/80 md:flex">
          <a href="#how" className="hover:text-white">How it works</a>
          <a href="#team" className="hover:text-white">Team</a>
          <a href="#advanced" className="hover:text-white">Advanced</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link to={ROUTES.LOGIN} className="hidden text-sm font-bold text-white/80 hover:text-white sm:block">Log in</Link>
          <Link to={ROUTES.REGISTER} className="rounded-full px-5 py-2.5 text-sm font-extrabold uppercase tracking-wide text-white shadow-lg transition active:scale-95" style={{ background: CORAL }}>Get started</Link>
        </div>
      </div>
    </header>
  );
}

const LOGOS = ["NETFLIX", "YouTube", "Disney+", "Rakuten Viki", "reddit", "X"];

/* step card (dark, teal hard shadow) */
function StepCard({ n, eyebrow, title, body, cta }: { n: string; eyebrow: string; title: string; body: string; cta: string }) {
  return (
    <div className="relative rounded-3xl border border-white/10 bg-[#171145] p-8" style={{ boxShadow: `13px 13px 0 ${TEAL}` }}>
      <span className="absolute -top-4 left-7 rounded-full bg-white px-4 py-1.5 text-xs font-extrabold" style={{ color: VIOLET }}>{n}</span>
      <p className="mt-3 text-xs font-extrabold uppercase tracking-wide" style={{ color: PINK }}>{eyebrow}</p>
      <h3 className="mt-2 text-3xl font-extrabold leading-tight">{title}</h3>
      <p className="mt-3 text-lg text-white/70">{body}</p>
      <Link to={ROUTES.REGISTER} className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-white shadow-lg transition active:scale-95" style={{ background: CORAL }}>{cta} <ArrowRight className="h-4 w-4" /></Link>
    </div>
  );
}

function TeamCard({ name, role, bio, from, to }: { name: string; role: string; bio: string; from: string; to: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#171145] p-5">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-full text-lg font-extrabold text-white" style={{ background: `linear-gradient(135deg,${from},${to})` }}>{name[0]}</span>
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-wide" style={{ color: TEAL }}>{role}</p>
          <p className="font-extrabold">{name}</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-white/60">{bio}</p>
    </div>
  );
}

function NeonCity() {
  const buildings = [
    { h: 150, from: "#b6f05a", to: "#7cd44b" }, { h: 220, from: "#5bd1ff", to: "#3a8de0" },
    { h: 120, from: "#ff9ec4", to: "#ff5e9e" }, { h: 260, from: "#c9a7ff", to: "#7c5cff" },
    { h: 180, from: "#ffe39a", to: "#ffb454" }, { h: 200, from: "#7ce0c0", to: "#1ad3b0" },
    { h: 140, from: "#ff9ec4", to: "#c084fc" }, { h: 240, from: "#5bd1ff", to: "#7c5cff" },
    { h: 160, from: "#b6f05a", to: "#34c08a" }, { h: 210, from: "#ffd23f", to: "#ff9ec4" },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-center gap-1.5 px-2 opacity-90">
      {buildings.map((b, i) => (
        <div key={i} className="rounded-t-2xl" style={{ width: `${100 / buildings.length}%`, maxWidth: 120, height: b.h, background: `linear-gradient(180deg,${b.from},${b.to})` }} />
      ))}
    </div>
  );
}

const STEPS = [
  { n: "STEP 1", eyebrow: "SKIP THIS IF YOU'RE NOT A BEGINNER!", title: "Learn the most common words", body: "Start with the words and grammar that make up 80%+ of everyday Japanese, so you feel real progress from day one.", cta: "Get started free", visual: "cards" as const },
  { n: "STEP 2", eyebrow: "THE FUN PART", title: "Watch and read real native content", body: "Click words in anything you watch or read to instantly see definitions, pronunciations and AI explanations in context.", cta: "Try it", visual: "browser" as const },
  { n: "STEP 3", eyebrow: "MAKE IT YOURS", title: "Create your own learning materials", body: "Turn any sentence into a flashcard — with the word, context, audio, image and definition — in a single tap.", cta: "Try it", visual: "create" as const },
  { n: "STEP 4", eyebrow: "NEVER FORGET AGAIN", title: "Remember what you learn", body: "Review your cards at the perfect moment with spaced repetition, so words stick in long-term memory for good.", cta: "Start reviewing", visual: "phone" as const },
  { n: "STEP 5", eyebrow: "ALWAYS KNOW WHAT'S NEXT", title: "Find content that matches your ability", body: "JAP tracks every word you know and scores the content you visit, so it's easy to pick what to watch or read next.", cta: "Get started free", visual: "stats" as const },
];

const TEAM = [
  { name: "Lucas", role: "Founder", bio: "Learned Japanese, Mandarin and Portuguese through immersion. Building the tool he always wished existed.", from: "#ff8a4c", to: "#ff4d6a" },
  { name: "Janik", role: "Design", bio: "Fluent in three languages. Obsessed with making learning feel delightful, not like a chore.", from: "#7c5cff", to: "#5bd1ff" },
  { name: "Saxon", role: "Engineering", bio: "Front-end lead with 10+ years building fast, beautiful apps people love to use every day.", from: "#1ad3b0", to: "#34c08a" },
  { name: "Stevi", role: "Content", bio: "Passed the highest level of the JLPT in just 1.5 years using input-heavy methods.", from: "#ff3d8b", to: "#ff8a4c" },
  { name: "Chris", role: "Product", bio: "Speaks five languages. Previously built tools used by millions of learners worldwide.", from: "#ffd23f", to: "#ff9ec4" },
];

const ADVANCED = [
  "Monolingual dictionaries", "Import your own subtitles", "Import words you already know",
  "Language-specific features", "Hotkeys for everything", "Advanced text-to-speech",
  "Flashcards for whole dialogues", "Many customizable options", "Flashcard stats",
];

const WALL = [
  { name: "Adrian", handle: "@maiku", quote: "Covers almost everything a learner can dream of. The community and support are awesome — you can tell the devs really care." },
  { name: "Abas Farah", handle: "@AbasFarah", quote: "You guys are doing great things. The cards are game-changing. Immersion is so much easier now. 🙏🔥" },
  { name: "Jeison", handle: "", quote: "Just great!" },
  { name: "Chris Lane", handle: "@christopherlane57", quote: "Played a huge part in supporting me all the way to fluency. Excited for what's coming up!" },
  { name: "Major General", handle: "", quote: "In one year I reached near native-like comprehension. Way more progress than years of other apps." },
  { name: "Sarah", handle: "새라", quote: "I love you, JAP. You make learning languages so much easier." },
  { name: "Tenno", handle: "@tenno3970", quote: "Day by day JAP is getting more advanced." },
  { name: "Seulgi", handle: "☾", quote: "I love Kanji God… it made me dump Heisig entirely and it's super easy." },
  { name: "TheJapanCode", handle: "@TheJapanCode", quote: "The dictionary is the best thing to ever happen to my learning. It's now… enjoyable!!! Wow!!" },
  { name: "Connor", handle: "", quote: "Good tool for language learning. Use it daily. Pretty poggers." },
  { name: "Mei", handle: "@meihiganbana", quote: "Thank you for the amazing tools, I'm a happy subscriber! Happy learning everyone!" },
  { name: "Has", handle: "", quote: "I absolutely love the SRS — it is so much cleaner than anki." },
  { name: "LevelUp", handle: "@LevelUpPup", quote: "Saved me so much time sentence mining and watching things. Very valuable." },
  { name: "AAV", handle: "@every1lovesAalex", quote: "Compassionate and human. Refreshing to have these philosophies in the community." },
  { name: "Lexie", handle: "@SpanishLexie", quote: "Really enjoying mining sentences on YouTube. So good!" },
  { name: "kacper", handle: "@kacper3438", quote: "This is truly the future of language learning." },
  { name: "Noah Sachs", handle: "", quote: "The essential app for anyone seriously wanting to learn a language, period." },
  { name: "Santi", handle: "@SantiYounger", quote: "One of the best and most advanced apps for language learning." },
];
const AV = [
  ["#ff8a4c", "#ff4d6a"], ["#7c5cff", "#5bd1ff"], ["#1ad3b0", "#34c08a"],
  ["#ff3d8b", "#ff8a4c"], ["#ffd23f", "#ff9ec4"], ["#5bd1ff", "#7c5cff"],
];

function ReviewCard({ name, handle, quote, i }: { name: string; handle: string; quote: string; i: number }) {
  const [from, to] = AV[i % AV.length];
  return (
    <div className="mb-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-extrabold text-white" style={{ background: `linear-gradient(135deg,${from},${to})` }}>{name[0]}</span>
        <div className="leading-tight">
          <p className="text-sm font-bold">{name}</p>
          {handle && <p className="text-xs text-white/40">{handle}</p>}
        </div>
        <span className="ml-auto text-xs" style={{ color: "#ffd23f" }}>★★★★★</span>
      </div>
      <p className="mt-3 text-sm text-white/70">{quote}</p>
    </div>
  );
}

export function LandingPage() {
  return (
    <div className="min-h-screen overflow-hidden text-white" style={{ background: "linear-gradient(180deg,#1a1147 0%,#130b35 40%,#0e0828 100%)" }}>
      <Nav />

      {/* WHAT IS JAP + hero mockup */}
      <section className="relative overflow-hidden py-16 text-center">
        {/* anime sunburst behind the title */}
        <div className="sunburst spin-slow pointer-events-none absolute left-1/2 top-24 h-[640px] w-[640px] -translate-x-1/2 opacity-[0.6]" style={{ maskImage: "radial-gradient(circle, black 0%, transparent 62%)", WebkitMaskImage: "radial-gradient(circle, black 0%, transparent 62%)" }} />
        <Star className="absolute left-[18%] top-12" /><Star className="absolute right-[20%] top-16" size={16} /><Star className="absolute left-[44%] top-6" size={14} />
        <div className="relative mx-auto max-w-3xl px-5">
          <h1 className="text-5xl font-extrabold md:text-6xl">
            What the heck is <span className="relative glow-coral" style={{ color: "#ff8a4c" }}>JAP<span className="absolute -bottom-1 left-0 h-1.5 w-full rounded-full" style={{ background: PINK }} /></span>?
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">
            A delightful app that turns the Japanese you love into simple, effective
            flashcards — and makes sure you actually remember them.
          </p>
        </div>
        {/* laptop + phone */}
        <div className="relative mx-auto mt-12 w-full max-w-2xl px-5">
          <Orb from="#5bd1ff" to={VIOLET} style={{ width: 40, height: 40, top: -10, right: 30 }} />
          <BrowserMock url="netflix.com">
            <div className="p-6 text-left">
              <p className="font-jp text-2xl font-bold text-white">宇宙は<span style={{ color: TEAL }}>神秘</span>に満ちている</p>
              <p className="mt-2 text-sm text-white/60">space is full of mystery</p>
              <div className="mt-4 h-1.5 w-full rounded-full bg-white/15"><div className="h-full w-1/3 rounded-full" style={{ background: CORAL }} /></div>
            </div>
          </BrowserMock>
          <div className="absolute -bottom-6 right-2 w-40 rounded-[1.5rem] border-4 border-[#2a2060] bg-white p-3 shadow-2xl sm:right-6">
            <p className="font-jp text-center text-2xl font-bold text-slate-900">神秘</p>
            <p className="font-jp mt-0.5 text-center text-[11px] text-slate-400">しんぴ</p>
            <p className="mt-2 rounded-lg bg-[#f2f0ff] px-2 py-1 text-center text-[11px] font-semibold text-slate-600">mystery</p>
          </div>
        </div>
        {/* works with */}
        <div className="mt-16">
          <p className="text-sm font-bold text-white/50">Works with the sites you already love</p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-lg font-extrabold text-white/70">
            {LOGOS.map((l) => <span key={l} className="hover:text-white">{l}</span>)}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — 5 steps */}
      <section id="how" className="relative py-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72" style={{ background: "radial-gradient(120% 100% at 50% 0%, #1f7a52 0%, transparent 60%)" }} />
        <Orb from={VIOLET} to="#5bd1ff" style={{ width: 46, height: 46, top: 120, right: "12%" }} />
        <Orb from="#ff5277" to="#ff8a4c" style={{ width: 22, height: 22, bottom: 200, left: "8%" }} />
        <div className="relative mx-auto max-w-6xl space-y-20 px-5 py-10">
          {STEPS.map((s, i) => (
            <div key={s.n} className={`grid items-center gap-10 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <StepCard {...s} />
              <div className="relative flex justify-center">
                <Star className="absolute left-4 top-0" size={16} />
                {s.visual === "cards" && (
                  <>
                    <MediaCard seed="kyoto-temple" word="勉強" reading="べんきょう" meaning="to study" rotate={-7} className="z-10" />
                    <MediaCard seed="sakura-japan" word="神秘" reading="しんぴ" meaning="mystery" rotate={8} width={210} className="absolute left-20 top-10 opacity-95" />
                    <Mascot className="absolute -bottom-6 -left-2 h-20 w-20" />
                  </>
                )}
                {s.visual === "browser" && (
                  <BrowserMock url="youtube.com"><div className="p-5"><p className="font-jp text-xl font-bold text-white">宇宙は<span style={{ color: TEAL }}>神秘</span>に満ちている</p><p className="mt-2 text-sm text-white/60">space is full of mystery</p><p className="mt-3 text-xs font-bold" style={{ color: TEAL }}>↑ hover over the words · try it!</p></div></BrowserMock>
                )}
                {s.visual === "create" && (
                  <BrowserMock url="netflix.com"><div className="p-5"><div className="rounded-xl bg-white p-3 text-slate-900"><p className="font-jp font-bold">aceptar</p><p className="mt-1 text-xs text-slate-500">to accept — to agree to undertake the outcomes that follow.</p><div className="mt-2 flex gap-2"><span className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: VIOLET }}>TRACK</span><span className="rounded-full bg-pink-100 px-2 py-0.5 text-[10px] font-bold text-pink-600">UNKNOWN</span></div></div></div></BrowserMock>
                )}
                {s.visual === "phone" && <MemoryArt className="h-56 w-72" />}
                {s.visual === "stats" && <ProgressArt className="h-56 w-72" />}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EASY SETUP */}
      <section id="setup" className="py-16 text-center">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-4xl font-extrabold md:text-5xl">It’s easy to get started</h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-white/70">Set up in a couple of minutes — no credit card, no fuss.</p>
          <div className="mt-12 grid items-stretch gap-6 md:grid-cols-3">
            {[
              { t: "Sign up free", d: "Create your account in seconds. 10-day free trial, no card required.", icon: "🐾" },
              { t: "Build a deck", d: "Add the words you want to learn, with readings, audio and examples.", icon: "🗂️" },
              { t: "Start studying", d: "Review a little every day and watch your Japanese grow.", icon: "🌱" },
            ].map((c) => (
              <div key={c.t} className="flex flex-col items-center rounded-3xl bg-[#ece6ff] p-8 text-center text-[#1b1240]" style={{ boxShadow: "10px 10px 0 rgba(124,92,255,0.45)" }}>
                <div className="text-5xl">{c.icon}</div>
                <h3 className="mt-4 text-2xl font-extrabold">{c.t}</h3>
                <p className="mt-2 text-[#4b4470]">{c.d}</p>
                <Link to={ROUTES.REGISTER} className="mt-6 rounded-full px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-white shadow-lg transition active:scale-95" style={{ background: CORAL }}>Get started</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="py-16">
        <div className="mx-auto max-w-5xl px-5 text-center">
          <h2 className="text-4xl font-extrabold md:text-5xl">A team you can trust</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">Built by people who learned languages the immersion way — and wanted a tool that finally made it fun.</p>
          <div className="mt-12 grid gap-5 text-left sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((m) => <TeamCard key={m.name} {...m} />)}
          </div>
        </div>
      </section>

      {/* ADVANCED */}
      <section id="advanced" className="relative overflow-hidden bg-[#1c1052] py-20">
        <SparkIcon className="pointer-events-none absolute left-10 top-10 h-16 w-16 text-white/5" />
        <SparkIcon className="pointer-events-none absolute bottom-10 right-12 h-24 w-24 text-white/5" />
        <div className="relative mx-auto max-w-4xl px-5 text-center">
          <h2 className="text-3xl font-extrabold md:text-4xl">I’m an advanced learner — can JAP still help?</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">Absolutely. Under the hood there are countless features for intermediate and advanced learners:</p>
          <div className="mt-10 grid gap-x-8 gap-y-4 text-left sm:grid-cols-2 md:grid-cols-3">
            {ADVANCED.map((a, i) => (
              <p key={a} className="flex items-center gap-2 font-bold" style={{ color: i % 2 ? "#ffb454" : "#ffffff" }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: TEAL }} /> {a}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL WALL */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold md:text-5xl">Loved by learners everywhere 💜</h2>
            <p className="mx-auto mt-4 max-w-lg text-lg text-white/70">Join thousands learning Japanese from the content they love.</p>
          </div>
          <div className="marquee-mask relative mt-12 grid max-h-[34rem] grid-cols-1 gap-4 overflow-hidden md:grid-cols-3">
            {/* top/bottom fade */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-[#0e0828] to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-[#0e0828] to-transparent" />
            {[0, 1, 2].map((col) => {
              const items = WALL.filter((_, idx) => idx % 3 === col);
              return (
                <div key={col} className={col === 2 ? "hidden md:block" : col === 1 ? "hidden sm:block" : ""}>
                  <div className="marquee-track" style={{ "--mq": `${30 + col * 8}s` } as React.CSSProperties}>
                    {[...items, ...items].map((r, idx) => (
                      <ReviewCard key={idx} {...r} i={idx + col} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA + neon city */}
      <section className="relative overflow-hidden pt-20" style={{ background: "linear-gradient(180deg,#150b3e 0%,#241466 100%)" }}>
        <Star className="absolute left-[18%] top-16" /><Star className="absolute right-[22%] top-10" size={16} />
        <Orb from="#5bd1ff" to={VIOLET} style={{ width: 60, height: 60, top: 60, left: "10%" }} />
        <Orb from="#ff5277" to="#ff8a4c" style={{ width: 40, height: 40, top: 80, right: "12%" }} />
        <span className="font-jp pointer-events-none absolute left-8 top-40 hidden text-2xl font-bold md:block" style={{ color: TEAL }}>酒店</span>
        <span className="font-jp pointer-events-none absolute right-10 top-32 hidden text-2xl font-bold md:block" style={{ color: PINK }}>ラーメン</span>
        <div className="relative z-10 mx-auto max-w-2xl px-5 text-center">
          <h2 className="text-5xl font-extrabold leading-[1.05] md:text-6xl">Ready to get fluent?</h2>
          <p className="mt-5 text-lg text-white/70">Start your Japanese journey today.</p>
          <Link to={ROUTES.REGISTER} className="mt-8 inline-flex items-center gap-2 rounded-full px-9 py-4 text-base font-extrabold uppercase tracking-wide text-white shadow-2xl transition active:scale-95" style={{ background: CORAL }}>Get started for free <ArrowRight className="h-5 w-5" /></Link>
          <p className="mt-4 text-sm text-white/50">No credit card required</p>
        </div>
        <div className="relative mt-16 h-72">
          <NeonCity />
          <Mascot className="absolute bottom-0 left-1/2 z-10 h-32 w-32 -translate-x-1/2" />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#0c0723]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl font-jp text-lg text-white" style={{ background: CORAL }}>語</span>
              <span className="text-2xl font-extrabold text-white">JAP</span>
            </div>
            <p className="mt-4 text-sm text-white/50">Really learn Japanese — the fun way.</p>
          </div>
          {[
            { h: "Product", items: ["How it works", "Team", "Pricing", "Download"] },
            { h: "Learn", items: ["Decks", "Dictionary", "Review", "Grammar"] },
            { h: "Resources", items: ["Help center", "Getting started", "Community", "Contact"] },
          ].map((col) => (
            <div key={col.h}>
              <p className="text-sm font-extrabold uppercase tracking-wider text-white">{col.h}</p>
              <ul className="mt-4 space-y-2.5 text-sm text-white/60">{col.items.map((it) => <li key={it}><a href="#" className="hover:text-white">{it}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 py-6 text-center text-xs text-white/40">© {new Date().getFullYear()} JAP · 日本語学習. Made for learners.</div>
      </footer>
    </div>
  );
}
