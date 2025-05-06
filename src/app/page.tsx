import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold">Welcome to Exhausted Rocket</h1>
        <p className="text-xl text-muted-foreground mt-2">
          Exploring play idea hacks and detailed content.
        </p>
      </header>

      <section>
        <h2 className="text-3xl font-semibold mb-6">Latest Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Blog post previews will go here */}
          <p className="col-span-full text-center text-muted-foreground">
            No posts yet. Check back soon!
          </p>
        </div>
        <div className="text-center mt-8">
          <Button variant="outline">Test Shadcn Button</Button>
        </div>
      </section>

      {/* Placeholder for category sections if needed directly on homepage */}
      {/* <section className="mt-12">
        <h2 className="text-3xl font-semibold mb-6">Categories</h2>
        <div>// Category links or previews here</div>
      </section> */}
    </div>
  );
}
