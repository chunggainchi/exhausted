import Image from 'next/image';

export default function AboutSection() {
  return (
    <section className="w-full mx-auto my-16 p-8 sm:p-12 bg-[#292929] text-gray-200 dark:text-gray-300 rounded-2xl shadow-lg">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {/* Image Column - Added wrapper for gradient border */}
        <div className="flex-shrink-0 p-1 rounded-full bg-gradient-to-br from-[#FFD210] to-[#FF5A00] shadow-md">
          <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 bg-[#292929] rounded-full overflow-hidden"> {/* Inner bg matches section */}
            <Image
              // IMPORTANT: Replace with your actual image path
              src="/images/about/sharon-profile.webp"
              alt="Sharon, the author of the blog"
              width={224} // Corresponds to md:w-56
              height={224} // Corresponds to md:h-56
              className="object-cover w-full h-full" // Ensure image fills the inner div
              unoptimized={true} // Consider removing if you configure image optimization later
            />
          </div>
        </div>

        {/* Text Column */}
        <div className="flex-grow text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white dark:text-white">About the exhausted + her mini rocket</h2>
          <p className="mb-4 text-base sm:text-lg">
            Hi, I&apos;m Sharon — a Germany-based mum to three-year-old daughter, my resident question factory and chief product tester. When she asks, &quot;Can we build…?&quot; my default setting is yes, because making things — songs, sketches, cardboard contraptions, videogames, foam palaces, you name it — is the fuel that keeps me going.
          </p>
          <p className="mb-4 text-base sm:text-lg">
            This site is my caffeine-powered logbook. I&apos;d be doing most of these projects anyway; writing them down turns the normally invisible work of &quot;raising tiny monkeys&quot; into a stack of visible wins that makes us both proud.
          </p>
          <p className="text-base sm:text-lg">
            I call the blog &quot;Exhausted Rocket.&quot; In rocketry, a vehicle can outrun the speed of its own exhaust as long as it keeps throwing mass backwards. Parenting feels the same: pour in brain-juice, love and late-night hot glue, and your little rocket eventually zooms faster and farther than the tired booster who launched her. That&apos;s the plan — even if I&apos;m wiped out, she&apos;ll have all the momentum she needs. 🚀
          </p>
        </div>
      </div>
    </section>
  );
} 