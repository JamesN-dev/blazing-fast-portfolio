<script>
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	// Props with defaults
	let {
		count = 20,
		minSize = 5,
		maxSize = 15,
		color = '#FBBD2E',
		startOnScroll = true,
		scrollThreshold = 50,
		transitionLength = 200 // The scroll distance in pixels over which the transition occurs
	} = $props();

	let opacity = $state(0);
	let scrollY = $state(0);

	onMount(() => {
		if (!startOnScroll) {
			opacity = 1;
			return;
		}

		const handleScroll = () => {
			scrollY = window.scrollY;

			// Calculate opacity based on scroll position and transition length
			if (scrollY <= scrollThreshold) {
				opacity = 0;
			} else if (scrollY >= scrollThreshold + transitionLength) {
				opacity = 1;
			} else {
				// Create a smooth transition between threshold and threshold+transitionLength
				opacity = (scrollY - scrollThreshold) / transitionLength;
			}
		};

		window.addEventListener('scroll', handleScroll);

		// Initial check
		handleScroll();

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<div class="particles-container" style="--opacity: {opacity};">
	{#each Array(count) as _, i}
		<div
			class="particle"
			style="--size: {minSize + Math.random() * (maxSize - minSize)}px;
            --x: {Math.random() * 100}%;
            --y: {Math.random() * 100}%;
            --delay: {i * 0.1}s;
            --duration: {3 + Math.random() * 7}s;
            --color: {color};"
			transition:fade={{ delay: 200 + i * 50, duration: 1000 }}
		></div>
	{/each}
</div>

<style>
	/* Particles animation */
	.particles-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		pointer-events: none;
		z-index: 1;
		opacity: var(--opacity, 0);
		transition: opacity 0.9s ease;
	}

	.particle {
		position: absolute;
		width: var(--size);
		height: var(--size);
		background: radial-gradient(circle, var(--color) 0%, rgba(251, 189, 46, 0) 70%);
		border-radius: 50%;
		top: var(--y);
		left: var(--x);
		opacity: 0.6;
		animation: float var(--duration) ease-in-out var(--delay) infinite;
	}

	@keyframes float {
		0% {
			transform: translateY(0) translateX(0);
			opacity: 0;
		}
		20% {
			opacity: 0.6;
		}
		80% {
			opacity: 0.6;
		}
		100% {
			transform: translateY(-100px) translateX(20px);
			opacity: 0;
		}
	}
</style>
