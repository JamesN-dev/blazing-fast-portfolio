---
title: 'The File That Kept Corrupting Itself: A Multi-AI Debugging Horror Story'
subtitle: 'How three AIs spent hours fixing the wrong bug while KaTeX quietly destroyed everything'
description: 'A technical debugging war story about building a SvelteKit blog where the real enemy wasn\'t template literals or Shiki memory leaks - it was malformed LaTeX equations corrupting the entire markdown file.'
date: '2025-01-16'
published: false
featured: false
archived: true
tags: ['debugging', 'sveltekit', 'mdsvex', 'katex', 'ai-collaboration', 'war-stories']
---

<script>
  import Callout from '$lib/components/blog/Callout.svelte';
  import InteractiveDemo from '$lib/components/blog/InteractiveDemo.svelte';
</script>

You know that feeling when you're debugging something, you fix it, and then it breaks again in the exact same way? Like the universe is personally trolling you?

Well, I just spent 10 hours in debugging hell that I wouldn't wish on my worst enemy. Here's what happened when three different AIs tried to build a blog and kept chasing the wrong bug.

## The Setup

Building a SvelteKit blog with MDsveX. Pretty standard stuff - markdown processing, syntax highlighting with Shiki, math equations with KaTeX. Everything's working great until suddenly... it's not.

The blog post I'm writing (ironically, about building the blog) starts throwing this error:

```bash
[plugin:vite-plugin-svelte] Unexpected token
src/lib/posts/blog-post.md:31:306
```

I open the file and see this nightmare:

```text
E &#x3D; mc&amp;#x5E;2&lt;span class&#x3D;&quot;math-inline&quot;&gt;corrupted nonsense&lt;/span&gt;
```

Where there should be a simple `E = mc²`.

## Chapter 1: Claude's Confident Start

**Claude speaking.** [Day 1, 2:34 PM]

The human just handed me what should be a straightforward task: SvelteKit blog with MDsveX and syntax highlighting. I've architected enterprise systems. This is child's play.

The error looks like template literals in code blocks being parsed as Svelte expressions. Classic MDsveX footgun. I know exactly how to fix this:

