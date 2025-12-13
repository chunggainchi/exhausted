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
  title: 'Computer | Exhausted Rocket',
  description: 'Posts related to Computer topics on Exhausted Rocket.',
};

// Placeholder for posts in this category
const computerPosts: BlogPostCardProps[] = [
  {
    title: "Solar System Simulation",
    subtitle: "(a realistic, calm space travel)",
    description: "A realistic 3D solar system simulation with accurate physics and time control. Perfect for explaining space to kids or just zoning out.",
    imageUrl: "/images/blog/solar-system-simulation.png",
    href: "/blog/computer/solar-system-simulation",
    imageAlt: "Solar System Simulation Interface"
  },
  {
    title: "Sudoku",
    subtitle: "(for small geniuses)",
    description: "A colorful, child-friendly Sudoku game with 3 difficulty levels, fun sounds, and a confetti reward.",
    imageUrl: "/images/blog/sudoku.png",
    href: "/blog/computer/sudoku",
    imageAlt: "Sudoku Preview"
  },
  {
    title: "CantoPlay",
    subtitle: "(learn Cantonese on canvas)",
    description: "A calm, canvas-based Cantonese practice game with flashcards, a quiz, and a gentle mini-game - built for my daughter before our HK trip.",
    imageUrl: "/images/blog/canto-play.webp",
    href: "/blog/computer/canto-play",
    imageAlt: "CantoPlay preview"
  },
  {
    title: "Number Playground",
    subtitle: "(my one-evening tribute to Numberblocks)",
    description: "A one-evening project to create an interactive number playground for a three-year-old, inspired by Numberblocks.",
    imageUrl: "/images/blog/numbers.webp",
    href: "/blog/computer/number-playground",
    imageAlt: "Number Playground"
  },
  {
    title: "Toddler Types!",
    subtitle: "(a super-chill first typing game)",
    description: "A simple, no-pressure typing game for young children, built with plain HTML/CSS/JS to practice letter and number recognition.",
    imageUrl: "/images/blog/typing.webp",
    href: "/blog/computer/toddler-types",
    imageAlt: "Toddler Types! game interface"
  },
  {
    title: "LeseSpaß (Reading Fun)",
    subtitle: "(a German reading game)",
    description: "A simple, no-pressure reading game for young children, built with plain HTML/CSS/JS to practice phonics and sight words recognition.",
    imageUrl: "/images/blog/lesespass.webp",
    href: "/blog/computer/reading-fun",
    imageAlt: "LeseSpaß Deutsch game interface"
  },
  // Add more computer posts here
];

export default function ComputerCategoryPage() {
  const currentSlug = "computer";
  const categoryName = "Computer";
  const otherCategories = categories.filter(cat => cat.slug !== currentSlug);

  return (
    <div className="container mx-auto px-4 py-8">
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
        <h1 className="text-4xl sm:text-5xl font-bold">Just Enough {categoryName} Fun</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          I&apos;ve never been a true gamer (I tried, but one of my guilty pleasures is buying tons of games and finishing none). Out of nowhere, my daughter started asking me to build her games (who even told her that was a thing?!). The clueless part of me just said, &apos;Sure!&apos; and that&apos;s how this journey began. Somehow, creating these simple games for her is way more fulfilling than playing games myself.
        </p>
      </header>


      {/* Blog Post Grid */}
      {computerPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {computerPosts.map((post) => (
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