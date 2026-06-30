/**
 * RC5.1 — Website Guided Setup Page
 *
 * Flow: Language → Learning Path → Pin Extension → Install → Done
 *
 * Communicates with the JAP Chrome extension via a window.postMessage bridge
 * (content script relays to background service worker). If the extension is
 * not installed or not responding the install step degrades gracefully.
 *
 * Persistence:
 *  - Website: localStorage "jap_web_setup_complete"
 *  - Extension: chrome.storage.local "jap_setup_state" (written by background)
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { useAuthContext } from "@/providers/AuthProvider";

// ── Constants ─────────────────────────────────────────────────────────────────

export const WEB_SETUP_COMPLETE_KEY = "jap_web_setup_complete";

type StepId = "language" | "path" | "pin" | "install" | "done";
type LearningPath = "beginner" | "intermediate" | "advanced";

interface InstallTask {
  id: string;
  label: string;
  status: "pending" | "running" | "done" | "warn";
}

const STEPS: StepId[] = ["language", "path", "pin", "install", "done"];
const TOTAL_VISIBLE = 4; // steps shown in progress dots (done is end state)

const INITIAL_TASKS: InstallTask[] = [
  { id: "workspace", label: "Creating your workspace",         status: "pending" },
  { id: "prefs",     label: "Saving your preferences",         status: "pending" },
  { id: "ext",       label: "Syncing with JAP Extension",      status: "pending" },
  { id: "settings",  label: "Applying learning settings",      status: "pending" },
  { id: "furigana",  label: "Enabling furigana reading aids",  status: "pending" },
  { id: "recs",      label: "Configuring recommendations",     status: "pending" },
  { id: "finish",    label: "Finishing up",                    status: "pending" },
];

// ── Extension bridge ──────────────────────────────────────────────────────────

function sendToExtension(
  type: string,
  data: Record<string, unknown>,
  timeoutMs = 4000,
): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    const reqId = Math.random().toString(36).slice(2);

    const timer = setTimeout(() => {
      window.removeEventListener("message", handler);
      reject(new Error("Extension not responding"));
    }, timeoutMs);

    const handler = (e: MessageEvent<Record<string, unknown>>) => {
      if (e.source !== window) return;
      if (e.data?.source !== "jap_ext_reply") return;
      if (e.data?.reqId !== reqId) return;
      clearTimeout(timer);
      window.removeEventListener("message", handler);
      resolve(e.data);
    };

    window.addEventListener("message", handler);
    window.postMessage(
      { source: "jap_setup_bridge", type, data, reqId },
      window.location.origin,
    );
  });
}

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

// ── Component ─────────────────────────────────────────────────────────────────

export function SetupPage() {
  const navigate    = useNavigate();
  const { user, token } = useAuthContext();

  const [step, setStep]               = useState<StepId>("language");
  const [path, setPath]               = useState<LearningPath | null>(null);
  const [tasks, setTasks]             = useState<InstallTask[]>(INITIAL_TASKS);
  const [extId, setExtId]             = useState<string | null>(null);
  const [extWarn, setExtWarn]         = useState(false);
  const installRan = useRef(false);

  // Already set up → jump to dashboard
  useEffect(() => {
    if (localStorage.getItem(WEB_SETUP_COMPLETE_KEY)) {
      navigate(ROUTES.DASHBOARD, { replace: true });
    }
  }, [navigate]);

  const updateTask = useCallback((id: string, status: InstallTask["status"]) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  }, []);

  // ── Install sequence (runs once when step = "install") ───────────────────
  const runInstall = useCallback(async () => {
    // 1. Workspace
    updateTask("workspace", "running");
    await sleep(500);
    localStorage.setItem(
      "jap_setup_profile",
      JSON.stringify({ language: "ja", learningPath: path, completedAt: Date.now() }),
    );
    updateTask("workspace", "done");

    // 2. Prefs
    updateTask("prefs", "running");
    await sleep(400);
    updateTask("prefs", "done");

    // 3. Extension sync
    updateTask("ext", "running");
    let extOk = false;
    try {
      // Auth sync — let extension know who is logged in
      if (token && user) {
        await sendToExtension(
          "JAP_AUTH_SYNC",
          { token, user: { id: user.id, email: user.email, name: user.name } },
          3000,
        );
      }
      // Setup complete — apply settings in extension
      const resp = await sendToExtension(
        "JAP_SETUP_COMPLETE",
        { language: "ja", learningPath: path ?? "beginner", goals: [] },
        3000,
      );
      if (resp.extId) setExtId(String(resp.extId));
      extOk = true;
      updateTask("ext", "done");
    } catch {
      setExtWarn(true);
      updateTask("ext", "warn");
    }

    // 4–6. Remaining steps (instant if extension did them; simulate otherwise)
    updateTask("settings", "running");
    await sleep(extOk ? 200 : 350);
    updateTask("settings", "done");

    updateTask("furigana", "running");
    await sleep(200);
    updateTask("furigana", "done");

    updateTask("recs", "running");
    await sleep(200);
    updateTask("recs", "done");

    // 7. Finish
    updateTask("finish", "running");
    await sleep(350);
    updateTask("finish", "done");

    localStorage.setItem(WEB_SETUP_COMPLETE_KEY, "true");
    await sleep(600);
    setStep("done");
  }, [path, token, user, updateTask]);

  useEffect(() => {
    if (step === "install" && !installRan.current) {
      installRan.current = true;
      void runInstall();
    }
  }, [step, runInstall]);

  // ── Step index for progress dots ─────────────────────────────────────────
  const stepIndex = STEPS.indexOf(step);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1024] via-[#1a1b3c] to-[#0d1117] flex flex-col items-center justify-center px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-2 mb-10">
        <span className="text-2xl select-none">🎌</span>
        <span className="text-xl font-bold text-white tracking-tight">JAP</span>
        <span className="text-slate-500 text-sm ml-2">Japanese Learning</span>
      </div>

      {/* Card */}
      <div className="w-full max-w-lg bg-white/[0.04] border border-white/[0.08] rounded-3xl shadow-2xl overflow-hidden">
        {/* Progress bar */}
        {step !== "done" && (
          <div className="px-8 pt-7 pb-2 flex items-center gap-2">
            {Array.from({ length: TOTAL_VISIBLE }).map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                  i < stepIndex
                    ? "bg-indigo-500"
                    : i === stepIndex
                    ? "bg-indigo-400"
                    : "bg-white/10"
                }`}
              />
            ))}
            <span className="text-xs text-slate-500 ml-1 whitespace-nowrap">
              {stepIndex + 1} / {TOTAL_VISIBLE}
            </span>
          </div>
        )}

        <div className="px-8 pb-8 pt-4">
          {step === "language" && (
            <StepLanguage onNext={() => setStep("path")} />
          )}
          {step === "path" && (
            <StepPath
              selected={path}
              onSelect={setPath}
              onNext={() => setStep("pin")}
            />
          )}
          {step === "pin" && (
            <StepPin onNext={() => setStep("install")} />
          )}
          {step === "install" && (
            <StepInstall tasks={tasks} extWarn={extWarn} />
          )}
          {step === "done" && (
            <StepDone extId={extId} />
          )}
        </div>
      </div>

      {/* Footer */}
      <p className="mt-8 text-xs text-slate-600">
        JAP · Japanese Learning · All rights reserved
      </p>
    </div>
  );
}

// ── Step: Language ─────────────────────────────────────────────────────────────

function StepLanguage({ onNext }: { onNext: () => void }) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-1">
          Step 1 of 4
        </p>
        <h2 className="text-2xl font-bold text-white leading-tight">
          What language are you learning?
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          We'll tailor everything to your language.
        </p>
      </div>

      <button
        onClick={onNext}
        className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-indigo-500 bg-indigo-500/10 text-white hover:bg-indigo-500/20 transition cursor-pointer text-left"
      >
        <span className="text-3xl">🇯🇵</span>
        <div>
          <div className="font-semibold text-base">Japanese</div>
          <div className="text-xs text-slate-400 mt-0.5">日本語 · Nihongo</div>
        </div>
        <span className="ml-auto text-indigo-400">✓</span>
      </button>

      <p className="text-xs text-slate-600 text-center">
        More languages coming soon
      </p>

      <button
        onClick={onNext}
        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3.5 rounded-xl transition cursor-pointer text-sm"
      >
        Continue →
      </button>
    </div>
  );
}

// ── Step: Learning Path ────────────────────────────────────────────────────────

const PATH_OPTIONS: { id: LearningPath; label: string; sub: string; icon: string }[] = [
  { id: "beginner",     icon: "🌱", label: "Complete beginner",    sub: "Never studied Japanese before" },
  { id: "intermediate", icon: "📚", label: "Intermediate learner",  sub: "Know some vocab and grammar" },
  { id: "advanced",     icon: "⚡", label: "Advanced / near-native", sub: "Looking to fine-tune and mine content" },
];

function StepPath({
  selected,
  onSelect,
  onNext,
}: {
  selected: LearningPath | null;
  onSelect: (p: LearningPath) => void;
  onNext: () => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-1">
          Step 2 of 4
        </p>
        <h2 className="text-2xl font-bold text-white leading-tight">
          What's your current level?
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          We'll recommend the right content and difficulty.
        </p>
      </div>

      <div className="space-y-2">
        {PATH_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition cursor-pointer text-left ${
              selected === opt.id
                ? "border-indigo-500 bg-indigo-500/10 text-white"
                : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20 hover:bg-white/[0.06]"
            }`}
          >
            <span className="text-2xl">{opt.icon}</span>
            <div className="flex-1">
              <div className="font-semibold text-sm">{opt.label}</div>
              <div className="text-xs text-slate-500 mt-0.5">{opt.sub}</div>
            </div>
            {selected === opt.id && (
              <span className="text-indigo-400 text-lg">✓</span>
            )}
          </button>
        ))}
      </div>

      <button
        disabled={!selected}
        onClick={onNext}
        className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition cursor-pointer text-sm"
      >
        Continue →
      </button>
    </div>
  );
}

