import { ReactNode } from "react";

interface H3props {
  children: ReactNode;
  className?: string;
}

export default function H3({ children, className }: H3props) {
  return (
    <h3 className={`font-medium text-white text-[0.95rem] ${className}`}>
      {children}
    </h3>
  );
}
