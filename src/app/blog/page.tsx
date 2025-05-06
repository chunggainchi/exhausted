import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Dummy data for now - replace with actual post fetching logic
const DUMMY_POSTS = [
  {
    slug: "example-post-1",
    title: "My First Example Post",
    date: "2024-07-30",
    description: "This is a short description for the first example post. Click to read more!"
  },
  {
    slug: "another-cool-topic",
    title: "Another Cool Topic Explored",
    date: "2024-07-28",
    description: "Exploring another fascinating subject with some interesting insights."
  }
];

export default function BlogIndexPage() {
  // In a real app, you would fetch posts here
  const posts = DUMMY_POSTS;

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold">The Blog</h1>
        <p className="text-xl text-muted-foreground mt-2">
          All my thoughts, ideas, and project explorations.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No posts yet. Stay tuned!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card key={post.slug} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </CardTitle>
                <CardDescription>
                  Published on {new Date(post.date).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p>{post.description}</p>
              </CardContent>
              <div className="p-6 pt-0">
                <Button asChild variant="outline">
                  <Link href={`/blog/${post.slug}`}>Read More</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 