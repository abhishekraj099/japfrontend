interface Props {
  current: number;
  total: number;
}

export function ReviewProgress({ current, total }: Props) {
  const percent = total === 0 ? 0 : Math.round((current / total) * 100);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-500">
          Card <span className="font-semibold text-slate-700">{current}</span> of{" "}
          <span className="font-semibold text-slate-700">{total}</span>
        </span>
        <span className="text-slate-400">{percent}%</span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-slate-900 rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
