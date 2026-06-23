import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { StoreBadge, MiniPhone, ChromeMark, LaptopMock } from "@/components/common/StoreBadges";
import { useAuthContext } from "@/providers/AuthProvider";

const CORAL = "linear-gradient(135deg,#ff8a4c 0%,#ff4d6a 100%)";
const TEAL = "#1ad3b0";

export function DownloadPage() {
  const { user } = useAuthContext();

  return (
    <div className="min-h-screen overflow-hidden text-white" style={{ background: "linear-gradient(180deg,#1a1147 0%,#130b35 45%,#0e0828 100%)" }}>
      {/* nav */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#140b38]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link to={user ? ROUTES.DASHBOARD : "/"} className="flex items-center gap-2" style={{ perspective: "600px" }}>
            <span className="logo-spin flex h-9 w-9 items-center justify-center rounded-xl font-jp text-lg text-white" style={{ background: CORAL }}>語</span>
            <span className="text-2xl font-extrabold tracking-tight text-white">JAP</span>
          </Link>
          <Link to={user ? ROUTES.DASHBOARD : "/"} className="flex items-center gap-1.5 text-sm font-bold text-white/70 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> {user ? "Back to app" : "Back to home"}
          </Link>
        </div>
      </header>

      <section className="relative px-5 py-16">
        <span aria-hidden className="pointer-events-none absolute left-[6%] top-6 select-none text-5xl">🌴</span>
        <span aria-hidden className="pointer-events-none absolute right-[7%] top-8 select-none text-4xl">⛰️</span>
        <h1 className="text-center text-4xl font-extrabold md:text-5xl">JAP Downloads</h1>
        <p className="mx-auto mt-4 max-w-md text-center text-lg text-white/70">
          Learn on the app and from any website with the extension — synced together.
        </p>

        <div className="mx-auto mt-12 max-w-5xl space-y-10">
          {/* Mobile app */}
          <div className="rounded-3xl p-7 md:p-9" style={{ background: "#3a2a7a", boxShadow: "12px 12px 0 #1ad3b0" }}>
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <span className="inline-block rounded-full bg-[#1ad3b0] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-[#10243a]">Start here</span>
                <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-4xl">JAP Mobile App</h2>
                <p className="mt-3 max-w-md text-white/75">Start learning with JAP's flashcard courses, or create your own flashcards on the go.</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <StoreBadge kind="apple" />
                  <StoreBadge kind="play" />
                </div>
                <p className="mt-4 text-sm text-white/70">
                  Requires a JAP account.{" "}
                  <Link to={ROUTES.REGISTER} className="font-semibold text-white underline underline-offset-2">Sign up here.</Link>
                </p>
              </div>
              <div className="flex items-end justify-center gap-2">
                <MiniPhone from="#fdf3c4" to="#ffe39a" rotate={-4} label="Study all decks" sub="134 reviews" />
                <MiniPhone from="#7c5cff" to="#5bd1ff" rotate={0} label="神秘" sub="しんぴ · mystery" big />
                <MiniPhone from="#ff9ec4" to="#ff5e9e" rotate={4} label="ひらがな" sub="Lesson 1" />
              </div>
            </div>
          </div>

          {/* Browser extension */}
          <div className="rounded-3xl p-7 md:p-9" style={{ background: "#3a2a7a", boxShadow: "12px 12px 0 #1ad3b0" }}>
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-extrabold leading-tight md:text-4xl">Chrome Browser Extension on the desktop</h2>
                <p className="mt-3 max-w-md text-white/75">Learn with your favourite content on YouTube, Netflix, Disney+, Viki, X, Reddit and more.</p>
                <a href="#" className="mt-5 inline-flex items-center gap-3 rounded-2xl bg-white px-4 py-2.5 text-[#1a1240] ring-1 ring-black/10">
                  <ChromeMark />
                  <span className="text-left leading-tight">
                    <span className="block text-[10px] font-medium text-slate-500">Available in the</span>
                    <span className="block text-sm font-extrabold">Chrome Web Store</span>
                  </span>
                </a>
                <p className="mt-4 text-sm text-white/70">
                  Requires a JAP account.{" "}
                  <Link to={ROUTES.REGISTER} className="font-semibold text-white underline underline-offset-2">Sign up here.</Link>
                </p>
              </div>
              <LaptopMock url="netflix.com">
                <div className="p-5">
                  <p className="font-jp text-xl font-bold text-white">宇宙は<span style={{ color: TEAL }}>神秘</span>に満ちている</p>
                  <p className="mt-2 text-sm text-white/60">space is full of mystery</p>
                  <div className="mt-3 inline-flex rounded-lg bg-white p-2 text-slate-900">
                    <span className="font-jp text-sm font-bold">神秘 · mystery</span>
                  </div>
                </div>
              </LaptopMock>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8 text-center text-sm text-white/45">
        <Link to="/" className="font-bold text-white/70 hover:text-white">← Back to home</Link>
        <p className="mt-3 text-xs text-white/30">© {new Date().getFullYear()} JAP · 日本語学習</p>
      </footer>
    </div>
  );
}
