# Instructions for Creating New Blog Content

This document outlines how to create and structure new blog posts for the exhaustedrocket.com website. The current approach involves hardcoding each blog post as a Next.js page component and manually updating the relevant category overview page.

## 1. File Location and Naming for Blog Post Pages

*   Blog post pages are React components located within subdirectories of `src/app/blog/`.
*   Organize posts by category: `src/app/blog/[categoryName]/[post-slug]/page.tsx`
    *   `[categoryName]` should be the lowercase name of the category (e.g., `puzzle`, `crafts`).
    *   `[post-slug]` should be URL-friendly (lowercase, hyphenated for spaces). This slug will be part of the URL.
    *   The file **must** be named `page.tsx`.
*   Example: A post titled "My Awesome New Puzzle" in the "puzzle" category would be at `src/app/blog/puzzle/my-awesome-new-puzzle/page.tsx`. The URL would then be `exhaustedrocket.com/blog/puzzle/my-awesome-new-puzzle`.

## 2. Structure of a Blog Post Page (`page.tsx`)

Each blog post page component should generally follow this structure:

```typescript jsx
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react'; // Or other icons as needed

// 1. Metadata Export
export const metadata: Metadata = {
  title: 'Your Post Title | Category Name | Exhausted Rocket',
  description: 'A concise and compelling summary of your blog post (1-2 sentences for SEO).',
};

// 2. Page Component
export default function YourPostNamePage() {
  // 3. Constants for easy management
  const categoryName = "Category Name"; // e.g., "Puzzle"
  const categoryHref = "/blog/category/category-name"; // e.g., "/blog/category/puzzle"
  const postTitle = "Your Post Title";
  const postSubtitle = "(Optional Subtitle)"; // Optional
  const imageUrl = "/images/blog/your-post-image.webp"; // Path relative to /public directory
  const imageAlt = "Alt text for your post image";

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 4. Breadcrumbs (consistent navigation) */}
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
          {postSubtitle && <p className="text-xl sm:text-2xl text-muted-foreground">{postSubtitle}</p>}
        </header>

        {/* Main Content & Image Wrapper */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12"> {/* MODIFIED for mobile-first image */}
          {/* 6. Content Section */}
          <div className="prose dark:prose-invert max-w-none md:col-span-1 order-2 md:order-1"> {/* order-2 md:order-1 */}
            <p className="lead">
              Your main introductory paragraph or leading content.
            </p>
            {/* Add more paragraphs, lists, etc. using standard HTML/JSX elements */}
            <h3 className="text-xl font-semibold mt-6 mb-2">Details:</h3>
            <ul>
              <li><strong>Estimated build time:</strong> ≈ X mins</li>
              <li><strong>Mats needed:</strong> ≈ Y pcs</li>
              <li><strong>Difficulty:</strong> Easy/Medium/Hard</li>
            </ul>
            {/* More content here */}
          </div>

          {/* 7. Image Section */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-lg md:col-span-1 order-1 md:order-2"> {/* order-1 md:order-2 */}
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </article>
    </div>
  );
}
```

**Key Parts:**
*   **Metadata:** Essential for SEO. Ensure `title` and `description` are unique and descriptive.
*   **Constants:** Define `categoryName`, `categoryHref`, `postTitle`, `postSubtitle` (if any), `imageUrl`, and `imageAlt` at the top of your component for easy updates.
*   **Breadcrumbs:** Maintain consistent navigation.
*   **Content & Image Layout:** 
    *   The wrapper `div` uses `flex flex-col md:grid md:grid-cols-2` to stack on mobile and use a grid on medium screens and up.
    *   The **Content Section** `div` uses `order-2 md:order-1` to appear second on mobile and first on larger screens.
    *   The **Image Section** `div` uses `order-1 md:order-2` to appear first on mobile and second on larger screens.
    *   Adjust `md:col-span-X` as needed if your desktop layout is different (e.g., `md:grid-cols-3` with content taking `md:col-span-2`).
*   **Content:** Use the `prose` classes for Tailwind Typography styling of your main text content.
*   **Image:** Use the Next.js `Image` component for optimized image handling. Adjust `fill`, `width`/`height`, `className`, and `sizes` props as needed. For portrait images that should not be cropped by `aspect-[4/3]` and `object-cover`, you might need to adjust the surrounding div's classes or use `object-contain` and specific dimensions.

## 3. Adding the Post to its Category Overview Page

After creating the individual blog post page, you **must** add it to the list of posts on its corresponding category overview page.

