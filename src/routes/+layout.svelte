<script>
	export const viewTransition = true;

	import '$lib/styles/global.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import FloatingParticles from '$lib/components/FloatingParticles.svelte';
	import { crossfade } from 'svelte/transition';
	import { navigating, page } from '$app/stores';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	injectSpeedInsights();
	injectAnalytics();

	let { children } = $props();

	// Create crossfade transition
	const [send, receive] = crossfade({
		duration: 300,
		fallback() {
			return {
				duration: 300,
				css: (t) => `opacity: ${t}`
			};
		}
	});
</script>

<div class="site-wrapper">
	<!-- Floating particles that appear gradually when scrolling (disabled on blog posts) -->
	{#if !$page.url.pathname.startsWith('/blog/')}
		<FloatingParticles
			count={30}
			minSize={3}
			maxSize={12}
			color="var(--accent)"
			startOnScroll={true}
			scrollThreshold={100}
			transitionLength={250}
		/>
	{/if}

	<Header />
	<main>
		{#key $navigating?.to?.url.pathname || $page.url.pathname}
			<div
				class="page-transition-container"
				in:receive={{ key: $page.url.pathname }}
				out:send={{ key: $navigating?.from?.url.pathname }}
			>
				{@render children()}
			</div>
		{/key}
	</main>
	<Footer />
</div>

<style>
	@font-face {
		font-family: 'Kilimanjaro Sans Round1';
		font-style: normal;
		font-weight: normal;
		src: url('$lib/assets/fonts/KilimanjaroSansRound1.woff2') format('woff2');
		font-display: swap;
	}
	:global(body) {
		background-color: var(--background);
		margin: 0;
		padding: 0;
		font-family: 'Nunito Sans Variable', sans-serif;
		color: var(--color-text);
	}

	:global(*) {
		box-sizing: border-box;
	}

	.site-wrapper {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background-color: var(--background);
	}

	.page-transition-container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	main {
		flex: 1;
		background-color: var(--background);
		display: flex;
		flex-direction: column;
		/* Removed align-items: center to prevent conflict with CSS Grid */
		min-height: 100vh;
	}
</style>
