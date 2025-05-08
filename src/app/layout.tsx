import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Jost } from 'next/font/google';
import "./globals.css";
import Layout from "@/components/Layout";

// import { GoogleAnalytics } from '@next/third-parties/google'; // Removed

const GA_TRACKING_ID = "G-42KN1MJ4MT"; // Keep for reference, used in script below

const jostHeader = Jost({
  weight: '800',
  style: 'italic',
  subsets: ['latin'],
  variable: '--font-jost-header',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Exhausted Rocket - Play Idea Hacks & More",
  description: "Blog of a tired mom documenting her attempts to expel her toddler's energy.",
};

export default function RootLayout({ children }: { children: React.ReactNode })                       {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${jostHeader.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
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
