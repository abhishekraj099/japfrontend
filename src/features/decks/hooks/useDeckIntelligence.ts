import { useQuery } from "@tanstack/react-query";
import { deckService } from "@/services/deck.service";

export function useDeckIntelligence(deckId: string) {
  return useQuery({
    queryKey: ["decks", deckId, "intelligence"],
    queryFn: () => deckService.getIntelligence(deckId),
    enabled: !!deckId,
    staleTime: 60_000,
  });
}
