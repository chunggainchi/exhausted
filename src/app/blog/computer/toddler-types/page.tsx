import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import RelatedPosts from '@/components/RelatedPosts';
import BackToTopButton from '@/components/BackToTopButton';

export const metadata: Metadata = {
  title: 'Toddler Types! (a super-chill first typing trainer) | Computer | Exhausted Rocket',
  description: 'A simple, no-pressure typing game for young children, built with plain HTML/CSS/JS.',
};

export default function ToddlerTypesPostPage() {
  const categoryName = "Computer";
  const categoryHref = "/blog/category/computer";
  const postTitle = "Toddler Types!";
  const postSubtitle = "(a super-chill first typing trainer)";
  const currentSlug = "/blog/computer/toddler-types";

  const imageUrl = "/images/blog/typing.webp"; // Main image for this post

  const spotifyEmbedHtml = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/3m4GrlPEbawTr58KA3bXTg?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`; // <<< PASTE SPOTIFY IFRAME CODE HERE

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
            <p>My three-year-old has been sneaking phonics lessons who knows where, suddenly she can spot half the alphabet on her own. She&apos;s also fascinated whenever we&apos;re clacking away on our keyboards, so I went hunting for a slow, no-pressure typing game. Everything online was either lightning-fast, buzzer-loud, or graded like a college exam.</p>
            <p>So - same drill as last time - I opened Cursor, vibe-coded with Claude for an hour or so, and out popped this tiny HTML page.</p>
            
            <h3 className="text-xl font-semibold mt-8 mb-4">How it works</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted/50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">What you see</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">What to do</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Why it helps</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="px-4 py-3">Big pastel letter (or number) drifting down</td>
                    <td className="px-4 py-3">Press that key once</td>
                    <td className="px-4 py-3">Builds finger-to-symbol match</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Soft &ldquo;ding&rdquo; + point added</td>
                    <td className="px-4 py-3">Smile and keep going</td>
                    <td className="px-4 py-3">Instant feedback, zero stress</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Nothing to press?</td>
                    <td className="px-4 py-3">Wait - next character spawns after a short pause</td>
                    <td className="px-4 py-3">Teaches patience & control</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 italic">Speed is turtle-paced by default; tweak one variable in the script if your kiddo wants a faster challenge.</p>

            <h3 className="text-xl font-semibold mt-8 mb-4">Dev notes</h3>
            <ul>
              <li><strong>Time spent:</strong> ~1 focused hour</li>
              <li><strong>Stack:</strong> vanilla HTML, coded in Cursor with Claude 3.5</li>
              <li><strong>Design goal:</strong> one finger, one key, one win - no timers, only up counting score, some dings to give positive feedback, gentle FUN</li>
            </ul>
            <p className="mt-6">My toddler loves &ldquo;catching&rdquo; the letters, I love the non-twerky quietness, and the dings keep her motivated enough without a dopamine overdose.</p>
            <p className="mt-4 mb-4">👉 Play the prototype here: <a href="/games/toddler-types.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-500hover:underline">Toddler Types! Game</a></p>
            <p>Feedback welcome!</p>
          </div>

          {/* Image Section */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-lg md:col-span-1 order-1 md:order-2">
            <Image
              src={imageUrl}
              alt={`Image for ${postTitle}`}
              fill
              className="object-cover"
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