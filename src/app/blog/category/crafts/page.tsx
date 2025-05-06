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
  title: 'Crafts | Exhausted Rocket',
  description: 'Posts related to Craft projects on Exhausted Rocket.',
};

const craftsPosts: BlogPostCardProps[] = [
  {
    title: "DIY Chibi Keychain",
    subtitle: "(bringing AI art off-screen and onto zippers)",
    description: "A quick guide to turning AI-generated illustrations into tangible chibi charms using shrink plastic and UV resin.",
    imageUrl: "/images/blog/keychainmock.webp",
    href: "/blog/crafts/diy-chibi-keychain",
    imageAlt: "DIY Chibi Keychain made from AI art"
  },
  // ... add more posts here as they are created
];

export default function CraftsCategoryPage() {
  const currentSlug = "crafts";
  const categoryName = "Crafts";
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
      {craftsPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {craftsPosts.map((post) => (
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