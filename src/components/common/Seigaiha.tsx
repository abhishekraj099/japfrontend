/**
 * 青海波 — Seigaiha. The traditional Japanese overlapping-wave motif,
 * tiled as a faint decorative pattern. Pure SVG <pattern>, color/opacity
 * controlled by the caller.
 */
export function Seigaiha({
  className = "",
  color = "#22d3a6",
  opacity = 0.12,
}: {
  className?: string;
  color?: string;
  opacity?: number;
}) {
  const id = `seigaiha-${color.replace(/[^a-z0-9]/gi, "")}`;
  const arc = (cx: number, r: number) =>
    `M ${cx - r} 24 A ${r} ${r} 0 0 1 ${cx + r} 24`;

  return (
    <svg className={className} aria-hidden>
      <defs>
        <pattern
          id={id}
          x="0"
          y="0"
          width="48"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <g fill="none" stroke={color} strokeWidth="1.4" opacity={opacity}>
            {[6, 12, 18, 24].map((r) => (
              <path key={`c-${r}`} d={arc(24, r)} />
            ))}
            {[6, 12, 18, 24].map((r) => (
              <path key={`l-${r}`} d={arc(0, r)} />
            ))}
            {[6, 12, 18, 24].map((r) => (
              <path key={`r-${r}`} d={arc(48, r)} />
            ))}
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
