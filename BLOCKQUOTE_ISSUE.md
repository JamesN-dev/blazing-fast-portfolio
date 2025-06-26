# Blockquote Styling Issue

## Problem
The blockquote styles in blog posts are not being applied correctly. Despite having CSS rules in `src/lib/components/blog/BlogPostLayout.svelte` (lines 447-457), the markdown `>` quote blocks in blog posts are rendering with default browser styling instead of the custom styles.

## Expected Behavior
Blockquotes should render with:
- 3px left border in primary color
- Small padding (`var(--space-2)`)
- Reduced margins (`var(--space-3) 0`)
- 0.75rem font size (25% smaller than normal text)
- Light background with rounded corners

## Current Behavior
Blockquotes are rendering with large default browser styling, making them too prominent compared to the rest of the content.

## Investigation Needed
1. Check if the CSS selector `.main-content :global(blockquote)` is matching the actual HTML structure
2. Verify MDSvex is properly converting `>` markdown to `<blockquote>` elements
3. Check for CSS specificity conflicts or other styles overriding the blockquote rules
4. Inspect the actual DOM structure in browser dev tools to see what classes/selectors are needed

## Files Involved
- `src/lib/components/blog/BlogPostLayout.svelte` (lines 447-457)
- `src/lib/posts/sstopencode-terminal.md` (contains multiple `>` quote blocks for testing)

## Test Case
The blog post `sstopencode-terminal.md` has multiple quote blocks that can be used to verify the fix is working.