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
				'I design and develop full-stack web applications using SvelteKit, Python, and PostgreSQL. My workflow includes managing a home lab on Proxmox, orchestrating Linux VMs and Docker containers, and maintaining version control with custom Git strategies. Deployments span modern platforms like Vercel as well as self-hosted infrastructure on DigitalOcean with Nginx. I automate processes with Python scripts and focus on building reliable, efficient systems. I also create and manage 3D product content pipelines, including material creation, asset standardization, rendering workflows, and integration with web platforms.',
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
				'3D Asset Pipeline',
				'Material Creation',
				'Rendering',
				'Blender',
				'Figma'
			]
		},
		{
			title: 'Marketing Technology Manager',
			company: 'BK Resources, Inc.',
			period: '2020 - Present',
			description: `Oversee all marketing operations & technical infrastructure for a national foodservice equipment manufacturer. Built the company’s data foundation from the ground up, implemented and administer a PIM system for 4,000+ SKUs, developing structured data standards, and establishing automated workflows for internal operations and external data distribution.

            From that foundation, designed and deployed a unified digital ecosystem powered by this data. Built a Django Ninja + PostgreSQL REST API hosted on a hardened VPS, serving as the single source of truth for our stack. This API powers configurator web apps, internal tools, and the public-facing digital asset hub - a modern SvelteKit platform that also includes admin layer enabling employees to generate and share complete product asset packages without needing direct access to the PIM.

            The same infrastructure supports our product configurators, replacing redundant backends and enabling real-time product  & pricing synchronization. These connected systems now underpin every marketing and content initiative, from catalog production and 3D rendering pipelines to SEO, analytics, and future AI integrations like product expert chatbots and automated content generation.`,
			skills: [
				'Data Engineering',
				'E-Commerce',
				'PIM/CMS',
				'Python',
				'Django',
				'JavaScript',
				'SvelteKit',
				'PostgreSQL',
				'REST APIs',
				'Automation',
				'AI',
				'Web Dev',
				'Server Ops',
				'SEO',
				'Analytics',
				'UI/UX',
				'Design',
				'Leadership',
				'Mentorship'
			]
		},
		{
			title: 'Web Developer & Designer',
			company: 'BK Resources, Inc.',
			period: '2016 - 2020',
			description: `Launched and managed the company’s e-commerce website and content platform, developing site structure, product content, product image library, spec sheets, and frontend design to align with brand standards. Managed campaigns and assets from print to digital, and built a 3D-to-web asset pipeline for time consuming and difficultly large to photo/manage products. In 2020, led the rollout of a new PIM system that unified product data across departments, laying the groundwork for the company’s modern digital ecosystem and leading to a promotion into marketing technology management.`,
			skills: [
				'E-commerce',
				'HTML/CSS',
				'JavaScript',
				'Figma',
				'Catalog Creation',
				'Adobe CC',
				'3D Asset Pipeline',
				'Blender',
				'Git'
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
						{#each exp.description.split('\n').filter(Boolean) as paragraph}
							<p class="experience-description">{paragraph}</p>
						{/each}
						<div class="experience-skills">
							{#each exp.skills as skill}
								<span class="blog-tag">{skill}</span>
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
		margin: 60px 0px 60px;
	}

	.experience-header h1 {
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
		left: -36.5px;
		top: 16px;
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

	.experience-period {
		display: inline-block;
		font-family: 'Nunito Sans', sans-serif;
		font-size: 14px;
		color: var(--accent);
		background: rgba(251, 189, 46, 0.1);
		padding: 6px 12px;
		border-radius: 30px;
		margin-bottom: 12px;
	}

	.experience-title {
		font-family: 'Nunito Sans', sans-serif;
		font-size: 20px;
		color: var(--color-text);
		margin: 0;
		margin-bottom: 10px;
	}

	.experience-company {
		font-family: 'Nunito Sans', sans-serif;
		font-size: 13px;
		color: var(--secondary);
		margin: 0;
		font-weight: normal;
	}

	.experience-description {
		font-family: 'Nunito Sans', sans-serif;
		font-size: 14px;
		line-height: 1.6;
		color: var(--description);
		margin-bottom: 16px;
	}

	.experience-skills {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		justify-content: start;
		align-items: start;
	}

	/* Responsive adjustments for smaller screens */
	@media screen and (max-width: 768px) {
		.experience-header h1 {
			font-size: 34px;
		}
		.experience-item {
			flex-direction: column;
			align-items: flex-start;
		}

		.experience-dot {
			left: -34px;
			top: 16px;
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
			font-size: 19px;
		}

		.experience-company {
			font-size: 11px;
		}

		.experience-description {
			font-size: 12px;
		}

		.experience-skills {
			flex-direction: row;
			align-items: flex-start;
		}
	}
</style>
