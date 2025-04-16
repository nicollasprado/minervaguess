"use client";

import { queryClient } from "@/services/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

interface TanstackProviderProps {
  children: React.ReactNode;
}

export const TanstackProvider = ({ children }: TanstackProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