// ── Step: Pin Extension ────────────────────────────────────────────────────────

function StepPin({ onNext }: { onNext: () => void }) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-1">
          Step 3 of 4
        </p>
        <h2 className="text-2xl font-bold text-white leading-tight">
          Pin the JAP extension
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Pinning keeps JAP one click away in your Chrome toolbar.
        </p>
      </div>

      {/* Visual instruction card */}
      <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 space-y-4">
        <PinStep n={1} icon="🧩" text="Click the puzzle piece icon in your Chrome toolbar" />
        <PinStep n={2} icon="🎌" text='Find "JAP — Japanese Learning" in the list' />
        <PinStep n={3} icon="📌" text="Click the pin icon to pin it to your toolbar" />
      </div>

      {/* Toolbar mock */}
      <div className="flex items-center justify-end gap-1.5 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2">
        <span className="text-slate-600 text-xs">Chrome toolbar preview</span>
        <div className="ml-auto flex items-center gap-1">
          <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs">📷</div>
          <div className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center text-xs">🎌</div>
          <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs">🧩</div>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3.5 rounded-xl transition cursor-pointer text-sm"
      >
        I've pinned it →
      </button>

      <button
        onClick={onNext}
        className="w-full text-xs text-slate-500 hover:text-slate-300 transition cursor-pointer py-1"
      >
        Skip for now
      </button>
    </div>
  );
}

