import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Twin Towers (Petronas-inspired) | Puzzle | Exhausted Rocket', // Updated category in title
  description: 'How to build Twin Towers out of puzzle mats - a fun activity for kids.',
};

export default function TwinTowersPostPage() {
  const categoryName = "Puzzle"; // Updated category name
  const categoryHref = "/blog/category/puzzle"; // Updated category href
  const postTitle = "Twin Towers";
  const postSubtitle = "(Petronas-inspired)";

  // Placeholder - replace with actual image path
  const imageUrl = "/images/blog/twin-towers.webp"; // <<< PLEASE PROVIDE ACTUAL IMAGE PATH

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
              Two tall, hollow cubes connected by one row of mats create a crawl-through tunnel between them. Kids can crawl in one tower, stand up, duck under the link, and pop out the other side - a mini cardio workout that burns off serious energy 🥳
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-2">Details:</h3>
            <ul>
              <li><strong>Estimated build time:</strong> ≈10-15 mins</li>
              <li><strong>Mats needed:</strong> ≈30 pcs</li>
              <li><strong>Difficulty:</strong> Medium</li>
            </ul>
          </div>

          {/* Image Section */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-lg md:col-span-1 order-1 md:order-2">
            <Image
              src={imageUrl} // <<< UPDATE THIS WITH ACTUAL PATH
              alt={`Image for ${postTitle}`}
              fill
              className="object-cover"
              // If using external images or need unoptimized, add: unoptimized
            />
          </div>
        </div>

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
        </section>
      </article>
    </div>
  );
} 