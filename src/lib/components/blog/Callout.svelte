<script>
	let { type = 'info', title, children } = $props();
</script>

<div class="callout callout-{type}">
	{#if title}
		<h4 class="callout-title">{title}</h4>
	{/if}
	<div class="callout-content">
		{@render children()}
	</div>
</div>

<style>
	.callout {
		border-left: 4px solid;
		padding: 1rem;
		margin: 1.5rem 0;
		border-radius: 0 4px 4px 0;
	}

	.callout-info {
		border-color: #3b82f6;
		background: rgba(59, 130, 246, 0.1);
	}

	.callout-error {
		border-color: #ef4444;
		background: rgba(239, 68, 68, 0.1);
	}

	.callout-success {
		border-color: #10b981;
		background: rgba(16, 185, 129, 0.1);
	}

	.callout-warning {
		border-color: #f59e0b;
		background: rgba(245, 158, 11, 0.1);
	}

	.callout-title {
		margin: 0 0 0.5rem 0;
		font-weight: 600;
		font-size: 1.1rem;
	}

	.callout-content {
		margin: 0;
	}
</style>
