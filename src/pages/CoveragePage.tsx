import { CoverageDashboard } from "@/features/coverage/components/CoverageDashboard";

export function CoveragePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-ink-900">Coverage</h1>
        <p className="mt-1 text-sm text-ink-400">What real-world Japanese you can likely comprehend today.</p>
      </header>
      <CoverageDashboard />
    </div>
  );
}
