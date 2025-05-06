import type { MDXComponents } from 'mdx/types'

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

// Example: Replace standard h1 with a styled version or a custom component
// import { MyH1Component } from '@/components/ui/my-h1-component'

// This file is required to use MDX in `app` directory.

// Define and export your custom MDX components directly.
// You can merge in any passed components if needed, though for RSC,
// you typically define them all here.
export const mdxComponents: MDXComponents = {
  // Allows customizing built-in components, e.g. headings.
  // h1: ({ children }) => <MyH1Component>{children}</MyH1Component>,
  // Example of allowing a custom component
  // Callout: (props) => <CalloutComponent {...props} />,
  // Add other custom components here
};

// If you still want a function that can merge additional components (optional)
export function getMDXComponents(additionalComponents: MDXComponents = {}): MDXComponents {
  return {
    ...mdxComponents,
    ...additionalComponents,
  }
} 