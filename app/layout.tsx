import type { Metadata } from "next";
import { Geist, Geist_Mono, Libre_Caslon_Text } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const libreCaslon = Libre_Caslon_Text({
  variable: "--font-libre-serif",
  subsets: ["latin"],
  weight: '400', // Adicione esta linha
});

export const metadata: Metadata = {
  title: "Gambit — Estratégias digitais para evoluir seu negócio",
  description:
    "Estratégias digitais para evoluir seu negócio. Ficar na mesma é ficar para trás. Mudar e avançar é a sua jogada.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} ${libreCaslon.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
