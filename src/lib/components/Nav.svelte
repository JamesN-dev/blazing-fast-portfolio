<script>
  let isMenuOpen = $state(false);
  
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
</script>

<nav class="main-nav" aria-label="Main Navigation">
  <a href="/" class="header-logo" aria-label="blazingfast.app">
    <img
      src="/images/fireball-logo.svg"
      alt="blazingfast.app fireball logo"
      width="120"
      height="auto"
    />
  </a>
  <button
    class="menu-toggle"
    aria-label="Toggle menu"
    aria-expanded={isMenuOpen}
    onclick={toggleMenu}
  >
    <span></span>
    <span></span>
    <span></span>
  </button>
  <ul class="nav-links" aria-label="Navigation Links">
    <li><a href="/about">About</a></li>
    <li><a href="/experience">Experience</a></li>
    <li><a href="/work">Work</a></li>
    <li><a href="/contact">Contact</a></li>
    <li><a href="/resume.pdf" download aria-label="Résumé">Résumé</a></li>
  </ul>
</nav>

<style>
  .main-nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    isolation: isolate;
    height: 100%;
  }

  /* Logo styling */
  .header-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 67px;
    height: 60px;
    flex: none;
    order: 0;
    flex-grow: 0;
    z-index: 1;
  }

  /* Navigation links */
  .nav-links {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 39px;
    height: 26px;
  }

  .nav-links li {
    flex: none;
  }

  .nav-links a {
    font-family: 'Nunito Sans', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 19.25px;
    line-height: 130%;
    color: #fff4db;
    text-decoration: none;
  }

  /* Resume button special styling */
  .nav-links li:last-child a {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 24px;
    gap: 10px;
    width: 103px;
    height: 44px;
    border: 1.5px solid #458588;
    border-radius: 9px;
    font-size: 15px;
    line-height: 160%;
  }

  .nav-links li::marker {
    content: none;
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
    z-index: 10;
  }

  .menu-toggle span {
    display: block;
    width: 100%;
    height: 3px;
    background-color: var(--text);
    margin-bottom: 5px;
    transition:
      transform var(--transition-normal),
      opacity var(--transition-normal);
  }
  
  /* Responsive styles */
  @media (max-width: 768px) {
    .nav-links {
      position: fixed;
      top: 0;
      right: 0;
      transform: translateX(100%);
      width: 70%;
      height: 100vh;
      background-color: white;
      flex-direction: column;
      padding: var(--space-16) var(--space-6);
      gap: var(--space-4);
      transition: transform var(--transition-normal);
      box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
      z-index: 5;
    }

    .nav-links:global(.active) {
      transform: translateX(0);
    }

    .menu-toggle {
      display: block;
    }

    /* Transform hamburger to X when menu is open */
    .menu-toggle:global(.active) span:nth-child(1) {
      transform: translateY(8px) rotate(45deg);
    }

    .menu-toggle:global(.active) span:nth-child(2) {
      opacity: 0;
    }

    .menu-toggle:global(.active) span:nth-child(3) {
      transform: translateY(-8px) rotate(-45deg);
    }
    
    .nav-links li::marker {
      content: none;
    }
  }
</style>