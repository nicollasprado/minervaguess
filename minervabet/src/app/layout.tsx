import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { TanstackProvider } from "@/components/provider/tanstackProvider";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Minervabet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <TanstackProvider>
        <body className={`${poppins.className} antialiased`}>{children}</body>
      </TanstackProvider>
    </html>
  );
}
