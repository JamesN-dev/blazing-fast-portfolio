<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { fade, fly, scale } from 'svelte/transition';
	import { quintOut, elasticOut } from 'svelte/easing';
	import TypedText from '$lib/components/TypedText.svelte';
	import { Zap } from '@lucide/svelte';

	let visible = $state(false);
	let visibleFeatures = $state(false);
	let visibleStats = $state(false);
	let mousePosX = $state(0);
	let mousePosY = $state(0);
	let scrollY = $state(0);
	let skillsContainer;
	let fireballEntranceComplete = $state(false);
	let fireballGlowContainer = $state();
	let fireballGlowHovering = $state(false);

	// Reactive variable to control scroll indicator visibility
	let showScrollIndicator = $state(true);

	// Skills physics state
	let throwingSkillsSet = $state(new Set());

	// Function to handle parallax effect
	function handleMouseMove(e) {
		// Get mouse position relative to viewport center
		mousePosX = (e.clientX / window.innerWidth - 0.5) * 2;
		mousePosY = (e.clientY / window.innerHeight - 0.5) * 2;
	}

	// Skills for floating cloud
	const skills = [
		'SvelteKit',
		'JavaScript',
		'CSS3',
		'HTML5',
		'TailwindCSS',
		'Python',
		'Git',
		'Github',
		'Terminal',
		'Bash',
		'VS Code',
		'NeoVim',
		'MCP Servers',
		'Linux',
		'Ubuntu Server',
		'Docker',
		'ProxMox',
		'SQL',
		'PostgresSQL',
		'Django',
		'PostgresSQL',
		'UI/UX',
		'Design',
		'Figma',
		'API Integration',
		'Performance',
		'Animation',
		'Responsive',
		'Accessibility'
	];

	// Reactive skill positions using runes
	let skillPositions = $state(
		skills.map((skill, index) => ({
			x: -300 + Math.random() * 600,
			y: -50 + Math.random() * 100,
			skill: skill,
			speedX: (Math.random() - 0.5) * 1.2, // Base speed X
			speedY: (Math.random() - 0.5) * 0.8, // Base speed Y
			phase: Math.random() * Math.PI * 2,
			scale: 0.8 + Math.random() * 0.4, // Scale for visual depth (0.8 to 1.2)
			opacity: 0.7 + Math.random() * 0.3, // Opacity for depth (0.7 to 1.0)
			scaleSpeed: (Math.random() - 0.5) * 0.003, // Scale animation speed
			mode: 'floating', // 'floating' | 'dragging' | 'throwing' states
			sineWaveDisabled: false, // State variable to control sine wave motion
			sineWaveReenableTime: 0 // Timestamp to re-enable sine wave after throwing
		}))
	);

	// Drag state using runes
	let dragState = $state({
		isDragging: false,
		dragIndex: -1,
		startX: 0,
		startY: 0,
		lastX: 0,
		lastY: 0,
		velocityX: 0,
		velocityY: 0
	});

	// Derived transforms for each skill - Pure 2D with scale/opacity for depth
	let skillTransforms = $derived.by(() => {
		// Ensure skillPositions is ready before mapping
		if (!skillPositions || skillPositions.length === 0) {
			return [];
		}

		const transforms = skillPositions.map((position, i) => {
			const isDragging = position.mode === 'dragging';
			const isThrowing = position.mode === 'throwing';

			// Give each skill a unique base z-index to prevent overlap issues
			// Dragging gets highest priority, throwing gets medium, floating gets base + index
			let zIndex;
			if (isDragging) {
				zIndex = 1000; // Highest priority for dragging
			} else if (isThrowing) {
				zIndex = 500 + i; // Medium priority for throwing, unique per skill
			} else {
				zIndex = 100 + i; // Base priority for floating, unique per skill
			}

			const transform = {
				transform: `translate(${position.x}px, ${position.y}px) scale(${position.scale})`,
				opacity: position.opacity,
				zIndex: zIndex
			};
			return transform;
		});

		return transforms;
	});

	// Handle skill click/drag start
	function handleSkillMouseDown(event, index) {
		const container = document.querySelector('.skills-cloud-container');
		const isGridMode = container && window.getComputedStyle(container).display === 'grid';

		if (isGridMode) return;

		event.preventDefault();
		event.stopPropagation();

		// Update drag state
		dragState.isDragging = true;
		dragState.dragIndex = index;
		dragState.startX = event.clientX;
		dragState.startY = event.clientY;
		dragState.lastX = event.clientX;
		dragState.lastY = event.clientY;

		// Switch skill to dragging mode
		skillPositions[index].mode = 'dragging';

		// Complete reset of any floating behaviors
		skillPositions[index].speedX = 0;
		skillPositions[index].speedY = 0;
		skillPositions[index].phase = 0; // Reset sine wave phase
		skillPositions[index].scaleSpeed = 0; // Stop scale animation

		// Ensure sine wave motion is completely disabled for this skill
		skillPositions[index].sineWaveDisabled = true;
		// Clear any pending re-enable time; new re-enable time will be set on mouse up (throw)
		skillPositions[index].sineWaveReenableTime = 0;

		// Bring to front with larger scale
		skillPositions[index].scale = 1.2;
		skillPositions[index].opacity = 1.0;
	}

	// Handle mouse move for dragging
	function handleDocumentMouseMove(event) {
		if (!dragState.isDragging || dragState.dragIndex === -1) return;

		const deltaX = event.clientX - dragState.lastX;
		const deltaY = event.clientY - dragState.lastY;

		// Calculate velocity for throwing
		dragState.velocityX = deltaX * 0.8; // Even more energetic throws
		dragState.velocityY = deltaY * 0.8; // Even more energetic throws

		// Update position
		skillPositions[dragState.dragIndex].x += deltaX;
		skillPositions[dragState.dragIndex].y += deltaY;

		dragState.lastX = event.clientX;
		dragState.lastY = event.clientY;
	}

	// Handle mouse up for throwing
	function handleDocumentMouseUp() {
		if (!dragState.isDragging || dragState.dragIndex === -1) return;

		const index = dragState.dragIndex;

		// Switch to throwing mode with PURE inertial physics only
		skillPositions[index].mode = 'throwing';

		// Apply throw velocity (2D only)
		skillPositions[index].speedX = dragState.velocityX;
		skillPositions[index].speedY = dragState.velocityY;

		// Schedule sine wave re-enable for 5 seconds from NOW
		skillPositions[index].sineWaveReenableTime = Date.now() + 5000;

		// Add to throwing set
		throwingSkillsSet.add(index);

		// After 5 seconds, return to floating mode
		setTimeout(() => {
			throwingSkillsSet.delete(index);
			skillPositions[index].mode = 'floating';
			// Restore random scale and opacity for depth
			skillPositions[index].scale = 0.8 + Math.random() * 0.4;
			skillPositions[index].opacity = 0.7 + Math.random() * 0.3;
		}, 5000);

		// Reset drag state
		dragState.isDragging = false;
		dragState.dragIndex = -1;
		dragState.velocityX = 0;
		dragState.velocityY = 0;
	}

	// Animation effect using Svelte 5 $effect
	$effect(() => {
		if (!browser || !visible) return;

		let animationFrame;

		function animateSkills() {
			const container = document.querySelector('.skills-cloud-container');
			const isGridMode = container && window.getComputedStyle(container).display === 'grid';

			if (isGridMode) {
				animationFrame = requestAnimationFrame(animateSkills);
				return;
			}

			skillPositions.forEach((position, i) => {
				// Don't animate position if being dragged
				if (position.mode === 'dragging') return;

				if (position.mode === 'throwing') {
					// Clean throwing physics - just movement and bouncing
					position.x += position.speedX;
					position.y += position.speedY;

					// Boundary bouncing for throwing mode - wider boundaries for more action
					if (position.x > 400) {
						position.x = 400;
						position.speedX = Math.abs(position.speedX) * -0.8; // Bouncier for throwing
					} else if (position.x < -400) {
						position.x = -400;
						position.speedX = Math.abs(position.speedX) * 0.8; // Bouncier for throwing
					}

					if (position.y > 120) {
						position.y = 120;
						position.speedY = Math.abs(position.speedY) * -0.8; // Bouncier for throwing
					} else if (position.y < -120) {
						position.y = -120;
						position.speedY = Math.abs(position.speedY) * 0.8; // Bouncier for throwing
					}

					// Natural friction for throwing mode - even less friction for longer slides
					position.speedX *= 0.999; // Almost no friction for maximum slides
					position.speedY *= 0.999;
				} else if (position.mode === 'floating') {
					// Check if sine wave and associated animations should be re-enabled
					if (
						position.sineWaveDisabled &&
						position.sineWaveReenableTime !== 0 &&
						Date.now() > position.sineWaveReenableTime
					) {
						position.sineWaveDisabled = false;
						// Re-initialize phase and scaleSpeed for natural floating resumption
						position.phase = Math.random() * Math.PI * 2;
						position.scaleSpeed = (Math.random() - 0.5) * 0.003;
					}

					position.x += position.speedX;
					let ySpeedComponent = position.speedY;
					if (!position.sineWaveDisabled) {
						ySpeedComponent += Math.sin(Date.now() * 0.001 + position.phase) * 0.3;
					}
					position.y += ySpeedComponent;

					// Boundary bouncing for floating mode
					if (position.x > 350) {
						position.x = 350;
						position.speedX = Math.abs(position.speedX) * -0.8; // Reverse direction with damping
					} else if (position.x < -350) {
						position.x = -350;
						position.speedX = Math.abs(position.speedX) * 0.8; // Reverse direction with damping
					}

					if (position.y > 80) {
						position.y = 80;
						position.speedY = Math.abs(position.speedY) * -0.8; // Reverse direction with damping
					} else if (position.y < -80) {
						position.y = -80;
						position.speedY = Math.abs(position.speedY) * 0.8; // Reverse direction with damping
					}

					// Very light friction for floating mode
					position.speedX *= 0.9995;
					position.speedY *= 0.9995;

					// Minimum speed to keep floating skills moving
					const minSpeed = 0.1;
					if (Math.abs(position.speedX) < minSpeed) {
						position.speedX = position.speedX < 0 ? -minSpeed : minSpeed;
					}
					if (Math.abs(position.speedY) < minSpeed) {
						position.speedY = position.speedY < 0 ? -minSpeed : minSpeed;
					}

					// Much slower scale animation for depth effect (floating mode only)
					// Only apply if sineWave (and associated animations) are not disabled
					if (!position.sineWaveDisabled) {
						position.scale += position.scaleSpeed;
						// Bounce scale between 0.7 and 1.1 (tighter range for more subtle effect)
						if (position.scale > 1.1 || position.scale < 0.7) {
							position.scaleSpeed *= -1;
							// Clamp scale to prevent it from going too far out of bounds
							position.scale = Math.max(0.7, Math.min(1.1, position.scale));
						}
					}
				}
			});

			animationFrame = requestAnimationFrame(animateSkills);
		}

		// Start animation
		animationFrame = requestAnimationFrame(animateSkills);

		// Set up mouse interaction
		const handleMouseMove = (e) => {
			const container = document.querySelector('.skills-cloud-container');
			const isGridMode = container && window.getComputedStyle(container).display === 'grid';

			if (isGridMode) return;

			const skillElements = document.querySelectorAll('.skill-tag');
			skillElements.forEach((element, i) => {
				// Only apply mouse repulsion to floating skills
				if (skillPositions[i].mode !== 'floating') return;

				const elementRect = element.getBoundingClientRect();
				const elementX = elementRect.left + elementRect.width / 2;
				const elementY = elementRect.top + elementRect.height / 2;

				// Calculate distance from mouse to element
				const dx = e.clientX - elementX;
				const dy = e.clientY - elementY;
				const distance = Math.sqrt(dx * dx + dy * dy);

				// Only apply avoidance if mouse is close enough
				if (distance < 100) {
					// Calculate repulsion force (stronger when closer)
					const force = Math.max(0, 1 - distance / 100) * 10;
					const angle = Math.atan2(dy, dx);

					// Apply repulsion
					const repelX = -Math.cos(angle) * force;
					const repelY = -Math.sin(angle) * force;

					// Accelerate away from cursor
					skillPositions[i].speedX += repelX * 0.05;
					skillPositions[i].speedY += repelY * 0.05;

					// Cap maximum speed
					const currentSpeed = Math.sqrt(
						skillPositions[i].speedX * skillPositions[i].speedX +
							skillPositions[i].speedY * skillPositions[i].speedY
					);

					if (currentSpeed > 3) {
						const ratio = 3 / currentSpeed;
						skillPositions[i].speedX *= ratio;
						skillPositions[i].speedY *= ratio;
					}
				}
			});
		};

		if (skillsContainer) {
			skillsContainer.addEventListener('mousemove', handleMouseMove);
		}

		// Cleanup function
		return () => {
			if (animationFrame) {
				cancelAnimationFrame(animationFrame);
			}
			if (skillsContainer) {
				skillsContainer.removeEventListener('mousemove', handleMouseMove);
			}
		};
	});

	// Handle fireball hover for glow effect after entrance animation
	function handleFireballHover(isHovering) {
		if (!fireballEntranceComplete) return;
		fireballGlowHovering = isHovering;
	}

	onMount(() => {
		// Add mouse move listener for parallax effect
		document.addEventListener('mousemove', handleMouseMove);
		// Add drag listeners
		document.addEventListener('mousemove', handleDocumentMouseMove);
		document.addEventListener('mouseup', handleDocumentMouseUp);

		// Add scroll listener
		const handleScroll = () => {
			scrollY = window.scrollY;
			// Update showScrollIndicator only on the client
			if (browser) {
				showScrollIndicator = scrollY < window.innerHeight / 2;
			}
		};

		window.addEventListener('scroll', handleScroll);

		// Initial check for scroll indicator visibility on mount
		if (browser) {
			showScrollIndicator = scrollY < window.innerHeight / 2;
		}

		// Small delay before showing animations
		setTimeout(() => {
			visible = true;

			// Set fireball entrance complete after the animation finishes
			setTimeout(() => {
				fireballEntranceComplete = true;

				// Don't remove animation - let CSS handle the hover states
				// The entrance animation will complete naturally and hover will work
			}, 3500); // 1000ms delay + 2500ms duration
		}, 100);

		// Intersection observers for feature and stats sections
		const featuresObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						visibleFeatures = true;
						featuresObserver.disconnect();
					}
				});
			},
			{ threshold: 0.2 }
		);

		const statsObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						visibleStats = true;
						statsObserver.disconnect();
					}
				});
			},
			{ threshold: 0.2 }
		);

		const features = document.querySelector('.features-section');
		const statsSection = document.querySelector('.stats-section');

		if (features) featuresObserver.observe(features);
		if (statsSection) statsObserver.observe(statsSection);

		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mousemove', handleDocumentMouseMove);
			document.removeEventListener('mouseup', handleDocumentMouseUp);
			window.removeEventListener('scroll', handleScroll);
			featuresObserver.disconnect();
			statsObserver.disconnect();
		};
	});
