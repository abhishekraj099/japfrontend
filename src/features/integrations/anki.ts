/**
 * Client-side AnkiConnect settings + connection test for the web app.
 * Stored in localStorage — no backend. The extension performs the actual
 * card pushes; this page configures and verifies the connection.
 */

export const DEFAULT_ANKI_URL = "http://localhost:8765";

const ENABLED_KEY = "jap.anki.enabled";
const URL_KEY = "jap.anki.url";

export interface AnkiSettings {
  enabled: boolean;
  url: string;
}

export function getAnkiSettings(): AnkiSettings {
  return {
    enabled: localStorage.getItem(ENABLED_KEY) === "1",
    url: localStorage.getItem(URL_KEY) || DEFAULT_ANKI_URL,
  };
}

export function saveAnkiSettings(s: AnkiSettings): void {
  localStorage.setItem(ENABLED_KEY, s.enabled ? "1" : "0");
  localStorage.setItem(URL_KEY, s.url || DEFAULT_ANKI_URL);
}

/** Call AnkiConnect `version`. Resolves to the version number or throws. */
export async function ankiVersion(url: string): Promise<number> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "version", version: 6 }),
  });
  if (!res.ok) throw new Error(`AnkiConnect HTTP ${res.status}`);
  const data = (await res.json()) as { result: number; error: string | null };
  if (data.error) throw new Error(data.error);
  return data.result;
}
