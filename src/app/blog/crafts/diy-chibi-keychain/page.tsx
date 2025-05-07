import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'DIY Chibi Keychain | Crafts | Exhausted Rocket',
  description: 'Bringing AI art off-screen and onto zippers with a DIY Chibi Keychain.',
};

export default function DIYChibiKeychainPostPage() {
  const categoryName = "Crafts";
  const categoryHref = "/blog/category/crafts";
  const postTitle = "DIY Chibi Keychain";
  const postSubtitle = "(bringing AI art off-screen and onto zippers)";

  const imageUrl = "/images/blog/keychainmock.webp"; 

  const additionalImages: Array<{ src: string; alt: string }> = [
    { src: "/images/blog/realpic.webp", alt: "DIY Chibi Keychain - real picture" },
    { src: "/images/blog/keychain.webp", alt: "DIY Chibi Keychain - actual keychain" },
    
  ];

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
        <header className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">{postTitle}</h1>
          {postSubtitle && <p className="text-xl sm:text-2xl text-muted-foreground">{postSubtitle}</p>}
        </header>

        <div className="flex flex-col md:grid md:grid-cols-3 gap-8 md:gap-12">
          {/* Content Section */}
          <div className="prose dark:prose-invert max-w-none md:col-span-2 order-2 md:order-1">
            <p className="lead">
              I&apos;ve been playing with <a href="https://eigenmodel.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-500 hover:underline">a web-app I built</a> that turns selfies into hyper-realistic AI pictures. The pictures are cool, but they were stuck in the screen - until I spotted people on Twitter showing off chibi rubber charms of themselves. 💡 Light bulb on, hands dirty.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">My one-morning workflow</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border my-6">
                <thead className="bg-muted/50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/6">Step</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider w-2/6">What I did</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider w-3/6">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="px-4 py-3 align-top font-medium">1. Generate the art</td>
                    <td className="px-4 py-3 align-top">Prompted ChatGPT-4o&apos;s image tool:<br />&quot;Create a clean product-shot of a single chibi-style rubber charm keychain, isolated on a transparent (alpha) background with no hand, chain, or clasp; the charm shows the little girl in the attached photo. The keychain has a simple built-in hanging loop centered at the top, uses bold black outlines and flat colors (no shading or drop shadows), and sits centered in the frame with plenty of empty space around it.&quot;</td>
                    <td className="px-4 py-3 align-top">Upload a photo of your child to get an instant PNG of him/her cartoonized, already sized like a charm.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top font-medium">2. Print &amp; shrink</td>
                    <td className="px-4 py-3 align-top">Printed the PNG onto ink-jet printable shrink-plastic sheet, cut it out, punched a hole.</td>
                    <td className="px-4 py-3 align-top">Bake 2 min at 165 °C → piece shrinks around 40%.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top font-medium">3. Flatten</td>
                    <td className="px-4 py-3 align-top">Pressed the hot charm under a cookbook for 2 min.</td>
                    <td className="px-4 py-3 align-top">Keeps it perfectly flat and cool for resin.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top font-medium">4. Resin dome</td>
                    <td className="px-4 py-3 align-top">Brushed a thin layer of UV resin on the front, zapped under a nail lamp; flipped and repeated on the back.</td>
                    <td className="px-4 py-3 align-top">The resin gives it that glossy charm look and makes colours pop. I used gloves and a mask for protection in this step.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top font-medium">5. Assemble</td>
                    <td className="px-4 py-3 align-top">Added a jump ring + key-chain clip.</td>
                    <td className="px-4 py-3 align-top">No extra tools besides pliers and some keychain clips. I just took some old unwanted keychain and repurposed the parts.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>Total hands-on time: ≈30 min (could properly get it down to 15 mins if more practiced).</p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Result</h3>
            <p>
              A one-of-a-kind chibi charm that now dangles proudly from her yellow rain jacket - ready for playground show-and-tell. The best part? Every time she spots it, she says, &quot;Look, it&apos;s me!&quot; and grins exactly like the drawing.
            </p>
            <p className="mt-4">
              Have AI art you love? Print, shrink, resin, repeat - your keys (or your kid&apos;s zipper) will never look the same.
            </p>
          </div>

          {/* Image Section */}
          <div className="md:col-span-1 order-1 md:order-2">
            <div className="sticky top-24"> {/* Added sticky positioning */}
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={imageUrl}
                  alt={`Image for ${postTitle}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Images Gallery (conditionally rendered) */}
        {additionalImages.length > 0 && (
          <section className="mt-12 pt-8 border-t">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Turn photo into cute charm</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {additionalImages.map((img) => (
                <Link key={img.src} href={img.src} target="_blank" rel="noopener noreferrer" className="block relative aspect-video w-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
} 