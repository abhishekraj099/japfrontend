import { z } from "zod";

export const cardSchema = z.object({
  question: z.string().min(1, "Question is required").max(1000),
  answer: z.string().min(1, "Answer is required").max(1000),
  reading: z.string().max(500).optional(),
  jlptLevel: z.enum(["", "N5", "N4", "N3", "N2", "N1"]).optional(),
  contextSentence: z.string().max(1000).optional(),
  grammarNotes: z.string().max(2000).optional(),
  // Grammar-card examples, edited as one sentence per line in a textarea.
  examples: z.string().max(5000).optional(),
  tags: z.string().optional(),
});

export type CardSchema = z.infer<typeof cardSchema>;
