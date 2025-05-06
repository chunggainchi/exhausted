import { Metadata } from "next";

// Bypass type checking with 'any'
export default function Page({ params }: any) {
  return (
    <div className="container mx-auto px-4 py-8">
      <article className="prose lg:prose-xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Post: {params.slug}</h1>
        <p>This is a simple page for testing the build.</p>
      </article>
    </div>
  );
}

// Optional metadata generation
export function generateMetadata({ params }: any): Metadata {
  return {
    title: `Post: ${params.slug}`,
    description: `Blog post about ${params.slug}`,
  };
} 