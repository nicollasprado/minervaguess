import { ReactNode } from "react";

interface H1props {
  children: ReactNode;
  className?: string;
}

export default function H1({ children, className }: H1props) {
  return (
    <h1 className={`font-bold text-white text-xl ${className}`}>{children}</h1>
  );
}
