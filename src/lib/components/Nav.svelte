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
			src="https://g15vtr55yw.ufs.sh/f/Bh1ffWkP18dQHbjjBhqR7awMfsCYr2uXx0SpVlZiUg6dJzcF"
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
			<li><a href="/blog" onclick={handleLinkClick}>Blog</a></li>
			<li><a href="/contact" onclick={handleLinkClick}>Contact</a></li>
			<li class="resume-link">
				<a
					href="https://g15vtr55yw.ufs.sh/f/Bh1ffWkP18dQ9jq8INEAMI4PXa63rRpkOGoC0QejZcUx5gDB"
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
		/* Ensure items never overflow */
		min-width: 0;
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
		/* Allow logo to overflow for flame effect */
		overflow: visible;
	}

	/* Container for the navigation links */
	.nav-container {
		height: 100%;
	}

	/* Navigation links - RAM PATTERN RESPONSIVE TEXT! */
	.nav-links {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 0;
		/* Dynamic gap that shrinks on smaller screens */
		gap: clamp(16px, 5vw, 39px);
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
		/* Dynamic font size that never breaks layout */
		font-size: clamp(14px, 4vw, 19.25px);
		line-height: 130%;
		color: var(--color-text);
		text-decoration: none;
		transition: color 0.2s ease;
		position: relative;
		/* Prevent text from wrapping */
		white-space: nowrap;
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

	/* Resume button special styling - RAM PATTERN SCALING! */
	.resume-link a {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		/* Dynamic padding that scales with viewport */
		padding: clamp(6px, 2vw, 10px) clamp(12px, 4vw, 24px);
		gap: 10px;
		/* Dynamic width that never breaks */
		width: clamp(80px, 20vw, 103px);
		height: clamp(36px, 8vw, 44px);
		border: 1.5px solid var(--primary);
		border-radius: 9px;
		/* Dynamic font size */
		font-size: clamp(12px, 3vw, 15px);
		line-height: 160%;
		transition:
			background-color 0.3s ease,
			color 0.3s ease,
			border-color 0.3s ease;
		white-space: nowrap;
	}

	.resume-link a:hover {
		background-color: var(--primary);
		color: var(--color-text);
	}

	.resume-link a::after {
		display: none;
	}

	/* Mobile menu toggle - Only shows when absolutely necessary */
	.menu-toggle {
		display: none;
		background: none;
		border: none;
		cursor: pointer;
		/* Fixed sizing - no clamp on hamburger menu */
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

	/* TEAM RAMROD - Container queries for navigation responsiveness */
	.main-nav {
		/* Enable container queries for the nav */
		container-type: inline-size;
		container-name: navigation;
	}

	/* Enhanced responsive styles using container queries and ranges */
	@container navigation (width <= 600px) {
		.nav-container {
			position: fixed;
			top: 0;
			right: 0;
			width: 100%;
			height: 100vh;
			background-color: rgba(40, 40, 40, 0.95);
			transform: translateX(100%);
			transition: none;
			z-index: 90;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			padding: 2rem;
		}

		@container navigation (width <= 600px) {
			.nav-container.active {
				transform: translateX(0);
				transition: transform 0.3s ease;
			}

			.nav-links {
				flex-direction: column;
				gap: 2rem;
				align-items: center;
				height: auto;
			}

			.nav-links a {
				/* Larger text in mobile menu */
				font-size: clamp(20px, 5vw, 24px);
			}

			.resume-link a {
				width: auto;
				padding: 12px 28px;
				font-size: clamp(18px, 4vw, 20px);
			}

			.menu-toggle {
				display: block;
			}
		}

		/* Extra small screens - even tighter constraints using container queries */
		@container navigation (width <= 400px) {
			.nav-links a {
				/* More aggressive scaling for tiny screens */
				font-size: clamp(12px, 3.5vw, 16px);
			}

			.resume-link a {
				/* Smaller resume button on tiny screens */
				font-size: clamp(10px, 3vw, 14px);
				padding: clamp(4px, 1.5vw, 8px) clamp(8px, 3vw, 16px);
			}
		}
	}
</style>