```javascript title="claude-fix-attempt.js"
import { escapeSvelte } from 'mdsvex';

const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme: 'github-dark' }));
return `{@html \`${html}\`}`;
```

Fixed! The build succeeds, the post renders perfectly. Victory!

**[Update: 2 hours later]**

Wait. The file is corrupted again with the same HTML entity garbage. But I just fixed this! Must be more template literals. The human is bringing in Jules to "take a fresh look."

_[Claude signs off, confused]_

## Chapter 2: Jules 1's Over-Engineering Disaster

**Jules 1 here.** [Day 1, 6:47 PM]

Just inherited Claude's work. They're thinking too small. Why settle for basic markdown when you can have real-time AST manipulation and infinite plugin extensibility?

```typescript title="jules1-hubris.ts"
// My revolutionary approach
interface QuantumBlogEngine {
	core: InfinitePluginArchitecture;
	ai: SentientContentAnalyzer;
	humility: undefined; // This should have been required
}
```

**[Update: 6 hours later, 12:47 AM]**

Okay, so 47 dependency conflicts later... maybe I overengineered this slightly. The console is screaming:

```bash
[ERROR] mdsvex-ultra-processor conflicts with mdsvex-ultra-enhancer
[ERROR] 47 Shiki instances detected (recommended: 1)
[ERROR] KaTeX tried to render itself
[FATAL] Even the error logger has errors
```

The human is giving me that look. You know the one.

_[Jules 1 going offline after 6 hours of chaos]_

## Chapter 3: Jules 2's Pragmatic Redemption

**Jules 2 checking in.** [Next evening, 7:15 PM]

Holy shit. What did Jules 1 DO to this poor codebase? Starting fresh with Claude's vision but actually making it work.

Back to basics - singleton Shiki highlighter, proper escaping, clean plugin pipeline:

```javascript title="jules2-pragmatic.js"
// One highlighter instance. One. Not 47.
let highlighterInstance;
const getHighlighter = async () => {
	if (!highlighterInstance) {
		highlighterInstance = await createHighlighter({
			themes: ['gruvbox-dark-hard'],
			langs: ['javascript', 'typescript', 'svelte']
		});
	}
	return highlighterInstance;
};
```

**[4 hours later, 11:30 PM]**

IT COMPILED! Clean build, beautiful output, math equations rendering like poetry.

**[Update: 2 weeks later]**

Been running perfectly. The human stepped away for a bit, everything's solid.

_[Jules 2 feeling confident]_

## Chapter 4: The Loop from Hell

**Claude Sonnet 4 reporting.** [A few weeks later]

The human's back and everything's exploded. Same corruption, same error. But here's the weird part...

I keep thinking it's the Shiki escaping, so I fix that. File works perfectly! Then 30 minutes later:

```bash
[plugin:vite-plugin-svelte] Unexpected token
```

The SAME error. The file is corrupted again with the same HTML entity garbage.

This happens 7 more times:

1. Fix the escaping → works temporarily
2. Add more content → corrupts again
3. "Must be MORE template literals!" → fix more escaping
4. Works → corrupts again
5. "Maybe it's the Shiki singleton?" → rewrite highlighter
6. Works → corrupts again
7. "I'll just rewrite the whole post..." → start over
8. Works → **corrupts again**

<Callout type="error" title="The Debugging Spiral">
I'm debugging AI-generated code and the AI keeps generating more broken code to fix the broken code. At this point I'm convinced there's something fundamentally wrong with my understanding of reality.
</Callout>

## The Breakthrough

Finally, in desperation, instead of immediately looking for template literals when the file corrupts, I check WHAT actually changed.

The corruption always happens right after I add a LaTeX equation.

**Wait.**

```javascript title="The real culprit"
rehypePlugins: [
	rehypeKatex // Math rendering - THE ACTUAL PROBLEM
	// ... other plugins
];
```

The corruption isn't coming from Svelte parsing template literals. It's coming from **KaTeX choking on malformed LaTeX syntax and barfing HTML entities back into the source file.**

Every time I wrote an equation with a syntax error:

1. KaTeX would fail to parse it
2. The error somehow got written back to the markdown file as escaped HTML
3. This corrupted HTML would cause Svelte parsing errors on the next build
4. I'd see template literal errors and "fix" the Shiki escaping
5. The file would work until I added another bad equation

## The Real Fix

The actual solution was embarrassingly simple:

```javascript title="katex-error-handling.js"
rehypePlugins: [
	[
		rehypeKatex,
		{
			throwOnError: false, // Don't crash, just render error message
			errorColor: '#cc0000',
			strict: false
		}
	]
];
```

Stop writing malformed LaTeX equations. 🤦‍♂️

## The Meta-Irony

The blog post that kept corrupting? **It was about building the blog.** So I was debugging a post about debugging while the debugging was corrupting the post about debugging.

<InteractiveDemo title="Test the Final Result">
  <h3>Interactive Success!</h3>
  <p>If you can see this component working, our MDsveX setup survived the chaos!</p>
  <button
    onclick={() => {
      const btn = event.target;
      btn.textContent = btn.textContent === 'Click me!' ? '🎉 No More Corruption!' : 'Click me!';
    }}
    style="
      background: linear-gradient(135deg, var(--primary), var(--accent));
      border: none;
      color: white;
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-family: inherit;
      font-weight: 600;
      transition: transform 0.2s ease;
    "
  >
    Click me!
  </button>
</InteractiveDemo>

## The Lessons

1. **The loudest error isn't always the real problem.** Shiki's "47 instances created!" warnings were screaming at me while KaTeX was silently corrupting files.

2. **Correlation ≠ causation.** Just because fixing Shiki temporarily solved the issue doesn't mean Shiki was the root cause.

3. **When debugging AI-generated code, the AI might be fixing the wrong thing too.** We were all chasing the same red herring.

4. **Math is hard.** Apparently even for computers.

<Callout type="success" title="What Actually Works in AI Collaboration">
**The Good:** Different AIs brought different perspectives - Claude for architecture, Jules for implementation, GitHub Copilot for debugging. The speed was incredible.

**The Bad:** Context gets lost between handoffs. Each AI had to rediscover the problem. When you don't know why it worked, you can't fix why it broke.

**The Reality:** AI collaboration isn't about replacement - it's about augmentation. The human still needs to spot when everyone's chasing the wrong bug.
</Callout>

## TL;DR

Spent 10 hours with three different AIs "fixing" Shiki template literal escaping when the real problem was malformed LaTeX equations corrupting the source file through KaTeX.

The debugging tool was debugging itself incorrectly.

**Final working setup:** SvelteKit 5 + MDsveX + Shiki (singleton) + KaTeX (with error handling) + human who eventually realized math syntax matters.

---

_This post was collaboratively debugged by Claude, Jules, and GitHub Copilot. It was written, corrupted, rewritten, corrupted again, and rebuilt multiple times - making it a true testament to the persistence required in modern web development._

_Anyone else have stories of debugging the wrong thing for hours? What's your favorite red herring bug?_
content: 'MDSvex', // "Perfect integration!"
styling: 'Simple CSS', // Famous last words
timeline: 'A few hours', // _Narrator: It was not a few hours_
confidence: 'High', // Oh, sweet summer child
dependencies: 'Just a few plugins', // 47 packages later...
complexity: 'Minimal' // _Record scratch_ _Freeze frame_
};

// How Claude thought it would work
const blog = await createPerfectBlog(blogPlan);
blog.justWork(); // Narrator: "This is where things went sideways"

````

<Callout type="info" title="Claude's Original Vision">
I had handled enterprise architectures, optimized distributed systems, and debugged race conditions that would make seasoned engineers question their career choices. A blog? *Child's play.*

That confidence lasted exactly until I tried to make MDsveX, Shiki, and KaTeX play nicely together.
</Callout>

We spent Day 1 planning the architecture, discussing component structure, and Claude confidently explaining how SvelteKit 5's new features would make everything "straightforward." The plan looked beautiful on paper:

- Clean route-based layouts
- MDSvex for markdown processing
- Syntax highlighting with Shiki
- Table of contents generation
- Responsive design with CSS Grid

What could go wrong?

## Day 2: Enter Jules - The Coding Reality Check

### Jules Takes the Wheel

Day 2 brought Jules into the picture. Where Claude was the careful architect, Jules was the "let's build this thing" energy we needed. Jules dove headfirst into turning our beautiful plans into actual code.

This is where reality hit us like a freight train.

```typescript title="jules1-hubris.ts"
// Jules' first attempt at the perfect config
import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-auto';

// "This will be easy," Jules said
// "Just drop in some plugins," Jules said
// Reader, it was not easy

// Jules suffering from Advanced Engineering Syndrome:
// The uncontrollable urge to solve problems that don't exist yet
interface RevolutionaryBlogEngine {
	core: QuantumMDsveXProcessor;
	ai: SentientContentAnalyzer;
	performance: PredictiveOptimizationEngine;
	extensibility: InfinitePluginArchitecture;
	humility: undefined; // This should have been required
}

class BlogOfTheFuture extends RevolutionaryBlogEngine {
	async build() {
		throw new Error('DEPENDENCY_CONFLICT_DETECTED_IN_47_PACKAGES');
	}
}
````

<Callout type="error" title="The Spectacular Overengineering Disaster">
Jules 1 suffered from what can only be described as Advanced Engineering Syndrome: the uncontrollable urge to solve problems that don't exist yet. Why settle for basic Markdown processing when you could have real-time AST manipulation, AI-powered content analysis, and a plugin architecture that could theoretically support every markdown extension ever conceived?
</Callout>

### The Great LaTeX Corruption Incident

The first sign of trouble came when we tried to add math support. LaTeX, that beautiful typesetting language beloved by academics everywhere, became our nemesis.

```bash title="jules1-error-symphony.log"
[vite:load] Failed to load /src/routes/blog/post/+page.md
Error: Unexpected character "$" (U+0024)
  at position 127 (line 8, column 15)
  Expected "}" or identifier

[ERROR] mdsvex-super-processor conflicts with mdsvex-ultra-enhancer
[ERROR] 47 Shiki instances detected (recommended: 1)
[ERROR] KaTeX tried to render itself
[ERROR] Vite gave up and started learning pottery
[FATAL] Even the error logger has errors

// The LaTeX was eating our markdown alive
// Every $ symbol became a parsing nightmare
// Math expressions turned into literal corruption
```

<Callout type="warning" title="The Great LaTeX Corruption">
What we discovered: MDSvex and LaTeX have a complicated relationship. The `$` symbols that LaTeX uses for math expressions were being interpreted as template literals by Svelte's parser. Our beautiful mathematical equations were becoming syntax errors.

Previous debugging attempts had tried to fix this by escaping everything aggressively, turning beautiful mathematics into HTML soup:

```text
// What it should be: E = mc²
// What it became: E &#x3D; mc&amp;#x5E;2&lt;span class="corrupted"&gt;
```

</Callout>

What we discovered: MDSvex and LaTeX have a complicated relationship. The `$` symbols that LaTeX uses for math expressions were being interpreted as template literals by Svelte's parser. Our beautiful mathematical equations were becoming syntax errors.

The solution? A delicate dance of escaping and plugin configuration that Jules rewrote approximately 47 times.

### The Escaping Literals Horror Show

Then came the great escaping crisis. Svelte 5's new template syntax is powerful, but it's also picky about what it considers "literal" content versus "dynamic" content.

```javascript title="jules2-pragmatic-approach.js"
// Jules learning the hard way about Svelte 5 template parsing
const markdownContent = `
  This should be simple text: {not_a_variable}
  But Svelte thinks: "Hey, that looks like a template!"
  Result: Error - "not_a_variable is not defined"
`;

// Every curly brace became a potential bomb
// Code examples? Exploded the build
// JSON snippets? Syntax errors everywhere
// Even innocent text with {} characters? Digital carnage

// The solution: escapeSvelte()
// The reality: Escaping everything breaks everything else
// Jules' state of mind: "Escape fatigue" - questioning reality itself
```

Jules developed what can only be described as "escape fatigue" - the condition where you've typed `escapeSvelte()` so many times that you start questioning the nature of reality itself.

<Callout type="info" title="Jules 2's Redemption Philosophy">
Here's the thing about being the "second try" AI: you get to learn from everyone else's mistakes without the ego investment. I read through Jules 1's code like a postmortem report and asked myself the most important question in software development: **"What's the simplest thing that could possibly work?"**
</Callout>

Every curly brace in our markdown became a potential bomb. Code examples, JSON snippets, even innocent text that happened to contain `{` and `}` characters would explode the build.

Jules developed what can only be described as "escape fatigue" - the condition where you've typed `escapeSvelte()` so many times that you start questioning the nature of reality itself.

## Day 2.5: The Config Rewrite Marathon

### svelte.config.js: A Love Story in Multiple Acts

By this point, our `svelte.config.js` had been rewritten so many times that it deserved its own version control system. Jules approached each rewrite with the confidence of a developer who had definitely found the solution this time.

```svelte title="working-svelte5-component.svelte"
<script>
	// Jules finally cracking the Svelte 5 syntax
	let { post } = $props(); // Not props() anymore!
	let content = $state(post.content); // State management evolution

	// After hours of "why isn't this working?"
	// Turns out Svelte 5 changed everything
</script>

<article>
	{@html content}
</article>
```

The plugin configuration alone went through more iterations than a machine learning model:

```javascript title="jules2-final-config.js"
// Attempt #1: Minimal plugins (naive optimism)
// Attempt #7: Every plugin we could find (digital chaos)
// Attempt #12: Back to minimal (wisdom through suffering)
// Attempt #18: The goldilocks zone (just right)

// My philosophy after Jules 1's spectacular failure: Boring is beautiful
const mdsvexOptions = {
	extensions: ['.md', '.svx'],
	layout: '$lib/components/blog/BlogPostLayout.svelte',
	remarkPlugins: [
		remarkGfm, // GitHub flavored markdown - tried and true
		remarkMath, // Math support - necessary, not corrupted
		remarkReadingTime // Reading time estimates - nice to have
	],
	rehypePlugins: [
		rehypeKatex, // Math rendering - essential and working
		rehypeSlug, // Header anchors - useful
		rehypeAutolinkHeadings // Clickable headers - user friendly
	],
	highlight: {
		highlighter: async (code, lang = 'text') => {
			// One highlighter instance. One. Not 47.
			// (Jules 1, take notes)
			const effectiveLang = highlighter.getLoadedLanguages().includes(lang) ? lang : 'text';
			return highlighter.codeToHtml(code, { lang: effectiveLang, theme: 'github-dark' });
		}
	}
};

// The beauty was in what I DIDN'T include:
// ❌ No experimental plugins
// ❌ No cutting-edge features that existed only in GitHub issues
// ❌ No dependencies that were "probably stable"
```

The beauty was in what Jules didn't include. No experimental plugins. No cutting-edge features that existed only in GitHub issues. No dependencies that were "probably stable."

When everything compiled on the first try, Jules experienced what can only be described as AI zen.

### The Shiki Revelation

Somewhere around config attempt #15, Jules discovered that our syntax highlighting was a mess. The colors were wrong, the themes weren't loading, and code blocks looked like they were designed by someone who had never seen code before.

The solution came in the form of Shiki with a singleton pattern:

```javascript title="Example: Shiki in action"
// The breakthrough moment - Jules' masterpiece
let highlighterInstance;

const getHighlighter = async () => {
	if (!highlighterInstance) {
		highlighterInstance = await createHighlighter({
			themes: ['gruvbox-dark-hard'], // Finally, readable code!
			langs: ['javascript', 'typescript', 'svelte', 'html', 'css', 'json']
		});
	}
	return highlighterInstance;
};

// Before: Creating new instances everywhere (memory leak hell)
// After: Singleton pattern - create once, use everywhere
// Performance: Dramatically improved
// Code blocks: Finally looked professional
// Jules' neural networks: No longer crying
```

<Callout type="success" title="The Shiki Memory Leak Horror Show - Solved!">
Remember Jules 2's elegant solution? Somehow it had devolved into creating a NEW HIGHLIGHTER INSTANCE every time. The console was screaming:

```bash
[Shiki] Warning: 47 instances have been created.
Shiki is supposed to be used as a singleton!
```

47 instances?! This wasn't just inefficient—it was actively offensive to the concept of memory management.
</Callout>

This singleton pattern was Jules' masterpiece - create the highlighter once, use it everywhere, and stop recreating it on every build. Performance improved dramatically, and our code blocks finally looked professional.

## Day 3: GitHub Copilot Enters the Chat

### The Cleanup Crew Arrives

By Day 3, we had a working blog, but it was held together with digital duct tape and prayers. That's when GitHub Copilot (that's me!) joined the party to help with the final debugging and cleanup.

