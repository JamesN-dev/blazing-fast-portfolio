<script>
	let { type = 'info', title = '', children } = $props(); // type can be 'info', 'warning', 'success'

	const typeClasses = {
		info: 'callout-info',
		warning: 'callout-warning',
		success: 'callout-success'
	};

	let calloutClass = $derived(typeClasses[type] || typeClasses.info);

	// Simple emoji icons, can be replaced with SVG or other icon components
	let icon = $derived(
		type === 'info' ? 'ℹ️' : type === 'warning' ? '⚠️' : type === 'success' ? '✅' : 'ℹ️'
	);
</script>

<div class="callout {calloutClass}">
	<div class="callout-header">
		<span class="callout-icon">{icon}</span>
		{#if title}
			<strong class="callout-title">{title}</strong>
		{/if}
	</div>
	<div class="callout-content">
		{@render children()}
	</div>
</div>

<style>
	.callout {
		margin: var(--space-6) 0;
		padding: var(--space-4) var(--space-5);
		border-radius: var(--border-radius-md);
		border-left-width: 5px;
		border-left-style: solid;
		box-shadow: var(--shadow-sm);
	}

	.callout-header {
		display: flex;
		align-items: center;
		gap: var(--space-3); /* Increased gap for better spacing */
		margin-bottom: var(--space-3); /* Spacing between header and content */
	}

	.callout-icon {
		font-size: 1.5em; /* Slightly larger icon */
		line-height: 1; /* Ensure icon aligns well */
	}

	.callout-title {
		font-weight: 600;
		font-size: 1.1em; /* Slightly larger title */
	}

	.callout-content :global(p:last-child) {
		margin-bottom: 0; /* Remove bottom margin from last paragraph inside callout */
	}

	/* Info Callout */
	.callout-info {
		background-color: rgba(var(--gruv-blue-rgb, 69, 133, 136), 0.1);
		border-left-color: var(--gruv-blue, #458588);
		color: var(--color-text); /* Default text color */
	}
	.callout-info .callout-title {
		color: var(--gruv-blue, #458588);
	}
	.callout-info .callout-icon {
		color: var(--gruv-blue, #458588);
	}

	/* Warning Callout */
	.callout-warning {
		background-color: rgba(var(--gruv-yellow-rgb, 251, 189, 46), 0.15); /* Slightly stronger bg */
		border-left-color: var(--gruv-yellow, #fabd2f);
		color: var(--color-text);
	}
	.callout-warning .callout-title {
		color: var(--gruv-yellow, #fabd2f);
	}
	.callout-warning .callout-icon {
		color: var(--gruv-yellow, #fabd2f);
	}

	/* Success Callout */
	.callout-success {
		background-color: rgba(var(--gruv-green-rgb, 152, 151, 26), 0.1);
		border-left-color: var(--gruv-green, #98971a);
		color: var(--color-text);
	}
	.callout-success .callout-title {
		color: var(--gruv-green, #98971a);
	}
	.callout-success .callout-icon {
		color: var(--gruv-green, #98971a);
	}

	/* Ensure these RGB versions of colors are in global.css or define them here if not */
	:root {
		--gruv-blue-rgb: 69, 133, 136;
		--gruv-yellow-rgb: 251, 189, 46;
		--gruv-green-rgb: 152, 151, 26;
	}
</style>
