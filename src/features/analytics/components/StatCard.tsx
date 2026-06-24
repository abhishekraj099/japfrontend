interface Props {
  label: string;
  value: string | number;
  sub?: string;
  accent?: "indigo" | "sakura" | "emerald" | "amber";
}

const ACCENT: Record<NonNullable<Props["accent"]>, string> = {
  indigo: "text-indigo-500",
  sakura: "text-sakura-500",
  emerald: "text-emerald-600",
  amber: "text-amber-600",
};

/** Single headline metric tile (Phase 34). Reusable across dashboard sections. */
export function StatCard({ label, value, sub, accent = "indigo" }: Props) {
  return (
    <div className="paper-card px-5 py-4">
      <p className="section-label">{label}</p>
      <p className={`mt-1 text-3xl font-bold ${ACCENT[accent]}`}>{value}</p>
      {sub && <p className="mt-0.5 text-xs text-ink-400">{sub}</p>}
    </div>
  );
}
