<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	let visible = $state(false);

	const experiences = [
		{
			title: 'Full-Stack Web Developer',
			company: 'Blazing Fast Design',
			period: '2020 - Present',
			description:
				'I build and ship full-stack web projects—SvelteKit, Python, Postgres, and real-world scripts for myself and select clients. I run a home lab on Proxmox, manage Linux VMs, Docker containers, version control with custom Git workflows, and handle my own deployments. Everything from dev tools to automation scripting, if it makes life easier, I build it.',
			skills: [
				'SvelteKit',
				'JavaScript',
				'Python',
				'PostgreSQL',
				'Git',
				'Docker',
				'Proxmox',
				'Linux',
				'Automation Scripting'
			]
		},
		{
			title: 'Marketing Technology Manager',
			company: 'BK Resources, Inc.',
			period: '2019 - Present',
			description:
				'Run all digital ops and marketing tech—site management, PIM/CMS improvements, process automation, internal tools, asset workflows, and analytics. I modernize legacy systems and make stuff actually work for real people. Built landing pages, automation scripts, and 3D asset flows from scratch.',
			skills: [
				'Python',
				'Django',
				'SvelteKit',
				'PostgreSQL',
				'REST APIs',
				'Analytics',
				'CMS/PIM',
				'Automation'
			]
		},
		{
			title: 'Web Developer & Designer',
			company: 'BK Resources, Inc.',
			period: '2016 - 2019',
			description:
				'Designed and launched e-commerce UI, landing pages, and built a 3D-to-web asset pipeline. Managed campaigns and assets from print to digital, actually learned how things break in production.',
			skills: ['HTML', 'CSS', 'JavaScript', 'Figma', 'Adobe CC', '3D Asset Pipeline']
		},
		{
			title: 'Flash Developer',
			company: 'Anthem College Online',
			period: '2011 - 2014',
			description:
				'Built interactive e-learning content in Adobe Flash, mostly timeline-based animation and basic scripting. Recorded and integrated audio/video, worked with instructional designers to ship usable, not-pretty-but-it-worked, learning tools.',
			skills: ['Flash IDE', 'Timeline Animation', 'eLearning', 'Audio/Video Integration']
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
		color: #fff4db;
		margin-bottom: 16px;
	}

	.underline {
		height: 4px;
		width: 80px;
		background: linear-gradient(90deg, #a13b1e, #fbbd2e);
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
		background: #458588;
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
		background: #fbbd2e;
		border: 4px solid #282828;
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
		color: #fbbd2e;
		background: rgba(251, 189, 46, 0.1);
		padding: 6px 12px;
		border-radius: 30px;
		margin-bottom: 16px;
	}

	.experience-title {
		font-family: 'Nunito Sans', sans-serif;
		font-size: 24px;
		color: #fff4db;
		margin: 0 0 8px 0;
	}

	.experience-company {
		font-family: 'Nunito Sans', sans-serif;
		font-size: 18px;
		color: #ea732f;
		margin: 0 0 16px 0;
		font-weight: normal;
	}

	.experience-description {
		font-family: 'Nunito Sans', sans-serif;
		font-size: 16px;
		line-height: 1.6;
		color: #ccc2ab;
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
		color: #fff4db;
		background: #458588;
		padding: 4px 10px;
		border-radius: 4px;
		transition: background 0.3s ease;
	}

	.skill-tag:hover {
		background: #255658;
	}

	@media (max-width: 768px) {
		.experience-header h1 {
			font-size: 36px;
		}

		.experience-title {
			font-size: 20px;
		}

		.experience-company {
			font-size: 16px;
		}

		.timeline {
			padding-left: 30px;
		}

		.timeline::before {
			left: 10px;
		}

		.experience-dot {
			left: -30px;
			width: 20px;
			height: 20px;
		}
	}
</style>
