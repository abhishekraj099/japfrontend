import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  deckSchema,
  type DeckSchema,
  type DeckSchemaInput,
} from "../schemas/deck.schema";
import { useCreateDeck } from "../hooks/useDecks";

interface Props {
  onClose: () => void;
}

export function CreateDeckForm({ onClose }: Props) {
  const { mutate: createDeck, isPending, error } = useCreateDeck(onClose);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DeckSchemaInput, unknown, DeckSchema>({
    resolver: zodResolver(deckSchema),
    defaultValues: { language: "ja" },
  });

  const errorMessage = error
    ? (error as { response?: { data?: { error?: string } } }).response?.data
        ?.error ?? "Failed to create deck."
    : null;

  return (
    <form onSubmit={handleSubmit((data) => createDeck(data))} className="space-y-4">
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
          {errorMessage}
        </div>
      )}

      <div className="space-y-1">
        <label className="text-[13px] font-medium text-ink-500" htmlFor="name">
          Deck name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          placeholder="e.g. JLPT N5 Vocabulary"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[16px] text-ink-900 outline-none transition placeholder:text-ink-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-[13px] font-medium text-ink-500" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          rows={3}
          placeholder="What will you study in this deck?"
          className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[16px] text-ink-900 outline-none transition placeholder:text-ink-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-xs text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 rounded-xl border border-line bg-paper/50 px-4 py-3 text-[16px] font-semibold text-ink-700 transition active:scale-[0.98] cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 rounded-xl bg-indigo-500 px-4 py-3 text-[16px] font-semibold text-paper transition hover:bg-indigo-600 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isPending ? "Creating…" : "Create deck"}
        </button>
      </div>
    </form>
  );
}
