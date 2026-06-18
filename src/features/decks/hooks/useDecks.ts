import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deckService } from "@/services/deck.service";
import { QUERY_KEYS } from "@/constants/queryKeys";
import type { Deck, CreateDeckInput, UpdateDeckInput } from "@/types/deck.types";

export function useDecks() {
  return useQuery({
    queryKey: QUERY_KEYS.DECKS,
    queryFn: deckService.getAll,
  });
}

export function useCreateDeck(onSuccess?: () => void) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateDeckInput) => deckService.create(data),
    onMutate: async (newDeck) => {
      await qc.cancelQueries({ queryKey: QUERY_KEYS.DECKS });
      const previous = qc.getQueryData<Deck[]>(QUERY_KEYS.DECKS);

      qc.setQueryData<Deck[]>(QUERY_KEYS.DECKS, (old = []) => [
        ...old,
        {
          id: `temp-${Date.now()}`,
          name: newDeck.name,
          description: newDeck.description ?? null,
          language: newDeck.language ?? "ja",
          userId: "",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]);

      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) qc.setQueryData(QUERY_KEYS.DECKS, ctx.previous);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.DECKS });
      onSuccess?.();
    },
  });
}

export function useUpdateDeck(onSuccess?: () => void) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateDeckInput }) =>
      deckService.update(id, data),
    onMutate: async ({ id, data }) => {
      await qc.cancelQueries({ queryKey: QUERY_KEYS.DECKS });
      const previous = qc.getQueryData<Deck[]>(QUERY_KEYS.DECKS);

      qc.setQueryData<Deck[]>(QUERY_KEYS.DECKS, (old = []) =>
        old.map((d) => (d.id === id ? { ...d, ...data } : d))
      );

      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) qc.setQueryData(QUERY_KEYS.DECKS, ctx.previous);
    },
    onSuccess: (_data, { id }) => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.DECKS });
      qc.invalidateQueries({ queryKey: QUERY_KEYS.DECK(id) });
      onSuccess?.();
    },
  });
}

export function useDeleteDeck() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deckService.delete(id),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: QUERY_KEYS.DECKS });
      const previous = qc.getQueryData<Deck[]>(QUERY_KEYS.DECKS);

      qc.setQueryData<Deck[]>(QUERY_KEYS.DECKS, (old = []) =>
        old.filter((d) => d.id !== id)
      );

      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) qc.setQueryData(QUERY_KEYS.DECKS, ctx.previous);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.DECKS });
    },
  });
}
