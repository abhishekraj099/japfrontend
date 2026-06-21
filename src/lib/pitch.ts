/**
 * Pitch-accent helpers (Phase 22). Turns a stored accent value + kana reading
 * into a Tokyo-dialect High/Low mora pattern for visualization.
 */

// Small kana that attach to the previous mora (yōon, small vowels).
const SMALL = new Set([
  "ゃ", "ゅ", "ょ", "ャ", "ュ", "ョ",
  "ぁ", "ぃ", "ぅ", "ぇ", "ぉ", "ァ", "ィ", "ゥ", "ェ", "ォ", "ゎ", "ヮ",
]);

/** Split a kana reading into morae (yōon combine with the base kana). */
export function toMorae(reading: string): string[] {
  const out: string[] = [];
  for (const ch of [...reading]) {
    if (SMALL.has(ch) && out.length) out[out.length - 1] += ch;
    else out.push(ch);
  }
  return out;
}

/** Parse the stored accent (circled digit ⓪①…⑳, or a plain number) → integer. */
export function parseAccent(pitchAccent: string | null | undefined): number | null {
  if (!pitchAccent) return null;
  const c = pitchAccent.trim();
  const code = c.codePointAt(0);
  if (code === 0x24ea) return 0; // ⓪
  if (code && code >= 0x2460 && code <= 0x2473) return code - 0x2460 + 1; // ①..⑳
  const n = parseInt(c.replace(/[^\d]/g, ""), 10);
  return Number.isFinite(n) ? n : null;
}

/** High/Low pattern per mora for the given accent (0 = heiban … n = drop after n). */
export function pitchPattern(count: number, accent: number): ("H" | "L")[] {
  const p: ("H" | "L")[] = [];
  for (let i = 1; i <= count; i++) {
    if (accent === 0) p.push(i === 1 ? "L" : "H");
    else if (accent === 1) p.push(i === 1 ? "H" : "L");
    else p.push(i === 1 ? "L" : i <= accent ? "H" : "L");
  }
  return p;
}
