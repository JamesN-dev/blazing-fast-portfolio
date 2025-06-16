---
title: 'My First Awesome Post: Exploring Svelte and MDsveX'
date: '2024-07-25' # Earlier date than showcase post
tags: ['svelte', 'mdsvex', 'testing', 'tutorial']
description: 'A quick look into setting up a Svelte project with MDsveX and some initial thoughts.'
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

## Markdown Features Test

Let's try out a few things.

### Code Blocks

Here's a simple JavaScript snippet that should be highlighted by Shiki:

```javascript title="Example: console.log"
function greet(name) {
  console.log(`Hello, ${name}! Welcome to the MDsveX world.`);
}

greet('Developer');
And a Svelte component example:

<script>
  let count = $state(0);
</script>

<button on:click={() => count++}>
  Clicked: {count}
</button>

<style>
  button {
    background-color: var(--primary);
    color: white;
    padding: 0.5em 1em;
    border-radius: 5px;
  }
</style>
```

Lists
Unordered item 1
Nested item A
Nested item B
Unordered item 2
Ordered item 1
Nested ordered item i
Nested ordered item ii
Ordered item 2
Blockquotes
This is a blockquote. It should stand out from the regular text and provide some emphasis or citation. It can span multiple lines.

Math Equations
Let's test an inline equation like $ax^2 + bx + c = 0$. And a block equation: $$ \sum\_{i=1}^{n} i = \frac{n(n+1)}{2} $$

Conclusion
This post serves as a basic test. If you're seeing this rendered correctly, with a table of contents, syntax highlighting, and styled elements, then things are looking good!

The next step will be to create a more comprehensive showcase post that dives deeper into all the features.

Happy Coding!
