/**
 * 桜の木 — a cherry-blossom tree with an organic, layered blossom canopy
 * catching the sunset. Built from depth-shaded puff clusters so it reads as
 * foliage rather than a single ball. Inherits size from parent.
 */
export function SakuraTree({ className = "" }: { className?: string }) {
  // back (shadow) layer — deeper plum, sits behind for depth
  const back: Array<[number, number, number]> = [
    [150, 100, 60], [108, 128, 46], [196, 124, 50], [150, 150, 52],
    [86, 158, 34], [220, 156, 36], [150, 80, 42],
  ];
  // mid layer — main pink mass
  const mid: Array<[number, number, number]> = [
    [150, 96, 52], [112, 118, 40], [190, 114, 44], [150, 138, 46],
    [128, 86, 34], [178, 84, 36], [96, 150, 30], [210, 148, 32],
    [130, 150, 36], [172, 150, 36], [150, 168, 32], [150, 66, 34],
  ];
  // small edge puffs — break the silhouette
  const edge: Array<[number, number, number]> = [
    [78, 132, 18], [228, 130, 20], [92, 184, 16], [212, 184, 18],
    [150, 54, 20], [120, 64, 16], [184, 62, 17], [240, 110, 14],
    [66, 156, 14], [150, 188, 18], [104, 100, 16], [200, 96, 15],
  ];

  return (
    <svg
      aria-hidden
      viewBox="0 0 300 360"
      preserveAspectRatio="xMidYMax meet"
      className={className}
    >
      <defs>
        <radialGradient id="bloom-mid" cx="42%" cy="32%" r="80%">
          <stop offset="0%" stopColor="#ffe6ef" />
          <stop offset="50%" stopColor="#f6b6cc" />
          <stop offset="100%" stopColor="#dd86a6" />
        </radialGradient>
        <linearGradient id="bloom-back" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c87e9e" />
          <stop offset="100%" stopColor="#9c5878" />
        </linearGradient>
        <linearGradient id="trunk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a262a" />
          <stop offset="100%" stopColor="#1f1216" />
        </linearGradient>
        {/* sunset rim light on the right edge of the canopy */}
        <radialGradient id="rim" cx="80%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#ffd9a8" stopOpacity="0.85" />
          <stop offset="60%" stopColor="#ffcaa0" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* trunk + branches */}
      <g stroke="url(#trunk)" fill="none" strokeLinecap="round">
        <path d="M150 360 C150 300 148 250 150 208" strokeWidth="26" />
        <path d="M150 240 C128 214 108 200 90 152" strokeWidth="14" />
        <path d="M150 232 C174 210 198 198 212 154" strokeWidth="14" />
        <path d="M150 220 C150 188 150 168 150 118" strokeWidth="13" />
        <path d="M132 224 C118 210 104 196 86 178" strokeWidth="7" />
        <path d="M168 224 C184 208 198 196 214 180" strokeWidth="7" />
      </g>

      {/* canopy: back → mid → highlights → edges */}
      <g>
        {back.map(([cx, cy, r], i) => (
          <circle key={`b-${i}`} cx={cx} cy={cy} r={r} fill="url(#bloom-back)" opacity={0.9} />
        ))}
        {mid.map(([cx, cy, r], i) => (
          <circle key={`m-${i}`} cx={cx} cy={cy} r={r} fill="url(#bloom-mid)" opacity={0.97} />
        ))}
        {mid.slice(0, 8).map(([cx, cy, r], i) => (
          <circle
            key={`h-${i}`}
            cx={cx - r * 0.28}
            cy={cy - r * 0.32}
            r={r * 0.4}
            fill="#fff2f7"
            opacity={0.45}
          />
        ))}
        {edge.map(([cx, cy, r], i) => (
          <circle key={`e-${i}`} cx={cx} cy={cy} r={r} fill="url(#bloom-mid)" opacity={0.95} />
        ))}
        {/* sunset rim */}
        <ellipse cx={205} cy={120} rx={70} ry={80} fill="url(#rim)" />
      </g>
    </svg>
  );
}
