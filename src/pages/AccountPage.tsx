import { Link, useNavigate } from "react-router-dom";
import {
  Layers,
  GraduationCap,
  BookOpen,
  Settings,
  Sparkles,
  Check,
  ChevronRight,
  LogOut,
  Flame,
} from "lucide-react";
import { useAuthContext } from "@/providers/AuthProvider";
import { useDecks } from "@/features/decks/hooks/useDecks";
import { useDueCards } from "@/features/reviews/hooks/useDueCards";
import { ROUTES } from "@/constants/routes";
import { SectionHeader } from "@/components/common/SectionHeader";

function initials(name?: string) {
  if (!name) return "?";
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

function StatPill({
  icon: Icon,
  value,
  label,
  tint,
}: {
  icon: typeof Layers;
  value: React.ReactNode;
  label: string;
  tint: string;
}) {
  return (
    <div className="paper-card flex items-center gap-3 p-4">
      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${tint}`}>
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="font-display text-2xl leading-none text-ink-900">{value}</p>
        <p className="mt-1 text-xs font-semibold text-ink-400">{label}</p>
      </div>
    </div>
  );
}

const PRO_FEATURES = [
  "Unlimited decks & cards",
  "AI sentence & grammar help",
  "Native + TTS audio on cards",
  "Sync with the browser extension",
];

const LINKS = [
  { to: ROUTES.INTEGRATIONS, label: "Integrations", desc: "Anki, browser extension", icon: Settings, tint: "bg-indigo-50 text-indigo-600" },
  { to: ROUTES.DICTIONARY, label: "Dictionary", desc: "Look up any word", icon: BookOpen, tint: "bg-sakura-50 text-sakura-600" },
  { to: ROUTES.REVIEW, label: "Review", desc: "Study your due cards", icon: GraduationCap, tint: "bg-[#f1edff] text-[#7c5cfc]" },
];

export function AccountPage() {
  const { user, clearAuth } = useAuthContext();
  const navigate = useNavigate();
  const { data: decks } = useDecks();
  const { data: due } = useDueCards();

  const deckCount = decks?.length ?? 0;
  const dueCount = due?.length ?? 0;

  const handleLogout = () => {
    clearAuth();
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className="space-y-6">
      <SectionHeader jp="アカウント · Account" title="Your account" />


      {/* Profile */}
      <div className="paper-card flex items-center gap-4 p-6">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-400 to-indigo-600 text-xl font-bold text-white shadow-lg shadow-indigo-500/30">
          {initials(user?.name)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-xl text-ink-900">{user?.name}</p>
          <p className="truncate text-sm text-ink-500">{user?.email}</p>
        </div>
        <span className="hidden rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600 sm:inline">
          Free plan
        </span>
      </div>

      {/* Learning summary */}
      <div className="grid grid-cols-3 gap-4">
        <StatPill icon={Layers} value={deckCount} label="Decks" tint="bg-indigo-50 text-indigo-600" />
        <StatPill icon={GraduationCap} value={dueCount} label="Due today" tint="bg-sakura-50 text-sakura-600" />
        <StatPill icon={Flame} value={<span className="font-jp">語</span>} label="Keep going" tint="bg-[#fff5e6] text-gold-500" />
      </div>

      {/* Upgrade card */}
      <div className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-indigo-500 via-indigo-600 to-[#0c8f86] p-6 text-white shadow-xl shadow-indigo-500/25">
        <div className="absolute -right-10 -top-12 h-44 w-44 rounded-full bg-white/10" />
        <div className="absolute -bottom-16 right-20 h-36 w-36 rounded-full bg-white/10" />
        <div className="relative">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            <p className="text-sm font-bold uppercase tracking-wider text-white/80">Migaku Pro</p>
          </div>
          <h2 className="font-display mt-2 text-2xl">Unlock everything</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {PRO_FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-white/90">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {f}
              </li>
            ))}
          </ul>
          <button className="mt-5 rounded-full bg-white px-6 py-3 text-sm font-bold text-indigo-600 shadow-lg transition hover:shadow-xl active:scale-[0.98]">
            Upgrade to Pro
          </button>
        </div>
      </div>

      {/* Quick links */}
      <div className="paper-card divide-y divide-line overflow-hidden p-0">
        {LINKS.map(({ to, label, desc, icon: Icon, tint }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-4 px-5 py-4 transition hover:bg-paper"
          >
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${tint}`}>
              <Icon className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-ink-900">{label}</p>
              <p className="text-sm text-ink-500">{desc}</p>
            </div>
            <ChevronRight className="h-5 w-5 text-ink-300" />
          </Link>
        ))}
      </div>

      {/* Log out */}
      <button
        onClick={handleLogout}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-line bg-card py-4 font-semibold text-sakura-600 transition hover:bg-sakura-50 active:scale-[0.99]"
      >
        <LogOut className="h-5 w-5" /> Log out
      </button>

      <p className="pb-4 text-center text-xs text-ink-400">
        JAP · learn Japanese · {user?.email}
      </p>
    </div>
  );
}
