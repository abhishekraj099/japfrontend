import { Link } from "react-router-dom";
import { ArrowRight, Volume2 } from "lucide-react";
import { ROUTES } from "@/constants/routes";

/* ── Migaku palette (marketing site) ─────────────────────────── */
const CORAL = "linear-gradient(135deg,#ff8a4c 0%,#ff4d6a 100%)";
const TEAL = "#1ad3b0";
const PINK = "#ff3d8b";
const VIOLET = "#7c5cff";

/* ── decorative bits ─────────────────────────────────────────── */
function Star({ className = "", size = 22 }: { className?: string; size?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path
        d="M12 0c.6 6 1.4 6.8 12 12-10.6 5.2-11.4 6-12 12-.6-6-1.4-6.8-12-12 10.6-5.2 11.4-6 12-12Z"
        fill="#ffd23f"
      />
    </svg>
  );
}

function Orb({ style, from, to }: { style: React.CSSProperties; from: string; to: string }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute rounded-full"
      style={{ background: `linear-gradient(135deg,${from},${to})`, ...style }}
    />
  );
}

/* cute mascot — a friendly blob */
function Mascot({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden>
      <defs>
        <linearGradient id="m-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#b8a6ff" />
          <stop offset="100%" stopColor="#7c5cff" />
        </linearGradient>
      </defs>
      <path d="M60 18c4-12 18-10 18 0 0 4-3 7-7 8" fill="#7c5cff" />
      <circle cx="78" cy="22" r="5" fill="#5bd1ff" />
      <ellipse cx="60" cy="72" rx="40" ry="38" fill="url(#m-body)" />
      <ellipse cx="60" cy="76" rx="30" ry="27" fill="#fff" />
      <circle cx="50" cy="72" r="5" fill="#1b1240" />
      <circle cx="70" cy="72" r="5" fill="#1b1240" />
      <path d="M54 84c4 4 8 4 12 0" stroke="#1b1240" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="44" cy="80" r="4" fill="#ff9ab7" opacity="0.7" />
      <circle cx="76" cy="80" r="4" fill="#ff9ab7" opacity="0.7" />
    </svg>
  );
}

/* floating white flashcard mockup */
function CardMock({ rotate = -6, className = "" }: { rotate?: number; className?: string }) {
  return (
    <div
      className={`rounded-3xl bg-white p-5 shadow-2xl ${className}`}
      style={{ transform: `rotate(${rotate}deg)`, width: 230 }}
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-full px-2 py-0.5 text-[10px] font-extrabold" style={{ background: "#eef0ff", color: VIOLET }}>
          VOCAB
        </span>
        <span className="font-jp text-[11px] text-slate-400">N5</span>
      </div>
      <p className="font-jp text-center text-4xl font-bold text-slate-900">勉強</p>
      <p className="font-jp mt-1 text-center text-sm text-slate-400">べんきょう</p>
      <div className="mt-3 flex items-center justify-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-full" style={{ background: "#eef0ff", color: VIOLET }}>
          <Volume2 className="h-3.5 w-3.5" />
        </span>
        <span className="text-sm font-bold text-slate-900">to study</span>
      </div>
    </div>
  );
}

