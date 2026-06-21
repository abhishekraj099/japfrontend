import { DeckCard } from "./DeckCard";
import type { Deck } from "@/types/deck.types";

interface Props {
  decks: Deck[];
}

export function DeckList({ decks }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {decks.map((deck) => (
        <DeckCard key={deck.id} deck={deck} />
      ))}
    </div>
  );
}
