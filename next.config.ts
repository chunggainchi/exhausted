import type { NextConfig } from "next";
import createMDX from '@next/mdx';

const withMDX = createMDX({
  // Add options here if needed
  extension: /\.mdx?$/,
  options: {
    // remarkPlugins: [], // Add remark plugins here
    // rehypePlugins: [], // Add rehype plugins here
    // If you use `MDXProvider`, uncomment the following line. 
    // providerImportSource: "@mdx-js/react",
  },
});

const nextConfig: NextConfig = {
  output: "export",
  // Configure pageExtensions to include md and mdx
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  // Optionally, add any other Next.js config below
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable image optimization for static export
  },
  /* other config options here */
};

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
