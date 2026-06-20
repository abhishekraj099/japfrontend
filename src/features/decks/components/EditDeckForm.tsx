import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  deckSchema,
  type DeckSchema,
  type DeckSchemaInput,
} from "../schemas/deck.schema";
import { useUpdateDeck } from "../hooks/useDecks";
import type { Deck } from "@/types/deck.types";

interface Props {
  deck: Deck;
  onClose: () => void;
}

export function EditDeckForm({ deck, onClose }: Props) {
  const { mutate: updateDeck, isPending, error } = useUpdateDeck(onClose);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DeckSchemaInput, unknown, DeckSchema>({
    resolver: zodResolver(deckSchema),
    defaultValues: {
      name: deck.name,
      description: deck.description ?? "",
      language: deck.language,
    },
  });

  const errorMessage = error
    ? (error as { response?: { data?: { error?: string } } }).response?.data
        ?.error ?? "Failed to update deck."
    : null;

  return (
    <form
      onSubmit={handleSubmit((data) => updateDeck({ id: deck.id, data }))}
      className="space-y-4"
    >
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
          {errorMessage}
        </div>
      )}

      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700" htmlFor="edit-name">
          Deck name <span className="text-red-500">*</span>
        </label>
        <input
          id="edit-name"
          type="text"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700" htmlFor="edit-description">
          Description
        </label>
        <textarea
          id="edit-description"
          rows={3}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition resize-none"
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
