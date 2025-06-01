<script>
	export const viewTransition = true;

	import '$lib/styles/global.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { onMount } from 'svelte';
	import { CustomCursor, ScrollAnimator } from '$lib/utils/animations.js';
	import FloatingParticles from '$lib/components/FloatingParticles.svelte';
	import { crossfade } from 'svelte/transition';
	import { navigating, page } from '$app/stores';
	import { MediaQuery } from 'svelte/reactivity';
	import { setContext } from 'svelte';
	import { browser } from '$app/environment';

	// Mobile-first responsive breakpoints - these values must match CSS custom properties
	// JavaScript MediaQuery API requires pixel values, but they correspond to our CSS variables:
	const isMobile = new MediaQuery('(max-width: 767.98px)'); // Mobile and below
	const isTabletUp = new MediaQuery('(min-width: 768px)'); // Tablet and up
	const isDesktopUp = new MediaQuery('(min-width: 1024px)'); // Desktop and up
	const isLargeDesktopUp = new MediaQuery('(min-width: 1440px)'); // Large desktop and up

	// Additional breakpoints for specific cases
	const isTinyMobile = new MediaQuery('(max-width: 375px)'); // Tiny mobile
	const isSmallMobile = new MediaQuery('(max-width: 480px)'); // Small mobile
	const isTabletOnly = new MediaQuery('(min-width: 768px) and (max-width: 1023.98px)'); // Tablet only
	const isSkillsGridBreakpoint = new MediaQuery('(max-width: 920px)'); // Special breakpoint for skills grid

	// Create a responsive context that any component can use
	const responsive = {
		isMobile,
		isTinyMobile,
		isSmallMobile,
		isTabletUp,
		isTabletOnly,
		isDesktopUp,
		isLargeDesktopUp,
		isSkillsGridBreakpoint
	};

	// Set context so child components can access breakpoints
	setContext('responsive', responsive);

	let scrollY = $state(0);
	let { children } = $props();

	// Create crossfade transition
	const [send, receive] = crossfade({
		duration: 300,
		fallback(node) {
			return {
				duration: 300,
				css: (t) => `opacity: ${t}`
			};
		}
	});

	$effect(() => {
		if (!browser) return;

		// Add scroll listener for particle background
		const handleScroll = () => {
			scrollY = window.scrollY;
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};

		// Set up scroll animations
		const scrollAnimator = new ScrollAnimator();
		scrollAnimator
			.init()
			.observe('.skill-category', 'animate-fade-up')
			.observe('.project-card', 'animate-fade-up')
			.observe('.experience-item', 'animate-fade-right', 0.1)
			.observe('h1, h2, h3', 'animate-fade-up', 0.2)
			.observe('p', 'animate-fade-up', 0.3)
			.observe('.underline', 'animate-width-grow', 0.4);
	});
</script>

<div class="site-wrapper">
	<!-- Floating particles that appear gradually when scrolling -->
	<FloatingParticles
		count={30}
		minSize={3}
		maxSize={12}
		color="var(--accent)"
		startOnScroll={true}
		scrollThreshold={100}
		transitionLength={250}
	/>

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
		align-items: center;
		min-height: 100vh;
	}
</style>
