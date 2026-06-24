import { useState } from "react";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useDeckIntelligence } from "../hooks/useDeckIntelligence";
import { cardService } from "@/services/card.service";
import { suspendedIds, isSuspended, suspend, unsuspend } from "../lib/leechSuspension";

const MATURITY_COLORS: Record<string, string> = {
  new: "bg-ink-300",
  learning: "bg-amber-400",
  known: "bg-sky-400",
  mature: "bg-indigo-500",
  mastered: "bg-emerald-500",
};
const MATURITY_ORDER = ["new", "learning", "known", "mature", "mastered"] as const;

function healthColor(h: number) {
  if (h >= 80) return "text-emerald-600";
  if (h >= 60) return "text-indigo-500";
  if (h >= 40) return "text-amber-600";
  return "text-sakura-500";
}

export function DeckIntelligencePanel({ deckId }: { deckId: string }) {
  const { data, isLoading, isError } = useDeckIntelligence(deckId);
  const qc = useQueryClient();
  const [, force] = useState(0);
  if (isLoading || isError || !data || data.totalCards === 0) return null;

  const reviewLeechesHref = () => {
    const ex = suspendedIds();
    return `/review?focus=leeches${ex.length ? `&exclude=${ex.join(",")}` : ""}`;
  };
  const onReset = async (id: string) => {
    await cardService.reset(id);
    qc.invalidateQueries({ queryKey: ["decks", deckId, "intelligence"] });
  };
  const toggleSuspend = (id: string) => {
    isSuspended(id) ? unsuspend(id) : suspend(id, 7); // 7-day temporary suspension
    force((n) => n + 1);
  };

  const m = data.maturity;
  const totalMat = MATURITY_ORDER.reduce((s, k) => s + m[k], 0) || 1;

  return (
    <section className="paper-card space-y-4 px-5 py-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-ink-900">Deck Intelligence</h2>
        <span className={`text-2xl font-bold ${healthColor(data.health)}`}>{data.health}<span className="text-xs text-ink-400"> health</span></span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
        <div><p className="section-label">Difficulty</p><p className="mt-0.5 font-semibold text-ink-700">{data.difficulty.band}</p></div>
        <div><p className="section-label">Retention</p><p className="mt-0.5 font-semibold text-ink-700">{data.retention}%</p></div>
        <div><p className="section-label">Overdue</p><p className="mt-0.5 font-semibold text-ink-700">{data.overdue}</p></div>
        <div><p className="section-label">Leeches</p><p className="mt-0.5 font-semibold text-ink-700">{data.leeches.length}</p></div>
      </div>

      {/* Maturity stacked bar */}
      <div>
        <p className="section-label mb-1">Maturity</p>
        <div className="flex h-3 w-full overflow-hidden rounded-full">
          {MATURITY_ORDER.map((k) => m[k] > 0 && (
            <div key={k} className={MATURITY_COLORS[k]} style={{ width: `${(m[k] / totalMat) * 100}%` }} title={`${k}: ${m[k]}`} />
          ))}
        </div>
        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-[10px] text-ink-400">
          {MATURITY_ORDER.map((k) => (
            <span key={k}><span className={`mr-1 inline-block h-2 w-2 rounded-full ${MATURITY_COLORS[k]}`} />{k} {m[k]}</span>
          ))}
        </div>
      </div>

      {/* Forecast */}
      <div className="grid grid-cols-3 gap-3 text-center text-sm">
        <div className="rounded-lg bg-indigo-50 py-2"><p className="text-lg font-bold text-indigo-500">{data.forecast.tomorrow}</p><p className="text-[10px] text-ink-400">Tomorrow</p></div>
        <div className="rounded-lg bg-indigo-50 py-2"><p className="text-lg font-bold text-indigo-500">{data.forecast.sevenDays}</p><p className="text-[10px] text-ink-400">7 days</p></div>
        <div className="rounded-lg bg-indigo-50 py-2"><p className="text-lg font-bold text-indigo-500">{data.forecast.thirtyDays}</p><p className="text-[10px] text-ink-400">30 days</p></div>
      </div>

      {data.leeches.length > 0 && (
        <div>
          <div className="mb-1 flex items-center justify-between">
            <p className="section-label">Leeches ({data.leeches.length})</p>
            <Link to={reviewLeechesHref()} className="rounded-lg bg-sakura-500 px-2.5 py-1 text-xs font-semibold text-white hover:bg-sakura-600">
              ▶ Review Leeches
            </Link>
          </div>
          <div className="space-y-1.5">
            {data.leeches.map((l) => {
              const susp = isSuspended(l.id);
              return (
                <div key={l.id} className={`flex flex-wrap items-center justify-between gap-2 rounded-lg border border-line px-2.5 py-1.5 text-xs ${susp ? "opacity-50" : ""}`}>
                  <div className="min-w-0">
                    <span className="font-jp text-ink-700">{l.word}</span>
                    {susp && <span className="ml-2 rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500">suspended</span>}
                    <span className="ml-2 text-ink-400">{l.failCount} fails · {l.retention}% · {l.reviewCount} reviews</span>
                  </div>
                  <div className="flex shrink-0 gap-1.5">
                    <button onClick={() => toggleSuspend(l.id)} className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600 hover:bg-slate-200">
                      {susp ? "Unsuspend" : "Suspend"}
                    </button>
                    <button onClick={() => onReset(l.id)} className="rounded bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700 hover:bg-amber-100">
                      Reset
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-1 text-[10px] text-ink-400">Suspend hides a leech from Focus Leech Reviews for 7 days (local only). Reset returns it to “new” without changing difficulty.</p>
        </div>
      )}

      {data.recommendations.length > 0 && (
        <ul className="space-y-1 border-t border-line pt-3">
          {data.recommendations.map((r, i) => (
            <li key={i} className="flex gap-2 text-sm text-ink-700"><span className="text-sakura-500">▸</span>{r}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
