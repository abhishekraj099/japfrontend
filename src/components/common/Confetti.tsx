import { useMemo } from "react";

/* A celebratory burst of sakura petals + stars + dots that fly out and fade. */
const COLORS = ["#ff6a4d", "#1ad3b0", "#7c5cff", "#ffd23f", "#ff3d8b", "#5bd1ff"];

export function Confetti({ count = 28 }: { count?: number }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
        const dist = 60 + Math.random() * 90;
        return {
          id: i,
          tx: Math.cos(angle) * dist,
          ty: Math.sin(angle) * dist + 40,
          rot: (Math.random() * 720 - 360),
          size: Math.random() * 7 + 5,
          color: COLORS[i % COLORS.length],
          delay: Math.random() * 0.12,
          round: i % 2 === 0,
        };
      }),
    [count]
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-visible">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece absolute left-1/2 top-1/2"
          style={
            {
              width: p.size,
              height: p.size,
              background: p.color,
              borderRadius: p.round ? "9999px" : "2px",
              animationDelay: `${p.delay}s`,
              "--tx": `${p.tx}px`,
              "--ty": `${p.ty}px`,
              "--rot": `${p.rot}deg`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
