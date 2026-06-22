import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Mascot, KStar } from "./Kawaii";
import { Confetti } from "./Confetti";

const PENDING_KEY = "jap_welcome_pending";

function timeJp() {
  const h = new Date().getHours();
  if (h < 5) return { jp: "こんばんは", en: "Up late? Let's study a little." };
  if (h < 11) return { jp: "おはよう", en: "Good morning — ready to learn?" };
  if (h < 17) return { jp: "こんにちは", en: "Good afternoon — welcome back!" };
  return { jp: "こんばんは", en: "Good evening — welcome back!" };
}

/*
  A visual-novel style greeting: the mascot pops up with a speech bubble
  that types out a Japanese welcome. Shows once per browser session
  (i.e. right after logging in), then dismisses.
*/
export function WelcomeOverlay({ name }: { name?: string }) {
  const [show, setShow] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [typed, setTyped] = useState("");

  const first = name?.split(" ")[0] ?? "";
  const t = timeJp();
  const jpLine = first ? `${t.jp}、${first}さん！` : `${t.jp}！`;

  // show right after a fresh login / register
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(PENDING_KEY) !== "1") return;
    sessionStorage.removeItem(PENDING_KEY);
    setShow(true);
  }, []);

  // typewriter
  useEffect(() => {
    if (!show) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(jpLine.slice(0, i));
      if (i >= jpLine.length) clearInterval(id);
    }, 95);
    return () => clearInterval(id);
  }, [show, jpLine]);

  // speak the greeting aloud (Japanese TTS)
  useEffect(() => {
    if (!show || typeof window === "undefined" || !window.speechSynthesis) return;
    try {
      const u = new SpeechSynthesisUtterance(jpLine);
      u.lang = "ja-JP";
      u.rate = 0.95;
      u.pitch = 1.1;
      const speak = () => {
        const jp = window.speechSynthesis.getVoices().find((v) => v.lang.startsWith("ja"));
        if (jp) u.voice = jp;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(u);
      };
      // voices may load async
      if (window.speechSynthesis.getVoices().length) speak();
      else window.speechSynthesis.onvoiceschanged = speak;
    } catch {
      /* TTS not available — ignore */
    }
  }, [show, jpLine]);

  // auto dismiss
  useEffect(() => {
    if (!show) return;
    const id = setTimeout(() => setLeaving(true), 5200);
    return () => clearTimeout(id);
  }, [show]);

  if (!show) return null;

  const dismiss = () => setLeaving(true);

  return (
    <div
      className={`fixed bottom-5 left-5 z-50 flex items-end gap-3 ${leaving ? "fade-out" : ""}`}
      onAnimationEnd={() => leaving && setShow(false)}
    >
      <div className="pop-in relative">
        <Confetti count={26} />
        <Mascot className="wiggle h-28 w-28 drop-shadow-[0_10px_20px_rgba(0,0,0,0.35)]" />
      </div>

      <div className="bubble-in relative mb-10 max-w-[16rem] rounded-3xl border border-white/15 bg-white px-5 py-4 text-[#1b1240] shadow-2xl">
        {/* tail */}
        <span className="absolute -left-2 bottom-5 h-4 w-4 rotate-45 border-b border-l border-white/15 bg-white" />
        {/* sparkles */}
        <KStar className="absolute -right-2 -top-2 h-5 w-5" />
        <KStar className="absolute -left-3 top-6 h-3 w-3" color="#ff3d8b" />

        <button
          onClick={dismiss}
          className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full text-[#9a91c6] transition hover:bg-black/5 hover:text-[#1b1240]"
          aria-label="Dismiss"
        >
          <X className="h-3.5 w-3.5" />
        </button>

        <p className="font-jp pr-4 text-lg font-bold leading-snug">
          {typed}
          <span className="ml-0.5 inline-block w-0.5 animate-pulse bg-[#1b1240] align-middle">&nbsp;</span>
        </p>
        <p className="mt-1 text-sm font-medium text-[#6b6494]">{t.en}</p>
      </div>
    </div>
  );
}
