import CategoryTiles from "@/components/CategoryTiles";
import Image from "next/image";
import Link from 'next/link';
import AboutSection from '@/components/AboutSection';
import { allBlogPosts } from '@/lib/blogData';

export default function HomePage() {
  // Define Trichobezoar Post
  let trichobezoarPost = allBlogPosts.find(post => post.slug === '/blog/anatomy/play-dough-surgery-trichobezoar-removal');
  if (!trichobezoarPost) {
    trichobezoarPost = {
      slug: '/blog/anatomy/play-dough-surgery-trichobezoar-removal',
      title: 'Play-Dough Surgery: Trichobezoar',
      category: 'Anatomy',
      image: '/images/blog/trichobezoar.webp', // PLEASE VERIFY THIS IMAGE PATH
      description: 'A Play-Dough surgery simulation for removing a trichobezoar.'
    };
  }

  // Define Basketball Arcade Post
  let basketballArcadePost = allBlogPosts.find(post => post.slug === '/blog/puzzle/basketball-arcade');
  if (!basketballArcadePost) {
    basketballArcadePost = {
      slug: '/blog/puzzle/basketball-arcade',
      title: 'Basketball Arcade',
      category: 'Puzzle',
      image: '/images/blog/basketballarcade.webp',
      description: 'DIY Basketball Arcade with a slanted ball return.'
    };
  }

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

      {/* Game Shortcuts Section - App Icon Style */}
      <section className="py-12 sm:py-16 w-full">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-light text-slate-600 tracking-tight text-center mb-8 sm:mb-12">
            Quick games:
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-7 gap-x-4 gap-y-8 sm:gap-8 max-w-6xl mx-auto">

            {/* Solar System Sim */}
            <Link
              href="/solar"
              className="flex flex-col items-center group"
            >
              <div className="relative w-28 h-28 sm:w-40 sm:h-40 mb-3 group-hover:-translate-y-1 transition-all duration-300">
                <Image
                  src="/images/shortcuts/solar-system.webp"
                  alt="Solar System Sim"
                  fill
                  className="object-contain"
                  unoptimized={true}
                />
              </div>
              <h3 className="text-sm sm:text-base font-medium text-slate-600 text-center">
                Solar System Sim
              </h3>
            </Link>

            {/* DIBH Diver */}
            <Link
              href="/dibh-diver"
              className="flex flex-col items-center group"
            >
              <div className="relative w-28 h-28 sm:w-40 sm:h-40 mb-3 group-hover:-translate-y-1 transition-all duration-300">
                <Image
                  src="/images/shortcuts/dibh-diver.webp"
                  alt="DIBH Diver"
                  fill
                  className="object-contain"
                  unoptimized={true}
                />
              </div>
              <h3 className="text-sm sm:text-base font-medium text-slate-600 text-center">
                DIBH Diver
              </h3>
            </Link>

            {/* Sudoku */}
            <Link
              href="/sudoku"
              className="flex flex-col items-center group"
            >
              <div className="relative w-28 h-28 sm:w-40 sm:h-40 mb-3 group-hover:-translate-y-1 transition-all duration-300">
                <Image
                  src="/images/shortcuts/kids-sudoku.webp"
                  alt="Sudoku for Kids"
                  fill
                  className="object-contain"
                  unoptimized={true}
                />
              </div>
              <h3 className="text-sm sm:text-base font-medium text-slate-600 text-center">
                Sudoku for Kids
              </h3>
            </Link>

            {/* Number Learning Playground */}
            <Link
              href="https://vps.heidekrueger.com/projects/numbers/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group"
            >
              <div className="relative w-28 h-28 sm:w-40 sm:h-40 mb-3 group-hover:-translate-y-1 transition-all duration-300">
                <Image
                  src="/images/shortcuts/numbers.webp"
                  alt="Number Learning Playground"
                  fill
                  className="object-contain"
                  unoptimized={true}
                />
              </div>
              <h3 className="text-sm sm:text-base font-medium text-slate-600 text-center leading-tight">
                Number Playground
              </h3>
            </Link>

            {/* CantoPlay */}
            <Link
              href="/canto-play"
              className="flex flex-col items-center group"
            >
              <div className="relative w-28 h-28 sm:w-40 sm:h-40 mb-3 group-hover:-translate-y-1 transition-all duration-300">
                <Image
                  src="/images/shortcuts/cantoplay.webp"
                  alt="CantoPlay"
                  fill
                  className="object-contain"
                  unoptimized={true}
                />
              </div>
              <h3 className="text-sm sm:text-base font-medium text-slate-600 text-center leading-tight">
                CantoPlay
              </h3>
            </Link>

            {/* LeseSpaß */}
            <Link
              href="/lese-spass"
              className="flex flex-col items-center group"
            >
              <div className="relative w-28 h-28 sm:w-40 sm:h-40 mb-3 group-hover:-translate-y-1 transition-all duration-300">
                <Image
                  src="/images/shortcuts/lesenlernen.webp"
                  alt="LeseSpaß"
                  fill
                  className="object-contain"
                  unoptimized={true}
                />
              </div>
              <h3 className="text-sm sm:text-base font-medium text-slate-600 text-center leading-tight">
                LeseSpaß
              </h3>
            </Link>
            {/* Wortzug */}
            <Link
              href="/wortzug"
              className="flex flex-col items-center group"
            >
              <div className="relative w-28 h-28 sm:w-40 sm:h-40 mb-3 group-hover:-translate-y-1 transition-all duration-300">
                <Image
                  src="/images/shortcuts/wortzug.webp"
                  alt="Wortzug"
                  fill
                  className="object-contain"
                  unoptimized={true}
                />
              </div>
              <h3 className="text-sm sm:text-base font-medium text-slate-600 text-center leading-tight">
                WortZug
              </h3>
            </Link>

            {/* Chronos */}
            <Link
              href="/chronos"
              className="flex flex-col items-center group"
            >
              <div className="relative w-28 h-28 sm:w-40 sm:h-40 mb-3 group-hover:-translate-y-1 transition-all duration-300">
                <Image
                  src="/images/shortcuts/chronos.webp"
                  alt="Chronos"
                  fill
                  className="object-contain"
                  unoptimized={true}
                />
              </div>
              <h3 className="text-sm sm:text-base font-medium text-slate-600 text-center leading-tight">
                Chronos
              </h3>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

    </div>
  );
}
