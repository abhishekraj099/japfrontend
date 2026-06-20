import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cardSchema, type CardSchema } from "../schemas/card.schema";
import { useUpdateCard } from "../hooks/useCards";
import type { Card, UpdateCardInput } from "@/types/card.types";

interface Props {
  card: Card;
  deckId: string;
  onClose: () => void;
}

function parseTags(raw: string | undefined): string[] {
  if (!raw?.trim()) return [];
  return raw.split(",").map((t) => t.trim()).filter(Boolean);
}

/** Grammar examples are edited one-per-line in a textarea. */
function parseLines(raw: string | undefined): string[] {
  if (!raw?.trim()) return [];
  return raw.split("\n").map((l) => l.trim()).filter(Boolean);
}

const inputCls =
  "w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition";

export function EditCardForm({ card, deckId, onClose }: Props) {
  const { mutate: updateCard, isPending, error } = useUpdateCard(deckId, onClose);
  const isGrammar = card.cardType === "grammar";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CardSchema>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      question: card.question,
      answer: card.answer,
      reading: card.reading ?? "",
      jlptLevel: card.jlptLevel ?? "",
      contextSentence: card.contextSentence ?? "",
      grammarNotes: card.grammarNotes ?? "",
      examples: card.examples.join("\n"),
      tags: card.tags.join(", "),
    },
  });

  const errorMessage = error
    ? (error as { response?: { data?: { error?: string } } }).response?.data
        ?.error ?? "Failed to update card."
    : null;

  const onSubmit = (data: CardSchema) => {
    // Build a partial update. Fields not included are left untouched by the
    // backend — this is what preserves patternId, cardType, review history and
    // FSRS scheduling across an edit.
    const payload: UpdateCardInput = {
      question: data.question,
      answer: data.answer,
      tags: parseTags(data.tags),
      jlptLevel: data.jlptLevel ? data.jlptLevel : undefined,
      grammarNotes: data.grammarNotes || undefined,
    };

    if (isGrammar) {
      payload.examples = parseLines(data.examples);
    } else {
      // Vocabulary-only fields — unchanged behaviour.
      payload.reading = data.reading || undefined;
      payload.contextSentence = data.contextSentence || undefined;
    }

    updateCard({ id: card.id, data: payload });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
          {errorMessage}
        </div>
      )}

      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700" htmlFor="edit-question">
          {isGrammar ? "Pattern" : "Question"} <span className="text-red-500">*</span>
        </label>
        <textarea
          id="edit-question"
          rows={2}
          className={`${inputCls} resize-none`}
          {...register("question")}
        />
        {errors.question && (
          <p className="text-xs text-red-500">{errors.question.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700" htmlFor="edit-answer">
          {isGrammar ? "Explanation" : "Answer"} <span className="text-red-500">*</span>
        </label>
        <textarea
          id="edit-answer"
          rows={2}
          className={`${inputCls} resize-none`}
          {...register("answer")}
        />
        {errors.answer && (
          <p className="text-xs text-red-500">{errors.answer.message}</p>
        )}
      </div>

      <div className={isGrammar ? "" : "grid grid-cols-2 gap-3"}>
        {!isGrammar && (
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700" htmlFor="edit-reading">
              Reading <span className="text-slate-400 font-normal">(furigana)</span>
            </label>
            <input id="edit-reading" type="text" className={inputCls} {...register("reading")} />
          </div>
        )}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700" htmlFor="edit-jlptLevel">
            JLPT Level
          </label>
          <select
            id="edit-jlptLevel"
            className={`${inputCls} bg-white`}
            {...register("jlptLevel")}
          >
            <option value="">—</option>
            <option value="N5">N5</option>
            <option value="N4">N4</option>
            <option value="N3">N3</option>
            <option value="N2">N2</option>
            <option value="N1">N1</option>
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700" htmlFor="edit-grammarNotes">
          Grammar notes
        </label>
        <textarea
          id="edit-grammarNotes"
          rows={2}
          className={`${inputCls} resize-none`}
          {...register("grammarNotes")}
        />
      </div>

      {isGrammar ? (
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700" htmlFor="edit-examples">
            Examples
            <span className="text-slate-400 font-normal ml-1">(one per line)</span>
          </label>
          <textarea
            id="edit-examples"
            rows={3}
            placeholder={"日本語を勉強しています — I am studying Japanese"}
            className={`${inputCls} resize-none`}
            {...register("examples")}
          />
        </div>
      ) : (
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700" htmlFor="edit-contextSentence">
            Example sentence
          </label>
          <textarea
            id="edit-contextSentence"
            rows={2}
            className={`${inputCls} resize-none`}
            {...register("contextSentence")}
          />
        </div>
      )}

      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700" htmlFor="edit-tags">
          Tags
          <span className="text-slate-400 font-normal ml-1">(comma separated)</span>
        </label>
        <input id="edit-tags" type="text" className={inputCls} {...register("tags")} />
      </div>

      <div className="flex gap-3 pt-1">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 px-4 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 transition cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 px-4 py-2 text-sm bg-slate-900 text-white rounded-lg hover:bg-slate-700 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isPending ? "Saving…" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
