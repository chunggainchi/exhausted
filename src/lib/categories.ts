export interface Category {
  title: string;
  imageUrl: string; // Path relative to /public
  href: string;
  slug: string; // Add slug for filtering
}

export const categories: Category[] = [
  {
    title: 'Computer',
    imageUrl: '/images/categories/computer routing.webp',
    href: '/blog/category/computer',
    slug: 'computer',
  },
  {
    title: 'Crafts',
    imageUrl: '/images/categories/crafts routing.webp',
    href: '/blog/category/crafts',
    slug: 'crafts',
  },
  {
    title: 'Anatomy',
    imageUrl: '/images/categories/anatomy routing.webp',
    href: '/blog/category/anatomy',
    slug: 'anatomy',
  },
  {
    title: 'AI',
    imageUrl: '/images/categories/ai routing.webp',
    href: '/blog/category/ai',
    slug: 'ai',
  },
  {
    title: 'Puzzle',
    imageUrl: '/images/categories/puzzle routing.webp',
    href: '/blog/category/puzzle',
    slug: 'puzzle',
  },
]; 