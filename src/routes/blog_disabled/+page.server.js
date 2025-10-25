export async function load() {
	// Load posts from both main and archived directories
	const mainPostModules = import.meta.glob("$lib/posts/*.{md,svx}", {
		eager: true,
	});
	const archivedPostModules = import.meta.glob(
		"$lib/posts/archived/*.{md,svx}",
		{ eager: true },
	);

	// Combine both sets of posts
	const allPostModules = { ...mainPostModules, ...archivedPostModules };

	const posts = Object.entries(allPostModules)
		.map(([filePath, module]) => {
			try {
				const fileName = filePath.split("/").pop();
				const frontmatter = module.metadata || {};

				// Debug logging for the problematic post
				if (fileName === "we-built-this-blog-2.md") {
					console.log("DEBUG: Processing we-built-this-blog-2.md");
					console.log("frontmatter.published:", frontmatter.published);
					console.log(
						"frontmatter.published === false:",
						frontmatter.published === false,
					);
				}

				// Skip posts that are not published (archived is just for file organization)
				if (frontmatter.published === false) {
					if (fileName === "we-built-this-blog-2.md") {
						console.log("DEBUG: Filtering out we-built-this-blog-2.md");
					}
					return null;
				}

				return {
					slug: fileName.replace(/\.(md|svx)$/, ""),
					title: frontmatter.title || "Untitled Post",
					date: frontmatter.date || new Date().toISOString().split("T")[0],
					description: frontmatter.description || "No description available.",
					tags: Array.isArray(frontmatter.tags)
						? frontmatter.tags
						: frontmatter.tags
							? frontmatter.tags.split(",").map((tag) => tag.trim())
							: [],
					readingTime: frontmatter.readingTime?.text || "Unknown reading time",
					published: frontmatter.published !== false, // Default to true if not specified
					archived: frontmatter.archived === true, // Default to false if not specified
					featured: frontmatter.featured === true, // Extract featured flag
				};
			} catch (e) {
				console.error(`Error processing file ${filePath}:`, e);

				// Try to get frontmatter even if there's an error
				const fileName = filePath.split("/").pop();
				try {
					const frontmatter = module.metadata || {};
					// Don't show unpublished posts even if they error
					if (frontmatter.published === false) {
						return null;
					}
				} catch (frontmatterError) {
					console.error(
						`Could not read frontmatter for ${fileName}:`,
						frontmatterError,
					);
				}

				return {
					slug: fileName.replace(/\.(md|svx)$/, ""),
					title: "Error: Could not load post",
					date: new Date().toISOString().split("T")[0],
					description: "There was an issue loading this post preview.",
					tags: ["error"],
					error: true,
				};
			}
		})
		.filter((post) => post !== null);

	// Sort posts: featured posts first, then by date (newest first)
	posts.sort((a, b) => {
		// Featured posts always come first
		if (a.featured && !b.featured) return -1;
		if (!a.featured && b.featured) return 1;

		// If both are featured or both are not featured, sort by date
		return new Date(b.date) - new Date(a.date);
	});

	// Server always returns data - no UI logic
	return {
		posts,
		meta: {
			title: "Blog",
			description: "Web Dev, Python, AI, Machine Learning, and more.",
		},
	};
}
