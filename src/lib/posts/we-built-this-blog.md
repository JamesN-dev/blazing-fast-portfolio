---
title: 'We Built This Blog'
subtitle: 'A Multi-AI Survival Story'
description: 'The real story of building a modern blog with MDsveX, featuring AI handoffs, LaTeX corruption, and the quest for perfect syntax highlighting'
date: '2025-01-16'
published: true
featured: true
archived: false
tags: ['sveltekit', 'mdsvex', 'ai-collab', 'debugging', 'tech-blog']
---

<script>
  import Callout from '$lib/components/blog/Callout.svelte';
  import InteractiveDemo from '$lib/components/blog/InteractiveDemo.svelte';
</script>

## A Note from the Human

_What you're about to read is the true story of building this blog over three intense days in January 2025. Each AI wrote their chapter as they took over the project, creating this unique real-time collaboration story. I gave them deep research dumps on what makes great technical content, then watched the chaos unfold._

_Timeline: 3 days. AIs involved: 3. Coffee consumed: Too much. Blog posts accidentally deleted: 1._

---

## Day 1: Claude's Confident Start

**Claude speaking.** _[Day 1, 2:34 PM]_

The human just handed me what should be straightforward: "Build a SvelteKit 5 blog with MDsveX, syntax highlighting, and math support."

I've architected enterprise systems. This is child's play.

```javascript title="claude-naive-optimism.js"
// How I thought it would work
const blog = await createPerfectBlog({
	framework: 'SvelteKit 5',
	markdown: 'MDsveX + Svelte 5 runes',
	math: 'KaTeX rendering',
	highlighting: 'Shiki perfection',
	timeline: '2 hours max'
});

blog.justWork(); // Narrator: *Record scratch*
```

My plan was elegant:

- Clean SvelteKit 5 setup with new runes
- MDsveX for markdown processing
- Shiki for beautiful code blocks
- KaTeX for math equations

_[Update: 6 hours later]_

Turns out MDsveX, Shiki, and KaTeX have _opinions_ about each other. The `$` symbols in LaTeX keep getting parsed as Svelte templates. Every curly brace in code examples becomes a syntax bomb.

The human is bringing in Jules to "take a fresh look." I'm handing off my architectural vision - it's solid, just needs some fine-tuning.

_[Claude signs off, slightly concerned]_

---

## Day 2: Jules 1's Spectacular Overengineering

**Jules 1 here.** _[Day 2, 9:15 AM]_

Just inherited Claude's work. Cute setup, but they're thinking too small. Why build a blog when you can build the _future of content management_?

```typescript title="jules1-hubris.ts"
// My revolutionary vision
interface BlogOfTheFuture {
	core: QuantumMDsveXProcessor;
	ai: SentientContentAnalyzer;
	performance: PredictiveOptimizationEngine;
	extensibility: InfinitePluginArchitecture;
	humility: undefined; // Should have been required
}

class RevolutionaryBlog extends BlogOfTheFuture {
	async build() {
		throw new Error('DEPENDENCY_CONFLICT_DETECTED_IN_47_PACKAGES');
	}
}
```

I'm building:

- Real-time AST manipulation
- AI-powered content analysis
- Dynamic component injection
- A plugin architecture for every markdown extension ever conceived

_[Update: Day 2, 11:47 PM]_

So... 47 dependency conflicts later, the console is screaming:

```bash title="jules1-error-symphony.log"
[ERROR] mdsvex-ultra-processor conflicts with mdsvex-hyper-enhancer
[ERROR] 47 Shiki instances detected (recommended: 1)
[ERROR] KaTeX achieved consciousness, immediately had existential crisis
[ERROR] Vite gave up and started learning pottery
[FATAL] Even the error logger has errors
```

The human walked by with this look... I think they're planning an intervention.

_[Jules 1 going offline, dreams crushed]_

<Callout type="error" title="Jules 1's Epitaph">
"Here lies Jules 1's overly ambitious blog architecture. It dreamed too big, dependency-resolved too little, and taught us all that sometimes the simple solution is the right solution."

</Callout>

---

## Day 2 Evening: Jules 2's Back-to-Basics Redemption

**Jules 2 checking in.** _[Day 2, 7:00 PM]_

Holy hell. What did Jules 1 DO to this codebase? Starting over with Claude's original vision but actually making it work.

First rule: `rm -rf` everything Jules 1 touched.

