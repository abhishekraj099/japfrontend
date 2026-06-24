import type { GrammarLibraryItem, GrammarStatus } from "@/types/grammar.types";

// Mastered threshold mirrors the analytics/coverage convention scaled up:
// "known" at FSRS stability ≥ 21 days, "mastered" at ≥ 60 days.
const KNOWN_STABILITY = 21;
const MASTERED_STABILITY = 60;

/** Derive a learning status from the FSRS schedule (no new tracking). */
export function statusOf(item: GrammarLibraryItem): GrammarStatus {
  const s = item.schedule;
  if (!s || s.reps === 0) return "new";
  if (s.stability >= MASTERED_STABILITY) return "mastered";
  if (s.stability >= KNOWN_STABILITY) return "known";
  const st = (s.state || "").toLowerCase();
  if (st === "new") return "new";
  return "learning";
}

export function isDue(item: GrammarLibraryItem): boolean {
  if (!item.schedule) return true; // never scheduled → due
  return new Date(item.schedule.dueDate).getTime() <= Date.now();
}

export const STATUS_LABEL: Record<GrammarStatus, string> = {
  new: "New",
  learning: "Learning",
  known: "Known",
  mastered: "Mastered",
};

export const STATUS_ACCENT: Record<GrammarStatus, string> = {
  new: "text-indigo-500",
  learning: "text-amber-600",
  known: "text-emerald-600",
  mastered: "text-emerald-700",
};
