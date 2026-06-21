/**
 * Living gradient-mesh background: a few large blurred color blobs that
 * slowly drift, plus a faint grid, on a near-black ground. Fixed, behind all.
 */
export function MeshBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <div
        className="blob"
        style={{
          top: "-10%",
          left: "-5%",
          width: "42vw",
          height: "42vw",
          background: "radial-gradient(circle, #6366f1, transparent 70%)",
          animation: "float-a 16s ease-in-out infinite",
        }}
      />
      <div
        className="blob"
        style={{
          top: "5%",
          right: "-8%",
          width: "38vw",
          height: "38vw",
          background: "radial-gradient(circle, #a855f7, transparent 70%)",
          animation: "float-b 20s ease-in-out infinite",
        }}
      />
      <div
        className="blob"
        style={{
          bottom: "-15%",
          left: "20%",
          width: "46vw",
          height: "46vw",
          background: "radial-gradient(circle, #ec4899, transparent 72%)",
          opacity: 0.4,
          animation: "float-c 18s ease-in-out infinite",
        }}
      />
      <div
        className="blob"
        style={{
          bottom: "0%",
          right: "10%",
          width: "30vw",
          height: "30vw",
          background: "radial-gradient(circle, #22d3ee, transparent 72%)",
          opacity: 0.3,
          animation: "float-a 22s ease-in-out infinite",
        }}
      />
      {/* faint grid texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(120% 100% at 50% 0%, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(120% 100% at 50% 0%, black 30%, transparent 80%)",
        }}
      />
      {/* darken edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 40%, transparent 40%, rgba(7,7,15,0.85) 100%)",
        }}
      />
    </div>
  );
}