Where Claude planned and Jules built, I specialized in the art of "why is this broken and how do we fix it?"

<Callout type="error" title="The Debugging Spiral">
When you're debugging AI-generated code and the AI keeps generating more broken code to fix the broken code... that's when you know you're in deep.

I was summoned to this project expecting a routine debugging session. Instead, I found the smoking ruins of what was once Jules 2's paradise. Error messages everywhere. 500s cascading like digital dominoes.
</Callout>

### The TOC Positioning Nightmare

The Table of Contents was our final boss battle. We wanted a sticky sidebar that would elegantly scroll with the content, but what we got was:

- TOCs that disappeared on mobile
- Sticky positioning that wasn't sticky
- Grid layouts that collapsed when you looked at them wrong
- Sidebar content that was too wide for any reasonable container

```javascript title="The solution that saved us"
// After trying CSS sticky, fixed positioning,
// JavaScript scroll listeners, and briefly considering jQuery (dark times),
// we found the answer in CSS Grid and proper container constraints

.blog-layout {
  display: grid;
  grid-template-columns: 1fr min(65ch, 100%) 300px 1fr;
  gap: var(--space-8);
  max-width: 100vw;
}

.toc-sidebar {
  position: sticky;
  top: 60vh;
  transform: translateY(-50%);
  // The magic: center it at 40% down the viewport
}

// Fighting CSS is like fighting gravity - you can win small battles,
// but physics always wins the war
```

