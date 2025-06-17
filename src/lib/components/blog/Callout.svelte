<script lang="ts">
	let { type = 'info', title = '', icon = '', children } = $props();

	const typeClasses = {
		info: {
			container: 'bg-blue-100 border-blue-500 text-blue-700 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-300',
			icon: 'text-blue-500 dark:text-blue-400',
			defaultIcon: 'ℹ️' // Fallback icon
		},
		warning: {
			container: 'bg-yellow-100 border-yellow-500 text-yellow-700 dark:bg-yellow-900 dark:border-yellow-700 dark:text-yellow-300',
			icon: 'text-yellow-500 dark:text-yellow-400',
			defaultIcon: '⚠️' // Fallback icon
		},
		success: {
			container: 'bg-green-100 border-green-500 text-green-700 dark:bg-green-900 dark:border-green-700 dark:text-green-300',
			icon: 'text-green-500 dark:text-green-400',
			defaultIcon: '✅' // Fallback icon
		},
		danger: {
			container: 'bg-red-100 border-red-500 text-red-700 dark:bg-red-900 dark:border-red-700 dark:text-red-300',
			icon: 'text-red-500 dark:text-red-400',
			defaultIcon: '🚫' // Fallback icon
		}
	};

	let currentType = $derived(typeClasses[type] || typeClasses.info);
	let displayIcon = $derived(icon || currentType.defaultIcon);
</script>

<div class="callout border-l-4 p-4 my-4 rounded-md {currentType.container}" role="alert">
	<div class="flex items-center">
		{#if displayIcon}
			<div class="flex-shrink-0 text-xl mr-3 {currentType.icon}">{displayIcon}</div>
		{/if}
		<div class="flex-grow">
			{#if title}
				<p class="font-bold text-lg mb-1">{title}</p>
			{/if}
			<div class="prose dark:prose-invert max-w-none">
				{@render children()}
			</div>
		</div>
	</div>
</div>

<style>
	/* Ensure prose styles within callout adapt if needed */
	.callout :global(p:last-child) {
		margin-bottom: 0;
	}
</style>
