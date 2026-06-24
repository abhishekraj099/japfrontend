import { Link } from "react-router-dom";
import { useWeakPoints } from "../hooks/useWeakPoints";
import type { WeakItem, JlptWeakRow, FreqWeakRow } from "@/types/weakpoint.types";

function fmt(p: number | null) {
  return p == null ? "—" : `${p}%`;
}

function FocusButton({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center rounded-lg bg-indigo-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-indigo-600"
    >
      ▶ {children}
    </Link>
  );
}

function TargetRow({ it }: { it: WeakItem }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-line py-1.5 last:border-0">
      <div className="flex min-w-0 items-center gap-2">
        <span className="font-jp text-sm text-ink-900 truncate">{it.label}</span>
        {it.jlptLevel && <span className="rounded bg-indigo-50 px-1.5 text-[10px] font-bold text-indigo-500">{it.jlptLevel}</span>}
        {it.cardType === "grammar" && <span className="rounded bg-emerald-50 px-1.5 text-[10px] font-semibold text-emerald-600">G</span>}
      </div>
      <span className="shrink-0 text-xs text-ink-400">
        {it.fails} miss · {fmt(it.retentionPct)}
      </span>
    </div>
  );
}

export function WeakPoints() {
  const { data, isLoading, isError } = useWeakPoints();
  if (isLoading) return <p className="text-sm text-ink-400">Analyzing weak points…</p>;
  if (isError || !data) return <p className="text-sm text-sakura-500">Couldn't load weak points.</p>;

  const { recommendations: rec, jlpt, frequency } = data;

  return (
    <div className="space-y-6">
      {/* Coach messages */}
      <div className="paper-card space-y-2 px-5 py-4">
        <h3 className="section-label">Coaching</h3>
        <ul className="space-y-1.5">
          {rec.messages.map((m, i) => (
            <li key={i} className="flex gap-2 text-sm text-ink-700">
              <span className="text-sakura-500">▸</span>
              {m}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2 pt-1">
          <FocusButton to="/review?focus=weak-vocab">Review Weak Vocabulary</FocusButton>
          <FocusButton to="/review?focus=weak-grammar">Review Weak Grammar</FocusButton>
          <FocusButton to="/review?focus=top-failures">Review Top Failures</FocusButton>
          {rec.weakestJlpt && <FocusButton to={`/review?focus=jlpt&jlpt=${rec.weakestJlpt.level}`}>Review {rec.weakestJlpt.level}</FocusButton>}
          <FocusButton to="/review?focus=frequency&band=top1k">Review Top 1000</FocusButton>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Top review targets */}
        <div className="paper-card px-5 py-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="section-label">Top Review Targets</h3>
            {rec.topReviewTargets.length > 0 && <FocusButton to="/review?focus=top-failures">Review</FocusButton>}
          </div>
          {rec.topReviewTargets.length ? (
            rec.topReviewTargets.map((it) => <TargetRow key={it.id} it={it} />)
          ) : (
            <p className="text-xs text-ink-400">No weak items yet.</p>
          )}
        </div>

        {/* JLPT table */}
        <div className="paper-card px-5 py-4">
          <h3 className="section-label mb-2">JLPT Retention</h3>
          <table className="w-full text-xs">
            <thead>
              <tr className="text-ink-400">
                <th className="text-left font-medium">Level</th>
                <th className="text-right font-medium">Saved</th>
                <th className="text-right font-medium">Known</th>
                <th className="text-right font-medium">Retention</th>
                <th className="text-right font-medium">Fail</th>
              </tr>
            </thead>
            <tbody>
              {jlpt.map((r: JlptWeakRow) => (
                <tr key={r.level} className={rec.weakestJlpt?.level === r.level ? "font-semibold text-sakura-500" : "text-ink-700"}>
                  <td className="py-1 text-left">{r.level}</td>
                  <td className="text-right">{r.saved}</td>
                  <td className="text-right">{r.known}</td>
                  <td className="text-right">{fmt(r.retentionPct)}</td>
                  <td className="text-right">{fmt(r.failurePct)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Frequency table */}
        <div className="paper-card px-5 py-4">
          <h3 className="section-label mb-2">Frequency Bands</h3>
          <table className="w-full text-xs">
            <thead>
              <tr className="text-ink-400">
                <th className="text-left font-medium">Band</th>
                <th className="text-right font-medium">Reviews</th>
                <th className="text-right font-medium">Retention</th>
                <th className="text-right font-medium">Fail</th>
              </tr>
            </thead>
            <tbody>
              {frequency.map((r: FreqWeakRow) => (
                <tr key={r.band} className={rec.weakestFrequencyBand?.band === r.band ? "font-semibold text-sakura-500" : "text-ink-700"}>
                  <td className="py-1 text-left">{r.band}</td>
                  <td className="text-right">{r.reviews}</td>
                  <td className="text-right">{fmt(r.retentionPct)}</td>
                  <td className="text-right">{fmt(r.failurePct)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Weakest grammar */}
        <div className="paper-card px-5 py-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="section-label">Weakest Grammar</h3>
            {data.grammar.mostFailed.length > 0 && <FocusButton to="/review?focus=weak-grammar">Review</FocusButton>}
          </div>
          {data.grammar.mostFailed.length ? (
            data.grammar.mostFailed.map((it) => <TargetRow key={it.id} it={{ ...it, cardType: "grammar" }} />)
          ) : (
            <p className="text-xs text-ink-400">No grammar review data yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