</script>

<!-- HERO SECTION WRAPPER -->
<div class="hero">
	<!-- Text Content Container -->
	<div class="hero-text-container">
		{#if visible}
			<h1 class="intro-text" transition:fade={{ delay: 100, duration: 500 }}>Hi, my name is</h1>
			<h1 class="name" transition:fly={{ delay: 300, duration: 800, x: -50, y: 0 }}>
				James Niemerg.
			</h1>
			<h1 class="tagline" transition:fly={{ delay: 500, duration: 800, x: -50, y: 0 }}>
				Blazing Fast Labs.
			</h1>

			<div class="typed-text-wrapper" transition:fade={{ delay: 700, duration: 500 }}>
				<TypedText
					strings={[
						'Professional Overthinker',
						'Web App Tinkerer',
						'CSS Wrangler',
						'Full-Stack Fiddler',
						'Bug Hunter',
						'Home Lab Janitor',
						'Button Clicker',
						'Wielder of Fireballs',
						'90s Jungle Enthusiast'
					]}
					typeSpeed={60}
					backSpeed={30}
					backDelay={1500}
					startDelay={500}
					loop={true}
				/>
			</div>

			<p class="description" transition:fade={{ delay: 800, duration: 800 }}>
				Marketing veteran turned full-stack developer. I build, break, and ship web apps,
				automations, and digital tools under the Blazing Fast Labs name.
			</p>

			<div class="cta-buttons">
				<div class="button-wrapper">
					<a href="/about" class="button-primary">
						<span>Follow Me</span>
					</a>
				</div>
				<div class="button-wrapper">
					<a href="/contact" class="button-secondary">
						<span>Let's Collaborate!</span>
					</a>
				</div>
			</div>

			{#if visible && showScrollIndicator}
				<div class="scroll-indicator" transition:fade={{ delay: 1200, duration: 500 }}>
					<div class="mouse">
						<div class="wheel"></div>
					</div>
					<div class="scroll-text">Scroll down</div>
				</div>
			{/if}
		{/if}
	</div>

	<!-- Fireball Container -->
	<div class="hero-fireball-container">
		{#if visible}
			<div class="fireball-wrapper">
				<div
					class="fireball-glow-container"
					role="presentation"
					bind:this={fireballGlowContainer}
					onmouseenter={() => handleFireballHover(true)}
					onmouseleave={() => handleFireballHover(false)}
					in:fly={{
						delay: 1000,
						duration: 2500,
						x: 100,
						y: -100,
						opacity: 0,
						easing: elasticOut
					}}
				>
					<div
						class="fireball-glow-effect {fireballGlowHovering ? 'fireball-glow-hovering' : ''}"
					></div>
					<img
						src="https://g15vtr55yw.ufs.sh/f/Bh1ffWkP18dQHbjjBhqR7awMfsCYr2uXx0SpVlZiUg6dJzcF"
						alt="Fireball Logo"
						class="fireball-logo"
					/>
				</div>
			</div>
		{/if}
	</div>
</div>
<!-- END HERO SECTION WRAPPER -->

<!-- Features Section -->
<section class="features-section section">
	<div class="container">
		<div class="section-header">
			<h2 class="section-title">What I Do</h2>
			<div class="underline"></div>
			<p class="section-intro">
				I create blazing fast websites and applications that deliver exceptional user experiences.
			</p>
		</div>

		<div class="features-content">
			<div class="feature-cards-grid">
				{#if visibleFeatures}
					<div
						class="feature-card"
						transition:fly={{ y: 30, duration: 800, delay: 100, easing: quintOut }}
					>
						<div class="feature-icon">⚡️</div>
						<h3>Blazing Fast</h3>
						<p>
							Optimized for speed with modern frameworks, efficient code, and performance best
							practices. Every millisecond counts.
						</p>
					</div>

					<div
						class="feature-card"
						transition:fly={{ y: 30, duration: 800, delay: 200, easing: quintOut }}
					>
						<div class="feature-icon">📱</div>
						<h3>Responsive</h3>
						<p>
							Seamlessly adapts to any screen size. Perfect experience on phones, tablets, and
							desktops.
						</p>
					</div>

					<div
						class="feature-card"
						transition:fly={{ y: 30, duration: 800, delay: 300, easing: quintOut }}
					>
						<div class="feature-icon">🎨</div>
						<h3>Creative Design</h3>
						<p>
							Beautiful, intuitive interfaces with smooth animations and user-centered design
							principles.
						</p>
					</div>

					<div
						class="feature-card"
						transition:fly={{ y: 30, duration: 800, delay: 400, easing: quintOut }}
					>
						<div class="feature-icon">♿</div>
						<h3>Accessible</h3>
						<p>
							Built with accessibility in mind. WCAG compliant, screen reader friendly, for all
							users.
						</p>
					</div>
				{/if}
			</div>
		</div>

		<!-- Floating skills cloud -->
		<div class="skills-cloud-container" bind:this={skillsContainer}>
			{#if visibleFeatures}
				<div class="skills-cloud">
					{#each skillPositions as position, i}
						{@const transform = skillTransforms[i]}
						{@const zIndex =
							transform?.zIndex ??
							(position.mode === 'dragging'
								? 1000
								: position.mode === 'throwing'
									? 500 + i
									: 100 + i)}
						<div
							class="skill-tag"
							class:dragging={position.mode === 'dragging'}
							class:throwing={position.mode === 'throwing'}
							style:transform={transform?.transform ??
								`translate(${position.x}px, ${position.y}px) scale(${position.scale})`}
							style:opacity={transform?.opacity ?? position.opacity}
							style:z-index={zIndex}
							role="button"
							tabindex="0"
							transition:scale={{
								delay: 500 + i * 50,
								duration: 800,
								easing: elasticOut
							}}
							onmousedown={(e) => handleSkillMouseDown(e, i)}
						>
							<a
								href={`#${position.skill.toLowerCase()}`}
								onclick={(e) => {
									// Prevent navigation if we're dragging or throwing
									if (position.mode === 'dragging' || position.mode === 'throwing') {
										e.preventDefault();
									}
								}}
							>
								{position.skill}
							</a>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</section>

<!-- Stats Section -->
<!-- <section class="stats-section section">
	<div class="container">
		<div class="stats-grid">
			{#if visibleStats}
				<div class="stat-card" transition:scale={{ delay: 0, duration: 800, easing: elasticOut }}>
					<div class="stat-icon component-icon">
						<Zap size={48} color="var(--accent)" />
					</div>
					<div class="stat-value">100%</div>
					<div class="stat-label">Performance Score</div>
				</div>

				<div class="stat-card" transition:scale={{ delay: 100, duration: 800, easing: elasticOut }}>
					<div class="stat-icon emoji-icon">
						<span class="emoji">👍</span>
					</div>
					<div class="stat-value">100%</div>
					<div class="stat-label">Client Satisfaction</div>
				</div>

				<div class="stat-card" transition:scale={{ delay: 200, duration: 800, easing: elasticOut }}>
					<div class="stat-icon emoji-icon">
						<span class="emoji">🚀</span>
					</div>
					<div class="stat-value">50+</div>
					<div class="stat-label">Projects Completed</div>
				</div>

				<div class="stat-card" transition:scale={{ delay: 300, duration: 800, easing: elasticOut }}>
					<div class="stat-icon emoji-icon">
						<span class="emoji">⏱️</span>
					</div>
					<div class="stat-value">10+</div>
					<div class="stat-label">Years Experience</div>
				</div>
			{/if}
		</div>
	</div>
</section> -->

<style>
	.hero {
		min-height: clamp(600px, 100vh, 900px);
		padding: 6rem 4rem 2rem 4rem;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 350px), 1fr));
		gap: clamp(1rem, 4vw, 3rem);
		align-items: center;

		/* Crucial for centering and constraining the hero block */
		width: 100%; /* Takes full width of its parent */
		max-width: 1200px; /* But not more than 1200px */
		margin-left: auto; /* Centers the block horizontally */
		margin-right: auto;

		container-type: inline-size;
		container-name: hero-section;
	}

	.hero-text-container {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		min-width: 0;
	}

	.hero-fireball-container {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 300px;
	}

	.name,
	.tagline {
		font-size: clamp(3rem, 5vw, 4rem);
		line-height: normal;
		margin: 0;
	}

	.intro-text {
		font-size: clamp(1rem, 2.5vw, 1.5rem);
		color: var(--description);
		margin: 0;
		line-height: 1.3;
	}

	@property --gradient-angle {
		syntax: '<angle>';
		initial-value: 0deg;
		inherits: false;
	}

	.cta-buttons {
		display: flex;
		gap: 16px;
		width: 100%;
		max-width: 600px;
		margin-bottom: 40px;
		align-self: flex-start;
	}

	.button-primary,
	.button-secondary {
		position: relative;
		border-radius: 0.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 12px 20px;
		text-decoration: none;
		font-family: 'Nunito Sans', sans-serif;
		font-size: 14px;
		font-weight: 500;
		flex: 1;
		isolation: auto;
		color: var(--color-text-light);
		max-width: 300px;
		z-index: 0;

		transition:
			transform 0.3s ease,
			padding 0.3s ease,
			background 0.3s ease;
	}

	.button-primary span,
	.button-secondary span {
		position: relative;
	}

	.button-wrapper {
		position: relative;
		display: inline-block;
	}

	.button-wrapper::before,
	.button-wrapper::after {
		content: '';
		position: absolute;
		inset: -0.16rem;
		border-radius: 0.76rem;
		animation: rotation 5s linear infinite;
		opacity: 0;
		transition: opacity 0.3s ease;
		pointer-events: none;
	}

	.button-wrapper::before {
		/* Sharp border effect */
		background: conic-gradient(
			from var(--gradient-angle),
			var(--gruv-darkorange),
			var(--gruv-yellow),
			var(--gruv-orange),
			var(--gruv-yellow),
			var(--gruv-darkorange)
		);
		mask:
			linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		mask-composite: xor;
		-webkit-mask:
			linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		padding: 0.16rem;
	}

	.button-wrapper::after {
		background: conic-gradient(
			from var(--gradient-angle),
			var(--gruv-darkorange),
			var(--gruv-yellow),
			var(--gruv-orange),
			var(--gruv-yellow),
			var(--gruv-darkorange)
		);
		filter: blur(2rem);
		z-index: -1;
	}

	.button-wrapper:has(.button-secondary)::before {
		background: conic-gradient(
			from var(--gradient-angle),
			var(--gruv-darkblue),
			var(--gruv-yellow),
			var(--gruv-blue),
			var(--gruv-yellow),
			var(--gruv-darkblue)
		);
	}

	.button-wrapper:has(.button-secondary)::after {
		background: conic-gradient(
			from var(--gradient-angle),
			var(--gruv-darkblue),
			var(--gruv-yellow),
			var(--gruv-blue),
			var(--gruv-yellow),
			var(--gruv-darkblue)
		);
	}

	.button-wrapper:hover::before,
	.button-wrapper:hover::after {
		opacity: 1;
	}

	/* Add more left padding when window gets narrow */
	@container hero-section (600px <= width <= 900px) {
		.hero {
			padding-left: 3rem;
		}
	}

	@container hero-section (width <= 795px) {
		.hero {
			/* Stack vertically to a single column */
			grid-template-columns: 1fr;
			gap: 2rem;
			text-align: center;
			padding-left: 2rem; /* Reset to normal when stacked */
		}

		.cta-buttons {
			/* Center the buttons when layout stacks */
			align-self: center;
			justify-content: center;
		}

		.hero-fireball-container {
			/* Move fireball below text and reduce excessive height */
			order: 2;
			min-height: 250px; /* Reduce from 300px to bring fireball closer */
		}

		.hero-text-container {
			/* Text goes first */
			order: 1;
		}
	}

	@container hero-section (475px <= width <= 795.02px) {
		.button-primary,
		.button-secondary {
			flex: 0 0 auto;
			min-width: 140px;
		}
	}

	@container hero-section (600px <= width <= 795px) {
		.cta-buttons {
			margin: 0 auto;
			width: fit-content;
		}

		.hero-fireball-container {
			min-height: 220px;
		}
	}

	@container hero-section (480px <= width <= 600px) {
		.hero-fireball-container {
			min-height: 200px;
		}
	}

	@media screen and (max-width: 480px) {
		.button-primary,
		.button-secondary {
			padding: 14px 20px;
			font-size: 15px;
		}

		.cta-buttons {
			flex-direction: column;
		}
	}

	@container hero-section (width <= 375px) {
		.hero {
			padding: 7rem 1rem 2rem 1rem;
			gap: 1rem;
			min-height: clamp(500px, 90vh, 700px);
		}

		.hero-text-container {
			gap: 1rem;
		}

		.hero-fireball-container {
			min-height: 200px;
		}

		.fireball-glow-container {
			width: clamp(150px, 30vw, 200px);
			height: clamp(150px, 30vw, 200px);
		}
	}

	.button-primary {
		background: var(--gruv-darkorange);
	}
	.button-secondary {
		background: var(--primary);
	}

	.button-primary span,
	.button-secondary span {
		position: relative;
		z-index: 1;
	}

	@keyframes rotation {
		0% {
			--gradient-angle: 0deg;
		}
		100% {
			--gradient-angle: 360deg;
		}
	}

	.scroll-indicator {
		position: fixed;
		bottom: 40px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		opacity: 0.8;
	}

	@media screen and (max-width: 1024px) {
		.scroll-indicator {
			display: none;
		}
	}

	.mouse {
		width: 30px;
		height: 50px;
		border: 2px solid var(--color-text);
		border-radius: 15px;
		position: relative;
	}

	.wheel {
		position: absolute;
		left: 50%;
		top: 10px;
		transform: translateX(-50%);
		width: 4px;
		height: 10px;
		background: var(--accent);
		border-radius: 2px;
		animation: scroll-wheel 2s ease infinite;
	}

	@keyframes scroll-wheel {
		0% {
			opacity: 1;
			transform: translateX(-50%) translateY(0);
		}
		100% {
			opacity: 0;
			transform: translateX(-50%) translateY(15px);
		}
	}

	.scroll-text {
		margin-top: 10px;
		font-family: 'Nunito Sans', sans-serif;
		font-size: 12px;
		color: var(--description);
		text-transform: uppercase;
		letter-spacing: 2px;
	}

	/* Features section */
	.features-section {
		padding: 80px 0;
		background-color: var(--background);
		position: relative;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 20px;
	}

	.section-header {
		text-align: center;
		margin-bottom: 40px;
	}

	.section-header h2 {
		font-family: 'Kilimanjaro Sans Round1', 'Nunito Sans', sans-serif;
		font-size: 40px;
		color: var(--color-text);
		margin-bottom: 16px;
	}

	.underline {
		height: 4px;
		width: 80px;
		background: linear-gradient(
			90deg,
			var(--gruv-darkorange),
			var(--accent),
			var(--gruv-darkorange),
			var(--accent),
			var(--gruv-darkorange)
		);
		background-position: 0% 50%;
		background-size: 1000% 100%;
		margin: 0 auto;
		border-radius: 2px;
		transition: width 0.3s ease;
	}

	.underline:hover {
		width: 95px;
		animation: scroll-gradient 3s linear infinite;
	}

	@keyframes scroll-gradient {
		0% {
			background-position: 0% 50%;
		}
		100% {
			background-position: 100% 50%;
		}
	}

	.section-intro {
		max-width: 700px;
		margin: 24px auto 0;
		font-size: 14px;
		color: var(--description);
		line-height: 1.6;
	}

	.features-content {
		display: grid;
		grid-template-columns: 1fr;
		gap: 30px;
		align-items: center;
	}

	.feature-cards-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 15px;
		margin: 0 auto;
	}

	.feature-card {
		background: #333333;
		border-radius: 8px;
		padding: 16px;
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
		transition: box-shadow 0.3s ease;
	}

	.feature-card:hover {
		box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
	}

	.feature-icon {
		font-size: 28px;
		margin-bottom: 12px;
	}

	.feature-card h3 {
		font-family: 'Nunito Sans', sans-serif;
		font-size: 18px;
		color: var(--accent);
		margin: 0 0 12px 0;
	}

	.feature-card p {
		font-family: 'Nunito Sans', sans-serif;
		font-size: 14px;
		line-height: 1.5;
		color: var(--description);
		margin: 0;
	}

	/* Responsive: stack on smaller screens */
	@media screen and (max-width: 1024px) {
		.feature-cards-grid {
			grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		}
	}

	@media screen and (max-width: 768px) {
		.feature-cards-grid {
			grid-template-columns: 1fr;
		}
	}

	.skills-cloud-container {
		width: 100%;
		height: 350px;
		margin: 40px 0;
		position: relative;
		perspective: 1000px;
		perspective-origin: center center;
		overflow: hidden;
		border: 2px solid transparent;
		border-radius: 10px;

		border-image: linear-gradient(
				120deg,
				var(--gruv-darkblue) 0%,
				var(--gruv-darkorange) 25%,
				rgba(187, 100, 66, 0.7) 50%,
				var(--gruv-darkorange) 75%,
				var(--gruv-darkblue) 100%
			)
			1;
		border-image-slice: 1;
		container-type: inline-size;
		container-name: skills-cloud;
	}

	/* Adjust height for different container sizes using container queries */
	@container skills-cloud (width <= 1024px) {
		.skills-cloud-container {
			height: 350px;
		}
	}

	@container skills-cloud (width <= 768px) {
		.skills-cloud-container {
			height: 300px;
		}
	}

	@container skills-cloud (width <= 480px) {
		.skills-cloud-container {
			height: 250px;
		}
	}

	/* When container width is 920px or less, switch to 4x4 grid layout using container queries */
	@container skills-cloud (width <= 920px) {
		.skills-cloud-container {
			perspective: none;
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			grid-template-rows: repeat(4, 1fr);
			gap: 10px;
			height: auto;
			padding: 20px;
			place-items: center;
		}

		.skills-cloud {
			/* CHANGE: Remove display: contents, use grid instead */
			position: static;
			width: 100%;
			height: 100%;
			transform: none;
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			grid-template-rows: repeat(4, 1fr);
			gap: 10px;
			place-items: center;
		}

		.skill-tag {
			/* CHANGE: Keep position: absolute for transforms to work */
			position: relative;
			backface-visibility: visible;
			display: flex;
			justify-content: center;
			align-items: center;
			will-change: auto;
			width: auto;
			height: auto;
			min-width: auto;
			min-height: auto;
			/* Allow small transforms within grid cells */
			transform-origin: center;
		}

		.skill-tag a {
			width: auto;
			height: auto;
			text-align: center;
			white-space: nowrap;
			border: 1px solid rgba(255, 255, 255, 0.2);
			display: inline-block;
			padding: 8px 14px;
		}
	}

	.skills-cloud {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 1px;
		height: 1px;
		transform-style: preserve-3d;
	}

	.skill-tag {
		position: absolute;
		transform-style: preserve-3d;
		backface-visibility: hidden;
		cursor: grab;
		will-change: transform;
		user-select: none;
		/* Improve click detection */
		pointer-events: auto;
		/* Ensure consistent hit area */
		min-width: 60px;
		min-height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.skill-tag:active {
		cursor: grabbing;
	}

	.skill-tag a {
		font-family: 'Nunito Sans', sans-serif;
		font-size: 16px;
		color: var(--color-text);
		background: linear-gradient(
			145deg,
			rgba(69, 133, 136, 0.3) 0%,
			rgba(69, 133, 136, 0.2) 50%,
			rgba(40, 80, 83, 0.3) 100%
		);
		border: 1px solid var(--primary);
		padding: 8px 14px;
		border-radius: 20px;
		white-space: nowrap;
		text-decoration: none;

		position: relative;
		transition:
			background 0.3s ease,
			color 0.3s ease,
			transform 0.3s ease,
			box-shadow 0.3s ease;
		box-shadow:
			0 6px 12px rgba(0, 0, 0, 0.25),
			0 3px 6px rgba(0, 0, 0, 0.15),
			inset 0 1px 2px rgba(255, 255, 255, 0.1),
			inset 0 -1px 2px rgba(0, 0, 0, 0.1);
		background-clip: padding-box;
		/* Enable pointer events for better click detection */
		pointer-events: auto;

		/* Ensure the <a> tag fills its parent div.skill-tag */
		width: 100%;
		height: 100%;
		box-sizing: border-box; /* Include padding and border in the element's total width and height */
		display: flex; /* Use flex to center content within the <a> tag */
		align-items: center;
		justify-content: center;
	}

	.skill-tag a::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(
			135deg,
			rgba(255, 255, 255, 0.1) 0%,
			transparent 50%,
			rgba(0, 0, 0, 0.05) 100%
		);
		border-radius: 20px;
		pointer-events: none;
	}

	.skill-tag:hover a {
		background: linear-gradient(
			145deg,
			var(--primary) 0%,
			rgba(69, 133, 136, 0.8) 50%,
			var(--primary) 100%
		);
		transform: scale(1.1) translateZ(10px);
		box-shadow:
			0 12px 24px rgba(0, 0, 0, 0.35),
			0 6px 12px rgba(0, 0, 0, 0.25),
			inset 0 2px 4px rgba(255, 255, 255, 0.15),
			inset 0 -2px 4px rgba(0, 0, 0, 0.15);
	}

	/* Better hover for throwing state - simpler transform */
	.skill-tag.throwing:hover a {
		transform: scale(1.1); /* No translateZ during throwing */
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	/* Enhanced dragging state */
	.skill-tag.dragging {
		z-index: 1000 !important;
	}

	.skill-tag.dragging a {
		transform: scale(1.15) rotate(2deg);
		box-shadow:
			0 20px 40px rgba(0, 0, 0, 0.5),
			0 10px 20px rgba(0, 0, 0, 0.4);
		background: linear-gradient(145deg, var(--accent) 0%, var(--primary) 50%, var(--accent) 100%);
	}

	/* Throwing state - keep skills flat and clickable during 2D physics */
	.skill-tag.throwing {
		transform-style: flat !important;
	}

	.skill-tag.throwing a {
		pointer-events: auto;

		/* Subtle visual indicator that skill is in throwing mode */
		border-color: var(--accent);
		box-shadow:
			0 4px 8px rgba(0, 0, 0, 0.2),
			0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.stats-grid {
		/* Enhanced RAM pattern for better responsiveness */
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr));
		gap: var(--space-8);
	}

	.stat-card {
		background: #333333;
		border-radius: 10px;
		padding: 30px;
		text-align: center;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}

	.stat-card:hover {
		transform: translateY(-10px);
		box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
	}

	.stat-icon {
		font-size: 40px;
		margin-bottom: 16px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	/* ===== FIREBALL STYLES ===== */
	.fireball-wrapper {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.fireball-glow-container {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		/* RAM PATTERN - Responsive scaling without media queries! */
		width: clamp(200px, 35vw, 350px);
		height: clamp(200px, 35vw, 350px);
	}

	.fireball-logo {
		width: 100%;
		height: 100%;
		object-fit: contain;
		position: relative;
		z-index: 2;
		transition: transform var(--transition-normal);
		filter: drop-shadow(0 4px 24px rgba(255, 140, 0, 0.25));
		cursor: pointer;
	}

	.fireball-logo:hover {
		transform: scale(1.05) rotate(5deg);
		filter: drop-shadow(0 6px 32px rgba(255, 140, 0, 0.4));
	}

	.fireball-glow-effect {
		position: absolute;
		inset: -2rem;
		z-index: 1;
		border-radius: 50%;
		background: radial-gradient(
			circle,
			rgba(255, 140, 0, 0.8) 0%,
			rgba(255, 69, 0, 0.6) 20%,
			rgba(255, 165, 0, 0.4) 40%,
			rgba(255, 215, 0, 0.2) 60%,
			transparent 80%
		);
		opacity: 0;
		animation: fireballEntranceGlow 2.5s ease-out 1s forwards;
		filter: blur(20px);
		pointer-events: none;
		transform: translate(-50%, -50%) scale(1);
		top: 50%;
		left: 50%;
	}

	.fireball-glow-effect.fireball-glow-hovering {
		opacity: 0.8;
		transform: translate(-50%, -50%) scale(1.2);
		animation: none;
		filter: blur(15px); /* Slightly less blur for more defined glow */
	}

	@keyframes fireballEntranceGlow {
		0% {
			opacity: 0;
			transform: translate(-50%, -50%) scale(0.8);
		}
		50% {
			opacity: 0.9;
			transform: translate(-50%, -50%) scale(1.3);
		}
		100% {
			opacity: 0.6;
			transform: translate(-50%, -50%) scale(1);
		}
	}

	/* Adjust fireball positioning and size for tablet breakpoint */
	@media screen and (min-width: 700px) and (max-width: 800px) {
		.fireball-glow-container {
			transform: translateY(10px); /* Move slightly down */
		}

		.fireball-glow-effect {
			transform: translate(-50%, -50%) scale(0.9); /* Make slightly smaller */
		}
	}
	.intro-text {
		font-family: 'Kilimanjaro Sans Round1', 'Nunito Sans', sans-serif;
		font-size: var(--h6);
		color: var(--gruv-darkwhite);
		margin: 0;
		font-weight: 400;
		opacity: 0.9;
	}

	.name {
		width: 100%;
		font-family: 'Kilimanjaro Sans Round1', 'Nunito Sans', sans-serif;
		font-style: normal;
		font-weight: 400;
		margin: 0;
		background: linear-gradient(
			135deg,
			var(--accent) 0%,
			var(--secondary) 40%,
			var(--gruv-red) 100%
		);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.tagline {
		width: 100%;
		font-family: 'Kilimanjaro Sans Round1', 'Nunito Sans', sans-serif;
		font-style: normal;
		font-weight: 400;
		margin: 0;
		background: linear-gradient(135deg, #ff7a30 0%, var(--secondary) 50%, var(--gruv-red) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.description {
		font-family: 'Inter', 'Nunito Sans', sans-serif;
		color: var(--description);
		margin-bottom: 36px;
		max-width: 50ch;
		font-size: clamp(0.9rem, 1.5vw, 1rem);
		margin: 0;
	}
</style>
