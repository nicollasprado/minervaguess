import { ReactNode } from "react";

interface H2props {
  children: ReactNode;
  className?: string;
}

export default function H2({ children, className }: H2props) {
  return (
    <h2 className={`font-semibold text-neutral-300 text-lg ${className}`}>
      {children}
    </h2>
  );
}
