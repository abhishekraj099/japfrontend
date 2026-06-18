export interface Deck {
  id: string;
  name: string;
  description: string | null;
  language: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDeckInput {
  name: string;
  description?: string;
  language?: string;
}

export interface UpdateDeckInput {
  name?: string;
  description?: string;
  language?: string;
}
