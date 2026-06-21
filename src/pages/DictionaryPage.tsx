import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useDictionarySearch } from "@/features/dictionary/hooks/useDictionarySearch";
import type { DictionaryResult } from "@/types/dictionary.types";

function JlptBadge({ level }: { level: string | null }) {
  if (!level) return null;
  return (
    <span className="text-xs font-semibold bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">
      {level}
    </span>
  );
}

function ResultCard({ entry }: { entry: DictionaryResult }) {
  return (
    <div className="paper-card tap p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold text-ink-900 leading-none">{entry.word}</p>
            {entry.commonWord && (
              <span className="text-xs font-medium bg-green-50 text-green-600 px-2 py-0.5 rounded-full">
                common
              </span>
            )}
          </div>
          {entry.reading && (
            <p className="text-sm text-ink-400 mt-1">{entry.reading}</p>
          )}
        </div>
        <JlptBadge level={entry.jlptLevel} />
      </div>

      <ol className="text-ink-700 mt-3 space-y-0.5 list-decimal list-inside">
        {entry.meanings.slice(0, 6).map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ol>

      <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-ink-400">
        {entry.partOfSpeech && <span>{entry.partOfSpeech}</span>}
        {entry.frequency != null && <span>freq #{entry.frequency}</span>}
      </div>
    </div>
  );
}

export function DictionaryPage() {
  const [input, setInput] = useState("");
  const query = useDebounce(input, 400);
  const { data, isLoading, isError } = useDictionarySearch(query);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink-900">Dictionary</h1>
        <p className="text-sm text-ink-500 mt-0.5">
          Look up Japanese words — reading, meaning, JLPT level, frequency.
        </p>
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a word… e.g. 犬, 改善, 曖昧"
        autoFocus
        className="w-full px-4 py-3 border border-line rounded-xl text-lg outline-none focus:ring-2 focus:ring-indigo-200 focus:border-transparent transition"
      />

      {query.trim().length === 0 && (
        <p className="text-center text-ink-400 text-sm py-12">
          Start typing to search the dictionary.
        </p>
      )}

      {isLoading && query.trim().length > 0 && (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="paper-card h-28 animate-pulse" />
          ))}
        </div>
      )}

      {isError && (
        <p className="text-center text-red-500 text-sm py-12">
          Failed to search. Is the backend running?
        </p>
      )}

      {!isLoading && !isError && data?.length === 0 && query.trim().length > 0 && (
        <p className="text-center text-ink-400 text-sm py-12">
          No results for “{query}”.
        </p>
      )}

      {!isLoading && data && data.length > 0 && (
        <div className="space-y-3">
          {data.map((entry) => (
            <ResultCard key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
}
