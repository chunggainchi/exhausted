import CategoryTiles from "@/components/CategoryTiles";
import Image from "next/image";

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
    </div>
  );
}
