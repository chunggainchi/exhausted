import { Metadata } from 'next';
import CategoryTiles from '@/components/CategoryTiles';

export const metadata: Metadata = {
  title: 'Blog Categories | Exhausted Rocket',
  description: 'Browse blog categories on Exhausted Rocket.',
};

export default function BlogIndexPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold">Blog Categories</h1>
        <p className="text-xl text-muted-foreground mt-2">
          Explore posts by category.
        </p>
      </header>

      {/* Render the category tiles component */}
      <CategoryTiles />

    </div>
  );
} 