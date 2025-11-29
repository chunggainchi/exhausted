import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Jost } from 'next/font/google';
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

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
  verification: {
    other: {
      'p:domain_verify': 'e399bca6beb28d63e4ad30b0627c9e71',
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
        {children}
        {/* <GoogleAnalytics gaId={GA_TRACKING_ID} /> */}{/* Removed */}
        <Analytics />
      </body>
    </html>
  );
}
