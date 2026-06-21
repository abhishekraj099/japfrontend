import { useMemo } from "react";

/**
 * 桜吹雪 — Sakura fubuki.
 * A field of cherry-blossom petals that fall, drift sideways and tumble.
 * Pure CSS animation (transform/opacity only) so it stays smooth and cheap.
 * Each petal gets randomized lane, size, speed, delay and sway via CSS vars
 * consumed by the @keyframes defined in index.css.
 */

interface Props {
  /** how many petals to render (default 26) */
  count?: number;
  className?: string;
}

const PETAL_TONES = [
  "#f7d2dc", // pale blush
  "#f2bcc9", // sakura pink
  "#eaa9bd",
  "#fbe3ea", // near white
  "#e89bb0",
];

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function SakuraPetals({ count = 26, className = "" }: Props) {
  // memoize so petals don't re-randomize on every render
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const size = rand(9, 17);
        return {
          id: i,
          left: rand(-4, 100), // vw
          size,
          tone: PETAL_TONES[Math.floor(rand(0, PETAL_TONES.length))],
          fall: rand(9, 17), // seconds to fall
          delay: rand(-18, 0), // negative => already mid-flight on load
          sway: rand(40, 120), // px horizontal drift
          spin: rand(2.5, 6), // seconds per tumble
          opacity: rand(0.55, 0.95),
        };
      }),
    [count]
  );

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {petals.map((p) => (
        <span
          key={p.id}
          className="sakura-fall absolute top-0"
          style={
            {
              left: `${p.left}vw`,
              animationDuration: `${p.fall}s`,
              animationDelay: `${p.delay}s`,
              "--sway": `${p.sway}px`,
            } as React.CSSProperties
          }
        >
          <span
            className="sakura-spin block"
            style={
              {
                animationDuration: `${p.spin}s`,
                animationDelay: `${p.delay}s`,
              } as React.CSSProperties
            }
          >
            <svg
              width={p.size}
              height={p.size}
              viewBox="0 0 20 20"
              fill="none"
              style={{ opacity: p.opacity }}
            >
              {/* a single cherry-blossom petal with a soft notch */}
              <path
                d="M10 1C7 4 4 7 4 11.5 4 15.5 6.7 18 10 18s6-2.5 6-6.5C16 7 13 4 10 1Z"
                fill={p.tone}
              />
              <path
                d="M10 18c-1-2.4-1-4.6 0-7"
                stroke="#ffffff"
                strokeOpacity="0.45"
                strokeWidth="0.7"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </span>
      ))}
    </div>
  );
}
