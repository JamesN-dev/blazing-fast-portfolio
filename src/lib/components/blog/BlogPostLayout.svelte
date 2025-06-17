<script lang="ts">
	import '$lib/styles/blog.css';

	// Define props using Svelte 5 runes
	let {
		title = 'Untitled Post',
		date = '',
		tags = [],
		readingTime = '',
		tocItems = [], // Expected format: {id: string, text: string, level: number}[]
		featuredImage = '',
		slug = '', // Current post slug, for sharing links etc.
		children // This will be the main post content snippet
	} = $props();

	let formattedDate = $derived(
		date
			? new Date(date).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})
			: 'Date not available'
	);

	function getTocClass(level) {
		switch (level) {
			case 1:
				return 'toc-level-1'; // Should not happen often in ToC from post body
			case 2:
				return 'toc-level-2'; // Main headings in ToC
			case 3:
				return 'toc-level-3'; // Sub-headings
			case 4:
				return 'toc-level-4'; // Deeper sub-headings
			default:
				return 'toc-level-deep';
		}
	}
</script>

<!-- Follow the same container pattern as other pages -->
<div class="blog-container">
	<article class="blog-post-layout">
		<header class="blog-header">
			<h1 class="blog-title">
				{title}
			</h1>
			<div class="blog-meta">
				<span>Published on <time datetime={date}>{formattedDate}</time></span>
				{#if readingTime}
					<span class="meta-separator">&bull;</span>
					<span>{readingTime}</span>
				{/if}
			</div>
			{#if tags && tags.length > 0}
				<div class="blog-tags">
					{#each tags as tag (tag)}
						<a href="/blog/tag/{tag.toLowerCase()}" class="blog-tag">
							#{tag}
						</a>
					{/each}
				</div>
			{/if}
		</header>

		{#if featuredImage}
			<div class="featured-image-container">
				<img src={featuredImage} alt="Featured image for {title}" class="featured-image" />
			</div>
		{/if}

		<div class="blog-content-wrapper">
			<!-- Main Content Area -->
			<div class="main-content blog-main-content">
				<!-- Render the actual blog post content passed as a snippet -->
				{@render children()}
			</div>

			<!-- Table of Contents Sidebar -->
			{#if tocItems && tocItems.length > 0}
				<aside class="toc-sidebar">
					<h2 class="toc-title">On this page</h2>
					<nav aria-label="Table of contents">
						<ul class="toc-list">
							{#each tocItems as item (item.id)}
								<li class="toc-item {getTocClass(item.level)}">
									<a href="#{item.id}" class="toc-link">
										{item.text}
									</a>
								</li>
							{/each}
						</ul>
					</nav>
				</aside>
			{/if}
		</div>

		<footer class="blog-footer">
			<p class="footer-text">Enjoyed this post? Share it with others!</p>
		</footer>
	</article>
</div>

<style>
	/* All styling moved to blog.css for better organization */
	/* Component-level overrides can be added here if needed */
</style>
