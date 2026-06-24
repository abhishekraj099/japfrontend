import { useAnalytics } from "../hooks/useAnalytics";
import { StatCard } from "./StatCard";
import { ProgressBar } from "./ProgressBar";
import { MetricGrid } from "./MetricGrid";
import type { JlptProgress } from "@/types/analytics.types";

const JLPT_KEYS: Record<string, keyof JlptProgress> = {
  N5: "jlptN5Known",
  N4: "jlptN4Known",
  N3: "jlptN3Known",
  N2: "jlptN2Known",
  N1: "jlptN1Known",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="section-label">{title}</h2>
      {children}
    </section>
  );
}

export function AnalyticsDashboard() {
  const { data, isLoading, isError } = useAnalytics();

  if (isLoading) return <p className="text-sm text-ink-400">Loading analytics…</p>;
  if (isError || !data) return <p className="text-sm text-sakura-500">Couldn't load analytics.</p>;

  const { overview, jlpt, reviews, growth, jlptLevels } = data;
  const jlptMax = Math.max(1, ...jlptLevels.map((l) => jlpt[JLPT_KEYS[l]]));

  return (
    <div className="space-y-8">
      <Section title="Overview">
        <MetricGrid cols={4}>
          <StatCard label="Known Words" value={overview.knownWords} accent="emerald" />
          <StatCard label="Learning Words" value={overview.learningWords} accent="indigo" />
          <StatCard label="Current Streak" value={`${overview.currentStreak}d`} sub={`Longest ${overview.longestStreak}d`} accent="sakura" />
          <StatCard label="Retention" value={`${overview.overallRetention}%`} sub="All reviews" accent="amber" />
        </MetricGrid>
        <MetricGrid cols={3}>
          <StatCard label="Total Saved" value={overview.totalSavedWords} />
          <StatCard label="Known Freq. Coverage" value={`${overview.knownFrequencyCoverage}%`} accent="emerald" />
          <StatCard label="Learning Freq. Coverage" value={`${overview.learningFrequencyCoverage}%`} accent="indigo" />
        </MetricGrid>
      </Section>

      <Section title="JLPT Progress">
        <div className="paper-card space-y-3 px-5 py-4">
          {jlptLevels.map((level) => (
            <ProgressBar key={level} label={level} value={jlpt[JLPT_KEYS[level]]} max={jlptMax} suffix=" known" />
          ))}
        </div>
      </Section>

      <Section title="Review Activity">
        <MetricGrid cols={4}>
          <StatCard label="Today" value={reviews.reviewsToday} />
          <StatCard label="This Week" value={reviews.reviewsThisWeek} />
          <StatCard label="This Month" value={reviews.reviewsThisMonth} />
          <StatCard label="Total" value={reviews.totalReviews} />
        </MetricGrid>
        <MetricGrid cols={2}>
          <StatCard label="7-Day Retention" value={`${reviews.sevenDayRetention}%`} accent="emerald" />
          <StatCard label="30-Day Retention" value={`${reviews.thirtyDayRetention}%`} accent="emerald" />
        </MetricGrid>
      </Section>

      <Section title="Vocabulary Growth">
        <MetricGrid cols={3}>
          <StatCard label="Added Today" value={growth.wordsAddedToday} accent="sakura" />
          <StatCard label="Added This Week" value={growth.wordsAddedThisWeek} accent="sakura" />
          <StatCard label="Added This Month" value={growth.wordsAddedThisMonth} accent="sakura" />
        </MetricGrid>
      </Section>
    </div>
  );
}
