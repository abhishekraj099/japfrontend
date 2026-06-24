import { GRAMMAR_KEYS } from "@/data/grammarKeys";

/**
 * Lightweight, local sentence context for review cards (Phase 48).
 *
 * The web app has no Japanese tokenizer (kuromoji lives in the extension), so
 * this computes a tokenizer-free approximation: a difficulty estimate from
 * length + kanji density, and surface-level grammar detection via the ported
 * pattern keys. Pure + synchronous; meant to be memoized and computed lazily
 * on reveal. No network.
 */

const KANJI = /[㐀-䶿一-龯々]/;

export interface SentenceContext {
  charCount: number;
  kanjiCount: number;
  difficulty: number; // 0–100
  band: "Easy" | "Intermediate" | "Challenging" | "Advanced";
  grammar: Array<{ name: string; jlptLevel: string }>;
}

function band(d: number): SentenceContext["band"] {
  if (d <= 30) return "Easy";
  if (d <= 60) return "Intermediate";
  if (d <= 80) return "Challenging";
  return "Advanced";
}

export function computeSentenceContext(sentence: string): SentenceContext {
  const chars = [...sentence];
  const charCount = chars.length;
  const kanjiCount = chars.filter((c) => KANJI.test(c)).length;
  const kanjiRatio = charCount ? kanjiCount / charCount : 0;

  // Surface grammar detection (no tokenizer): first key match per pattern.
  const seen = new Set<string>();
  const grammar: Array<{ name: string; jlptLevel: string }> = [];
  for (const p of GRAMMAR_KEYS) {
    if (seen.has(p.name)) continue;
    if (p.keys.some((k) => sentence.includes(k))) {
      seen.add(p.name);
      grammar.push({ name: p.name, jlptLevel: p.jlptLevel });
    }
  }

  // Difficulty: length (50%) + kanji density (35%) + grammar load (15%).
  const lengthPct = Math.min(charCount / 40, 1) * 100;
  const kanjiPct = kanjiRatio * 100;
  const grammarPct = Math.min(grammar.length / 3, 1) * 100;
  const difficulty = Math.round(Math.max(0, Math.min(100, lengthPct * 0.5 + kanjiPct * 0.35 + grammarPct * 0.15)));

  return { charCount, kanjiCount, difficulty, band: band(difficulty), grammar };
}