/* laptop + phone hero mockup */
function HeroMock() {
  return (
    <div className="relative mx-auto w-full max-w-lg">
      <Orb from="#ff5277" to="#ff8a4c" style={{ width: 26, height: 26, top: -10, left: 20 }} />
      <Orb from="#5bd1ff" to={VIOLET} style={{ width: 40, height: 40, bottom: 30, right: -6 }} />
      <Star className="absolute -left-6 top-10" />
      <Star className="absolute right-2 top-0" size={16} />
      {/* laptop */}
      <div className="overflow-hidden rounded-2xl border-4 border-[#2a2060] bg-[#0e0a2e] shadow-2xl">
        <div className="flex items-center gap-1.5 bg-[#1a1448] px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="relative p-6">
          <p className="font-jp text-2xl font-bold text-white">
            宇宙は<span style={{ color: TEAL }}>神秘</span>に満ちている
          </p>
          <p className="mt-2 text-sm text-white/60">space is full of mystery</p>
          <div className="mt-4 h-1.5 w-full rounded-full bg-white/15">
            <div className="h-full w-1/3 rounded-full" style={{ background: CORAL }} />
          </div>
        </div>
      </div>
      {/* phone */}
      <div className="absolute -bottom-8 -right-4 w-40 rounded-[1.6rem] border-4 border-[#2a2060] bg-white p-3 shadow-2xl sm:-right-10">
        <p className="font-jp text-center text-2xl font-bold text-slate-900">神秘</p>
        <p className="font-jp mt-0.5 text-center text-[11px] text-slate-400">しんぴ</p>
        <p className="mt-2 rounded-lg bg-[#f2f0ff] px-2 py-1 text-center text-[11px] font-semibold text-slate-600">
          mystery
        </p>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#140b38]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl font-jp text-lg text-white" style={{ background: CORAL }}>
            語
          </span>
          <span
            className="text-2xl font-extrabold tracking-tight"
            style={{ background: CORAL, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}
          >
            JAP
          </span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-bold text-white/80 md:flex">
          <a href="#how" className="hover:text-white">How it works</a>
          <a href="#setup" className="hover:text-white">Get started</a>
          <a href="#reviews" className="hover:text-white">Reviews</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link to={ROUTES.LOGIN} className="hidden text-sm font-bold text-white/80 hover:text-white sm:block">
            Log in
          </Link>
          <Link
            to={ROUTES.REGISTER}
            className="rounded-full px-5 py-2.5 text-sm font-extrabold uppercase tracking-wide text-white shadow-lg transition active:scale-95"
            style={{ background: CORAL }}
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}

const STEPS = [
  {
    n: "STEP 1",
    eyebrow: "SKIP THIS IF YOU'RE NOT A BEGINNER!",
    title: "Learn the most common words",
    body: "Start with the words and grammar that make up 80%+ of everyday Japanese, so you feel real progress from day one.",
    cta: "Get started free",
  },
  {
    n: "STEP 2",
    eyebrow: "THE FUN PART",
    title: "Turn anything into flashcards",
    body: "Save words from anything you read or watch — complete with reading, native audio and the sentence it came from.",
    cta: "Try it",
  },
  {
    n: "STEP 3",
    eyebrow: "NEVER FORGET AGAIN",
    title: "Review a little, every day",
    body: "Short daily sessions powered by spaced repetition lock every word into long-term memory for good.",
    cta: "Start reviewing",
  },
];

const REVIEWS = [
  { name: "Aiko", role: "N3 learner", quote: "Finally a learning app that feels fun AND calm. I actually look forward to my reviews now." },
  { name: "Marco", role: "Self-studying", quote: "One-tap card creation is a game changer. My vocab doubled in two months." },
  { name: "Priya", role: "JLPT prep", quote: "Clean, fast and genuinely addictive. The only SRS I've stuck with past a week." },
];

export function LandingPage() {
  return (
    <div className="min-h-screen overflow-hidden text-white" style={{ background: "linear-gradient(180deg,#1a1147 0%,#130b35 40%,#0e0828 100%)" }}>
      <Nav />

      {/* HERO */}
      <section className="relative">
        <Star className="absolute left-[12%] top-16" />
        <Star className="absolute right-[14%] top-28" size={16} />
        <Star className="absolute left-[44%] top-8" size={14} />
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide" style={{ color: TEAL }}>
              日本語 · Learn Japanese
            </span>
            <h1 className="mt-5 text-5xl font-extrabold leading-[1.04] md:text-6xl">
              Really learn Japanese from content you{" "}
              <span className="relative whitespace-nowrap">
                love
                <span className="absolute -bottom-1 left-0 h-1.5 w-full rounded-full" style={{ background: PINK }} />
              </span>
              .
            </h1>
            <p className="mt-6 max-w-md text-lg text-white/70">
              Smart flashcards, a built-in dictionary and spaced repetition — all
              in one playful place. A little every day is all it takes.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to={ROUTES.REGISTER}
                className="inline-flex items-center gap-2 rounded-full px-7 py-4 text-base font-extrabold uppercase tracking-wide text-white shadow-xl transition active:scale-95"
                style={{ background: CORAL }}
              >
                Get started free <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to={ROUTES.LOGIN} className="font-bold text-white/80 hover:text-white">
                I have an account →
              </Link>
            </div>
            <p className="mt-5 text-sm text-white/50">★★★★★ Loved by thousands of learners</p>
          </div>
          <HeroMock />
        </div>
      </section>

      {/* WHAT IS JAP */}
      <section className="relative py-16 text-center">
        <Star className="absolute left-[20%] top-6" size={16} />
        <Star className="absolute right-[22%] top-10" />
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="text-4xl font-extrabold md:text-5xl">
            What the heck is{" "}
            <span className="relative">
              JAP
              <span className="absolute -bottom-1 left-0 h-1.5 w-full rounded-full" style={{ background: PINK }} />
            </span>
            ?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">
            A delightful app that turns the Japanese you love into simple, effective
            flashcards — and makes sure you actually remember them.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS — dark cards with teal hard shadow */}
      <section id="how" className="relative py-10">
        {/* green hill */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72" style={{ background: "radial-gradient(120% 100% at 50% 120%, #1f7a52 0%, transparent 60%)" }} />
        <Orb from={VIOLET} to="#5bd1ff" style={{ width: 46, height: 46, top: 80, right: "12%" }} />
        <Orb from="#ff5277" to="#ff8a4c" style={{ width: 22, height: 22, bottom: 120, left: "8%" }} />

        <div className="relative mx-auto max-w-6xl space-y-16 px-5 py-10">
          {STEPS.map((s, i) => (
            <div key={s.n} className={`grid items-center gap-10 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
              {/* card */}
              <div
                className="relative rounded-3xl border border-white/10 bg-[#171145] p-8"
                style={{ boxShadow: `13px 13px 0 ${TEAL}` }}
              >
                <span className="absolute -top-4 left-7 rounded-full bg-white px-4 py-1.5 text-xs font-extrabold" style={{ color: VIOLET }}>
                  {s.n}
                </span>
                <p className="mt-3 text-xs font-extrabold uppercase tracking-wide" style={{ color: PINK }}>
                  {s.eyebrow}
                </p>
                <h3 className="mt-2 text-3xl font-extrabold leading-tight">{s.title}</h3>
                <p className="mt-3 text-lg text-white/70">{s.body}</p>
                <Link
                  to={ROUTES.REGISTER}
                  className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-white shadow-lg transition active:scale-95"
                  style={{ background: CORAL }}
                >
                  {s.cta} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              {/* visual */}
              <div className="relative flex justify-center">
                <Star className="absolute left-4 top-0" size={16} />
                <CardMock rotate={-7} className="z-10" />
                <CardMock rotate={8} className="absolute left-16 top-8 opacity-90" />
                <Mascot className="absolute -bottom-6 -left-2 h-24 w-24" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-16">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-center text-4xl font-extrabold">Learners love JAP 💜</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {REVIEWS.map((r) => (
              <div key={r.name} className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur">
                <div style={{ color: "#ffd23f" }}>★★★★★</div>
                <p className="mt-3 text-white/80">“{r.quote}”</p>
                <div className="mt-5 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-extrabold text-white" style={{ background: CORAL }}>
                    {r.name[0]}
                  </span>
                  <div>
                    <p className="font-bold">{r.name}</p>
                    <p className="text-sm text-white/50">{r.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EASY SETUP — lavender cards */}
      <section id="setup" className="py-16 text-center">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-4xl font-extrabold md:text-5xl">It’s easy to get started</h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-white/70">
            Set up in a couple of minutes — no credit card, no fuss.
          </p>
          <div className="mt-12 grid items-stretch gap-6 md:grid-cols-3">
            {[
              { t: "Sign up free", d: "Create your account in seconds. 10-day free trial, no card required.", icon: "🐾" },
              { t: "Build a deck", d: "Add the words you want to learn, with readings, audio and examples.", icon: "🗂️" },
              { t: "Start studying", d: "Review a little every day and watch your Japanese grow.", icon: "🌱" },
            ].map((c) => (
              <div
                key={c.t}
                className="flex flex-col items-center rounded-3xl bg-[#ece6ff] p-8 text-center text-[#1b1240]"
                style={{ boxShadow: "10px 10px 0 rgba(124,92,255,0.45)" }}
              >
                <div className="text-5xl">{c.icon}</div>
                <h3 className="mt-4 text-2xl font-extrabold">{c.t}</h3>
                <p className="mt-2 text-[#4b4470]">{c.d}</p>
                <Link
                  to={ROUTES.REGISTER}
                  className="mt-6 rounded-full px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-white shadow-lg transition active:scale-95"
                  style={{ background: CORAL }}
                >
                  Get started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden py-24 text-center">
        <Orb from="#5bd1ff" to={VIOLET} style={{ width: 60, height: 60, top: 40, left: "10%" }} />
        <Orb from="#ff5277" to="#ff8a4c" style={{ width: 40, height: 40, bottom: 60, right: "12%" }} />
        <Star className="absolute left-[24%] top-24" />
        <Star className="absolute right-[26%] top-16" size={16} />
        {/* neon japanese signs */}
        <span className="font-jp pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 text-3xl font-bold md:block" style={{ color: TEAL, opacity: 0.5 }}>酒店</span>
        <span className="font-jp pointer-events-none absolute right-8 top-1/3 hidden text-3xl font-bold md:block" style={{ color: PINK, opacity: 0.5 }}>ラーメン</span>
        <div className="relative mx-auto max-w-2xl px-5">
          <h2 className="text-5xl font-extrabold leading-[1.05] md:text-6xl">Ready to get fluent?</h2>
          <p className="mt-5 text-lg text-white/70">Start your Japanese journey today.</p>
          <Link
            to={ROUTES.REGISTER}
            className="mt-8 inline-flex items-center gap-2 rounded-full px-9 py-4 text-base font-extrabold uppercase tracking-wide text-white shadow-2xl transition active:scale-95"
            style={{ background: CORAL }}
          >
            Get started for free <ArrowRight className="h-5 w-5" />
          </Link>
          <p className="mt-4 text-sm text-white/50">No credit card required</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#0c0723]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl font-jp text-lg text-white" style={{ background: CORAL }}>
                語
              </span>
              <span className="text-2xl font-extrabold text-white">JAP</span>
            </div>
            <p className="mt-4 text-sm text-white/50">Really learn Japanese — the fun way.</p>
          </div>
          {[
            { h: "Product", items: ["How it works", "Reviews", "Pricing", "Download"] },
            { h: "Learn", items: ["Decks", "Dictionary", "Review", "Grammar"] },
            { h: "Resources", items: ["Help center", "Getting started", "Community", "Contact"] },
          ].map((col) => (
            <div key={col.h}>
              <p className="text-sm font-extrabold uppercase tracking-wider text-white">{col.h}</p>
              <ul className="mt-4 space-y-2.5 text-sm text-white/60">
                {col.items.map((it) => (
                  <li key={it}><a href="#" className="hover:text-white">{it}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 py-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} JAP · 日本語学習. Made for learners.
        </div>
      </footer>
    </div>
  );
}
