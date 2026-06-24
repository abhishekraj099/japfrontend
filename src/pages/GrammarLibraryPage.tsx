import { Link } from "react-router-dom";
import { GrammarLibrary } from "@/features/grammar-library/components/GrammarLibrary";

export function GrammarLibraryPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">Grammar</h1>
          <p className="mt-1 text-sm text-ink-400">Browse, search, and filter the grammar patterns you've saved.</p>
        </div>
        <Link to="/grammar/mastery" className="text-sm font-semibold text-indigo-500 hover:underline">Mastery →</Link>
      </header>
      <GrammarLibrary />
    </div>
  );
}
