import { Metadata } from 'next';

// Define the expected props structure for a dynamic page
type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// generateStaticParams is REQUIRED for dynamic routes with "output: export"
export async function generateStaticParams() {
  // In a real app, you would fetch all your blog post slugs here
  // For example, from a CMS or by reading markdown files
  // const posts = await getAllPostSlugs(); 
  // return posts.map((post) => ({ slug: post.slug }));

  // For now, let's return an empty array or a dummy slug for testing
  // If you have DUMMY_POSTS in your blog index page, you can use those slugs:
  // return [{ slug: 'example-post-1' }, { slug: 'another-cool-topic' }];
  return []; // Start with empty if no posts are ready yet
}

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