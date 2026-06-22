import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Volume2 } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { Mascot, Onigiri, Sakura, Torii, Lantern, KStar } from "@/components/common/Kawaii";

const CORAL = "linear-gradient(135deg,#ff8a4c 0%,#ff4d6a 100%)";
const TEAL = "#1ad3b0";
const PINK = "#ff3d8b";
const VIOLET = "#7c5cff";

/* count a number up from 0 (restarts on mount) */
function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<number>(0);
  useEffect(() => {
    const start = performance.now();
    const dur = 900;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) ref.current = requestAnimationFrame(tick);
    };
    ref.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(ref.current);
  }, [to]);
  return <>{n}{suffix}</>;
}

const STEPS = [
  {
    n: "STEP 1",
    eyebrow: "START HERE",
    title: "Learn the most common words",
    body: "Master the words and grammar that make up 80%+ of everyday Japanese — and feel real progress from day one.",
    visual: "card" as const,
  },
  {
    n: "STEP 2",
    eyebrow: "THE FUN PART",
    title: "Turn anything into flashcards",
    body: "Save words from anything you read or watch, with reading, native audio and the sentence they came from.",
    visual: "mascot" as const,
  },
  {
    n: "STEP 3",
    eyebrow: "NEVER FORGET",
    title: "Review a little, every day",
    body: "Spaced repetition shows each card at the perfect moment, so words stick in long-term memory for good.",
    visual: "stats" as const,
  },
];

function Visual({ kind }: { kind: "card" | "mascot" | "stats" }) {
  if (kind === "card")
    return (
      <div className="rounded-3xl bg-white p-6 text-center shadow-2xl" style={{ width: 240, transform: "rotate(-5deg)" }}>
        <div className="mb-3 flex items-center justify-between">
          <span className="rounded-full px-2 py-0.5 text-[10px] font-extrabold" style={{ background: "#eef0ff", color: VIOLET }}>VOCAB</span>
          <span className="font-jp text-[11px] text-slate-400">N5</span>
        </div>
        <p className="font-jp text-5xl font-bold text-slate-900">勉強</p>
        <p className="font-jp mt-1 text-sm text-slate-400">べんきょう</p>
        <div className="mt-3 flex items-center justify-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full" style={{ background: "#eef0ff", color: VIOLET }}><Volume2 className="h-3.5 w-3.5" /></span>
          <span className="text-sm font-bold text-slate-900">to study</span>
        </div>
      </div>
    );
  if (kind === "mascot")
    return (
      <div className="relative">
        <div className="rounded-3xl bg-white p-5 shadow-2xl" style={{ width: 200, transform: "rotate(6deg)" }}>
          <p className="font-jp text-center text-4xl font-bold text-slate-900">神秘</p>
          <p className="font-jp mt-1 text-center text-xs text-slate-400">しんぴ · mystery</p>
        </div>
        <Mascot className="absolute -bottom-6 -left-8 h-28 w-28" />
      </div>
    );
  return (
    <div className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur" style={{ width: 250 }}>
      <p className="text-sm font-extrabold" style={{ color: TEAL }}>Very good · <CountUp to={92} suffix="%" /></p>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[10px] text-white/70">
        <div className="rounded-lg bg-white/10 p-2"><p className="text-lg font-extrabold text-white"><CountUp to={61} /></p>known</div>
        <div className="rounded-lg bg-white/10 p-2"><p className="text-lg font-extrabold text-white"><CountUp to={22} /></p>learning</div>
        <div className="rounded-lg bg-white/10 p-2"><p className="text-lg font-extrabold text-white"><CountUp to={5} /></p>new</div>
      </div>
    </div>
  );
}

