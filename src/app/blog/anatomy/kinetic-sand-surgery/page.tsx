import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kinetic-Sand Surgery | Anatomy | Exhausted Rocket',
  description: 'A fun and educational sensory activity where kids perform "surgery" on kinetic sand to find plastic organs, learning about anatomy in a hands-on way.',
};

interface AffiliateLink {
  href: string;
  text: string;
  description?: string; // Optional further description
}

export default function KineticSandSurgeryPostPage() {
  const categoryName = "Anatomy";
  const categoryHref = "/blog/category/anatomy";
  const postTitle = "Kinetic-Sand Surgery";
  const postSubtitle = "(tiny scrub suits, real-body wow factor)";
  const imageUrl = "/images/blog/surgery.webp";
  const imageAlt = "Child performing kinetic sand surgery with toy instruments and plastic organs.";

  // Added additionalImages array
  const additionalImages: Array<{ src: string; alt: string }> = [
    { src: "/images/blog/sandpatient.webp", alt: "Kinetic sand patient on a tray with plastic organs buried" },
    { src: "/images/blog/drequipment.webp", alt: "Toy medical equipment including stethoscope, syringe, and Play-Doh scalpel" },
  ];

  const affiliateLinks: AffiliateLink[] = [
    {
      href: "https://amzn.to/3YywTbn",
      text: "Premium Doctor Stethoscope",
      description: "(The real stethoscope I used to hear her heartbeat when pregnant. Do not ask me why I needed this. 🙈)"
    },
    {
      href: "https://amzn.to/44sJj8u",
      text: "Dentist Play Set",
      description: "(We borrowed some props from a dentist set like this.)"
    },
    {
      href: "https://amzn.to/3YxIGGM",
      text: "Kid-Size Garden Gloves",
      description: "(Couldn't find tiny surgical gloves, but these work for little hands!)"
    },
    {
      href: "https://amzn.to/4m0nbZr",
      text: "Human Anatomy Model",
      description: "(Where we got the organs for our kinetic sand patient.)"
    },
    {
      href: "https://amzn.to/4jLnIwI",
      text: "The Body Book (in German)",
      description: "This is an amazing book i found on the streets, it has a lot of foldouts and is super informative 🔥"
    }, 
    {
      href: "https://amzn.to/3Sp07Wp",
      text: "Neck Reading Light",
      description: "(I used this normally to read, but it's also great for the kids)"
    }
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
        {/* Post Header */}
        <header className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">{postTitle}</h1>
          {postSubtitle && <p className="text-xl sm:text-2xl text-muted-foreground">{postSubtitle}</p>}
        </header>

        {/* Main Content & Image Wrapper */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Content Section */}
          <div className="prose dark:prose-invert max-w-none md:col-span-1 order-2 md:order-1">
            <p className="lead">
              We fill a rimmed tray with kinetic sand, bury a full set of plastic organs, and - poof - our squishy "patient" is ready for the OR. Gloves snap, masks tie, headlamps click - honestly everyone&apos;s favourite moment - and out comes the Play-Doh scalpel. We slice the sand, hunt for each organ with a kids&apos; anatomy book as our map, chat about what it does, give the unlucky liver or lung a pretend syringe "treatment," then tuck the sand back in and finish with a stethoscope check: "Yep, still alive!"
            </p>
            <p className="mt-4">
              She begs for this routine daily, and I totally get it. I always wanted to star in a doctor show when I was little. Bonus: she can already spot the large versus small intestine at a glance - when I first learned it I was today years old!
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2">Details</h3>
            <ul>
              <li><strong>Set-up:</strong> ≈ 10 min</li>
              <li><strong>Clean-up:</strong> ≈ 5 min (kinetic sand clumps together - thank you, science)</li>
              <li><strong>Gear:</strong> Kinetic sand + tray, plastic organ set, Play-Doh knife, toy syringe & stethoscope, child-size gloves, masks, headlamp</li>
              <li><strong>Difficulty:</strong> Delightfully messy, totally doable</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-2">Tips & tricks for fellow surgeon-parents</h3>
            <ul>
              <li><strong>Pick the right organ set.</strong> I&apos;m still searching for the perfect Amazon kit - aim for all the majors (heart, lungs, brain, stomach, liver, kidneys, intestines) in one consistent scale and big enough for little hands.</li>
              <li><strong>Keep the goal light.</strong> This isn&apos;t med school; it&apos;s curiosity fuel. She may forget the fine details later, but every "Why does the heart pump?" right now is gold.</li>
              <li><strong>Gloves & masks matter.</strong> Suiting up makes the role-play feel authentic (and contains some mess).</li>
              <li><strong>Use the book as a treasure map.</strong> Let your child flip pages and match drawings to their sandy finds - built-in reading practice.</li>
              <li><strong>Control the mess zone.</strong> A baking tray or old sheet keeps the OR contained.</li>
            </ul>
            <h3 className="text-xl font-semibold mt-6 mb-2">What&apos;s next?</h3>
            <p>
              I&apos;ve been a fan of The Breakfasteur on YouTube since long before I had a kid; those hands-on dissections and crystal-clear explanations are the level we&apos;ll level-up to once the basics stick. For now, daily sand surgeries keep the questions (and giggles) flowing—and yes, she still presses her ear to my chest to hear a real heartbeat. I&apos;ll never say no to that prescription.
            </p>
          </div>

          {/* Image Section */}
          <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg md:col-span-1 order-1 md:order-2"> {/* aspect-video for landscape */}
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Additional Images Gallery (conditionally rendered) */}
        {additionalImages.length > 0 && (
          <section className="mt-12 pt-8 border-t">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Coolest props ever</h2>
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

        {/* Affiliate Links Section - MOVED TO THE BOTTOM & LEFT ALIGNED */}
        {affiliateLinks.length > 0 && (
          <section className="mt-12 pt-8 border-t">
            <h3 className="text-2xl font-semibold mb-4">Gear We Used (Affiliate Links)</h3>
            <ul className="list-disc list-inside space-y-2">
              {affiliateLinks.map((link) => (
                <li key={link.text}>
                  <a 
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {link.text}
                  </a>
                  {link.description && <span className="text-sm text-muted-foreground ml-1">{link.description}</span>}
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground mt-4">
              (This is not the reason why i started this blog, but since readers are already asking might as well.)
            </p>
          </section>
        )}
      </article>
    </div>
  );
} 