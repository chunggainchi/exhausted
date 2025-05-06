import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Layout from "@/components/Layout";
// import { GoogleAnalytics } from '@next/third-parties/google'; // Removed

const GA_TRACKING_ID = "G-CS5K6LLQFH"; // Keep for reference, used in script below

export const metadata: Metadata = {
  title: "Exhausted Rocket - Play Idea Hacks & More",
  description: "Detailed content on how play idea hacks work. Mobile-first blog.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        {/* Google tag (gtag.js) */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}');
            `,
          }}
        />
        {/* End Google tag (gtag.js) */}
      </head>
      <body>
        <Layout>{children}</Layout>
        {/* <GoogleAnalytics gaId={GA_TRACKING_ID} /> */}{/* Removed */}
      </body>
    </html>
  );
}
