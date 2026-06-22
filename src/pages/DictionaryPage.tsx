import { useState } from "react";
import { Search } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { useDictionarySearch } from "@/features/dictionary/hooks/useDictionarySearch";
import { DictionaryArt } from "@/components/common/FeatureArt";
import { Mascot, KStar } from "@/components/common/Kawaii";
import type { DictionaryResult } from "@/types/dictionary.types";

function JlptBadge({ level }: { level: string | null }) {
  if (!level) return null;
  return (
    <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-600">
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
            <p className="font-jp text-3xl font-bold leading-none text-ink-900">{entry.word}</p>
            {entry.commonWord && (
              <span className="rounded-full bg-jade-500/15 px-2 py-0.5 text-xs font-bold text-jade-500">
                common
              </span>
            )}
          </div>
          {entry.reading && <p className="font-jp mt-1.5 text-sm text-ink-400">{entry.reading}</p>}
        </div>
        <JlptBadge level={entry.jlptLevel} />
      </div>

      <ol className="mt-3 list-inside list-decimal space-y-0.5 text-ink-700">
        {entry.meanings.slice(0, 6).map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ol>

      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-ink-400">
        {entry.partOfSpeech && (
          <span className="rounded-full bg-white/5 px-2 py-0.5">{entry.partOfSpeech}</span>
        )}
        {entry.frequency != null && <span>freq #{entry.frequency}</span>}
      </div>
    </div>
  );
}

export function DictionaryPage() {
  const [input, setInput] = useState("");
  const query = useDebounce(input, 400);
  const { data, isLoading, isError } = useDictionarySearch(query);
  const empty = query.trim().length === 0;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* hero header */}
      <div className="paper-card relative overflow-hidden p-6">
        <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-jade-500/15 blur-2xl" />
        <div className="relative flex items-center justify-between gap-4">
          <div>
            <p className="section-label text-jade-500">辞書 · Dictionary</p>
            <h1 className="font-display mt-2 text-3xl text-ink-900">Look up any word</h1>
            <p className="mt-1 text-sm text-ink-500">Reading, meaning, JLPT level & frequency — instantly.</p>
          </div>
          <DictionaryArt className="hidden h-28 w-36 shrink-0 sm:block" />
        </div>
      </div>

      {/* search */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a word… e.g. 犬, 改善, 曖昧"
          autoFocus
          className="w-full rounded-2xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 text-lg text-ink-900 outline-none transition placeholder:text-ink-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30"
        />
      </div>

      {empty && (
        <div className="paper-card relative flex flex-col items-center overflow-hidden px-6 py-14 text-center">
          <KStar className="twinkle2 absolute left-10 top-8 h-5 w-5" color="#1ad3b0" />
          <Mascot className="float-soft mb-3 h-24 w-24" />
          <h3 className="font-display text-xl text-ink-900">Search the dictionary</h3>
          <p className="mt-1 max-w-xs text-sm text-ink-500">
            Start typing a word above and definitions appear as you go.
          </p>
        </div>
      )}

      {isLoading && !empty && (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="paper-card h-28 animate-pulse" />
          ))}
        </div>
      )}

      {isError && (
        <p className="py-12 text-center text-sm text-red-400">
          Failed to search. Is the backend running?
        </p>
      )}

      {!isLoading && !isError && data?.length === 0 && !empty && (
        <div className="paper-card flex flex-col items-center px-6 py-12 text-center">
          <span className="font-jp mb-2 text-4xl text-ink-300">？</span>
          <p className="text-sm text-ink-500">No results for “{query}”.</p>
        </div>
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
