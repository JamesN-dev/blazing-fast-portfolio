---
title: 'Hello World'
date: '2025-06-17'
tags: ['svelte', 'mdsvex', 'testing']
description: 'Testing Svelte and MDsveX setup with some initial thoughts.'
---

<script>
  // This script block is optional in MDsveX files but can be used
  // to import components or run Svelte logic specific to this post.
  import Callout from '$lib/components/blog/Callout.svelte';
</script>

## Introduction

Welcome to this very first sample post! The purpose of this document is to test out the basic Markdown rendering capabilities of our new MDsveX setup with SvelteKit. We'll explore a few common Markdown elements and see how they appear.

This blog will eventually be full of amazing content, but for now, let's ensure the plumbing works!

## Core Technologies

We are leveraging some fantastic tools here:

1.  **SvelteKit**: For the overall application structure, routing, and server-side capabilities.
2.  **MDsveX**: To allow writing content in Markdown while seamlessly integrating Svelte components.
3.  **Shiki**: For beautiful syntax highlighting in our code blocks.
4.  **KaTeX**: To render mathematical notations.

<Callout type="info" title="Plugin Power!">
  A host of `remark` and `rehype` plugins are also working behind the scenes to make features like table of contents, slugged headings, and GFM tables possible.
</Callout>

<div class="feature-box">
  <h3>🚀 Cool New Features</h3>
  <p>This blog showcases some sick modern styling:</p>
  <ul>
    <li>Gradient headings with cyan highlights</li>
    <li>Glassmorphism effects and backdrop blur</li>
    <li>Hover animations that actually feel good</li>
    <li>Tech badges like the homepage</li>
  </ul>
</div>

### Tech Stack Badges

<span class="tech-badge">SvelteKit</span>
<span class="tech-badge">MDsveX</span>
<span class="tech-badge">TypeScript</span>
<span class="tech-badge">Shiki</span>
<span class="tech-badge">KaTeX</span>
<span class="tech-badge">CSS Grid</span>

<div class="info-panel success">
  <strong>Pro Tip:</strong> All these badges are interactive and match the homepage design!
</div>

## Markdown Features Test

Let's try out a few things.

### Code Blocks

Here's a simple JavaScript snippet that should be highlighted by Shiki:

```javascript title="Example: console.log"
function greet(name) {
	console.log('Hello, ' + name + '! Welcome to the MDsveX world.');
}

greet('Developer');
```

### Lists

**Unordered Lists:**

- Unordered item 1
  - Nested item A
  - Nested item B
- Unordered item 2

**Ordered Lists:**

1. Ordered item 1
   1. Nested ordered item i
   2. Nested ordered item ii
2. Ordered item 2

### Blockquotes

> This is a blockquote. It should stand out from the regular text and provide some emphasis or citation. It can span multiple lines.

## Math Equations

Let's test an inline equation like $ax^2 + bx + c = 0$. And a block equation:

$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$

Conclusion
This post serves as a basic test. If you're seeing this rendered correctly, with a table of contents, syntax highlighting, and styled elements, then things are looking good!

The next step will be to create a more comprehensive showcase post that dives deeper into all the features.

Happy Coding!
