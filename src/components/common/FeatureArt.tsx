/*
  Hand-crafted cartoon feature illustrations (vector "figures").
  Cohesive with the Kawaii sticker set: bold outlines + vibrant fills.
*/
const OUT = "#1c1340";

function Sparkle({ x, y, s = 8, c = "#ffd23f" }: { x: number; y: number; s?: number; c?: string }) {
  return <path transform={`translate(${x} ${y})`} d={`M0 ${-s}c.3 ${s * 0.5} .6 ${s * 0.6} ${s} ${s}c-${s * 0.4} .4-${s * 0.7} .5-${s} ${s}c-.3-${s * 0.5}-.6-${s * 0.6}-${s}-${s}c${s * 0.4}-.4 ${s * 0.7}-.5 ${s}-${s}Z`} fill={c} />;
}

export function FlashcardArt({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 220 180" aria-hidden>
      <defs>
        <radialGradient id="fa-bg" cx="50%" cy="40%" r="60%"><stop offset="0%" stopColor="#3a2a78" /><stop offset="100%" stopColor="#241466" /></radialGradient>
        <linearGradient id="fa-spk" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#ff8a4c" /><stop offset="100%" stopColor="#ff4d6a" /></linearGradient>
      </defs>
      <circle cx="110" cy="90" r="78" fill="url(#fa-bg)" />
      <Sparkle x={36} y={40} s={9} /><Sparkle x={186} y={52} s={7} c="#1ad3b0" /><Sparkle x={170} y={140} s={8} c="#ff3d8b" />
      {/* card */}
      <g transform="rotate(-7 110 92)">
        <rect x="64" y="44" width="92" height="100" rx="16" fill="#fff" stroke={OUT} strokeWidth="3" />
        <text x="110" y="98" textAnchor="middle" fontSize="44" fontWeight="700" fill={OUT} className="font-jp">語</text>
        <rect x="84" y="112" width="52" height="6" rx="3" fill="#d7d2f0" />
        <rect x="92" y="124" width="36" height="6" rx="3" fill="#e6e2f6" />
      </g>
      {/* speaker + waves */}
      <g transform="translate(150 96)">
        <path d="M0 8h8l10-8v32l-10-8H0Z" fill="url(#fa-spk)" stroke={OUT} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M22 6c6 5 6 21 0 26M30 0c10 8 10 32 0 40" stroke="#1ad3b0" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function DictionaryArt({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 220 180" aria-hidden>
      <defs>
        <radialGradient id="da-bg" cx="50%" cy="40%" r="60%"><stop offset="0%" stopColor="#143a4f" /><stop offset="100%" stopColor="#0f2a52" /></radialGradient>
      </defs>
      <circle cx="110" cy="90" r="78" fill="url(#da-bg)" />
      <Sparkle x={42} y={48} s={8} c="#1ad3b0" /><Sparkle x={182} y={120} s={7} /><Sparkle x={160} y={40} s={6} c="#ff3d8b" />
      {/* page */}
      <rect x="48" y="44" width="100" height="92" rx="14" fill="#fff" stroke={OUT} strokeWidth="3" />
      <rect x="62" y="60" width="40" height="8" rx="4" fill="#1ad3b0" />
      <rect x="62" y="78" width="72" height="6" rx="3" fill="#d7d2f0" />
      <rect x="62" y="92" width="60" height="6" rx="3" fill="#e6e2f6" />
      <rect x="62" y="106" width="68" height="6" rx="3" fill="#e6e2f6" />
      {/* magnifier */}
      <g transform="translate(120 96)">
        <circle cx="14" cy="14" r="24" fill="rgba(26,211,176,0.2)" stroke={OUT} strokeWidth="4" />
        <rect x="32" y="32" width="26" height="9" rx="4.5" transform="rotate(45 32 32)" fill="#ff6a4d" stroke={OUT} strokeWidth="3" />
        <text x="14" y="20" textAnchor="middle" fontSize="16" fontWeight="700" fill={OUT} className="font-jp">辞</text>
      </g>
    </svg>
  );
}

export function MemoryArt({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 220 180" aria-hidden>
      <defs>
        <radialGradient id="ma-bg" cx="50%" cy="40%" r="60%"><stop offset="0%" stopColor="#3a2a78" /><stop offset="100%" stopColor="#241466" /></radialGradient>
      </defs>
      <circle cx="110" cy="90" r="78" fill="url(#ma-bg)" />
      <Sparkle x={40} y={52} s={8} /><Sparkle x={184} y={64} s={7} c="#1ad3b0" /><Sparkle x={56} y={140} s={6} c="#ff3d8b" />
      {/* calendar */}
      <rect x="60" y="50" width="100" height="84" rx="14" fill="#fff" stroke={OUT} strokeWidth="3" />
      <rect x="60" y="50" width="100" height="22" rx="12" fill="#ff6a4d" stroke={OUT} strokeWidth="3" />
      <rect x="78" y="44" width="8" height="14" rx="3" fill={OUT} /><rect x="134" y="44" width="8" height="14" rx="3" fill={OUT} />
      {[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => {
        const done = (r * 4 + c) % 3 === 0;
        return <g key={`${r}-${c}`} transform={`translate(${74 + c * 22} ${86 + r * 16})`}>
          <circle r="6" fill={done ? "#1ad3b0" : "#e6e2f6"} stroke={OUT} strokeWidth="1.6" />
          {done && <path d="M-2.5 0l2 2 3-4" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />}
        </g>;
      }))}
      {/* repeat arrow */}
      <path d="M150 120a22 22 0 1 1-8-26" fill="none" stroke="#ffb454" strokeWidth="4" strokeLinecap="round" />
      <path d="M138 90l8 4-3 8" fill="none" stroke="#ffb454" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ProgressArt({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 220 180" aria-hidden>
      <defs>
        <radialGradient id="pa-bg" cx="50%" cy="40%" r="60%"><stop offset="0%" stopColor="#3a2a78" /><stop offset="100%" stopColor="#241466" /></radialGradient>
      </defs>
      <circle cx="110" cy="90" r="78" fill="url(#pa-bg)" />
      <Sparkle x={40} y={44} s={8} c="#1ad3b0" /><Sparkle x={182} y={56} s={7} />
      {[
        { x: 64, h: 30, from: "#ff9ec4", to: "#ff5e9e" },
        { x: 92, h: 52, from: "#ffe39a", to: "#ffb454" },
        { x: 120, h: 74, from: "#7ce0c0", to: "#1ad3b0" },
        { x: 148, h: 96, from: "#c9a7ff", to: "#7c5cff" },
      ].map((b) => (
        <g key={b.x}>
          <defs><linearGradient id={`pb${b.x}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={b.from} /><stop offset="100%" stopColor={b.to} /></linearGradient></defs>
          <rect x={b.x} y={134 - b.h} width="20" height={b.h} rx="6" fill={`url(#pb${b.x})`} stroke={OUT} strokeWidth="2.5" />
        </g>
      ))}
      <path d="M58 120l30-20 28 14 30-44" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 6" opacity="0.7" />
      <g transform="translate(150 56)"><path d="M0 -10c.4 6 .8 7 11 11c-10 4-10.6 5-11 11c-.4-6-.8-7-11-11c10-4 10.6-5 11-11Z" fill="#ffd23f" stroke={OUT} strokeWidth="1.5" /></g>
    </svg>
  );
}
