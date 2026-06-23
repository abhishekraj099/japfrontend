import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Check, Lock, ArrowLeft, ShieldCheck, PartyPopper } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { planById, INCLUDED, inr } from "@/constants/plans";
import { Confetti } from "@/components/common/Confetti";
import { useAuthContext } from "@/providers/AuthProvider";

const CORAL = "linear-gradient(135deg,#ff8a4c 0%,#ff4d6a 100%)";
const TEAL = "#1ad3b0";

function field(v: string) {
  return v.trim().length > 0;
}

export function CheckoutPage() {
  const [params] = useSearchParams();
  const plan = planById(params.get("plan"));
  const { user } = useAuthContext();

  const [email, setEmail] = useState(user?.email ?? "");
  const [name, setName] = useState("");
  const [card, setCard] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");
  const [method, setMethod] = useState<"card" | "upi">("card");
  const [upi, setUpi] = useState("");
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  const tax = Math.round(plan.price * 0.18);
  const total = plan.price + tax;
  const trialEnd = new Date(Date.now() + 86_400_000).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const valid =
    field(email) &&
    (method === "card"
      ? field(name) && card.replace(/\s/g, "").length >= 12 && field(exp) && cvc.length >= 3
      : field(upi));

  const pay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setDone(true);
    }, 1300);
  };

  const fmtCard = (v: string) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const fmtExp = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  if (done) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center px-5 text-center text-white" style={{ background: "linear-gradient(180deg,#1a1147 0%,#0e0828 100%)" }}>
        <div className="relative">
          <Confetti count={40} />
          <span className="flex h-20 w-20 items-center justify-center rounded-3xl text-white shadow-2xl" style={{ background: CORAL }}>
            <PartyPopper className="h-10 w-10" />
          </span>
        </div>
        <h1 className="font-display mt-6 text-4xl font-extrabold">Your free trial has started! 🎉</h1>
        <p className="mt-3 max-w-md text-white/70">
          Everything is unlocked — the browser extension and all in-app lessons, free for 1 day.
          You won't be charged until <span className="font-bold text-white">{trialEnd}</span>
          {" "}({plan.name} · {inr(total)}), and you can cancel anytime before then.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to={ROUTES.DASHBOARD} className="rounded-full px-7 py-3.5 text-sm font-extrabold text-white shadow-lg" style={{ background: CORAL }}>
            Go to dashboard
          </Link>
          <a href="#" className="rounded-full bg-white/10 px-6 py-3.5 text-sm font-bold text-white ring-1 ring-white/15 hover:bg-white/15">
            Get the extension
          </a>
        </div>
        <p className="mt-6 text-xs text-white/40">A receipt has been sent to {email || "your email"}.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white" style={{ background: "linear-gradient(180deg,#1a1147 0%,#130b35 45%,#0e0828 100%)" }}>
      <header className="border-b border-white/10">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
          <Link to={ROUTES.PRICING} className="flex items-center gap-2 text-sm font-bold text-white/70 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Back to plans
          </Link>
          <span className="flex items-center gap-1.5 text-xs font-semibold text-white/50">
            <Lock className="h-3.5 w-3.5" /> Secure checkout
          </span>
        </div>
      </header>

      <div className="mx-auto grid max-w-5xl gap-8 px-5 py-12 lg:grid-cols-[1fr_360px]">
        {/* payment form */}
        <form onSubmit={pay} className="order-2 lg:order-1">
          <h1 className="font-display text-3xl font-extrabold">Checkout</h1>
          <p className="mt-1 text-white/60">Complete your purchase to unlock everything.</p>

          {/* method tabs */}
          <div className="mt-6 inline-flex rounded-full bg-white/5 p-1 ring-1 ring-white/10">
            {(["card", "upi"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMethod(m)}
                className={`rounded-full px-5 py-2 text-sm font-bold capitalize transition ${method === m ? "bg-white text-[#1a1147]" : "text-white/60 hover:text-white"}`}
              >
                {m === "card" ? "Card" : "UPI"}
              </button>
            ))}
          </div>

          <div className="mt-5 space-y-4">
            <Field label="Email" value={email} onChange={setEmail} placeholder="you@example.com" type="email" />

            {method === "card" ? (
              <>
                <Field label="Name on card" value={name} onChange={setName} placeholder="RhyMelloKids" />
                <Field label="Card number" value={card} onChange={(v) => setCard(fmtCard(v))} placeholder="1234 5678 9012 3456" />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Expiry" value={exp} onChange={(v) => setExp(fmtExp(v))} placeholder="MM/YY" />
                  <Field label="CVC" value={cvc} onChange={(v) => setCvc(v.replace(/\D/g, "").slice(0, 4))} placeholder="123" />
                </div>
              </>
            ) : (
              <Field label="UPI ID" value={upi} onChange={setUpi} placeholder="name@bank" />
            )}
          </div>

          <button
            type="submit"
            disabled={!valid || processing}
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-base font-extrabold text-white shadow-xl transition active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
            style={{ background: CORAL }}
          >
            {processing ? "Starting…" : "Start 1-day free trial"}
          </button>
          <p className="mt-3 flex items-start justify-center gap-1.5 px-2 text-center text-xs text-white/55">
            <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: TEAL }} />
            You won't be charged today. After your <b className="text-white/80">1-day free trial</b>, {inr(total)} renews
            automatically on {trialEnd}. Cancel anytime before then.
          </p>
        </form>

        {/* order summary */}
        <aside className="order-1 h-fit rounded-3xl bg-white/[0.05] p-6 ring-1 ring-white/10 lg:order-2 lg:sticky lg:top-12">
          <p className="text-xs font-extrabold uppercase tracking-wide text-white/45">Order summary</p>
          <div className="mt-3 flex items-center justify-between">
            <div>
              <p className="font-jp text-xs text-white/50">{plan.jp}</p>
              <p className="font-display text-xl">JAP Pro · {plan.name}</p>
              <p className="text-xs text-white/50">Extension + App · {plan.period}</p>
            </div>
            <p className="font-display text-2xl font-extrabold">{inr(plan.price)}</p>
          </div>

          <ul className="mt-5 space-y-2 border-t border-white/10 pt-5">
            {INCLUDED.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-white/75">
                <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: TEAL }} strokeWidth={3} />
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-5 space-y-2 border-t border-white/10 pt-4 text-sm">
            <div className="flex items-center justify-between rounded-xl px-3 py-2" style={{ background: "rgba(26,211,176,0.12)", color: TEAL }}>
              <span className="font-extrabold">Free for 1 day</span>
              <span className="font-extrabold">₹0 today</span>
            </div>
            <Row k="Plan" v={inr(plan.price)} />
            <Row k="GST (18%)" v={inr(tax)} />
            <div className="flex items-center justify-between pt-1 text-[15px] font-extrabold text-white">
              <span>Then on {trialEnd}</span>
              <span>{inr(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-white/55">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[15px] text-white outline-none transition placeholder:text-white/30 focus:border-[#ff6a4d] focus:ring-2 focus:ring-[#ff6a4d]/30"
      />
    </label>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between text-white/60">
      <span>{k}</span>
      <span>{v}</span>
    </div>
  );
}
