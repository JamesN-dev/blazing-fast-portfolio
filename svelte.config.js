import adapter from '@sveltejs/adapter-auto';
import { mdsvex } from 'mdsvex';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import remarkMath from 'remark-math';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatexSvelte from 'rehype-katex-svelte';
import rehypeCodeTitles from 'rehype-code-titles';
import readingTime from "mdsvex-reading-time";
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
    readingTime,
  ],
  rehypePlugins: [
    rehypeSlug,
    [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    rehypeCodeTitles, // This should run before your custom highlighter
    rehypeKatexSvelte,
    rehypeUnwrapImages
  ],
  highlight: {
    highlighter: async (code, lang = 'text', meta) => {
      // Extract title from meta if present
      const title = meta?.match(/title="([^"]+)"/)?.[1];
      const effectiveLang = highlighter.getLoadedLanguages().includes(lang) ? lang : 'text';

      const html = escapeSvelte(
        highlighter.codeToHtml(code, {
          lang: effectiveLang,
          theme: 'github-dark'
        })
      );

      // If there's a title, wrap the code block with title
      if (title) {
        return `<div class="code-block-with-title">
          <div class="code-title">${escapeSvelte(title)}</div>
          {@html \`${html}\`}
        </div>`;
      }

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
