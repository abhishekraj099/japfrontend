interface Props {
  onRate: (rating: number) => void;
  disabled: boolean;
}

const RATINGS = [
  { value: 1, label: "Again", hint: "1", color: "bg-red-500 hover:bg-red-600 text-white" },
  { value: 2, label: "Hard",  hint: "2", color: "bg-orange-400 hover:bg-orange-500 text-white" },
  { value: 3, label: "Good",  hint: "3", color: "bg-green-500 hover:bg-green-600 text-white" },
  { value: 4, label: "Easy",  hint: "4", color: "bg-blue-500 hover:bg-blue-600 text-white" },
] as const;

export function RatingButtons({ onRate, disabled }: Props) {
  return (
    <div className="space-y-3">
      <p className="text-center text-xs text-slate-400">How well did you know this?</p>
      <div className="grid grid-cols-4 gap-3">
        {RATINGS.map(({ value, label, hint, color }) => (
          <button
            key={value}
            onClick={() => onRate(value)}
            disabled={disabled}
            className={`
              ${color}
              flex flex-col items-center gap-1 py-3 rounded-xl text-sm font-semibold
              transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400
            `}
          >
            <span>{label}</span>
            <span className="text-xs opacity-70 font-normal">[{hint}]</span>
          </button>
        ))}
      </div>
    </div>
  );
}