*   Locate the category page, e.g., `src/app/blog/category/puzzle/page.tsx`.
*   Find the array that holds the posts for that category (e.g., `const puzzlePosts: BlogPostCardProps[] = [...]`).
*   Add a new object to this array for your new post. This object should match the `BlogPostCardProps` interface (defined in `src/components/BlogPostCard.tsx`).

**Example entry for `puzzlePosts` array:**
```typescript
  {
    title: "Stair-Tower", // Matches postTitle from the post page
    subtitle: "(looks like steps, not for stepping)", // Optional, matches postSubtitle
    description: "A colourful cube \'stair-tower\' puzzle mat castle, perfect for little ones to explore. Learn how to build this easy fort.", // SEO description
    imageUrl: "/images/blog/stairtower.webp", // Matches imageUrl
    href: "/blog/puzzle/stair-tower", // Path to the new post page
    imageAlt: "Stair-Tower puzzle mat castle" // Matches imageAlt
    // If you add new props to BlogPostCardProps (e.g., for image_portrait), ensure they are defined in the interface
  },
  // ... other posts
```
*   Place the new entry appropriately (e.g., at the beginning for newest first).

## 4. Image Handling

1.  **Storage:**
    *   Store all blog images in the `public/images/blog/` directory.
    *   You can create subdirectories for organization if desired (e.g., `public/images/blog/puzzle/your-image.webp`), but ensure the `imageUrl` constant in your page component reflects the correct path.
2.  **Naming:** Use descriptive, lowercase, hyphenated filenames (e.g., `stair-tower-main.webp`).
3.  **Referencing:**
    *   In the post page component (e.g., `stair-tower/page.tsx`), set the `imageUrl` constant: `const imageUrl = "/images/blog/stairtower.webp";`.
    *   In the category overview page (e.g., `puzzle/page.tsx`), set the `imageUrl` in the post object: `imageUrl: "/images/blog/stairtower.webp"`.
4.  **Optimization:** Before adding images, optimize them for the web (e.g., compress JPEGs, use WebP) to improve page load times.

## 5. Video Embedding (e.g., YouTube)

*   For services like YouTube or Vimeo, use their provided `iframe` embed code.
*   You can directly paste this HTML into your page component's JSX.
    ```html
    <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; height: auto;">
      <iframe
        src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
        frameborder="0"
        allowfullscreen
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
      ></iframe>
    </div>
    ```
    *   Replace `YOUR_VIDEO_ID` with the actual ID of the YouTube video.
    *   The surrounding `div` helps make the video responsive. Place this structure within your content section.

## 6. Embedding Spotify Audio (Tracks, Episodes, Playlists)

You can embed interactive audio players directly from Spotify into your blog posts. This is useful for adding background music, relevant podcast episodes, or curated playlists.

