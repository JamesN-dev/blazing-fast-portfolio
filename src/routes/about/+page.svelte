<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	let visible = $state(false);

	onMount(() => {
		// Small delay before showing animations
		setTimeout(() => {
			visible = true;
		}, 200);
	});
</script>

<div class="about-container">
	{#if visible}
		<div class="about-header" transition:fade={{ duration: 500 }}>
			<h1>About</h1>
			<div class="underline"></div>
		</div>

		<div class="about-content">
			<div class="about-text" transition:fly={{ duration: 600, y: 20 }}>
				<p>
					I’m a marketing technologist & developer who builds data-driven, UX-focused full-stack
					tools & applications. I run the marketing operations for a national foodservice equipment
					manufacturer, overseeing strategy, creative, data, e-commerce, analytics, and the
					marketing technical systems that tie it all together.
				</p>

				<p>
					MMy design background shapes how I approach development. I build tools and applications
					centered on user experience, modern design, and simplifying complex processes. Outside of
					work, I spend time developing plugins and creative tools like a Blender add-on, a macOS
					app, and an Android app, while also running my homelab and experimenting with 3D and game
					development in Godot.
				</p>

				<p>This site documents what I’ve built so far and where I’m headed next.</p>

				<p>
					When I’m not coding or creating, you’ll probably find me hiking, mushroom hunting, digging
					through old jungle records, or getting lost in vintage electronic gear or software relics.
				</p>
			</div>

			<div class="about-skills" transition:fly={{ delay: 300, duration: 600, y: 20 }}>
				<h2>Skills & Technologies</h2>
				<p class="section-tagline">My current technical toolkit</p>
				<div class="skills-grid">
					<div class="skill-category">
						<h3>Languages</h3>
						<ul>
							<li>JavaScript</li>
							<li>Python</li>
							<li>SQL</li>
							<li>HTML/CSS</li>
							<li>GDScript</li>
							<li>SwiftUI</li>
						</ul>
					</div>

					<div class="skill-category">
						<h3>Build Ecosystems</h3>
						<ul>
							<li>SvelteKit</li>
							<li>Django</li>
							<li>Node / Bun</li>
							<li>TailwindCSS</li>
							<li>REST API</li>
							<li>PostgreSQL</li>
						</ul>
					</div>

					<div class="skill-category">
						<h3>Tools & Platforms</h3>
						<ul>
							<li>Git/GitHub</li>
							<li>Zed IDE</li>
							<li>WezTerm</li>
							<li>Figma</li>
							<li>DigitalOcean/Vercel</li>
							<li>Godot & Blender</li>
						</ul>
					</div>

					<div class="skill-category">
						<h3>Design & UI</h3>
						<ul>
							<li>UI/UX Design & interactive transitions (Svelte)</li>
							<li>Responsive Design</li>
							<li>Animation</li>
							<li>Graphic Design</li>
							<li>Brand Identity</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.about-container {
		width: 90%;
		max-width: 1200px;
		margin: 40px auto;
		padding: 20px;
	}

	.about-header {
		text-align: center;
		margin: 60px 0px 60px;
	}

	.about-header h1 {
		font-family: 'Kilimanjaro Sans Round1', 'Nunito Sans', sans-serif;
		font-size: 40px;
		color: var(--color-text);
		margin-bottom: 16px;
		letter-spacing: 1px;
	}

	.underline {
		height: 4px;
		width: 80px;
		background: linear-gradient(90deg, var(--gruv-darkorange), var(--accent));
		margin: 0 auto;
		border-radius: 2px;
	}

	.about-content {
		display: grid;
		grid-template-columns: 1fr;
		gap: 40px;
	}

	.about-text p {
		font-family: 'Nunito Sans', sans-serif;
		font-size: 14px;
		line-height: 1.6;
		color: var(--description);
		margin-bottom: 16px;
	}

	.about-skills h2 {
		font-family: 'Kilimanjaro Sans Round1', 'Nunito Sans', sans-serif;
		font-size: 24px;
		color: var(--color-text);
		margin-bottom: 5px;
		letter-spacing: 1px;
	}

	.skills-grid {
		/* Enhanced RAM pattern with better responsiveness */
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr));
		gap: var(--space-6);
	}

	.skill-category {
		background: #333333;
		border-radius: 8px;
		padding: 20px;
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}

	.skill-category:hover {
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
	}

	.skill-category h3 {
		font-family: 'Nunito Sans', sans-serif;
		font-size: 16px;
		color: var(--accent);
		margin-bottom: 10px;
		border-bottom: 1px solid var(--primary);
	}

	.skill-category ul {
		list-style-type: none;
		padding: 0;
		margin: 0;
	}

	.skill-category li {
		color: var(--color-text);
		padding: 8px 0;
		position: relative;
		padding-left: 13px;
	}

	.skill-category li::before {
		content: '▹';
		position: absolute;
		left: 0;
		color: var(--primary);
	}

	/* Tablet and Desktop */
	@media screen and (min-width: 768px) {
		/* Replaced var(--breakpoint-tablet) */
		.about-content {
			flex-direction: row;
			align-items: flex-start;
		}

		.about-text {
			order: 1;
		}

		.about-skills {
			order: 2;
		}
	}

	/* Mobile */
	@media screen and (max-width: 768px) {
		/* Replaced var(--breakpoint-mobile) */
		.about-header h1 {
			font-size: var(--h2); /* Slightly smaller on mobile */
		}

		.skills-grid {
			grid-template-columns: 1fr;
		}
	}

	.section-tagline {
		font-size: var(--small);
		color: #aaa;
		margin-bottom: 32px;
		font-style: italic;
	}
</style>
