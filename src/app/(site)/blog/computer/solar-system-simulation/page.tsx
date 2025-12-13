import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import RelatedPosts from '@/components/RelatedPosts';
import BackToTopButton from '@/components/BackToTopButton';
import { Button } from "@/components/ui/button";

// 1. Metadata Export
export const metadata: Metadata = {
    title: 'Solar System Simulation | Computer | Exhausted Rocket',
    description: 'A realistic 3D solar system simulation with accurate physics and time control. Explore the planets from your browser.',
};

// 2. Page Component
export default function SolarSystemPage() {
    // 3. Constants
    const categoryName = "Computer";
    const categoryHref = "/blog/computer"; // Updated href based on folder structure
    const postTitle = "Solar System Simulation";
    const postSubtitle = "(a realistic, calm space travel)";
    const imageUrl = "/images/blog/solar-system-simulation.png";
    const imageAlt = "Solar System Simulation Interface";
    const currentSlug = "/blog/computer/solar-system-simulation";

    return (
        <div className="container mx-auto px-4 py-8">
            {/* 4. Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground flex items-center">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <ChevronRight size={16} className="mx-1" />
                <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
                <ChevronRight size={16} className="mx-1" />
                <Link href={categoryHref} className="hover:text-primary transition-colors">{categoryName}</Link>
                <ChevronRight size={16} className="mx-1" />
                <span className="font-medium text-foreground">{postTitle}</span>
            </nav>

            <article>
                {/* 5. Post Header */}
                <header className="mb-8">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-2">{postTitle}</h1>
                    <p className="text-xl sm:text-2xl text-muted-foreground">{postSubtitle}</p>
                </header>

                {/* Main Content & Image Wrapper */}
                <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12">
                    {/* 6. Content Section */}
                    <div className="prose dark:prose-invert max-w-none md:col-span-1 order-2 md:order-1">
                        <p className="lead">
                            Sometimes you just need a little space. I built this interactive 3D solar system simulation to visualize the vastness of our neighborhood and show my kids how the planets actually move.
                        </p>

                        <p>
                            It started as a simple question: "Does the Moon really spin?" (Yes, it does, exactly once per orbit!). To answer it, I decided to build a simulation where we could verify it ourselves.
                        </p>

                        <h3 className="text-xl font-semibold mt-6 mb-2">Features:</h3>
                        <ul>
                            <li><strong>Realistic Physics:</strong> Orbits and rotations based on real scientific data (Keplerian elements).</li>
                            <li><strong>Time Control:</strong> Speed up time from Real Time (1s/s) to 1 Week/s to watch the outer planets move.</li>
                            <li><strong>Scale Modes:</strong> Toggle "Real Distance" to see just how empty space really is.</li>
                            <li><strong>Ambient Mode:</strong> Calm background music for maximum zoning out.</li>
                        </ul>

                        <div className="mt-8">
                            <Link href="/solar">
                                <Button size="lg" className="w-full sm:w-auto">
                                    Launch Simulation 🚀
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* 7. Image Section */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-lg md:col-span-1 order-1 md:order-2">
                        <Image
                            src={imageUrl}
                            alt={imageAlt}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Related Posts Section */}
                <RelatedPosts currentSlug={currentSlug} currentCategory={categoryName} />
            </article>
            <BackToTopButton />
        </div>
    );
}
