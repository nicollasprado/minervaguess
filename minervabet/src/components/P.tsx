import { ReactNode } from "react";

interface Pprops {
  children: ReactNode;
  className?: string;
}

export default function P({ children, className }: Pprops) {
  return (
    <p className={`font-normal text-neutral-300 text-sm ${className}`}>
      {children}
    </p>
  );
}
