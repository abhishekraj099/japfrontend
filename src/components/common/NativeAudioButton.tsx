import { useRef } from "react";

interface Props {
  src: string | null | undefined;
  className?: string;
}

/** Plays the mined native audio clip (Phase 25D). Renders nothing without a clip. */
export function NativeAudioButton({ src, className = "" }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  if (!src) return null;
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        if (!audioRef.current) audioRef.current = new Audio(src);
        audioRef.current.currentTime = 0;
        void audioRef.current.play();
      }}
      title="Play native audio"
      className={`inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-100 transition cursor-pointer ${className}`}
    >
      ▶ Audio
    </button>
  );
}
