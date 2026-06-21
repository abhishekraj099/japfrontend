import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDeck } from "@/features/decks/hooks/useDeck";
import { useCards } from "@/features/cards/hooks/useCards";
import { CardList } from "@/features/cards/components/CardList";
import { CreateCardForm } from "@/features/cards/components/CreateCardForm";
import { exportDeckToAnki } from "@/features/cards/utils/ankiExport";
import { ROUTES } from "@/constants/routes";

type CardFilter = "all" | "vocab" | "grammar" | "sentence";

const FILTERS: { key: CardFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "vocab", label: "Vocabulary" },
  { key: "grammar", label: "Grammar" },
  { key: "sentence", label: "Sentence" },
];

function CardListSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="paper-card h-20 animate-pulse p-5">
          <div className="mb-3 h-3 w-1/4 rounded-full bg-line" />
          <div className="h-4 w-2/3 rounded-full bg-line" />
        </div>
      ))}
    </div>
  );
}

function EmptyCards({ onCreateClick }: { onCreateClick: () => void }) {
  return (
    <div className="rounded-3xl border-2 border-dashed border-line py-16 text-center">
      <div className="font-jp mb-3 text-5xl text-indigo-500/80">札</div>
      <h3 className="font-display mb-1 text-2xl text-ink-900">No cards yet</h3>
      <p className="mb-5 text-sm text-ink-500">Add your first card to this deck</p>
      <button
        onClick={onCreateClick}
        className="rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-paper transition hover:bg-indigo-600 active:scale-95 cursor-pointer"
      >
        Add first card
      </button>
    </div>
  );
}

export function DeckDetailPage() {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();
  const [showCreate, setShowCreate] = useState(false);
  const [filter, setFilter] = useState<CardFilter>("all");

  const {
    data: deck,
    isLoading: deckLoading,
    isError: deckError,
  } = useDeck(deckId ?? "");

  const {
    data: cards,
    isLoading: cardsLoading,
    isError: cardsError,
    refetch,
  } = useCards(deckId ?? "");

  const filteredCards = cards?.filter((c) =>
    filter === "all" ? true : c.cardType === filter
  );

  if (deckError) {
    return (
      <div className="py-20 text-center">
        <p className="mb-3 text-ink-500">Deck not found.</p>
        <Link to={ROUTES.DASHBOARD} className="text-sm font-semibold text-indigo-500 underline">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-ink-400">
        <button
          onClick={() => navigate(ROUTES.DASHBOARD)}
          className="transition hover:text-ink-900 cursor-pointer"
        >
          My Decks
        </button>
        <span className="mx-2">/</span>
        <span className="text-ink-700">
          {deckLoading ? "Loading…" : deck?.name}
        </span>
      </nav>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          {deckLoading ? (
            <div className="space-y-2">
              <div className="h-8 w-48 animate-pulse rounded-full bg-line" />
              <div className="h-4 w-72 animate-pulse rounded-full bg-line" />
            </div>
          ) : (
            <>
              <h1 className="font-display text-4xl text-ink-900">{deck?.name}</h1>
              {deck?.description && (
                <p className="mt-1 text-sm text-ink-500">{deck.description}</p>
              )}
              <p className="mt-1.5 text-xs text-ink-400">
                {cardsLoading
                  ? "Loading cards…"
                  : `${cards?.length ?? 0} card${cards?.length === 1 ? "" : "s"}`}
              </p>
            </>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            to={ROUTES.REVIEW}
            className="rounded-xl border border-line px-4 py-2 text-sm font-medium text-ink-700 transition hover:bg-paper"
          >
            Study
          </Link>
          <button
            onClick={() =>
              cards && exportDeckToAnki(deck?.name ?? "deck", cards)
            }
            disabled={!cards || cards.length === 0}
            title="Export this deck as an Anki-compatible CSV"
            className="rounded-xl border border-line px-4 py-2 text-sm font-medium text-ink-700 transition hover:bg-paper cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Export to Anki
          </button>
          <button
            onClick={() => setShowCreate(true)}
            className="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-paper transition hover:bg-indigo-600 cursor-pointer"
          >
            + Add Card
          </button>
        </div>
      </div>

      {/* Create card form */}
      {showCreate && (
        <div className="paper-card p-6">
          <p className="font-display mb-4 text-xl text-ink-900">New card</p>
          <CreateCardForm
            deckId={deckId ?? ""}
            onClose={() => setShowCreate(false)}
          />
        </div>
      )}

      {/* Card states */}
      {cardsLoading && <CardListSkeleton />}

      {cardsError && (
        <div className="py-12 text-center">
          <p className="mb-3 text-ink-500">Failed to load cards.</p>
          <button
            onClick={() => refetch()}
            className="text-sm font-semibold text-indigo-500 underline cursor-pointer"
          >
            Try again
          </button>
        </div>
      )}

      {!cardsLoading && !cardsError && cards?.length === 0 && (
        <EmptyCards onCreateClick={() => setShowCreate(true)} />
      )}

      {!cardsLoading && !cardsError && cards && cards.length > 0 && (
        <>
          {/* Filters — All / Vocabulary / Grammar */}
          <div className="flex items-center gap-1.5">
            {FILTERS.map(({ key, label }) => {
              const count =
                key === "all"
                  ? cards.length
                  : cards.filter((c) => c.cardType === key).length;
              const active = filter === key;
              return (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition cursor-pointer ${
                    active
                      ? "bg-indigo-500 text-paper"
                      : "border border-line text-ink-600 hover:bg-paper"
                  }`}
                >
                  {label}
                  <span className={active ? "ml-1.5 text-indigo-200" : "ml-1.5 text-ink-400"}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {filteredCards && filteredCards.length > 0 ? (
            <CardList cards={filteredCards} deckId={deckId ?? ""} />
          ) : (
            <p className="py-10 text-center text-sm text-ink-400">
              No {filter} cards in this deck.
            </p>
          )}
        </>
      )}
    </div>
  );
}
