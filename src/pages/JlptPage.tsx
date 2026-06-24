import { useState } from "react";
import { Link } from "react-router-dom";
import { useJlpt } from "@/features/jlpt/hooks/useJlpt";
import type { JlptLevelInfo } from "@/types/jlpt.types";

const STATUS_ACCENT: Record<string, string> = {
  Beginning: "text-ink-400",
  Developing: "text-amber-600",
  Approaching: "text-indigo-500",
  Ready: "text-emerald-600",
  "Exam Ready": "text-emerald-700",
};

function LevelCard({ l }: { l: JlptLevelInfo }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="paper-card px-5 py-4">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-center gap-3 text-left">
        <span className="w-8 shrink-0 text-sm font-bold text-ink-900">{l.level}</span>
        <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-indigo-50">
          <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-sakura-500" style={{ width: `${l.readiness}%` }} />
        </div>
        <span className="w-10 shrink-0 text-right text-sm font-semibold text-ink-900">{l.readiness}%</span>
        <span className={`w-24 shrink-0 text-right text-xs font-semibold ${STATUS_ACCENT[l.status] ?? "text-ink-400"}`}>{l.status}</span>
      </button>
      {open && (
        <div className="mt-3 grid grid-cols-2 gap-3 border-t border-line pt-3 text-xs sm:grid-cols-4">
          <div><p className="section-label">Vocabulary</p><p className="mt-0.5 text-sm text-ink-700">{l.vocabKnown}/{l.vocabTarget}</p></div>
          <div><p className="section-label">Grammar</p><p className="mt-0.5 text-sm text-ink-700">{l.grammarKnown}/{l.grammarTotal}</p></div>
          <div><p className="section-label">Retention</p><p className="mt-0.5 text-sm text-ink-700">{l.retention}%</p></div>
          <div><p className="section-label">Coverage</p><p className="mt-0.5 text-sm text-ink-700">{l.coverage}%</p></div>
          {l.weaknesses.length > 0 && (
            <div className="col-span-2 sm:col-span-4">
              <p className="section-label">Weaknesses</p>
              <p className="mt-0.5 text-sm text-amber-600">{l.weaknesses.join(" · ")}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function JlptPage() {
  const { data, isLoading, isError } = useJlpt();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-ink-900">JLPT Preparation</h1>
        <p className="mt-1 text-sm text-ink-400">Your readiness across every JLPT level.</p>
      </header>

      {isLoading && <p className="text-sm text-ink-400">Loading…</p>}
      {(isError || !data) && !isLoading && <p className="text-sm text-sakura-500">Couldn't load JLPT data.</p>}

      {data && (
        <div className="space-y-8">
          <section className="paper-card flex items-center justify-between px-6 py-5">
            <div>
              <p className="section-label">Current Level</p>
              <p className="mt-1 text-3xl font-bold text-indigo-500">{data.currentLevel}</p>
            </div>
            <div className="text-right">
              <p className="section-label">Readiness</p>
              <p className="mt-1 text-3xl font-bold text-ink-900">{data.readiness}%</p>
              <p className={`text-xs font-semibold ${STATUS_ACCENT[data.status] ?? "text-ink-400"}`}>{data.status}</p>
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="section-label">Levels</h2>
            {data.levels.map((l) => (
              <LevelCard key={l.level} l={l} />
            ))}
          </section>

          {data.recommendations.length > 0 && (
            <section className="space-y-3">
              <h2 className="section-label">Recommended Next Steps</h2>
              <ol className="paper-card space-y-2 px-5 py-4">
                {data.recommendations.map((r, i) => (
                  <li key={i} className="flex items-center justify-between gap-3">
                    <span className="flex gap-2 text-sm text-ink-700"><span className="font-semibold text-indigo-500">{i + 1}.</span>{r.text}</span>
                    <Link to={r.route} className="shrink-0 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-500 transition hover:bg-indigo-100">Go</Link>
                  </li>
                ))}
              </ol>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
