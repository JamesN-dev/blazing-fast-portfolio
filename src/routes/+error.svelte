<script>
	import { page } from '$app/state';
	import { fly, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	let visible = $state(false);

	// Show animation after mount
	$effect(() => {
		setTimeout(() => {
			visible = true;
		}, 100);
	});
</script>

<div class="error-container">
	{#if visible}
		<div class="error-content" transition:fade={{ duration: 600 }}>
			<div
				class="error-graphic"
				transition:fly={{ delay: 200, duration: 800, y: -50, easing: quintOut }}
			>
				<div class="error-code">{page.status}</div>
				<div class="fireball-error">🔥</div>
			</div>

			<div
				class="error-text"
				transition:fly={{ delay: 400, duration: 800, y: 30, easing: quintOut }}
			>
				<h1>Oops! Something went wrong</h1>
				<p class="error-message">{page.error?.message || 'Page not found'}</p>
				<p class="error-description">
					{#if page.status === 404}
						The page you're looking for doesn't exist or has been moved.
					{:else if page.status === 500}
						We're having some technical difficulties. Please try again later.
					{:else}
						An unexpected error occurred. Our team has been notified.
					{/if}
				</p>
			</div>

			<div
				class="error-actions"
				transition:fly={{ delay: 600, duration: 800, y: 20, easing: quintOut }}
			>
				<a href="/" class="button-primary">
					<span>← Back to Home</span>
				</a>
				<button onclick={() => history.back()} class="button-secondary">
					<span>Go Back</span>
				</button>
			</div>
		</div>
	{/if}
</div>

<style>
	.error-container {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--background);
		padding: 2rem;
	}

	.error-content {
		text-align: center;
		max-width: 600px;
		width: 100%;
	}

	.error-graphic {
		position: relative;
		margin-bottom: 2rem;
	}

	.error-code {
		font-family: 'Kilimanjaro Sans Round1', 'Nunito Sans Variable', sans-serif;
		font-size: clamp(6rem, 15vw, 12rem);
		font-weight: 700;
		background: linear-gradient(
			135deg,
			var(--accent) 0%,
			var(--secondary) 40%,
			var(--gruv-red) 100%
		);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		line-height: 1;
		margin-bottom: 1rem;
	}

	.fireball-error {
		font-size: 4rem;
		animation: flicker 2s infinite alternate;
	}

	@keyframes flicker {
		0% {
			opacity: 1;
			transform: scale(1);
		}
		50% {
			opacity: 0.8;
			transform: scale(1.05);
		}
		100% {
			opacity: 1;
			transform: scale(1);
		}
	}

	.error-text h1 {
		font-family: 'Kilimanjaro Sans Round1', 'Nunito Sans Variable', sans-serif;
		font-size: clamp(2rem, 5vw, 3rem);
		color: var(--color-text);
		margin-bottom: 1rem;
	}

	.error-message {
		font-size: 1.25rem;
		color: var(--accent);
		font-weight: 600;
		margin-bottom: 1rem;
	}

	.error-description {
		font-size: 1rem;
		color: var(--description);
		line-height: 1.6;
		margin-bottom: 2.5rem;
	}

	.error-actions {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.button-primary,
	.button-secondary {
		position: relative;
		border-radius: 0.5rem;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		padding: 1rem 2rem;
		text-decoration: none;
		font-family: 'Nunito Sans Variable', sans-serif;
		font-size: 1rem;
		font-weight: 500;
		color: var(--color-text-light);
		border: none;
		cursor: pointer;
		transition:
			transform 0.2s ease,
			background 0.2s ease;
		min-width: 140px;
	}

	.button-primary {
		background: var(--gruv-darkorange);
	}

	.button-secondary {
		background: var(--primary);
	}

	.button-primary:hover,
	.button-secondary:hover {
		transform: translateY(-2px);
	}

	.button-primary:active,
	.button-secondary:active {
		transform: translateY(0);
	}

	@media (max-width: 640px) {
		.error-actions {
			flex-direction: column;
			align-items: center;
		}

		.button-primary,
		.button-secondary {
			width: 100%;
			max-width: 280px;
		}
	}
</style>