export function AuthLayout() {
  const [active, setActive] = useState(0);
  const { pathname } = useLocation();
  const isLogin = pathname.includes("login");

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % STEPS.length), 4000);
    return () => clearInterval(id);
  }, []);

  const step = STEPS[active];

  return (
    <div className="flex min-h-screen flex-col" style={{ background: "linear-gradient(180deg,#130c34 0%,#0e0828 100%)" }}>
      {/* top bar — like home */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#140b38]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl font-jp text-lg text-white" style={{ background: CORAL }}>語</span>
            <span className="text-2xl font-extrabold tracking-tight" style={{ background: CORAL, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>JAP</span>
          </Link>
          <div className="flex items-center gap-3 text-sm font-bold">
            <Link to="/" className="hidden text-white/70 hover:text-white sm:block">← Home</Link>
            <Link
              to={isLogin ? ROUTES.REGISTER : ROUTES.LOGIN}
              className="sheen rounded-full px-5 py-2.5 uppercase tracking-wide text-white shadow-lg transition active:scale-95"
              style={{ background: CORAL }}
            >
              {isLogin ? "Sign up" : "Log in"}
            </Link>
          </div>
        </div>
      </header>

      <div className="grid flex-1 lg:grid-cols-2">
        {/* LEFT: step showcase */}
        <div className="relative hidden flex-col justify-between overflow-hidden p-12 lg:flex" style={{ background: "linear-gradient(160deg,#1f1452 0%,#16103f 55%,#241466 100%)" }}>
          {/* animated aurora glows */}
          <div aria-hidden className="aurora pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,106,77,0.3), transparent 70%)" }} />
          <div aria-hidden className="aurora pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full" style={{ background: "radial-gradient(circle, rgba(26,211,176,0.25), transparent 70%)", animationDelay: "-7s" }} />

          <KStar className="twinkle2 absolute left-16 top-12 h-6 w-6" />
          <KStar className="twinkle2 absolute right-24 top-24 h-4 w-4" color={TEAL} />
          <KStar className="twinkle2 absolute left-1/2 bottom-32 h-5 w-5" color={PINK} />
          <Sakura className="float-soft absolute right-16 top-12 h-12 w-12" style={{ ["--rot" as string]: "12deg" }} />
          <Torii className="float-soft absolute left-10 bottom-44 h-14 w-14 opacity-80" style={{ animationDelay: "-1.5s" }} />
          <Onigiri className="float-soft absolute right-12 bottom-48 h-14 w-14" style={{ ["--rot" as string]: "-12deg", animationDelay: "-2.5s" }} />
          <Lantern className="float-soft absolute left-28 top-1/2 h-14 w-14 opacity-80" style={{ animationDelay: "-3.5s" }} />

          <p className="relative text-sm font-extrabold uppercase tracking-wide text-white/50">How JAP works</p>

          {/* rotating step */}
          <div key={active} className="step-in relative flex flex-1 flex-col justify-center">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-white px-4 py-1.5 text-xs font-extrabold" style={{ color: VIOLET }}>{step.n}</span>
              <span className="text-xs font-extrabold uppercase tracking-wide" style={{ color: PINK }}>{step.eyebrow}</span>
            </div>
            <h2 className="mt-4 max-w-sm text-4xl font-extrabold leading-tight text-white">{step.title}</h2>
            <p className="mt-3 max-w-sm text-lg text-white/70">{step.body}</p>
            <div className="float-soft mt-8"><Visual kind={step.visual} /></div>
          </div>

          {/* progress dots */}
          <div className="relative flex items-center gap-2">
            {STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Step ${i + 1}`}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: i === active ? 28 : 8,
                  background: i === active ? "#ff6a4d" : "rgba(255,255,255,0.25)",
                  boxShadow: i === active ? "0 0 14px rgba(255,106,77,0.8)" : "none",
                }}
              />
            ))}
          </div>
        </div>

        {/* RIGHT: form */}
        <div className="relative flex items-center justify-center px-5 py-12">
          <div className="w-full max-w-sm">
            <div className="mb-8 flex flex-col items-center text-center lg:hidden">
              <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl font-jp text-2xl text-white shadow-lg" style={{ background: CORAL }}>語</span>
              <h1 className="text-2xl font-extrabold text-white">JAP</h1>
              <p className="font-jp mt-1 text-sm text-white/50">日本語学習</p>
            </div>
            <div className="paper-card p-8">
              <Outlet />
            </div>
            <p className="mt-6 text-center font-jp text-[11px] tracking-[0.3em] text-white/30">継続は力なり</p>
          </div>
        </div>
      </div>
    </div>
  );
}
