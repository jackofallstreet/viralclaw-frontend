import type { Metadata } from "next";
import { IBM_Plex_Mono, Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

const barlow = Barlow({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
  preload: false,
});

const barlowCondensed = Barlow_Condensed({
  weight: ["300", "400", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "ViralClaw — Command Center",
  description: "Your autonomous creator infrastructure",
  robots: { index: false, follow: false },
};

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${ibmPlexMono.variable} ${barlow.variable} ${barlowCondensed.variable}`}
    >
      <body className="bg-[#050505] text-[#F5F5F5]">{children}</body>
    </html>
  );
}
