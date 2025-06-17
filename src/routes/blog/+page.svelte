<script lang="ts">
	import { page } from '$app/stores'; // Using $app/stores for page data access
	// For Svelte 5, direct prop passing is preferred if $app/stores is legacy for page data.
	// However, $props() is for component inputs, page data comes from load functions.
	// Let's assume `data` is correctly passed as a prop by SvelteKit's runtime for +page.svelte
	// when a +page.server.js load function returns data.

	let { data } = $props(); // data from the load function in +page.server.js

	// SEO Metadata (can also be set in +layout.svelte if consistent across blog pages)
	// For specific page titles/descriptions, it's often best here or in a head component fed by `data`
	let metaTitle = $derived(data.meta?.title || 'Blog');
	let metaDescription = $derived(data.meta?.description || 'Welcome to our blog.');

</script>

<svelte:head>
	<title>{metaTitle}</title>
	<meta name="description" content={metaDescription} />
	<!-- Add other relevant meta tags, e.g., Open Graph, Twitter Cards -->
	<meta property="og:title" content={metaTitle} />
	<meta property="og:description" content={metaDescription} />
	<!-- <meta property="og:image" content={data.meta?.featuredImage || '/default-blog-image.png'} /> -->
	<meta property="og:type" content="website" />
	<!-- <meta name="twitter:card" content="summary_large_image" /> -->
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<header class="mb-12 text-center">
		<h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
			{metaTitle}
		</h1>
		{#if data.posts && data.posts.length > 0}
			<p class="mt-4 text-xl text-gray-600 dark:text-gray-300">
				{metaDescription}
			</p>
		{/if}
	</header>

	{#if data.posts && data.posts.length > 0}
		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each data.posts as post (post.slug)}
				<article class="flex flex-col overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 bg-white dark:bg-gray-800">
					<!-- {#if post.featuredImage}
						<a href="/blog/{post.slug}" class="block">
							<img src={post.featuredImage} alt="Featured image for {post.title}" class="h-48 w-full object-cover">
						</a>
					{/if} -->
					<div class="flex flex-1 flex-col justify-between p-6">
						<div class="flex-1">
							{#if post.tags && post.tags.length > 0}
								<div class="mb-2 text-xs font-medium text-indigo-600 dark:text-indigo-400">
									{#each post.tags as tag, i (tag)}
										<a href="/blog/tag/{tag}" class="hover:underline">{tag.toUpperCase()}</a>{i < post.tags.length - 1 ? ', ' : ''}
									{/each}
								</div>
							{/if}
							<a href="/blog/{post.slug}" class="mt-2 block">
								<h2 class="text-xl font-semibold text-gray-900 dark:text-white hover:text-indigo-700 dark:hover:text-indigo-400">
									{post.title}
								</h2>
								<p class="mt-3 text-base text-gray-500 dark:text-gray-400 line-clamp-3">
									{post.description}
								</p>
							</a>
						</div>
						<div class="mt-6 flex items-center">
							<!-- Author info can go here if available -->
							<div class="text-sm text-gray-500 dark:text-gray-400">
								<time datetime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
							</div>
						</div>
					</div>
				</article>
			{/each}
		</div>
	{:else}
		<div class="text-center py-12">
			<svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
				<path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2zm3-8V3m10 2V3" />
			</svg>
			<h3 class="mt-2 text-xl font-semibold text-gray-900 dark:text-white">No Posts Yet</h3>
			<p class="mt-1 text-base text-gray-500 dark:text-gray-400">
				It looks like there are no blog posts available at the moment. Please check back later!
			</p>
			<!-- Optional: Link to homepage or other sections -->
			<!-- <div class="mt-6">
				<a href="/" class="text-base font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
					Go back home
					<span aria-hidden="true"> &rarr;</span>
				</a>
			</div> -->
		</div>
	{/if}
</div>

<style>
	/* For line-clamp, you might need a utility class or Tailwind plugin if not default */
	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
