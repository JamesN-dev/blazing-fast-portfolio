<script lang="ts">
	// Interactive demo component for blog posts
	// Features:
	// - Shows live code examples
	// - Matches the blog's design system
	// - No more Tailwind!

	let { title = 'Interactive Demo', children } = $props();
</script>

<div class="interactive-demo">
	{#if title}
		<div class="demo-header">
			<h3 class="demo-title">{title}</h3>
		</div>
	{/if}
	<div class="demo-content">
		{@render children()}
	</div>
</div>

<style>
	.interactive-demo {
		margin: var(--space-8) 0;
		background: rgba(40, 80, 83, 0.2);
		border: 1px solid var(--primary);
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
	}

	.demo-header {
		background: linear-gradient(135deg, rgba(69, 133, 136, 0.3), rgba(40, 80, 83, 0.4));
		padding: var(--space-4) var(--space-6);
		border-bottom: 1px solid rgba(69, 133, 136, 0.3);
	}

	.demo-title {
		font-family: 'Kilimanjaro Sans Round1', 'Nunito Sans', sans-serif;
		font-size: var(--h5);
		color: var(--accent);
		margin: 0;
		font-weight: 600;
	}

	.demo-content {
		padding: var(--space-6);
		background: rgba(40, 80, 83, 0.1);
		color: var(--color-text);
	}
</style>
