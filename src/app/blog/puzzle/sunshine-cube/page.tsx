import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import RelatedPosts from '@/components/RelatedPosts';
import BackToTopButton from '@/components/BackToTopButton';

export const metadata: Metadata = {
  title: 'Sunshine Cube (tiny-house vibes) | Puzzle | Exhausted Rocket',
  description: 'How to build a Sunshine Cube with a window out of puzzle mats.',
};

export default function SunshineCubePostPage() {
  const categoryName = "Puzzle";
  const categoryHref = "/blog/category/puzzle";
  const postTitle = "Sunshine Cube";
  const postSubtitle = "(tiny-house vibes)";
  const currentSlug = "/blog/puzzle/sunshine-cube";

  const imageUrl = "/images/blog/Cube.webp"; // Main image

  // Data for additional images gallery (empty for now)
  const additionalImages: Array<{ src: string; alt: string }> = [];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
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
        <header className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">{postTitle}</h1>
          {postSubtitle && <p className="text-xl sm:text-2xl text-muted-foreground">{postSubtitle}</p>}
        </header>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Content Section */}
          <div className="prose dark:prose-invert max-w-none md:col-span-1 order-2 md:order-1">
            <p className="lead">
              A single tall box with a sun-window cut-out turns plain foam mats into a cozy micro-home. Toddlers can crawl in, sit upright, wave through the window, and chill—minimal effort for you, maximum &ldquo;I have my own place&rdquo; pride for them.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-2">Details:</h3>
            <ul>
              <li><strong>Estimated build time:</strong> ≈ 10 mins</li>
              <li><strong>Mats needed:</strong> ≈ 25 pcs</li>
              <li><strong>Difficulty:</strong> Easy</li>
            </ul>
            <h3 className="text-xl font-semibold mt-6 mb-2">Perks:</h3>
             <ul>
              <li>Natural light</li>
              <li>Peek-a-boo portal</li>
              <li>A surprisingly long stretch of peaceful floor time for everyone.</li>
            </ul>
          </div>

          {/* Image Section */}
          {/* Using default aspect-ratio and object-cover for potentially standard photo */}
          <div className="w-full overflow-hidden rounded-lg shadow-lg md:col-span-1 order-1 md:order-2">
            <Image
              src={imageUrl}
              alt={`Image for ${postTitle}`}
              width={900}
              height={1200}
              className="w-full h-auto object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Additional Images Gallery (conditionally rendered) */}
        {additionalImages.length > 0 && (
          <section className="mt-12 pt-8 border-t">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">More Angles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {additionalImages.map((img) => (
                <Link key={img.src} href={img.src} target="_blank" rel="noopener noreferrer" className="block relative aspect-video w-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Affiliate Links Section */}
        <section className="mt-12 pt-8 border-t">
          <h3 className="text-2xl font-semibold mb-4">Gear We Used (Affiliate Links)</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <a 
                href="https://amzn.to/4d91cez" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Puzzle Play Mats
              </a>
              <span className="text-sm text-muted-foreground ml-1">
                (I started with 4 packs which has been enough for all the builds shown here. Of course, more mats = more building possibilities!)
              </span>
            </li>
          </ul>
        </section>

        {/* Related Posts Section */}
        <RelatedPosts currentSlug={currentSlug} currentCategory={categoryName} />

      </article>
      <BackToTopButton />
    </div>
  );
} 