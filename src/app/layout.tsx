import type { Metadata } from "next";
import { Lora, Outfit } from "next/font/google";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tarihi Çarşamba Pide",
  description: "Tarihi Çarşamba Pide - QR Menü ve Sipariş",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${lora.variable} ${outfit.variable} antialiased`}>
      <body className="min-h-screen flex flex-col bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
