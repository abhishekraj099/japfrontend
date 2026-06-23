import { Link } from "react-router-dom";
import {
  Check,
  ArrowRight,
  ShieldCheck,
  Puzzle,
  GraduationCap,
  RefreshCw,
  BookOpen,
  Volume2,
  FileDown,
  ExternalLink,
  Award,
} from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { PLANS, INCLUDED, inr, type Plan } from "@/constants/plans";
import { KStar } from "@/components/common/Kawaii";
import { useAuthContext } from "@/providers/AuthProvider";

const JLPT_URL = "https://www.jlpt.jp/e/";

const CORAL = "linear-gradient(135deg,#ff8a4c 0%,#ff4d6a 100%)";
const TEAL = "#1ad3b0";

const VALUE = [
  { icon: Puzzle, title: "Browser extension", desc: "Save words & sentences from any website you read or watch." },
  { icon: GraduationCap, title: "All in-app lessons", desc: "Structured decks, flashcards and spaced-repetition reviews." },
  { icon: RefreshCw, title: "Sync everywhere", desc: "Your progress stays in sync across the extension and the app." },
  { icon: FileDown, title: "Anki export", desc: "Send any saved card straight to Anki Desktop." },
  { icon: BookOpen, title: "Built-in dictionary", desc: "Readings, meanings, JLPT level and pitch accent in a tap." },
  { icon: Volume2, title: "Native + AI audio", desc: "Hear every word with native and text-to-speech audio." },
];

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={`relative flex flex-col rounded-3xl p-6 transition ${
        plan.highlight
          ? "scale-[1.02] bg-white/[0.07] ring-2 ring-[#ff6a4d]"
          : "bg-white/[0.04] ring-1 ring-white/10 hover:ring-white/20"
      }`}
    >
      {plan.badge && (
        <span
          className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-1 text-[11px] font-extrabold uppercase tracking-wide text-white shadow-lg"
          style={{ background: plan.highlight ? CORAL : "#1ad3b0" }}
        >
          {plan.badge}
        </span>
      )}

      <div className="flex items-baseline justify-between">
        <h3 className="font-display text-xl text-white">{plan.name}</h3>
        <span className="font-jp text-xs tracking-widest text-white/45">{plan.jp}</span>
      </div>

      <div className="mt-3 flex items-end gap-1.5">
        <span className="font-display text-4xl font-extrabold text-white">{inr(plan.price)}</span>
        <span className="mb-1 text-sm text-white/55">/ {plan.period.replace("per ", "").replace("one-time", "once")}</span>
      </div>
      <p className="mt-1 h-4 text-xs font-bold text-[#1ad3b0]">
        {plan.save ? `${plan.save} · ${plan.perMonth}` : plan.perMonth ?? ""}
      </p>

      <p className="mt-4 text-sm text-white/60">Everything in JAP Pro — extension + app, fully unlocked.</p>
      <p className="mt-2 text-xs font-semibold text-white/55">
        Free for 1 day, then {inr(plan.price)} · cancel anytime
      </p>

      <Link
        to={`${ROUTES.CHECKOUT}?plan=${plan.id}`}
        className={`mt-5 flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-extrabold transition active:scale-95 ${
          plan.highlight ? "text-white shadow-lg" : "bg-white/10 text-white ring-1 ring-white/15 hover:bg-white/15"
        }`}
        style={plan.highlight ? { background: CORAL } : undefined}
      >
        Start free trial <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

