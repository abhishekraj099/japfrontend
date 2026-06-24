import type { CardTemplate } from "./types";

/**
 * The four built-in templates (Phase 33). Section order + components reproduce
 * the legacy ReviewCard layout exactly, per card type. These are static objects
 * compiled once — no runtime parsing.
 */

export const BASIC_TEMPLATE: CardTemplate = {
  id: "default-basic",
  name: "Basic",
  cardType: "vocab",
  description: "Vocabulary card: word + reading + pitch on the front, meaning on the back.",
  isDefault: true,
  templateVersion: 1,
  frontLabel: "Question",
  backLabel: "Answer",
  front: [{ component: "word" }, { component: "reading", props: { variant: "front" } }, { component: "pitchAccent" }],
  back: [{ component: "meaning" }, { component: "image" }, { component: "audio" }, { component: "jlpt" }],
};

export const COMBINED_TEMPLATE: CardTemplate = {
  id: "default-combined",
  name: "Combined",
  cardType: "vocab",
  description: "Vocabulary card carrying an example sentence (render mode of vocab).",
  isDefault: true,
  templateVersion: 1,
  frontLabel: "Question",
  backLabel: "Answer",
  front: [{ component: "word" }, { component: "reading", props: { variant: "front" } }, { component: "pitchAccent" }],
  back: [
    { component: "meaning" },
    { component: "image" },
    { component: "audio" },
    { component: "combinedExample" },
    { component: "jlpt" },
  ],
};

export const SENTENCE_TEMPLATE: CardTemplate = {
  id: "default-sentence",
  name: "Sentence",
  cardType: "sentence",
  description: "Sentence card: sentence on the front, translation + reading + examples on the back.",
  isDefault: true,
  templateVersion: 1,
  frontLabel: "Sentence",
  backLabel: "Translation",
  front: [{ component: "word" }],
  back: [
    { component: "meaning" },
    { component: "image" },
    { component: "audio" },
    { component: "reading", props: { variant: "sentenceBack" } },
    { component: "examples" },
    { component: "jlpt" },
  ],
};

export const GRAMMAR_TEMPLATE: CardTemplate = {
  id: "default-grammar",
  name: "Grammar",
  cardType: "grammar",
  description: "Grammar pattern: pattern on the front, meaning + examples on the back.",
  isDefault: true,
  templateVersion: 1,
  frontLabel: "Pattern",
  backLabel: "Meaning",
  front: [{ component: "word" }],
  back: [
    { component: "meaning" },
    { component: "image" },
    { component: "audio" },
    { component: "examples" },
    { component: "jlpt" },
  ],
};

export const DEFAULT_TEMPLATES = [BASIC_TEMPLATE, COMBINED_TEMPLATE, SENTENCE_TEMPLATE, GRAMMAR_TEMPLATE];
