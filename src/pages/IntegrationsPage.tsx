import { useState } from "react";
import { Puzzle, FileText, NotebookPen } from "lucide-react";
import {
  getAnkiSettings,
  saveAnkiSettings,
  ankiVersion,
  DEFAULT_ANKI_URL,
} from "@/features/integrations/anki";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Lantern } from "@/components/common/Kawaii";

type TestState = "idle" | "testing" | "ok" | "fail";

const SOON = [
  { icon: Puzzle, name: "Browser extension", desc: "Make cards from any website you read or watch." },
  { icon: FileText, name: "CSV / Anki export", desc: "Export any deck to a shareable file." },
  { icon: NotebookPen, name: "Notion", desc: "Sync your vocabulary to a Notion database." },
];

/**
 * Settings → Integrations → Anki.
 *
 * Client-side AnkiConnect configuration (no backend). The extension reads its
 * own copy of these settings to push saved cards to Anki Desktop; this page
 * lets the user enable sync, set the AnkiConnect URL, and test the connection.
 */
export function IntegrationsPage() {
  const initial = getAnkiSettings();
  const [enabled, setEnabled] = useState(initial.enabled);
  const [url, setUrl] = useState(initial.url);
  const [test, setTest] = useState<TestState>("idle");
  const [saved, setSaved] = useState(false);

  const onTest = async () => {
    setTest("testing");
    try {
      await ankiVersion(url || DEFAULT_ANKI_URL);
      setTest("ok");
    } catch {
      setTest("fail");
    }
  };

  const onSave = () => {
    saveAnkiSettings({ enabled, url: url || DEFAULT_ANKI_URL });
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <SectionHeader
        jp="設定 · Settings"
        title="Integrations"
        subtitle="Connect external services to JAP."
      />

      {/* Anki */}
      <div className="paper-card relative space-y-5 overflow-hidden p-6">
        <Lantern className="pointer-events-none absolute -right-4 -top-4 h-20 w-20 rotate-6 opacity-60" />
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-[#7c5cff] text-xl font-bold text-white shadow-lg shadow-indigo-500/25">
            A
          </span>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="font-display text-lg text-ink-900">Anki</p>
              {enabled && (
                <span className="rounded-full bg-jade-500/15 px-2 py-0.5 text-[11px] font-bold text-jade-500">
                  Enabled
                </span>
              )}
            </div>
            <p className="text-sm text-ink-500">
              Send saved cards to Anki Desktop via AnkiConnect.
            </p>
          </div>
          {/* toggle */}
          <button
            onClick={() => setEnabled((v) => !v)}
            role="switch"
            aria-checked={enabled}
            className={`relative h-7 w-12 shrink-0 rounded-full ring-1 transition-colors ${
              enabled
                ? "bg-jade-500 ring-jade-500/40 shadow-[0_0_14px_-2px_rgba(26,211,176,0.7)]"
                : "bg-white/10 ring-white/15"
            }`}
          >
            <span
              className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-md transition-transform duration-200 ${
                enabled ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>

        <div className="space-y-1.5">
          <label className="text-[13px] font-medium text-ink-500" htmlFor="anki-url">
            AnkiConnect URL
          </label>
          <input
            id="anki-url"
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setTest("idle");
            }}
            placeholder={DEFAULT_ANKI_URL}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[15px] text-ink-900 outline-none transition placeholder:text-ink-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onTest}
            disabled={test === "testing"}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-ink-700 transition hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {test === "testing" ? "Testing…" : "Test connection"}
          </button>
          <button
            onClick={onSave}
            className="rounded-xl bg-indigo-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-600 active:scale-95 cursor-pointer"
          >
            Save
          </button>
          {saved && <span className="text-sm font-semibold text-jade-500">Saved ✓</span>}
          {test === "ok" && <span className="text-sm font-semibold text-jade-500">Connected ✓</span>}
        </div>

        {test === "fail" && (
          <p className="rounded-xl bg-red-500/10 px-4 py-3 text-sm font-medium text-red-400">
            Failed — make sure Anki is running with the AnkiConnect add-on, and that
            this site is allowed in its CORS settings.
          </p>
        )}
      </div>

      {/* more integrations */}
      <div>
        <p className="section-label mb-3 px-1">More integrations</p>
        <div className="grid gap-3 sm:grid-cols-1">
          {SOON.map(({ icon: Icon, name, desc }) => (
            <div key={name} className="paper-card flex items-center gap-4 p-4 opacity-80">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/5 text-ink-400">
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-ink-900">{name}</p>
                <p className="truncate text-sm text-ink-500">{desc}</p>
              </div>
              <span className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-bold text-ink-400 ring-1 ring-white/10">
                Soon
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
