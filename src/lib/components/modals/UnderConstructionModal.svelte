<script>
	import { fade, scale } from 'svelte/transition';

	// Props with defaults
	let {
		show = $bindable(true),
		title = '🚧 Coming Soon! 🚧',
		message = "This page isn't done yet. Check back soon!",
		buttonText = "C'mon, bro, ship faster!",
		icon = '🚧',
		customClass = ''
	} = $props();

	function handleClose() {
		show = false;
	}
</script>

{#if show}
	<div class="modal-overlay {customClass}" transition:fade>
		<div class="modal-content" transition:scale>
			<h2>{icon} {title.replace(/🚧/g, '').trim()} {icon}</h2>
			<p>{message}</p>
			<button onclick={handleClose}>{buttonText}</button>
		</div>
	</div>
{/if}

<style>
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.8);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
		backdrop-filter: blur(5px);
	}

	.modal-content {
		background: #333333;
		border-radius: 12px;
		padding: 40px;
		text-align: center;
		max-width: 500px;
		width: 90%;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
		border: 1px solid rgba(251, 189, 46, 0.2);
	}

	.modal-content h2 {
		font-family: 'Kilimanjaro Sans Round1', 'Nunito Sans Variable', sans-serif;
		font-size: 32px;
		color: var(--accent);
		margin: 0 0 20px 0;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
	}

	.modal-content p {
		font-family: 'Nunito Sans Variable', sans-serif;
		font-size: 18px;
		color: var(--description);
		margin: 0 0 30px 0;
		line-height: 1.6;
	}

	.modal-content button {
		font-family: 'Nunito Sans Variable', sans-serif;
		font-size: 16px;
		font-weight: 600;
		color: var(--color-text);
		background: var(--primary);
		border: none;
		border-radius: 8px;
		padding: 14px 28px;
		cursor: pointer;
		transition:
			background 0.3s ease,
			transform 0.3s ease,
			box-shadow 0.3s ease;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	}

	.modal-content button:hover {
		background: var(--gruv-darkblue);
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
	}

	.modal-content button:active {
		transform: translateY(0);
	}

	@media (max-width: 768px) {
		.modal-content {
			padding: 30px 20px;
		}

		.modal-content h2 {
			font-size: 24px;
		}

		.modal-content p {
			font-size: 16px;
		}
	}
</style>