export function PricingPage() {
  const { user } = useAuthContext();
  return (
    <div className="min-h-screen overflow-hidden text-white" style={{ background: "linear-gradient(180deg,#1a1147 0%,#130b35 45%,#0e0828 100%)" }}>
      {/* nav */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#140b38]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link to={user ? ROUTES.DASHBOARD : "/"} className="flex items-center gap-2" style={{ perspective: "600px" }}>
            <span className="logo-spin flex h-9 w-9 items-center justify-center rounded-xl font-jp text-lg text-white" style={{ background: CORAL }}>語</span>
            <span className="text-2xl font-extrabold tracking-tight text-white">JAP</span>
          </Link>
          <div className="flex items-center gap-3">
            {user ? (
              <Link to={ROUTES.DASHBOARD} className="rounded-full px-5 py-2.5 text-sm font-extrabold uppercase tracking-wide text-white shadow-lg" style={{ background: CORAL }}>
                Go to app
              </Link>
            ) : (
              <>
                <Link to={ROUTES.LOGIN} className="hidden text-sm font-bold text-white/70 hover:text-white sm:block">Log in</Link>
                <Link to={ROUTES.REGISTER} className="rounded-full px-5 py-2.5 text-sm font-extrabold uppercase tracking-wide text-white shadow-lg" style={{ background: CORAL }}>
                  Get started
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* hero */}
      <section className="relative py-16 text-center">
        <KStar className="absolute left-[20%] top-12 h-5 w-5" />
        <KStar className="absolute right-[24%] top-16 h-4 w-4" color={TEAL} />
        <div className="mx-auto max-w-2xl px-5">
          <span className="font-jp inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-extrabold tracking-wide text-white/80">
            料金 · Pricing
          </span>
          <h1 className="mt-5 text-5xl font-extrabold leading-tight md:text-6xl">
            One plan,{" "}
            <span className="relative">
              everything
              <span className="absolute -bottom-1 left-0 h-1.5 w-full rounded-full" style={{ background: "#ff3d8b" }} />
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-lg text-white/70">
            The browser extension <span className="text-white">and</span> the full app — all lessons,
            dictionary, reviews and Anki sync — combined in one subscription.
          </p>
        </div>
      </section>

      {/* what you get */}
      <section className="px-5 pb-4">
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {VALUE.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl bg-white/[0.04] p-5 ring-1 ring-white/10">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl" style={{ background: "rgba(26,211,176,0.15)", color: TEAL }}>
                <Icon className="h-5 w-5" />
              </span>
              <p className="font-display mt-3 text-lg text-white">{title}</p>
              <p className="mt-1 text-sm text-white/60">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* plans */}
      <section className="px-5 py-14">
        <h2 className="font-display mb-10 text-center text-3xl font-extrabold">Pick your length</h2>
        <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-3">
          {PLANS.map((p) => (
            <PlanCard key={p.id} plan={p} />
          ))}
        </div>

        {/* included strip */}
        <div className="mx-auto mt-10 max-w-3xl rounded-3xl bg-white/[0.04] p-6 ring-1 ring-white/10">
          <p className="text-xs font-extrabold uppercase tracking-wide text-white/45">Every plan includes</p>
          <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {INCLUDED.map((f) => (
              <p key={f} className="flex items-start gap-2 text-sm text-white/80">
                <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: TEAL }} strokeWidth={3} />
                {f}
              </p>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-8 flex max-w-md items-center justify-center gap-2 text-center text-sm text-white/50">
          <ShieldCheck className="h-4 w-4" style={{ color: TEAL }} />
          Try free for 1 day · card required · cancel anytime before you're billed.
        </p>
      </section>

      {/* JLPT certification */}
      <section className="px-5 pb-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 rounded-3xl bg-white/[0.04] p-7 text-center ring-1 ring-white/10 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl" style={{ background: "rgba(255,106,77,0.15)", color: "#ff8a4c" }}>
              <Award className="h-7 w-7" />
            </span>
            <div>
              <p className="font-jp text-xs font-bold tracking-widest text-white/45">日本語能力試験 · JLPT</p>
              <h3 className="font-display mt-1 text-2xl text-white">Aiming for a JLPT certificate?</h3>
              <p className="mt-1 max-w-md text-sm text-white/65">
                JAP tags vocab & grammar by JLPT level (N5–N1) to get you exam-ready. Check official
                dates, locations and registration on the JLPT site.
              </p>
            </div>
          </div>
          <a
            href={JLPT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-bold text-white ring-1 ring-white/15 transition hover:bg-white/15"
          >
            Official JLPT site <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* footer */}
      <footer className="border-t border-white/10 py-8 text-center text-sm text-white/45">
        <Link to="/" className="font-bold text-white/70 hover:text-white">← Back to home</Link>
        <p className="mt-3 text-xs text-white/30">© {new Date().getFullYear()} JAP · 日本語学習</p>
      </footer>
    </div>
  );
}
