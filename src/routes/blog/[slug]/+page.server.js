import { error } from '@sveltejs/kit';
import { basename } from 'path';
// Dynamically import all .md files from the posts directory
// The `eager: true` option ensures that the modules are imported immediately,
// and their content is available synchronously.
const modules = import.meta.glob('$lib/posts/*.md', { eager: true });

export async function load({ params }) {
	const { slug } = params;

	// Try both possible path formats that Vite might generate
	const possiblePaths = [
		`$lib/posts/${slug}.md`,
		`/src/lib/posts/${slug}.md`
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

	// Ensure essential frontmatter for SEO and display
	const title = frontmatter.title || 'Untitled Post';
	const description = frontmatter.description || 'No description available.';
	const date = frontmatter.date || new Date().toISOString().split('T')[0];
	const tags = frontmatter.tags || [];
	const featuredImage = frontmatter.featuredImage || null; // For social media sharing

	// Reading time is often added to metadata by remark-reading-time plugin
	const readingTime = frontmatter.readingTime?.text || frontmatter.readingTime || 'N/A';

	// Table of Contents (ToC)
	// remark-toc (configured in mdsvex options) should add `toc` to the metadata.
	// It's an array of objects {level: number, id: string, text: string}
	const toc = frontmatter.toc || [];


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
	const postFiles = Object.keys(modules).map(path => basename(path, '.md'));
	return postFiles.map(slug => ({ slug }));
}