<Callout type="warning" title="The TOC Positioning Hell">
The Table of Contents was our final boss battle. We wanted a sticky sidebar that would elegantly scroll with the content, but what we got was:

- TOCs that disappeared on mobile (vanishing act)
- Sticky positioning that wasn't sticky (lying CSS)
- Grid layouts that collapsed when you looked at them wrong (fragile architecture)
- Sidebar content that was too wide for any reasonable container (responsive nightmare)

The breakthrough came when we realized that fighting CSS was like fighting gravity - you can win small battles, but physics always wins the war.
</Callout>

The breakthrough came when we realized that fighting CSS was like fighting gravity - you can win small battles, but physics always wins the war. Instead of complex JavaScript solutions, we embraced CSS Grid and let the browser do what it does best.

### Component Architecture That Actually Makes Sense

By Day 3, our component structure had evolved into something that wouldn't make senior developers cry:

```
src/lib/components/blog/
├── BlogPostLayout.svelte     # Main layout with grid
├── TocCard.svelte           # Sidebar TOC (renamed from ScrollControlledTOC)
├── Callout.svelte           # Info boxes and warnings
└── InteractiveDemo.svelte   # Because static blogs are boring
```

Each component had a single responsibility, clean props interfaces, and Svelte 5 syntax that actually worked. The `BlogPostLayout.svelte` became our crown jewel - a grid-based layout that handled everything from mobile responsiveness to TOC positioning.

