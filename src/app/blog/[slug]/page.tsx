import { Metadata } from 'next';

// Define the expected props structure for a dynamic page
type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// generateMetadata function (optional but good practice)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // In a real app, you might fetch metadata based on the slug
  return {
    title: `Post: ${params.slug}`,
    description: `Details for blog post ${params.slug}`,
  };
}

// The Page component itself
export default function Page({ 
  params, 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchParams 
}: PageProps) {
  // For now, just display the slug. Content fetching will be added later.
  return (
    <div className="container mx-auto px-4 py-8">
      <article className="prose lg:prose-xl dark:prose-invert mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Blog Post: {params.slug}
          </h1>
        </header>
        <div>
          <p>Content for {params.slug} will be loaded here.</p>
          {/* Example of accessing searchParams if needed in the future:
          {searchParams?.someQuery && <p>Query: {searchParams.someQuery}</p>}
          */}
        </div>
      </article>
    </div>
  );
} 