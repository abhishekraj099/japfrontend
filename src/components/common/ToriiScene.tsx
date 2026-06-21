/**
 * 鳥居 — a corridor of vermilion torii gates receding into the distance
 * (Fushimi-Inari style), drawn as layered silhouettes for depth.
 */
export function ToriiScene({ className = "" }: { className?: string }) {
  // each gate: x-offset from center, scale, opacity (further = smaller/fainter)
  const gates = [
    { y: 18, s: 0.42, o: 0.28 },
    { y: 30, s: 0.55, o: 0.4 },
    { y: 46, s: 0.72, o: 0.55 },
    { y: 66, s: 0.95, o: 0.78 },
    { y: 90, s: 1.25, o: 1 },
  ];

  return (
    <svg
      aria-hidden
      viewBox="0 0 400 320"
      preserveAspectRatio="xMidYMax slice"
      className={className}
    >
      {/* soft mist between gates */}
      <defs>
        <linearGradient id="torii-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#1a0f0c" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {gates.map((g, i) => {
        const w = 150 * g.s;
        const h = 150 * g.s;
        const cx = 200;
        const top = 250 - g.y * 2.2;
        return (
          <g key={i} transform={`translate(${cx - w / 2} ${top})`} opacity={g.o}>
            {/* top lintel (kasagi) with upward sweep */}
            <path
              d={`M${-w * 0.08} ${h * 0.1} Q ${w / 2} ${-h * 0.04} ${w * 1.08} ${h * 0.1} L ${w * 1.02} ${h * 0.2} Q ${w / 2} ${h * 0.1} ${-w * 0.02} ${h * 0.2} Z`}
              fill="#c0341d"
            />
            {/* second beam (nuki) */}
            <rect x={w * 0.04} y={h * 0.28} width={w * 0.92} height={h * 0.08} fill="#a82c18" />
            {/* pillars */}
            <rect x={w * 0.14} y={h * 0.2} width={w * 0.12} height={h * 0.85} fill="#b8311b" />
            <rect x={w * 0.74} y={h * 0.2} width={w * 0.12} height={h * 0.85} fill="#b8311b" />
          </g>
        );
      })}
      <rect x="0" y="0" width="400" height="320" fill="url(#torii-fade)" />
    </svg>
  );
}
