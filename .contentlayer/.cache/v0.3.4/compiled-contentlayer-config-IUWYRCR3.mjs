// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import remarkGfm from "remark-gfm";
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `blog/**/*.mdx`,
  // Match mdx files in the blog folder
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true
    },
    date: {
      type: "date",
      description: "The date the post was published",
      required: true
    },
    description: {
      type: "string",
      description: "A short description of the post for previews and SEO",
      required: true
    },
    author: {
      type: "string",
      description: "The author of the post",
      required: true
    },
    tags: {
      type: "list",
      of: { type: "string" },
      description: "Tags associated with the post",
      required: false
      // Optional
    },
    coverImage: {
      type: "string",
      description: "URL for the post's cover image",
      required: false
      // Optional
    }
    // Add any other fields from your frontmatter here
  },
  computedFields: {
    slug: {
      type: "string",
      // remove `blog/` prefix and `.mdx` suffix
      resolve: (doc) => doc._raw.flattenedPath.replace(/^blog\/?/, "")
    },
    url: {
      type: "string",
      resolve: (doc) => `/blog/${doc._raw.flattenedPath.replace(/^blog\/?/, "")}`
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "src/content",
  // Root directory for content
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm]
    // rehypePlugins: [[rehypePrettyCode, options]],
    // Add other MDX options here if needed
  }
});
export {
  Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-IUWYRCR3.mjs.map
