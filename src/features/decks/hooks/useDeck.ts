import { useQuery } from "@tanstack/react-query";
import { deckService } from "@/services/deck.service";
import { QUERY_KEYS } from "@/constants/queryKeys";

export function useDeck(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.DECK(id),
    queryFn: () => deckService.getOne(id),
    enabled: !!id,
  });
}
