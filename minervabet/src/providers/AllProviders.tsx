"use client";

import { TanstackProvider } from "@/components/provider/tanstackProvider";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <TanstackProvider>{children}</TanstackProvider>
    </SessionProvider>
  );
}
