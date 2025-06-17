<script lang="ts">
	import { page } from '$app/state'; // For potential fallbacks or breadcrumbs

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

	let formattedDate = $derived(date ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Date not available');

	function getTocClass(level) {
		switch (level) {
			case 1: return 'font-semibold text-lg'; // Should not happen often in ToC from post body
			case 2: return 'ml-0 font-medium'; // Main headings in ToC
			case 3: return 'ml-4 text-sm';    // Sub-headings
			case 4: return 'ml-8 text-xs';    // Deeper sub-headings
			default: return 'ml-10 text-xs';
		}
	}
</script>

<article class="blog-post-layout container mx-auto px-4 py-8 lg:py-12 max-w-4xl">
	<header class="mb-8 text-center">
		<h1 class="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 break-words">
			{title}
		</h1>
		<div class="meta text-gray-600 dark:text-gray-400 text-sm md:text-base">
			<span>Published on <time datetime={date}>{formattedDate}</time></span>
			{#if readingTime}
				<span class="mx-2">&bull;</span>
				<span>{readingTime}</span>
			{/if}
		</div>
		{#if tags && tags.length > 0}
			<div class="mt-4 tags">
				{#each tags as tag (tag)}
					<a href="/blog/tag/{tag.toLowerCase()}" class="tag inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 dark:text-gray-200 mr-2 mb-2 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
						#{tag}
					</a>
				{/each}
			</div>
		{/if}
	</header>

	{#if featuredImage}
		<div class="featured-image-container mb-8 rounded-lg overflow-hidden shadow-lg">
			<img src={featuredImage} alt="Featured image for {title}" class="w-full h-auto object-cover max-h-[500px]" />
		</div>
	{/if}

	<div class="flex flex-col lg:flex-row gap-8">
		<!-- Main Content Area -->
		<div class="main-content w-full lg:w-3/4 prose dark:prose-invert max-w-none break-words">
			<!-- Render the actual blog post content passed as a snippet -->
			{@render children()}
		</div>

		<!-- Table of Contents Sidebar -->
		{#if tocItems && tocItems.length > 0}
			<aside class="toc-sidebar lg:w-1/4 sticky top-24 self-start p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow">
				<h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">On this page</h2>
				<nav aria-label="Table of contents">
					<ul>
						{#each tocItems as item (item.id)}
							<li class="mb-2 {getTocClass(item.level)}">
								<a href="#{item.id}" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
									{item.text}
								</a>
							</li>
						{/each}
					</ul>
				</nav>
			</aside>
		{/if}
	</div>

	<!-- You can add author bio, share buttons, related posts etc. here -->
	<footer class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
		<!-- Example: Share buttons or navigation -->
		<p class="text-center text-gray-600 dark:text-gray-400">
			Enjoyed this post? Share it with others!
		</p>
		<!-- Actual share functionality would need JS or links -->
	</footer>

</article>

<style>
	.prose :global(h1), .prose :global(h2), .prose :global(h3), .prose :global(h4), .prose :global(h5), .prose :global(h6) {
		scroll-margin-top: 5rem; /* Adjust based on your sticky header height */
	}

	.tag {
		text-decoration: none;
	}

	/* Basic responsive adjustments for ToC */
	@media (max-width: 1023px) { /* Below lg breakpoint */
		.toc-sidebar {
			width: 100%; /* Full width on smaller screens */
			position: relative; /* Not sticky */
			top: auto;
			margin-top: 2rem; /* Add some space if it's not first */
			order: -1; /* Move ToC before main content on mobile if desired, or remove for after */
		}
		.main-content {
			/* order: 1; */ /* If ToC is order: -1 */
		}
		.flex-col { /* Ensure main layout stacks on mobile */
			/* default is col, lg:flex-row handles larger */
		}
	}
</style>
