import { useMemo } from "react";
import { useAchievements } from "../hooks/useAchievements";
import type { Achievement } from "@/types/achievement.types";

const CATEGORY_ICON: Record<string, string> = {
  Review: "🔁",
  Vocabulary: "📚",
  Grammar: "📖",
  Streak: "🔥",
  Coverage: "🎬",
  Mastery: "⭐",
};

function UnlockedBadge({ a }: { a: Achievement }) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2" title={a.description}>
      <span className="text-lg">{CATEGORY_ICON[a.category] ?? "🏆"}</span>
      <span className="text-xs font-semibold text-emerald-700">{a.title}</span>
    </div>
  );
}

function UpcomingCard({ a }: { a: Achievement }) {
  const pct = a.target > 0 ? Math.min(100, Math.round((a.progress / a.target) * 100)) : 0;
  return (
    <div className="paper-card px-4 py-3">
      <div className="flex items-center gap-2">
        <span className="text-base">{CATEGORY_ICON[a.category] ?? "🏆"}</span>
        <span className="text-sm font-semibold text-ink-900">{a.title}</span>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-indigo-50">
          <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-sakura-500" style={{ width: `${pct}%` }} />
        </div>
        <span className="shrink-0 text-[11px] text-ink-400">{a.progress}/{a.target}</span>
      </div>
    </div>
  );
}

export function AchievementsSection() {
  const { data, isLoading, isError } = useAchievements();

  const upcoming = useMemo(() => {
    if (!data) return [];
    // Nearest upcoming per category = first locked tier in each category.
    const seen = new Set<string>();
    const out: Achievement[] = [];
    for (const a of data.achievements) {
      if (!a.unlocked && !seen.has(a.category)) {
        seen.add(a.category);
        out.push(a);
      }
    }
    return out;
  }, [data]);

  if (isLoading || isError || !data) return null;

  const unlocked = data.achievements.filter((a) => a.unlocked);

  return (
    <section className="space-y-3">
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-bold text-ink-900">Achievements</h2>
        <span className="text-sm font-semibold text-ink-500">🏆 {data.unlockedCount} unlocked</span>
      </div>

      {unlocked.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {unlocked.map((a) => (
            <UnlockedBadge key={a.id} a={a} />
          ))}
        </div>
      )}

      {upcoming.length > 0 && (
        <div>
          <p className="section-label mb-2">Up Next</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((a) => (
              <UpcomingCard key={a.id} a={a} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
