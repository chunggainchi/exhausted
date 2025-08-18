import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import RelatedPosts from '@/components/RelatedPosts';
import BackToTopButton from '@/components/BackToTopButton';

export const metadata: Metadata = {
  title: 'CantoPlay (learn Cantonese on canvas) | Computer | Exhausted Rocket',
  description: 'A tiny canvas-based Cantonese practice game with flashcards, a quiz, and a gentle mouse-and-cheese mini-game - built so my daughter can pick up practical phrases before our HK trip.',
};

export default function CantoPlayPostPage() {
  const categoryName = 'Computer';
  const categoryHref = '/blog/category/computer';
  const postTitle = 'CantoPlay';
  const postSubtitle = '(learn Cantonese on canvas)';
  const currentSlug = '/blog/computer/canto-play';

  // Preview image (place file at public/images/blog/canto-play.webp)
  const imageUrl = '/images/blog/canto-play.webp';

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
              We have an upcoming trip to Hong Kong, and my daughter&apos;s still learning Cantonese. It&apos;s not her dominant language - that&apos;s German, thanks to her environment - so I wanted her to practise a handful of practical phrases before we go.
            </p>
            <p className="mt-4">
              I found out Duolingo doesn&apos;t offer Cantonese, so I made a baby version myself. I used ChatGPT&nbsp;5 to go from nothing to a rough structure, then did the bug fixing and tweaking together with Gemini&nbsp;2.5&nbsp;Pro. The modes are inspired by the OpenAI GPT‑5 announcement livestream, but getting it to a usable, acceptable state was definitely not as quick and painless as in the demo.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">What&apos;s inside</h3>
            <ul>
              <li><strong>Flashcards:</strong> Cantonese + German pairs with images; tap to hear the Cantonese pronunciation.</li>
              <li><strong>Quiz:</strong> Hear the Cantonese word and pick the matching picture. Gentle feedback, no stress.</li>
              <li><strong>Mouse &amp; Cheese mini-game:</strong> Steer a little mouse to the cheese; each bite speaks a new Cantonese word.</li>
            </ul>

            <p className="mt-4">
              It runs as a single HTML file on the canvas with the Web Speech API for audio, designed to feel calm and playful, not busy. Perfect for a quick practice session together.
            </p>

            <p className="mt-4 mb-4">
              👉 Play it here: <a href="/games/learn-cantonese.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">CantoPlay (learn Cantonese)</a>
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-2">Details</h3>
            <ul>
              <li><strong>Estimated build time:</strong> ≈ 2 late-night sessions</li>
              <li><strong>Stack:</strong> vanilla HTML5 Canvas + Web Speech API; coded in Cursor with ChatGPT&nbsp;5 and Gemini&nbsp;2.5&nbsp;Pro assisting</li>
              <li><strong>Difficulty:</strong> Medium (lots of small UX tweaks)</li>
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


