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

export const metadata: Metadata = {
  title: 'AI | Exhausted Rocket',
  description: 'Posts related to AI topics on Exhausted Rocket.',
};

export default function AiCategoryPage() {
  const currentSlug = "ai";
  const categoryName = "AI";
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
        <h1 className="text-4xl font-bold">{categoryName}</h1>
      </header>

      <div className="text-center text-muted-foreground">
        <p>New posts coming tomorrow!</p>
       {/* Placeholder for future post grid */}
      </div>
    </div>
  );
} 