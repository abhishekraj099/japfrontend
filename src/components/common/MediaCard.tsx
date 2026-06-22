import { Volume2 } from "lucide-react";

/*
  A Migaku-style media flashcard: a real photo on top, then the word,
  reading, an audio button and the meaning. Photos come from Lorem Picsum
  (real images, stable per seed) so cards always have visual content.
*/
export function photoFor(seed: string, w = 600, h = 340) {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;
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
  return (
    <div
      className={`overflow-hidden rounded-3xl bg-white shadow-2xl ${className}`}
      style={{ transform: `rotate(${rotate}deg)`, width }}
    >
      <div className="relative h-28 w-full bg-slate-200">
        <img src={photoFor(seed)} alt="" loading="lazy" className="h-full w-full object-cover" />
        <span className="font-jp absolute right-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-slate-700">
          {jlpt}
        </span>
      </div>
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
