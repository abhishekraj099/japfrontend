import { CardItem } from "./CardItem";
import type { Card } from "@/types/card.types";

interface Props {
  cards: Card[];
  deckId: string;
}

export function CardList({ cards, deckId }: Props) {
  return (
    <div className="space-y-3">
      {cards.map((card) => (
        <CardItem key={card.id} card={card} deckId={deckId} />
      ))}
    </div>
  );
}
