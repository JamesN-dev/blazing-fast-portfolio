<script>
	import Nav from '$lib/components/Nav.svelte';
	import { onMount } from 'svelte';

	let scrollY = $state(0);

	onMount(() => {
		const handleScroll = () => {
			scrollY = window.scrollY;
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<header class="site-header">
	<div class="container">
		<Nav />
	</div>
</header>

<style>
	/* Site header (navbar) */
	.site-header {
		position: fixed;
		height: var(--header-height);
		left: 0px;
		right: 0px;
		top: 0px;
		background: var(--gruv-darkorange);
		padding: 0;
		border-bottom: none;
		z-index: 50;
	}

	.container {
		max-width: var(--max-width);
		margin: 0 auto;
		/* RAM PATTERN - Dynamic padding that never breaks */
		padding: clamp(8px, 2vw, 13px) clamp(16px, 4vw, 29px);
		height: 100%;
		display: flex;
		align-items: center;
	}
</style>
