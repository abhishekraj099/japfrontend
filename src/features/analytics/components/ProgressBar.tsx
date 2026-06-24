interface Props {
  label: string;
  value: number; // numerator (e.g. known count)
  max: number; // denominator for the bar width
  suffix?: string;
}

/** Labeled horizontal progress bar (Phase 34). Reusable. */
export function ProgressBar({ label, value, max, suffix }: Props) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between">
        <span className="text-sm font-semibold text-ink-700">{label}</span>
        <span className="text-xs text-ink-400">
          {value}
          {suffix ?? ""}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-indigo-50">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-sakura-500 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
