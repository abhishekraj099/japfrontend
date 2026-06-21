/**
 * Text-to-speech for card audio (Phase 22). Uses the browser Web Speech API —
 * no backend, no media files. Picks a Japanese voice when available.
 */
export function ttsAvailable(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function speak(text: string, lang = "ja-JP"): void {
  if (!text || !ttsAvailable()) return;
  const synth = window.speechSynthesis;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  u.rate = 0.95;
  const jaVoice = synth.getVoices().find((v) => v.lang?.toLowerCase().startsWith("ja"));
  if (jaVoice) u.voice = jaVoice;
  synth.cancel(); // stop any in-flight utterance first
  synth.speak(u);
}
