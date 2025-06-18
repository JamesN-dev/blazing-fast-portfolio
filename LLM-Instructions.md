# Blazing Fast Portfolio - Project Overview

## Project Description
A modern, high-performance portfolio website built with SvelteKit 5. Features a cyberpunk-inspired dark theme with interactive elements, floating skills animations, and a clean MDsveX blog system.

## Tech Stack
- **SvelteKit 5** (latest version using runes)
- **MDsveX** for blog posts (Markdown + Svelte components)
- **Vercel** for deployment
- **Resend** for contact form emails
- **Svelte Sonner** for toast notifications
- **Lucide Svelte** for icons

## Key Design Principles

### 1. RAM Grid System
We use a custom "RAM" grid pattern throughout the project instead of traditional media queries:
```css
.ram-articles {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--space-6);
}
```

### 2. Container Queries Only
- **NO MEDIA QUERIES** - We use container queries exclusively
- Set `container-type: inline-size` on parent containers
- Use `@container (max-width: 800px)` instead of `@media`

### 3. No TypeScript
- All files are vanilla JavaScript/Svelte
- Remove `lang="ts"` from any script tags
- Keep it simple and fast

### 4. No `!important` Rules
- **NEVER USE `!important`** - if you see it, make a plan to remove it
- Use proper CSS specificity and component scoping instead
- Clean, maintainable CSS only

## Project Structure

### Pages
- `/` - Homepage with floating skills animation
- `/about` - About page 
- `/work` - Portfolio/work showcase
- `/blog` - Blog index (uses RAM grid)
- `/blog/[slug]` - Individual blog posts
- `/contact` - Contact form with Resend integration

### Components
- `src/lib/components/` - Reusable components
- `src/lib/components/blog/` - Blog-specific components
- `src/lib/posts/` - MDsveX blog posts (.md files)

### Styling
- `src/lib/styles/global.css` - Global styles and RAM grid definitions
- Component-scoped styles in `<style>` blocks
- CSS custom properties for theming

## Blog System (MDsveX)

### File Structure
- Blog posts: `src/lib/posts/*.md`
- Uses `import.meta.glob()` for dynamic imports (Vite compatible)
- Frontmatter for metadata (title, date, description, tags)

### Key Files
- `src/routes/blog/+page.server.js` - Blog index data loading
- `src/routes/blog/[slug]/+page.server.js` - Individual post loading
- `src/lib/components/blog/BlogPostLayout.svelte` - Post layout wrapper

### Known Issues Fixed
- ✅ Path resolution between `$lib/posts/` and `/src/lib/posts/`
- ✅ Removed conflicting `blog.css` file
- ✅ Fixed hydration flashes with component-scoped CSS
- ✅ Added shimmer effects to tags

## Design System

### Colors (Gruvbox-inspired)
- `--color-text` - Main text color
- `--description` - Secondary text
- `--accent` - Cyan accent color
- `--primary` - Teal primary color
- `--background` - Dark background

### Animations
- Floating skills with physics on homepage
- Shimmer effects on tags and buttons
- Smooth hover transitions
- No excessive animations - keep it performant

## Development Guidelines

### CSS Architecture
1. Use RAM grid system for layouts
2. Container queries for responsiveness  
3. Component-scoped styles when possible
4. Global styles only for shared patterns
5. CSS custom properties for consistency

### Component Patterns
- Svelte 5 runes (`$state`, `$derived`, `$props`)
- Clean, semantic HTML
- Accessibility considerations
- Performance-first approach

### Contact Form
- Uses SvelteKit form actions
- Resend for email delivery
- Proper validation and error handling
- Toast notifications for feedback

## Getting Help

### Svelte Documentation
If you get stuck with Svelte 5 specific syntax or features, use the `svelte-llm` MCP:
```
Use mcp__svelte-llm__list_sections to see available docs
Use mcp__svelte-llm__get_documentation with section names
```

### Common Patterns
- Grid layouts: Use existing RAM classes from `global.css`
- Responsive design: Container queries, not media queries
- State management: Svelte 5 runes
- Styling: Component-scoped, no external CSS files

## Recent Major Changes
- Removed problematic `blog.css` file (704 lines of conflicts)
- Fixed contact page layout with grid areas instead of order
- Cleaned up all `!important` rules
- Migrated from media queries to container queries
- Added shimmer effects back to blog tags

## Performance Notes
- Lightweight and fast loading
- Minimal JavaScript bundle
- Optimized images and assets
- Clean CSS without bloat
- MDsveX for static blog generation

---

Remember: Keep it simple, performant, and maintainable. The design is intentionally clean and focused on content and user experience.