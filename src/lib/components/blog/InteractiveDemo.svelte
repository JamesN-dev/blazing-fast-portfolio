<script lang="ts">
	// This component is a simple wrapper for now.
	// It could be expanded to include features like:
	// - Tabs for code and demo
	// - Resizable demo area
	// - Error boundaries for the demo

	let { title = 'Interactive Demo' } = $props();
</script>

<div class="interactive-demo border rounded-lg my-6">
	{#if title}
		<div class="bg-gray-100 dark:bg-gray-800 p-3 border-b rounded-t-lg">
			<h3 class="text-lg font-semibold">{title}</h3>
		</div>
	{/if}
	<div class="p-4 bg-white dark:bg-gray-900 rounded-b-lg">
		{#snippet children()}
			<!-- Demo Svelte component or markup goes here -->
		{/snippet}
		{@render children()}
	</div>
</div>

<style>
	.interactive-demo {
		/* Add any specific wrapper styles here */
		box-shadow: 0 2px 10px rgba(0,0,0,0.1);
	}
</style>
