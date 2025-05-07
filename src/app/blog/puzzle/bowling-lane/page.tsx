import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Bowling Lane (kid-proof, gutter-proof) | Puzzle | Exhausted Rocket',
  description: 'How to build a kid-proof, gutter-proof bowling lane out of puzzle mats.',
};

export default function BowlingLanePostPage() {
  const categoryName = "Puzzle";
  const categoryHref = "/blog/category/puzzle";
  const postTitle = "Bowling Lane";
  const postSubtitle = "(kid-proof, gutter-proof)";

  const imageUrl = "/images/blog/bowling.webp"; // Main image

  // Data for additional images gallery (empty for now as none were specified)
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
              A low rectangular &quot;alley&quot; with 3-tile-high bumpers keeps the ball on track while six (or more) recycled bottles wait to be knocked down in the middle. Roll, crash, reset—repeat for endless giggles and hand-eye workout.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-2">Details:</h3>
            <ul>
              <li><strong>Difficulty:</strong> medium (needs a few extra props)</li>
              <li><strong>Estimated build time:</strong> ≈ 10–12 mins</li>
              <li><strong>Mats needed:</strong> 25 full squares + 6 edge strips (for the bumpers)</li>
              <li><strong>Extra props:</strong> soft ball, 6 empty bottles (half-filled with water or rice for stability)</li>
            </ul>
            <h3 className="text-xl font-semibold mt-6 mb-2">Quick build:</h3>
            <ol>
              <li><strong>Floor:</strong> snap two times 3 × 2 mats flat for the lane.</li>
              <li><strong>Bumpers:</strong> stand edge pieces on all sides except the front, use thin edge pieces to stabalize the walls.</li>
              <li><strong>Pin zone:</strong> line up bottles at the far end.</li>
            </ol>
            <p>
              That&apos;s it—DIY bowling without the sticky rental shoes. Keep spare pins nearby for rapid resets (make dad do it) and let the strikes begin!
            </p>
          </div>

          {/* Image Section - Portrait handling */}
          <div className="w-full overflow-hidden rounded-lg shadow-lg md:col-span-1 order-1 md:order-2">
            <Image
              src={imageUrl}
              alt={`Image for ${postTitle}`}
              width={900} // Assuming a 3:4 aspect ratio, adjust if actual image dimensions differ
              height={1200} // Assuming a 3:4 aspect ratio, adjust if actual image dimensions differ
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
      </article>
    </div>
  );
} 