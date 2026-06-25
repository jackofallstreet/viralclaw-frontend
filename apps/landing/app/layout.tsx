import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Barlow, Barlow_Condensed } from "next/font/google";
import Providers from "@/components/providers";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

const barlow = Barlow({
  weight: ["300", "400", "500", "600"],
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
  metadataBase: new URL("https://viralclaw.xyz"),

  title: {
    default: "ViralClaw — AI-native infrastructure for creators",
    template: "%s | ViralClaw",
  },

  description:
    "Real-time YouTube and social signals turned into content strategy and autonomous actions.",

  applicationName: "ViralClaw",

  keywords: [
    "ViralClaw",
    "AI creator tools",
    "content automation",
    "YouTube intelligence",
    "creator infrastructure",
    "social analytics",
    "AI agents",
    "content strategy",
    "creator economy",
  ],

  authors: [{ name: "ViralClaw" }],
  creator: "ViralClaw",
  publisher: "ViralClaw",

  category: "technology",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: [
      { url: "/viralclaw_icon.png", type: "image/png" },
    ],
    shortcut: ["/viralclaw_icon.png"],
    apple: [
      { url: "/viralclaw_icon.png", type: "image/png" },
    ],
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://viralclaw.xyz",
    siteName: "ViralClaw",
    title: "ViralClaw — AI-native infrastructure for creators",
    description:
      "Real-time signals. Autonomous execution. The operating system for the attention economy.",
    images: [
      {
        url: "/viralclaw_icon.png",
        width: 1200,
        height: 1200,
        alt: "ViralClaw",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "ViralClaw — AI-native infrastructure for creators",
    description:
      "Real-time signals. Autonomous execution. The operating system for the attention economy.",
    creator: "@viralclaw",
    images: ["/viralclaw_icon.png"],
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ViralClaw",
  },

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

// Prevents flash of wrong theme on load
const themeScript = `
  (function() {
    try {
      var stored = localStorage.getItem('vc-theme');
      if (stored === 'light' || stored === 'dark') {
        document.documentElement.setAttribute('data-theme', stored);
      } else {
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
      }
    } catch(e) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  })();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${ibmPlexMono.variable} ${barlow.variable} ${barlowCondensed.variable}`}
    >
      <head>
        {/* Inline script runs before paint — prevents theme flash */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
