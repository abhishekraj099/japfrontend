import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cardService } from "@/services/card.service";
import { QUERY_KEYS } from "@/constants/queryKeys";
import type { Card, CreateCardInput, UpdateCardInput } from "@/types/card.types";

export function useCards(deckId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.CARDS(deckId),
    queryFn: () => cardService.getByDeck(deckId),
    enabled: !!deckId,
  });
}

export function useCreateCard(deckId: string, onSuccess?: () => void) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCardInput) => cardService.create(data),
    onMutate: async (newCard) => {
      await qc.cancelQueries({ queryKey: QUERY_KEYS.CARDS(deckId) });
      const previous = qc.getQueryData<Card[]>(QUERY_KEYS.CARDS(deckId));

      qc.setQueryData<Card[]>(QUERY_KEYS.CARDS(deckId), (old = []) => [
        ...old,
        {
          id: `temp-${Date.now()}`,
          cardType: "vocab",
          question: newCard.question,
          answer: newCard.answer,
          tags: newCard.tags ?? [],
          reading: newCard.reading ?? null,
          meaning: newCard.meaning ?? null,
          grammarNotes: newCard.grammarNotes ?? null,
          jlptLevel: newCard.jlptLevel ?? null,
          frequency: newCard.frequency ?? null,
          pitchAccent: newCard.pitchAccent ?? null,
          patternId: null,
          examples: [],
          sourceType: newCard.sourceType ?? null,
          sourceUrl: newCard.sourceUrl ?? null,
          contextSentence: newCard.contextSentence ?? null,
          deckId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]);

      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) qc.setQueryData(QUERY_KEYS.CARDS(deckId), ctx.previous);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.CARDS(deckId) });
      onSuccess?.();
    },
  });
}

export function useUpdateCard(deckId: string, onSuccess?: () => void) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCardInput }) =>
      cardService.update(id, data),
    onMutate: async ({ id, data }) => {
      await qc.cancelQueries({ queryKey: QUERY_KEYS.CARDS(deckId) });
      const previous = qc.getQueryData<Card[]>(QUERY_KEYS.CARDS(deckId));

      qc.setQueryData<Card[]>(QUERY_KEYS.CARDS(deckId), (old = []) =>
        old.map((c) => (c.id === id ? { ...c, ...data } : c))
      );

      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) qc.setQueryData(QUERY_KEYS.CARDS(deckId), ctx.previous);
    },
    onSuccess: (_data, { id }) => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.CARDS(deckId) });
      qc.invalidateQueries({ queryKey: QUERY_KEYS.CARD(id) });
      onSuccess?.();
    },
  });
}

export function useDeleteCard(deckId: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => cardService.delete(id),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: QUERY_KEYS.CARDS(deckId) });
      const previous = qc.getQueryData<Card[]>(QUERY_KEYS.CARDS(deckId));

      qc.setQueryData<Card[]>(QUERY_KEYS.CARDS(deckId), (old = []) =>
        old.filter((c) => c.id !== id)
      );

      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) qc.setQueryData(QUERY_KEYS.CARDS(deckId), ctx.previous);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.CARDS(deckId) });
    },
  });
}
