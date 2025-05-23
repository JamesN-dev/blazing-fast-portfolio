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
					I’m a marketing professional turned developer—building full-stack apps with SvelteKit and
					Python, making scripts and CLI tools, and learning fast. I run the marketing operation for
					a mid-size foodservice equipment brand—from strategy and creative to eCommerce, analytics,
					and tech stack implementation & management.
				</p>

				<p>
					Outside of work, I’m deep into full-stack web development: designing interfaces, writing
					backend APIs, and deploying real-world tools. My focus is building clean, fast, useful
					applications while sharpening my JavaScript and Python fundamentals.
				</p>

				<p>
					This site documents what I’ve built—and the technical path I’m carving for myself next.
				</p>

				<p>
					When I’m not building, learning, or shipping, I’m probably out hiking, making or listening
					to jungle tunes, or going down some retro electronic music gear rabbit hole. I’m into
					clean design and tools that don’t waste people’s time.
				</p>
			</div>

			<div class="about-skills" transition:fly={{ delay: 300, duration: 600, y: 20 }}>
				<h2>Skills & Technologies</h2>
				<p class="section-tagline">My current technical toolkit</p>
				<div class="skills-grid">
					<div class="skill-category">
						<h3>Languages</h3>
						<ul>
							<li>JavaScript (ES6+)</li>
							<li>Python</li>
							<li>CSS3/SCSS</li>
							<li>HTML5</li>
							<li>SQL</li>
						</ul>
					</div>

					<div class="skill-category">
						<h3>Build Ecosystems</h3>
						<ul>
							<li>SvelteKit</li>
							<li>Django</li>
							<li>TailwindCSS</li>
							<li>FastAPI</li>
							<li>Flask</li>
						</ul>
					</div>

					<div class="skill-category">
						<h3>Tools & Platforms</h3>
						<ul>
							<li>Git/GitHub</li>
							<li>VSCode</li>
							<li>Figma</li>
							<li>AWS</li>
							<li>Netlify/Vercel</li>
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
		margin-bottom: 40px;
	}

	.about-header h1 {
		font-family: 'Kilimanjaro Sans Round1', 'Nunito Sans', sans-serif;
		font-size: 48px;
		color: var(--color-text);
		margin-bottom: 16px;
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
		font-size: 18px;
		line-height: 1.6;
		margin-bottom: 24px;
		color: var(--description);
	}

	.about-skills h2 {
		font-family: 'Kilimanjaro Sans Round1', 'Nunito Sans', sans-serif;
		font-size: 32px;
		color: var(--color-text);
		margin-bottom: 24px;
	}

	.skills-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 24px;
	}

	.skill-category {
		background: #333333;
		border-radius: 8px;
		padding: 24px;
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}

	.skill-category:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
	}

	.skill-category h3 {
		font-family: 'Nunito Sans', sans-serif;
		font-size: 20px;
		color: var(--accent);
		margin-bottom: 16px;
		border-bottom: 1px solid var(--primary);
		padding-bottom: 8px;
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
		padding-left: 20px;
	}

	.skill-category li::before {
		content: '▹';
		position: absolute;
		left: 0;
		color: var(--primary);
	}

	@media (min-width: 768px) {
		.about-text {
			font-size: 20px;
		}
	}

	.section-tagline {
		font-size: 18px;
		color: #aaa;
		margin-bottom: 32px;
		font-style: italic;
	}

	@media (max-width: 768px) {
		.about-container {
			margin: 20px auto;
		}

		.about-header h1 {
			font-size: 36px;
		}

		.skills-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
