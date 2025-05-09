import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import RelatedPosts from '@/components/RelatedPosts';
import BackToTopButton from '@/components/BackToTopButton';

export const metadata: Metadata = {
  title: 'Castle (Château de Chambord-inspired) | Puzzle | Exhausted Rocket',
  description: 'How to build a mini Château de Chambord-inspired castle out of puzzle mats.',
};

export default function CastlePostPage() {
  const categoryName = "Puzzle";
  const categoryHref = "/blog/category/puzzle";
  const postTitle = "Castle";
  const postSubtitle = "(think mini Château de Chambord—big blocky keep, two pointy roofs, a little gatehouse off the side)";
  const currentSlug = "/blog/puzzle/castle";

  // Placeholder - replace with actual image path
  const imageUrl = "/images/blog/castle.webp"; // <<< PLEASE PROVIDE ACTUAL IMAGE PATH

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
              Two linked cubes form a chunky &ldquo;keep&rdquo;; snap two mats on top at right angles for the twin pitched roofs, then hinge one extra mat to the side as a gate-ramp. Toddlers crawl in, pop up under a roof, duck out the gate, repeat - non-stop squat-crawl-stand cardio that burns energy fast.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-2">Specs:</h3>
            <ul>
              <li><strong>Mats:</strong> ≈48 pcs</li>
              <li><strong>Build time:</strong> ≈15 min (ten if snacks are involved)</li>
              <li><strong>Difficulty:</strong> Advanced</li>
            </ul>
            <p className="mt-6">
              That&apos;s the gist - castle vibes, instant toddler workout, zero overthinking. 📸 Tag me if you try it!
            </p>
          </div>

          {/* Image Section */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-lg md:col-span-1 order-1 md:order-2">
            <Image
              src={imageUrl} // <<< UPDATE THIS WITH ACTUAL PATH
              alt={`Image for ${postTitle}`}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Additional Images Gallery */}
        <section className="mt-12 pt-8 border-t">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">More Angles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <Link href="/images/blog/castle-back.webp" target="_blank" rel="noopener noreferrer" className="block relative aspect-video w-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <Image
                src="/images/blog/castle-back.webp"
                alt="Castle build - view from the back (click to enlarge)"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </Link>
            <Link href="/images/blog/castle-front.webp" target="_blank" rel="noopener noreferrer" className="block relative aspect-video w-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <Image
                src="/images/blog/castle-front.webp"
                alt="Castle build - view from the front (click to enlarge)"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </Link>
            <Link href="/images/blog/castle-inside.webp" target="_blank" rel="noopener noreferrer" className="block relative aspect-video w-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <Image
                src="/images/blog/castle-inside.webp"
                alt="Castle build - view from the inside (click to enlarge)"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </Link>
            <Link href="/images/blog/castle-top.webp" target="_blank" rel="noopener noreferrer" className="block relative aspect-video w-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <Image
                src="/images/blog/castle-top.webp"
                alt="Castle build - view from the top (click to enlarge)"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </Link>
          </div>
        </section>

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
          <p className="text-xs text-muted-foreground mt-4">
            (This is not the reason why I started this blog, but since readers are already asking might as well.)
          </p>
        </section>

        {/* Related Posts Section */}
        <RelatedPosts currentSlug={currentSlug} currentCategory={categoryName} />

      </article>
      <BackToTopButton />
    </div>
  );
} 