# Instructions for Creating New Blog Content

This document outlines how to create and structure new blog posts for the exhaustedrocket.com website. The content is primarily managed using Markdown (or MDX for more complex components) files.

## 1. File Location and Naming

*   All blog post files should be placed in the `src/content/blog/` directory.
*   File names should be URL-friendly (lowercase, hyphenated for spaces) and end with the `.md` or `.mdx` extension. This filename (without the extension) will become the "slug" for the blog post URL.
    *   Example: A post titled "My Awesome New Idea" could have a filename `my-awesome-new-idea.mdx`. The URL would then be `exhaustedrocket.com/blog/my-awesome-new-idea`.

## 2. Frontmatter

Each blog post file **must** begin with a YAML frontmatter block. This block contains metadata for the post.

```yaml
---
title: "Your Blog Post Title Here"
date: "YYYY-MM-DD" # e.g., 2024-07-29
description: "A short, compelling summary of your blog post (1-2 sentences). This is often used for SEO and preview snippets."
author: "Your Name" # Or a consistent author name
tags: ["tag1", "relevant-tag", "another-one"] # Optional: A list of relevant tags/keywords
# Optional: Specify an image for social media previews, post listings, etc.
# coverImage: "/images/blog/[slug]/cover.jpg" # Path relative to the /public directory
# draft: true # Optional: Set to true if the post is not ready to be published
---
```

**Mandatory Fields:**

*   `title`: The main title of your blog post.
*   `date`: The publication date in `YYYY-MM-DD` format.
*   `description`: A brief summary for SEO and previews.
*   `author`: The author of the post.

**Optional Fields (but recommended):**

*   `tags`: Helps categorize and find posts.
*   `coverImage`: Path to a representative image for the post (see Image Handling section). Stored in `public/images/blog/[slug]/your-image.jpg`.
*   `draft`: If `true`, the post might be excluded from production builds or lists (we'll need to implement logic for this if desired). Defaults to `false` if omitted.

## 3. Content (Markdown/MDX)

Below the frontmatter, write your blog post content using standard Markdown. If you need to use React components directly within your content (e.g., custom interactive elements), you should use the `.mdx` extension for the file.

### Text Formatting:

*   Headings: `# H1`, `## H2`, `### H3`, etc.
*   Bold: `**bold text**` or `__bold text__`
*   Italic: `*italic text*` or `_italic text_`
*   Links: `[link text](https://example.com)`
*   Lists:
    *   Unordered: `- item 1`, `* item 1`
    *   Ordered: `1. item 1`, `2. item 2`
*   Blockquotes: `> This is a blockquote.`
*   Code blocks:
    ```python
    # This is a Python code block
    print("Hello, world!")
    ```

### Image Handling:

1.  **Storage:**
    *   Create a subdirectory within `public/images/blog/` named after your post's slug.
    *   Example: For a post `my-awesome-new-idea.mdx`, images would go into `public/images/blog/my-awesome-new-idea/`.
2.  **Naming:** Use descriptive, lowercase, hyphenated filenames for images (e.g., `main-diagram.png`, `step-1-screenshot.jpg`).
3.  **Referencing in Markdown/MDX:**
    *   Use standard Markdown image syntax: `![alt text](/images/blog/[slug]/your-image-name.jpg)`
    *   The path **must** start with `/` to be relative to the `public` directory.
    *   Example: `![My Awesome Diagram](/images/blog/my-awesome-new-idea/main-diagram.png)`
4.  **Optimization:** Before adding images, try to optimize them for the web (e.g., compress JPEGs, use WebP where appropriate) to keep page load times fast.

### Video Embedding (e.g., YouTube):

*   For services like YouTube or Vimeo, it's usually best to use their provided `iframe` embed code.
*   You can directly paste this HTML into your `.md` or `.mdx` file.
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
    *   The surrounding `div` helps make the video responsive.

## 4. Workflow for AI-Assisted Content Creation (Cursor)

When using an LLM like the one in Cursor to help generate blog posts:

1.  **Provide Context:**
    *   Clearly state the desired `title`.
    *   Provide the `date` (or ask for the current date).
    *   Give a clear prompt for the `description`.
    *   Specify the `author`.
    *   List any `tags`.
2.  **Specify Image Requirements:**
    *   If you want the LLM to suggest image placements, tell it where.
    *   Indicate the `alt text` it should use.
    *   Remind it of the path structure: `/images/blog/[slug]/filename.ext`. You will need to manually create the slug directory and add the images there.
3.  **Content Generation:**
    *   Ask the LLM to generate the main content in Markdown format.
    *   If you need MDX for specific components, specify that.
4.  **Structure Request:**
    *   You can ask the LLM to generate the full file content, including the frontmatter block and the Markdown body.
    *   Example prompt: "Generate a blog post file for `src/content/blog/my-new-post.mdx` with the title 'My New Post', date '2024-08-01', description 'A post about something new.', author 'Me', tags ['new', 'exciting']. The content should be about X, Y, and Z. Include a placeholder for an image named 'feature.png' with alt text 'Feature Image'."
5.  **Review and Refine:** Always review the generated content for accuracy, tone, and completeness. Manually add images to the correct `public/images/blog/[slug]/` directory.

By following these guidelines, we can ensure consistency and make it easy to manage and display blog content. 