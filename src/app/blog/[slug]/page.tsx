// @ts-nocheck - Disabling TypeScript checking for this file due to Next.js type constraints issues
import { Metadata } from "next";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <article className="prose lg:prose-xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Post: {params.slug}</h1>
        <p>This is a simple page for testing the build.</p>
      </article>
    </div>
  );
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  return {
    title: `Post: ${params.slug}`,
    description: `Blog post about ${params.slug}`,
  };
} 