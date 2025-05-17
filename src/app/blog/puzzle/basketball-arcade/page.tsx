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

interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  itemClassName?: string;
  objectPosition?: string;
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
    },
    {
      href: "https://amzn.to/4j9aRmS",
      text: "Hanging foldable basketball hoop",
      description: "(Lightweight, foldable, no mounting required, also doubles as a dartboard, super fun highly recommend!)"
    },
  ];

  const spotifyEmbedHtml = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/0kSeAd3Maax5x1abrZf9fe?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;

  const galleryImages: GalleryImage[] = [
    { src: '/images/blog/arcade-0.webp', alt: 'Basketball Arcade build step 1', caption: 'Step 1 - get a lightweight hanging basketball hoop', objectPosition: 'center' },
    { src: '/images/blog/arcade-1.webp', alt: 'Basketball Arcade build step 2', caption: 'Step 2 - this is the lane part with side bumpers: build a 4x4 square with two ears', objectPosition: 'center' },
    { src: '/images/blog/arcade-2.webp', alt: 'Basketball Arcade build step 3', caption: 'Step 3 - stand up the side and fold the first and last square back to stabilize the bumper, do it on both sides', objectPosition: 'center' },
    { src: '/images/blog/arcade-3.webp', alt: 'Basketball Arcade build step 4', caption: 'Step 4 - this is the backboard part: build a 2x4 wide retangle with two ears', objectPosition: 'center' },
    { src: '/images/blog/arcade-4.webp', alt: 'Basketball Arcade build step 5', caption: 'Step 5 - stand upt the side and fold the ear part back as stabilizer', objectPosition: 'center' },
    { src: '/images/blog/arcade-5.webp', alt: 'Basketball Arcade build step 6', caption: 'Step 6 - do the same to the other side', objectPosition: 'center' },
    { src: '/images/blog/arcade-6.webp', alt: 'Basketball Arcade build step 7', caption: 'Step 7 - now lean the backboard part to the wall underneath the hung basketball hoop', objectPosition: 'center' },
    { src: '/images/blog/arcade-7.webp', alt: 'Basketball Arcade build step 8', caption: 'Step 8 - connect the lane part with side bumpers to the backboard part, as long as the bottom is connected and you have enough slantedness you are good ', objectPosition: 'center' },
    { src: '/images/blog/arcade-8.webp', alt: 'Basketball Arcade build step 9', caption: 'Step 9 - if you have edge pieces put two at the end of the lane', objectPosition: 'center' },
    { src: '/images/blog/arcade-9.webp', alt: 'Basketball Arcade build step 10', caption: 'Step 10 - then stand them up so they can be the lips to slow down/stop the rolling ball', objectPosition: 'center' },
    { src: '/images/blog/arcade-10.webp', alt: 'Basketball Arcade build step 11', caption: 'Step 11 - add edge pieces to strengthen all the bumpers if you feel like it, otherwise just add the balls and you are ready to go!', objectPosition: 'center' },
    { src: '/images/blog/arcade-11.webp', alt: 'Basketball Arcade build step 12', caption: 'Step 12 - Shoot, auto-roll and enjoy!', objectPosition: 'center' },

  ];

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
            {galleryImages.map((img) => (
              <a
                key={img.src}
                href={img.src}
                target="_blank"
                rel="noopener noreferrer"
                className={`block group ${img.itemClassName || ''}`}
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded shadow">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                    style={{ objectPosition: img.objectPosition || 'center' }}
                  />
                </div>
                <span className="block mt-1 text-xs text-center text-muted-foreground">{img.caption}</span>
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