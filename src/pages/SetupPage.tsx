/**
 * RC5.1 — Website Guided Setup Page
 * RC5.2 — Real dictionary download progress from extension
 *
 * Flow: Language → Learning Path → Pin Extension → Install → Done
 *
 * Communicates with the JAP Chrome extension via a window.postMessage bridge
 * (content script relays to background service worker). If the extension is
 * not installed or not responding the install step degrades gracefully.
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { useAuthContext } from "@/providers/AuthProvider";

// ── Constants ─────────────────────────────────────────────────────────────────

export const WEB_SETUP_COMPLETE_KEY = "jap_web_setup_complete";

type StepId = "language" | "path" | "pin" | "install" | "done";
type LearningPath = "beginner" | "intermediate" | "advanced";

// Mirrors ResourceProgress from ResourceInstaller.ts (extension)
interface ResourceProgress {
  type: "JAP_INSTALL_PROGRESS";
  resourceId: string;
  resourceLabel: string;
  status: "pending" | "skipped" | "downloading" | "installing" | "done" | "failed";
  percent: number;
  bytesLoaded: number;
  bytesTotal: number;
  speedBps: number;
  resourceIndex: number;
  resourceTotal: number;
  error?: string;
  allDone: boolean;
}

interface ResourceState extends Omit<ResourceProgress, "type" | "allDone"> {
  id: string;
}

// Default resources list — mirrors public/resources.json in extension
const DEFAULT_RESOURCES: ResourceState[] = [
  { id: "jmdict-english",   resourceId: "jmdict-english",   resourceLabel: "Default Dictionary",  status: "pending", percent: 0, bytesLoaded: 0, bytesTotal: 70 * 1024 * 1024, speedBps: 0, resourceIndex: 1, resourceTotal: 4 },
  { id: "kanjidic2-english",resourceId: "kanjidic2-english",resourceLabel: "Kanji Database",       status: "pending", percent: 0, bytesLoaded: 0, bytesTotal: 4 * 1024 * 1024,  speedBps: 0, resourceIndex: 2, resourceTotal: 4 },
  { id: "jpdb-frequency",   resourceId: "jpdb-frequency",   resourceLabel: "Frequency List",       status: "pending", percent: 0, bytesLoaded: 0, bytesTotal: 5 * 1024 * 1024,  speedBps: 0, resourceIndex: 3, resourceTotal: 4 },
  { id: "kanjium-pitch",    resourceId: "kanjium-pitch",    resourceLabel: "Pitch Accent",         status: "pending", percent: 0, bytesLoaded: 0, bytesTotal: 3 * 1024 * 1024,  speedBps: 0, resourceIndex: 4, resourceTotal: 4 },
];

const STEPS: StepId[] = ["language", "path", "pin", "install", "done"];
const TOTAL_VISIBLE = 4;

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

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatBytes(b: number): string {
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(0)} KB`;
  return `${(b / (1024 * 1024)).toFixed(1)} MB`;
}

function formatSpeed(bps: number): string {
  if (bps < 1024 * 1024) return `${(bps / 1024).toFixed(0)} KB/s`;
  return `${(bps / (1024 * 1024)).toFixed(1)} MB/s`;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function SetupPage() {
  const navigate        = useNavigate();
  const { user, token } = useAuthContext();

  const [step, setStep]         = useState<StepId>("language");
  const [path, setPath]         = useState<LearningPath | null>(null);
  const [extId, setExtId]       = useState<string | null>(null);
  const [extWarn, setExtWarn]   = useState(false);
  const [resources, setResources] = useState<ResourceState[]>(DEFAULT_RESOURCES);
  const [installDone, setInstallDone] = useState(false);
  const installRan = useRef(false);

  // Already set up → jump to dashboard
  useEffect(() => {
    if (localStorage.getItem(WEB_SETUP_COMPLETE_KEY)) {
      navigate(ROUTES.DASHBOARD, { replace: true });
    }
  }, [navigate]);

  // ── Listen for install progress events from extension ────────────────────
  useEffect(() => {
    if (step !== "install") return;

    const handler = (e: MessageEvent) => {
      if (e.source !== window) return;
      if (e.data?.source !== "jap_ext_reply") return;
      if (e.data?.type !== "JAP_INSTALL_PROGRESS") return;

      const p = e.data as ResourceProgress;
      setResources((prev) =>
        prev.map((r) =>
          r.resourceId === p.resourceId
            ? {
                ...r,
                status: p.status,
                percent: p.percent,
                bytesLoaded: p.bytesLoaded,
                bytesTotal: p.bytesTotal,
                speedBps: p.speedBps,
                error: p.error,
              }
            : r,
        ),
      );

      if (p.allDone) {
        localStorage.setItem(WEB_SETUP_COMPLETE_KEY, "true");
        setInstallDone(true);
        setTimeout(() => setStep("done"), 1200);
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [step]);

  // ── Initial setup (auth sync + setup complete + install start) ───────────
  const runSetup = useCallback(async () => {
    let extOk = false;

    // 1. Auth sync
    try {
      if (token && user) {
        await sendToExtension(
          "JAP_AUTH_SYNC",
          { token, user: { id: user.id, email: user.email, name: user.name } },
          3000,
        );
      }
      // 2. Setup complete (stores settings, returns extId)
      const resp = await sendToExtension(
        "JAP_SETUP_COMPLETE",
        { language: "ja", learningPath: path ?? "beginner", goals: [] },
        3000,
      );
      if (resp.extId) setExtId(String(resp.extId));
      extOk = true;
    } catch {
      setExtWarn(true);
    }

    // 3. Kick off real dictionary install (fire-and-forget via the extension)
    if (extOk) {
      try {
        await sendToExtension("JAP_INSTALL_START", {}, 5000);
      } catch {
        // Extension didn't acknowledge the start — surface the warning
        setExtWarn(true);
      }
    }

    // If extension is unavailable, still let user continue after showing warning
    if (!extOk) {
      localStorage.setItem(WEB_SETUP_COMPLETE_KEY, "true");
    }
  }, [path, token, user]);

  useEffect(() => {
    if (step === "install" && !installRan.current) {
      installRan.current = true;
      void runSetup();
    }
  }, [step, runSetup]);

  const handleSkipInstall = useCallback(() => {
    // Cancel any in-progress install and proceed
    void sendToExtension("JAP_INSTALL_CANCEL", {}, 2000).catch(() => {});
    localStorage.setItem(WEB_SETUP_COMPLETE_KEY, "true");
    setStep("done");
  }, []);

  const handleRetryInstall = useCallback(async () => {
    // Reset resource states to pending
    setResources(DEFAULT_RESOURCES);
    try {
      await sendToExtension("JAP_INSTALL_CANCEL", {}, 2000);
      await sendToExtension("JAP_INSTALL_START", {}, 5000);
    } catch {
      setExtWarn(true);
    }
  }, []);

  const stepIndex = STEPS.indexOf(step);
  const anyFailed = resources.some((r) => r.status === "failed");

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
          {step === "language" && <StepLanguage onNext={() => setStep("path")} />}
          {step === "path" && (
            <StepPath selected={path} onSelect={setPath} onNext={() => setStep("pin")} />
          )}
          {step === "pin" && <StepPin onNext={() => setStep("install")} />}
          {step === "install" && (
            <StepInstall
              resources={resources}
              extWarn={extWarn}
              allDone={installDone}
              anyFailed={anyFailed}
              onSkip={handleSkipInstall}
              onRetry={() => void handleRetryInstall()}
            />
          )}
          {step === "done" && <StepDone extId={extId} />}
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

      <p className="text-xs text-slate-600 text-center">More languages coming soon</p>

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
  { id: "beginner",     icon: "🌱", label: "Complete beginner",     sub: "Never studied Japanese before" },
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
            {selected === opt.id && <span className="text-indigo-400 text-lg">✓</span>}
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

      <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 space-y-4">
        <PinStep n={1} icon="🧩" text="Click the puzzle piece icon in your Chrome toolbar" />
        <PinStep n={2} icon="🎌" text='Find "JAP — Japanese Learning" in the list' />
        <PinStep n={3} icon="📌" text="Click the pin icon to pin it to your toolbar" />
      </div>

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

// ── Step: Install (RC5.2 — real progress) ─────────────────────────────────────

function StepInstall({
  resources,
  extWarn,
  allDone,
  anyFailed,
  onSkip,
  onRetry,
}: {
  resources: ResourceState[];
  extWarn: boolean;
  allDone: boolean;
  anyFailed: boolean;
  onSkip: () => void;
  onRetry: () => void;
}) {
  const activeResource = resources.find(
    (r) => r.status === "downloading" || r.status === "installing",
  );
  const doneCount = resources.filter((r) => r.status === "done" || r.status === "skipped").length;
  const overallPct = allDone
    ? 100
    : Math.round(
        resources.reduce((sum, r) => sum + (r.status === "skipped" || r.status === "done" ? 100 : r.percent), 0) /
          resources.length,
      );

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-1">
          Step 4 of 4
        </p>
        <h2 className="text-2xl font-bold text-white leading-tight">
          {allDone ? "Dictionaries ready!" : "Downloading dictionaries…"}
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          {allDone
            ? "All resources are installed. Taking you to the extension…"
            : activeResource
            ? `Installing ${activeResource.resourceLabel}`
            : "Connecting to the JAP extension…"}
        </p>
      </div>

      {/* Overall bar */}
      <div>
        <div className="flex justify-between text-xs text-slate-500 mb-1.5">
          <span>{doneCount} of {resources.length} resources</span>
          <span>{overallPct}%</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full transition-all duration-300"
            style={{ width: `${overallPct}%` }}
          />
        </div>
      </div>

      {/* Per-resource list */}
      <div className="space-y-3">
        {resources.map((r) => (
          <ResourceRow
            key={r.id}
            resource={r}
          />
        ))}
      </div>

      {/* Extension warning */}
      {extWarn && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-3 text-xs text-amber-300 space-y-1">
          <div>⚠ JAP Extension not detected or not responding.</div>
          <div>
            Install the extension from the Chrome Web Store, then return here to
            continue. Dictionaries can also be imported manually via the extension
            settings page.
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-2 pt-1">
        {anyFailed && (
          <button
            onClick={onRetry}
            className="flex-1 bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-semibold py-2.5 rounded-xl hover:bg-indigo-500/30 transition cursor-pointer"
          >
            ↺ Retry Failed
          </button>
        )}
        {(extWarn || anyFailed) && (
          <button
            onClick={onSkip}
            className="flex-1 bg-white/5 border border-white/10 text-slate-400 text-xs py-2.5 rounded-xl hover:bg-white/10 transition cursor-pointer"
          >
            Skip & Continue →
          </button>
        )}
      </div>
    </div>
  );
}

