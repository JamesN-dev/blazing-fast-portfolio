<script>
	import '../lib/styles/global.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	
	let { children } = $props();
</script>
  
<div class="site-wrapper">
	<Header />
	<main>
	  {@render children()}
	</main>
	<Footer />
</div>
  
<style>
	:global(body) {
	  background-color: #282828;
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
	  display: flex;
	  justify-content: center;
	  align-items: center;
	}
</style>
