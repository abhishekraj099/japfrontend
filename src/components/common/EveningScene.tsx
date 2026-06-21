import { SakuraTree } from "./SakuraTree";
import { SakuraPetals } from "./SakuraPetals";

/**
 * 夕暮れ — an evening sunset backdrop: a low sun, layered hills, a ground
 * plane, a cherry tree rising from it, and petals drifting down to settle.
 * Rendered fixed, behind all app content.
 */
export function EveningScene({ petals = 22 }: { petals?: number }) {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* setting sun glow */}
      <div
        className="absolute"
        style={{
          right: "14%",
          top: "16%",
          width: "min(46vw, 460px)",
          height: "min(46vw, 460px)",
          background:
            "radial-gradient(circle, rgba(255,224,170,0.85) 0%, rgba(255,180,120,0.45) 32%, rgba(255,150,100,0.12) 58%, transparent 72%)",
          filter: "blur(2px)",
        }}
      />
      {/* the sun disc */}
      <div
        className="absolute rounded-full"
        style={{
          right: "22%",
          top: "24%",
          width: "min(16vw, 150px)",
          height: "min(16vw, 150px)",
          background:
            "radial-gradient(circle, #fff3d6 0%, #ffd28a 55%, #ffb066 100%)",
          boxShadow: "0 0 80px 30px rgba(255,200,140,0.45)",
        }}
      />

      {/* a distant flock drifting toward the sun */}
      <div
        className="bird-fly absolute"
        style={
          { top: "20%", left: 0, "--bf-dur": "44s", "--bf-delay": "-6s" } as React.CSSProperties
        }
      >
        {[
          [0, 0, 1],
          [34, 10, 0.8],
          [64, 4, 0.9],
          [22, 26, 0.7],
          [54, 30, 0.65],
        ].map(([x, y, s], i) => (
          <svg
            key={i}
            className="bird-flap absolute"
            width={18 * s}
            height={8 * s}
            viewBox="0 0 24 10"
            style={{ left: x, top: y, animationDelay: `${i * 0.12}s` }}
          >
            <path
              d="M1 8 C 6 1 9 1 12 5 C 15 1 18 1 23 8"
              stroke="#2a1a2e"
              strokeOpacity="0.55"
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        ))}
      </div>

      {/* distant hill layers */}
      <svg
        className="absolute inset-x-0 bottom-0 w-full"
        viewBox="0 0 1440 420"
        preserveAspectRatio="xMidYMax slice"
        style={{ height: "62vh" }}
      >
        <path
          d="M0 250 C 240 180 480 210 720 200 C 980 190 1180 150 1440 200 L1440 420 L0 420 Z"
          fill="#6b3b4d"
          opacity="0.45"
        />
        <path
          d="M0 300 C 300 250 560 290 820 270 C 1080 250 1260 300 1440 280 L1440 420 L0 420 Z"
          fill="#4a2740"
          opacity="0.6"
        />
        {/* ground / surface where petals settle */}
        <path
          d="M0 350 C 360 330 760 360 1080 345 C 1260 337 1360 350 1440 345 L1440 420 L0 420 Z"
          fill="#2c1830"
          opacity="0.85"
        />
      </svg>

      {/* the cherry tree, rooted on the ground */}
      <SakuraTree className="absolute bottom-0 left-[2%] h-[58vh] max-h-[560px] w-auto drop-shadow-[0_10px_30px_rgba(20,8,24,0.5)] sm:left-[6%]" />

      {/* petals falling from the canopy toward the surface */}
      <SakuraPetals count={petals} />
    </div>
  );
}
