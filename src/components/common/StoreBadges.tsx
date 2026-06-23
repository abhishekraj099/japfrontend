/* App Store / Google Play / Chrome Web Store badges + small device mockups. */

export function StoreBadge({ kind }: { kind: "apple" | "play" }) {
  return (
    <a href="#" className="flex items-center gap-2.5 rounded-xl bg-black px-4 py-2.5 text-white ring-1 ring-white/15 transition hover:bg-[#111]">
      {kind === "apple" ? (
        <svg width="20" height="22" viewBox="0 0 22 24" fill="currentColor" aria-hidden>
          <path d="M16.5 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.9-1.4-.1-2.8.8-3.5.8s-1.8-.8-3-.8c-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7 2-1.1 2.8-2.2c.6-.9.9-1.7 1-1.8-.1 0-2.4-1-2.4-3.6Zm-2.3-6.7c.6-.8 1-1.9.9-3-1 0-2.1.6-2.8 1.4-.6.7-1.1 1.8-1 2.8 1.1.1 2.2-.5 2.9-1.2Z" />
        </svg>
      ) : (
        <svg width="18" height="20" viewBox="0 0 20 22" aria-hidden>
          <path d="M2 1 11 11 2 21Z" fill="#5bd1ff" />
          <path d="M2 1 11 11 15 7Z" fill="#34d399" />
          <path d="M2 21 11 11 15 15Z" fill="#f87171" />
          <path d="M15 7 11 11 15 15 19 11Z" fill="#fbbf24" />
        </svg>
      )}
      <span className="text-left leading-tight">
        <span className="block text-[9px] font-medium opacity-80">{kind === "apple" ? "Download on the" : "GET IT ON"}</span>
        <span className="block text-[15px] font-bold">{kind === "apple" ? "App Store" : "Google Play"}</span>
      </span>
    </a>
  );
}

export function ChromeMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="11" fill="#e8eaed" />
      <path d="M12 1a11 11 0 0 1 9.5 5.5H12a5.5 5.5 0 0 0-4.8 2.8L3.3 5A11 11 0 0 1 12 1Z" fill="#ea4335" />
      <path d="M21.5 6.5A11 11 0 0 1 12 23l4.8-8.3A5.5 5.5 0 0 0 17 6.5h4.5Z" fill="#fbbc05" />
      <path d="M12 23A11 11 0 0 1 3.3 5l4.8 8.3A5.5 5.5 0 0 0 12 17.5V23Z" fill="#34a853" />
      <circle cx="12" cy="12" r="4.4" fill="#fff" />
      <circle cx="12" cy="12" r="3.1" fill="#4285f4" />
    </svg>
  );
}

export function MiniPhone({ from, to, rotate = 0, label, sub, big = false }: { from: string; to: string; rotate?: number; label: string; sub: string; big?: boolean }) {
  return (
    <div className="shrink-0 rounded-[1.3rem] border-[4px] border-[#2a2060] bg-white p-1.5 shadow-xl" style={{ width: 92, transform: `rotate(${rotate}deg)` }}>
      <div className="rounded-[0.9rem] p-2 text-center" style={{ background: `linear-gradient(160deg,${from},${to})` }}>
        <p className={`font-jp font-bold text-[#1b1240] ${big ? "text-xl" : "text-[13px]"}`}>{label}</p>
        <p className="mt-0.5 text-[8px] font-semibold text-[#1b1240]/70">{sub}</p>
        <div className="mt-2 h-8 rounded-md bg-white/45" />
        <div className="mt-1.5 flex justify-center gap-1">
          <span className="h-3 w-3 rounded-full bg-white/70" />
          <span className="h-3 w-3 rounded-full bg-[#ff6a4d]" />
        </div>
      </div>
    </div>
  );
}

export function LaptopMock({ children, url = "netflix.com" }: { children: React.ReactNode; url?: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border-4 border-[#2a2060] bg-[#0e0a2e] shadow-2xl">
      <div className="flex items-center gap-1.5 bg-[#1a1448] px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 rounded-md bg-white/10 px-3 py-0.5 text-[10px] text-white/50">{url}</span>
      </div>
      {children}
    </div>
  );
}
