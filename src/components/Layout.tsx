import Link from "next/link";
import Image from "next/image";
import { Instagram, Youtube } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gradient-to-r from-[#FFD310] to-[#FF5900] text-primary-foreground py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-center items-center">
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <Image
              src="/images/logo.svg"
              alt="Exhausted Rocket"
              width={105}
              height={48}
              className="h-12 w-auto"
              priority
            />
          </Link>
          <nav>
            {/* <Link href="/blog" className="mr-4 hover:underline">Blog</Link> */}
            {/* <Link href="/about" className="hover:underline">About</Link> */}
            {/* Add more nav links as needed */}
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-muted text-muted-foreground py-6 text-center">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Exhausted Rocket. All rights reserved.</p>
          <div className="mt-4 sm:mt-0 flex items-center space-x-4">
            <Link href="https://www.instagram.com/exhaustedrocket/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-primary transition-colors">
              <Instagram size={24} />
            </Link>
            <Link href="https://www.tiktok.com/@exhaustedrocket" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="hover:opacity-75 transition-opacity">
              {/* Using img tag directly for the SVG */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/icons/tiktok.svg" alt="TikTok" className="w-6 h-6" />
            </Link>
            <Link href="https://www.youtube.com/@ExhaustedRocket" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-primary transition-colors">
              <Youtube size={24} />
            </Link>
            <Link href="/impressum" className="text-sm hover:text-primary transition-colors">Impressum</Link>
          </div>
        </div>
        {/* <p className="mt-1">
          <Link href="/privacy" className="hover:underline">Privacy Policy</Link> | 
          <Link href="/terms" className="hover:underline">Terms of Service</Link>
        </p> */}
      </footer>
    </div>
  );
} 