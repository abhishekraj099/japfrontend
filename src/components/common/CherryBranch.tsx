/**
 * 桜の枝 — a cherry-blossom branch silhouette for scene corners.
 * Hand-placed blossoms on a forked branch; inherits sizing from parent.
 */
export function CherryBranch({ className = "" }: { className?: string }) {
  const blossoms: Array<[number, number, number]> = [
    // x, y, radius
    [70, 60, 13], [120, 40, 11], [165, 70, 14], [210, 45, 10],
    [95, 110, 12], [150, 130, 10], [200, 105, 13], [55, 150, 10],
    [240, 80, 11], [180, 160, 12], [120, 175, 10], [255, 140, 12],
  ];

  return (
    <svg
      aria-hidden
      viewBox="0 0 280 220"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* branches */}
      <g
        stroke="#3a2a2f"
        strokeOpacity="0.85"
        strokeLinecap="round"
        fill="none"
      >
        <path d="M0 8 C 60 20 90 40 130 55 S 210 70 280 60" strokeWidth="6" />
        <path d="M70 28 C 80 55 85 90 60 150" strokeWidth="4" />
        <path d="M150 56 C 160 90 165 120 120 175" strokeWidth="3.5" />
        <path d="M205 48 C 225 70 240 100 250 140" strokeWidth="3.5" />
        <path d="M120 50 C 110 70 100 95 95 110" strokeWidth="3" />
      </g>

      {/* blossoms */}
      {blossoms.map(([cx, cy, r], i) => (
        <g key={i} transform={`translate(${cx} ${cy})`}>
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse
              key={a}
              rx={r * 0.5}
              ry={r * 0.78}
              cy={-r * 0.5}
              transform={`rotate(${a})`}
              fill={i % 3 === 0 ? "#fbe3ea" : "#f3bccb"}
              fillOpacity="0.95"
            />
          ))}
          <circle r={r * 0.28} fill="#d6452c" fillOpacity="0.85" />
        </g>
      ))}
    </svg>
  );
}
