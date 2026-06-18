import { api } from "@/lib/axios";
import type { Deck, CreateDeckInput, UpdateDeckInput } from "@/types/deck.types";

export const deckService = {
  getAll: () => api.get<Deck[]>("/decks").then((r) => r.data),

  getOne: (id: string) => api.get<Deck>(`/decks/${id}`).then((r) => r.data),

  create: (data: CreateDeckInput) =>
    api.post<Deck>("/decks", data).then((r) => r.data),

  update: (id: string, data: UpdateDeckInput) =>
    api.patch<Deck>(`/decks/${id}`, data).then((r) => r.data),

  delete: (id: string) => api.delete(`/decks/${id}`).then((r) => r.data),
};
