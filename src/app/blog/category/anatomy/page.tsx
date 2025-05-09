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
  title: 'Anatomy | Exhausted Rocket',
  description: 'Posts related to Anatomy on Exhausted Rocket.',
};

const anatomyPosts: BlogPostCardProps[] = [
  {
    title: "Kinetic-Sand Surgery",
    subtitle: "(tiny scrub suits, real-body wow factor)",
    description: "A fun and educational sensory activity where kids perform \"surgery\" on kinetic sand to find plastic organs, learning about anatomy in a hands-on way.",
    imageUrl: "/images/blog/surgery.webp",
    href: "/blog/anatomy/kinetic-sand-surgery",
  },
];

export default function AnatomyCategoryPage() {
  const currentSlug = "anatomy"; // Update slug
  const categoryName = "Anatomy";
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

      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold">{categoryName} Learning for Children</h1>
      </header>

      {anatomyPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {anatomyPosts.map((post) => (
            <BlogPostCard key={post.href} {...post} />
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground">
          <p>No posts in this category yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
} 