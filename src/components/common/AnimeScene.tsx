/*
  アニメ風キービジュアル — a hand-built anime "key visual": sunset sky,
  Mt. Fuji, a torii gate, a sakura tree, a city skyline and the mascot.
  Full-bleed vector art used as the home-screen hero banner.
*/
export function AnimeScene({ className = "" }: { className?: string }) {
  const OUT = "#1c1340";
  // skyline buildings
  const blds = Array.from({ length: 16 }).map((_, i) => ({
    x: i * 62 - 10,
    w: 40 + (i % 3) * 10,
    h: 60 + ((i * 37) % 90),
  }));

  return (
    <svg className={className} viewBox="0 0 960 360" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="as-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#241858" />
          <stop offset="42%" stopColor="#5b2a7e" />
          <stop offset="74%" stopColor="#c23a6b" />
          <stop offset="100%" stopColor="#ff8a4c" />
        </linearGradient>
        <radialGradient id="as-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff6d8" />
          <stop offset="55%" stopColor="#ffc14d" />
          <stop offset="100%" stopColor="#ff7a4d" />
        </radialGradient>
        <linearGradient id="as-fuji" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a5fae" />
          <stop offset="100%" stopColor="#34286e" />
        </linearGradient>
        <linearGradient id="as-canopy" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffd0e0" />
          <stop offset="100%" stopColor="#ff8fb4" />
        </linearGradient>
        <linearGradient id="as-mascot" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#b8a6ff" />
          <stop offset="100%" stopColor="#7c5cff" />
        </linearGradient>
      </defs>

      {/* sky */}
      <rect width="960" height="360" fill="url(#as-sky)" />

      {/* sun + glow */}
      <circle className="anim-sun" cx="660" cy="150" r="150" fill="#ff8a4c" opacity="0.25" />
      <circle cx="660" cy="150" r="86" fill="url(#as-sun)" />
      {/* sun bands */}
      <g fill="#241858" opacity="0.18">
        <rect x="560" y="150" width="200" height="7" rx="3" />
        <rect x="560" y="166" width="200" height="7" rx="3" />
        <rect x="572" y="182" width="176" height="7" rx="3" />
      </g>

      {/* stars + sparkles */}
      <g fill="#fff">
        <circle cx="120" cy="50" r="2" opacity="0.8" /><circle cx="300" cy="36" r="1.6" opacity="0.7" />
        <circle cx="520" cy="44" r="2" opacity="0.7" /><circle cx="860" cy="60" r="1.6" opacity="0.6" />
      </g>
      <g fill="#ffd23f">
        <path d="M210 70c.3 3 .6 3.4 6 6-5.4 2.6-5.7 3-6 6-.3-3-.6-3.4-6-6 5.4-2.6 5.7-3 6-6Z" />
        <path d="M880 130c.3 3 .6 3.4 6 6-5.4 2.6-5.7 3-6 6-.3-3-.6-3.4-6-6 5.4-2.6 5.7-3 6-6Z" />
      </g>

      {/* clouds */}
      <g className="anim-cloud" fill="#ffd9c2" opacity="0.5">
        <ellipse cx="200" cy="120" rx="58" ry="14" /><ellipse cx="250" cy="128" rx="40" ry="11" />
        <ellipse cx="780" cy="80" rx="50" ry="12" />
      </g>

      {/* Mt. Fuji */}
      <path d="M300 300C360 170 430 120 480 120s120 50 180 180Z" fill="url(#as-fuji)" />
      <path d="M440 170c20-26 30-38 40-38s20 12 40 38c-14-6-26 8-40 8s-26-14-40-8Z" fill="#fff" opacity="0.92" />

      {/* city skyline */}
      <g>
        {blds.map((b, i) => (
          <g key={i}>
            <rect x={b.x} y={360 - b.h} width={b.w} height={b.h} fill="#1c1450" opacity="0.92" />
            {Array.from({ length: Math.floor(b.h / 18) }).map((_, r) => (
              <rect key={r} x={b.x + b.w * 0.32} y={360 - b.h + 8 + r * 16} width={b.w * 0.16} height={3} fill={r % 3 === 0 ? "#1ad3b0" : "#ffcf6a"} opacity="0.55" />
            ))}
          </g>
        ))}
      </g>

      {/* torii gate (right) */}
      <g stroke={OUT} strokeWidth="3" strokeLinejoin="round">
        <path d="M740 150c34-9 96-9 130 0l-7 15c-26-7-90-7-116 0l-7-15Z" fill="#ff5a3c" />
        <rect x="762" y="172" width="86" height="13" rx="3" fill="#ff7a52" />
        <rect x="772" y="162" width="16" height="130" rx="3" fill="#ff5a3c" />
        <rect x="822" y="162" width="16" height="130" rx="3" fill="#ff5a3c" />
      </g>

      {/* sakura tree (left) */}
      <g>
        <path d="M120 320c-4-40-2-70 6-110" stroke="#3a2230" strokeWidth="14" fill="none" strokeLinecap="round" />
        <path d="M124 250c-14-12-26-16-40-30M124 240c14-12 26-16 44-26" stroke="#3a2230" strokeWidth="8" fill="none" strokeLinecap="round" />
        {[[120, 170, 46], [86, 196, 34], [156, 192, 36], [120, 210, 38], [70, 220, 24], [170, 220, 26]].map(([cx, cy, r], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill="url(#as-canopy)" opacity="0.97" />
        ))}
      </g>

      {/* birds */}
      <g stroke="#241858" strokeWidth="2.4" fill="none" strokeLinecap="round" opacity="0.6">
        <path d="M380 70c6-7 9-7 12-2 3-5 6-5 12 2" />
        <path d="M430 86c5-6 7-6 10-2 3-4 5-4 10 2" />
      </g>

      {/* mascot */}
      <g transform="translate(470 230)">
        <path d="M0 4c4-13 18-10 18 1 0 5-4 8-8 9" fill="#7c5cff" stroke={OUT} strokeWidth="3" />
        <circle cx="18" cy="12" r="6" fill="#5bd1ff" stroke={OUT} strokeWidth="3" />
        <ellipse cx="0" cy="62" rx="44" ry="42" fill="url(#as-mascot)" stroke={OUT} strokeWidth="3.5" />
        <ellipse cx="0" cy="67" rx="33" ry="30" fill="#fff" />
        <g className="anim-blink">
          <circle cx="-11" cy="60" r="6" fill={OUT} /><circle cx="13" cy="60" r="6" fill={OUT} />
          <circle cx="-9" cy="58" r="1.8" fill="#fff" /><circle cx="15" cy="58" r="1.8" fill="#fff" />
        </g>
        <path d="M-6 74c5 5 11 5 16 0" stroke={OUT} strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="-18" cy="70" r="5" fill="#ff9ab7" opacity="0.85" /><circle cx="20" cy="70" r="5" fill="#ff9ab7" opacity="0.85" />
      </g>
    </svg>
  );
}
