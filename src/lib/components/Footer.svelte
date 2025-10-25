<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	let visible = $state(false);
	let year = new Date().getFullYear();

	// SVG path for the wave animation
	const wavePath =
		'M0,128 C100,90 200,180 300,128 C400,76 500,180 600,128 C700,76 800,180 900,128 C1000,76 1100,180 1200,128 C1300,76 1400,180 1500,128 C1600,76 1700,180 1800,128 C1900,76 2000,180 2100,128 C2100,230 0,230 0,128 Z';

	// Intersection observer to trigger animations when the footer is in view
	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						visible = true;
						observer.disconnect();
					}
				});
			},
			{ threshold: 0.2 }
		);

		const footer = document.querySelector('.site-footer');
		if (footer) {
			observer.observe(footer);
		}

		return () => {
			observer.disconnect();
		};
	});
</script>

<footer class="site-footer">
	<div class="wave-container">
		<svg viewBox="0 0 2100 230" preserveAspectRatio="none">
			<path d={wavePath} class="wave" />
			<path d={wavePath} class="wave wave2" />
			<path d={wavePath} class="wave wave3" />
		</svg>
	</div>

	<div class="container">
		{#if visible}
			<div class="footer-content">
				<div class="footer-left" transition:fly={{ y: 30, duration: 600, easing: quintOut }}>
					<a href="/" class="footer-logo-link" aria-label="blazingfast.app">
						<div class="footer-logo">Jn</div>
					</a>
					<p class="tagline">Go Fast</p>
				</div>

				<div
					class="footer-center"
					transition:fly={{ y: 30, duration: 600, delay: 100, easing: quintOut }}
				>
					<div class="quick-links">
						<h3>Quick Links</h3>
						<ul aria-label="Footer Links">
							<li><a href="/about">About</a></li>
							<li><a href="/experience" aria-label="Experience">Experience</a></li>
							<li><a href="/work">Work</a></li>
							<li><a href="/contact">Contact</a></li>
							<li>
								<a
									href="https://g15vtr55yw.ufs.sh/f/Bh1ffWkP18dQ9jq8INEAMI4PXa63rRpkOGoC0QejZcUx5gDB"
									download
									aria-label="Résumé">Résumé</a
								>
							</li>
							<li><a href="/sitemap.xml">Sitemap</a></li>
						</ul>
					</div>
				</div>

				<div
					class="footer-right"
					transition:fly={{ y: 30, duration: 600, delay: 200, easing: quintOut }}
				>
					<div class="contact-links">
						<h3>Contact</h3>
						<ul aria-label="Footer Contact">
							<li>
								<a
									href="https://github.com/Jamesn-dev"
									aria-label="JamesN on GitHub"
									target="_blank"
									rel="noopener noreferrer"
									class="social-link"
								>
									<svg class="social-icon" viewBox="0 0 24 24" width="24" height="24">
										<path
											d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
											fill="#6e5494"
										/>
									</svg>
									<span>GitHub</span>
								</a>
							</li>
							<li>
								<a
									href="mailto:james@blazingfast.app"
									aria-label="Email james@blazingfast.app"
									class="social-link"
								>
									<svg class="social-icon" viewBox="0 0 24 24" width="24" height="24">
										<path
											d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"
											fill="#EA732F"
										/>
									</svg>
									<span>james@blazingfast.app</span>
								</a>
							</li>
							<li>
								<a
									href="https://linkedin.com/in/james-niemerg"
									aria-label="JamesN on LinkedIn"
									target="_blank"
									rel="noopener noreferrer"
									class="social-link"
								>
									<svg class="social-icon" viewBox="0 0 24 24" width="24" height="24">
										<path
											d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
											fill="#0077b5"
										/>
									</svg>
									<span>LinkedIn</span>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div class="footer-bottom" transition:fade={{ duration: 800, delay: 400 }}>
				<p>&copy; {year} blazingfast.app. All rights reserved.</p>
				<button
					class="back-to-top"
					onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
					aria-label="Back to top">Back to Top</button
				>
			</div>
		{/if}
	</div>
</footer>

<style>
	/* Footer styles */
	.site-footer {
		background-color: var(--background);
		color: var(--color-text);
		padding: 80px 0 40px;
		font-family: 'Nunito Sans Variable', sans-serif;
		position: relative;
		overflow: hidden;
		z-index: 10;
		border-top: 1px solid rgba(251, 189, 46, 0.1);
	}

	/* Wave animation */
	.wave-container {
		position: absolute;
		top: -100px;
		left: 0;
		width: 100%;
		height: 100px;
		overflow: hidden;
	}

	.wave-container svg {
		width: 100%;
		height: 100%;
	}

	.wave {
		fill: var(--gruv-darkorange);
		animation: wave 20s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
	}

	.wave2 {
		fill: var(--gruv-red);
		opacity: 0.5;
		animation:
			wave 15s cubic-bezier(0.36, 0.45, 0.63, 0.53) -5s infinite,
			swell 7s ease -1.25s infinite;
	}

	.wave3 {
		fill: var(--accent);
		opacity: 0.3;
		animation: wave 30s cubic-bezier(0.36, 0.45, 0.63, 0.53) -2s infinite;
	}

	@keyframes wave {
		0% {
			transform: translateX(0);
		}
		50% {
			transform: translateX(-50%);
		}
		100% {
			transform: translateX(0);
		}
	}

	@keyframes swell {
		0%,
		100% {
			transform: translateY(-5px);
		}
		50% {
			transform: translateY(5px);
		}
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 20px;
		position: relative;
		z-index: 1;
	}

	.footer-content {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 20px;
		margin-bottom: 20px;
		max-width: 1200px;
		margin-left: auto;
		margin-right: auto;
		align-items: start;
	}

	/* Left column - Logo & Tagline */
	.footer-left {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 24px;
	}

	.footer-logo {
		width: 60px;
		height: 60px;
		display: flex;
		justify-content: center;
		align-items: center;
		background: var(--primary);
		font-family: 'Kilimanjaro Sans Round1', 'Nunito Sans', sans-serif;
		font-size: 32px;
		color: var(--color-text);
		margin-bottom: 10px;
		filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
		transition: transform 0.3s ease;
	}

	.footer-logo:hover {
		transform: scale(1.1) rotate(-2deg);
	}

	.tagline {
		font-size: 14px;
		color: var(--description);
		margin: 10px 0 0 0;
		text-align: center;
		font-style: italic;
	}

	.footer-center,
	.footer-right {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: left;
	}

	/* Center column - Quick Links */
	.quick-links h3 {
		font-size: 16px;
		margin-bottom: 16px;
		margin-top: 0;
		position: relative;
		display: block;
		color: var(--accent);
	}

	.quick-links h3::after {
		content: '';
		position: absolute;
		bottom: -5px;
		left: 0;
		width: 85px;
		height: 1.25px;
		background: var(--accent);
	}

	.quick-links ul {
		list-style: none;
		padding: 0;
		margin: 0;
		font-size: 12px;
	}

	.quick-links a {
		color: var(--description);
		text-decoration: none;
		transition:
			color 0.3s ease,
			transform 0.3s ease;
		display: inline-block;
	}

	.quick-links a:hover {
		color: var(--color-text);
		transform: translateX(5px);
	}

	/* Right column - Contact */
	.contact-links h3 {
		font-size: 16px;
		margin-bottom: 16px;
		margin-top: 0;
		position: relative;
		display: block;
		color: var(--accent);
	}

	.contact-links h3::after {
		content: '';
		position: absolute;
		bottom: -5px;
		left: 0;
		width: 60px;
		height: 1.25px;
		background: var(--accent);
	}

	.contact-links ul {
		list-style: none;
		padding: 0;
		margin: 0;
		font-size: 12px;
	}

	.contact-links li {
		margin-bottom: 5px;
	}

	.social-link {
		display: flex;
		align-items: center;
		gap: 10px;
		color: var(--description);
		text-decoration: none;
		transition:
			color 0.3s ease,
			transform 0.3s ease;
	}

	.social-link:hover {
		color: var(--color-text);
		transform: translateX(2px);
	}

	.social-icon {
		transition: transform 0.3s ease;
	}

	.social-link:hover .social-icon {
		transform: scale(1.125);
	}

	.footer-bottom {
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		padding-top: 5px;
		text-align: center;
		font-size: 10px;
		color: var(--description);
		max-width: 1200px;
		margin-left: auto;
		margin-right: auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 10px;
	}

	.footer-bottom p {
		color: var(--description);
		margin-top: 10px;
		margin-bottom: 0;
		font-size: 12px;
	}

	.back-to-top {
		background: var(--accent);
		color: var(--background);
		border: none;
		padding: 8px 16px;
		font-size: 12px;
		border-radius: 4px;
		cursor: pointer;
		transition: background 0.3s ease;
		margin-top: 10px;
		font-weight: 500;
	}

	.back-to-top:hover {
		background: var(--primary);
		color: var(--color-text);
	}

	@keyframes pulse {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.3);
		}
		100% {
			transform: scale(1);
		}
	}

	/* Responsive styles */
	@media screen and (max-width: 767.98px) {
		.footer-content {
			grid-template-columns: 1fr;
			text-align: center;
			gap: 40px;
		}

		.footer-left {
			align-items: center;
		}

		.quick-links h3::after,
		.contact-links h3::after {
			left: 50%;
			transform: translateX(-50%);
		}

		.quick-links a:hover,
		.social-link:hover {
			transform: translateX(0) scale(1.05);
		}

		.social-link {
			justify-content: center;
		}

		.footer-bottom {
			flex-direction: column;
			text-align: center;
		}
	}
</style>
