import CategoryTiles from "@/components/CategoryTiles";
import Image from "next/image";
import Link from 'next/link';
import AboutSection from '@/components/AboutSection';
import { allBlogPosts } from '@/lib/blogData';

export default function HomePage() {
  // Find the specific blog posts by slug
  const kineticSandPost = allBlogPosts.find(post => post.slug === '/blog/anatomy/kinetic-sand-surgery');
  // As Flying Car is new, we'll define its details directly if not found, assuming it will be added to blogData.ts soon
  let flyingCarPost = allBlogPosts.find(post => post.slug === '/blog/puzzle/flying-car');
  if (!flyingCarPost) {
    flyingCarPost = {
      slug: '/blog/puzzle/flying-car',
      title: 'Flying Car Build',
      category: 'Puzzle',
      image: '/images/blog/flyingcar.webp',
      description: 'Foam-mat flying car with detachable wings.' // Placeholder description
    };
  }
  const twinTowersPost = allBlogPosts.find(post => post.slug === '/blog/puzzle/twin-towers');

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      <section className="my-8 w-full flex justify-center">
        <Image
          src="/images/hero/er.webp"
          alt="Tired mom with coffee"
          width={300}
          height={300}
          className="mx-auto max-w-xs sm:max-w-sm md:max-w-md"
        />
      </section>

      <header className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold">
          Welcome to my library of
          <br />
          <span className="text-slate-300 dark:text-slate-500 line-through">tired</span> tried ideas
        </h1>
      </header>

      <CategoryTiles />

      {/* Placeholder for category sections if needed directly on homepage */}
      {/* <section className="mt-12">
        <h2 className="text-3xl font-semibold mb-6">Categories</h2>
        <div>// Category links or previews here</div>
      </section> */}

      {/* Game Shortcuts Section */}
      <section className="py-12 sm:py-16 w-full">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-light text-slate-600 tracking-tight text-center mb-8 sm:mb-12">
            Quick simple fun to occupy your toddler:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8 justify-center">
            {/* Tile 1: Toddler Types */}
            <Link
              href="/games/toddler-types.html"
              className="block w-full rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out bg-card group"
            >
              <div className="relative aspect-video">
                <Image
                  src="/images/blog/typing.webp"
                  alt="Toddler Types Game Screenshot"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  unoptimized={true} // Added for static export if not globally configured
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-card-foreground text-center">
                  Toddler Types
                </h3>
              </div>
            </Link>

            {/* Tile 2: Number Playground */}
            <Link
              href="https://vps.heidekrueger.com/projects/numbers/"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out bg-card group"
            >
              <div className="relative aspect-video">
                <Image
                  src="/images/blog/numbers.webp"
                  alt="Number Playground Game Screenshot"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  unoptimized={true} // Added for static export if not globally configured
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-card-foreground text-center">
                  Number Playground
                </h3>
              </div>
            </Link>

            {/* Tile 3: Kinetic Sand Surgery Post */}
            {kineticSandPost && (
              <Link
                href={kineticSandPost.slug}
                className="block w-full rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out bg-card group"
              >
                <div className="relative aspect-video">
                  <Image
                    src={kineticSandPost.image || '/images/placeholder.webp'} // Fallback image
                    alt={kineticSandPost.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    unoptimized={true}
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-card-foreground text-center">
                    {kineticSandPost.title}
                  </h3>
                </div>
              </Link>
            )}

            {/* Tile 4: Flying Car Post */}
            {flyingCarPost && (
              <Link
                href={flyingCarPost.slug}
                className="block w-full rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out bg-card group"
              >
                <div className="relative aspect-video">
                  <Image
                    src={flyingCarPost.image || '/images/placeholder.webp'} // Fallback image
                    alt={flyingCarPost.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    unoptimized={true}
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-card-foreground text-center">
                    {flyingCarPost.title}
                  </h3>
                </div>
              </Link>
            )}

            {/* Tile 5: Twin Towers Post */}
            {twinTowersPost && (
              <Link
                href={twinTowersPost.slug}
                className="block w-full rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out bg-card group"
              >
                <div className="relative aspect-video">
                  <Image
                    src={twinTowersPost.image || '/images/placeholder.webp'} // Fallback image
                    alt={twinTowersPost.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    unoptimized={true}
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-card-foreground text-center">
                    {twinTowersPost.title}
                  </h3>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

    </div>
  );
}
