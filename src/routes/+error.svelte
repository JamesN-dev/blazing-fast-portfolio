<script>
	import { page } from '$app/stores'; // (or '$app/state' in some versions)
	import { fly, fade } from 'svelte/transition';
</script>

{#if $page.status === 404}
	<div class="not-found-container" in:fade>
		<svg
			width="140"
			height="140"
			viewBox="0 0 140 140"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			class="mushroom-cloud"
		>
			<ellipse cx="70" cy="100" rx="35" ry="20" fill="#ccc2ab" opacity="0.9" />
			<ellipse cx="70" cy="80" rx="45" ry="25" fill="#fff4db" opacity="0.7" />
			<ellipse cx="70" cy="60" rx="50" ry="30" fill="#fbbd2e" opacity="0.85" />
			<ellipse cx="70" cy="45" rx="40" ry="18" fill="#ea732f" opacity="0.75" />
			<ellipse cx="70" cy="30" rx="22" ry="10" fill="#cd241e" opacity="0.6" />
		</svg>
		<h1 class="code" in:fly={{ y: -20, duration: 400 }}>404</h1>
		<p class="message" in:fly={{ y: 20, duration: 400, delay: 150 }}>
			I build. I ship. I get wrekt.
		</p>
		<a class="home-link" href="/">Go back home</a>
	</div>
{:else}
	<!-- For other error types, show something less memey -->
	<div class="not-found-container" in:fade>
		<h1 class="code" in:fly={{ y: -20, duration: 400 }}>{$page.status}</h1>
		<p class="message" in:fly={{ y: 20, duration: 400, delay: 150 }}>
			{$page.error?.message || 'Unknown error.'}
		</p>
		<a class="home-link" href="/">Go back home</a>
	</div>
{/if}

<style>
	.not-found-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		background-color: #1c1c1c;
		color: #fff4db;
		text-align: center;
		padding: 0 20px;
	}

	.code {
		font-size: 96px;
		font-weight: bold;
		margin-bottom: 20px;
		color: #fbbd2e;
		font-family: 'Kilimanjaro Sans Round1', 'Nunito Sans', sans-serif;
	}

	.message {
		font-size: 24px;
		font-family: 'Nunito Sans', sans-serif;
		margin-bottom: 40px;
		color: #ccc2ab;
	}

	.home-link {
		font-size: 18px;
		color: #458588;
		text-decoration: none;
		border: 2px solid #458588;
		padding: 10px 20px;
		border-radius: 4px;
		transition:
			background 0.3s ease,
			color 0.3s ease;
	}

	.home-link:hover {
		background: #458588;
		color: #1c1c1c;
	}
	.mushroom-cloud {
		margin: 0 auto 24px auto;
		display: block;
		filter: drop-shadow(0 4px 24px #cd241e99);
		animation: puff-in 1.5s cubic-bezier(0.32, 1.56, 0.64, 1) 0.2s both;
	}
	@keyframes puff-in {
		from {
			opacity: 0;
			transform: scale(0.5);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}
</style>
