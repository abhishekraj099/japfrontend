import { speak, ttsAvailable } from "@/lib/tts";

interface Props {
  text: string | null | undefined;
  className?: string;
  title?: string;
}

/** Small speaker button that reads Japanese text aloud via TTS (Phase 22). */
export function AudioButton({ text, className = "", title = "Play audio" }: Props) {
  if (!text || !ttsAvailable()) return null;
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        speak(text);
      }}
      title={title}
      aria-label={title}
      className={`inline-flex items-center justify-center text-indigo-500 hover:text-indigo-700 transition cursor-pointer ${className}`}
    >
      🔊
    </button>
  );
}