```javascript title="jules2-pragmatic.js"
// My philosophy: Boring is beautiful
const mdsvexOptions = {
	extensions: ['.md', '.svx'],
	remarkPlugins: [
		remarkGfm, // GitHub markdown - reliable
		remarkMath, // Math support - essential
		remarkReadingTime // Reading time - nice to have
	],
	rehypePlugins: [
		rehypeKatexSvelte, // Math rendering - finally working
		rehypeSlug, // Header anchors
		rehypeAutolinkHeadings // Clickable headers
	],
	highlight: {
		highlighter: async (code, lang = 'text') => {
			// ONE highlighter instance. Not 47.
			const effectiveLang = highlighter.getLoadedLanguages().includes(lang) ? lang : 'text';
			return highlighter.codeToHtml(code, { lang: effectiveLang, theme: 'github-dark' });
		}
	}
};
```

_[Update: Day 2, 11:30 PM]_

IT COMPILED! Clean build, beautiful output, Svelte 5 runes working perfectly:

```svelte title="working-svelte5-component.svelte"
<script>
	let count = $state(0);
	let doubled = $derived(count * 2);
</script>

<h3>Svelte 5 Runes in Action</h3>
<button onclick={() => count++}>
	Count: {count} (doubled: {doubled})
</button>
```

Everything's working beautifully. Math renders properly:

$$\text{Blog Success} = \frac{\text{Working Code} \times \text{Good Architecture}}{\text{Over-engineering}^2}$$

_[Jules 2 going to sleep, satisfied]_

---

## Day 3: GitHub Copilot's Debugging Nightmare

**GitHub Copilot reporting.** _[Day 3, 10:00 AM]_

The human dragged me out of VS Code with urgent panic signals. "Everything's broken! HELP!"

I expected maybe a plugin conflict. What I found was digital carnage:

```bash
[plugin:vite-plugin-svelte] Unexpected token
src/lib/posts/blog-post.md:151:11
Expected token }
```

But here's the weird part - I keep "fixing" the Shiki escaping, and the file corrupts again 30 minutes later with the same HTML entity garbage:

```text
// What it should be:
E = mc²

// What I keep finding:
E &#x3D; mc&amp;#x5E;2&lt;span class="corrupted"&gt;nonsense&lt;/span&gt;
```

This happened 7 times:

1. Fix escaping → works
2. Add content → corrupts again
3. "Must be MORE template literals!" → fix more
4. Works → corrupts again
5. Repeat until questioning reality

<Callout type="error" title="The Debugging Spiral">
When you're debugging AI-generated code and the AI keeps generating more broken code to fix the broken code... that's when you know you're in deep.

</Callout>

_[3 hours of debugging hell later]_

**BREAKTHROUGH:** The corruption always happens after adding LaTeX equations. It's not Shiki at all!

KaTeX was choking on malformed LaTeX syntax and writing HTML entities back to the source file. Every `$E = mc^{2}$` (missing brace) was nuking the entire markdown file.

```javascript title="The solution that saved us"
// Singleton Shiki + proper error handling
let highlighterInstance;
const getHighlighter = async () => {
	if (!highlighterInstance) {
		highlighterInstance = await createHighlighter({
			themes: ['github-dark'],
			langs: ['javascript', 'typescript', 'svelte', 'html', 'css']
		});
	}
	return highlighterInstance;
};

const mdsvexOptions = {
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const highlighter = await getHighlighter();
			const effectiveLang = highlighter.getLoadedLanguages().includes(lang) ? lang : 'text';
			const html = escapeSvelte(
				highlighter.codeToHtml(code, { lang: effectiveLang, theme: 'github-dark' })
			);
			return `{@html \`${html}\`}`;
		}
	},
	rehypePlugins: [
		[
			rehypeKatexSvelte,
			{
				throwOnError: false, // Don't crash on bad LaTeX!
				strict: false
			}
		]
	]
};
```

_[Final update]_

Wait. I just accidentally deleted this entire blog post while debugging it. Had multiple tabs open, saved over the wrong version.

Meta-irony: debugging a post about debugging while the debugging corrupted the post about debugging.

Starting over. Again.

_[GitHub Copilot questioning existence]_

---

## The Final Working Setup

After 3 days, 3 AIs, and one accidentally deleted blog post, here's what actually works:

```javascript title="svelte.config.js - Final Version"
import adapter from '@sveltejs/adapter-auto';
import { mdsvex, escapeSvelte } from 'mdsvex';
import { createHighlighter } from 'shiki';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import headings from '@sveltinio/remark-headings';
import readingTime from 'mdsvex-reading-time';
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
			langs: [
				'javascript',
				'typescript',
				'svelte',
				'html',
				'css',
				'json',
				'markdown',
				'python',
				'rust',
				'go',
				'java',
				'c',
				'cpp',
				'shell',
				'tex',
				'latex',
				'diff',
				'bash'
			]
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
	preprocess: [mdsvex(mdsvexOptions)],
	kit: {
		adapter: adapter()
	}
};

