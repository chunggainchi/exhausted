import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Secret Playhouse | Puzzle | Exhausted Rocket',
  description: 'Build a big foam cube with a real swing-open door and privacy window. This Secret Playhouse is quick to build, fun to use, and perfect for solo or two-kid play. Includes step-by-step photo guide.',
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

export default function SecretPlayhousePage() {
  const categoryName = "Puzzle";
  const categoryHref = "/blog/category/puzzle";
  const postTitle = "Secret Playhouse";
  const postSubtitle = "(with a real swing-open door + privacy window)";
  const imageUrl = "/images/blog/playhouse.webp";
  const imageAlt = "Secret Playhouse made of colorful puzzle mats with a swing-open door and privacy window";

  const affiliateLinks: AffiliateLink[] = [
    {
      href: "https://amzn.to/4d91cez",
      text: "Puzzle Play Mats",
      description: "(I started with 4 packs which has been enough for all the builds shown here. Of course, more mats = more building possibilities!)"
    }
  ];

  const galleryImages: GalleryImage[] = [
    { src: '/images/blog/playhouse-1.webp', alt: 'Secret Playhouse build step 1', caption: 'Step 1 - this is the floor piece: start with a 3x2 long rectangle', objectPosition: 'center' },
    { src: '/images/blog/playhouse-2.webp', alt: 'Secret Playhouse build step 2', caption: 'Step 2 - add a 2x2 square on the top of it', objectPosition: 'center' },
    { src: '/images/blog/playhouse-3.webp', alt: 'Secret Playhouse build step 3', caption: 'Step 3 - this is the back plane: add another 3x2 long rectangle on the right side', objectPosition: 'center' },
    { src: '/images/blog/playhouse-4.webp', alt: 'Secret Playhouse build step 4', caption: 'Step 4 - stand these two pieces up to stabilize each other', objectPosition: 'center' },
    { src: '/images/blog/playhouse-5.webp', alt: 'Secret Playhouse build step 5', caption: 'Step 5 - add another 2x2 square on the bottom and stand it up too', objectPosition: 'center' },
    { src: '/images/blog/playhouse-6.webp', alt: 'Secret Playhouse build step 6', caption: 'Step 6 - now add a 2x1 long piece to the left side of the front and stand it up', objectPosition: 'center' },
    { src: '/images/blog/playhouse-7.webp', alt: 'Secret Playhouse build step 7', caption: 'Step 7 - add another 2x1 long piece on the right side of the front and stand it up too', objectPosition: 'center' },
    { src: '/images/blog/playhouse-8.webp', alt: 'Secret Playhouse build step 8', caption: 'Step 8 - add a 1x2 piece in an additional row at the top corner', objectPosition: 'center' },
    { src: '/images/blog/playhouse-9.webp', alt: 'Secret Playhouse build step 9', caption: 'Step 9 - use that corner piece as base structure to expand an extra row to the other corner as well', objectPosition: 'center' },
    { src: '/images/blog/playhouse-10.webp', alt: 'Secret Playhouse build step 10', caption: 'Step 10 - make sure that the front side also is now expanded to 3 rows high', objectPosition: 'center' },
    { src: '/images/blog/playhouse-11.webp', alt: 'Secret Playhouse build step 11', caption: 'Step 11 - add a 2x3 ceiling on top to close up the house and close the 3rd row to form the door', objectPosition: 'center' },
    { src: '/images/blog/playhouse-12.webp', alt: 'Secret Playhouse build step 12', caption: 'Step 12 - add a 2x1 long piece as a swing-open door', objectPosition: 'center' },
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
            <p className="lead">
              Build a big foam cube, hinge one mat for the door, and hand over the keys. Kids can swing the whole door open for grand entrances or latch the bottom half shut and leave a single square &ldquo;service window&rdquo; for top-secret deliveries. Two occupants fit if they don&apos;t mind elbows; one child plus pillows and an art stash fits perfectly. Door closed, creativity closed-door-session engaged.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-2">Details:</h3>
            <ul>
              <li><strong>Estimated build time:</strong> ≈ 8 – 10 mins</li>
              <li><strong>Mats needed:</strong> ≈ 40 pcs</li>
              <li><strong>Difficulty:</strong> Easy</li>
            </ul>
            <h3 className="text-xl font-semibold mt-6 mb-2">Perks</h3>
            <ul>
              <li>Full-size door that clicks shut — or half-shut for a peek-a-boo window</li>
              <li>Floor space for solo tinkering or a two-kid summit</li>
              <li>Quick to build, quicker to flatten when today&apos;s classified project wraps up</li>
            </ul>
          </div>

          {/* Image Section */}
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg shadow-lg md:col-span-1 order-1 md:order-2">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
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
                className={`block group ${img.itemClassName || ''}`}>
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded shadow">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw" // Adjusted sizes for portrait gallery
                    style={{ objectPosition: img.objectPosition || 'center' }}
                  />
                </div>
                <span className="block mt-1 text-xs text-center text-muted-foreground">{img.caption}</span>
              </a>
            ))}
          </div>
        </section>

        {/* Affiliate Links Section */}
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
      </article>
    </div>
  );
} 