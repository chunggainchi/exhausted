import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import RelatedPosts from '@/components/RelatedPosts';
import BackToTopButton from '@/components/BackToTopButton';

export const metadata: Metadata = {
    title: 'Sudoku (for small geniuses) | Computer | Exhausted Rocket',
    description: 'A colorful, child-friendly Sudoku game with 3 difficulty levels, fun sounds, and a confetti reward.',
};

export default function SudokuPostPage() {
    const categoryName = "Computer";
    const categoryHref = "/blog/category/computer";
    const postTitle = 'Sudoku';
    const postSubtitle = '(for small geniuses)';
    const currentSlug = '/blog/computer/sudoku';

    // Preview image
    const imageUrl = '/images/blog/sudoku.png';

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
                            Sudoku is fantastic brain training, but the classic 9x9 grids are often too overwhelming for small children. That&apos;s why I built a child-friendly version that gently introduces them to the world of logic puzzles.
                        </p>
                        <p className="mt-4">
                            I wanted something that is immediately fun without having to explain complicated rules. Just tap, pick a number, and get feedback.
                        </p>

                        <h3 className="text-xl font-semibold mt-8 mb-4">What&apos;s inside?</h3>
                        <ul>
                            <li><strong>3 Levels:</strong> Tiny (3x3), Mini (4x4), and Big (5x5).</li>
                            <li><strong>Child-friendly Design:</strong> Big numbers, fixed colors, and fun animations.</li>
                            <li><strong>Immediate Feedback:</strong> Wrong numbers shake, right numbers go &quot;Ding!&quot;.</li>
                            <li><strong>Reward:</strong> A confetti shower celebrates every solved puzzle.</li>
                        </ul>

                        <p className="mt-4">
                            The game runs directly in the browser, perfect for a quick session on the iPad or phone.
                        </p>

                        <p className="mt-4 mb-4">
                            👉 Play it here: <Link href="/sudoku" className="text-blue-600 dark:text-blue-500 hover:underline">Sudoku for small geniuses</Link>
                            <br />
                            👉 For those who prefers paper, I made a generator that you can use to generate and print out baby sudokus: <Link href="/sudokugenerator" className="text-blue-600 dark:text-blue-500 hover:underline">Tiny Sudoku generator</Link>
                        </p>

                        <h3 className="text-xl font-semibold mt-8 mb-2">Details</h3>
                        <ul>
                            <li><strong>Stack:</strong> Next.js, Tailwind CSS, Web Audio API</li>
                            <li><strong>Special Feature:</strong> No external sound files – all sounds are synthesized live!</li>
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
