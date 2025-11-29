import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import RelatedPosts from '@/components/RelatedPosts';
import BackToTopButton from '@/components/BackToTopButton';

export const metadata: Metadata = {
  title: 'ReadPlay (learn to read German on canvas) | Computer | Exhausted Rocket',
  description:
    'A calm, canvas-based early reading game for German: soundboard for phonological awareness, word lab for building words, a sight-word quiz, and short decodable stories—built so my daughter can enjoy real reading moments.',
};

export default function ReadPlayPostPage() {
  const categoryName = 'Computer';
  const categoryHref = '/blog/category/computer';
  const postTitle = 'LeseSpaß (Reading Fun)';
  const postSubtitle = '(a German reading game)';
  const currentSlug = '/blog/computer/reading-fun';

  // Preview image (place file at public/images/blog/read-play.webp)
  const imageUrl = '/images/blog/lesespass.webp';

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
          {postSubtitle && (
            <p className="text-xl sm:text-2xl text-muted-foreground">{postSubtitle}</p>
          )}
        </header>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Content Section */}
          <div className="prose dark:prose-invert max-w-none md:col-span-1 order-2 md:order-1">
            <p className="lead">
              Lately my daughter has been intensely curious about reading. Over the weekend - while we were busy booking holiday stuff - she pulled out her box of 40+ books and quietly chewed through them, cover to cover. She can’t read yet, but she studies each page, “fake reads” out loud, and seems to grasp the gist. So we figured we might as well help her unlock the basics so she can squeeze even more joy out of reading.
            </p>

            <p className="mt-4">
              I reused the structure and mechanics from the Cantonese game and built a new early-reading game focused on German. It’s designed for short, calm sessions on a laptop or an iPad - targeted, not busy. The goal: build phonological awareness, show how words fit together, strengthen sight-word recognition, and then bring it all together in tiny stories that feel like “real reading.”
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">What&apos;s inside</h3>
            <ul>
              <li>
                <strong>Soundboard:</strong> Tap letters and common phonemes to hear crisp pronunciations—foundation work for phonological awareness.
              </li>
              <li>
                <strong>Word Lab:</strong> Build words from chunks (syllables/units) to see how German words come together; playful tinkering without pressure.
              </li>
              <li>
                <strong>Quiz:</strong> A sight-word recognition game in the familiar “mouse &amp; cheese” format—fast feedback and lots of little wins
                (<em>“Mama, I got cheese!”</em>).
              </li>
              <li>
                <strong>Story Mode:</strong> Short, decodable mini-stories using only the basic word set, so she can experience a near-authentic reading moment.
              </li>
            </ul>

            <p className="mt-4">
              It runs as a single HTML file on canvas with the Web Speech API for audio. Same calm vibe as before—perfect for a focused practice session together.
            </p>

            <p className="mt-4 mb-4">
              👉 Play it here:{' '}
              <a
                href="/games/new-lesen/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-500 hover:underline"
              >
                LeseSpaß (Reading Fun)
              </a>
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-2">Details</h3>
            <ul>
              <li>
                <strong>Estimated build time:</strong> ≈ 5–6 hours (more thinking, plus German word-variation kinks)
              </li>
              <li>
                <strong>Stack:</strong> vanilla HTML5 Canvas + Web Speech API; coded in Cursor with ChatGPT&nbsp;5 and Gemini&nbsp;2.5&nbsp;Pro assisting
              </li>
              <li>
                <strong>Difficulty:</strong> Medium–High (handling variations and edge cases in German; a few TTS quirks)
              </li>
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