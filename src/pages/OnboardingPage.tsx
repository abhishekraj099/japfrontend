import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Rocket } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { SakuraPetals } from "@/components/common/SakuraPetals";
import { MapleLeaves } from "@/components/common/MapleLeaves";
import { StarField } from "@/components/common/StarField";
import { CherryBranch } from "@/components/common/CherryBranch";
import { ToriiScene } from "@/components/common/ToriiScene";

export const ONBOARDED_KEY = "jap_onboarded";

interface Slide {
  greeting: string;
  title: string;
  body: string;
  sky: string;
  scene: React.ReactNode;
}

const SLIDES: Slide[] = [
  {
    greeting: "こんにちは！",
    title: "Discover Japan",
    body: "Your gateway to Japanese culture, language, and life. Start a journey that will change the way you see the world.",
    sky: "dusk-sky",
    scene: (
      <>
        <CherryBranch className="absolute -left-8 top-0 h-72 w-72 -scale-x-100 opacity-95 drop-shadow-[0_8px_20px_rgba(0,0,0,0.25)]" />
        <SakuraPetals count={30} />
      </>
    ),
  },
  {
    greeting: "ようこそ！",
    title: "Learn the Living Word",
    body: "Spaced-repetition decks, a built-in dictionary, and daily reviews tuned to how memory actually works.",
    sky: "dusk-sky",
    scene: (
      <>
        <CherryBranch className="absolute -right-6 top-2 h-64 w-64 opacity-90 drop-shadow-[0_8px_20px_rgba(0,0,0,0.25)]" />
        <SakuraPetals count={24} />
      </>
    ),
  },
  {
    greeting: "探検しよう！",
    title: "Explore Culture",
    body: "Dive deep into food, festivals, traditions, and modern Japan. Every day brings a new discovery.",
    sky: "temple-sky",
    scene: (
      <>
        <ToriiScene className="absolute inset-x-0 bottom-0 h-[70%] w-full opacity-95" />
        <SakuraPetals count={18} />
      </>
    ),
  },
  {
    greeting: "始めよう！",
    title: "Start Your Journey",
    body: "Join thousands of learners experiencing Japan every day. Your adventure begins with a single step.",
    sky: "night-sky",
    scene: (
      <>
        <StarField count={110} />
        <MapleLeaves count={16} />
      </>
    ),
  },
];

export function OnboardingPage() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const slide = SLIDES[index];
  const isLast = index === SLIDES.length - 1;

  const finish = () => {
    localStorage.setItem(ONBOARDED_KEY, "1");
    navigate(ROUTES.LOGIN);
  };

  const next = () => (isLast ? finish() : setIndex((i) => i + 1));

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-900 p-4 sm:p-8">
      {/* phone-like immersive panel */}
      <div
        className={`relative flex h-[100dvh] w-full max-w-[420px] flex-col overflow-hidden rounded-none text-white shadow-2xl sm:h-[860px] sm:rounded-[2.5rem] sm:ring-1 sm:ring-white/10 ${slide.sky}`}
      >
        {/* atmospheric scene layer */}
        <div className="absolute inset-0">{slide.scene}</div>
        {/* readability scrim at the bottom */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />

        {/* top bar */}
        <div className="relative z-10 flex items-center justify-between px-7 pt-8">
          <span className="text-sm font-medium tracking-widest text-white/70">
            {index + 1} / {SLIDES.length}
          </span>
          {!isLast && (
            <button
              onClick={finish}
              className="cursor-pointer rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm transition hover:bg-white/20"
            >
              Skip
            </button>
          )}
        </div>

        {/* content anchored low */}
        <div className="relative z-10 mt-auto px-7 pb-9">
          <p className="font-jp mb-3 text-lg tracking-widest text-white/85">
            {slide.greeting}
          </p>
          <h1 className="text-[2.6rem] font-black leading-[1.05] tracking-tight text-white drop-shadow-sm">
            {slide.title}
          </h1>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-white/80">
            {slide.body}
          </p>

          {/* dots */}
          <div className="mt-7 flex items-center gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 ${
                  i === index ? "w-7 bg-white" : "w-1.5 bg-white/35 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={next}
            className="mt-7 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-white py-4 text-[17px] font-bold text-shu-600 shadow-lg transition hover:bg-white/90 active:scale-[0.98]"
          >
            {isLast ? (
              <>
                Get Started! <Rocket className="h-5 w-5" />
              </>
            ) : (
              <>
                Next <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
