interface Props {
  onRate: (rating: number) => void;
  disabled: boolean;
}

/* semantic but palette-harmonious: sakura · gold · jade · indigo */
const RATINGS = [
  { value: 1, label: "Again", hint: "1", color: "bg-sakura-500 hover:bg-sakura-600" },
  { value: 2, label: "Hard", hint: "2", color: "bg-gold-500 hover:brightness-95" },
  { value: 3, label: "Good", hint: "3", color: "bg-jade-500 hover:brightness-95" },
  { value: 4, label: "Easy", hint: "4", color: "bg-indigo-500 hover:bg-indigo-600" },
] as const;

export function RatingButtons({ onRate, disabled }: Props) {
  return (
    <div className="space-y-3">
      <p className="text-center text-[13px] text-ink-400">How well did you know this?</p>
      <div className="grid grid-cols-4 gap-3">
        {RATINGS.map(({ value, label, hint, color }) => (
          <button
            key={value}
            onClick={() => onRate(value)}
            disabled={disabled}
            className={`${color} flex flex-col items-center gap-1 rounded-2xl py-3.5 text-sm font-semibold text-paper shadow-sm transition active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer`}
          >
            <span>{label}</span>
            <span className="text-xs font-normal opacity-75">[{hint}]</span>
          </button>
        ))}
      </div>
    </div>
  );
}
