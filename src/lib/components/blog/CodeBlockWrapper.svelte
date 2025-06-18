<script lang="ts">
	import { tick } from 'svelte';

	// Explicitly get children snippet from props
	let { lang = 'text', title = '', code = '', children } = $props();

	let copyText = $state('Copy');
	let codeElement = $state(null); // To bind to the div containing the code
	let showTooltip = $state(false);

	async function copyCode() {
		if (!codeElement) return;

		// Attempt to get text from the rendered children first (Shiki output)
		// This relies on the rendered children having a <pre><code> structure or just <pre>
		let codeToCopy = '';
		const preElement = codeElement.querySelector('pre');
		if (preElement) {
			codeToCopy = preElement.innerText;
		} else {
			// Fallback if no <pre> found (e.g. if children rendered something else)
			// Or if the 'code' prop is used directly
			codeToCopy = codeElement.innerText;
		}

		// If codeToCopy is still empty and 'code' prop was given, use that.
		// This handles the case where children snippet is empty/not what we expect, but code prop is there.
		if (!codeToCopy.trim() && code) {
			codeToCopy = code;
		}

		if (!codeToCopy.trim()) {
			copyText = 'Nothing to copy';
			showTooltip = true;
			setTimeout(() => {
				showTooltip = false;
				copyText = 'Copy';
			}, 2000);
			return;
		}

		try {
			await navigator.clipboard.writeText(codeToCopy);
			copyText = 'Copied!';
			showTooltip = true;
		} catch (err) {
			copyText = 'Failed!';
			showTooltip = true;
			console.error('Failed to copy code: ', err);
		} finally {
			setTimeout(() => {
				copyText = 'Copy';
				showTooltip = false;
			}, 2000);
		}
	}
</script>

<div class="code-block-wrapper">
	{#if title || lang}
		<div class="code-header">
			<span class="code-title">{title || lang}</span>
			<div class="copy-section">
				<button onclick={copyCode} class="copy-button" aria-label="Copy code to clipboard">
					{copyText}
				</button>
				{#if showTooltip}
					<div class="copy-tooltip">
						{copyText}
					</div>
				{/if}
			</div>
		</div>
	{/if}
	<div class="code-content" bind:this={codeElement}>
		{#if children}
			{@render children()}
		{:else if code}
			<pre class="language-{lang}"><code>{@html code}</code></pre>
		{:else}
			<pre class="language-{lang}"><code>{''}</code></pre>
		{/if}
	</div>
</div>

<style>
	.code-block-wrapper {
		background: rgba(20, 20, 20, 0.9);
		border: 1px solid rgba(69, 133, 136, 0.3);
		border-radius: 12px;
		margin: var(--space-6) 0;
		overflow: hidden;
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
	}

	.code-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--space-3) var(--space-4);
		background: rgba(40, 80, 83, 0.4);
		border-bottom: 1px solid rgba(69, 133, 136, 0.3);
	}

	.code-title {
		font-family: 'Fira Code', 'Source Code Pro', monospace;
		font-size: var(--small);
		color: var(--accent);
		font-weight: 500;
	}

	.copy-section {
		position: relative;
	}

	.copy-button {
		background: rgba(69, 133, 136, 0.2);
		border: 1px solid rgba(69, 133, 136, 0.4);
		color: var(--accent);
		padding: var(--space-1) var(--space-3);
		border-radius: 6px;
		font-size: var(--small);
		font-family: 'Fira Code', 'Source Code Pro', monospace;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.copy-button:hover {
		background: rgba(69, 133, 136, 0.3);
		border-color: var(--primary);
	}

	.copy-tooltip {
		position: absolute;
		bottom: calc(100% + 8px);
		left: 50%;
		transform: translateX(-50%);
		background: rgba(0, 0, 0, 0.9);
		color: var(--color-text);
		padding: var(--space-1) var(--space-2);
		border-radius: 4px;
		font-size: var(--small);
		white-space: nowrap;
		z-index: 10;
		pointer-events: none;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
	}

	.code-content {
		padding: var(--space-4);
		background: rgba(10, 10, 10, 0.5);
		overflow-x: auto;
	}

	.code-block-wrapper :global(pre) {
		margin: 0 !important;
		padding: 0 !important;
		background-color: transparent !important;
		border-radius: 0 !important;
		line-height: 1.6;
		overflow-x: auto;
	}

	.code-block-wrapper :global(code) {
		font-family: 'Fira Code', 'Source Code Pro', monospace;
		font-size: 0.85em;
		line-height: 1.6;
	}

	/* Custom scrollbar styling */
	.code-content :global(pre::-webkit-scrollbar) {
		width: 8px;
		height: 8px;
	}

	.code-content :global(pre::-webkit-scrollbar-track) {
		background: transparent;
	}

	.code-content :global(pre::-webkit-scrollbar-thumb) {
		background-color: rgba(69, 133, 136, 0.4);
		border-radius: 4px;
		border: 2px solid transparent;
		background-clip: content-box;
	}

	.code-content :global(pre::-webkit-scrollbar-thumb:hover) {
		background-color: rgba(69, 133, 136, 0.6);
	}
</style>
