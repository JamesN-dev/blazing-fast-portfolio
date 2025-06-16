```javascript
import { vitePreprocess } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-auto';
import { mdsvex } from 'mdsvex';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import remarkMath from 'remark-math';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
import { getHighlighter } from 'shiki'; // Using getHighlighter as per previous successful step
import remarkWikiLink from 'remark-wiki-link';
import rehypeCodeTitles from 'rehype-code-titles';
import remarkReadingTime from 'remark-reading-time';
import rehypeUnwrapImages from 'rehype-unwrap-images';

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
  extensions: ['.md', '.svx'],
  layout: {
    _: './src/lib/components/blog/BlogPostLayout.svelte'
  },
  remarkPlugins: [
    remarkGfm,
    [remarkToc, { tight: true, ordered: true }],
    remarkMath,
    remarkWikiLink,
    remarkReadingTime
  ],
  rehypePlugins: [
    rehypeSlug,
    [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    rehypeKatex,
    rehypeCodeTitles,
    rehypeUnwrapImages
  ],
  highlight: {
    highlighter: async (code, lang) => {
      const highlighter = await getHighlighter({
        themes: ['github-dark'],
        langs: ['javascript', 'typescript', 'css', 'yaml', 'svelte', 'bash', 'shell', 'json', 'markdown']
      });
      // Ensure lang is valid, default to 'text' if not provided or not loaded
      const effectiveLang = lang && highlighter.getLoadedLanguages().includes(lang) ? lang : 'text';
      const html = highlighter.codeToHtml(code, { lang: effectiveLang, theme: 'github-dark' });
      // The key change is to return the HTML string directly, without the Svelte specific wrapper.
      // MDsveX expects the highlighter to return raw HTML.
      return html;
    }
  }
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md', '.svx'],
  preprocess: [
    vitePreprocess(),
    mdsvex(mdsvexOptions)
  ],
  kit: {
    adapter: adapter()
  }
};

export default config;
```
