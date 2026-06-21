import { useMemo } from "react";

/** 星空 — a field of softly twinkling stars for night scenes. */
export function StarField({ count = 90 }: { count?: number }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2.2 + 0.6,
        dur: Math.random() * 3 + 2,
        delay: Math.random() * 4,
        warm: Math.random() > 0.78, // a few amber stars
        min: Math.random() * 0.25 + 0.1,
      })),
    [count]
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s) => (
        <span
          key={s.id}
          className="twinkle absolute rounded-full"
          style={
            {
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              background: s.warm ? "#f6c87a" : "#ffffff",
              boxShadow: s.warm
                ? "0 0 6px rgba(246,200,122,0.8)"
                : "0 0 5px rgba(255,255,255,0.7)",
              "--tw-dur": `${s.dur}s`,
              "--tw-delay": `${s.delay}s`,
              "--tw-min": `${s.min}`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
