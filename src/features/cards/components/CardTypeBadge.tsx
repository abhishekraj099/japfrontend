import type { CardType } from "@/types/card.types";

interface Props {
  cardType: CardType;
  className?: string;
}

const VARIANTS: Record<CardType, { label: string; cls: string }> = {
  vocab: { label: "Vocabulary", cls: "bg-sky-50 text-sky-600" },
  grammar: { label: "Grammar", cls: "bg-emerald-50 text-emerald-600" },
  sentence: { label: "Sentence", cls: "bg-amber-50 text-amber-600" },
};

/** Visual marker distinguishing Vocabulary, Grammar and Sentence cards across
 *  the card browser, deck view and review session. */
export function CardTypeBadge({ cardType, className = "" }: Props) {
  const { label, cls } = VARIANTS[cardType] ?? VARIANTS.vocab;
  return (
    <span
      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cls} ${className}`}
    >
      {label}
    </span>
  );
}
