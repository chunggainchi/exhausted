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

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Content Section */}
          <div className="prose dark:prose-invert max-w-none">
            <p className="lead">
              Two tall, hollow cubes connected by one row of mats create a crawl-through tunnel between them. Kids can crawl in one tower, stand up, duck under the link, and pop out the other side - a mini cardio workout that burns off serious energy 🥳
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-2">Details:</h3>
            <ul>
              <li><strong>Estimated build time:</strong> ≈10-15 mins</li>
              <li><strong>Mats needed:</strong> ≈30 pcs</li>
            </ul>
          </div>

          {/* Image Section */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-lg">
            <Image
              src={imageUrl} // <<< UPDATE THIS WITH ACTUAL PATH
              alt={`Image for ${postTitle}`}
              fill
              className="object-cover"
              // If using external images or need unoptimized, add: unoptimized
            />
          </div>
        </div>
      </article>
    </div>
  );
} 