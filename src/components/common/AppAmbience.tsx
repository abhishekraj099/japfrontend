/*
  A calm, minimal backdrop: two very soft colour glows on the dark ground.
  Deliberately simple — no skyline, no petals, no clutter.
*/
export function AppAmbience() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-indigo-500/[0.07] blur-[120px]" />
      <div className="absolute -right-40 bottom-0 h-[26rem] w-[26rem] rounded-full bg-jade-500/[0.06] blur-[120px]" />
    </div>
  );
}
