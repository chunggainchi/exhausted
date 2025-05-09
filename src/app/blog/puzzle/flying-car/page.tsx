import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import RelatedPosts from '@/components/RelatedPosts';
import BackToTopButton from '@/components/BackToTopButton';

export const metadata: Metadata = {
  title: 'Flying Car | Puzzle | Exhausted Rocket',
  description: 'Build a foam-mat flying car with detachable wings, a spacious cockpit, and room for plush co-pilots. Easy to switch between road and flight mode.',
};

interface AffiliateLink {
  href: string;
  text: string;
  description?: string;
}

export default function FlyingCarPostPage() {
  const categoryName = "Puzzle";
  const categoryHref = "/blog/category/puzzle";
  const postTitle = "Flying Car";
  const postSubtitle = "(detachable wings, first-class legroom)";
  const imageUrl = "/images/blog/flyingcar.webp";
  const imageAlt = "Foam puzzle mat flying car with detachable wings";
  const currentSlug = "/blog/puzzle/flying-car";

  const additionalImages: Array<{ src: string; alt: string }> = [
    { src: "/images/blog/flyingcar-front.webp", alt: "Flying car front view" },
    { src: "/images/blog/flyingcar-back.webp", alt: "Flying car back view" },
  ];

  const affiliateLinks: AffiliateLink[] = [
    {
      href: "https://amzn.to/4d91cez",
      text: "Puzzle Play Mats",
      description: "(I started with 4 packs which has been enough for all the builds shown here. Of course, more mats = more building possibilities!)"
    }
  ];

  const spotifyEmbedHtml = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/47ukQ3M345r1vYeCB48Ntk?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`; // <<< PASTE SPOTIFY IFRAME CODE HERE  

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
              A modern cockpit up front, a roomy cube trunk in back, and two clip-on wings turn plain foam mats into a land-and-air machine. The slanted windshield is just one mat hinged forward and braced by two edge pieces, giving the pilot generous legroom plus authentic &ldquo;driver&apos;s view.&rdquo; There&apos;s space for one tiny driver (perfect for politely declining extra passengers) and cargo for 4-5 plush co-pilots.
            </p>
            <p>
              Need the road version? Pop the wings off and cruise. Planning a long-haul &ldquo;flight&rdquo;? Snap them back on-though you might want an extra prop or two for stability before take-off.
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-2">Details:</h3>
            <ul>
              <li><strong>Estimated build time:</strong> ≈ 8 mins</li>
              <li><strong>Mats needed:</strong> ≈ 24 pcs (car base + trunk + windshield)</li>
              <li><strong>Difficulty:</strong> Easy</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-2">Play perks</h3>
            <ul className="list-disc list-inside">
              <li>Stretch-out cockpit - premium-economy toes rejoice</li>
              <li>Spacious trunk for stuffed-animal luggage, max. 4-5 furry pax</li>
              <li>Single-seat policy keeps negotiations short</li>
              <li>Clip-on/clip-off wings = instant mode switch</li>
              <li>Windshield hack: two edge strips on the sides stop it flopping mid-journey</li>
            </ul>
            
            <p className="mt-6">
              Fuel up with imagination, taxi down the hallway, and clear the couch for take-off!
            </p>
          </div>

          <div className="relative w-full md:col-span-1 order-1 md:order-2 flex justify-center items-start">
             {/* Assuming main image might be portrait or landscape, using aspect-video as a general default, adjust if needed */}
            <div className="w-full aspect-video overflow-hidden rounded-lg shadow-lg">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover"
                unoptimized={true} 
              />
            </div>
          </div>
        </div>

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
                    unoptimized={true}
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

      </article>

      <RelatedPosts currentSlug={currentSlug} currentCategory={categoryName} />
      <BackToTopButton />
    </div>
  );
} 