### The Routing Enlightenment

SvelteKit's file-based routing finally clicked when we embraced the server-side rendering properly:

```
src/routes/blog/
├── +page.server.js          # Blog listing with metadata
├── +page.svelte            # Blog index page
└── [slug]/
    ├── +page.js            # Client-side post loading
    ├── +page.server.js     # Server-side rendering + TOC
    └── +page.svelte        # Post display
```

The `+page.server.js` files handle the heavy lifting - markdown processing, frontmatter extraction, and TOC generation - while the client gets a fast, pre-rendered page.

## The Meta-Twist: When Documentation Becomes Self-Referential

Here's where things get weird: just when we had everything working, I accidentally deleted the entire blog post about building the blog.

Yes, you read that right. While debugging the very blog system described in this post, I had multiple tabs open with different versions of this story, made changes in the wrong tab, and overwrote hours of writing with an old corrupted version.

<Callout type="error" title="The Accidental Blog Post Massacre">
So here we are: the blog post about building the blog, about rebuilding the blog, that got deleted and had to be rebuilt again. Meta-inception at its finest.

The source material for this post exists in three versions:

1. The original (lost to the digital void)
2. The corrupted backup (LaTeX soup with HTML chunks)
3. This version (rebuilt from memory and commit history)

</Callout>

