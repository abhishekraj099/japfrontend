import { Volume2 } from "lucide-react";

/*
  A Migaku-style media flashcard. The "cover" is a self-contained gradient
  mini-scene (sun + hill) — no external images, so it always renders crisply.
*/
const GRADS: [string, string][] = [
  ["#ff8a4c", "#ff4d6a"],
  ["#7c5cff", "#5bd1ff"],
  ["#1ad3b0", "#34c08a"],
  ["#ff3d8b", "#ff8a4c"],
  ["#5bd1ff", "#7c5cff"],
  ["#ffb454", "#ff6a4d"],
];
function gradFor(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return GRADS[h % GRADS.length];
}

interface Props {
  word: string;
  reading?: string;
  meaning: string;
  seed: string;
  jlpt?: string;
  rotate?: number;
  width?: number;
  className?: string;
}

export function MediaCard({
  word,
  reading,
  meaning,
  seed,
  jlpt = "N5",
  rotate = 0,
  width = 230,
  className = "",
}: Props) {
  const [from, to] = gradFor(seed);
  return (
    <div
      className={`overflow-hidden rounded-3xl bg-white shadow-2xl ${className}`}
      style={{ transform: `rotate(${rotate}deg)`, width }}
    >
      {/* gradient cover scene */}
      <div className="relative h-24 w-full overflow-hidden" style={{ background: `linear-gradient(135deg,${from},${to})` }}>
        <div className="absolute right-4 top-3 h-10 w-10 rounded-full bg-white/45 blur-[1px]" />
        <svg className="absolute inset-x-0 bottom-0 w-full" viewBox="0 0 200 50" preserveAspectRatio="none">
          <path d="M0 38 C 50 18 90 30 130 22 S 200 18 200 30 L200 50 L0 50 Z" fill="rgba(255,255,255,0.22)" />
          <path d="M0 44 C 60 30 110 40 150 34 S 200 32 200 40 L200 50 L0 50 Z" fill="rgba(255,255,255,0.18)" />
        </svg>
        <span className="font-jp absolute inset-0 flex items-center justify-center text-4xl font-bold text-white/85 drop-shadow">
          {word}
        </span>
        <span className="font-jp absolute right-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-slate-700">
          {jlpt}
        </span>
      </div>
      {/* details */}
      <div className="p-4">
        <div className="flex items-center gap-2">
          <p className="font-jp text-2xl font-bold leading-none text-slate-900">{word}</p>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#eef0ff] text-[#7c5cff]">
            <Volume2 className="h-3.5 w-3.5" />
          </span>
        </div>
        {reading && <p className="font-jp mt-1 text-xs text-slate-400">{reading}</p>}
        <p className="mt-1.5 text-sm font-bold text-slate-700">{meaning}</p>
      </div>
    </div>
  );
}
