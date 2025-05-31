<script>
	import { onMount } from 'svelte';

	let isMenuOpen = $state(false);
	let scrollY = $state(0);
	let isScrolled = $derived(scrollY > 20);

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;

		// Prevent body scrolling when menu is open
		if (isMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}

	// Close menu when clicking on a link
	function handleLinkClick() {
		if (isMenuOpen) {
			isMenuOpen = false;
			document.body.style.overflow = '';
		}
	}

	onMount(() => {
		const handleScroll = () => {
			scrollY = window.scrollY;
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<nav class="main-nav" aria-label="Main Navigation">
	<a href="/" class="header-logo" aria-label="blazingfast.app">
		<img
			src="/images/fireball-logo.png"
			alt="blazingfast.app fireball logo"
			width="130"
			height="auto"
		/>
	</a>

	<button
		class="menu-toggle"
		class:active={isMenuOpen}
		aria-label="Toggle menu"
		aria-expanded={isMenuOpen}
		onclick={toggleMenu}
	>
		<span></span>
		<span></span>
		<span></span>
	</button>

	<div class="nav-container" class:active={isMenuOpen}>
		<ul class="nav-links" aria-label="Navigation Links">
			<li><a href="/about" onclick={handleLinkClick}>About</a></li>
			<li><a href="/experience" onclick={handleLinkClick}>Experience</a></li>
			<li><a href="/work" onclick={handleLinkClick}>Work</a></li>
			<li><a href="/contact" onclick={handleLinkClick}>Contact</a></li>
			<li class="resume-link">
				<a
					href="/JamesNiemerg-Resume.pdf"
					onclick={handleLinkClick}
					aria-label="Download Resume"
					target="_blank"
					rel="noopener noreferrer"
				>
					Resume
				</a>
			</li>
		</ul>
	</div>
</nav>

<style>
	.main-nav {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		isolation: isolate;
		height: 100%;
		width: 100%;
		transition:
			background-color 0.3s ease,
			box-shadow 0.3s ease;
	}

	/* Logo styling */
	.header-logo {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100px;
		height: 100px;
		z-index: 100;
		-webkit-filter: drop-shadow(5px 5px 5px var(--gruv-blown));
		filter: drop-shadow(5px 5px 5px var(--gruv-blown));
	}

	/* Container for the navigation links */
	.nav-container {
		height: 100%;
	}

	/* Navigation links */
	.nav-links {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 0;
		gap: 39px;
		height: 100%;
		margin: 0;
		list-style: none;
	}

	.nav-links li {
		flex: none;
	}

	.nav-links a {
		font-family: 'Nunito Sans', sans-serif;
		font-weight: 400;
		font-size: 19.25px;
		line-height: 130%;
		color: var(--color-text);
		text-decoration: none;
		transition: color 0.2s ease;
		position: relative;
	}

	.nav-links a::after {
		content: '';
		position: absolute;
		bottom: -5px;
		left: 0;
		width: 0;
		height: 2px;
		background: linear-gradient(90deg, var(--gruv-orange), var(--accent));
		border-radius: 1px;
		transition: width 0.3s ease;
	}

	.nav-links a:hover::after {
		width: 100%;
	}

	/* Resume button special styling */
	.resume-link a {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 10px 24px;
		gap: 10px;
		width: 103px;
		height: 44px;
		border: 1.5px solid var(--primary);
		border-radius: 9px;
		font-size: 15px;
		line-height: 160%;
		transition:
			background-color 0.3s ease,
			color 0.3s ease,
			border-color 0.3s ease;
	}

	.resume-link a:hover {
		background-color: var(--primary);
		color: var(--color-text);
	}

	.resume-link a::after {
		display: none;
	}

	/* Mobile menu toggle */
	.menu-toggle {
		display: none;
		background: none;
		border: none;
		cursor: pointer;
		width: 30px;
		height: 24px;
		position: relative;
		z-index: 100;
	}

	.menu-toggle span {
		display: block;
		width: 100%;
		height: 3px;
		background-color: var(--color-text);
		margin-bottom: 5px;
		transition:
			transform 0.3s ease,
			opacity 0.3s ease;
	}

	/* Transform hamburger to X when menu is open */
	.menu-toggle.active span:nth-child(1) {
		transform: translateY(8px) rotate(45deg);
	}

	.menu-toggle.active span:nth-child(2) {
		opacity: 0;
	}

	.menu-toggle.active span:nth-child(3) {
		transform: translateY(-8px) rotate(-45deg);
	}

	/* Responsive styles */
	@media (max-width: 768px) {
		.nav-container {
			position: fixed;
			top: 0;
			right: 0;
			width: 100%;
			height: 100vh;
			background-color: rgba(40, 40, 40, 0.95);
			transform: translateX(100%);
			transition: transform 0.3s ease;
			z-index: 90;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			padding: 2rem;
		}

		.nav-container.active {
			transform: translateX(0);
		}

		.nav-links {
			flex-direction: column;
			gap: 2rem;
			align-items: center;
			height: auto;
		}

		.nav-links a {
			font-size: 24px;
		}

		.resume-link a {
			width: auto;
			padding: 12px 28px;
			font-size: 20px;
		}

		.menu-toggle {
			display: block;
		}
	}
</style>
