import { notFound } from 'next/navigation';

// Remove the separate BlogPostPageProps interface
// interface BlogPostPageProps {
//   params: {
//     slug: string;
//   };
// }

// Dummy function to simulate fetching post data
// Replace this with actual data fetching logic later
async function getPostBySlug(slug: string) {
  // In a real app, you would fetch this from a CMS, database, or markdown files
  // For now, let's assume any slug is valid for demonstration
  if (slug === "example-post") {
    return {
      title: "Example Post Title",
      content: "This is the content of the example post.",
      date: "2024-01-01",
    };
  }
  // Return null or throw an error if the post is not found
  // notFound(); // Call this if the post doesn't exist
  return {
    title: `Post: ${slug}`,
    content: `Content for ${slug} will be here.`,
    date: new Date().toISOString().split('T')[0],
  }
}

// Add _searchParams to the props definition to indicate it's unused
export default async function BlogPostPage({
  params,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _searchParams,
}: {
  params: { slug: string };
  _searchParams?: { [key: string]: string | string[] | undefined }; // Renamed here as well
}) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound(); // This will render the not-found.tsx page if you have one
  }

  return (
    <article className="prose lg:prose-xl dark:prose-invert mx-auto py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          {post.title}
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Published on {new Date(post.date).toLocaleDateString()}
        </p>
      </header>
      {/* This is where the markdown content would be rendered */}
      <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
      {/* Or using a Markdown renderer component */}
      {/* <ReactMarkdown>{post.content}</ReactMarkdown> */}
    </article>
  );
}

// Optional: Generate static paths if you know all slugs at build time
// export async function generateStaticParams() {
//   // Fetch all post slugs
//   // const posts = await getAllPostSlugs(); 
//   // return posts.map((post) => ({ slug: post.slug }));
//   return [{ slug: 'example-post' }];
// } 