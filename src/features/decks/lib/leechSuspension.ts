/**
 * Client-side leech suspension (Phase 52). Stored in localStorage only — never
 * touches FSRS or the backend. A suspended card is excluded from Focus Leech
 * Reviews (via the ?exclude= param) and flagged in the UI.
 */
const KEY = "jap_leech_suspended";

type SuspendMap = Record<string, number>; // cardId -> suspendedUntil (epoch ms; 0 = indefinite)

function read(): SuspendMap {
  try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch { return {}; }
}
function write(m: SuspendMap) { localStorage.setItem(KEY, JSON.stringify(m)); }

export function suspendedIds(): string[] {
  const m = read();
  const now = Date.now();
  const active = Object.entries(m).filter(([, until]) => until === 0 || until > now).map(([id]) => id);
  if (active.length !== Object.keys(m).length) write(Object.fromEntries(active.map((id) => [id, m[id]])));
  return active;
}
export function isSuspended(id: string): boolean { return suspendedIds().includes(id); }
export function suspend(id: string, days = 0) {
  const m = read();
  m[id] = days > 0 ? Date.now() + days * 86400000 : 0;
  write(m);
}
export function unsuspend(id: string) { const m = read(); delete m[id]; write(m); }
