import { useMemo } from "react";

/*
  夜の街 — an anime "Tokyo at night" atmosphere behind the whole app:
  a glowing moon, a few soft stars and a faint city skyline with lit
  windows. Fixed, very subtle, pure CSS — never distracts from content.
*/
export function AppAmbience() {
  const stars = useMemo(
    () =>
      Array.from({ length: 22 }).map((_, i) => ({
        id: i,
        top: Math.random() * 55,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        dur: Math.random() * 3 + 2.5,
        delay: Math.random() * 4,
        warm: i % 5 === 0,
      })),
    []
  );

  // skyline buildings: [x, width, height, lit-window-rows]
  const buildings = useMemo(() => {
    const arr: { x: number; w: number; h: number; lit: boolean }[] = [];
    let x = -2;
    while (x < 100) {
      const w = 4 + Math.random() * 5;
      arr.push({ x, w, h: 30 + Math.random() * 90, lit: Math.random() > 0.5 });
      x += w + Math.random() * 1.5;
    }
    return arr;
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* moon glow */}
      <div className="absolute right-[12%] top-12 h-28 w-28 rounded-full bg-[#fff4d6]" style={{ boxShadow: "0 0 70px 24px rgba(255,236,180,0.35)" }} />
      <div className="absolute right-[12.5%] top-[3.4rem] h-24 w-24 rounded-full" style={{ background: "radial-gradient(circle at 38% 35%, #fffaf0, #ffe9b0 60%, #f6cf86)" }} />

      {/* glow blooms */}
      <div className="absolute -left-32 top-24 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="absolute -right-24 bottom-20 h-72 w-72 rounded-full bg-jade-500/10 blur-3xl" />

      {/* stars */}
      {stars.map((s) => (
        <span
          key={s.id}
          className="twinkle2 absolute rounded-full"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            background: s.warm ? "#ffd23f" : "#ffffff",
            boxShadow: s.warm ? "0 0 6px rgba(255,210,63,0.7)" : "0 0 5px rgba(255,255,255,0.6)",
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
            opacity: 0.55,
          }}
        />
      ))}

      {/* city skyline */}
      <svg className="absolute inset-x-0 bottom-0 h-64 w-full" viewBox="0 0 100 120" preserveAspectRatio="none">
        <defs>
          <linearGradient id="bld" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1c1450" /><stop offset="100%" stopColor="#0d0828" />
          </linearGradient>
        </defs>
        {buildings.map((b, i) => (
          <g key={i}>
            <rect x={b.x} y={120 - b.h} width={b.w} height={b.h} fill="url(#bld)" opacity="0.85" />
            {b.lit &&
              Array.from({ length: Math.floor(b.h / 12) }).map((_, r) => (
                <rect
                  key={r}
                  x={b.x + b.w * 0.3}
                  y={120 - b.h + 6 + r * 11}
                  width={b.w * 0.18}
                  height={2.5}
                  fill={r % 3 === 0 ? "#1ad3b0" : "#ffcf6a"}
                  opacity="0.5"
                />
              ))}
          </g>
        ))}
      </svg>
    </div>
  );
}
