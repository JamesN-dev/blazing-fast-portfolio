import adapter from '@sveltejs/adapter-auto';
import { mdsvex, escapeSvelte } from 'mdsvex';
import { createHighlighter } from 'shiki';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import headings from '@sveltinio/remark-headings';
import readingTime from "mdsvex-reading-time";
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatexSvelte from 'rehype-katex-svelte';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeUnwrapImages from 'rehype-unwrap-images';

// Singleton highlighter (create once, use everywhere)
let highlighterInstance;

const getHighlighter = async () => {
  if (!highlighterInstance) {
    highlighterInstance = await createHighlighter({
      themes: ['gruvbox-dark-hard'],
      langs: ['javascript', 'typescript', 'svelte', 'html', 'css', 'json', 'markdown', 'python', 'rust', 'go', 'java', 'c', 'cpp', 'shell', 'tex', 'latex', 'diff', 'bash']
    });
  }
  return highlighterInstance;
};

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
  extensions: ['.md', '.svx'],
  highlight: {
    highlighter: async (code, lang) => {
      const highlighter = await getHighlighter();

      // Map 'math' to 'tex' for LaTeX syntax highlighting
      const language = lang === 'math' ? 'tex' : lang;

      const html = escapeSvelte(
        highlighter.codeToHtml(code, {
          lang: language,
          theme: 'gruvbox-dark-hard'
        })
      );

      return `{@html \`${html}\`}`;
    }
  },
  remarkPlugins: [
    remarkGfm,
    headings, // Extracts headings to frontmatter.headings
    remarkMath,
    readingTime
  ],
  rehypePlugins: [
    rehypeSlug,
    [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    rehypeKatexSvelte,
    rehypeCodeTitles,
    rehypeUnwrapImages
  ],
  smartypants: {
    dashes: 'oldschool'
  }
  // No layout - using SvelteKit route-based layout instead
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md', '.svx'],
  preprocess: [
    mdsvex(mdsvexOptions),
  ],
  kit: {
    adapter: adapter()
  }
};

export default config;