1.  **Get the Embed Code from Spotify:**
    *   Open the Spotify Web Player or the Spotify desktop app.
    *   Navigate to the track, episode, album, or playlist you wish to embed.
    *   Click the "..." (more options) icon next to the content (or right-click it).
    *   Select **Share**, then choose the sub-option that starts with **Embed** (e.g., "Embed track", "Embed episode").
    *   Spotify will show a preview and customization options (like size and color theme). Adjust as needed.
    *   Click **Copy** to copy the `<iframe>` HTML code to your clipboard.
    *   (Reference: [Creating an Embed - Spotify Developer](https://developer.spotify.com/documentation/embeds/tutorials/creating-an-embed/), [Embedded players - Spotify Support](https://support.spotify.com/us/artists/article/embedded-players/))


2.  **Add to Your Blog Post Page (`page.tsx`):**
    *   In your specific blog post file (e.g., `src/app/blog/[category]/[slug]/page.tsx`), add a new string constant near the top of your page component, typically where you define `postTitle`, `imageUrl`, etc. Name it `spotifyEmbedHtml`.
    *   Paste the entire `<iframe>` code you copied from Spotify as a template literal (backticks `` ` ``) into this constant.

    **Example Constant:**
    ```typescript
    const spotifyEmbedHtml = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/YOUR_TRACK_ID?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
    // IMPORTANT: Replace the example iframe content with the actual code from Spotify.
    ```

3.  **Render the Spotify Player in JSX:**
    *   Decide where you want the player to appear in your article. A common place is after the main content or an image gallery, but before related posts or affiliate links.
    *   Conditionally render a `section` for the Spotify player. It will only display if `spotifyEmbedHtml` has content.
    *   Use `dangerouslySetInnerHTML` to render the HTML string from `spotifyEmbedHtml`.

    **Example JSX Structure:**
    ```typescript jsx
    {/* Spotify Embed Section */}
    {spotifyEmbedHtml && (
      <section className="mt-12 pt-8 border-t"> {/* Adjust margins/padding as needed */}
        <h3 className="text-2xl font-semibold mb-4">Background Audio</h3> {/* Or a more specific title */}
        <div dangerouslySetInnerHTML={{ __html: spotifyEmbedHtml }} />
      </section>
    )}
    ```
    *   The `<iframe>` provided by Spotify typically includes styling for responsiveness (`width="100%"`). You can adjust the `height` in the `<iframe>` code itself if needed, or Spotify's embed options might allow this. The default height is often `352px` for tracks/albums or `232px` for a compact version, or even `152px` for a smaller player. Choose what best fits your design.
    *   The `loading="lazy"` attribute in the `iframe` is good for performance.

## 7. Workflow for AI-Assisted Content Creation (Cursor)

When using an LLM like the one in Cursor to help write blog posts:

1.  **Setup the File:**
    *   Manually create the directory structure and the `page.tsx` file (e.g., `src/app/blog/puzzle/your-new-post/page.tsx`).
    *   Copy the general structure from an existing post page or the template provided in section 2 of this document.
2.  **Prompting for Content:**
    *   **Metadata:** Ask the AI to generate the `title` and `description` for the `metadata` object.
    *   **Page Constants:** Request content for `postTitle`, `postSubtitle` (if applicable), and `imageAlt`. You will need to determine the `imageUrl`, `categoryName`, and `categoryHref` yourself.
    *   **Main Content:** Provide a detailed prompt for the article's body. Ask for the content in plain text or simple HTML/JSX snippets that can be pasted into the `prose` div.
    *   **Details Section:** Ask for bullet points for the "Details" list (build time, mats needed, difficulty).
3.  **Integration:**
    *   Carefully integrate the AI-generated text into your `page.tsx` component.
    *   Ensure all paths, links, and constants are correct.
4.  **Update Category Page:**
    *   Manually update the corresponding category overview page as described in section 3. The AI can help draft the description or title for the card if needed.
5.  **Review and Refine:** Always thoroughly review the AI-generated content for accuracy, tone, technical correctness (especially paths and props), and completeness. Manually add and optimize images.
    *   **Punctuation & Escaping Entities:** Pay close attention to punctuation for consistency and correctness.
        *   **Apostrophes (') and Quotation Marks (") in Text Content:**
            *   **Directly in JSX:** When an apostrophe or quote is part of text directly within a JSX element (e.g., `<p>It's a sunny day.</p>`), it often needs to be escaped to avoid ESLint errors (`react/no-unescaped-entities`) and ensure correct rendering. 
                *   For a straight apostrophe: use `&apos;` (e.g., `<p>It&apos;s sunny.</p>`).
                *   For curly apostrophes: use `&lsquo;` (left single quote) and `&rsquo;` (right single quote/apostrophe) (e.g., `<p>She said, &lsquo;Hello,&rsquo; and it&rsquo;s great.</p>`).
                *   For double quotes: use `&quot;` for a general double quote, or `&ldquo;` (left) and `&rdquo;` (right) for typographic double quotes (e.g., `<p>He exclaimed, &ldquo;Wow!&rdquo;</p>`).
            *   **Inside JavaScript String Literals (e.g., in variables, props, or arrays of data like `affiliateLinks`):** Use the actual apostrophe or quote character directly. 
                *   If the string is delimited by single quotes, escape internal apostrophes with a backslash: `const message = 'It\'s important.';`
                *   If the string is delimited by double quotes, apostrophes can be used directly: `const message = "It's important.";` (and vice-versa for double quotes within single-quoted strings).
                *   Do **not** use HTML entities like `&apos;` or `&quot;` inside JavaScript string literals, as they will be treated as literal text and not rendered as the special character in the HTML.
        *   **Hyphens vs. Em-dashes:** Decide on a consistent style. Hyphens (-) are for compound words or ranges. **NEVER use em-dashes (—); use hyphens (-) for any scenario where an em-dash might typically be considered.** Standardize on hyphens for simplicity and to avoid inconsistencies. These usually don't need escaping unless they cause syntax issues.

## 8. Adding Affiliate Links (e.g., Amazon Associates)

If you plan to include affiliate links in your blog posts, here's a recommended approach to integrate them in a non-intrusive way:

1.  **Placement:**
    *   Consider placing affiliate links in a dedicated section towards the end of your blog post, for example, after the main content, additional image galleries, or a "What's next?" section. This makes them feel like a supplementary resource rather than the primary focus.
    *   Alternatively, you can weave them contextually into the main body text where a product is naturally mentioned, but ensure it doesn't disrupt the reading flow.

2.  **Structure in the Page Component (`page.tsx`):**
    *   **Define an Interface (Optional but Recommended):** For better code organization and type safety, define an interface for your affiliate links:
        ```typescript
        interface AffiliateLink {
          href: string;        // The actual affiliate URL
          text: string;        // The clickable link text
          description?: string; // Optional short description or context
        }
        ```
    *   **Create an Array of Links:** Inside your page component, define an array to hold your affiliate link objects:
        ```typescript
        const affiliateLinks: AffiliateLink[] = [
          {
            href: "#YOUR_ACTUAL_AFFILIATE_LINK_1_HERE",
            text: "Product Name 1",
            description: "(Short, helpful context, e.g., It&apos;s great for...)"
          },
          {
            href: "#YOUR_ACTUAL_AFFILIATE_LINK_2_HERE",
            text: "Product Name 2",
            description: "(Another short description)"
          }
          // Add more links as needed
        ];
        ```
        **Important:** Replace `#YOUR_ACTUAL_AFFILIATE_LINK_X_HERE` with the real affiliate URLs you generate from the affiliate program (e.g., Amazon Associates SiteStripe).

3.  **JSX for Rendering the Section:**
    *   Conditionally render the section so it only appears if there are links defined.
    *   Use a clear heading for the section, e.g., "Gear We Used (Affiliate Links)" or "Recommended Products."
    *   Display the links as an unordered list (`<ul>`).
    *   Ensure each link opens in a new tab using `target="_blank"` and `rel="noopener noreferrer"` for security and user experience.
    *   Style as needed using Tailwind CSS classes.

    **Example JSX Structure:**
    ```typescript jsx
    {/* Affiliate Links Section */}
    {affiliateLinks.length > 0 && (
      <section className="mt-12 pt-8 border-t"> {/* Adjust margins/padding as needed */}
        <h3 className="text-2xl font-semibold mb-4">Gear We Used (Affiliate Links)</h3>
        <ul className="list-disc list-inside space-y-2"> {/* `list-inside` for left alignment of bullets */}
          {affiliateLinks.map((link) => (
            <li key={link.text}>
              <a 
                href={link.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline" // Example styling
              >
                {link.text}
              </a>
              {link.description && <span className="text-sm text-muted-foreground ml-1">{link.description}</span>}
            </li>
          ))}
        </ul>
        {/* Disclosure Statement - See point 4 */}
      </section>
    )}
    ```

4.  **Include a Disclosure Statement:**
    *   It is crucial for transparency and often a requirement by affiliate programs (like Amazon Associates) to disclose that you are using affiliate links and may earn a commission.
    *   Place this disclosure clearly within or directly below the affiliate links section.
    *   **Example Disclosure Text (ensure any special characters here are also escaped if needed):**
        ```html
        <p className="text-xs text-muted-foreground mt-4">
          (This is not the reason why I started this blog, but since readers are already asking might as well.)
        </p>
        ```

    ***For Puzzle Mat Category Posts:*** *All posts in the 'Puzzle' category should include a standard affiliate link for the puzzle mats themselves. Use the following details:*
      *   *Link:* `https://amzn.to/4d91cez`
      *   *Text:* `Puzzle Play Mats`
      *   *Description:* `(I started with 4 packs which has been enough for all the builds shown here. Of course, more mats = more building possibilities!)`
    *This section should be placed before the 'Related Posts' component and after the main article content.*

5.  **Styling:**
    *   Ensure the section is styled to be readable and visually distinct but not overly aggressive. The example above uses basic Tailwind classes. Adjust these to fit your site's design.
    *   For left alignment of the entire section (heading, list, disclosure), ensure no centering classes like `text-center` or `mx-auto` are applied to the main `<section>` container or its direct children unless intended for specific elements within.

By following these guidelines, you can provide helpful product recommendations to your readers while maintaining transparency and a good user experience.

This hardcoding approach gives direct control over the component structure and styling for each post. Remember to be consistent with paths and naming conventions, and to apply the responsive ordering for optimal mobile viewing. 