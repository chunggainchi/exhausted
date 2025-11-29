import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import RelatedPosts from '@/components/RelatedPosts';
import BackToTopButton from '@/components/BackToTopButton';

export const metadata: Metadata = {
  title: 'Stair-Tower | Puzzle | Exhausted Rocket',
  description: 'A colourful cube \'stair-tower\' puzzle mat castle, perfect for little ones to explore. Learn how to build this easy fort.',
};

export default function StairTowerPostPage() {
  const categoryName = "Puzzle";
  const categoryHref = "/blog/category/puzzle";
  const postTitle = "Stair-Tower";
  const postSubtitle = "(looks like steps, not for stepping)";
  const currentSlug = "/blog/puzzle/stair-tower";

  const imageUrl = "/images/blog/stairtower.webp";

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
              Three colourful cube &ldquo;steps&rdquo; rise to a slim peek-out tower. Little ones crawl through the bottom tunnel, shuffle up the snug middle box, and pop their heads out the top for a wave. Every inch is a squat or twist—perfect for burning babyfat &mdash; but remember: it&apos;s meant for stepping AROUND, not climbing up. There is literally only air supporting it.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-2">Details:</h3>
            <ul>
              <li><strong>Estimated build time:</strong> ≈ 8 mins</li>
              <li><strong>Mats needed:</strong> ≈ 22 pcs</li>
              <li><strong>Difficulty:</strong> Easy</li>
            </ul>
          </div>

          {/* Image Section */}
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