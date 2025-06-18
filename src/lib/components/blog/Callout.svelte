<script lang="ts">
	let { type = 'info', title = '', icon = '', children } = $props();

	const typeConfig = {
		info: {
			defaultIcon: 'ℹ️',
			bgColor: 'rgba(69, 133, 136, 0.15)',
			borderColor: 'var(--primary)',
			textColor: 'var(--accent)'
		},
		warning: {
			defaultIcon: '⚠️',
			bgColor: 'rgba(255, 193, 7, 0.15)',
			borderColor: '#ffc107',
			textColor: '#ffc107'
		},
		success: {
			defaultIcon: '✅',
			bgColor: 'rgba(40, 167, 69, 0.15)',
			borderColor: '#28a745',
			textColor: '#28a745'
		},
		danger: {
			defaultIcon: '🚫',
			bgColor: 'rgba(220, 53, 69, 0.15)',
			borderColor: '#dc3545',
			textColor: '#dc3545'
		},
		error: {
			defaultIcon: '❌',
			bgColor: 'rgba(220, 53, 69, 0.15)',
			borderColor: '#dc3545',
			textColor: '#dc3545'
		}
	};

	let currentType = $derived(typeConfig[type] || typeConfig.info);
	let displayIcon = $derived(icon || currentType.defaultIcon);
</script>

<div
	class="callout"
	role="alert"
	style="
	--callout-bg: {currentType.bgColor};
	--callout-border: {currentType.borderColor};
	--callout-text: {currentType.textColor};
"
>
	<div class="callout-content">
		{#if displayIcon}
			<div class="callout-icon">{displayIcon}</div>
		{/if}
		<div class="callout-body">
			{#if title}
				<p class="callout-title">{title}</p>
			{/if}
			<div class="callout-text">
				{@render children()}
			</div>
		</div>
	</div>
</div>

<style>
	.callout {
		background: var(--callout-bg);
		border: 1px solid var(--callout-border);
		border-left: 4px solid var(--callout-border);
		border-radius: 8px;
		margin: var(--space-6) 0;
		padding: var(--space-4);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.callout-content {
		display: flex;
		align-items: flex-start;
		gap: var(--space-3);
	}

	.callout-icon {
		font-size: var(--h5);
		line-height: 1;
		flex-shrink: 0;
		margin-top: 2px;
	}

	.callout-body {
		flex: 1;
		min-width: 0;
	}

	.callout-title {
		font-family: 'Kilimanjaro Sans Round1', 'Nunito Sans', sans-serif;
		font-size: var(--h6);
		font-weight: 600;
		color: var(--callout-text);
		margin: 0 0 var(--space-2) 0;
		line-height: 1.3;
	}

	.callout-text {
		color: var(--color-text);
		font-size: var(--body);
		line-height: 1.6;
	}

	.callout-text :global(p) {
		margin: 0 0 var(--space-3) 0;
	}

	.callout-text :global(p:last-child) {
		margin-bottom: 0;
	}

	.callout-text :global(code) {
		background: rgba(0, 0, 0, 0.1);
		padding: 2px 4px;
		border-radius: 4px;
		font-size: 0.9em;
	}
</style>
