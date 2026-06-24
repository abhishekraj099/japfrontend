import { useMemo, useState } from "react";
import { useGrammarLibrary } from "../hooks/useGrammarLibrary";
import { statusOf, isDue, STATUS_LABEL, STATUS_ACCENT } from "../lib/status";
import { StatCard } from "@/features/analytics/components/StatCard";
import { MetricGrid } from "@/features/analytics/components/MetricGrid";
import type { GrammarLibraryItem, GrammarStatus } from "@/types/grammar.types";

const JLPTS = ["N5", "N4", "N3", "N2", "N1"] as const;
const JLPT_ORDER: Record<string, number> = { N5: 0, N4: 1, N3: 2, N2: 3, N1: 4 };
const STATUSES: GrammarStatus[] = ["new", "learning", "known", "mastered"];
type Sort = "pattern" | "jlpt" | "added" | "reviewed" | "due";

const SORTS: { id: Sort; label: string }[] = [
  { id: "due", label: "Due First" },
  { id: "added", label: "Recently Added" },
  { id: "reviewed", label: "Recently Reviewed" },
  { id: "pattern", label: "Pattern" },
  { id: "jlpt", label: "JLPT" },
];

function relDate(iso: string | null): string {
  if (!iso) return "never";
  const d = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (d <= 0) return "today";
  if (d === 1) return "yesterday";
  if (d < 30) return `${d}d ago`;
  return `${Math.floor(d / 30)}mo ago`;
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
        active ? "bg-indigo-500 text-white" : "bg-indigo-50 text-indigo-500 hover:bg-indigo-100"
      }`}
    >
      {children}
    </button>
  );
}

function Row({ item }: { item: GrammarLibraryItem }) {
  const st = statusOf(item);
  const due = isDue(item);
  return (
    <div className="paper-card flex items-center gap-3 px-4 py-3">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-jp text-lg font-semibold text-ink-900">{item.pattern}</span>
          {item.jlptLevel && (
            <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-500">
              {item.jlptLevel}
            </span>
          )}
        </div>
        <p className="truncate text-sm text-ink-500">{item.meaning}</p>
      </div>
      <div className="shrink-0 text-right">
        <p className={`text-xs font-semibold ${STATUS_ACCENT[st]}`}>{STATUS_LABEL[st]}</p>
        <p className="text-[11px] text-ink-400">
          {due ? <span className="font-semibold text-sakura-500">Due</span> : "scheduled"} · {relDate(item.lastReviewedAt)}
        </p>
      </div>
    </div>
  );
}

export function GrammarLibrary() {
  const { data: items, isLoading, isError } = useGrammarLibrary();
  const [search, setSearch] = useState("");
  const [jlpt, setJlpt] = useState<Set<string>>(new Set());
  const [statuses, setStatuses] = useState<Set<GrammarStatus>>(new Set());
  const [sort, setSort] = useState<Sort>("due");

  const toggle = <T,>(set: Set<T>, v: T, setter: (s: Set<T>) => void) => {
    const next = new Set(set);
    next.has(v) ? next.delete(v) : next.add(v);
    setter(next);
  };

  const filtered = useMemo(() => {
    if (!items) return [];
    const q = search.trim().toLowerCase();
    const out = items.filter((it) => {
      if (q && !`${it.pattern} ${it.meaning} ${it.detail ?? ""}`.toLowerCase().includes(q)) return false;
      if (jlpt.size && !(it.jlptLevel && jlpt.has(it.jlptLevel))) return false;
      if (statuses.size && !statuses.has(statusOf(it))) return false;
      return true;
    });
    const cmp: Record<Sort, (a: GrammarLibraryItem, b: GrammarLibraryItem) => number> = {
      pattern: (a, b) => a.pattern.localeCompare(b.pattern, "ja"),
      jlpt: (a, b) => (JLPT_ORDER[a.jlptLevel ?? ""] ?? 9) - (JLPT_ORDER[b.jlptLevel ?? ""] ?? 9),
      added: (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
      reviewed: (a, b) => +new Date(b.lastReviewedAt ?? 0) - +new Date(a.lastReviewedAt ?? 0),
      due: (a, b) => +new Date(a.schedule?.dueDate ?? 0) - +new Date(b.schedule?.dueDate ?? 0),
    };
    return [...out].sort(cmp[sort]);
  }, [items, search, jlpt, statuses, sort]);

  const stats = useMemo(() => {
    const s = { total: 0, due: 0, mastered: 0, learning: 0, byJlpt: {} as Record<string, number> };
    for (const it of items ?? []) {
      s.total++;
      if (isDue(it)) s.due++;
      const st = statusOf(it);
      if (st === "mastered") s.mastered++;
      if (st === "learning") s.learning++;
      if (it.jlptLevel) s.byJlpt[it.jlptLevel] = (s.byJlpt[it.jlptLevel] ?? 0) + 1;
    }
    return s;
  }, [items]);

  if (isLoading) return <p className="text-sm text-ink-400">Loading grammar…</p>;
  if (isError) return <p className="text-sm text-sakura-500">Couldn't load your grammar library.</p>;
  if (!items?.length)
    return <p className="text-sm text-ink-400">No grammar saved yet. Save grammar patterns from the extension to build your library.</p>;

  return (
    <div className="space-y-6">
      <MetricGrid cols={4}>
        <StatCard label="Total Grammar" value={stats.total} />
        <StatCard label="Due" value={stats.due} accent="sakura" />
        <StatCard label="Learning" value={stats.learning} accent="amber" />
        <StatCard label="Mastered" value={stats.mastered} accent="emerald" />
      </MetricGrid>

      <div className="space-y-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search pattern or meaning…"
          className="w-full rounded-xl border border-line bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
        <div className="flex flex-wrap items-center gap-1.5">
          {JLPTS.map((l) => (
            <Chip key={l} active={jlpt.has(l)} onClick={() => toggle(jlpt, l, setJlpt)}>
              {l}{stats.byJlpt[l] ? ` ${stats.byJlpt[l]}` : ""}
            </Chip>
          ))}
          <span className="mx-1 text-ink-300">·</span>
          {STATUSES.map((s) => (
            <Chip key={s} active={statuses.has(s)} onClick={() => toggle(statuses, s, setStatuses)}>
              {STATUS_LABEL[s]}
            </Chip>
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs text-ink-400">
          <span>Sort:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="rounded-lg border border-line bg-white px-2 py-1 text-xs"
          >
            {SORTS.map((s) => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
          <span className="ml-auto">{filtered.length} shown</span>
        </div>
      </div>

      <div className="space-y-2">
        {filtered.map((it) => (
          <Row key={it.id} item={it} />
        ))}
      </div>
    </div>
  );
}
