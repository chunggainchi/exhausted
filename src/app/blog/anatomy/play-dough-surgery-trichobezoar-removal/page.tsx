import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import RelatedPosts from '@/components/RelatedPosts';
import BackToTopButton from '@/components/BackToTopButton';

export const metadata: Metadata = {
  title: 'Play-Dough Surgery: Trichobezoar Removal | Anatomy | Exhausted Rocket',
  description: 'Learn how to perform a play-dough surgery to remove a trichobezoar (hairball) from a model stomach. A fun, hands-on anatomy lesson for kids inspired by real OR footage.',
};

// Added AffiliateLink Interface
interface AffiliateLink {
  href: string;
  text: string;
  description?: string;
}

export default function PlayDoughSurgeryPage() {
  const categoryName = "Anatomy";
  const categoryHref = "/blog/category/anatomy";
  const postTitle = "Play-Dough Surgery: Trichobezoar Removal";
  const postSubtitle = "(inspired by real OR footage and the Breakfasteur)";
  const imageUrl = "/images/blog/stomach.webp"; // This is a portrait image
  const imageAlt = "Play-dough stomach with a trichobezoar (hairball) visible inside";
  const currentSlug = "/blog/anatomy/play-dough-surgery-trichobezoar-removal";

  const galleryImages = [
    { src: "/images/blog/organ setup.webp", alt: "Play-dough organs setup for surgery: liver, stomach, gallbladder, intestines" },
    { src: "/images/blog/skin.webp", alt: "Layer of orange play-dough representing skin over the organs" },
    { src: "/images/blog/Cut.webp", alt: "Plastic scalpel making an incision in the play-dough skin" },
    { src: "/images/blog/Removinghair.webp", alt: "Tweezers removing a thread hairball from the play-dough stomach" },
    { src: "/images/blog/closedagain.webp", alt: "Play-dough stomach and skin closed after surgery" },
  ];

  const realLifeInspirationVideoEmbedHtml1 = `<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; height: auto;"><iframe src="https://www.youtube.com/embed/qpu3pM9nh7E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>`;
  const breakfasteurPlaydoughVideoEmbedHtml = `<div style="position: relative; padding-bottom: 177.78%; /* Adjusted for 9:16 Shorts aspect ratio */ height: 0; overflow: hidden; max-width: 100%; max-width: 320px; /* Optional: constrain max width for shorts */ margin: 0 auto;"><iframe src="https://www.youtube.com/embed/arjiyEiprQY" title="The Breakfasteur Play-Dough Surgery Inspiration" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>`;

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
          {postSubtitle && <p className="text-xl sm:text-2xl text-muted-foreground">{postSubtitle}</p>}
        </header>

        {/* Main Content & Image Wrapper */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Content Section */}
          <div className="prose dark:prose-invert max-w-none md:col-span-1 order-2 md:order-1">
            <p className="lead mb-4">
              A trichobezoar is a giant hair-ball that people sometimes swallow strand by strand. Hair can&apos;t be digested, so it collects in the stomach, blocks food from moving on, and causes serious belly pain until a surgeon opens the stomach and lifts the wad out.
            </p>
            <p>
              Today&apos;s make-believe operation lets kids:
            </p>
            <ol className="list-decimal list-inside space-y-1 mb-4">
              <li>Locate the stomach in a play-dough body.</li>
              <li>See why &ldquo;food&rdquo; that isn&apos;t really food (hair, beads, Lego heads…) gets stuck there.</li>
              <li>Practise a careful cut-and-remove procedure, then stitch everything closed.</li>
            </ol>

            <h3 className="text-xl font-semibold mt-6 mb-2">Set-up (≈ 15 min)</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Item</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Color / Description</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">Play-dough organs</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">Liver (brown); Stomach (red); Gallbladder (green); Large intestine (lavender horseshoe); Small intestine (pink coils)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">Layer of skin</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">Flat sheet of dough of any skin color</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">Hair-ball</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">Small bundle of black sewing thread wrapped in dough</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">Instruments</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">Plastic scalpel or Play-Doh knife; kid chopsticks or tweezers; plastic needle for sutures</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">Baking tray &amp; foil</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">Operating table</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-2">Procedure 🎬</h3>
            <ol className="list-decimal list-inside space-y-1 mb-4">
              <li>Scrub in &amp; drape. Gloves on, masks optional drama.</li>
              <li>Incise the skin. Make a straight cut through the orange layer. Peel it back to reveal the organs.</li>
              <li>Identify the stomach. It&apos;s the red pouch hiding just under the liver.</li>
              <li>Gastrotomy. Slice a small opening in the front wall of the stomach.</li>
              <li>Extract the trichobezoar. Use chopsticks/tweezers to grip the black hair-ball and lift it out in one piece.</li>
              <li>Close the stomach. Pinch the red edges together or &ldquo;stitch&rdquo; with the plastic needle.</li>
              <li>Close the skin. Lay the orange flap back and smooth the cut line.</li>
              <li>Post-op check. Palpate the belly: no more hard lump, no more &ldquo;ouch&rdquo; — patient saved!</li>
            </ol>
            
            <h3 className="text-xl font-semibold mt-6 mb-2">What kids learn</h3>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>Anatomy 101 — stomach location &amp; job (collect, churn, send food on), liver neighbour, intestine pathways.</li>
              <li>Why we don&apos;t eat hair / coins / mystery objects — they don&apos;t break down, they block and hurt.</li>
              <li>Problem–solution thinking — find root cause, remove it, repair tissue.</li>
              <li>Fine-motor control — precise cuts, gentle tweezer work, careful &ldquo;suturing.&rdquo;</li>
            </ul>

            <p className="mt-6">
              Wrap up by holding the extracted hair-ball and announcing, &ldquo;This is why we only chew food!&rdquo; Then pop the patient in recovery (a cookie sheet ICU) while the junior surgeon basks in applause — and maybe goes to wash those pretend hands for real snacks.
            </p>
          </div>

          {/* Image Section - Adjusted for Portrait */}
          <div className="relative w-full md:h-[70vh] min-h-[400px] overflow-hidden rounded-lg md:col-span-1 order-1 md:order-2">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-contain" // Changed from object-cover
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Additional Images Gallery */}
        {galleryImages.length > 0 && (
          <section className="mt-12">
            <h3 className="text-2xl font-semibold mb-6">Step-by-Step Procedure Photos</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {galleryImages.map((img) => (
                <a 
                  key={img.src}
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
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                    />
                  </div>
                   <p className="mt-2 text-xs text-center text-muted-foreground">{img.alt}</p>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* YouTube Inspiration Videos Section - MODIFIED */}
        <section className="mt-12 pt-8 border-t">
          <h3 className="text-2xl font-semibold mb-6 text-center">Inspiration</h3> {/* Kept original section title */}
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h4 className="text-lg font-semibold mb-2 text-center">Real-Life Footage:</h4> {/* Adjusted subtitle slightly for clarity */}
              {realLifeInspirationVideoEmbedHtml1 && (
                <div className="aspect-video" dangerouslySetInnerHTML={{ __html: realLifeInspirationVideoEmbedHtml1 }} />
              )}
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2 text-center">The Breakfasteur&apos;s Play-Dough Version:</h4>
              {breakfasteurPlaydoughVideoEmbedHtml && (
                // For the YouTube Short, we might want to keep its original styling if aspect-video is too wide.
                // For now, applying aspect-video for consistency as discussed.
                // If the Short looks too wide, this can be reverted to max-w-xs mx-auto and the specific padding-bottom for Shorts.
                <div className="aspect-video" dangerouslySetInnerHTML={{ __html: breakfasteurPlaydoughVideoEmbedHtml }} />
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
          </section>
        )}

        {/* Related Posts Section */}
        <RelatedPosts currentSlug={currentSlug} currentCategory={categoryName} />

      </article>
      <BackToTopButton />
    </div>
  );
}
