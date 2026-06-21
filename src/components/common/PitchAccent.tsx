import { toMorae, parseAccent, pitchPattern } from "@/lib/pitch";

interface Props {
  reading: string | null | undefined;
  pitchAccent: string | null | undefined;
  className?: string;
}

/**
 * OJAD-style pitch contour: a line sits over high morae, with a downstep marked
 * by the right edge of the last high mora. Renders nothing when data is missing.
 */
export function PitchAccent({ reading, pitchAccent, className = "" }: Props) {
  const accent = parseAccent(pitchAccent);
  if (!reading || accent === null) return null;
  const morae = toMorae(reading);
  if (morae.length === 0) return null;
  const pattern = pitchPattern(morae.length, accent);

  return (
    <span className={`font-jp inline-flex items-end ${className}`} aria-label={`pitch ${accent}`}>
      {morae.map((m, i) => {
        const high = pattern[i] === "H";
        const drop = high && i + 1 < pattern.length && pattern[i + 1] === "L";
        return (
          <span
            key={i}
            className={[
              "px-[1px] text-sm leading-tight",
              high ? "text-rose-500 border-t-2 border-rose-400" : "text-slate-400 border-b border-transparent",
              drop ? "border-r-2 border-r-rose-400" : "",
            ].join(" ")}
          >
            {m}
          </span>
        );
      })}
    </span>
  );
}
