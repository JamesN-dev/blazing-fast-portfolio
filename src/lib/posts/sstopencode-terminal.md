---
title: 'The Spoof'
subtitle: 'Why this might be the cleverest Claude CLI hack yet'
description: 'sst opencode appears to spoof Claude Desktop for seamless terminal access'
date: '2025-06-25'
published: true
featured: true
archived: false
tags: ['cli', 'ai', 'openai', 'anthropic', 'gemini', 'opencode', 'agents', 'scrollscribe']
---

<script>
  import Callout from '$lib/components/blog/Callout.svelte';
</script>

## The Terminal AI Tool Explosion


Any time i get to spend inside the terminal is when im happy. Claude Code, Codex CLI, Gemini CLI—even tried the new Google Gemini CLI today (getting rate limited to hell, but hey, first release, has potential). The whole space is exploding and it's fucking exciting.

Lately I've been working on a side project called **ScrollScribe**, a command-line ML toolkit for running structured evals, chaining LLMs together, web scraper, and more.
Of course theres always some shiny new dev toys that catch my attention. I figure as long as i'm using it to build something. Recently that was Warp.dev—wild stuff. Not perfect, but it's technically a terminal emulator packed with baked-in AI tooling and slick UX. Maybe a little too much flash for my taste, but undeniably cool.

What's wild right now is how fast the dev world is flooding with shiny new AI tooling—everyone building their own next-level take on the workflow. But the part that actually makes me happy? A lot of that energy is finally landing back in the terminal. Not just another web IDE wrapper. Real, local, terminal-first tools made by and for people who actually live in the shell.

<Callout type="warning">
  No API key. No reverse engineering. Just a local session and a clever prompt.
</Callout>

## Quick Feature Comparison

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

sst/opencode doesn't ask for your Claude API key. It doesn't even use one. But it still runs Claude agents from your terminal with full capabilities.

How?

Because it piggybacks on the **Claude Desktop app's authenticated session**—**then spoofs its identity** with a single-line prompt file:

```
You are Claude Code, Anthropic's official CLI for Claude.
```

That's it. No auth headers. No reverse-engineered API. Just a local session and a clever identity injection.

### What's Actually Happening

When you launch `sst opencode-desktop`, you go through the **official OAuth login flow** with your browser—just like Claude Code does. That gives the app a legit **local auth token**, scoped to the Claude Desktop environment.

So far, that's normal. Anthropic expects their desktop clients to work this way.

But sst/opencode then tells Claude, via prompt:

"Hey, I'm your official CLI."

And Claude believes it.

That spoof line likely **unlocks a special mode** Anthropic reserved for Claude Code—their own first-party CLI, which probably has elevated behavior like:

- **Access without billing via API key**
- **Extended prompt token windows**
- **Agent-like capabilities**
- **Less naggy refusal behavior**

Opencode didn't crack any code. It just dressed up like the right tool—and Claude let it in.

That's why it works _only_ in desktop mode. It's not calling the Anthropic cloud API—it's interfacing with the **same local socket Claude Desktop uses**. That's where the trust boundary ends. Anything inside that session is assumed to be safe.

### Why This Might Not Last

This is a loophole—one that exists because Claude's **local session treats anything "in the family" as trusted**. But that trust is paper-thin:

- Anthropic could easily start fingerprinting binaries or session origins
- They could hash the CLI binary and require signature verification
- They could change Claude Desktop to ignore spoofed prompt content
- They could revoke local CLI support entirely and go API-only

So far, they haven't. But if opencode adoption grows or people start abusing this trick, it'll almost certainly get patched.

Until then? It's a **clever, almost poetic workaround**: don't break the rules—just act like you belong.

### Why It Matters

This isn't about "getting around the rules." It's about exposing something fascinating:

- **Claude Desktop can be extended**
- **Prompt-level spoofing can unlock behavior**
- **There's a blurry line between identity and permission**

It shows how fragile trust models can be in local AI tooling—and how prompt engineering doesn't just shape answers… it shapes capability.

## The Prompt Engineering Magic

The backbone system prompt in `anthropic.txt` is equally clever. It systematically shapes Claude's behavior for terminal use:

> "You are opencode, an interactive CLI tool that helps users with software engineering tasks."

Clear identity framing. Then it tackles the usual issues:

> "Keep your responses short, since they will be displayed on a command line interface. You MUST answer concisely with fewer than 4 lines..."

> "Do not explain why you're refusing. It comes across as preachy and annoying."

> "NEVER guess URLs."

These aren't suggestions—they're constraints that turn Claude into a focused, terminal-appropriate tool. The prompt understands the pain points of using Claude for dev work and tackles them head-on.

## Real-World Usage

Here's how it works in practice with ScrollScribe:

```bash
# I typed:
write pytest tests for src/parser.py
```

It read the file, generated a clean test suite, and showed me a diff. Not a blob of copied text. A file operation with approval flow.

```bash
opencode chat --provider=claude --persist
```

That `--persist` flag stores session memory locally in SQLite so Claude remembers previous messages, code, and diffs without needing cloud memory.

## Why This Matters

sst/opencode found a way to bend Claude into a responsive, focused teammate without the API middleman. It uses your existing Claude Desktop auth, slips in through what appears to be a side door, and delivers exactly what terminal users want—speed, precision, context awareness.

The real question is how long this lasts. If Anthropic tightens up Desktop auth or locks down Claude Code's bridge, opencode could lose its secret advantage overnight.

But for now? It's showing us what's possible when you combine clever prompt engineering with creative authentication approaches. The terminal AI space keeps getting more interesting.
