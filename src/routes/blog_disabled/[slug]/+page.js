import { error } from '@sveltejs/kit';

// Import all .md files as components
const modules = import.meta.glob('/src/lib/posts/*.md');

export async function load({ params, data }) {
	// Get server data from +page.server.js
	const { slug } = params;

	// Get the path to the post module
	const postPath = `/src/lib/posts/${slug}.md`;

	if (!modules[postPath]) {
		error(404, `Blog post not found: ${slug}`);
	}

	try {
		// Dynamically import the MDsveX component
		const postModule = await modules[postPath]();
		const content = postModule.default;

		// Merge server data with client-loaded content
		return {
			...data, // This contains frontmatter, toc, meta from +page.server.js
			content, // Add the component to the existing server data
		};
	} catch (err) {
		console.error(`Error loading blog post component for ${slug}:`, err);
		error(500, `Error loading blog post: ${slug}`);
	}
}
