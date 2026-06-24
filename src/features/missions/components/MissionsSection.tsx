import { Link } from "react-router-dom";
import { useMissions } from "../hooks/useMissions";
import type { Mission } from "@/types/mission.types";

const CATEGORY_ACCENT: Record<string, string> = {
  Review: "bg-indigo-500",
  Weakness: "bg-sakura-500",
  JLPT: "bg-amber-500",
  Grammar: "bg-emerald-500",
  Coverage: "bg-sky-500",
};

function MissionCard({ m }: { m: Mission }) {
  const pct = m.target > 0 ? Math.min(100, Math.round((m.progress / m.target) * 100)) : 0;
  return (
    <div className="paper-card flex items-center gap-4 px-5 py-4">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase text-white ${CATEGORY_ACCENT[m.category] ?? "bg-ink-400"}`}>
            {m.category}
          </span>
          <p className="truncate text-sm font-semibold text-ink-900">{m.title}</p>
        </div>
        <p className="mt-0.5 truncate text-xs text-ink-400">{m.description}</p>
        <div className="mt-2 flex items-center gap-2">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-indigo-50">
            <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-sakura-500" style={{ width: `${pct}%` }} />
          </div>
          <span className="shrink-0 text-[11px] text-ink-400">{m.progress}/{m.target}</span>
        </div>
      </div>
      {m.completed ? (
        <span className="shrink-0 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-600">✓ Done</span>
      ) : (
        <Link to={m.route} className="shrink-0 rounded-lg bg-indigo-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-indigo-600">
          Start
        </Link>
      )}
    </div>
  );
}

export function MissionsSection() {
  const { data, isLoading, isError } = useMissions();
  if (isLoading || isError || !data || data.missions.length === 0) return null;

  return (
    <section className="space-y-3">
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-bold text-ink-900">Today's Missions</h2>
        <span className="text-xs text-ink-400">{data.missions.filter((m) => m.completed).length}/{data.missions.length} done</span>
      </div>
      <div className="space-y-2">
        {data.missions.map((m) => (
          <MissionCard key={m.id} m={m} />
        ))}
      </div>
    </section>
  );
}
