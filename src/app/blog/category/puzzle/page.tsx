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
  {
    title: "Castle",
    subtitle: "(think mini Château de Chambord—big blocky keep, two pointy roofs, a little gatehouse off the side)",
    description: "Two linked cubes form a chunky 'keep'; snap two mats on top at right angles for the twin pitched roofs, then hinge one extra mat to the side as a gate-ramp. Toddlers crawl in, pop up under a roof, duck out the gate, repeat—non-stop squat-crawl-stand cardio that burns energy fast.",
    imageUrl: "/images/blog/castle.webp", // <<< PLEASE PROVIDE ACTUAL IMAGE PATH for Castle
    href: "/blog/puzzle/castle",
    imageAlt: "Castle made of colorful puzzle mats"
  },
  {
    title: "Doghouse Hideout",
    subtitle: "(Snoopy-style, but rainbow)",
    description: "One tall, hollow cube topped with a simple pitched roof. A single doorway at floor level lets kids crawl in, stand up, peek out, squat, and crawl back—a cozy hide-and-seek spot that sneaks in a bit of squatting.",
    imageUrl: "/images/blog/doghouse.webp", // <<< PLEASE PROVIDE ACTUAL IMAGE PATH
    href: "/blog/puzzle/doghouse-hideout",
    imageAlt: "Doghouse Hideout made of colorful puzzle mats"
  },
  {
    title: "Great Wall Crawl",
    subtitle: "(watch-tower edition)",
    description: "A long, low tunnel ('the wall') leads to a central cube tower where kids can stand up, peek out, then duck back down and keep crawling. Add or remove layers on the tower to dial the squat-workout up or down—instant leg-day for toddlers.",
    imageUrl: "/images/blog/greatwall.webp",
    href: "/blog/puzzle/great-wall-crawl",
    imageAlt: "Great Wall Crawl made of colorful puzzle mats"
  },
  {
    title: "Sunshine Cube",
    subtitle: "(tiny-house vibes)",
    description: "A single tall box with a sun-window cut-out turns plain foam mats into a cozy micro-home. Toddlers can crawl in, sit upright, wave through the window, and chill—minimal effort for you, maximum \"I have my own place\" pride for them.",
    imageUrl: "/images/blog/Cube.webp",
    href: "/blog/puzzle/sunshine-cube",
    imageAlt: "Sunshine Cube made of colorful puzzle mats"
  },
  {
    title: "Bowling Lane",
    subtitle: "(kid-proof, gutter-proof)",
    description: "A low rectangular \"alley\" with 3-tile-high bumpers keeps the ball on track while six recycled bottles wait to be knocked down in the middle. Roll, crash, reset—repeat for endless giggles and hand-eye workout.",
    imageUrl: "/images/blog/bowling.webp",
    href: "/blog/puzzle/bowling-lane",
    imageAlt: "Bowling Lane made of colorful puzzle mats"
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
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
        I grew up building playhouses and structures with my two little sisters using puzzle mats, and I absolutely loved it! These simple toys are so versatile and timeless, sparking imaginative play that&apos;s physically engaging, even indoors. I can only imagine the epic creations we could make with a garden, combining them with cardboard structures!
        </p>
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