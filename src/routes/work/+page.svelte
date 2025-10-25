<script>
	import { onMount } from 'svelte';
	import { fade, fly, scale } from 'svelte/transition';
	import UnderConstructionModal from '$lib/components/modals/UnderConstructionModal.svelte';

	let showModal = $state(true);
	let visible = $state(false);

	const projects = [
		{
			title: 'E-commerce Platform',
			description:
				'A high-performance e-commerce platform built with SvelteKit, featuring product filtering, cart functionality, and secure checkout process.',
			image: '/images/project-placeholder-1.jpg',
			technologies: ['SvelteKit', 'Node.js', 'MongoDB', 'Stripe API'],
			url: '#',
			github: '#'
		},
		{
			title: 'Portfolio Template',
			description:
				'A customizable portfolio template for developers and designers, with smooth animations and responsive design.',
			image: '/images/project-placeholder-2.jpg',
			technologies: ['SvelteKit', 'GSAP', 'CSS Grid', 'Netlify'],
			url: '#',
			github: '#'
		},
		{
			title: 'Task Management App',
			description:
				'A productivity application for managing tasks and projects, with features like drag-and-drop, tags, and progress tracking.',
			image: '/images/project-placeholder-3.jpg',
			technologies: ['SvelteKit', 'Firebase', 'Tailwind CSS', 'PWA'],
			url: '#',
			github: '#'
		},
		{
			title: 'Weather Dashboard',
			description:
				'A weather dashboard that displays current conditions and forecasts for multiple locations, with beautiful data visualizations.',
			image: '/images/project-placeholder-4.jpg',
			technologies: ['SvelteKit', 'D3.js', 'Weather API', 'Geolocation'],
			url: '#',
			github: '#'
		}
	];

	onMount(() => {
		// Small delay before showing animations
		setTimeout(() => {
			visible = true;
		}, 200);
	});
</script>

<div class="work-container">
	<UnderConstructionModal bind:show={showModal} />

	{#if visible}
		<div class="work-header" transition:fade={{ duration: showModal ? 0 : 500 }}>
			<h1>My Work</h1>
			<div class="underline"></div>
			<p class="work-intro">
				Here are some projects I've worked on. Each one represents a unique challenge and solution.
			</p>
		</div>

		<div class="projects-grid">
			{#each projects as project, i}
				<div
					class="project-card"
					transition:fly={{
						delay: showModal ? 0 : 300 + i * 150,
						duration: showModal ? 0 : 600,
						y: 30
					}}
				>
					<div class="project-image">
						<div class="project-placeholder">
							<span>{project.title[0]}</span>
						</div>
					</div>
					<div class="project-content">
						<h3 class="project-title">{project.title}</h3>
						<p class="project-description">{project.description}</p>
						<div class="project-technologies">
							{#each project.technologies as tech}
								<span class="blog-tag">{tech}</span>
							{/each}
						</div>
						<div class="project-links">
							<a href={project.url} target="_blank" rel="noopener noreferrer" class="project-link">
								View Project
							</a>
							<a
								href={project.github}
								target="_blank"
								rel="noopener noreferrer"
								class="project-link github"
							>
								GitHub
							</a>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.work-container {
		width: 90%;
		max-width: 1200px;
		margin: 40px auto;
		padding: 20px;
	}

	.work-header {
		text-align: center;
		margin: 60px 0 60px;
	}

	.work-header h1 {
		font-family: 'Kilimanjaro Sans Round1', 'Nunito Sans', sans-serif;
		font-size: 40px;
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

	.work-intro {
		max-width: 600px;
		margin: 24px auto 0;
		font-size: 14px;
		color: var(--description);
		line-height: 1.6;
	}

	.projects-grid {
		display: grid;
		/* Enhanced RAM pattern with better responsive behavior */
		grid-template-columns: repeat(auto-fit, minmax(min(350px, 100%), 1fr));
		gap: 20px;
		margin-top: 40px;
	}

	.project-card {
		background: #333333;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}

	.project-card:hover {
		transform: translateY(-10px);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
	}

	.project-image {
		height: 200px;
		position: relative;
		overflow: hidden;
	}

	.project-placeholder {
		width: 100%;
		height: 100%;
		background: linear-gradient(135deg, var(--primary), var(--accent));
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.project-placeholder span {
		font-family: 'Kilimanjaro Sans Round1', 'Nunito Sans', sans-serif;
		font-size: 48px;
		color: var(--color-text);
		font-weight: bold;
	}

	.project-content {
		padding: 20px;
	}

	.project-title {
		font-family: 'Nunito Sans', sans-serif;
		font-size: 20px;
		color: var(--color-text);
		margin: 0 0 8px 0;
	}

	.project-description {
		font-family: 'Nunito Sans', sans-serif;
		font-size: 14px;
		line-height: 1.6;
		color: var(--description);
		margin: 0 0 16px 0;
	}

	.project-technologies {
		/* Enhanced tech tags with RAM pattern */
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(80px, max-content));
		gap: 4px;
		margin-bottom: 12px;
	}

	/* tech-tag styles removed - now using global .blog-tag class */

	.project-links {
		display: flex;
		gap: 8px;
	}

	.project-link {
		font-family: 'Nunito Sans', sans-serif;
		font-size: 14px;
		font-weight: 600;
		color: var(--background);
		background: var(--accent);
		padding: 6px 12px;
		border-radius: 6px;
		text-decoration: none;
		transition:
			background 0.3s ease,
			transform 0.3s ease;
	}

	.project-link:hover {
		background: var(--gruv-darkyellow);
		transform: translateY(-2px);
	}

	.project-link.github {
		background: var(--primary);
	}

	.project-link.github:hover {
		background: var(--gruv-darkblue);
	}

	@media screen and (max-width: 767.98px) {
		.work-header h1 {
			font-size: 36px;
		}

		.projects-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
