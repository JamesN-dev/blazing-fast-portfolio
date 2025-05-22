<script>
	import '$lib/styles/global.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { onMount } from 'svelte';
	import { CustomCursor, ScrollAnimator } from '$lib/utils/animations.js';
	import FloatingParticles from '$lib/components/FloatingParticles.svelte';

	let scrollY = $state(0);
	let { children } = $props();

	// Initialize custom animations when component mounts
	onMount(() => {
		// Initialize custom cursor (on desktop only)
		if (window.innerWidth > 768) {
			const cursor = new CustomCursor();
			cursor.init();
		}

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
		color="#FBBD2E"
		startOnScroll={true}
		scrollThreshold={100}
		transitionLength={250}
	/>

	<Header />
	<main>
		{@render children()}
	</main>
	<Footer />
</div>

<style>
	@font-face {
		font-family: 'Kilimanjaro Sans Round1';
		font-style: normal;
		font-weight: normal;
		src: url($lib/assets/fonts/KilimanjaroSansRound1.woff2) format('woff2');
	}
	:global(body) {
		background-color: #282828;
		margin: 0;
		padding: 0;
		font-family: 'Nunito Sans', sans-serif;
		color: #fff4db;
	}

	:global(*) {
		box-sizing: border-box;
	}

	.site-wrapper {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background-color: #282828;
	}

	main {
		flex: 1;
		background-color: #282828;
		padding-top: 86px; /* Equal to header height */
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
