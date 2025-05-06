import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI | Exhausted Rocket',
  description: 'Posts related to AI on Exhausted Rocket.',
};

export default function AiCategoryPage() {
  const categoryName = "AI";
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold">{categoryName}</h1>
      </header>

      <div className="text-center text-muted-foreground">
        <p>No posts yet in {categoryName}.</p>
        <p>Check back soon!</p>
        {/* Placeholder for future post grid */}
      </div>
    </div>
  );
} 