export async function load() {
	// Use Vite's import.meta.glob instead of Node.js fs for production compatibility
	const postModules = import.meta.glob('$lib/posts/*.{md,svx}', { eager: true });

	const posts = Object.entries(postModules).map(([filePath, module]) => {
		try {
			const fileName = filePath.split('/').pop();
			const frontmatter = module.metadata || {};

			return {
				slug: fileName.replace(/\.(md|svx)$/, ''),
				title: frontmatter.title || 'Untitled Post',
				date: frontmatter.date || new Date().toISOString().split('T')[0],
				description: frontmatter.description || 'No description available.',
				tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : (frontmatter.tags ? frontmatter.tags.split(',').map(tag => tag.trim()) : []),
			};
		} catch (e) {
			console.error(`Error processing file ${filePath}:`, e);
			return {
				slug: filePath.split('/').pop().replace(/\.(md|svx)$/, ''),
				title: 'Error: Could not load post',
				date: new Date().toISOString().split('T')[0],
				description: 'There was an issue loading this post preview.',
				tags: ['error'],
				error: true
			};
		}
	}).filter(post => post !== null);

	// Sort posts by date, newest first
	posts.sort((a, b) => new Date(b.date) - new Date(a.date));

	// Server always returns data - no UI logic
	return {
		posts,
		meta: {
			title: 'Blog',
			description: 'The blazingfast blog - web development, Svelte, and more.'
		}
	};
}
