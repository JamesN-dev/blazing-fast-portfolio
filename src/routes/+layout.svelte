<script>
    import '../lib/styles/global.css';
	let { children } = $props();
    
    let isMenuOpen = $state(false);
    
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
    }
</script>

<div class="site-wrapper">
    <header class="site-header">
        <div class="container">
            <nav class="main-nav" aria-label="Main Navigation">
                <a href="/" class="header-logo" aria-label="blazingfast.app">
                    <img src="/images/fireball-logo.svg" alt="blazingfast.app fireball logo" width="120" height="auto" />
                </a>
                <button class="menu-toggle" aria-label="Toggle menu"
                    aria-expanded={isMenuOpen} onclick={toggleMenu}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <ul class="nav-links" aria-label="Navigation Links">
                    <li><a href="/about">//About</a></li>
                    <li><a href="/experience">//Experience</a></li>
                    <li><a href="/work">//Work</a></li>
                    <li><a href="/contact">//Contact</a></li>
                    <li><a href="/resume.pdf" download aria-label="Résumé">Résumé</a></li>
                </ul>
            </nav>
        </div>
    </header>
    <main>
        {@render children()}
    </main>

    <footer class="site-footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-branding">
                    <a href="/" class="footer-logo-link" aria-label="blazingfast.app">
                        <svg width="67" height="60" viewBox="0 0 67 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0H67V60H0V0Z" fill="#458588"/>
                            <path d="M50.6964 28.4884C53.3314 28.4884 55.4286 29.3488 56.9881 31.0696C58.5745 32.7635 59.3677 35.1028 59.3677 38.0873V51.2353H52.5113V39.0149C52.5113 37.5092 52.1215 36.3396 51.3417 35.5061C50.562 34.6725 49.5134 34.2558 48.1959 34.2558C46.8784 34.2558 45.8298 34.6725 45.05 35.5061C44.2703 36.3396 43.8804 37.5092 43.8804 39.0149V51.2353H36.9838V28.7304H43.8804V31.7149C44.5795 30.7201 45.5206 29.9403 46.7036 29.3757C47.8867 28.7842 49.2176 28.4884 50.6964 28.4884Z" fill="#FFF4DB"/>
                            <path d="M31.413 22.9227V42.2011C31.413 45.1856 30.566 47.4845 28.8721 49.0978C27.2051 50.711 24.9465 51.5177 22.0965 51.5177C19.1119 51.5177 16.7189 50.6707 14.9175 48.9768C13.116 47.2829 12.2153 44.8764 12.2153 41.7575H19.0716C19.0716 42.9405 19.3136 43.8413 19.7976 44.4597C20.2815 45.0512 20.9806 45.347 21.8948 45.347C22.7283 45.347 23.3736 45.0781 23.8307 44.5403C24.2878 44.0026 24.5163 43.2229 24.5163 42.2011V22.9227H31.413Z" fill="#FFF4DB"/>
                            </svg>
                    </a>
                    <p class="footer-tagline">Building high performance web experiences</p>
                </div>

                <div class="footer-links">
                    <h3>Quick Links</h3>
                    <ul aria-label="Footer Links">
                        <li><a href="/about">About</a></li>
                        <li><a href="/experience">Experience</a></li>
                        <li><a href="/work">Work</a></li>
                        <li><a href="/contact">Contact</a></li>
                        <li><a href="/resume.pdf" download aria-label="Résumé">Résumé</a></li>
                    </ul>
                </div>
                <div class="footer-contact">
                    <h3>Contact</h3>
                    <ul aria-label="Footer Contact">
                        <li><a href="https://github.com/Jamesn-dev" aria-label="JamesN on GitHub" target="_blank" rel="noopener noreferrer">
                                <svg width="250" height="250" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)" fill="#1B1F23"/>
                                </svg>
                            <span>GitHub</span></a>
                        </li>
                        <li><a href="mailto:atetraxx@gmail.com" aria-label="Email atetraxx@gmail.com"><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/>
                          </svg>
                            <span>atetraxx@gmail.com</span></a>
                        </li>
                        <li><a href="https://linkedin.com/in/james-niemerg" aria-label="JamesN on LinkedIn" target="_blank" rel="noopener noreferrer"><svg width="256" height="256" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 256"><path d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453" fill="#0A66C2"/></svg>
                            <span>LinkedIn</span></a>
                        </li>
                    </ul>
                </div>
                <div class="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} blazingfast.app. All rights reserved.</p>
                </div>
            </div>
        </div>
    </footer>
</div>

<style>
    .site-wrapper {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    main {
        flex: 1;
    }

/* Site header (navbar) */
.site-header {
    position: absolute;
    height: 86px;
    left: 0px;
    right: 0px;
    top: 0px;
    background: #A13B1E; /* gruv-darkorange */
    padding: 0;
    border-bottom: none;
}

.container {
    padding: 13px 29px;
}

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
    color: #FFF4DB;
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
    transition: transform var(--transition-normal), opacity var(--transition-normal);
}

/* Footer styles */
.site-footer {
    background-color: var(--gruv-blown);
    color: var(--gruv-white);
    padding: var(--space-8) 0 var(--space-4);
}

.footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--space-8);
}

.footer-branding p {
    margin-top: var(--space-2);
    color: var(--gruv-darkwhite);
}

.footer-tagline {
    color: var(--gruv-darkwhite);
    margin-top: var(--space-2);
}

.footer-links h3,
.footer-contact h3 {
    font-size: var(--p);
    margin-bottom: var(--space-4);
}

.footer-links ul,
.footer-contact ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.footer-links li,
.footer-contact li {
    margin-bottom: var(--space-2);
}

.footer-links a,
.footer-contact a {
    color: var(--gruv-darkwhite);
    text-decoration: none;
    transition: color var(--transition-fast);
    display: flex;
    align-items: center;
    gap: var(--space-2);
}

.footer-links a:hover,
.footer-contact a:hover {
    color: var(--gruv-white);
}

.footer-contact a svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
}

.footer-bottom {
    grid-column: 1 / -1;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: var(--space-4);
    text-align: center;
    font-size: var(--small);
    color: var(--gruv-darkwhite);
    margin-top: var(--space-8);
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
}



</style>