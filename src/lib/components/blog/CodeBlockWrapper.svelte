<script lang="ts">
	import { tick } from 'svelte';

	let { lang = 'text', title = '', code = '' } = $props();

	let copyText = $state('Copy');
	let codeElement = $state(null);
	let showTooltip = $state(false);

	async function copyCode() {
		if (!codeElement) return;

		let codeToCopy = '';
		if (codeElement.querySelector('pre > code')) {
			// If Shiki output with pre > code structure
			codeToCopy = codeElement.querySelector('pre > code').innerText;
		} else if (codeElement.querySelector('pre')) {
			// If Shiki output is just pre
			codeToCopy = codeElement.querySelector('pre').innerText;
		} else {
			// Fallback for plain text or unexpected structure
			codeToCopy = codeElement.innerText;
		}

		// If code prop was passed directly (e.g. for non-MDsveX usage)
		if (!codeToCopy && code) {
			codeToCopy = code;
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

	// This allows MDsveX to slot its highlighted HTML output here
	// The `code` prop is a fallback if not used with MDsveX's slot
</script>

<div class="code-block-wrapper bg-gray-800 dark:bg-black rounded-lg my-6 overflow-hidden shadow-lg">
	{#if title || lang}
		<div class="header flex justify-between items-center p-3 bg-gray-700 dark:bg-gray-900 text-gray-300 dark:text-gray-400 text-sm">
			<span class="title font-mono">{title || lang}</span>
			<div class="relative">
				<button
					onclick={copyCode}
					class="copy-button bg-gray-600 hover:bg-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-200 dark:text-gray-300 py-1 px-3 rounded-md text-xs transition-colors"
					aria-label="Copy code to clipboard"
				>
					{copyText}
				</button>
				{#if showTooltip}
					<div class="tooltip absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded-md shadow-lg whitespace-nowrap">
						{copyText}
					</div>
				{/if}
			</div>
		</div>
	{/if}
	<div class="code-content p-4" bind:this={codeElement}>
		{#if $$slots.default}
			<!-- MDsveX highlighted HTML will be slotted here -->
			{#snippet children()}{/snippet}
			{@render children()}
		{:else if code}
			<!-- Fallback to render raw code if no slot content and code prop exists -->
			<pre class="language-{lang}"><code>{@html code}</code></pre>
		{/if}
	</div>
</div>

<style>
	.code-block-wrapper :global(pre) {
		margin: 0 !important; /* Override any prose or theme margins */
		padding: 0 !important; /* Override any prose or theme paddings */
		background-color: transparent !important; /* Ensure wrapper controls background */
		border-radius: 0 !important;
		line-height: 1.6; /* Adjust for readability */
	}
	.code-block-wrapper :global(code) {
		font-family: 'Fira Code', 'Operator Mono', 'Source Code Pro', monospace; /* Example font stack */
		font-size: 0.9em; /* Slightly smaller for better fit */
	}

	.tooltip {
		pointer-events: none; /* Prevent tooltip from interfering with clicks */
	}

	/* Custom scrollbar styling for webkit browsers */
	.code-content :global(pre::-webkit-scrollbar) {
		width: 8px;
		height: 8px;
	}
	.code-content :global(pre::-webkit-scrollbar-track) {
		background: transparent;
	}
	.code-content :global(pre::-webkit-scrollbar-thumb) {
		background-color: rgba(107, 114, 128, 0.5); /* gray-500 with opacity */
		border-radius: 4px;
		border: 2px solid transparent;
		background-clip: content-box;
	}
	.code-content :global(pre::-webkit-scrollbar-thumb:hover) {
		background-color: rgba(75, 85, 99, 0.7); /* gray-600 with opacity */
	}
</style>
