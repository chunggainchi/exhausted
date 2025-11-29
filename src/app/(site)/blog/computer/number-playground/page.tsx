import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import RelatedPosts from '@/components/RelatedPosts';
import BackToTopButton from '@/components/BackToTopButton';

export const metadata: Metadata = {
  title: 'Number Playground | Computer | Exhausted Rocket',
  description: 'A tribute to Numberblocks: a one-evening project to create an interactive number playground for a three-year-old.',
};

export default function NumberPlaygroundPostPage() {
  const categoryName = "Computer";
  const categoryHref = "/blog/category/computer";
  const postTitle = "Number Playground";
  const postSubtitle = "(my one-evening tribute to Numberblocks)";
  const currentSlug = "/blog/computer/number-playground";

  const imageUrl = "/images/blog/numbers.webp"; // <<< PLEASE PROVIDE ACTUAL IMAGE PATH

  const spotifyEmbedHtml = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/album/2CxycLctmzdEruHPdG2pG2?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`; // <<< PASTE SPOTIFY IFRAME CODE HERE

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
            <p>My three-year-old can already chant every episode title of Numberblocks by heart. She&apos;s cracked 0–10, sings the &ldquo;Die Wunderbare Welt von Eins&rdquo; song on repeat, and still begs to re-watch the same clips - because the music slaps and the math just clicks.</p>
            <p className="mt-4">Last week, she randomly asked, &ldquo;Mama can you build me a new game?&rdquo; Challenge accepted. Three coffee-powered hours later, Number Playground was born.</p>
            
            <h3 className="text-xl font-semibold mt-8 mb-4">What you can do inside the Playground</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted/50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Action</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">How</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Idea</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="px-4 py-3">Duplicate blocks</td>
                    <td className="px-4 py-3">Throw blocks into the mirror</td>
                    <td className="px-4 py-3">Copy / × 2</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Stack blocks</td>
                    <td className="px-4 py-3">Pick up multiple blocks</td>
                    <td className="px-4 py-3">Addition</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Break blocks into singles</td>
                    <td className="px-4 py-3">Press K</td>
                    <td className="px-4 py-3">Subtraction / partitioning</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Rotate shapes</td>
                    <td className="px-4 py-3">Press T</td>
                    <td className="px-4 py-3">Spatial reasoning</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Solve wall puzzle</td>
                    <td className="px-4 py-3">Push it in place to trigger fireworks</td>
                    <td className="px-4 py-3">Problem-solving</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Remove excess blocks</td>
                    <td className="px-4 py-3">Throw blocks into the bin</td>
                    <td className="px-4 py-3">Clean-up</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 italic">Right now the playground only counts 1 – 5 since I didn&apos;t want to overload her. And also I am lazy.</p>

            <h3 className="text-xl font-semibold mt-8 mb-4">How-to (for the curious)</h3>
            <ul className="mb-6">
              <li><strong>Build time:</strong> ≈ 3-hour late-night sprint</li>
              <li><strong>Tools:</strong> Vibe-coded in Cursor with Claude 3.5 handling the logic scaffolding, 3d assets generated by ChatGPT-4o image gen, then textured & rendered via Meshy AI</li>
              <li><strong>P.S.:</strong> A lot of copy-paste bravery and a ton of patience required</li>
            </ul>
            
            <p>She&apos;s already pushing towers through the wall, shrieking when the confetti pops, and - bonus for me - practising addition without even realising it. If your little one loves Numberblocks, let them drive the blocks themselves:</p>
            <p className= "mt-4 mb-4">👉 Play the prototype here: <a href="https://vps.heidekrueger.com/projects/numbers/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-500 hover:underline">Number Playground</a></p>
            <p>Hit me with feedback; bedtime coding sessions are officially a thing now!</p>
          </div>

          {/* Image Section - Portrait handling */}
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