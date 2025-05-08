export interface BlogPostMeta {
  slug: string; // e.g., '/blog/puzzle/bowling-lane'
  title: string;
  category: string; // e.g., 'Puzzle'
  image?: string; // e.g., '/images/blog/bowling.webp'
  description?: string; // Short description for potential use in cards
}

export const allBlogPosts: BlogPostMeta[] = [
  {
    slug: '/blog/puzzle/bowling-lane',
    title: 'Bowling Lane',
    category: 'Puzzle',
    image: '/images/blog/bowling.webp',
    description: 'How to build a kid-proof, gutter-proof bowling lane out of puzzle mats.'
  },
  {
    slug: '/blog/puzzle/castle',
    title: 'Castle',
    category: 'Puzzle',
    image: '/images/blog/castle.webp',
    description: 'How to build a mini Château de Chambord-inspired castle out of puzzle mats.'
  },
  {
    slug: '/blog/puzzle/doghouse-hideout',
    title: 'Doghouse Hideout',
    category: 'Puzzle',
    image: '/images/blog/doghouse.webp',
    description: 'How to build a Snoopy-style Doghouse Hideout out of puzzle mats.'
  },
  {
    slug: '/blog/puzzle/great-wall-crawl',
    title: 'Great Wall Crawl',
    category: 'Puzzle',
    image: '/images/blog/greatwall.webp',
    description: 'How to build a Great Wall Crawl (watch-tower edition) out of puzzle mats.'
  },
  {
    slug: '/blog/puzzle/stair-tower',
    title: 'Stair-Tower',
    category: 'Puzzle',
    image: '/images/blog/stairtower.webp',
    description: 'A colourful cube \'stair-tower\' puzzle mat castle, perfect for little ones to explore. Learn how to build this easy fort.'
  },
  {
    slug: '/blog/puzzle/sunshine-cube',
    title: 'Sunshine Cube',
    category: 'Puzzle',
    image: '/images/blog/Cube.webp',
    description: 'How to build a Sunshine Cube with a window out of puzzle mats.'
  },
  {
    slug: '/blog/puzzle/twin-towers',
    title: 'Twin Towers',
    category: 'Puzzle',
    image: '/images/blog/twin-towers.webp',
    description: 'How to build Twin Towers out of puzzle mats - a fun activity for kids.'
  },
  {
    slug: '/blog/computer/number-playground',
    title: 'Number Playground',
    category: 'Computer',
    image: '/images/blog/numbers.webp',
    description: 'A tribute to Numberblocks: a one-evening project to create an interactive number playground for a three-year-old.'
  },
  {
    slug: '/blog/computer/toddler-types',
    title: 'Toddler Types!',
    category: 'Computer',
    image: '/images/blog/typing.webp',
    description: 'A simple, no-pressure typing game for young children, built with plain HTML/CSS/JS.'
  },
  {
    slug: '/blog/anatomy/kinetic-sand-surgery',
    title: 'Kinetic-Sand Surgery',
    category: 'Anatomy',
    image: '/images/blog/surgery.webp',
    description: 'A fun and educational sensory activity where kids perform "surgery" on kinetic sand to find plastic organs, learning about anatomy in a hands-on way.'
  },
  {
    slug: '/blog/crafts/diy-chibi-keychain',
    title: 'DIY Chibi Keychain',
    category: 'Crafts',
    image: '/images/blog/keychainmock.webp',
    description: 'Bringing AI art off-screen and onto zippers with a DIY Chibi Keychain.'
  }
];

// Helper function to get posts by category, excluding the current one
export function getRelatedPosts(currentSlug: string, currentCategory: string, count: number = 3): BlogPostMeta[] {
  return allBlogPosts
    .filter(post => post.category === currentCategory && post.slug !== currentSlug)
    .slice(0, count);
} 