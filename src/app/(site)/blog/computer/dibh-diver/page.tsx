import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import RelatedPosts from '@/components/RelatedPosts';
import BackToTopButton from '@/components/BackToTopButton';
import { Button } from "@/components/ui/button";

// 1. Metadata Export
export const metadata: Metadata = {
  title: 'DIBH Diver | Computer | Exhausted Rocket',
  description: 'A breath-controlled obstacle game that uses your webcam and OpenCV to teach deep-inhale, hold, and exhale rhythm in a playful dive.',
};

// 2. Page Component
export default function DibhDiverPostPage() {
  // 3. Constants
  const categoryName = "Computer";
  const categoryHref = "/blog/computer";
  const postTitle = "DIBH Diver";
  const postSubtitle = "(breath-controlled obstacle dive)";
  const imageUrl = "/images/blog/dibh-diver.png";
  const imageAlt = "DIBH Diver breathing-controlled game preview";
  const currentSlug = "/blog/computer/dibh-diver";

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 4. Breadcrumbs */}
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
        {/* 5. Post Header */}
        <header className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">{postTitle}</h1>
          <p className="text-xl sm:text-2xl text-muted-foreground">{postSubtitle}</p>
        </header>

        {/* Main Content & Image Wrapper */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12">
          {/* 6. Content Section */}
          <div className="prose dark:prose-invert max-w-none md:col-span-1 order-2 md:order-1">
            <p className="lead">
              We turned deep-inspiration breath-hold drills into a game. DIBH Diver watches your chest movement through the webcam, calibrates your normal vs. deep breaths, and turns that motion into vertical control to dodge obstacles underwater.
            </p>

            <p>
              The setup walks you through aligning your torso, locking a &apos;ghost&apos; posture overlay, clicking a chest target, then capturing normal and deep calibration points. Once locked in, breathing becomes the joystick and the audio cues keep the cadence honest.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2">Features:</h3>
            <ul>
              <li><strong>Webcam + OpenCV tracking:</strong> Real-time optical flow on your chosen chest marker.</li>
              <li><strong>Guided calibration:</strong> Ghost overlay plus separate normal and deep marks so the game knows your personal range.</li>
              <li><strong>Responsive gameplay:</strong> Breathing depth moves your diver, with instant reset if you drift off target.</li>
              <li><strong>One-click launch:</strong> Everything runs in-browser with no installs. Just allow the camera and breathe.</li>
            </ul>

            <div className="mt-8">
              <Link href="/dibh-diver">
                <Button size="lg" className="w-full sm:w-auto">
                  Launch DIBH Diver Game
                </Button>
              </Link>
            </div>
          </div>

          {/* 7. Image Section */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-lg md:col-span-1 order-1 md:order-2">
            <Image
              src={imageUrl}
              alt={imageAlt}
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
