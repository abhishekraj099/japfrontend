import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDeck } from "@/features/decks/hooks/useDeck";
import { useCards } from "@/features/cards/hooks/useCards";
import { CardList } from "@/features/cards/components/CardList";
import { CreateCardForm } from "@/features/cards/components/CreateCardForm";
import { ROUTES } from "@/constants/routes";

function CardListSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white border border-slate-200 rounded-xl p-5 h-20 animate-pulse"
        >
          <div className="h-3 bg-slate-100 rounded w-1/4 mb-3" />
          <div className="h-4 bg-slate-100 rounded w-2/3" />
        </div>
      ))}
    </div>
  );
}

function EmptyCards({ onCreateClick }: { onCreateClick: () => void }) {
  return (
    <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-xl">
      <div className="text-4xl mb-3">🃏</div>
      <h3 className="font-semibold text-slate-700 mb-1">No cards yet</h3>
      <p className="text-sm text-slate-400 mb-5">
        Add your first card to this deck
      </p>
      <button
        onClick={onCreateClick}
        className="px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition cursor-pointer"
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

  if (deckError) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500 mb-3">Deck not found.</p>
        <Link to={ROUTES.DASHBOARD} className="text-sm text-slate-900 underline">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-400">
        <button
          onClick={() => navigate(ROUTES.DASHBOARD)}
          className="hover:text-slate-700 transition cursor-pointer"
        >
          My Decks
        </button>
        <span className="mx-2">/</span>
        <span className="text-slate-700">
          {deckLoading ? "Loading…" : deck?.name}
        </span>
      </nav>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          {deckLoading ? (
            <div className="space-y-2">
              <div className="h-7 bg-slate-100 rounded w-48 animate-pulse" />
              <div className="h-4 bg-slate-100 rounded w-72 animate-pulse" />
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-slate-900">{deck?.name}</h1>
              {deck?.description && (
                <p className="text-sm text-slate-500 mt-1">{deck.description}</p>
              )}
              <p className="text-xs text-slate-400 mt-1.5">
                {cardsLoading
                  ? "Loading cards…"
                  : `${cards?.length ?? 0} card${cards?.length === 1 ? "" : "s"}`}
              </p>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            to={ROUTES.REVIEW}
            className="px-4 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 transition"
          >
            Study
          </Link>
          <button
            onClick={() => setShowCreate(true)}
            className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition cursor-pointer"
          >
            + Add Card
          </button>
        </div>
      </div>

      {/* Create card form */}
      {showCreate && (
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <p className="text-sm font-semibold text-slate-700 mb-4">New Card</p>
          <CreateCardForm
            deckId={deckId ?? ""}
            onClose={() => setShowCreate(false)}
          />
        </div>
      )}

      {/* Card states */}
      {cardsLoading && <CardListSkeleton />}

      {cardsError && (
        <div className="text-center py-12">
          <p className="text-slate-500 mb-3">Failed to load cards.</p>
          <button
            onClick={() => refetch()}
            className="text-sm text-slate-900 underline cursor-pointer"
          >
            Try again
          </button>
        </div>
      )}

      {!cardsLoading && !cardsError && cards?.length === 0 && (
        <EmptyCards onCreateClick={() => setShowCreate(true)} />
      )}

      {!cardsLoading && !cardsError && cards && cards.length > 0 && (
        <CardList cards={cards} deckId={deckId ?? ""} />
      )}
    </div>
  );
}
