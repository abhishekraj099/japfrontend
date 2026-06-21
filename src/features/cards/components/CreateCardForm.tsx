import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cardSchema, type CardSchema } from "../schemas/card.schema";
import { useCreateCard } from "../hooks/useCards";

interface Props {
  deckId: string;
  onClose: () => void;
}

function parseTags(raw: string | undefined): string[] {
  if (!raw?.trim()) return [];
  return raw.split(",").map((t) => t.trim()).filter(Boolean);
}

export function CreateCardForm({ deckId, onClose }: Props) {
  const { mutate: createCard, isPending, error } = useCreateCard(deckId, onClose);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CardSchema>({ resolver: zodResolver(cardSchema) });

  const errorMessage = error
    ? (error as { response?: { data?: { error?: string } } }).response?.data
        ?.error ?? "Failed to create card."
    : null;

  const onSubmit = (data: CardSchema) => {
    createCard({
      deckId,
      question: data.question,
      answer: data.answer,
      tags: parseTags(data.tags),
      reading: data.reading || undefined,
      jlptLevel: data.jlptLevel ? data.jlptLevel : undefined,
      pitchAccent: data.pitchAccent || undefined,
      contextSentence: data.contextSentence || undefined,
      grammarNotes: data.grammarNotes || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
          {errorMessage}
        </div>
      )}

      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700" htmlFor="question">
          Question <span className="text-red-500">*</span>
        </label>
        <textarea
          id="question"
          rows={2}
          placeholder="e.g. 犬"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition resize-none"
          {...register("question")}
        />
        {errors.question && (
          <p className="text-xs text-red-500">{errors.question.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700" htmlFor="answer">
          Answer <span className="text-red-500">*</span>
        </label>
        <textarea
          id="answer"
          rows={2}
          placeholder="e.g. Dog"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition resize-none"
          {...register("answer")}
        />
        {errors.answer && (
          <p className="text-xs text-red-500">{errors.answer.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700" htmlFor="reading">
            Reading <span className="text-slate-400 font-normal">(furigana)</span>
          </label>
          <input
            id="reading"
            type="text"
            placeholder="e.g. いぬ"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
            {...register("reading")}
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700" htmlFor="jlptLevel">
            JLPT Level
          </label>
          <select
            id="jlptLevel"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition bg-white"
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
        <label className="text-sm font-medium text-slate-700" htmlFor="pitchAccent">
          Pitch accent <span className="text-slate-400 font-normal">(optional)</span>
        </label>
        <input
          id="pitchAccent"
          type="text"
          placeholder="e.g. ② or 1"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
          {...register("pitchAccent")}
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700" htmlFor="contextSentence">
          Example sentence
        </label>
        <textarea
          id="contextSentence"
          rows={2}
          placeholder="A sentence using this word…"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition resize-none"
          {...register("contextSentence")}
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700" htmlFor="grammarNotes">
          Grammar notes
        </label>
        <textarea
          id="grammarNotes"
          rows={2}
          placeholder="Conjugation, usage notes…"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition resize-none"
          {...register("grammarNotes")}
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700" htmlFor="tags">
          Tags
          <span className="text-slate-400 font-normal ml-1">(comma separated)</span>
        </label>
        <input
          id="tags"
          type="text"
          placeholder="e.g. animal, N5, noun"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
          {...register("tags")}
        />
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
          {isPending ? "Adding…" : "Add Card"}
        </button>
      </div>
    </form>
  );
}
