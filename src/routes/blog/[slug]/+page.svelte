<script lang="ts">
	import BlogPostLayout from '$lib/components/blog/BlogPostLayout.svelte';
	import { page } from '$app/state'; // For page store, if needed for other things

	// Data from the load function in +page.server.js
	let { data } = $props();

	// Destructure for easier access in the template, though direct access via data.frontmatter.title etc. is also fine
	let ContentComponent = $derived(data.content);
	let frontmatter = $derived(data.frontmatter);
	let toc = $derived(data.toc);
	let meta = $derived(data.meta);
</script>

<svelte:head>
	<title>{meta.title}</title>
	<meta name="description" content={meta.description} />
	{#if meta.canonical}
		<link rel="canonical" href={meta.canonical} />
	{/if}
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="article" />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	{#if frontmatter.featuredImage}
		<meta property="og:image" content={frontmatter.featuredImage} />
	{/if}
	<meta property="og:url" content={page.url.href} />
	{#if frontmatter.date}
		<meta property="article:published_time" content={new Date(frontmatter.date).toISOString()} />
	{/if}
	{#each frontmatter.tags || [] as tag}
		<meta property="article:tag" content={tag} />
	{/each}

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={meta.title} />
	<meta name="twitter:description" content={meta.description} />
	{#if frontmatter.featuredImage}
		<meta name="twitter:image" content={frontmatter.featuredImage} />
	{/if}
</svelte:head>

<BlogPostLayout
	title={frontmatter.title}
	date={frontmatter.date}
	tags={frontmatter.tags}
	readingTime={frontmatter.readingTime}
	tocItems={toc}
	featuredImage={frontmatter.featuredImage}
	slug={data.slug}
>
	{#if ContentComponent}
		<ContentComponent />
	{:else}
		<p>Error: Blog post content could not be loaded.</p>
		<!-- This should ideally be caught by the 404 in +page.server.js if content is truly missing -->
	{/if}
</BlogPostLayout>

<style>
	/* FIXED STYLES - Main title normal, content headings like paragraph labels */

	/* Make the main blog title MATCH the blog index title exactly */
	:global(.blog-title) {
		font-family: 'Kilimanjaro Sans Round1', 'Nunito Sans', sans-serif !important;
		font-size: var(--h1) !important; /* Same as blog index */
		/* SAME sick cyan gradient as blog index */
		background: linear-gradient(
			135deg,
			var(--color-text) 0%,
			#00ffff 30%,
			var(--accent) 70%,
			#0099cc 100%
		) !important;
		-webkit-background-clip: text !important;
		-webkit-text-fill-color: transparent !important;
		background-clip: text !important;
		margin-bottom: var(--space-4) !important;
		text-align: center !important;
		/* Remove any weird positioning that might put it in nav */
		position: static !important;
		top: auto !important;
		z-index: auto !important;
	}

	/* Fix the tags to match homepage exactly - clean rounded style */
	:global(.blog-tag) {
		background: rgba(40, 80, 83, 0.3) !important; /* Match homepage background */
		border: 1px solid var(--primary) !important; /* Clean border */
		border-radius: 20px !important; /* Round like homepage */
		padding: var(--space-2) var(--space-4) !important;
		font-size: 0.8rem !important;
		font-weight: 600 !important;
		color: var(--color-text) !important; /* Normal text color */
		text-decoration: none !important; /* No underlines */
		display: inline-block !important;
		margin: var(--space-1) !important;
		transition: all 0.3s ease !important;
	}

	:global(.blog-tag:hover) {
		background: var(--primary) !important;
		transform: translateY(-2px) !important;
		box-shadow: 0 4px 12px rgba(69, 133, 136, 0.4) !important;
	}
	/* Make content headings like paragraph labels, NOT bright blue links */
	:global(.main-content h2),
	:global(.main-content h3),
	:global(.main-content h4),
	:global(.main-content h5),
	:global(.main-content h6) {
		font-size: 1rem !important; /* Same as paragraph text */
		font-weight: 700 !important; /* Just bold */
		margin: 16px 0 8px 0 !important;
		line-height: 1.3 !important;
		color: var(--color-text) !important; /* Normal text color, NOT link color */
		border: none !important; /* No fancy borders */
		padding: 0 !important;
		margin-left: 0 !important;
		text-decoration: none !important; /* No underlines */
	}

	/* Make h2s slightly bigger but still readable */
	:global(.main-content h2) {
		font-size: 1.1rem !important;
		font-weight: 700 !important;
		color: var(--color-text) !important; /* Normal text color, NOT bright blue */
	}

	/* h3s same as paragraph text but bold */
	:global(.main-content h3) {
		font-size: 1rem !important;
		font-weight: 700 !important;
		color: var(--color-text) !important; /* Normal text color */
	}

	/* h4s even smaller */
	:global(.main-content h4) {
		font-size: 0.95rem !important;
		font-weight: 600 !important;
		color: var(--color-text) !important; /* Normal text color */
	}

	/* Fix any links inside headings to not be bright blue */
	:global(.main-content h2 a),
	:global(.main-content h3 a),
	:global(.main-content h4 a) {
		color: inherit !important; /* Inherit heading color, not link color */
		text-decoration: none !important;
	}

	:global(.main-content p) {
		font-size: 1rem !important;
		line-height: 1.6 !important;
		margin: 12px 0 !important;
		color: var(--description) !important;
	}

	:global(.blog-container) {
		width: 90% !important; /* Match other pages */
		max-width: 1200px !important; /* Match other pages */
		margin: 40px auto !important; /* MATCH OTHER PAGES - this pushes it down from nav */
		padding: 20px !important; /* Match other pages */
		/* CONTAIN EVERYTHING */
		overflow-x: hidden !important;
		word-wrap: break-word !important;
		overflow-wrap: break-word !important;
		box-sizing: border-box !important;
	}

	:global(.main-content) {
		/* MAKE SURE CONTENT DOESN'T OVERFLOW */
		max-width: 100% !important;
		overflow-x: hidden !important;
		word-wrap: break-word !important;
		overflow-wrap: break-word !important;
		box-sizing: border-box !important;
	}

	:global(.main-content *) {
		/* EVERY ELEMENT INSIDE MUST NOT OVERFLOW */
		max-width: 100% !important;
		word-wrap: break-word !important;
		overflow-wrap: break-word !important;
		box-sizing: border-box !important;
	}

	:global(.blog-content-wrapper) {
		/* WRAPPER GRID - use RAM pattern */
		display: grid !important;
		grid-template-columns: 1fr !important;
		gap: var(--space-8) !important;
		max-width: 100% !important;
		overflow-x: hidden !important;
	}

	@media (min-width: 1024px) {
		:global(.blog-content-wrapper) {
			grid-template-columns: 1fr 300px !important;
			gap: var(--space-12) !important;
		}
	}

	@media (max-width: 768px) {
		:global(.blog-container) {
			width: 98% !important;
			margin: 10px auto !important;
			padding: 12px !important;
		}

		:global(.main-content h2),
		:global(.main-content h3),
		:global(.main-content h4) {
			font-size: 0.95rem !important;
		}

		:global(.main-content p) {
			font-size: 0.95rem !important;
		}
	}

	/* Make sure the blog header is positioned properly like other pages */
	:global(.blog-header) {
		position: static !important; /* Not fixed or absolute */
		top: auto !important;
		z-index: auto !important;
		margin-top: 0 !important; /* No weird top margin */
		padding-top: 0 !important; /* No weird top padding */
		text-align: center !important;
		margin-bottom: var(--space-12) !important;
	}

	/* Fix syntax highlighting to be same size as paragraph text */
	:global(.main-content pre),
	:global(.main-content code),
	:global(.main-content .shiki) {
		font-size: 0.9rem !important; /* Smaller than paragraph text */
		line-height: 1.4 !important;
	}

	/* Fix tags - no word wrap, smaller text */
	:global(.blog-tag) {
		border-radius: 20px !important; /* Round, not rectangle */
		padding: var(--space-2) var(--space-3) !important; /* Less padding */
		font-size: 0.75rem !important; /* Smaller font */
		display: inline-block !important;
		margin: var(--space-1) !important;
		white-space: nowrap !important; /* NO WORD WRAP */
		overflow: hidden !important;
		text-overflow: ellipsis !important;
		max-width: 120px !important; /* Limit max width */
	}

	/* Also fix any tag links in posts */
	:global(.blog-tag-link) {
		border-radius: 20px !important;
		padding: var(--space-1) var(--space-3) !important;
		font-size: 0.75rem !important;
		display: inline-block !important;
		margin: var(--space-1) !important;
		white-space: nowrap !important; /* NO WORD WRAP */
		overflow: hidden !important;
		text-overflow: ellipsis !important;
		max-width: 120px !important;
	}
</style>
