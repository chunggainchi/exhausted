import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc'; // Import MDXRemote for server components
import { getAllPostSlugs, getPostData } from '@/lib/posts';
import { mdxComponents } from '@/mdx-components'; // Import the components object or the getter function directly

// Remove or comment out the potentially conflicting shared PageProps type
// type PageProps = {
//   params: { slug: string };
//   searchParams: { [key: string]: string | string[] | undefined };
// };

// Generate static paths for all posts at build time
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = getAllPostSlugs(); // Get all slugs [{ slug: '...' }, ...]
  // Important: Make sure the slugs array isn't empty if you expect pages
  return slugs;
}

// Generate metadata for the page - Use inline prop type
export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const post = getPostData(params.slug);
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }
  return {
    title: post.title,
    description: post.description,
    // Add other metadata like open graph tags based on post data
  };
}

// The Page component to render the post - Use inline prop type
export default async function PostPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const post = getPostData(params.slug);

  if (!post) {
    notFound(); // Trigger 404 if post doesn't exist
  }

  // Directly use the imported components
  // If you defined getMDXComponents and need to pass specific components:
  // const components = getMDXComponents({}); 
  // For now, assuming mdxComponents has all you need:
  const componentsToUse = mdxComponents;

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="prose lg:prose-xl dark:prose-invert mx-auto">
        <header className="mb-8 border-b pb-4">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
            {post.title}
          </h1>
          <p className="text-lg text-muted-foreground">
            By {post.author} on {new Date(post.date).toLocaleDateString()}
          </p>
          {/* Optionally display tags here */}
          {/* {post.tags && (
            <div className="mt-2">
              {post.tags.map(tag => <span key={tag} className="mr-2 badge">{tag}</span>)}
            </div>
          )} */} 
        </header>
        
        {/* Render the MDX content */}
        <MDXRemote 
          source={post.content} 
          components={componentsToUse} 
        />

      </article>
    </div>
  );
} 