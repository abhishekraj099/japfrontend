import { api } from "@/lib/axios";
import type { Card, CreateCardInput, UpdateCardInput } from "@/types/card.types";

export const cardService = {
  getByDeck: (deckId: string) =>
    api.get<Card[]>(`/cards/deck/${deckId}`).then((r) => r.data),

  getOne: (id: string) =>
    api.get<Card>(`/cards/${id}`).then((r) => r.data),

  create: (data: CreateCardInput) =>
    api.post<Card>("/cards", data).then((r) => r.data),

  update: (id: string, data: UpdateCardInput) =>
    api.patch<Card>(`/cards/${id}`, data).then((r) => r.data),

  delete: (id: string) =>
    api.delete(`/cards/${id}`).then((r) => r.data),
  reset: (id: string) => api.post(`/cards/${id}/reset`).then((r) => r.data),
};
