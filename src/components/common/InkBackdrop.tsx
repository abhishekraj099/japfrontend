/**
 * 墨と日 — Ink & Sun.
 * The single signature motif: one large vermilion sun glowing high on the
 * right of an ink ground. Deliberately restrained — no other ornament.
 */
export function InkBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* outer glow halo */}
      <div
        className="sun-glow absolute"
        style={{
          right: "-6%",
          top: "-12%",
          width: "min(70vw, 720px)",
          height: "min(70vw, 720px)",
        }}
      />
      {/* the sun disc */}
      <div
        className="hinomaru absolute"
        style={{
          right: "4%",
          top: "2%",
          width: "min(34vw, 360px)",
          height: "min(34vw, 360px)",
        }}
      />
      {/* a single hairline horizon, low and quiet */}
      <div
        className="absolute inset-x-0"
        style={{
          bottom: "16%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(243,236,224,0.10) 30%, rgba(243,236,224,0.10) 70%, transparent)",
        }}
      />
    </div>
  );
}
