import { error } from '@sveltejs/kit';
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { parse } from 'marked'; // Using marked for frontmatter, though mdsvex handles full parsing later

// Helper function to extract frontmatter (simplified)
// In a real MDsvex setup, MDsveX handles frontmatter parsing during compilation.
// This is a common pattern for listing posts by scanning files if not using a DB.
function extractFrontmatter(markdownContent) {
	const match = /^---([\s\S]+?)---/.exec(markdownContent);
	if (!match) return {};

	const frontmatter = {};
	match[1].trim().split('\n').forEach(line => {
		const [key, ...valueParts] = line.split(':');
		if (key && valueParts.length > 0) {
			frontmatter[key.trim()] = valueParts.join(':').trim().replace(/^['"]|['"]$/g, '');
		}
	});
	return frontmatter;
}

export async function load() {
	const postsDir = join(process.cwd(), 'src', 'lib', 'posts');
	let postFiles = [];

	try {
		postFiles = readdirSync(postsDir).filter(file => file.endsWith('.md'));
	} catch (e) {
		console.error('Error reading posts directory:', e);
		// If the directory doesn't exist or no posts, return an empty array or handle as an error
		// For now, let's allow an empty list if dir is missing, page can show "no posts".
		// error(500, 'Could not list blog posts. Ensure src/lib/posts exists.');
	}

	if (postFiles.length === 0) {
		return {
			posts: [],
			meta: {
				title: 'Blog',
				description: 'No posts yet. Check back soon!'
			}
		};
	}

	const posts = postFiles.map(file => {
		try {
			const filePath = join(postsDir, file);
			const markdownContent = readFileSync(filePath, 'utf-8');
			const frontmatter = extractFrontmatter(markdownContent);

			return {
				slug: file.replace(/\.md$/, ''),
				title: frontmatter.title || 'Untitled Post',
				date: frontmatter.date || new Date().toISOString().split('T')[0],
				description: frontmatter.description || 'No description available.',
				tags: frontmatter.tags ? frontmatter.tags.split(',').map(tag => tag.trim()) : [],
				// featuredImage: frontmatter.featuredImage || null, // If you use it on listing
			};
		} catch (e) {
			console.error(`Error processing file ${file}:`, e);
			// Return a partial post object or null to filter out later / show an error
			return {
				slug: file.replace(/\.md$/, ''),
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

	return {
		posts,
		meta: {
			title: 'Blog | My Portfolio',
			description: 'Read the latest articles and updates on web development, Svelte, and more.'
		}
	};
}