function PinStep({ n, icon, text }: { n: number; icon: string; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-xs font-bold text-indigo-400 flex-shrink-0 mt-0.5">
        {n}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-base">{icon}</span>
        <span className="text-sm text-slate-300">{text}</span>
      </div>
    </div>
  );
}

// ── Step: Install ─────────────────────────────────────────────────────────────

function StepInstall({ tasks, extWarn }: { tasks: InstallTask[]; extWarn: boolean }) {
  const done  = tasks.every((t) => t.status === "done" || t.status === "warn");
  const pct   = Math.round(
    (tasks.filter((t) => t.status === "done" || t.status === "warn").length / tasks.length) * 100,
  );

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-1">
          Step 4 of 4
        </p>
        <h2 className="text-2xl font-bold text-white leading-tight">
          {done ? "Almost there!" : "Preparing your environment…"}
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          {done
            ? "Everything is configured. One moment…"
            : "Setting up your personalised Japanese learning workspace."}
        </p>
      </div>

      {/* Progress bar */}
      <div>
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>Progress</span>
          <span>{pct}%</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Checklist */}
      <div className="space-y-2">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center gap-3 py-1">
            <TaskIcon status={task.status} />
            <span
              className={`text-sm transition-colors ${
                task.status === "done"
                  ? "text-slate-300"
                  : task.status === "running"
                  ? "text-white font-medium"
                  : task.status === "warn"
                  ? "text-amber-400"
                  : "text-slate-600"
              }`}
            >
              {task.label}
            </span>
          </div>
        ))}
      </div>

      {/* Extension warning */}
      {extWarn && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-3 text-xs text-amber-300">
          ⚠ JAP Extension not detected. Install the extension from the Chrome Web
          Store, then reopen the extension popup to finish syncing.
        </div>
      )}
    </div>
  );
}

