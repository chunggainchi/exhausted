import Link from 'next/link';
import Image from 'next/image'; // Use Next.js Image for optimization
import { ArrowRight } from 'lucide-react'; // Import the arrow icon
import { categories } from '@/lib/categories'; // Import the centralized list

// Remove the local categories constant definition
// interface Category { ... }
// const categories: Category[] = [ ... ];

export default function CategoryTiles() {
  return (
    <section className="my-12 w-full">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((category) => (
          <Link
            href={category.href}
            key={category.title}
            className="group block relative overflow-hidden rounded-[2rem] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 aspect-square"
          >
            {/* Background Image */}
            <Image
              src={category.imageUrl}
              alt={`Category: ${category.title}`}
              fill
              // Adjusted sizes based on new grid layout (2 or 4 columns)
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Gradient Overlay at the bottom */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
            {/* Text container moved to bottom */}
            <div className="absolute inset-0 flex items-end justify-center p-4 pb-6">
              <div className="flex items-center justify-center gap-2">
                <h3 className="text-white text-xl sm:text-2xl font-bold text-center drop-shadow-md">
                  {category.title}
                </h3>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-white opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
} 