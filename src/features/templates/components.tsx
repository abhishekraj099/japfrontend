import type { ComponentType } from "react";
import { AudioButton } from "@/components/common/AudioButton";
import { NativeAudioButton } from "@/components/common/NativeAudioButton";
import { PitchAccent } from "@/components/common/PitchAccent";
import type { ComponentId, TemplateCard } from "./types";

/**
 * Component renderers (Phase 33). Each reproduces the EXACT legacy ReviewCard
 * markup for one piece of a card, so template-driven rendering is byte-identical
 * to the previous fixed layout. Renderers return null when their data is absent
 * (matching the old `card.x && …` guards).
 */

export interface RenderProps {
  card: TemplateCard;
  variant?: string;
}

type Renderer = ComponentType<RenderProps>;

const Word: Renderer = ({ card }) => (
  <p className="font-jp text-4xl leading-snug text-ink-900 break-words">
    {card.question}
    <AudioButton text={card.question} className="ml-2 align-middle text-2xl" />
  </p>
);

// variant "front" = large vocab reading; "sentenceBack" = small reading on the answer face.
const Reading: Renderer = ({ card, variant }) => {
  if (!card.reading) return null;
  if (variant === "sentenceBack") {
    return <p className="font-jp mt-2 text-sm text-ink-500">{card.reading}</p>;
  }
  return <p className="font-jp mt-3 text-lg text-ink-500">{card.reading}</p>;
};

// Always rendered for vocab fronts (PitchAccent itself returns null when empty).
const PitchAccentBlock: Renderer = ({ card }) => (
  <div className="mt-1 flex items-center justify-center gap-2">
    <PitchAccent reading={card.reading} pitchAccent={card.pitchAccent} />
    {card.pitchAccent && (
      <span className="text-sm font-semibold text-sakura-500">[{card.pitchAccent}]</span>
    )}
  </div>
);

const Meaning: Renderer = ({ card }) => (
  <p className="font-jp text-3xl leading-snug text-indigo-500 break-words">{card.answer}</p>
);

const Image: Renderer = ({ card }) =>
  card.imageUrl ? (
    <img
      src={card.imageUrl}
      alt=""
      className="mx-auto mt-4 max-h-40 rounded-lg border border-line object-contain"
    />
  ) : null;

const Audio: Renderer = ({ card }) =>
  card.audioUrl ? (
    <div className="mt-3">
      <NativeAudioButton src={card.audioUrl} />
    </div>
  ) : null;

const CombinedExample: Renderer = ({ card }) => {
  if (!card.exampleSentence) return null;
  return (
    <div className="mx-auto mt-5 max-w-sm space-y-1 text-left">
      {card.reading && <p className="font-jp text-sm text-ink-500">{card.reading}</p>}
      <p className="section-label mt-3">Example</p>
      <p className="font-jp text-sm leading-snug text-ink-700">
        {card.exampleSentence}
        <AudioButton text={card.exampleSentence} className="ml-1.5 align-middle text-xs" />
      </p>
      {card.exampleReading && <p className="font-jp text-xs text-ink-400">{card.exampleReading}</p>}
      {card.exampleTranslation && <p className="text-sm text-ink-500">{card.exampleTranslation}</p>}
    </div>
  );
};

const Examples: Renderer = ({ card }) =>
  card.examples.length > 0 ? (
    <ul className="mx-auto mt-5 max-w-sm space-y-1 text-left">
      {card.examples.map((ex, i) => (
        <li key={i} className="text-sm leading-snug text-ink-500">
          {ex.replace("—", "→")}
        </li>
      ))}
    </ul>
  ) : null;

const Jlpt: Renderer = ({ card }) =>
  card.jlptLevel ? (
    <div className="mt-5">
      <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-500">
        JLPT {card.jlptLevel}
      </span>
    </div>
  ) : null;

// ── Components reserved for future templates (not in any default template) ───
const Sentence: Renderer = ({ card }) =>
  card.exampleSentence ? (
    <p className="font-jp text-2xl leading-snug text-ink-900 break-words">{card.exampleSentence}</p>
  ) : null;

const Translation: Renderer = ({ card }) =>
  card.exampleTranslation ? <p className="text-base text-ink-500">{card.exampleTranslation}</p> : null;

const Grammar: Renderer = ({ card }) => <Examples card={card} />;

const Frequency: Renderer = ({ card }) =>
  card.frequency != null ? (
    <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs text-indigo-400">
      freq {card.frequency}
    </span>
  ) : null;

const Source: Renderer = ({ card }) =>
  card.sourceUrl ? (
    <a href={card.sourceUrl} target="_blank" rel="noreferrer" className="text-xs text-indigo-400 underline">
      source
    </a>
  ) : null;

/** Component id → renderer. Built once at module load (no per-render lookup cost). */
export const COMPONENT_REGISTRY: Record<ComponentId, Renderer> = {
  word: Word,
  reading: Reading,
  meaning: Meaning,
  sentence: Sentence,
  translation: Translation,
  audio: Audio,
  image: Image,
  pitchAccent: PitchAccentBlock,
  grammar: Grammar,
  frequency: Frequency,
  jlpt: Jlpt,
  source: Source,
  examples: Examples,
  combinedExample: CombinedExample,
};
