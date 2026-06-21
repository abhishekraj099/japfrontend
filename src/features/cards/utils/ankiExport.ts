import type { Card, CardType } from "@/types/card.types";

/**
 * Client-side Anki CSV export.
 *
 * Produces a UTF-8 (BOM) CSV that Anki can import directly: the leading
 * `#`-prefixed lines are Anki import directives (separator / columns) which
 * Anki reads to auto-map fields and which other CSV tools simply show as
 * leading rows. No backend, no AnkiConnect, no review history / FSRS data.
 */

const CARD_TYPE_LABELS: Record<CardType, string> = {
  vocab: "Vocabulary",
  grammar: "Grammar",
  sentence: "Sentence",
};

export const ANKI_COLUMNS = [
  "Front",
  "Back",
  "Reading",
  "Pitch Accent",
  "JLPT",
  "Card Type",
  "Examples",
] as const;

/** RFC 4180 field: always quoted, embedded quotes doubled. Safe for commas,
 *  newlines and Japanese text alike. */
function csvField(value: string | null | undefined): string {
  const s = value ?? "";
  return `"${s.replace(/"/g, '""')}"`;
}

function cardToRow(card: Card): string {
  const fields = [
    card.question,
    card.answer,
    card.reading,
    card.pitchAccent,
    card.jlptLevel,
    CARD_TYPE_LABELS[card.cardType] ?? card.cardType,
    card.examples.join("\n"),
  ];
  return fields.map(csvField).join(",");
}

/**
 * Build the full CSV text for a set of cards. Handles all card types and any
 * deck size (single string join — no per-row DOM work).
 */
export function buildAnkiCsv(cards: Card[]): string {
  const directives = [
    "#separator:Comma",
    "#html:false",
    `#columns:${ANKI_COLUMNS.join(",")}`,
  ];
  const rows = cards.map(cardToRow);
  return [...directives, ...rows].join("\n") + "\n";
}

/** Make a deck name safe for use as a filename. */
function safeFileName(name: string): string {
  const cleaned = name.replace(/[\\/:*?"<>|]+/g, "_").trim();
  return cleaned || "deck";
}

/**
 * Generate the CSV in the browser and trigger a download. UTF-8 BOM is
 * prepended so Excel and other tools detect the encoding; Anki strips it.
 */
export function exportDeckToAnki(deckName: string, cards: Card[]): void {
  const csv = buildAnkiCsv(cards);
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${safeFileName(deckName)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
