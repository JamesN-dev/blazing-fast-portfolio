import { error } from '@sveltejs/kit';
import { basename } from 'path';
// Dynamically import all .md files from both main and archived posts directories
const mainModules = import.meta.glob('/src/lib/posts/*.md', { eager: true });
const archivedModules = import.meta.glob('/src/lib/posts/archived/*.md', { eager: true });
const modules = { ...mainModules, ...archivedModules };

export async function load({ params }) {
	const { slug } = params;

	// TEMPORARY: Trigger 500 error for testing
	if (slug === 'test-500') {
		throw new Error('This is a test 500 error!');
	}

	// Try possible path formats in both main and archived directories
	const possiblePaths = [
		`/src/lib/posts/${slug}.md`,
		`$lib/posts/${slug}.md`,
		`/src/lib/posts/archived/${slug}.md`,
		`$lib/posts/archived/${slug}.md`
	];

	let postModule;
	let foundPath;

	for (const path of possiblePaths) {
		if (modules[path]) {
			postModule = modules[path];
			foundPath = path;
			break;
		}
	}

	if (!postModule) {
		error(404, {
			message: `Blog post not found: ${slug}`,
			details: `Tried paths: ${possiblePaths.join(', ')}. Available: ${Object.keys(modules).join(', ')}`
		});
	}

	if (!postModule.default) {
		console.error(`Module or default export not found for ${foundPath}`);
		error(500, {
			message: 'Error loading blog post content.',
			details: `Could not retrieve default export (the Svelte component) from ${foundPath}.`
		});
	}

	const { metadata } = postModule;

	if (!metadata) {
		console.warn(`Metadata not found for post: ${slug}`);
	}

	const frontmatter = metadata || {}; // Fallback if metadata is somehow missing

	// Check if the post is unpublished (but allow archived posts)
	if (frontmatter.published === false) {
		error(404, {
			message: `Blog post not found: ${slug}`,
			details: `This post is unpublished.`
		});
	}

	// Ensure essential frontmatter for SEO and display
	const title = frontmatter.title || 'Untitled Post';
	const description = frontmatter.description || 'No description available.';
	const date = frontmatter.date || new Date().toISOString().split('T')[0];
	const tags = frontmatter.tags || [];
	const featuredImage = frontmatter.featuredImage || null; // For social media sharing

	// Reading time is often added to metadata by remark-reading-time plugin
	const readingTime = frontmatter.readingTime?.text || frontmatter.readingTime || 'N/A';

	// Table of Contents (ToC)
	// @sveltinio/remark-headings adds `headings` to the metadata.
	// Convert to the format expected by BlogPostLayout: {id: string, text: string, level: number}[]
	const headings = frontmatter.headings || [];

	// Transform the nested structure to flat array for TOC sidebar
	const flattenHeadings = (headingsArray, result = []) => {
		headingsArray.forEach(heading => {
			result.push({
				id: heading.id,
				text: heading.value,
				level: heading.depth
			});
			if (heading.children) {
				flattenHeadings(heading.children, result);
			}
		});
		return result;
	};

	const toc = flattenHeadings(headings);
	console.log('TOC data for', slug, ':', toc);


	return {
		slug,
		// Don't return the component directly - it's not serializable
		// The component will be loaded client-side in +page.js
		frontmatter: { // Pass all frontmatter for flexibility in the layout/page
			...frontmatter, // spread existing frontmatter
			title, // ensure title is set
			description, // ensure description is set
			date,
			tags,
			featuredImage,
			readingTime,
		},
		toc, // Pass the ToC data to the page
		meta: { // For SEO tags specifically
			title: `${title} | Blog`,
			description: description,
			// canonical: `https://yourdomain.com/blog/${slug}`, // Example
			// ogImage: featuredImage || 'https://yourdomain.com/default-og-image.png' // Example
		}
	};
}

// This function can be used by SvelteKit to determine which dynamic routes to prerender
// if you enable prerendering for this route.
export async function entries() {
	const postSlugs = [];

	Object.entries(modules).forEach(([path, module]) => {
		const slug = basename(path, '.md');
		const metadata = module.metadata || {};

		// Only include published, non-archived posts for prerendering
		if (metadata.published !== false && metadata.archived !== true) {
			postSlugs.push({ slug });
		}
	});

	return postSlugs;
}
