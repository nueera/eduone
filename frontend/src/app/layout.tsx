import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { AccentSync, ThemePresetSync } from "@/components/collegeos/AccentSync";
import { KeyboardShortcutProvider } from "@/components/global/KeyboardShortcutProvider";
import { GlobalLoadingProvider } from "@/components/global/GlobalLoadingProvider";
import { GlobalWorkspaceDock } from "@/components/workspace/GlobalWorkspaceDock";
import { QueryProvider } from "@/components/providers/query-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CollegeOS — Campus Management Platform",
  description: "The next-generation College OS — your control center for all campus modules.",
  keywords: ["CollegeOS", "Campus Management", "ERP", "CRM", "Admission", "Academic"],
  authors: [{ name: "CollegeOS" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <QueryProvider>
            <AccentSync />
            <ThemePresetSync />
            <KeyboardShortcutProvider>
              <GlobalLoadingProvider>
                <main id="main-content">
                  {children}
                </main>
                <GlobalWorkspaceDock />
                <SonnerToaster />
              </GlobalLoadingProvider>
            </KeyboardShortcutProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
