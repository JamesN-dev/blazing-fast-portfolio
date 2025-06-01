<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	let visible = $state(false);

	const experiences = [
		{
			title: 'Full-Stack Developer',
			company: 'Blazing Fast Labs',
			period: '2020 - Present',
			description:
				'I build and ship full-stack web projects—SvelteKit, Python, Postgres, and automation scripts, under my own brand. I run a home lab on Proxmox, manage Linux VMs, Docker containers, version control with custom Git workflows, and deploy production projects with modern platforms like Vercel. Fully capable of maintaining my own infra, but know when to use the right tool for the job.',
			skills: [
				'SvelteKit',
				'JavaScript',
				'Python',
				'PostgreSQL',
				'Git',
				'Docker',
				'Proxmox',
				'Linux',
				'Automation Scripting',
				'Figma'
			]
		},
		{
			title: 'Marketing Technology Manager',
			company: 'BK Resources, Inc.',
			period: '2020 - Present',
			description:
				'Run all marketing ops and tech. Website management, PIM/CMS improvements, process automation, internal tools, asset workflows, and analytics. I modernize legacy systems and make sure end users can use them. Build landing pages and email campaigns that support digital ad funnels and lead capture, and 3D asset flows from scratch.',
			skills: [
				'CMS/PIM',
				'E-commerce',
				'Python',
				'JavaScript',
				'HTML/CSS',
				'SvelteKit',
				'PostgreSQL',
				'REST APIs',
				'Git',
				'Adobe CC',
				'Analytics'
			]
		},
		{
			title: 'Web Developer & Designer',
			company: 'BK Resources, Inc.',
			period: '2016 - 2020',
			description:
				'Designed and launched e-commerce UI, landing pages, and built a 3D-to-web asset pipeline. Managed campaigns and assets from print to digital, learned how things break in production, and how to fix them. Built a modern web presence from the ground up, rolling out a new CMS and PIM system, and integrating with existing tools.',
			skills: [
				'HTML',
				'CSS',
				'JavaScript',
				'Figma',
				'Adobe CC',
				'3D Asset Pipeline',
				'Git',
				'E-commerce'
			]
		},
		{
			title: 'Flash Developer',
			company: 'Anthem College Online',
			period: '2011 - 2014',
			description:
				'Built interactive e-learning content in Adobe Flash, mostly timeline-based animation and basic ActionScript scripting. Recorded and integrated audio/video, worked with instructional designers to ship usable, not-pretty-but-it-worked, learning tools.',
			skills: [
				'Flash',
				'ActionScript',
				'Timeline Animation',
				'eLearning',
				'Audio/Video Integration'
			]
		}
	];
	onMount(() => {
		// Small delay before showing animations
		setTimeout(() => {
			visible = true;
		}, 200);
	});
</script>

<div class="experience-container">
	{#if visible}
		<div class="experience-header" transition:fade={{ duration: 500 }}>
			<h1>Experience</h1>
			<div class="underline"></div>
		</div>

		<div class="timeline">
			{#each experiences as exp, i}
				<div
					class="experience-item"
					transition:fly={{
						delay: 200 + i * 150,
						duration: 600,
						y: 30
					}}
				>
					<div class="experience-dot"></div>
					<div class="experience-content">
						<div class="experience-period">{exp.period}</div>
						<h3 class="experience-title">{exp.title}</h3>
						<h4 class="experience-company">{exp.company}</h4>
						<p class="experience-description">{exp.description}</p>
						<div class="experience-skills">
							{#each exp.skills as skill}
								<span class="skill-tag">{skill}</span>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.experience-container {
		width: 90%;
		max-width: 1000px;
		margin: 40px auto;
		padding: 20px;
	}

	.experience-header {
		text-align: center;
		margin-bottom: 60px;
	}

	.experience-header h1 {
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

	.timeline {
		position: relative;
		padding-left: 40px;
	}

	.timeline::before {
		content: '';
		position: absolute;
		left: 15px;
		top: 0;
		height: 100%;
		width: 2px;
		background: var(--primary);
	}

	.experience-item {
		position: relative;
		margin-bottom: 60px;
	}

	.experience-item:last-child {
		margin-bottom: 0;
	}

	.experience-dot {
		position: absolute;
		left: -40px;
		top: 5px;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background: var(--accent);
		border: 4px solid var(--background);
		z-index: 1;
	}

	.experience-content {
		background: #333333;
		border-radius: 8px;
		padding: 24px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease;
	}

	.experience-content:hover {
		transform: translateY(-5px);
	}

	.experience-period {
		display: inline-block;
		font-family: 'Nunito Sans', sans-serif;
		font-size: 14px;
		color: var(--accent);
		background: rgba(251, 189, 46, 0.1);
		padding: 6px 12px;
		border-radius: 30px;
		margin-bottom: 16px;
	}

	.experience-title {
		font-family: 'Nunito Sans', sans-serif;
		font-size: 24px;
		color: var(--color-text);
		margin: 0 0 8px 0;
	}

	.experience-company {
		font-family: 'Nunito Sans', sans-serif;
		font-size: 18px;
		color: var(--secondary);
		margin: 0 0 16px 0;
		font-weight: normal;
	}

	.experience-description {
		font-family: 'Nunito Sans', sans-serif;
		font-size: 16px;
		line-height: 1.6;
		color: var(--description);
		margin-bottom: 16px;
	}

	.experience-skills {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.skill-tag {
		font-family: 'Nunito Sans', sans-serif;
		font-size: 12px;
		color: var(--color-text);
		background: var(--primary);
		padding: 4px 10px;
		border-radius: 4px;
		transition: background 0.3s ease;
	}

	.skill-tag:hover {
		background: var(--gruv-darkblue);
	}

	/* Responsive adjustments for smaller screens */
	@media screen and (max-width: 768px) {
		/* Replaced var(--breakpoint-mobile) */
		.timeline-item {
			flex-direction: column;
			align-items: flex-start;
		}

		.experience-dot {
			left: -30px;
			width: 20px;
			height: 20px;
		}

		.experience-content {
			padding: 16px;
		}

		.experience-period {
			padding: 4px 8px;
			font-size: 12px;
		}

		.experience-title {
			font-size: 20px;
		}

		.experience-company {
			font-size: 16px;
		}

		.experience-description {
			font-size: 14px;
		}

		.experience-skills {
			flex-direction: column;
			align-items: flex-start;
		}

		.skill-tag {
			font-size: 10px;
			padding: 3px 8px;
		}
	}
</style>
