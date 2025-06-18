<script>
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta name="description" content={data.meta.description} />
	<meta property="og:title" content={data.meta.title} />
	<meta property="og:description" content={data.meta.description} />
	<meta property="og:type" content="website" />
</svelte:head>

<!-- Follow the same container pattern as other pages -->
<div class="blog-container">
	<header class="blog-index-header">
		<h1 class="blog-index-title">
			{data.meta.title}
		</h1>
		{#if data.posts && data.posts.length > 0}
			<p class="blog-index-description">
				{data.meta.description}
			</p>
		{/if}
		<div class="underline"></div>
	</header>

	{#if data.posts.length > 0}
		<div class="blog-posts-grid ram-articles">
			{#each data.posts as post (post.slug)}
				<article class="blog-post-card">
					<div class="blog-post-content">
						<div class="blog-post-body">
							{#if post.tags && post.tags.length > 0}
								<div class="blog-post-tags">
									{#each post.tags as tag, i (tag)}
										<a href="/blog/tag/{tag}" class="blog-tag-link">#{tag}</a>
									{/each}
								</div>
							{/if}
							<a href="/blog/{post.slug}" class="blog-post-link">
								<h2 class="blog-post-title">
									{post.title}
								</h2>
								<p class="blog-post-description">
									{post.description}
								</p>
							</a>
						</div>
						<div class="blog-post-meta">
							<time datetime={post.date} class="blog-post-date">
								{new Date(post.date).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric'
								})}
							</time>
							<span class="meta-separator">&bull;</span>
							<span class="blog-post-reading-time">
								{post.readingTime}
							</span>
						</div>
					</div>
				</article>
			{/each}
		</div>
	{:else}
		<div class="blog-empty-state">
			<div class="empty-icon">📝</div>
			<h3 class="empty-title">No Posts Yet</h3>
			<p class="empty-description">
				It looks like there are no blog posts available at the moment. Please check back later!
			</p>
		</div>
	{/if}
</div>

<style>
	/* Critical CSS moved here to prevent hydration jump */
	.blog-container {
		width: 95%;
		max-width: 900px;
		margin: 20px auto;
		padding: 16px;
	}

	@media (max-width: 768px) {
		.blog-container {
			width: 98%;
			margin: 10px auto;
			padding: 12px;
		}
	}

	/* Blog Index Page Styling - matches site design system */
	.blog-index-header {
		text-align: center;
		margin-bottom: var(--space-12);
	}

	.blog-index-title {
		font-family: 'Kilimanjaro Sans Round1', 'Nunito Sans', sans-serif;
		font-size: var(--h1);
		/* Sick cyan gradient */
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
		margin-bottom: var(--space-4);
		text-align: center;
	}

	.blog-index-description {
		font-size: var(--h5);
		color: var(--description);
		margin-bottom: var(--space-6);
	}

	.underline {
		height: 4px;
		width: 120px; /* Wider */
		/* Sick cyan gradient for underline */
		background: linear-gradient(90deg, #00ffff, var(--accent), #0099cc, var(--primary));
		margin: 0 auto;
		border-radius: 2px;
		box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
	}

	/* Blog posts grid using RAM pattern */
	.blog-posts-grid {
		margin-top: var(--space-10);
	}

	.blog-post-card {
		background: linear-gradient(135deg, rgba(40, 80, 83, 0.4), rgba(51, 51, 51, 0.8));
		border-radius: 16px;
		overflow: hidden;
		transition: all 0.4s ease;
		border: 1px solid rgba(0, 255, 255, 0.2);
		backdrop-filter: blur(10px);
		position: relative;
	}

	.blog-post-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: linear-gradient(90deg, #00ffff, var(--accent), #0099cc);
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.blog-post-card:hover {
		transform: translateY(-8px);
		box-shadow: 0 20px 40px rgba(0, 255, 255, 0.2);
		border-color: rgba(0, 255, 255, 0.4);
	}

	.blog-post-card:hover::before {
		opacity: 1;
	}

	.blog-post-content {
		padding: var(--space-6);
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.blog-post-body {
		flex: 1;
	}

	.blog-post-tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		margin-bottom: var(--space-4);
	}

	.blog-tag-link {
		background: linear-gradient(145deg, rgba(69, 133, 136, 0.2), rgba(69, 133, 136, 0.1));
		border: 1px solid var(--primary);
		border-radius: 12px;
		padding: var(--space-1) var(--space-3);
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--color-text);
		text-decoration: none;
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
	}

	.blog-tag-link::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
		transition: left 0.5s ease;
	}

	.blog-tag-link:hover::before {
		left: 100%;
	}

	.blog-tag-link:hover {
		background: var(--primary);
		transform: translateY(-1px);
	}

	.blog-post-link {
		text-decoration: none;
		color: inherit;
	}

	.blog-post-title {
		font-family: 'Kilimanjaro Sans Round1', 'Nunito Sans', sans-serif;
		font-size: var(--h4);
		color: var(--color-text);
		margin-bottom: var(--space-3);
		transition: color 0.3s ease;
	}

	.blog-post-link:hover .blog-post-title {
		background: linear-gradient(
			135deg,
			var(--color-text) 0%,
			var(--accent) 50%,
			var(--primary) 100%
		);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.blog-post-description {
		color: var(--description);
		font-size: var(--p-size);
		line-height: 1.6;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.blog-post-meta {
		margin-top: var(--space-4);
		padding-top: var(--space-4);
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		display: flex;
		align-items: center;
		gap: var(--space-3);
		font-size: var(--small);
		color: var(--description);
	}

	/* Empty state styling */
	.blog-empty-state {
		text-align: center;
		padding: var(--space-12) var(--space-4);
	}

	.empty-icon {
		font-size: 4rem;
		margin-bottom: var(--space-4);
	}

	.empty-title {
		font-family: 'Kilimanjaro Sans Round1', 'Nunito Sans', sans-serif;
		font-size: var(--h3);
		color: var(--color-text);
		margin-bottom: var(--space-3);
	}

	.empty-description {
		font-size: var(--p-size);
		color: var(--description);
		max-width: 500px;
		margin: 0 auto;
	}
</style>
