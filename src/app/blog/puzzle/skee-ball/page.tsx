import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import RelatedPosts from '@/components/RelatedPosts';
import BackToTopButton from '@/components/BackToTopButton';

export const metadata: Metadata = {
  title: 'Skee-Ball | Puzzle | Exhausted Rocket',
  description: 'Learn to build a versatile foam-mat Skee-Ball game. Perfect for toddlers and older kids with adjustable rules for rolling or scoring. Easy to set up with a ramp, tunnel, and clubhouse.',
};

export default function SkeeBallPostPage() {
  const categoryName = "Puzzle";
  const categoryHref = "/blog/category/puzzle";
  const postTitle = "Skee-Ball";
  const postSubtitle = "(carnival lane, foam-mat edition)";
  const imageUrl = "/images/blog/skeeball.webp";
  const imageAlt = "Foam puzzle mat skee-ball game setup";
  const currentSlug = "/blog/puzzle/skee-ball";
  const spotifyEmbedHtml = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/0kSeAd3Maax5x1abrZf9fe?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`; // <<< PASTE SPOTIFY IFRAME CODE HERE  
  return (
    <div className="container mx-auto px-4 py-8">
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
          <div className="prose dark:prose-invert max-w-none md:col-span-1 order-2 md:order-1">
            <p className="lead">
              A simple tunnel plus a cube &ldquo;clubhouse,&rdquo; topped with one extra mat as a gentle ramp - that&apos;s it. Little players sit inside the house, roll soft balls down the ramp, watch them rattle along the tunnel, and crash into whatever targets you set at the far end (plastic bottles, plushies, snack cans&hellip; you pick the prize zone).
            </p>
            <p>
              Have an older sharpshooter? Flip the rules: roll up the ramp toward the house, lay a few rope loops inside, and score points by landing in the right ring - full skee-ball vibes, no tokens needed.
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-2">Details:</h3>
            <ul>
              <li><strong>Estimated build time:</strong> ≈ 10 mins</li>
              <li><strong>Mats needed:</strong> ≈ 47 pcs (tunnel + cube + 1 ramp panel)</li>
              <li><strong>Difficulty:</strong> Medium</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-2">Play tweaks</h3>
            <p>Tiny toddler &rarr; sit in the house and let gravity do the work.</p>
            <p>Preschool pro &rarr; roll from the floor up the ramp; add rings or tape zones for scoring.</p>
            <p>Need a bigger challenge? Raise the ramp by stacking one more mat under the front edge.</p>
            
            <p className="mt-6">
              Build, roll, giggle, reset - carnival closed when the bottles stay standing because someone finally got tired.
            </p>
          </div>

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
      </article>

         {/* Spotify Embed Section */}
         {spotifyEmbedHtml && (
          <section className="mt-12 pt-8 border-t">
            <h3 className="text-2xl font-semibold mb-4">Background Audio</h3>
            <div dangerouslySetInnerHTML={{ __html: spotifyEmbedHtml }} />
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
        <p className="text-xs text-muted-foreground mt-4">
          (This is not the reason why I started this blog, but since readers are already asking might as well.)
        </p>
      </section>

      {/* Related Posts Section */}
      <RelatedPosts currentSlug={currentSlug} currentCategory={categoryName} />
      <BackToTopButton />
    </div>
  );
} 