import { useQuery } from "@tanstack/react-query";
import { cardService } from "@/services/card.service";
import { QUERY_KEYS } from "@/constants/queryKeys";

export function useCard(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.CARD(id),
    queryFn: () => cardService.getOne(id),
    enabled: !!id,
  });
}