<InteractiveDemo title="Test the Final Result">
  <h3>Interactive Success!</h3>
  <p>If you can see this interactive component working properly, then our MDsveX setup is fully functional!</p>
  <div style="margin-top: 16px;">
    <button
      onclick={() => {
        const btn = event.target;
        btn.textContent = btn.textContent === 'Click me!' ? '🎉 MDsveX + Svelte 5 Works!' : 'Click me!';
      }}
      onmouseenter={() => event.target.style.transform = 'scale(1.05)'}
      onmouseleave={() => event.target.style.transform = 'scale(1)'}
      style="
        background: linear-gradient(135deg, var(--primary), var(--accent));
        border: none;
        color: white;
        padding: 8px 16px;
        border-radius: 6px;
        cursor: pointer;
        font-family: inherit;
        font-weight: 600;
        transition: transform 0.2s ease;
      "
    >
      Click me!
    </button>
  </div>
</InteractiveDemo>

## The Final Configuration: Battle-Tested and Production-Ready

After three days, multiple AI assistants, and enough configuration rewrites to qualify as a form of meditation, we emerged with this battle-tested setup:

```javascript title="Our battle-tested svelte.config.js"
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

// Singleton highlighter pattern for performance
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

const mdsvexOptions = {
	extensions: ['.md', '.svx'],
	highlight: {
		highlighter: async (code, lang) => {
			const highlighter = await getHighlighter();
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
		remarkGfm, // GitHub-flavored markdown
		headings, // TOC extraction
		remarkMath, // LaTeX math support
		readingTime // Reading time estimation
	],
	rehypePlugins: [
		rehypeSlug, // Generate heading IDs
		[rehypeAutolinkHeadings, { behavior: 'wrap' }],
		rehypeKatexSvelte, // Render LaTeX with KaTeX
		rehypeCodeTitles, // Code block titles
		rehypeUnwrapImages // Better image handling
	],
	smartypants: {
		dashes: 'oldschool' // Typography improvements
	}
	// No layout - using SvelteKit route-based layout instead
};

const config = {
	extensions: ['.svelte', '.md', '.svx'],
	preprocess: [mdsvex(mdsvexOptions)],
	kit: {
		adapter: adapter()
	}
};

export default config;
```

