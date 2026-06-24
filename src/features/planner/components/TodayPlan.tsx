import { Link } from "react-router-dom";
import { useTodayPlan } from "../hooks/useTodayPlan";

function scoreColor(s: number) {
  if (s >= 80) return "text-emerald-600";
  if (s >= 60) return "text-indigo-500";
  if (s >= 40) return "text-amber-600";
  return "text-sakura-500";
}

export function TodayPlan() {
  const { data, isLoading, isError } = useTodayPlan();
  if (isLoading || isError || !data) return null;

  return (
    <section className="paper-card space-y-4 px-5 py-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-ink-900">Today's Plan</h2>
        <div className="text-right">
          <span className={`text-2xl font-bold ${scoreColor(data.dailyScore)}`}>{data.dailyScore}</span>
          <span className="ml-1 text-xs text-ink-400">daily score</span>
        </div>
      </div>

      {/* Recommended + estimate */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-indigo-50 px-4 py-3">
        <div>
          <p className="section-label text-indigo-400">Recommended</p>
          <p className="mt-0.5 text-sm font-semibold text-ink-800">{data.recommended.text}</p>
          <p className="text-xs text-ink-400">~{data.estimates.total.minutes} min total today</p>
        </div>
        <Link to={data.recommended.route} className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-600">
          Start
        </Link>
      </div>

      {/* Priority queue */}
      {data.priorities.length > 0 && (
        <div className="space-y-1.5">
          <p className="section-label">Priorities</p>
          {data.priorities.map((p, i) => (
            <Link key={p.key} to={p.route} className="flex items-center justify-between rounded-lg border border-line px-3 py-1.5 text-sm transition hover:border-indigo-200 hover:bg-indigo-50/40">
              <span className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-400">{i + 1}</span>
                <span className="text-ink-700">{p.label}</span>
              </span>
              <span className="text-xs text-ink-400">~{p.minutes} min →</span>
            </Link>
          ))}
        </div>
      )}

      {/* Session presets */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        {([["Quick", data.sessions.quick], ["Standard", data.sessions.standard], ["Deep", data.sessions.deep]] as const).map(([label, s]) => (
          <Link key={label} to="/review" className="rounded-lg border border-line py-2 transition hover:border-indigo-200 hover:bg-indigo-50/40">
            <p className="font-semibold text-ink-700">{label}</p>
            <p className="text-ink-400">~{s.minutes} min</p>
            <p className="text-[10px] text-ink-400">{s.reviewTarget} rev · {s.grammarTarget} gram</p>
          </Link>
        ))}
      </div>

      {/* Quick start */}
      <div className="flex flex-wrap gap-2">
        {data.quickStart.map((q) => (
          <Link key={q.label} to={q.route} className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-200">
            {q.label}{q.count > 0 ? ` (${q.count})` : ""}
          </Link>
        ))}
      </div>
    </section>
  );
}
