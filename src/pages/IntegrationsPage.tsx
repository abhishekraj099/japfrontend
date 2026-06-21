import { useState } from "react";
import {
  getAnkiSettings,
  saveAnkiSettings,
  ankiVersion,
  DEFAULT_ANKI_URL,
} from "@/features/integrations/anki";

type TestState = "idle" | "testing" | "ok" | "fail";

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
    <div className="space-y-6">
      <div>
        <p className="section-label">Settings</p>
        <h1 className="font-display text-3xl text-ink-900">Integrations</h1>
        <p className="mt-1 text-sm text-ink-500">
          Connect external services to JAP.
        </p>
      </div>

      <div className="paper-card space-y-5 p-5">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-xl">
            🅰
          </span>
          <div>
            <p className="font-semibold text-ink-900">Anki</p>
            <p className="text-xs text-ink-500">
              Send saved cards to Anki Desktop via AnkiConnect.
            </p>
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-ink-700">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
          />
          Enable Anki Sync
        </label>

        <div className="space-y-1">
          <label className="text-sm font-medium text-ink-700" htmlFor="anki-url">
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
            className="w-full rounded-xl border border-line px-3 py-2 text-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onTest}
            disabled={test === "testing"}
            className="rounded-lg border border-line px-4 py-2 text-sm font-medium text-ink-700 transition hover:bg-paper disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {test === "testing" ? "Testing…" : "Test Connection"}
          </button>
          <button
            onClick={onSave}
            className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-paper transition hover:bg-indigo-600 cursor-pointer"
          >
            Save
          </button>
          {saved && <span className="text-sm text-emerald-600">Saved ✓</span>}
        </div>

        {test === "ok" && (
          <p className="text-sm font-medium text-emerald-600">Connected ✓</p>
        )}
        {test === "fail" && (
          <p className="text-sm font-medium text-red-500">
            Failed — make sure Anki is running with the AnkiConnect add-on, and
            that this site is allowed in its CORS settings.
          </p>
        )}
      </div>
    </div>
  );
}
