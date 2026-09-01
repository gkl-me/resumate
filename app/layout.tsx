import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Resumate - Local-First Developer Resume Builder",
    template: "%s | Resumate",
  },
  description:
    "Craft the ultimate developer resume with Resumate. A fast, local-first, drag-and-drop resume builder with live PDF preview and zero data collection.",
  keywords: [
    "Resumate",
    "Developer Resume Builder",
    "Dev Resume",
    "Local-first Resume Builder",
    "Free Resume Maker",
    "Live PDF Preview",
    "ATS Friendly Resume",
    "Software Engineer Resume",
  ],
  authors: [{ name: "gkl-me", url: "https://github.com/gkl-me/resumate" }],
  creator: "Resumate",
  openGraph: {
    title: "Resumate - Local-First Developer Resume Builder",
    description:
      "Craft the ultimate developer resume with Resumate. Fast, free, local-first, with live PDF preview.",
    siteName: "Resumate",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resumate - Local-First Developer Resume Builder",
    description:
      "Craft the ultimate developer resume with Resumate. Fast, free, local-first, with live PDF preview.",
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
