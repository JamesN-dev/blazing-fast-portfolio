<script>
	import { onMount } from 'svelte';
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
	let skillsAnimationFrame;
	let fireballEntranceComplete = $state(false);
	let fireballGlowContainer = $state();
	let fireballGlowHovering = $state(false);

	// Function to handle parallax effect
	function handleMouseMove(e) {
		// Get mouse position relative to viewport center
		mousePosX = (e.clientX / window.innerWidth - 0.5) * 2;
		mousePosY = (e.clientY / window.innerHeight - 0.5) * 2;
	}

	// Skills for floating cloud, not a sphere anymore
	const skills = [
		'SvelteKit',
		'JavaScript',
		'CSS3',
		'HTML5',
		'TailwindCSS',
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

	// Random positions in a more horizontal layout
	const skillPositions = skills.map((skill, index) => {
		return {
			x: -300 + Math.random() * 600, // Horizontal spread
			y: -50 + Math.random() * 100, // Less vertical spread
			z: -150 + Math.random() * 300, // Some depth
			skill: skill,
			// Random but gentle movement
			speedX: (Math.random() - 0.5) * 0.5, // Increased speed
			speedY: (Math.random() - 0.5) * 0.3, // Increased speed
			speedZ: (Math.random() - 0.5) * 0.4, // Increased speed
			phase: Math.random() * Math.PI * 2 // Random starting phase
		};
	});

	// Function to start skill animation
	function startSkillsAnimation() {
		// Get references to all skill tags
		const skillElements = document.querySelectorAll('.skill-tag');

		if (!skillElements.length) {
			// If elements aren't ready yet, try again in a moment
			setTimeout(startSkillsAnimation, 100);
			return;
		}

		console.log('Starting animation with', skillElements.length, 'skill elements');

		function animateSkills() {
			// Update position of each skill
			skillPositions.forEach((position, i) => {
				// Move according to speed and add some sine wave motion
				position.x += position.speedX;
				position.y += position.speedY + Math.sin(Date.now() * 0.001 + position.phase) * 0.5;
				position.z += position.speedZ;

				// Boundaries to keep them on screen
				if (Math.abs(position.x) > 350) position.speedX *= -1;
				if (Math.abs(position.y) > 80) position.speedY *= -1;
				if (Math.abs(position.z) > 200) position.speedZ *= -1;

				// Apply the updated position
				if (skillElements[i]) {
					skillElements[i].style.transform =
						`translate3d(${position.x}px, ${position.y}px, ${position.z}px)`;
				}
			});

			skillsAnimationFrame = requestAnimationFrame(animateSkills);
		}

		// Start animation
		animateSkills();

		// Set up mouse interaction
		if (skillsContainer) {
			skillsContainer.addEventListener('mousemove', handleSkillsMouseMove);
		}
	}

	// Function to handle mouse interaction with skills
	function handleSkillsMouseMove(e) {
		const skillElements = document.querySelectorAll('.skill-tag');

		skillElements.forEach((element, i) => {
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
	}

	// Handle fireball hover for glow effect after entrance animation
	function handleFireballHover(isHovering) {
		if (!fireballEntranceComplete) return;
		fireballGlowHovering = isHovering;
	}

	onMount(() => {
		// Add mouse move listener for parallax effect
		document.addEventListener('mousemove', handleMouseMove);

		// Add scroll listener
		const handleScroll = () => {
			scrollY = window.scrollY;
		};

		window.addEventListener('scroll', handleScroll);

		// Small delay before showing animations
		setTimeout(() => {
			visible = true;

			// Set fireball entrance complete after the animation finishes
			setTimeout(() => {
				fireballEntranceComplete = true;

				// Remove animation property from glow effect to prevent phantom glow
				const glow = fireballGlowContainer?.querySelector('.fireball-glow-effect');
				if (glow) {
					glow.style.animation = 'none';
				}
			}, 3500); // 1000ms delay + 2500ms duration
		}, 100);

		// Intersection observers for feature and stats sections
		const featuresObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						visibleFeatures = true;
						featuresObserver.disconnect();

						// Start skills animation when features section becomes visible
						setTimeout(startSkillsAnimation, 1000);
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

		// Get skills container reference
		skillsContainer = document.querySelector('.skills-cloud-container');

		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('scroll', handleScroll);
			featuresObserver.disconnect();
			statsObserver.disconnect();

			if (skillsContainer) {
				skillsContainer.removeEventListener('mousemove', handleSkillsMouseMove);
			}

			if (skillsAnimationFrame) {
				cancelAnimationFrame(skillsAnimationFrame);
			}
		};
	});
</script>

<!-- Hero Section -->
<div class="parallax-container" id="hero">
	<div
		class="parallax-layer background-layer"
		style="transform: translate({mousePosX * -20}px, {mousePosY * -20}px);"
	></div>

	<div
		class="parallax-layer content-layer"
		style="transform: translate({mousePosX * 10}px, {mousePosY * 10}px);"
	>
		<div class="hero-content">
			<div class="hero-text">
				{#if visible}
					<h1 class="intro-text" transition:fade={{ delay: 100, duration: 500 }}>Hi, my name is</h1>
					<h1 class="name" transition:fly={{ delay: 300, duration: 800, x: -50, y: 0 }}>
						James Niemerg.
					</h1>
					<h1 class="tagline" transition:fly={{ delay: 500, duration: 800, x: -50, y: 0 }}>
						Blazing Fast Labs.
					</h1>

					<div class="typed-text" transition:fade={{ delay: 700, duration: 500 }}>
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
				{/if}

				{#if visible}
					<div class="cta-buttons" transition:fly={{ delay: 1000, duration: 800, y: 20, x: 0 }}>
						<a href="/about" class="button-primary">
							<span>Follow Me</span>
						</a>
						<a href="/contact" class="button-secondary">
							<span>Let's Collaborate!</span>
						</a>
					</div>
				{/if}

				{#if visible}
					<div class="scroll-indicator" transition:fade={{ delay: 1200, duration: 500 }}>
						<div class="mouse">
							<div class="wheel"></div>
						</div>
						<div class="scroll-text">Scroll down</div>
					</div>
				{/if}
			</div>
			<div class="hero-graphic">
				{#if visible}
					<div class="fireball-container">
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
	</div>
</div>

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
						<h3>Fast Performance</h3>
						<p>
							I build websites that load quickly and run smoothly, ensuring a great user experience
							regardless of device or connection speed.
						</p>
					</div>

					<div
						class="feature-card"
						transition:fly={{ y: 30, duration: 800, delay: 200, easing: quintOut }}
					>
						<div class="feature-icon">📱</div>
						<h3>Responsive Design</h3>
						<p>
							My designs adapt seamlessly to any screen size, providing a consistent experience
							across desktops, tablets, and mobile devices.
						</p>
					</div>

					<div
						class="feature-card"
						transition:fly={{ y: 30, duration: 800, delay: 300, easing: quintOut }}
					>
						<div class="feature-icon">🎨</div>
						<h3>Creative UI/UX</h3>
						<p>
							I create visually appealing interfaces with intuitive navigation and smooth
							interactions that engage users and drive conversions.
						</p>
					</div>

					<div
						class="feature-card"
						transition:fly={{ y: 30, duration: 800, delay: 400, easing: quintOut }}
					>
						<div class="feature-icon">🔍</div>
						<h3>SEO Optimization</h3>
						<p>
							I implement best practices to ensure your website ranks well in search engines and
							attracts organic traffic.
						</p>
					</div>
				{/if}
			</div>
		</div>

		<!-- Floating skills cloud replacing sphere -->
		<div class="skills-cloud-container" bind:this={skillsContainer}>
			{#if visibleFeatures}
				<div class="skills-cloud">
					{#each skillPositions as position, i}
						<div
							class="skill-tag"
							style="transform: translate3d({position.x}px, {position.y}px, {position.z}px);"
							transition:scale={{
								delay: 500 + i * 50,
								duration: 800,
								easing: elasticOut
							}}
						>
							<a href={`#${position.skill.toLowerCase()}`}>{position.skill}</a>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</section>

<!-- Stats Section -->
<section class="stats-section section">
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
</section>

<style>
	/* Add missing parallax styles */
	.parallax-container {
		position: relative;
		width: 100%;
		height: 100vh;
		overflow: hidden;
	}

	.parallax-layer {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.background-layer {
		background: linear-gradient(135deg, var(--background) 0%, #1a1a1a 100%);
		z-index: 1;
	}

	/* Hero styles */
	#hero {
		min-height: 100vh;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		overflow: hidden;
		/* Add responsive padding for very small screens */
		padding-top: 80px;
	}

	/* Specific fix for very small screens like 360x740 */
	@media screen and (max-width: 400px) and (max-height: 800px) {
		#hero {
			min-height: 90vh;
			padding-top: 60px;
		}
	}

	.content-layer {
		z-index: 3;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		transition: transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
	}

	/* Reduce bottom padding on very small screens */
	@media screen and (max-width: 400px) and (max-height: 800px) {
		.content-layer {
			min-height: 900px;
		}
	}

	/* Tablet breakpoints - add padding-top to push content down */
	@media screen and (min-width: 768px) and (max-width: 920px) {
		.content-layer {
			padding-top: 160px; /* Push content down for small tablet */
		}
	}

	@media screen and (min-width: 921px) and (max-width: 1023px) {
		.content-layer {
			padding-top: 140px; /* Push content down for medium tablet */
		}
	}

	.hero-content {
		max-width: 1200px;
		width: 90%;
		margin: 0 auto;
		gap: 32px;
		/* Mobile-first approach - default to column layout */
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	/* Reduce gap on very small screens */
	@media screen and (max-width: 400px) {
		.hero-content {
			gap: 30px; /* Increased from 20px to add more vertical space */
			width: 95%;
		}

		.description {
			/* Add this rule */
			font-size: calc(var(--p) * 0.9); /* Make it 90% of the base paragraph size */
			margin-bottom: 24px; /* Optionally reduce margin a bit */
		}
	}

	/* Use media query for desktop layout instead of JavaScript conditional */
	@media screen and (min-width: 1024px) {
		.hero-content {
			flex-direction: row;
			align-items: flex-start;
			justify-content: center;
			gap: 48px;
		}
	}

	.hero-text {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		flex: 1 1 0;
		min-width: 0;
	}

	/* Center align text content on tablets for better balance */
	@media screen and (min-width: 768px) and (max-width: 1023px) {
		.hero-text {
			align-items: center;
			text-align: center;
			margin-bottom: 20px;
		}

		.hero-text .description {
			text-align: center;
		}

		.hero-text .cta-buttons {
			align-self: center;
		}
	}

	.hero-graphic {
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 260px;
		width: 28vw;
	}

	/* Responsive sizing for very small screens */
	@media screen and (max-width: 400px) {
		.hero-graphic {
			min-width: 180px;
			width: 45vw;
			max-width: 200px;
		}
	}

	/* Add new fireball container wrapper */
	.fireball-container {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		max-width: 380px;
		max-height: 380px;
	}

	/* Responsive sizing for fireball container */
	@media screen and (max-width: 400px) {
		.fireball-container {
			max-width: 180px;
			max-height: 180px;
		}
	}

	@media screen and (min-width: 401px) and (max-width: 767px) {
		.fireball-container {
			max-width: 220px;
			max-height: 220px;
		}
	}

	/* Add responsive typography classes based on CSS variables */
	.name,
	.tagline {
		font-size: var(--h1);
		line-height: 1.2;
	}

	.typed-text {
		font-size: var(--small);
	}

	.description {
		font-size: var(--p);
	}

	@media screen and (max-width: 767.98px) {
		.name,
		.tagline {
			line-height: 1.1;
		}
	}

	/* Use CSS media queries for responsive button layout too */
	.cta-buttons {
		display: flex;
		width: 100%;
		max-width: 764px;
		align-self: flex-start;
		/* Default to row layout until very small screens */
		flex-direction: row;
		gap: 16px;
	}

	/* Only stack buttons on very small mobile screens */
	@media screen and (max-width: 375px) {
		.cta-buttons {
			flex-direction: column;
			gap: 16px;
		}
	}

	/* Adjust button sizes for different screen sizes */
	@media screen and (min-width: 376px) and (max-width: 767px) {
		.cta-buttons {
			gap: 12px; /* Smaller gap on mobile */
		}

		.button-primary,
		.button-secondary {
			padding: 12px 16px; /* Smaller padding on mobile */
			font-size: 14px; /* Smaller font on mobile */
		}
	}

	.button-primary,
	.button-secondary {
		position: relative;
		border-radius: 0.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 16px 28px;
		text-decoration: none;
		font-family: 'Nunito Sans', sans-serif;
		font-size: 16px;
		font-weight: 500;
		flex: 1;
		color: var(--color-text-light);
		max-width: 370px;
		transition:
			transform 0.3s ease,
			padding 0.3s ease,
			background 0.3s ease;
	}

	/* Responsive adjustments for buttons */
	@media screen and (max-width: 480px) {
		.button-primary,
		.button-secondary {
			padding: 14px 20px;
			font-size: 15px;
		}
	}

	@media screen and (max-width: 375px) {
		.button-primary,
		.button-secondary {
			padding: 12px 16px;
			font-size: 14px;
			max-width: 100%;
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
	}

	.button-primary::before,
	.button-primary::after,
	.button-secondary::before,
	.button-secondary::after {
		content: '';
		position: absolute;
		inset: -0.16rem;
		z-index: -1;
		border-radius: inherit;
		animation: rotation 5s linear infinite;
		opacity: 0;
		transition:
			opacity 0.3s ease,
			transform 0.3s ease;
	}

	.button-primary::before,
	.button-primary::after {
		background: conic-gradient(
			from var(--gradient-angle),
			var(--gruv-darkorange),
			var(--gruv-yellow),
			var(--gruv-orange),
			var(--gruv-yellow),
			var(--gruv-darkorange)
		);
	}

	.button-secondary::before,
	.button-secondary::after {
		background: conic-gradient(
			from var(--gradient-angle),
			var(--gruv-darkblue),
			var(--gruv-yellow),
			var(--gruv-blue),
			var(--gruv-yellow),
			var(--gruv-darkblue)
		);
	}

	.button-primary::after,
	.button-secondary::after {
		transform: translateY(-5px);
		filter: blur(2rem);
	}

	.button-primary:hover::before,
	.button-primary:hover::after,
	.button-secondary:hover::before,
	.button-secondary:hover::after {
		opacity: 1;
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
		position: absolute;
		bottom: 5px;
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
		padding: 100px 0;
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
		margin-bottom: 60px;
	}

	.section-header h2 {
		font-family: 'Kilimanjaro Sans Round1', 'Nunito Sans', sans-serif;
		font-size: 48px;
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
		font-size: 18px;
		color: var(--description);
		line-height: 1.6;
	}

	.features-content {
		display: grid;
		grid-template-columns: 1fr;
		gap: 40px;
		align-items: center;
	}

	.feature-cards-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 30px;
		margin: 0 auto;
	}

	.feature-card {
		background: #333333;
		border-radius: 10px;
		padding: 30px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}

	.feature-card:hover {
		transform: translateY(-10px);
		box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
	}

	.feature-icon {
		font-size: 36px;
		margin-bottom: 16px;
	}

	.feature-card h3 {
		font-family: 'Nunito Sans', sans-serif;
		font-size: 20px;
		color: var(--accent);
		margin: 0 0 16px 0;
	}

	.feature-card p {
		font-family: 'Nunito Sans', sans-serif;
		font-size: 16px;
		line-height: 1.6;
		color: var(--description);
		margin: 0;
	}

	/* Skills cloud - new horizontal floating style */
	.skills-cloud-container {
		width: 100%;
		height: 400px;
		margin: 60px 0;
		position: relative;
		perspective: 1000px;
		overflow: hidden;
		border: 1px solid rgba(69, 133, 136, 0.2); /* Subtle border to show container */
		border-radius: 10px;
	}

	/* Adjust height for different screen sizes */
	@media screen and (max-width: 1024px) {
		.skills-cloud-container {
			height: 350px;
		}
	}

	@media screen and (max-width: 768px) {
		.skills-cloud-container {
			height: 300px;
		}
	}

	@media screen and (max-width: 480px) {
		.skills-cloud-container {
			height: 250px;
		}
	}

	/* When screen width is 920px or less, switch to 4x4 grid layout */
	@media screen and (max-width: 920px) {
		.skills-cloud-container {
			perspective: none;
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			grid-template-rows: repeat(4, 1fr);
			gap: 10px;
			height: auto;
			padding: 20px;
		}

		.skills-cloud {
			position: static;
			width: 100%;
			height: auto;
			transform: none;
			display: contents; /* Let children participate in the grid layout */
		}

		.skill-tag {
			position: static;
			transform: none !important; /* Override any JavaScript transform */
			backface-visibility: visible;
			display: flex;
			justify-content: center;
			will-change: auto;
		}

		.skill-tag a {
			width: 100%;
			text-align: center;
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
		backface-visibility: visible;
		cursor: pointer;
		will-change: transform;
	}

	.skill-tag a {
		font-family: 'Nunito Sans', sans-serif;
		font-size: 16px;
		color: var(--color-text);
		background: rgba(69, 133, 136, 0.2);
		border: 1px solid var(--primary);
		padding: 8px 14px;
		border-radius: 20px;
		white-space: nowrap;
		text-decoration: none;
		display: block;
		transition:
			background-color 0.3s ease,
			color 0.3s ease,
			transform 0.3s ease;
	}

	.skill-tag:hover a {
		background: var(--primary);
		transform: scale(1.1);
		z-index: 10;
	}

	/* Stats section */
	.stats-section {
		padding: 80px 0;
		background: linear-gradient(to bottom, #282828, #303030);
		position: relative;
		z-index: 10;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 30px;
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

	.stat-icon.component-icon {
		color: var(--accent);
	}

	.stat-icon.emoji-icon {
		font-size: 40px;
	}

	/* Hover effects for different icon types */
	.stat-card:hover .stat-icon.component-icon {
		color: var(--secondary);
		transform: scale(1.1);
		transition: all 0.3s ease;
	}

	.stat-card:hover .stat-icon.emoji-icon {
		transform: scale(1.1);
		transition: all 0.3s ease;
	}

	.stat-value {
		font-family: 'Kilimanjaro Sans Round1', 'Nunito Sans', sans-serif;
		font-size: 48px;
		font-weight: 700;
		color: var(--accent);
		margin-bottom: 8px;
		background: linear-gradient(333deg, var(--gruv-darkorange), var(--gruv-orange), var(--accent));
		background-size: 140% 140%;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.stat-label {
		font-family: 'Nunito Sans', sans-serif;
		font-size: 16px;
		color: var(--description);
	}

	.fireball-glow-effect.fireball-glow-hovering {
		opacity: 0.6;
		transform: translate(-64px, 64px) scale(1.1);
		animation: none;
	}

	.hero-graphic img.fireball-logo {
		width: 100%;
		height: auto;
		max-width: 380px;
		max-height: 380px;
		display: block;
		filter: drop-shadow(0 4px 24px rgba(255, 140, 0, 0.25));
		transition: filter 0.2s;
		position: relative;
		z-index: 2;
	}

	.fireball-glow-container {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
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
		/* Responsive positioning - center the glow by default */
		transform: translate(-50%, -50%) scale(1);
		top: 50%;
		left: 50%;
		transition:
			opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1),
			transform 1s cubic-bezier(0.4, 0, 0.2, 1);
	}

	@keyframes fireballEntranceGlow {
		0% {
			opacity: 0.8;
			transform: translate(-50%, -50%) scale(0.8);
		}
		20% {
			opacity: 1;
			transform: translate(-50%, -50%) scale(1.1);
		}
		70% {
			opacity: 0.8;
			transform: translate(-50%, -50%) scale(1);
		}
		100% {
			opacity: 0.5;
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
		margin: 0 0 8px 0;
		background: linear-gradient(135deg, #ff7a30 0%, var(--secondary) 50%, var(--gruv-red) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.typed-text {
		width: 100%;
		font-family: 'Nunito Sans', sans-serif;
		font-style: italic;
		font-weight: 300;
		line-height: 1.4;
		margin: 0 0 18px 0;
		min-height: 34px;
		color: var(--description);
		position: relative;
	}

	.description {
		font-family: 'Nunito Sans', sans-serif;
		color: var(--description);
		line-height: 1.6;
		margin-bottom: 36px;
		max-width: 764px;
	}

	/* For rotating gradient */
	@property --gradient-angle {
		syntax: '<angle>';
		initial-value: 0deg;
		inherits: false;
	}
</style>
