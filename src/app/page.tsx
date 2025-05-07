import CategoryTiles from "@/components/CategoryTiles";
import Image from "next/image";
import Link from 'next/link';

export default function HomePage() {
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
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-8 sm:mb-12">
            Quick simple fun to occupy your toddler:
          </h2>
          <div className="flex flex-col sm:flex-row justify-center items-stretch gap-6 sm:gap-8">
            {/* Tile 1: Toddler Types */}
            <Link
              href="/games/toddler-types.html"
              className="block w-full sm:max-w-sm rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out bg-card group"
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
              className="block w-full sm:max-w-sm rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out bg-card group"
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
          </div>
        </div>
      </section>
    </div>
  );
}
