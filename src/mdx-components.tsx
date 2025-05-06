import type { MDXComponents } from 'mdx/types'

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

// Example: Replace standard h1 with a styled version or a custom component
// import { MyH1Component } from '@/components/ui/my-h1-component'

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. headags.
    // h1: ({ children }) => <MyH1Component>{children}</MyH1Component>,
    // Example of allowing a custom component
    // Callout: (props) => <CalloutComponent {...props} />,
    ...components,
  }
} 