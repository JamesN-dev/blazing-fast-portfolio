<script>
	import TocCard from '$lib/components/blog/TocCard.svelte';

	// Define props using Svelte 5 runes
	let {
		title = 'Untitled Post',
		subtitle = '',
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
</script>

<!-- Follow the same container pattern as other pages -->
<div class="grid-container">
	<article class="blog-post-layout">
		<header class="blog-header">
			<h1 class="blog-title">
				{title}
			</h1>
			{#if subtitle}
				<p class="blog-subtitle">
					{subtitle}
				</p>
			{/if}
			<div class="blog-meta">
				<span>Published on <time datetime={date}>{formattedDate}</time></span>
				<span class="meta-separator">&bull;</span>
				<span>{readingTime}</span>
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

			<!-- Scroll-Controlled Table of Contents -->
			<TocCard {tocItems} />
		</div>

		<footer class="blog-footer">
			<p class="footer-text">Enjoyed this post? Share it with others!</p>
		</footer>
	</article>
</div>

<style>
	.grid-container {
		display: grid;
		grid-template-columns: repeat(var(--grid-cols, 16), 1fr);
		gap: var(--space-4);
		width: 100%;
		max-width: var(--max-width);
		margin: 0 auto;
		padding: var(--space-12) var(--space-4) var(--space-8) var(--space-4);
		box-sizing: border-box;
		min-height: 100vh;
		/* Enable container queries */
		container-type: inline-size;
		/* Responsive grid columns */
		--grid-cols: 16;
		--max-width: 1400px;
	}

	/* Responsive adjustments using container queries */
	@container (max-width: 1200px) {
		.grid-container {
			--grid-cols: 12;
			--max-width: 1200px;
		}
	}

	@container (max-width: 768px) {
		.grid-container {
			--grid-cols: 8;
			--max-width: 768px;
			padding: var(--space-6) var(--space-3);
		}
	}

	@container (max-width: 480px) {
		.grid-container {
			--grid-cols: 4;
			--max-width: 480px;
			padding: var(--space-4) var(--space-2);
		}
	}

	.blog-post-layout {
		grid-column: 2 / -2; /* Leave margin columns on both sides */
		/* Center the content within the grid */
		max-width: 1200px; /* Increased to accommodate TOC properly */
		margin: 0 auto;
		width: 100%;
	}

	/* Responsive blog layout using container queries */
	@container (max-width: 768px) {
		.blog-post-layout {
			grid-column: 1 / -1; /* Use full width on mobile */
		}
	}

	.blog-title {
		font-family: 'Kilimanjaro Sans Round1', 'Nunito Sans', sans-serif;
		font-size: var(--h1);
		font-weight: 500;
		padding-top: 8px;
		background: linear-gradient(
			135deg,
			var(--color-text) 0%,
			#00ffff 30%,
			var(--accent) 70%,
			#0099cc 100%
		);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: var(--space-2);
		text-align: center;
		line-height: 1.4;
	}

	.blog-subtitle {
		font-family: 'JetBrains Mono', sans-serif;
		font-size: var(--h5);
		color: var(--description);
		margin-bottom: var(--space-4);
		text-align: center;
		opacity: 0.8;
	}

	.blog-header {
		text-align: center;
		margin-bottom: var(--space-12);
		padding-bottom: var(--space-8);
		border-bottom: 2px solid rgba(255, 255, 255, 0.1);
		position: relative;
	}

	.blog-header::after {
		content: '';
		position: absolute;
		bottom: -2px;
		left: 50%;
		transform: translateX(-50%);
		width: 120px;
		height: 2px;
		background: linear-gradient(90deg, #00ffff, var(--accent), #0099cc, var(--primary));
		border-radius: 1px;
		box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
	}

	.blog-meta {
		font-family: 'Nunito Sans', sans-serif;
		font-size: var(--small);
		color: var(--description);
		margin-bottom: var(--space-4);
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
		flex-wrap: wrap;
	}

	.meta-separator {
		color: var(--accent);
		font-weight: bold;
	}

	.blog-tags {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: var(--space-3);
		margin-top: var(--space-6);
	}

	.blog-tag {
		background: rgba(40, 80, 83, 0.3);
		border: 1px solid var(--primary);
		border-radius: 20px;
		padding: var(--space-2) var(--space-4);
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--color-text);
		text-decoration: none;
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
	}

	.blog-tag::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
		transition: left 0.5s ease;
	}

	.blog-tag:hover::before {
		left: 100%;
	}

	.blog-tag:hover {
		background: var(--primary);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(69, 133, 136, 0.4);
	}

	.blog-content-wrapper {
		display: grid;
		grid-template-columns: 1fr 300px; /* Main content + TOC sidebar */
		gap: var(--space-12);
		align-items: start;
		max-width: 100%;
		width: 100%;
	}

	.main-content {
		font-family: 'Inter', system-ui, sans-serif;
		font-size: 1.1rem;
		line-height: 1.7;
		color: var(--color-text);
		max-width: 65ch; /* Optimal reading width - about 65 characters per line */
		width: 100%;
	}

	/* Typography */
	.main-content :global(h2) {
		font-size: 1.1rem;
		font-weight: 700;
		margin: 16px 0 8px 0;
		color: var(--color-text);
	}

	.main-content :global(h3) {
		font-size: 1rem;
		font-weight: 700;
		margin: 16px 0 8px 0;
		color: var(--color-text);
	}

	.main-content :global(h4) {
		font-size: 0.95rem;
		font-weight: 600;
		margin: 16px 0 8px 0;
		color: var(--color-text);
	}

	.main-content :global(p) {
		font-size: 1rem;
		line-height: 1.6;
		margin: 12px 0;
		color: var(--description);
	}

	.main-content :global(a) {
		color: var(--accent);
		text-decoration: none;
	}

	.main-content :global(a:hover) {
		text-decoration: underline;
	}

	/* Code block styling - smaller and more obvious */
	.main-content :global(pre) {
		background: rgba(15, 15, 15, 0.98);
		border: 2px solid rgba(69, 133, 136, 0.4);
		border-radius: 12px;
		padding: var(--space-5);
		margin: var(--space-8) var(--space-3); /* Add slight left/right margin for indent effect */
		overflow-x: auto;
		font-size: 0.8rem;
		line-height: 1.5;
		box-shadow:
			0 8px 24px rgba(0, 0, 0, 0.4),
			inset 0 1px 0 rgba(255, 255, 255, 0.1);
		position: relative;
	}

	.main-content :global(pre::before) {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: linear-gradient(90deg, var(--accent), var(--primary), #0099cc);
		border-radius: 12px 12px 0 0;
	}

	/* Code title styling (from rehype-code-titles) */
	.main-content :global(.rehype-code-title) {
		background: rgba(69, 133, 136, 0.9);
		color: var(--color-text);
		font-family: 'Fira Code', 'Source Code Pro', monospace;
		font-size: 0.75rem;
		font-weight: 600;
		padding: var(--space-2) var(--space-4);
		margin: var(--space-8) var(--space-3) 0 var(--space-3); /* Match code block margin */
		border-top-left-radius: 12px;
		border-top-right-radius: 12px;
		border: 2px solid rgba(69, 133, 136, 0.4);
		border-bottom: none;
		position: relative;
	}

	.main-content :global(.rehype-code-title::before) {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: linear-gradient(90deg, var(--accent), var(--primary), #0099cc);
		border-radius: 12px 12px 0 0;
	}

	/* When there's a title, remove top margin from following pre */
	.main-content :global(.rehype-code-title + pre) {
		margin-top: 0;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
		border-top: none;
	}

	.main-content :global(.rehype-code-title + pre::before) {
		display: none; /* Hide the gradient line on connected code blocks */
	}

	/* Custom code title styling (from our custom highlighter) */
	.main-content :global(.code-title) {
		background: rgba(69, 133, 136, 0.9);
		color: var(--color-text);
		font-family:
			'Fira Code', 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New',
			monospace;
		font-size: 0.75rem;
		font-weight: 600;
		padding: var(--space-2) var(--space-4);
		margin: 0;
		border-top-left-radius: 12px;
		border-top-right-radius: 12px;
		border: 2px solid rgba(69, 133, 136, 0.4);
		border-bottom: none;
		position: relative;
	}

	.main-content :global(.code-title::before) {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: linear-gradient(90deg, var(--accent), var(--primary), #0099cc);
		border-radius: 12px 12px 0 0;
	}

	.main-content :global(.code-block-with-title) {
		margin: var(--space-8) var(--space-3);
	}

	.main-content :global(.code-block-with-title pre) {
		margin: 0;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
		border-top: none;
	}

	.main-content :global(code:not(pre code)) {
		background: rgba(40, 80, 83, 0.4);
		padding: 3px 8px;
		border-radius: 6px;
		font-size: 0.85em;
		font-family: 'JetBrains Mono', 'Fira Code', monospace;
		color: var(--accent);
		border: 1px solid rgba(69, 133, 136, 0.3);
		font-weight: 500;
	}

	.main-content :global(pre code) {
		background: transparent;
		padding: 0;
		border: none;
		font-size: 0.8rem;
		color: inherit;
		font-weight: 400;
		font-family: 'JetBrains Mono', 'Fira Code', monospace;
	}

	/* Blockquotes */
	.main-content :global(blockquote) {
		border-left: 4px solid var(--primary);
		padding-left: var(--space-4);
		margin: var(--space-6) 0;
		font-style: italic;
		background: rgba(40, 80, 83, 0.1);
		padding: var(--space-4);
		border-radius: 0 8px 8px 0;
	}

	/* Lists */
	.main-content :global(ul),
	.main-content :global(ol) {
		padding-left: var(--space-6);
		margin: var(--space-4) 0;
	}

	.main-content :global(li) {
		margin: var(--space-2) 0;
		line-height: 1.6;
	}

	/* Tables */
	.main-content :global(table) {
		width: 100%;
		border-collapse: collapse;
		margin: var(--space-6) 0;
		background: rgba(40, 80, 83, 0.1);
		border-radius: 8px;
		overflow: hidden;
	}

	.main-content :global(th),
	.main-content :global(td) {
		padding: var(--space-3);
		text-align: left;
		border-bottom: 1px solid rgba(69, 133, 136, 0.2);
	}

	.main-content :global(th) {
		background: rgba(69, 133, 136, 0.2);
		font-weight: 600;
		color: var(--accent);
	}

	@container (min-width: 1024px) {
		.blog-content-wrapper {
			grid-template-columns: 1fr 320px;
			gap: var(--space-16);
		}
	}

	@container (min-width: 1024px) {
		.blog-content-wrapper {
			grid-template-columns: 1fr 320px;
			gap: var(--space-16);
		}
	}

	/* Fix responsive container issues using container queries */
	@container (max-width: 768px) {
		.blog-post-layout {
			grid-column: 1 / -1;
			width: 100%;
			min-width: 0; /* Prevent overflow */
		}

		.grid-container {
			min-width: 320px; /* Ensure minimum usable width */
		}

		.blog-content-wrapper {
			grid-template-columns: 1fr; /* Single column on mobile */
			gap: var(--space-6);
		}
	}
</style>
