import { useState } from "react";
import { useDecks } from "@/features/decks/hooks/useDecks";
import { DeckList } from "@/features/decks/components/DeckList";
import { CreateDeckForm } from "@/features/decks/components/CreateDeckForm";

function DeckListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white border border-slate-200 rounded-xl p-5 h-36 animate-pulse"
        >
          <div className="h-4 bg-slate-100 rounded w-3/4 mb-3" />
          <div className="h-3 bg-slate-100 rounded w-full mb-2" />
          <div className="h-3 bg-slate-100 rounded w-2/3" />
        </div>
      ))}
    </div>
  );
}

function EmptyState({ onCreateClick }: { onCreateClick: () => void }) {
  return (
    <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-xl">
      <div className="text-4xl mb-3">🗂️</div>
      <h3 className="font-semibold text-slate-700 mb-1">No decks yet</h3>
      <p className="text-sm text-slate-400 mb-5">
        Create your first deck to start learning Japanese
      </p>
      <button
        onClick={onCreateClick}
        className="px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition cursor-pointer"
      >
        Create your first deck
      </button>
    </div>
  );
}

export function DashboardPage() {
  const [showCreate, setShowCreate] = useState(false);
  const { data: decks, isLoading, isError, refetch } = useDecks();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Decks</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {isLoading
              ? "Loading…"
              : `${decks?.length ?? 0} deck${decks?.length === 1 ? "" : "s"}`}
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition cursor-pointer"
        >
          + New Deck
        </button>
      </div>

      {/* Create form inline panel */}
      {showCreate && (
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <p className="text-sm font-semibold text-slate-700 mb-4">New Deck</p>
          <CreateDeckForm onClose={() => setShowCreate(false)} />
        </div>
      )}

      {/* States */}
      {isLoading && <DeckListSkeleton />}

      {isError && (
        <div className="text-center py-12">
          <p className="text-slate-500 mb-3">Failed to load decks.</p>
          <button
            onClick={() => refetch()}
            className="text-sm text-slate-900 underline cursor-pointer"
          >
            Try again
          </button>
        </div>
      )}

      {!isLoading && !isError && decks?.length === 0 && (
        <EmptyState onCreateClick={() => setShowCreate(true)} />
      )}

      {!isLoading && !isError && decks && decks.length > 0 && (
        <DeckList decks={decks} />
      )}
    </div>
  );
}
