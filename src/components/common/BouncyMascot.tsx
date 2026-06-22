import { useEffect, useRef, useState } from "react";
import { Mascot } from "./Kawaii";

/*
  The mascot that bounces like a ball — once when it scrolls into view,
  and again every time you tap it. Re-keying the inner span restarts the
  CSS bounce animation cleanly.
*/
export function BouncyMascot({
  className = "",
  size = "h-32 w-32",
}: {
  className?: string;
  size?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [bounceKey, setBounceKey] = useState(0);
  const bounce = () => setBounceKey((k) => k + 1);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) bounce();
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <button
      ref={ref}
      onClick={bounce}
      aria-label="Bounce the mascot"
      className={`cursor-pointer select-none ${className}`}
    >
      <span key={bounceKey} className="ball-bounce">
        <Mascot className={size} />
      </span>
    </button>
  );
}
