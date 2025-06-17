import { error } from '@sveltejs/kit';
import { basename } from 'path';
// Dynamically import all .md files from the posts directory
// The `eager: true` option ensures that the modules are imported immediately,
// and their content is available synchronously.
// `as: 'raw'` would import as string, `as: 'frontmatter'` for just frontmatter if mdsvex supported it directly here.
// For MDsveX, the default import is the compiled Svelte component, and frontmatter is part of its module.
const modules = import.meta.glob('/src/lib/posts/*.md', { eager: true });

export async function load({ params }) {
	const { slug } = params;

	let postModule;
	let postPath = `/src/lib/posts/${slug}.md`;

	// Find the module by path (case-sensitive, ensure slug matches filename)
	if (modules[postPath]) {
		postModule = modules[postPath];
	} else {
		// Case-insensitive check or common variations if needed (e.g. .mdx)
		// This basic example assumes exact match.
		console.warn(`Post not found for slug: ${slug} at path ${postPath}`);
		error(404, {
			message: `Blog post not found: ${slug}`,
			details: `Looked for ${postPath}. Ensure the slug matches the filename exactly (case-sensitive) and the file exists in /src/lib/posts.`
		});
	}

	if (!postModule || !postModule.default) {
		console.error(`Module or default export not found for ${postPath}`);
		error(500, {
			message: 'Error loading blog post content.',
			details: `Could not retrieve default export (the Svelte component) from ${postPath}.`
		});
	}

	const { default: content, metadata } = postModule;

	if (!metadata) {
		console.warn(`Metadata not found for post: ${slug}`);
		// Proceeding without metadata, but this is unusual for MDsveX compiled modules
		// error(500, `Metadata not found for post: ${slug}`);
	}

	// MDsveX typically puts frontmatter into `metadata`
	// and table of contents into `metadata.toc` if remark-toc is configured
	const frontmatter = metadata || {}; // Fallback if metadata is somehow missing

	// Ensure essential frontmatter for SEO and display
	const title = frontmatter.title || 'Untitled Post';
	const description = frontmatter.description || 'No description available.';
	const date = frontmatter.date || new Date().toISOString().split('T')[0];
	const tags = frontmatter.tags || [];
	const featuredImage = frontmatter.featuredImage || null; // Example for social sharing

	// Reading time is often added to metadata by remark-reading-time plugin
	const readingTime = frontmatter.readingTime?.text || 'N/A';

	// Table of Contents (ToC)
	// remark-toc (configured in mdsvex options) should add `toc` to the metadata.
	// It's an array of objects {level: number, id: string, text: string}
	const toc = frontmatter.toc || [];


	return {
		slug,
		content, // This is the compiled Svelte component for the post body
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
