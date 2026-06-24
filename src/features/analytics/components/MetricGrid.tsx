import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  cols?: 2 | 3 | 4 | 5;
}

const COLS: Record<NonNullable<Props["cols"]>, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
  5: "sm:grid-cols-3 lg:grid-cols-5",
};

/** Responsive grid wrapper for StatCards (Phase 34). Reusable. */
export function MetricGrid({ children, cols = 4 }: Props) {
  return <div className={`grid grid-cols-1 gap-3 ${COLS[cols]}`}>{children}</div>;
}
