import { z } from "zod";

export const deckSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  description: z.string().max(500, "Description is too long").optional(),
  language: z.string().default("ja"),
});

export type DeckSchema = z.infer<typeof deckSchema>;
// Pre-transform shape (before `.default()` is applied) — used as the
// react-hook-form field-values type so the zodResolver input/output generics
// line up.
export type DeckSchemaInput = z.input<typeof deckSchema>;
