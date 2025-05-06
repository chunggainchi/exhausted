import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Layout from "@/components/Layout";
import { GoogleAnalytics } from '@next/third-parties/google';

const GA_TRACKING_ID = "G-CS5K6LLQFH";

export const metadata: Metadata = {
  title: "Exhausted Rocket - Play Idea Hacks & More",
  description: "Detailed content on how play idea hacks work. Mobile-first blog.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        {/* Old Script implementation removed */}
      </head>
      <body>
        <Layout>{children}</Layout>
      </body>
      <GoogleAnalytics gaId={GA_TRACKING_ID} />
    </html>
  );
}
