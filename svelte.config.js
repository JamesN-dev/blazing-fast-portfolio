import adapter from '@sveltejs/adapter-auto';
import { mdsvex } from 'mdsvex';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import remarkMath from 'remark-math';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatexSvelte from 'rehype-katex-svelte';
import remarkWikiLink from 'remark-wiki-link';
import rehypeCodeTitles from 'rehype-code-titles';
import remarkReadingTime from 'remark-reading-time';
import rehypeUnwrapImages from 'rehype-unwrap-images';
import { createHighlighter } from 'shiki';
import { escapeSvelte } from 'mdsvex';

// Create singleton highlighter instance
const highlighter = await createHighlighter({
  themes: ['github-dark'],
  langs: [
    'javascript',
    'typescript',
    'svelte',
    'html',
    'css',
    'json',
    'markdown',
    'yaml',
    'toml',
    'bash',
    'shell',
    'python',
    'rust',
    'go',
    'java',
    'c',
    'cpp'
  ]
});

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
  extensions: ['.md', '.svx'],
  remarkPlugins: [
    remarkGfm,
    [remarkToc, { tight: true, ordered: true }],
    remarkMath,
    [remarkWikiLink, { pageResolver: (name) => [name.replace(/ /g, '-').toLowerCase()], hrefTemplate: (permalink) => `/blog/${permalink}` }],
    remarkReadingTime
  ],
  rehypePlugins: [
    rehypeSlug,
    [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    rehypeKatexSvelte,
    rehypeCodeTitles,
    rehypeUnwrapImages
  ],
  highlight: {
    highlighter: async (code, lang = 'text') => {
      // Use the cached highlighter instance
      const effectiveLang = highlighter.getLoadedLanguages().includes(lang) ? lang : 'text';

      const html = escapeSvelte(
        highlighter.codeToHtml(code, {
          lang: effectiveLang,
          theme: 'github-dark'
        })
      );
      return `{@html \`${html}\`}`;
    }
  }
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md', '.svx'],
  preprocess: [
    mdsvex(mdsvexOptions)
  ],
  kit: {
    adapter: adapter()
  }
};

export default config;

