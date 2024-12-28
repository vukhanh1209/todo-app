import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import ProviderRecoil from "@/providers/ProviderRecoil";
import { Toaster } from "sonner";

const primaryFont = Roboto({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Todo App",
  description: "A simple todo app built with Next and Recoil.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${primaryFont.className} antialiased`}>
        <ProviderRecoil>{children}</ProviderRecoil>
        <Toaster richColors />
      </body>
    </html>
  );
}
