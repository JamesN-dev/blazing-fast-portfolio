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
			setTimeout(() => { showTooltip = false; copyText = 'Copy'; }, 2000);
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
					<div class="tooltip absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded-md shadow-lg whitespace-nowrap z-10">
						{copyText}
					</div>
				{/if}
			</div>
		</div>
	{/if}
	<div class="code-content p-4" bind:this={codeElement}>
		{#if children}
			{@render children()}
		{:else if code}
			<!-- Fallback to render raw code if no children snippet and code prop exists -->
			<pre class="language-{lang}"><code>{@html code}</code></pre>
		{:else}
			<!-- Optional: placeholder if neither is available. Shiki should fill via children. -->
			<pre class="language-{lang}"><code>{''}</code></pre>
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
