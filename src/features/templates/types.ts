import type { CardType, JlptLevel } from "@/types/card.types";

/**
 * Card-template foundation (Phase 33).
 *
 * Cards render through configurable templates instead of `if (cardType === …)`
 * branches. A template is a plain, statically-defined object (no runtime
 * parsing) describing the ordered components that make up the front and back
 * faces. The TemplateRenderer maps each component id to a small presentational
 * renderer. This is the foundation only — no editor/marketplace/sharing.
 */

/** Components a template face can contain. Each renders independently. */
export type ComponentId =
  | "word"
  | "reading"
  | "meaning"
  | "sentence"
  | "translation"
  | "audio"
  | "image"
  | "pitchAccent"
  | "grammar"
  | "frequency"
  | "jlpt"
  | "source"
  // Composite renderers needed for byte-identical fidelity with the legacy UI:
  | "examples"
  | "combinedExample";

export interface TemplateSection {
  component: ComponentId;
  /** Optional per-section props (e.g. a styling `variant`). Static — not parsed. */
  props?: Record<string, unknown>;
}

export interface CardTemplate {
  id: string;
  name: string;
  cardType: CardType;
  description: string;
  isDefault: boolean;
  templateVersion: number;
  createdAt?: string;
  updatedAt?: string;
  /** Face labels (chrome) — kept on the template so no cardType branching leaks. */
  frontLabel: string;
  backLabel: string;
  front: TemplateSection[];
  back: TemplateSection[];
}

/**
 * Structural card shape the renderers read. `DueCard` and the card browser's
 * `Card` both satisfy it. Optional fields (frequency/source) support future
 * templates without requiring data today.
 */
export interface TemplateCard {
  cardType: CardType;
  question: string;
  answer: string;
  reading: string | null;
  pitchAccent: string | null;
  jlptLevel: JlptLevel | null;
  examples: string[];
  exampleSentence: string | null;
  exampleReading: string | null;
  exampleTranslation: string | null;
  imageUrl: string | null;
  audioUrl: string | null;
  frequency?: number | null;
  sourceUrl?: string | null;
}
