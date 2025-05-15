import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import RelatedPosts from '@/components/RelatedPosts';
import BackToTopButton from '@/components/BackToTopButton';

export const metadata: Metadata = {
  title: 'Play-Dough Surgery: Gallbladder Removal (Cholecystectomy) | Anatomy | Exhausted Rocket',
  description: 'Learn how to perform a toddler-safe play-dough cholecystectomy, exploring gallbladder anatomy, the function of bile, and why gallstones cause issues. Fun and educational!',
};

// Added AffiliateLink Interface
interface AffiliateLink {
  href: string;
  text: string;
  description?: string;
}

export default function GallbladderSurgeryPage() {
  const categoryName = "Anatomy";
  const categoryHref = "/blog/category/anatomy";
  const postTitle = "Play-Dough Surgery: Gallbladder Removal (Cholecystectomy)";
  const postSubtitle = "(our toddler-safe spin on The Breakfasteur's full OR version)";
  const imageUrl = "/images/blog/gallbladder removal.webp"; // Main portrait image
  const imageAlt = "Play-dough model showing gallbladder removal surgery setup with liver, gallbladder, and tools";
  const currentSlug = "/blog/anatomy/play-dough-surgery-gallbladder-removal";

  const galleryImages = [
    { src: "/images/blog/locating.webp", alt: "Locating the green play-dough gallbladder under the brown play-dough liver" },
    { src: "/images/blog/removing.webp", alt: "Tweezers removing the play-dough gallbladder" },
    { src: "/images/blog/cuttinggallbladder.webp", alt: "Plastic scalpel cutting the duct of the play-dough gallbladder" },
    { src: "/images/blog/gallstones.webp", alt: "Green play-dough gallbladder cut open to show bead 'gallstones' inside" },
  ];

  const breakfasteurVideoEmbedHtml = `<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; height: auto;"><iframe src="https://www.youtube.com/embed/cthRmX5zCMM" title="YouTube video player for The Breakfasteur's Gallbladder Surgery" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>`;
  const surgeryExplanationVideoEmbedHtml = `<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; height: auto;"><iframe src="https://www.youtube.com/embed/ffoKThdqo4I" title="YouTube video player for Gallbladder Surgery Explanation" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>`;
  
  const spotifyEmbedHtml = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/3mFP98CBS2f7s1s8uplMd9?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;

  // Added affiliateLinks constant
  const affiliateLinks: AffiliateLink[] = [
    {
      href: "https://amzn.to/3YywTbn",
      text: "Premium Doctor Stethoscope",
      description: "(The real stethoscope I used to hear her heartbeat when pregnant. Do not ask me why I needed this. 🙈)"
    },
    {
      href: "https://amzn.to/44sJj8u",
      text: "Dentist Play Set",
      description: "(We borrowed some props from a dentist set like this.)"
    },
    {
      href: "https://amzn.to/3YxIGGM",
      text: "Kid-Size Garden Gloves",
      description: "(Couldn\'t find surgical gloves for children lol I wonder why, but these work well enough and she can use them for other stuff too!)"
    },
    {
      href: "https://amzn.to/4dtS84b",
      text: "Playdough set",
      description: "(What I use to make the organs and skin)"
    },
    {
      href: "https://amzn.to/4jLnIwI",
      text: "The Body Book (in German)",
      description: "This is an amazing book i found on the streets, it has a lot of foldouts and is super informative 🔥"
    },
    {
      href: "https://amzn.to/4k4WYHO",
      text: "Headlamp",
      description: "(USB-C rechargeable headlamp that is perfect for surgeries as well as adventures)"
    },
    {
      href: "https://amzn.to/3FbnvUo",
      text: "Felt sewing set",
      description: "(We use this to learn how to do running stitches, and also to create other cute things that are now hanging all over her bed)"
    }
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
          {postSubtitle && <p className="text-xl sm:text-2xl text-muted-foreground mb-4">{postSubtitle}</p>}
        </header>

        {/* Main Content & Image Wrapper */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Content Section */}
          <div className="prose dark:prose-invert max-w-none md:col-span-1 order-2 md:order-1">
            <p className="lead mb-4">
              The gallbladder (that little green pouch tucked under the liver) stores extra bile. When tiny pebbles of hardened cholesterol or pigment - gallstones - clog its duct, the organ swells and hurts. Real surgeons snip it out; patients live perfectly fine without it because the liver keeps making bile that now drips straight into the gut.
            </p>
            
            <p className="font-semibold">Today's pretend operation lets kids:</p>
            <ol className="list-decimal list-inside space-y-1 mb-4">
              <li>Find the gallbladder on a play-dough organ set.</li>
              <li>Discover what bile does and why stones cause pain.</li>
              <li>Practise the careful cut-detach-lift manoeuvre to remove the whole pouch.</li>
              <li>Giggle over the Cantonese saying &ldquo;冇膽匪類&rdquo; (literally &ldquo;coward without gallbladder&rdquo;) and realise Grandpa once had this surgery and he is now a "coward" 😂!</li>
            </ol>

            <h3 className="text-xl font-semibold mt-6 mb-3">Set-up: What You&apos;ll Need</h3>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-md">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Item</th>
                    <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Color / Description</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-4 py-2 align-top text-sm font-medium text-gray-900 dark:text-gray-100">Play-dough organs</td>
                    <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-300">Liver (brown); Gallbladder (green, with bead/seed stones inside); Stomach (red); Large intestine (lavender); Small intestine (pink). Same setup as the Trichobezoar Removal post.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 align-top text-sm font-medium text-gray-900 dark:text-gray-100">Layer of skin</td>
                    <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-300">Flat sheet of dough of any skin color</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 align-top text-sm font-medium text-gray-900 dark:text-gray-100">Instruments</td>
                    <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-300">Plastic scalpel; kid tweezers/chopsticks; blunt hook or toothpick for 'clips'; plastic needle for sutures</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 align-top text-sm font-medium text-gray-900 dark:text-gray-100">Foil-lined tray</td>
                    <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-300">Operating table</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-3">Procedure: Basic Toddler Version 🎈</h3>
            <ol className="list-decimal list-inside space-y-1 mb-4">
              <li>Incise the skin - slice the orange sheet, fold back the flap.</li>
              <li>Locate &amp; lift the liver gently to see the green gallbladder hiding beneath.</li>
              <li>Snip the neck (one clean cut) and pluck the whole pouch free.</li>
              <li>Open the pouch on a side table, dig out the "gallstones", explain why they cause pain.</li>
              <li>Close the skin with finger "sutures." Patient cured, no more tummy ache!</li>
            </ol>

            <h4 className="text-lg font-semibold mt-4 mb-2">Advanced steps (for older kids / fine-motor practice)</h4>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>Pinch a narrow "cystic duct," clip it with two tiny dough rings, and cut between them - just like the real critical-view safety step.</li>
              <li>Peel the gallbladder off the underside of the liver with short, gentle scrapings.</li>
              <li>Pretend-inspect the bile duct for leaks before closing.</li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">What Kids Learn</h3>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>Anatomy: liver, gallbladder, ducts, intestines.</li>
              <li>Physiology: bile helps digest fats; stones block flow → pain.</li>
              <li>Life lesson: you can live "膽小" (without a gallbladder!) and still be brave.</li>
              <li>Skills: pinpoint cutting, steady tweezing, two-hand coordination, tidy closure.</li>
            </ul>

            <p className="mt-6">
              Seal the incision, announce "operation complete!" and let your junior surgeon parade the pebble-stones as proof that strange things inside the body sometimes need a ticket out. Next snack-time, ask which foods are fatty enough to need bile - instant revision disguised as fun.
            </p>
          </div>

          {/* Image Section - Adjusted for Portrait */}
          <div className="relative w-full md:h-[70vh] min-h-[400px] overflow-hidden rounded-lg md:col-span-1 order-1 md:order-2">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Additional Images Gallery */}
        {galleryImages.length > 0 && (
          <section className="mt-12 pt-8 border-t">
            <h3 className="text-2xl font-semibold mb-6 text-center">More Surgical Steps</h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {galleryImages.map((img, index) => (
                <a 
                  key={index}
                  href={img.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                  aria-label={`View larger image for ${img.alt}`}
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    />
                  </div>
                  <p className="mt-2 text-xs text-center text-muted-foreground">{img.alt}</p>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* YouTube Inspiration Videos Section */}
        <section className="mt-12 pt-8 border-t">
          <h3 className="text-2xl font-semibold mb-6 text-center">Video Inspiration</h3>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h4 className="text-lg font-semibold mb-2 text-center">The Breakfasteur&apos;s Version:</h4>
              {breakfasteurVideoEmbedHtml && (
                <div className="aspect-video" dangerouslySetInnerHTML={{ __html: breakfasteurVideoEmbedHtml }} />
              )}
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2 text-center">Real Surgery Explained:</h4>
              {surgeryExplanationVideoEmbedHtml && (
                <div className="aspect-video" dangerouslySetInnerHTML={{ __html: surgeryExplanationVideoEmbedHtml }} />
              )}
            </div>
          </div>
        </section>

        {/* Spotify Embed Section */}
        {spotifyEmbedHtml && (
          <section className="mt-12 pt-8 border-t">
            <h3 className="text-2xl font-semibold mb-4">Background Audio</h3>
            <div dangerouslySetInnerHTML={{ __html: spotifyEmbedHtml }} />
          </section>
        )}
        
        {/* Affiliate Links Section - Added */}
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

        <RelatedPosts currentSlug={currentSlug} currentCategory={categoryName} />
      </article>
      <BackToTopButton />
    </div>
  );
} 