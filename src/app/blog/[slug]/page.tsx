import { Metadata } from "next";

// Use standard prop types for Next.js App Router dynamic route
type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: `Post: ${params.slug}`,
    description: `Blog post about ${params.slug}`,
  };
};

// Use non-async function and explicitly name it 'Page' per convention
export default function Page({ 
  params,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchParams 
}: Props) {
  return (
    <div className="container mx-auto px-4 py-8">
      <article className="prose lg:prose-xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Post: {params.slug}</h1>
        <p>This is a simple page for testing the build.</p>
      </article>
    </div>
  );
} 