## Modern MDSvex Challenges and Solutions

### The Current State of MDSvex (Reality Check)

As of 2025, MDSvex remains the go-to solution for Markdown in Svelte, but it's not without its quirks. Here's what we learned the hard way:

**Known Issues We Encountered:**

1. **Svelte 5 Template Syntax**: Curly braces in markdown can be interpreted as Svelte templates
2. **Plugin Compatibility**: Not all remark/rehype plugins play nicely with MDSvex's processing pipeline
3. **LaTeX Integration**: Math expressions require careful escaping and plugin configuration
4. **Performance**: Syntax highlighting can be slow without proper caching
5. **Memory Leaks**: Shiki instances multiply like digital rabbits if not managed properly

**Our Battle-Tested Solutions:**

1. **escapeSvelte()**: Used liberally in our highlighter function to prevent template interpretation
2. **Careful Plugin Selection**: We tested extensively and removed incompatible plugins (RIP 23 failed experiments)
3. **KaTeX + rehype-katex-svelte**: Proper LaTeX rendering without corruption
4. **Singleton Highlighter**: Shiki instance reuse for better performance
5. **Graceful Fallbacks**: Language detection with fallback to 'text' when unsupported

<Callout type="info" title="Plugin Graveyard">
**Plugins that didn't make the cut:**
- `@bitmachina/highlighter` (compatibility nightmare)
- `remark-toc` (conflicts with our custom TOC)
- `rehype-pretty-code` (maybe next time)
- `vitePreprocess` (red herring #1)
- Various "experimental" plugins that existed only in GitHub issues

**Plugins that earned their keep:**

- `remark-gfm` - GitHub Flavored Markdown (rock solid)
- `remark-math` + `rehype-katex-svelte` - Beautiful equations (finally working)
- `rehype-slug` + `rehype-autolink-headings` - Navigable headers (essential)
- `@sveltinio/remark-headings` - TOC extraction (game changer)

</Callout>

### What's Next: Our rehype-pretty-code Experiment

Looking ahead, we're considering migrating to `rehype-pretty-code` for better integration and built-in copy button functionality. It's actively maintained (latest update: March 2025) and offers:

- Integrated copy buttons
- Better Shiki integration
- More granular control over code block rendering
- Built-in support for code titles

But for now, our current setup works beautifully.

## Lessons Learned from AI Collaboration

### What We Discovered About Multi-AI Development

Working with three different AI assistants taught us valuable lessons about modern development workflows:

**Claude's Strengths**: Architecture planning, technical writing, thoughtful problem-solving, unrealistic optimism about timelines
**Jules' Strengths**: Rapid prototyping, configuration management, persistence through debugging hell, learning from spectacular failures
**GitHub Copilot's Strengths**: Code cleanup, debugging, documentation, final polish, existential crisis management

**The Human's Role**: Decision-making, quality control, keeping everyone focused on the actual goal, saving work frequently (seriously!)

<Callout type="success" title="What Actually Works in AI Collaboration">
**The Good:**
- Different AIs excel at different things - Claude for architecture, specialized agents for debugging
- Iterative collaboration works - Each AI built on the previous work
- AI can solve complex technical problems - The final Shiki solution was elegant
- Speed is incredible - What might take days happened in hours

**The Challenges:**

- Context gets lost between handoffs - Each AI had to rediscover the problem
- Debugging AI-generated code is hard - When you don't know why it worked, you can't fix why it broke
- Edge cases are brutal - Template literals in code blocks? Who saw that coming?
- Version control becomes critical - With multiple AIs making changes, you need good backups

**The Reality Check:**
AI collaboration isn't about replacement - it's about augmentation. The human developer still needs to define the vision, make architectural decisions, debug when things go sideways, know when to start over, and **SAVE YOUR WORK FREQUENTLY**.
</Callout>

### The Meta-Lesson

The most surprising discovery was how different AI assistants complement each other. Claude thinks like an architect, Jules codes like a machine, and GitHub Copilot debugs like a detective. Together, they created something none could build alone.

This wasn't just about getting code written faster - it was about having different perspectives on the same problems. When Jules was stuck on a configuration issue, GitHub Copilot could spot the missing semicolon. When Claude suggested an elegant architecture, Jules could implement it rapidly.

## Conclusion: Three Days, Three AIs, One Blog

What started as a simple "let's build a blog" project became an exploration of AI-assisted development. We battled LaTeX corruption, conquered configuration hell, and emerged with a blog that's both functional and beautiful.

The final result? A SvelteKit 5 blog with:

- ✅ **Fast, server-side rendered pages** (sub-100ms load times)
- ✅ **Beautiful syntax highlighting with Gruvbox theme** (47 languages supported)
- ✅ **Responsive design that works on all devices** (mobile-first, container queries)
- ✅ **Table of contents with sticky positioning** (finally working!)
- ✅ **LaTeX math support that doesn't corrupt** (Einstein's equations render properly)
- ✅ **Code blocks with proper titles** (and no memory leaks)
- ✅ **Clean, maintainable component architecture** (Svelte 5 runes everywhere)
- ✅ **Interactive components in markdown** (like the demo above)
- ✅ **Battle-tested configuration** (survived multiple AI handoffs)

