import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import RelatedPosts from '@/components/RelatedPosts';
import BackToTopButton from '@/components/BackToTopButton';

export const metadata: Metadata = {
    title: 'Anatomy X-Ray Game | Anatomy | Exhausted Rocket',
    description: 'A simple interactive X-Ray game to explore internal anatomy of animals and humans. Perfect for curious little minds.',
};

export default function AnatomyGamePostPage() {
    const categoryName = "Anatomy";
    const categoryHref = "/blog/category/anatomy";
    const postTitle = 'Anatomy X-Ray Game';
    const postSubtitle = '(explore what is inside)';
    const currentSlug = '/blog/anatomy/anatomy-xray-game';

    // Preview image (using the cow outer image as placeholder for now)
    const imageUrl = '/images/anatomy/cow-outer.webp';

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground flex items-center">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <ChevronRight size={16} className="mx-1" />
                <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
                <ChevronRight size={16} className="mx-1" />
                <Link href={categoryHref} className="hover:text-primary transition-colors">{categoryName}</Link>
                <ChevronRight size={16} className="mx-1" />
                <span className="font-medium text-foreground">{postTitle}</span>
            </nav>

            <article>
                {/* Post Header */}
                <header className="mb-8">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-2">{postTitle}</h1>
                    {postSubtitle && <p className="text-xl sm:text-2xl text-muted-foreground">{postSubtitle}</p>}
                </header>

                <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12">
                    {/* Content Section */}
                    <div className="prose dark:prose-invert max-w-none md:col-span-1 order-2 md:order-1">
                        <p className="lead">
                            Ever wondered what a cow looks like on the inside? Or how many bones are in your hand? This simple interactive game lets you use a "magic" X-Ray lens to see through the skin and explore the skeleton underneath.
                        </p>
                        <p className="mt-4">
                            I built this to help my daughter learn about biology and anatomy in a fun, visual way. It's designed to be simple: just choose an animal or body part, and move your mouse (or finger) to scan.
                        </p>

                        <h3 className="text-xl font-semibold mt-8 mb-4">Features</h3>
                        <ul>
                            <li><strong>Interactive X-Ray:</strong> Move the lens to reveal the skeleton.</li>
                            <li><strong>Learn Facts:</strong> Click the "Info" button to learn interesting facts (in German).</li>
                            <li><strong>Simple Controls:</strong> Works with mouse, touch, or keyboard.</li>
                        </ul>

                        <p className="mt-4 mb-4">
                            👉 Play it here: <Link href="/anatomy" className="text-blue-600 dark:text-blue-500 hover:underline">Anatomy X-Ray Game</Link>
                        </p>

                        <h3 className="text-xl font-semibold mt-8 mb-2">Details</h3>
                        <ul>
                            <li><strong>Type:</strong> Interactive Web Game</li>
                            <li><strong>Language:</strong> German (for learning reading)</li>
                            <li><strong>Platform:</strong> Desktop, Tablet, Mobile</li>
                        </ul>
                    </div>

                    {/* Image Section */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-lg md:col-span-1 order-1 md:order-2">
                        <Image
                            src={imageUrl}
                            alt={`Preview image for ${postTitle}`}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Related Posts Section */}
                <RelatedPosts currentSlug={currentSlug} currentCategory={categoryName} />
            </article>
            <BackToTopButton />
        </div>
    );
}
