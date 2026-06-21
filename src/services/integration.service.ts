import { api } from "@/lib/axios";
import type { Integration } from "@/types/integration.types";

export const integrationService = {
  getAll: () =>
    api.get<Integration[]>("/integrations").then((r) => r.data),

  connectAnki: () =>
    api.post<Integration>("/integrations/anki/connect").then((r) => r.data),

  disconnectAnki: () =>
    api.post<Integration>("/integrations/anki/disconnect").then((r) => r.data),
};
