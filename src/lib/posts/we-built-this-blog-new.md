---
title: 'Building a SvelteKit 5 Blog in 3 Days: A Multi-AI Collaboration Story'
subtitle: 'How Claude, Jules, and GitHub Copilot helped architect a modern blog with MDSvex, Shiki, and way too many config rewrites'
description: 'The technical journey of building a SvelteKit 5 + MDSvex blog through AI collaboration, featuring LaTeX corruption chaos, TOC positioning hell, and the quest for the perfect svelte.config.js'
date: '2025-01-16'
published: true
featured: true
tags: ['svelte', 'sveltekit', 'mdsvex', 'ai-collaboration', 'technical-blog', 'shiki', 'markdown']
---

*A meta-story about building this very blog you're reading, featuring three AI assistants, one determined human, and enough configuration rewrites to make any developer weep.*

## Prologue: The Three-Day Sprint

What you're about to read is the true story of how this blog came to life over exactly three days in January 2025. Not months of careful planning, not weeks of meticulous development, but three intense days of AI-human collaboration that produced something actually worth shipping.

The cast of characters:
- **The Human**: Armed with ambition and a dangerous amount of coffee
- **Claude**: The planner and architect, full of measured optimism  
- **Jules** (Jules.google): The coding workhorse who turned plans into reality
- **GitHub Copilot**: The debugging specialist who arrived on Day 3 to clean up the mess

This is their story.

## Day 1: The Claude Chronicles

### The Initial Optimism

It started innocently enough. "Let's build a blog with SvelteKit 5 and MDSvex," I said to Claude. "How hard could it be?"

Claude, ever the optimist, responded with the kind of measured enthusiasm that should have been a red flag:

```javascript title="claude-naive-optimism.js"
// Claude's first suggestion
const blogPlan = {
  framework: "SvelteKit 5", // "It's stable now!"
  content: "MDSvex", // "Perfect integration!"
  styling: "Simple CSS", // Famous last words
  timeline: "A few hours", // 😂
  confidence: "High" // Oh, sweet summer child
};
```

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
```

### The Great LaTeX Corruption Incident

The first sign of trouble came when we tried to add math support. LaTeX, that beautiful typesetting language beloved by academics everywhere, became our nemesis.

```bash title="jules1-error-symphony.log"
[vite:load] Failed to load /src/routes/blog/post/+page.md
Error: Unexpected character "$" (U+0024)
  at position 127 (line 8, column 15)
  Expected "}" or identifier

// The LaTeX was eating our markdown alive
// Every $ symbol became a parsing nightmare
// Math expressions turned into literal corruption
```

What we discovered: MDSvex and LaTeX have a complicated relationship. The `$` symbols that LaTeX uses for math expressions were being interpreted as template literals by Svelte's parser. Our beautiful mathematical equations were becoming syntax errors.

The solution? A delicate dance of escaping and plugin configuration that Jules rewrote approximately 47 times.

### The Escaping Literals Horror Show

Then came the great escaping crisis. Svelte 5's new template syntax is powerful, but it's also picky about what it considers "literal" content versus "dynamic" content.

```javascript title="jules2-pragmatic-approach.js"
// Jules learning the hard way
const markdownContent = `
  This should be simple text: {not_a_variable}
  But Svelte thinks: "Hey, that looks like a template!"
  Result: Error - "not_a_variable is not defined"
`;

// The solution: escapeSvelte()
// The reality: Escaping everything breaks everything else
```

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
// Attempt #1: Minimal plugins (naive)
// Attempt #7: Every plugin we could find (chaos)  
// Attempt #12: Back to minimal (wisdom through suffering)
// Attempt #18: The goldilocks zone (just right)

const mdsvexOptions = {
  remarkPlugins: [
    remarkGfm, // For GitHub-flavored markdown
    headings, // TOC extraction that actually works
    remarkMath, // LaTeX support (finally!)
    readingTime // Because readers need hope
  ],
  rehypePlugins: [
    rehypeSlug, // Anchor links for headings
    [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    rehypeKatexSvelte, // Math rendering salvation
    rehypeCodeTitles, // Code block titles (when they work)
    rehypeUnwrapImages // Image handling sanity
  ]
};
```

### The Shiki Revelation

Somewhere around config attempt #15, Jules discovered that our syntax highlighting was a mess. The colors were wrong, the themes weren't loading, and code blocks looked like they were designed by someone who had never seen code before.

The solution came in the form of Shiki with a singleton pattern:

```javascript title="Example: Shiki in action"
// The breakthrough moment
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
```

