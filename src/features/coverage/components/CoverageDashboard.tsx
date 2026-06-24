import { useCoverage } from "../hooks/useCoverage";
import { StatCard } from "@/features/analytics/components/StatCard";
import { MetricGrid } from "@/features/analytics/components/MetricGrid";
import type { CoverageCategory } from "@/types/coverage.types";

function bandAccent(band: string): string {
  if (band.startsWith("Near")) return "text-emerald-600";
  if (band === "Comfortable") return "text-emerald-600";
  if (band === "Advanced") return "text-indigo-500";
  if (band === "Intermediate") return "text-amber-600";
  return "text-sakura-500";
}

function CoverageCard({ c }: { c: CoverageCategory }) {
  return (
    <div className="paper-card px-5 py-4">
      <div className="flex items-baseline justify-between">
        <p className="font-semibold text-ink-900">{c.label}</p>
        <p className="text-2xl font-bold text-indigo-500">{c.coveragePercent}%</p>
      </div>
      <div className="my-2 h-2 w-full overflow-hidden rounded-full bg-indigo-50">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-sakura-500 transition-all"
          style={{ width: `${c.coveragePercent}%` }}
        />
      </div>
      <p className={`text-xs font-semibold ${bandAccent(c.band)}`}>{c.band}</p>
      <p className="mt-1 text-xs text-ink-400">{c.description}</p>
    </div>
  );
}

export function CoverageDashboard() {
  const { data, isLoading, isError } = useCoverage();

  if (isLoading) return <p className="text-sm text-ink-400">Estimating coverage…</p>;
  if (isError || !data) return <p className="text-sm text-sakura-500">Couldn't load coverage.</p>;

  const { vocabulary, categories } = data;

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h2 className="section-label">Vocabulary</h2>
        <MetricGrid cols={3}>
          <StatCard label="Known Words" value={vocabulary.knownWords} accent="emerald" />
          <StatCard label="Learning Words" value={vocabulary.learningWords} accent="indigo" />
          <StatCard label="Tracked Total" value={vocabulary.totalTrackedWords} />
        </MetricGrid>
      </section>

      <section className="space-y-3">
        <h2 className="section-label">Estimated Content Coverage</h2>
        <MetricGrid cols={2}>
          {categories.map((c) => (
            <CoverageCard key={c.id} c={c} />
          ))}
        </MetricGrid>
        <p className="text-xs text-ink-400">
          Frequency-weighted estimate of the share of words you'd recognize in each content type,
          based on your {vocabulary.rankedKnownWords} known frequency-ranked words. Estimates only —
          actual comprehension varies by grammar, kanji, and context.
        </p>
      </section>
    </div>
  );
}