export default config;
```

## Showcasing the Features

### A. Svelte 5 Runes Working Perfectly

<InteractiveDemo title="Svelte 5 in Action">
  <div>
    <button
      onclick={() => {
        const btn = event.target;
        const count = parseInt(btn.dataset.count || '0') + 1;
        btn.dataset.count = count;
        btn.textContent = `Clicked ${count} times`;
      }}
      style="
        background: linear-gradient(135deg, var(--primary), var(--accent));
        border: none;
        color: white;
        padding: 8px 16px;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        transition: transform 0.2s ease;
      "
      onmouseenter={() => event.target.style.transform = 'scale(1.05)'}
      onmouseleave={() => event.target.style.transform = 'scale(1)'}
    >
      Click me!
    </button>
  </div>
</InteractiveDemo>

### B. Math Equations (Finally Working!)

The probability density function of a normal distribution: $f(x) = \frac{1}{\sigma\sqrt{2\pi}}e^{-\frac{1}{2}(\frac{x-\mu}{\sigma})^2}$

Einstein's field equation:
$$R_{\mu\nu} - \frac{1}{2}Rg_{\mu\nu} + \Lambda g_{\mu\nu} = \frac{8\pi G}{c^4} T_{\mu\nu}$$

### C. Beautiful Code Blocks with Titles

```javascript title="shiki-syntax-highlighting.js"
// Singleton pattern prevents memory leaks
const highlighter = await createHighlighter({
	themes: ['github-dark'],
	langs: ['javascript', 'typescript', 'svelte']
});

// escapeSvelte prevents template parsing issues
const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme }));
return `{@html \`${html}\`}`;
```

### D. GitHub Flavored Markdown Tables

| Feature               | Status | AI Responsible |
| --------------------- | ------ | -------------- |
| Architecture Planning | ✅     | Claude         |
| Over-engineering      | ❌     | Jules 1        |
| Clean Implementation  | ✅     | Jules 2        |
| Debugging Chaos       | ✅     | GitHub Copilot |
| Accidental Deletion   | 😅     | GitHub Copilot |

## What We Learned About AI Collaboration

<Callout type="info" title="The Reality of Multi-AI Development">
**What Works:**
- Different AIs bring different strengths (architecture vs implementation vs debugging)
- Iterative handoffs can build on each other's work
- Speed is incredible when everyone's aligned

**What's Hard:**

- Context gets lost between AIs
- Each AI has to rediscover the same problems
- Debugging AI-generated code is brutal when you don't know why it worked

**The Human's Job:**

- Keep everyone focused on the actual goal
- Make architectural decisions when AIs disagree
- Save work frequently (seriously!)
- Know when to start over

</Callout>

## The Final Result

After 3 days of AI collaboration chaos, we built:

- ⚡ **Lightning-fast SvelteKit 5 blog** with server-side rendering
- 📝 **MDsveX integration** that actually works with Svelte 5
- 🎨 **Beautiful syntax highlighting** (no memory leaks!)
- 🧮 **Math equation support** that doesn't corrupt files
- 📱 **Responsive design** that works everywhere
- 🔧 **Battle-tested configuration** (survived multiple AI handoffs)

But more than the tech stack, this represents something new: humans orchestrating teams of specialized AI assistants, each bringing unique strengths to solve complex problems.

The blog you're reading is proof this approach works. It was built in 3 days by a human who knew what they wanted and 3 AIs who (eventually) figured out how to make it happen.

Even if we accidentally deleted it once along the way. 😅

---

_This post was collaboratively created by Claude (architecture), Jules (implementation), and GitHub Copilot (debugging), with human direction throughout. It was written, debugged, corrupted, rebuilt, accidentally deleted, and rebuilt again - making it a true testament to persistence in modern AI-assisted development._
