/* Anime-style section header: a gradient accent bar + JP label + title. */
export function SectionHeader({
  jp,
  title,
  subtitle,
  right,
  from = "from-indigo-400",
  to = "to-sakura-500",
}: {
  jp?: string;
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  from?: string;
  to?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div className="flex items-stretch gap-3">
        <span className={`w-1.5 shrink-0 rounded-full bg-gradient-to-b ${from} ${to}`} />
        <div>
          {jp && (
            <p className="font-jp text-xs font-bold tracking-[0.22em] text-ink-400">{jp}</p>
          )}
          <h2 className="font-display text-2xl leading-tight text-ink-900">{title}</h2>
          {subtitle && <p className="mt-0.5 text-sm text-ink-500">{subtitle}</p>}
        </div>
      </div>
      {right}
    </div>
  );
}
