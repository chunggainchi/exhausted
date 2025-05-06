import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Define the expected structure of post metadata (frontmatter)
export interface PostMetadata {
  slug: string;
  title: string;
  date: string; // Keep as string for simpler sorting initially
  description: string;
  author: string;
  tags?: string[];
  coverImage?: string;
  // Add other frontmatter fields as needed
}

// Define the structure of a full post, including content
export interface Post extends PostMetadata {
  content: string;
}

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

export function getSortedPostsData(): PostMetadata[] {
  // Get file names under /src/content/blog
  let fileNames: string[] = [];
  try {
    fileNames = fs.readdirSync(postsDirectory);
  } catch (err) {
    // If the directory doesn't exist or is empty, return empty array
    console.warn(`Could not read posts directory: ${postsDirectory}`, err);
    return [];
  }

  const allPostsData = fileNames
    .filter(fileName => /\.mdx?$/.test(fileName)) // Ensure we only process markdown/mdx files
    .map((fileName) => {
      // Remove ".md" or ".mdx" from file name to get slug
      const slug = fileName.replace(/\.mdx?$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the slug
      return {
        slug,
        ...(matterResult.data as Omit<PostMetadata, 'slug'>),
      } as PostMetadata; // Assert the type
    });

  // Sort posts by date (descending - newest first)
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostSlugs() {
  let fileNames: string[] = [];
  try {
    fileNames = fs.readdirSync(postsDirectory);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_err) { 
    return [];
  }
  
  return fileNames
    .filter(fileName => /\.mdx?$/.test(fileName))
    .map((fileName) => {
      return {
        slug: fileName.replace(/\.mdx?$/, ''),
      };
  });
}

export function getPostData(slug: string): Post | null {
  const possibleFileNames = [`${slug}.mdx`, `${slug}.md`];
  let fullPath: string | undefined;
  let fileName: string | undefined;

  for (const name of possibleFileNames) {
    const testPath = path.join(postsDirectory, name);
    if (fs.existsSync(testPath)) {
      fullPath = testPath;
      fileName = name;
      break;
    }
  }

  if (!fullPath || !fileName) {
    return null; // Post not found
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Combine the data with the slug and content
  const postData: Post = {
    slug,
    content: matterResult.content,
    ...(matterResult.data as Omit<PostMetadata, 'slug'>),
  };

  return postData;
} 