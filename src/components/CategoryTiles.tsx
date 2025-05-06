import Link from 'next/link';
import Image from 'next/image'; // Use Next.js Image for optimization
import { ArrowRight } from 'lucide-react'; // Import the arrow icon

interface Category {
  title: string;
  imageUrl: string; // Path relative to /public
  href: string;
}

// Placeholder data - Updated to .webp extension and added fifth category
const categories: Category[] = [
  {
    title: 'Computer',
    imageUrl: '/images/categories/computer routing.webp', // Changed extension
    href: '/blog/category/computer', // Example route
  },
  {
    title: 'Crafts',
    imageUrl: '/images/categories/crafts routing.webp', // Changed extension
    href: '/blog/category/crafts',
  },
  {
    title: 'Anatomy',
    imageUrl: '/images/categories/anatomy routing.webp', // Changed extension
    href: '/blog/category/anatomy',
  },
  {
    title: 'AI',
    imageUrl: '/images/categories/ai routing.webp', // Changed extension
    href: '/blog/category/ai',
  },
  {
    title: 'Puzzle', // Add your fifth category title
    imageUrl: '/images/categories/puzzle routing.webp', // Add your fifth image path
    href: '/blog/category/puzzle', // Add your fifth category route
  },
];

export default function CategoryTiles() {
  return (
    <section className="my-12 w-full">
      {/* Updated grid columns: 2 on mobile, 5 on large */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
        {categories.map((category) => (
          <Link href={category.href} key={category.title} className="group block relative overflow-hidden rounded-lg shadow-md aspect-square">
            {/* Background Image */}
            <Image
              src={category.imageUrl}
              alt={`Category: ${category.title}`}
              fill 
              // Adjusted sizes based on new grid layout (2 or 5 columns)
              sizes="(max-width: 1024px) 50vw, 20vw" 
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