This singleton pattern was Jules' masterpiece - create the highlighter once, use it everywhere, and stop recreating it on every build. Performance improved dramatically, and our code blocks finally looked professional.

## Day 3: GitHub Copilot Enters the Chat

### The Cleanup Crew Arrives

By Day 3, we had a working blog, but it was held together with digital duct tape and prayers. That's when GitHub Copilot (that's me!) joined the party to help with the final debugging and cleanup.

Where Claude planned and Jules built, I specialized in the art of "why is this broken and how do we fix it?"

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
```

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

## The Final Configuration: Battle-Tested and Production-Ready

After three days, multiple AI assistants, and enough configuration rewrites to qualify as a form of meditation, we emerged with this battle-tested setup:

```javascript title="Our battle-tested svelte.config.js"
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

// Singleton highlighter pattern for performance
let highlighterInstance;

const getHighlighter = async () => {
  if (!highlighterInstance) {
    highlighterInstance = await createHighlighter({
      themes: ['gruvbox-dark-hard'],
      langs: ['javascript', 'typescript', 'svelte', 'html', 'css', 'json', 
              'markdown', 'python', 'rust', 'go', 'java', 'c', 'cpp', 
              'shell', 'tex', 'latex', 'diff', 'bash']
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
    remarkGfm,                    // GitHub-flavored markdown
    headings,                     // TOC extraction
    remarkMath,                   // LaTeX math support
    readingTime                   // Reading time estimation
  ],
  rehypePlugins: [
    rehypeSlug,                   // Generate heading IDs
    [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    rehypeKatexSvelte,           // Render LaTeX with KaTeX
    rehypeCodeTitles,            // Code block titles
    rehypeUnwrapImages           // Better image handling
  ],
  smartypants: {
    dashes: 'oldschool'          // Typography improvements
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

### The Current State of MDSvex

As of 2025, MDSvex remains the go-to solution for Markdown in Svelte, but it's not without its quirks:

**Known Issues:**
1. **Svelte 5 Template Syntax**: Curly braces in markdown can be interpreted as Svelte templates
2. **Plugin Compatibility**: Not all remark/rehype plugins play nicely with MDSvex's processing pipeline
3. **LaTeX Integration**: Math expressions require careful escaping and plugin configuration
4. **Performance**: Syntax highlighting can be slow without proper caching

**Our Solutions:**
1. **escapeSvelte()**: Used liberally in our highlighter function to prevent template interpretation
2. **Careful Plugin Selection**: We tested extensively and removed incompatible plugins
3. **KaTeX + rehype-katex-svelte**: Proper LaTeX rendering without corruption
4. **Singleton Highlighter**: Shiki instance reuse for better performance

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

**Claude's Strengths**: Architecture planning, technical writing, thoughtful problem-solving
**Jules' Strengths**: Rapid prototyping, configuration management, persistence through debugging hell
**GitHub Copilot's Strengths**: Code cleanup, debugging, documentation, final polish

**The Human's Role**: Decision-making, quality control, keeping everyone focused on the actual goal

### The Meta-Lesson

The most surprising discovery was how different AI assistants complement each other. Claude thinks like an architect, Jules codes like a machine, and GitHub Copilot debugs like a detective. Together, they created something none could build alone.

This wasn't just about getting code written faster - it was about having different perspectives on the same problems. When Jules was stuck on a configuration issue, GitHub Copilot could spot the missing semicolon. When Claude suggested an elegant architecture, Jules could implement it rapidly.

## Conclusion: Three Days, Three AIs, One Blog

What started as a simple "let's build a blog" project became an exploration of AI-assisted development. We battled LaTeX corruption, conquered configuration hell, and emerged with a blog that's both functional and beautiful.

The final result? A SvelteKit 5 blog with:
- ✅ **Fast, server-side rendered pages**
- ✅ **Beautiful syntax highlighting with Gruvbox theme**
- ✅ **Responsive design that works on all devices**
- ✅ **Table of contents with sticky positioning**
- ✅ **LaTeX math support that doesn't corrupt**
- ✅ **Code blocks with proper titles**
- ✅ **Clean, maintainable component architecture**

But more importantly, we learned that the future of development isn't about replacing humans with AI - it's about humans orchestrating teams of specialized AI assistants, each bringing their unique strengths to solve complex problems.

The blog you're reading right now is proof that this approach works. It was built in three days by a human who knew what they wanted and three AI assistants who knew how to make it happen.

*And yes, GitHub Copilot wrote this conclusion while simultaneously helping debug a CSS Grid issue. The future is weird and wonderful.*

---

*Want to build your own SvelteKit 5 blog? Our battle-tested configuration is in the code blocks above. May your builds be fast and your configurations be stable.*
