import Link from 'next/link';
import Image from 'next/image';
import { getRelatedPosts } from '@/lib/blogData';

interface RelatedPostsProps {
  currentSlug: string;
  currentCategory: string;
}

export default function RelatedPosts({ currentSlug, currentCategory }: RelatedPostsProps) {
  const relatedPosts = getRelatedPosts(currentSlug, currentCategory, 3); // Show up to 3 related posts

  if (relatedPosts.length === 0) {
    return null; // Don't render anything if no related posts are found
  }

  return (
    <section className="mt-12 pt-8 border-t">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Keep Reading</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {relatedPosts.map((post) => (
          <Link key={post.slug} href={post.slug} className="block group">
            <div className="bg-card border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
              {post.image && (
                <div className="relative aspect-video w-full">
                  <Image
                    src={post.image}
                    alt={`Cover image for ${post.title}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              )}
              <div className="p-4 sm:p-5 flex flex-col flex-grow">
                <h3 className="text-lg sm:text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                {post.description && (
                  <p className="text-sm text-muted-foreground mt-2 flex-grow">
                    {post.description}
                  </p>
                )}
                {/* <span className="text-sm text-primary mt-3 self-start">Read more &rarr;</span> */}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
} 