import Link from "next/link";
import Image from "next/image";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-center items-center">
          <Link href="/" className="flex items-center text-2xl font-bold hover:opacity-80 transition-opacity">
            
            Exhausted Rocket
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
        <p>&copy; {new Date().getFullYear()} Exhausted Rocket. All rights reserved.</p>
        {/* <p className="mt-1">
          <Link href="/privacy" className="hover:underline">Privacy Policy</Link> | 
          <Link href="/terms" className="hover:underline">Terms of Service</Link>
        </p> */}
      </footer>
    </div>
  );
} 