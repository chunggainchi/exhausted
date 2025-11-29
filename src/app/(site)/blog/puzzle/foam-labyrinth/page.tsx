import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import RelatedPosts from '@/components/RelatedPosts';
import BackToTopButton from '@/components/BackToTopButton';

// 1. Metadata Export
export const metadata: Metadata = {
  title: 'Foam Labyrinth | Puzzle | Exhausted Rocket',
  description: 'Build a walk-in maze that reshuffles in minutes using puzzle mats. Create winding corridors for toddlers with multiple game modes including classic maze and Pac-Man dash.',
};

// 2. Page Component
export default function FoamLabyrinthPage() {
  // 3. Constants for easy management
  const categoryName = "Puzzle";
  const categoryHref = "/blog/category/puzzle";
  const postTitle = "Foam Labyrinth";
  const postSubtitle = "(walk-in maze that reshuffles in minutes)";
  const imageUrl = "/images/blog/labyrinth.webp";
  const imageAlt = "Foam labyrinth puzzle mat maze with colorful walls";
  const currentSlug = "/blog/puzzle/foam-labyrinth";

  // Affiliate links
  const affiliateLinks = [
    {
      href: "https://amzn.to/4d91cez",
      text: "Puzzle Play Mats",
      description: "(I started with 4 packs which has been enough for all the builds shown here. Of course, more mats = more building possibilities!)"
    }
  ];

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
              Snap long, two-tile-high wall strips, fold them once or twice, and arrange them into winding corridors — instant human-sized maze. At 60 cm tall, the walls are high enough to block a toddler&apos;s line of sight but low enough for you to cheer from above.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2">Game modes</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li><strong>Classic Maze</strong> – Start at one entrance, find the exit.</li>
              <li><strong>Pac-Man Dash</strong> – Hide 6 balls or balloons in dead-ends; set a one-minute timer and shout &ldquo;GO!&rdquo; Squat, grab, sprint, repeat.</li>
              <li><strong>Shuffle & Replay</strong> – Lift any wall section, swivel, drop — new maze, zero extra build time.</li>
            </ol>

            <h3 className="text-xl font-semibold mt-6 mb-2">Details:</h3>
            <ul>
              <li><strong>Estimated build time:</strong> ≈ 10 mins</li>
              <li><strong>Mats needed:</strong> ≈ 30 – 48 pcs (more tiles = bigger maze)</li>
              <li><strong>Difficulty:</strong> Easy</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-2">Why it rocks</h3>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Reconfigurable:</strong> endless layouts with the same walls.</li>
              <li><strong>Cardio + brain work:</strong> running, squatting, route-planning.</li>
              <li><strong>Compact teardown:</strong> walls fold flat when playtime&apos;s over.</li>
            </ul>

            <p className="mt-6">
              Lay the paths, release the mini explorer, and watch the steps (and giggles) stack up.
            </p>
          </div>

          {/* 7. Image Section - Using natural aspect ratio for portrait image */}
          <div className="relative w-full overflow-hidden rounded-lg shadow-lg md:col-span-1 order-1 md:order-2">
            <Image
              src={imageUrl}
              alt={imageAlt}
              width={600}
              height={800}
              className="w-full h-auto object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Affiliate Links Section */}
        {affiliateLinks.length > 0 && (
          <section className="mt-12 pt-8 border-t">
            <h3 className="text-2xl font-semibold mb-4">Gear We Used (Affiliate Links)</h3>
            <ul className="list-disc list-inside space-y-2">
              {affiliateLinks.map((link) => (
                <li key={link.text}>
                  <a 
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {link.text}
                  </a>
                  {link.description && <span className="text-sm text-muted-foreground ml-1">{link.description}</span>}
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground mt-4">
              (This is not the reason why I started this blog, but since readers are already asking might as well.)
            </p>
          </section>
        )}

        {/* Related Posts Section */}
        <RelatedPosts currentSlug={currentSlug} currentCategory={categoryName} />
      </article>
      <BackToTopButton />
    </div>
  );
} 