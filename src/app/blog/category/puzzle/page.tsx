import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { categories } from '@/lib/categories';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import BlogPostCard, { BlogPostCardProps } from '@/components/BlogPostCard';

export const metadata: Metadata = {
  title: 'Puzzle | Exhausted Rocket',
  description: 'Posts related to Puzzle challenges on Exhausted Rocket.',
};

// Temporary hardcoded post data - this would eventually come from a CMS or local files
const puzzlePosts: BlogPostCardProps[] = [
  {
    title: "Twin Towers",
    subtitle: "(Petronas-inspired)",
    description: "Two tall, hollow cubes connected by one row of mats create a crawl-through tunnel between them. Kids can crawl in one tower, stand up, duck under the link, and pop out the other side - a mini cardio workout that burns off serious energy 🥳",
    imageUrl: "/images/blog/twin-towers.webp", // Ensure this path is correct
    href: "/blog/puzzle/twin-towers",
    imageAlt: "Twin Towers made of colorful puzzle mats"
  },
  // ... add more posts here as they are created
];

export default function PuzzleCategoryPage() {
  const currentSlug = "puzzle";
  const categoryName = "Puzzle";
  const otherCategories = categories.filter(cat => cat.slug !== currentSlug);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs and Category Navigation */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-stretch sm:items-center mb-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground flex items-center">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={16} className="mx-1" />
          <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <ChevronRight size={16} className="mx-1" />
          <span className="font-medium text-foreground">{categoryName}</span>
        </nav>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="w-full sm:w-auto mt-2 sm:mt-0 sm:ml-auto">
              Explore Other Categories
              <ChevronDown size={16} className="ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {otherCategories.map((category) => (
              <DropdownMenuItem key={category.slug} asChild>
                <Link href={category.href}>{category.title}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <header className="text-center mb-8 md:mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold">{categoryName} Posts</h1>
      </header>

      {/* Blog Post Grid */}
      {puzzlePosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {puzzlePosts.map((post) => (
            <BlogPostCard key={post.href} {...post} />
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground py-12">
          <p className="text-xl mb-2">No posts yet in {categoryName}.</p>
          <p>Please check back soon!</p>
        </div>
      )}
    </div>
  );
} 