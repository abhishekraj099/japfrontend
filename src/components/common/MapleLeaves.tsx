import { useMemo } from "react";

/**
 * 紅葉 — Momiji. Falling autumn maple leaves.
 * Reuses the .sakura-fall / .sakura-spin animation pair so the motion
 * (drift + tumble) matches the petals, only the glyph + tones differ.
 */
const TONES = ["#c2402a", "#d6452c", "#b8351f", "#e07a3c", "#9c2a1b"];

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function MapleLeaves({ count = 16 }: { count?: number }) {
  const leaves = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: rand(-4, 100),
        size: rand(12, 22),
        tone: TONES[Math.floor(rand(0, TONES.length))],
        fall: rand(11, 20),
        delay: rand(-20, 0),
        sway: rand(60, 150),
        spin: rand(3, 7),
        opacity: rand(0.6, 0.95),
      })),
    [count]
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {leaves.map((l) => (
        <span
          key={l.id}
          className="sakura-fall absolute top-0"
          style={
            {
              left: `${l.left}vw`,
              animationDuration: `${l.fall}s`,
              animationDelay: `${l.delay}s`,
              "--sway": `${l.sway}px`,
            } as React.CSSProperties
          }
        >
          <span
            className="sakura-spin block"
            style={
              {
                animationDuration: `${l.spin}s`,
                animationDelay: `${l.delay}s`,
              } as React.CSSProperties
            }
          >
            <svg
              width={l.size}
              height={l.size}
              viewBox="0 0 24 24"
              style={{ opacity: l.opacity }}
            >
              {/* seven-lobed momiji leaf */}
              <path
                fill={l.tone}
                d="M12 1.5l1.6 4.2 3-2.3-1 3.9 4-1.2-2.8 3.2 4.2.9-3.9 1.6 3.3 2.7-4.3-.4 1.9 3.9-3.5-2.6-.4 4.5-1.4-4.3-2.3 3.9.1-4.5-3.8 2.4 2.1-4-4.3.2 3.4-2.9-4-1.5 4.2-.8-2.9-3.2 4 1.2-1-3.9 3 2.3z"
              />
              <path
                d="M12 12v9"
                stroke={l.tone}
                strokeWidth="1.1"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </span>
      ))}
    </div>
  );
}
