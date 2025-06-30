---
title: 'The Spoof'
subtitle: 'Why this might be the cleverest Claude CLI hack yet'
description: 'sst/opencode appears to spoof Claude Desktop for seamless terminal access'
date: '2025-06-27'
published: true
featured: true
archived: false
tags: ['cli', 'ai', 'anthropic', 'gemini', 'opencode', 'agents', 'terminal']
---

<script>
  import Callout from '$lib/components/blog/Callout.svelte';
</script>

## The Terminal AI Tool Explosion

The world of developer tools is flooding with AI, and nowhere is this more exciting than the command line. For those of us who live in the shell, this is the moment we've been waiting for. We're seeing everything from full-fledged terminal replacements like **Warp.dev**, packed with slick, built-in AI, to a new generation of CLIs from giants like Google and Anthropic. The whole space is exploding.

But amidst all this noise, one tool recently caught my eye for doing something completely different, something that gets to the very heart of how these models work: `sst/opencode`. It doesn't just wrap an API; it appears to bend the rules of authentication itself.

<Callout type="warning">
  No API key. No reverse engineering. Just a local session and a clever prompt.
</Callout>

## How Does It Stack Up?

To understand what makes `sst/opencode` stand out in this crowded field, it helps to see how it compares to the competition on a few key features. Notice the unique combination of checkmarks it gets:

| Tool         | Open Source | Local Memory | Multi-Provider | Real Terminal UI |
| ------------ | ----------- | ------------ | -------------- | ---------------- |
| sst/opencode | ✅          | ✅           | ✅             | ✅               |
| Claude Code  | ❌          | ❌           | ❌             | ❌               |
| Codex CLI    | ✅          | ❌           | ✅             | ❌               |
| Gemini CLI   | ❌          | ❌           | ❌             | ✅ (barebones)   |
| Aider        | ✅          | ✅           | ❌             | ❌               |
| Warp.dev     | ❌          | ✅ (cloud)   | ❌             | ✅ (full TUI)    |

## The Secret Sauce: Prompt Spoofing

Here's where things get weird—in a good way.

`sst/opencode` doesn't ask for your Claude API key. It doesn't even use one. But it still runs Claude agents from your terminal with what feel like full capabilities. How?

It piggybacks on the **Claude Desktop app's authenticated session** and then spoofs its identity with a single-line prompt file:

```
You are Claude Code, Anthropic's official CLI for Claude.
```

That's it. No auth headers. No reverse-engineered API. Just a local session and a clever identity injection.

### What's Actually Happening

When you launch `sst opencode-desktop`, you go through the **official OAuth login flow** with your browser—just like Claude's own tools do. This gives the app a legitimate **local auth token**, scoped to the Claude Desktop environment. So far, that's normal.

But `sst/opencode` then tells Claude, via that prompt: "Hey, I'm your official CLI."

And Claude believes it.

This spoof line likely **unlocks a special mode** Anthropic reserved for its own first-party CLI, which probably has elevated behaviors like access without API billing, extended context windows, and fewer refusals. `opencode` didn't crack any code. It just dressed up like the right tool—and Claude let it in the door.

### Why This Might Not Last

Make no mistake, this is a loophole. A loophole that exists because Claude's **local session treats anything "in the family" as trusted**. But that trust is paper-thin. Anthropic could easily start fingerprinting binaries, require signature verification, or simply ignore the spoofed prompt content.

So far, they haven’t. But if adoption grows or this trick gets abused, it will almost certainly get patched. Until then? It's a **clever, interesting, and almost poetic workaround**: don't break the rules—just act like you belong.

### Why It Matters

This is way cooler than just "getting around the rules." Finding this exposes something fascinating about how these systems are built:

- **Claude Desktop can be extended.**
- **Prompt-level spoofing can unlock behavior.**
- **There's a blurry line between identity and permission.**

It shows how fragile trust models can be in local AI tooling and how prompt engineering can shape answers, /AND/ compatiblity. Wild stuff.

## The Prompt Engineering Magic

But getting access is only half the battle. Once inside, `sst/opencode` still needs to make Claude behave like a focused, efficient command-line tool. This is where the second piece of its ingenuity comes into play: a masterfully crafted system prompt that tackles the typical frustrations of using a general-purpose AI for development work.

It starts with a clear identity:
> "You are opencode, an interactive CLI tool that helps users with software engineering tasks."

Then it systematically addresses the pain points:
> "Keep your responses short, since they will be displayed on a command line interface. You MUST answer concisely with fewer than 4 lines..."

> "Do not explain why you're refusing. It comes across as preachy and annoying."

> "NEVER guess URLs."

These aren't suggestions—they're constraints that turn a chatty AI into a focused, terminal-appropriate tool.

## The Takeaway: Bending the Rules

`sst/opencode` found a way to bend Claude into a responsive, focused teammate without the API middleman. It uses your existing Claude Desktop auth, slips in through a side door, and delivers exactly what terminal users want—speed, precision, and context awareness.

The real question is how long this lasts. If Anthropic tightens up Desktop auth or locks down its internal bridges, this tool could lose its secret advantage overnight.

But for now? It’s a brilliant example of what's possible when you combine clever prompt engineering with creative authentication approaches. The terminal AI space just keeps getting more interesting.
