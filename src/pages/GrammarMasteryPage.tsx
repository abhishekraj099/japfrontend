import { Link } from "react-router-dom";
import { useGrammarMastery } from "@/features/grammar-library/hooks/useGrammarMastery";
import { StatCard } from "@/features/analytics/components/StatCard";
import { MetricGrid } from "@/features/analytics/components/MetricGrid";

export function GrammarMasteryPage() {
  const { data, isLoading, isError } = useGrammarMastery();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">Grammar Mastery</h1>
          <p className="mt-1 text-sm text-ink-400">Discovered, known, mastered, and missing grammar across JLPT levels.</p>
        </div>
        <Link to="/grammar" className="text-sm font-semibold text-indigo-500 hover:underline">← Library</Link>
      </header>

      {isLoading && <p className="text-sm text-ink-400">Loading mastery…</p>}
      {(isError || !data) && !isLoading && <p className="text-sm text-sakura-500">Couldn't load grammar mastery.</p>}

      {data && (
        <div className="space-y-8">
          <section className="space-y-3">
            <h2 className="section-label">Overview</h2>
            <MetricGrid cols={4}>
              <StatCard label="Discovered" value={`${data.totals.discovered}/${data.totals.total}`} accent="indigo" />
              <StatCard label="Known" value={data.totals.known} accent="emerald" />
              <StatCard label="Mastered" value={data.totals.mastered} accent="emerald" />
              <StatCard label="Missing" value={data.totals.missing} accent="sakura" />
            </MetricGrid>
          </section>

          <section className="space-y-3">
            <h2 className="section-label">JLPT Progress</h2>
            <div className="paper-card space-y-3 px-5 py-4">
              {data.jlptBreakdown.map((j) => (
                <div key={j.level}>
                  <div className="mb-1 flex items-baseline justify-between text-sm">
                    <span className="font-semibold text-ink-700">{j.level}</span>
                    <span className="text-xs text-ink-400">
                      {j.discovered}/{j.total} discovered · {j.mastered} mastered · {j.discoveredPct}%
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-indigo-50">
                    <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-sakura-500" style={{ width: `${j.discoveredPct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {data.recommendations.length > 0 && (
            <section className="space-y-3">
              <h2 className="section-label">Recommendations</h2>
              <ol className="paper-card space-y-2 px-5 py-4">
                {data.recommendations.map((r, i) => (
                  <li key={i} className="flex gap-2 text-sm text-ink-700">
                    <span className="font-semibold text-indigo-500">{i + 1}.</span>
                    {r}
                  </li>
                ))}
              </ol>
            </section>
          )}

          {data.missing.length > 0 && (
            <section className="space-y-3">
              <h2 className="section-label">Missing Patterns ({data.missing.length})</h2>
              <div className="flex flex-wrap gap-1.5">
                {data.missing.map((p) => (
                  <span key={p.id} className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs text-indigo-500" title={p.jlptLevel}>
                    <span className="font-jp">{p.name}</span> <span className="text-[10px] text-indigo-300">{p.jlptLevel}</span>
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
