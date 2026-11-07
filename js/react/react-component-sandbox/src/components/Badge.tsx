import type { ReactNode } from "react";

export type BadgeProps = {
  children: ReactNode;
};

export function Badge({ children }: BadgeProps) {
  return <span className="badge">{children}</span>;
}