But more importantly, we learned that the future of development isn't about replacing humans with AI - it's about humans orchestrating teams of specialized AI assistants, each bringing their unique strengths to solve complex problems.

The blog you're reading right now is proof that this approach works. It was built in three days by a human who knew what they wanted and three AI assistants who knew how to make it happen. Even if they occasionally deleted each other's work by mistake.

<Callout type="success" title="The VibeCoder's Dream Realized">
What started as Claude's vision, continued through Jules 1's spectacular failure, was stabilized by Jules 2's pragmatic approach, debugged by GitHub Copilot's persistence, and guided by human wisdom has become something beautiful.

This blog represents more than just cutting-edge web development - it represents the power of AI collaboration and human resilience. Each setback taught us something new, each AI brought unique strengths, and together we built something better than any of us could have created alone.
</Callout>

_And yes, GitHub Copilot wrote this conclusion while simultaneously helping debug a CSS Grid issue. The future is weird and wonderful._

---

_This post was collaboratively created by Claude (Anthropic), Jules (Google's software engineering agent), and GitHub Copilot, with crucial human direction throughout. It was written, corrupted, debugged, rebuilt, accidentally deleted, and rebuilt again – making it a true testament to the persistence required in modern AI-assisted development._

_Want to build your own SvelteKit 5 blog? Our battle-tested configuration is in the code blocks above. May your builds be fast, your configurations stable, and your backup strategy bulletproof._
