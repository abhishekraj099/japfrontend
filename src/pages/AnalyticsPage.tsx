import { AnalyticsDashboard } from "@/features/analytics/components/AnalyticsDashboard";

export function AnalyticsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-ink-900">Analytics</h1>
        <p className="mt-1 text-sm text-ink-400">Your study progress, retention, and vocabulary growth.</p>
      </header>
      <AnalyticsDashboard />
    </div>
  );
}