function TaskIcon({ status }: { status: InstallTask["status"] }) {
  if (status === "done")
    return (
      <span className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-xs flex-shrink-0">
        ✓
      </span>
    );
  if (status === "running")
    return (
      <span className="w-5 h-5 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin flex-shrink-0" />
    );
  if (status === "warn")
    return (
      <span className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-xs flex-shrink-0">
        ⚠
      </span>
    );
  return (
    <span className="w-5 h-5 rounded-full border border-white/15 flex-shrink-0" />
  );
}

// ── Step: Done ────────────────────────────────────────────────────────────────

function StepDone({ extId }: { extId: string | null }) {
  const navigate = useNavigate();

  const openExtension = () => {
    if (extId) {
      // Open the extension popup.html as a tab — best we can do from a webpage
      window.open(`chrome-extension://${extId}/popup.html`, "_blank");
    } else {
      // Fallback: guide user to click the toolbar icon
      alert(
        "Click the JAP 🎌 icon in your Chrome toolbar to open the extension.\n\n" +
          "If you don't see it, click the 🧩 puzzle icon and pin JAP first.",
      );
    }
  };

  return (
    <div className="space-y-6 text-center">
      {/* Illustration */}
      <div className="flex flex-col items-center gap-2 py-4">
        <div className="text-6xl mb-2 animate-bounce">🎌</div>
        <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-1">
          ✓ Everything is ready.
        </h2>
        <p className="text-slate-400 text-sm">
          Your Japanese learning environment is set up. Time to start immersing!
        </p>
      </div>

      {/* What's ready */}
      <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-4 text-left space-y-2">
        {[
          "Furigana reading aids enabled",
          "Hover-to-lookup on subtitles enabled",
          "Interactive subtitle overlay enabled",
          "Learning path configured",
        ].map((item) => (
          <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
            <span className="text-emerald-400 text-xs">✓</span>
            {item}
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <button
          onClick={openExtension}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 rounded-xl transition cursor-pointer flex items-center justify-center gap-2 text-base"
        >
          🚀 Open JAP Extension
        </button>

        {/* Toolbar hint */}
        <div className="flex items-center justify-center gap-2 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3">
          <span className="text-slate-400 text-xs">Or click</span>
          <span className="text-lg">🎌</span>
          <span className="text-slate-400 text-xs">in your Chrome toolbar</span>
        </div>

        <button
          onClick={() => navigate(ROUTES.DASHBOARD)}
          className="w-full text-sm text-slate-500 hover:text-slate-300 transition cursor-pointer py-2"
        >
          📖 Go to Dashboard →
        </button>
      </div>
    </div>
  );
}
