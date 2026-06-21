interface Props {
  current: number;
  total: number;
}

export function ReviewProgress({ current, total }: Props) {
  const percent = total === 0 ? 0 : Math.round((current / total) * 100);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-ink-500">
          Card <span className="font-semibold text-ink-900">{current}</span> of{" "}
          <span className="font-semibold text-ink-900">{total}</span>
        </span>
        <span className="text-ink-400">{percent}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-line">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-sakura-500 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
