<script lang="ts">
	import BlogPostLayout from '$lib/components/blog/BlogPostLayout.svelte';
	import { page } from '$app/state'; // For page store, if needed for other things

	// Data from the load function in +page.server.js
	let { data } = $props();

	// Destructure for easier access in the template, though direct access via data.frontmatter.title etc. is also fine
	let contentComponent = $derived(data.content);
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
	<meta property="og:url" content={$page.url.href} />
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
	{#if contentComponent}
		<svelte:component this={contentComponent} />
	{:else}
		<p>Error: Blog post content could not be loaded.</p>
		<!-- This should ideally be caught by the 404 in +page.server.js if content is truly missing -->
	{/if}
</BlogPostLayout>