function ResourceRow({ resource }: { resource: ResourceState }) {
  const { resourceLabel, status, percent, bytesLoaded, bytesTotal, speedBps, error } = resource;
  const isActive = status === "downloading" || status === "installing";

  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 space-y-2">
      <div className="flex items-center gap-3">
        <ResourceStatusIcon status={status} />
        <span
          className={`text-sm flex-1 ${
            status === "done" || status === "skipped"
              ? "text-slate-400"
              : isActive
              ? "text-white font-medium"
              : status === "failed"
              ? "text-red-400"
              : "text-slate-600"
          }`}
        >
          {resourceLabel}
          {status === "skipped" && (
            <span className="ml-2 text-xs text-slate-600">already installed</span>
          )}
        </span>
        {isActive && bytesTotal > 0 && (
          <span className="text-xs text-slate-500 whitespace-nowrap">
            {formatBytes(bytesLoaded)} / {formatBytes(bytesTotal)}
            {speedBps > 0 && ` · ${formatSpeed(speedBps)}`}
          </span>
        )}
      </div>

      {isActive && (
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-200 ${
              status === "installing"
                ? "bg-gradient-to-r from-purple-500 to-indigo-400"
                : "bg-gradient-to-r from-teal-500 to-indigo-400"
            }`}
            style={{ width: `${percent}%` }}
          />
        </div>
      )}

      {status === "failed" && error && (
        <p className="text-xs text-red-400/80">{error}</p>
      )}
    </div>
  );
}

function ResourceStatusIcon({ status }: { status: ResourceState["status"] }) {
  if (status === "done" || status === "skipped")
    return (
      <span className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-[10px] flex-shrink-0">
        ✓
      </span>
    );
  if (status === "downloading" || status === "installing")
    return (
      <span className="w-5 h-5 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin flex-shrink-0" />
    );
  if (status === "failed")
    return (
      <span className="w-5 h-5 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 text-[10px] flex-shrink-0">
        ✕
      </span>
    );
  return <span className="w-5 h-5 rounded-full border border-white/15 flex-shrink-0" />;
}

// ── Step: Done ────────────────────────────────────────────────────────────────

function StepDone({ extId }: { extId: string | null }) {
  const navigate = useNavigate();

  const openExtension = () => {
    if (extId) {
      window.open(`chrome-extension://${extId}/popup.html`, "_blank");
    } else {
      alert(
        "Click the JAP 🎌 icon in your Chrome toolbar to open the extension.\n\n" +
          "If you don't see it, click the 🧩 puzzle icon and pin JAP first.",
      );
    }
  };

  return (
    <div className="space-y-6 text-center">
      <div className="flex flex-col items-center gap-2 py-4">
        <div className="text-6xl mb-2 animate-bounce">🎌</div>
        <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-1">✓ Everything is ready.</h2>
        <p className="text-slate-400 text-sm">
          Your Japanese learning environment is set up. Time to start immersing!
        </p>
      </div>

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
