/*
  かわいい — a set of cute, cartoon-style Japanese stickers.
  Bold dark outlines + flat vibrant fills (Migaku neon-city vibe).
  Each takes a className for sizing/positioning.
*/

const OUT = "#1c1340"; // bold cartoon outline

export function Mascot({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 120 120" aria-hidden>
      <defs>
        <linearGradient id="kw-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#b8a6ff" /><stop offset="100%" stopColor="#7c5cff" />
        </linearGradient>
      </defs>
      <path d="M60 16c5-13 19-10 19 1 0 5-4 8-8 9" fill="#7c5cff" stroke={OUT} strokeWidth="3" />
      <circle cx="80" cy="22" r="6" fill="#5bd1ff" stroke={OUT} strokeWidth="3" />
      <ellipse cx="60" cy="72" rx="42" ry="40" fill="url(#kw-body)" stroke={OUT} strokeWidth="3.5" />
      <ellipse cx="60" cy="77" rx="31" ry="28" fill="#fff" />
      <circle cx="49" cy="72" r="5.5" fill={OUT} /><circle cx="71" cy="72" r="5.5" fill={OUT} />
      <circle cx="51" cy="70" r="1.6" fill="#fff" /><circle cx="73" cy="70" r="1.6" fill="#fff" />
      <path d="M53 85c4 4 10 4 14 0" stroke={OUT} strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="43" cy="82" r="4.5" fill="#ff9ab7" opacity="0.8" /><circle cx="77" cy="82" r="4.5" fill="#ff9ab7" opacity="0.8" />
    </svg>
  );
}

export function Onigiri({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 64 64" aria-hidden>
      <path d="M32 8c4 0 6 4 19 35 3 6-1 13-8 13H21c-7 0-11-7-8-13C26 12 28 8 32 8Z" fill="#fff" stroke={OUT} strokeWidth="3" strokeLinejoin="round" />
      <path d="M21 44h22v5c0 4-3 7-7 7h-8c-4 0-7-3-7-7v-5Z" fill="#2b2740" stroke={OUT} strokeWidth="3" strokeLinejoin="round" />
      <circle cx="26" cy="34" r="2.4" fill={OUT} /><circle cx="38" cy="34" r="2.4" fill={OUT} />
      <path d="M28 40c2 2 6 2 8 0" stroke={OUT} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <circle cx="22" cy="38" r="2.4" fill="#ff9ec4" /><circle cx="42" cy="38" r="2.4" fill="#ff9ec4" />
    </svg>
  );
}

export function Sakura({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  const petal = (a: number) => (
    <g transform={`rotate(${a} 32 32)`}>
      <path d="M32 8c6 0 9 5 9 11 0 5-4 8-9 8s-9-3-9-8c0-6 3-11 9-11Z" fill="#ff9ec4" stroke={OUT} strokeWidth="2.6" />
      <path d="M32 27c-1-3-1-6 0-9" stroke="#fff" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
  return (
    <svg className={className} style={style} viewBox="0 0 64 64" aria-hidden>
      {[0, 72, 144, 216, 288].map((a) => <g key={a}>{petal(a)}</g>)}
      <circle cx="32" cy="32" r="5" fill="#ffd23f" stroke={OUT} strokeWidth="2.4" />
    </svg>
  );
}

export function Torii({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 64 64" aria-hidden>
      <path d="M8 18c8-4 40-4 48 0l-3 6c-7-3-35-3-42 0l-3-6Z" fill="#ff6a4d" stroke={OUT} strokeWidth="3" strokeLinejoin="round" />
      <rect x="14" y="26" width="36" height="6" rx="2" fill="#ff8a6a" stroke={OUT} strokeWidth="3" />
      <rect x="18" y="22" width="8" height="34" rx="2" fill="#ff6a4d" stroke={OUT} strokeWidth="3" />
      <rect x="38" y="22" width="8" height="34" rx="2" fill="#ff6a4d" stroke={OUT} strokeWidth="3" />
    </svg>
  );
}

export function Lantern({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 64 64" aria-hidden>
      <rect x="22" y="8" width="20" height="6" rx="2" fill="#3a2740" stroke={OUT} strokeWidth="2.6" />
      <ellipse cx="32" cy="34" rx="20" ry="22" fill="#ff4d5e" stroke={OUT} strokeWidth="3" />
      <path d="M20 24h24M18 34h28M20 44h24" stroke={OUT} strokeWidth="2" opacity="0.5" />
      <rect x="26" y="54" width="12" height="5" rx="2" fill="#3a2740" stroke={OUT} strokeWidth="2.6" />
      <text x="32" y="40" textAnchor="middle" fontSize="16" fill="#fff" fontWeight="700" className="font-jp">祭</text>
    </svg>
  );
}

export function Neko({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 64 64" aria-hidden>
      <path d="M18 16l6 8M46 16l-6 8" stroke={OUT} strokeWidth="3" strokeLinecap="round" />
      <path d="M16 14l8 12-8 2zM48 14l-8 12 8 2z" fill="#fff" stroke={OUT} strokeWidth="3" strokeLinejoin="round" />
      <path d="M20 22h-2 2zM44 22h2-2z" />
      <circle cx="32" cy="36" r="20" fill="#fff" stroke={OUT} strokeWidth="3" />
      <circle cx="25" cy="34" r="3" fill={OUT} /><circle cx="39" cy="34" r="3" fill={OUT} />
      <circle cx="32" cy="40" r="2" fill="#ff6a4d" />
      <path d="M32 42c-2 2-5 2-7 0M32 42c2 2 5 2 7 0" stroke={OUT} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M10 34h8M10 38h8M46 34h8M46 38h8" stroke={OUT} strokeWidth="2" strokeLinecap="round" />
      <rect x="24" y="50" width="16" height="6" rx="3" fill="#ff6a4d" stroke={OUT} strokeWidth="2.4" />
    </svg>
  );
}

export function KStar({ className = "", color = "#ffd23f", style }: { className?: string; color?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" aria-hidden>
      <path d="M12 0c.6 6 1.4 6.8 12 12-10.6 5.2-11.4 6-12 12-.6-6-1.4-6.8-12-12 10.6-5.2 11.4-6 12-12Z" fill={color} stroke={OUT} strokeWidth="1.2" />
    </svg>
  );
}
