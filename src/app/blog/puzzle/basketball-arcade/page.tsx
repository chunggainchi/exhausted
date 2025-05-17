import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import RelatedPosts from '@/components/RelatedPosts';
import BackToTopButton from '@/components/BackToTopButton';

export const metadata: Metadata = {
  title: 'Basketball Arcade | Puzzle | Exhausted Rocket',
  description: 'Learn how to build a DIY Basketball Arcade with puzzle mats, featuring a slanted ball return and arcade-style rebounds. A fun and challenging project that packs away easily.',
};

interface AffiliateLink {
  href: string;
  text: string;
  description?: string;
}

export default function BasketballArcadePage() {
  const categoryName = "Puzzle";
  const categoryHref = "/blog/category/puzzle";
  const postTitle = "Basketball Arcade";
  const postSubtitle = "(slanted return lane, arcade-style rebounds)";
  const imageUrl = "/images/blog/basketballarcade.webp";
  const imageAlt = "Basketball Arcade puzzle mat build with slanted return lane and arcade-style rebounds";
  const currentSlug = "/blog/puzzle/basketball-arcade";
  

  const affiliateLinks: AffiliateLink[] = [
    {
      href: "https://amzn.to/4d91cez",
      text: "Puzzle Play Mats",
      description: "(I started with 4 packs which has been enough for all the builds shown here. Of course, more mats = more building possibilities!)"
    }
  ];

  const spotifyEmbedHtml = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/0kSeAd3Maax5x1abrZf9fe?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;

  const galleryImages = Array.from({ length: 11 }, (_, i) => ({
    src: `/images/blog/arcade-${i}.webp`, // arcade-0.webp to arcade-10.webp
    alt: `Basketball Arcade build step ${i + 1}`
  }));

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
        {/* Post Header */}
        <header className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">{postTitle}</h1>
          {postSubtitle && <p className="text-xl sm:text-2xl text-muted-foreground">{postSubtitle}</p>}
        </header>

        {/* Main Content & Image Wrapper */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Content Section */}
          <div className="prose dark:prose-invert max-w-none md:col-span-1 order-2 md:order-1">
            <p className="lead mb-4">
              10 mats snap into a tall backboard funnel that catches every shot and uses its slope to roll the ball forward. 18 more mats form a low bumper lane, guiding the ball straight back to the shooter so the next throw is ready in seconds. I slipped a few edge pieces along the long walls for extra stiffness - helpful but optional.
            </p>
            <p>
              Pair the build with a lightweight, fold-flat hoop (mine hangs on a window latch and flips to a dartboard on the back - highly recommend) and you&apos;ve got a DIY pop-a-shot that packs away in minutes.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-2">Details:</h3>
            <ul>
              <li><strong>Estimated build time:</strong> ≈ 10-15 mins</li>
              <li><strong>Mats needed:</strong> ≈ 28 pcs</li>
              <li><strong>Difficulty:</strong> Advanced</li>
            </ul>
          </div>

          {/* Image Section */}
          <div className="relative w-full md:col-span-1 order-1 md:order-2 flex justify-center items-start">
            <div className="w-full max-w-md"> {/* Constrains width for portrait images */}
              <Image
                src={imageUrl}
                alt={imageAlt}
                width={600} 
                height={800} 
                className="object-contain rounded-lg shadow-lg w-full h-auto"
                unoptimized={true} 
              />
            </div>
          </div>
        </div>

        {/* Step-by-step Gallery */}
        <section className="mt-12">
          <h3 className="text-2xl font-semibold mb-4">How to Build: Step-by-Step Photos</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {galleryImages.map((img, idx) => (
              <a
                key={img.src}
                href={img.src}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded shadow">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw" // Adjusted sizes for gallery
                  />
                </div>
                <span className="block mt-1 text-xs text-center text-muted-foreground">Step {idx + 1}</span>
              </a>
            ))}
          </div>
        </section>

        {/* Affiliate Links Section (as per INSTRUCTIONS_FOR_CONTENT_CREATION.md for Puzzle category) */}
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

        {/* Spotify Embed Section */}
        {spotifyEmbedHtml && (
          <section className="mt-12 pt-8 border-t">
            <h3 className="text-2xl font-semibold mb-4">Background Audio</h3>
            <div dangerouslySetInnerHTML={{ __html: spotifyEmbedHtml }} />
          </section>
        )}

        {/* Related Posts Section */}
        <RelatedPosts currentSlug={currentSlug} currentCategory={categoryName} />
      </article>
      <BackToTopButton />
    </div>
  );
} 