import type { CardType } from "@/types/card.types";

interface Props {
  cardType: CardType;
  className?: string;
}

/** Visual marker distinguishing Grammar vs Vocabulary cards across the
 *  card browser, deck view and review session. */
export function CardTypeBadge({ cardType, className = "" }: Props) {
  const isGrammar = cardType === "grammar";
  return (
    <span
      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
        isGrammar
          ? "bg-emerald-50 text-emerald-600"
          : "bg-sky-50 text-sky-600"
      } ${className}`}
    >
      {isGrammar ? "Grammar" : "Vocabulary"}
    </span>
  );
}
