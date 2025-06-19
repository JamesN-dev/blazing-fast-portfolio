<script>
	// Props
	let { tocItems = [] } = $props();

	function getTocClass(level) {
		switch (level) {
			case 1:
				return 'toc-level-1';
			case 2:
				return 'toc-level-2';
			case 3:
				return 'toc-level-3';
			case 4:
				return 'toc-level-4';
			default:
				return 'toc-level-deep';
		}
	}
</script>

{#if tocItems && tocItems.length > 0}
	<aside class="toc-sidebar">
		<h2 class="toc-title">On this page</h2>
		<nav aria-label="Table of contents">
			<ul class="toc-list">
				{#each tocItems as item (item.id)}
					<li class="toc-item {getTocClass(item.level)}">
						<a href="#{item.id}" class="toc-link">
							{item.text}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</aside>
{/if}

<style>
	.toc-sidebar {
		position: sticky;
		top: 20vh; /* Lower position to avoid nav overlap */
		transform: translateY(0); /* Remove centering transform */
		width: 300px;
		max-height: 400px;
		overflow-y: auto;
		overflow-x: hidden;
		background: linear-gradient(135deg, rgba(69, 133, 136, 0.4), rgba(51, 51, 51, 0.8));
		border: 1px solid rgba(69, 133, 136, 0.3);
		border-radius: 16px;
		padding: var(--space-6);
		backdrop-filter: blur(10px);
		transition: all 0.4s ease;
		scrollbar-width: thin;
		scrollbar-color: var(--gruv-yellow) transparent;
		z-index: 1; /* Lower z-index to stay behind nav */
	}

	.toc-sidebar::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: linear-gradient(90deg, var(--gruv-blue), var(--accent), #0099cc);
		border-radius: 16px 16px 0 0;
		opacity: 0.8;
	}

	/* Webkit scrollbar styling */
	.toc-sidebar::-webkit-scrollbar {
		width: 8px;
	}

	.toc-sidebar::-webkit-scrollbar-track {
		background: rgba(69, 133, 136, 0.1);
		border-radius: 4px;
	}

	.toc-sidebar::-webkit-scrollbar-thumb {
		background: var(--gruv-yellow);
		border-radius: 4px;
		opacity: 0.7;
	}

	.toc-sidebar::-webkit-scrollbar-thumb:hover {
		background: var(--accent);
		opacity: 1;
	}

	.toc-title {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--gruv-yellow);
		margin: 0 0 var(--space-4) 0;
		padding-bottom: var(--space-3);
		border-bottom: 1px solid rgba(69, 133, 136, 0.3);
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
	}

	.toc-list {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.toc-item {
		margin-bottom: var(--space-2);
	}

	.toc-link {
		display: block;
		color: var(--color-text);
		text-decoration: none;
		font-size: 0.8rem;
		line-height: 1.4;
		padding: var(--space-2) var(--space-3);
		border-radius: 6px;
		transition: all 0.2s ease;
	}

	.toc-link:hover {
		background: rgba(69, 133, 136, 0.2);
		color: var(--gruv-yellow);
		transform: translateX(4px);
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
	}

	/* TOC hierarchy styling */
	.toc-level-2 .toc-link {
		font-weight: 500;
		padding-left: var(--space-3);
	}

	.toc-level-3 .toc-link {
		font-size: 0.75rem;
		padding-left: var(--space-6);
		color: var(--color-text-muted);
	}

	.toc-level-4 .toc-link {
		font-size: 0.7rem;
		padding-left: var(--space-8);
		color: var(--color-text-muted);
	}

	.toc-level-deep .toc-link {
		font-size: 0.65rem;
		padding-left: var(--space-10);
		color: var(--color-text-muted);
	}

	/* Hide TOC on mobile using container queries */
	@container (max-width: 1000px) {
		.toc-sidebar {
			display: none;
		}
	}
</style>
