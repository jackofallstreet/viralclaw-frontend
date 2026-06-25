"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { ThemeProvider } from "./theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

  const content = appId ? (
    <PrivyProvider
      appId={appId}
      config={{
        loginMethods: ["email"],
        appearance: {
          theme: "dark",
          accentColor: "#e03030",
          logo: "/viralclaw_icon.png",
        },
      }}
    >
      {children}
    </PrivyProvider>
  ) : (
    <>{children}</>
  );

  return <ThemeProvider>{content}</ThemeProvider>;
}
