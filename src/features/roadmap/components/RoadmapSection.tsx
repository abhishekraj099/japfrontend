import { Link } from "react-router-dom";
import { useRoadmap } from "../hooks/useRoadmap";

export function RoadmapSection() {
  const { data, isLoading, isError } = useRoadmap();
  if (isLoading || isError || !data) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-bold text-ink-900">Learning Roadmap</h2>

      {/* Current level + progress */}
      <div className="paper-card px-5 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="rounded-lg bg-indigo-500 px-2.5 py-1 text-sm font-bold text-white">{data.currentLevel}</span>
            {data.nextLevel && <span className="text-xs text-ink-400">→ {data.nextLevel}</span>}
          </div>
          <span className="text-xs text-ink-400">{data.progressToNext}%{data.nextLevel ? ` to ${data.nextLevel}` : " — top level"}</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-indigo-50">
          <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-sakura-500" style={{ width: `${data.progressToNext}%` }} />
        </div>
        <p className="mt-2 text-xs text-ink-400">
          {data.knownWords} known · {data.savedWords} saved · {data.grammarSaved} grammar
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {data.strengths.length > 0 && (
          <div className="paper-card px-5 py-4">
            <h3 className="section-label mb-2">Strengths</h3>
            <ul className="space-y-1">
              {data.strengths.map((s, i) => (
                <li key={i} className="flex gap-2 text-sm text-ink-700"><span className="text-emerald-600">✓</span>{s}</li>
              ))}
            </ul>
          </div>
        )}
        {data.weaknesses.length > 0 && (
          <div className="paper-card px-5 py-4">
            <h3 className="section-label mb-2">Weaknesses</h3>
            <ul className="space-y-1">
              {data.weaknesses.map((w, i) => (
                <li key={i} className="flex gap-2 text-sm text-ink-700"><span className="text-amber-600">⚠</span>{w}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {data.recommendations.length > 0 && (
        <div className="paper-card px-5 py-4">
          <h3 className="section-label mb-2">Recommended Next Steps</h3>
          <ol className="space-y-2">
            {data.recommendations.map((r, i) => (
              <li key={i} className="flex items-center justify-between gap-3">
                <span className="flex gap-2 text-sm text-ink-700">
                  <span className="font-semibold text-indigo-500">{i + 1}.</span>
                  {r.text}
                </span>
                <Link to={r.route} className="shrink-0 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-500 transition hover:bg-indigo-100">
                  Go
                </Link>
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}
