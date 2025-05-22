<script>
  import { onMount } from 'svelte';
  import { fade, fly, scale } from 'svelte/transition';
  import { quintOut, elasticOut } from 'svelte/easing';
  import TypedText from '$lib/components/TypedText.svelte';
  
  let visible = $state(false);
  let visibleFeatures = $state(false);
  let visibleStats = $state(false);
  let mousePosX = $state(0);
  let mousePosY = $state(0);
  let scrollY = $state(0);
  let skillsContainer;
  let skillsAnimationFrame;
  
  // Function to handle parallax effect
  function handleMouseMove(e) {
    // Get mouse position relative to viewport center
    mousePosX = (e.clientX / window.innerWidth - 0.5) * 2;
    mousePosY = (e.clientY / window.innerHeight - 0.5) * 2;
  }
  
  // Skills for floating cloud, not a sphere anymore
  const skills = [
    'SvelteKit', 'JavaScript', 'CSS3', 'HTML5', 'TailwindCSS', 'Django',
    'PostgresSQL', 'UI/UX', 'Design', 'Figma', 'API Integration',
    'Performance', 'Animation', 'Responsive', 'Accessibility'
  ];
  
  // Random positions in a more horizontal layout
  const skillPositions = skills.map((skill, index) => {
    return {
      x: -300 + Math.random() * 600, // Horizontal spread
      y: -50 + Math.random() * 100,  // Less vertical spread
      z: -150 + Math.random() * 300, // Some depth
      skill: skill,
      // Random but gentle movement
      speedX: (Math.random() - 0.5) * 0.5,  // Increased speed
      speedY: (Math.random() - 0.5) * 0.3,  // Increased speed
      speedZ: (Math.random() - 0.5) * 0.4,  // Increased speed
      phase: Math.random() * Math.PI * 2 // Random starting phase
    };
  });
  
  // Stats data
  const stats = [
    { value: '98', label: 'Performance Score', icon: '⚡️' },
    { value: '100%', label: 'Client Satisfaction', icon: '👍' },
    { value: '50+', label: 'Projects Completed', icon: '🚀' },
    { value: '5+', label: 'Years Experience', icon: '⏱️' }
  ];
  
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
          skillElements[i].style.transform = `translate3d(${position.x}px, ${position.y}px, ${position.z}px)`;
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
  
  // Handle mouse interaction with skills
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
        const force = Math.max(0, 1 - (distance / 100)) * 10;
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
    }, 100);
    
    // Intersection observers for feature and stats sections
    const featuresObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          visibleFeatures = true;
          featuresObserver.disconnect();
          
          // Start skills animation when features section becomes visible
          setTimeout(startSkillsAnimation, 1000);
        }
      });
    }, { threshold: 0.2 });
    
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          visibleStats = true;
          statsObserver.disconnect();
        }
      });
    }, { threshold: 0.2 });
    
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
  
  <div class="parallax-layer background-layer" style="transform: translate({mousePosX * -20}px, {mousePosY * -20}px);"></div>
  
  <div class="parallax-layer content-layer" style="transform: translate({mousePosX * 10}px, {mousePosY * 10}px);">
    <div class="hero-content">
      {#if visible}
        <h1 class="intro-text" transition:fade={{ delay: 100, duration: 500 }}>Hi, my name is</h1>
        <h1 class="name" transition:fly={{ delay: 300, duration: 800, x: -50, y: 0 }}>James Niemerg.</h1>
        <h1 class="tagline" transition:fly={{ delay: 500, duration: 800, x: -50, y: 0 }}>Blazing Fast Design.</h1>
        
        <div class="typed-text" transition:fade={{ delay: 700, duration: 500 }}>
          <TypedText 
            strings={[
              'Marketing Professional', 
              'Web Developer',
              'UI/UX Designer',
              'Performance Enthusiast'
            ]} 
            typeSpeed={60}
            backSpeed={30}
            backDelay={1500}
            startDelay={500}
            loop={true}
          />
        </div>
        
        <p class="description" transition:fade={{ delay: 800, duration: 800 }}>
          I am a marketing professional, developer, and visual designer specializing in web
          development. I like to build blazing fast and responsive user experiences on the web.
        </p>
      {/if}
      
      {#if visible}
        <div class="cta-buttons" transition:fly={{ delay: 1000, duration: 800, y: 20, x: 0 }}>
          <a href="/about" class="button-primary">
            <span>Follow Me</span>
            <div class="button-glow"></div>
          </a>
          <a href="/contact" class="button-secondary">
            <span>Let's Collaborate!</span>
            <div class="button-glow"></div>
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
  </div>
</div>

<!-- Features Section -->
<section class="features-section">
  <div class="container">
    <div class="section-header">
      <h2>What I Do</h2>
      <div class="underline"></div>
      <p class="section-intro">I create blazing fast websites and applications that deliver exceptional user experiences.</p>
    </div>
    
    <div class="features-content">
      <div class="features-cards">
        {#if visibleFeatures}
          <div class="feature-card" transition:fly={{ y: 30, duration: 800, delay: 100, easing: quintOut }}>
            <div class="feature-icon">⚡️</div>
            <h3>Fast Performance</h3>
            <p>I build websites that load quickly and run smoothly, ensuring a great user experience regardless of device or connection speed.</p>
          </div>
          
          <div class="feature-card" transition:fly={{ y: 30, duration: 800, delay: 200, easing: quintOut }}>
            <div class="feature-icon">📱</div>
            <h3>Responsive Design</h3>
            <p>My designs adapt seamlessly to any screen size, providing a consistent experience across desktops, tablets, and mobile devices.</p>
          </div>
          
          <div class="feature-card" transition:fly={{ y: 30, duration: 800, delay: 300, easing: quintOut }}>
            <div class="feature-icon">🎨</div>
            <h3>Creative UI/UX</h3>
            <p>I create visually appealing interfaces with intuitive navigation and smooth interactions that engage users and drive conversions.</p>
          </div>
          
          <div class="feature-card" transition:fly={{ y: 30, duration: 800, delay: 400, easing: quintOut }}>
            <div class="feature-icon">🔍</div>
            <h3>SEO Optimization</h3>
            <p>I implement best practices to ensure your website ranks well in search engines and attracts organic traffic.</p>
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
                delay: 500 + (i * 50),
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
<section class="stats-section">
  <div class="container">
    <div class="stats-grid">
      {#if visibleStats}
        {#each stats as stat, i}
          <div class="stat-card" transition:scale={{ delay: i * 100, duration: 800, easing: elasticOut }}>
            <div class="stat-icon">{stat.icon}</div>
            <div class="stat-value">{stat.value}</div>
            <div class="stat-label">{stat.label}</div>
          </div>
        {/each}
      {/if}
    </div>
  </div>
</section>

<style>
  /* Hero styles */
  #hero {
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    position: relative;
    overflow: hidden;
    padding-top: 86px; /* Account for header height */
  }
  
  .content-layer {
    z-index: 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  
  .hero-content {
    max-width: 1200px;
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 0;
    margin: 0 auto;
  }

  .intro-text {
    font-family: 'Kilimanjaro Sans Round1', 'Nunito Sans', sans-serif;
    font-size: var(--h6);
    color: var(--gruv-yellow);
    margin: 0;
    font-weight: 400;
    opacity: 0.9;
  }

  .name {
    width: 100%;
    font-family: 'Kilimanjaro Sans Round1', 'Nunito Sans', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 80px;
    line-height: 1.25;
    margin: 0;
    background: linear-gradient(135deg, #FBBD2E 0%, #EA732F 40%, #CD241E 100%);   
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .tagline {
    width: 100%;
    font-family: 'Kilimanjaro Sans Round1', 'Nunito Sans', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 80px;
    line-height: 1.25;
    margin: 0 0 8px 0;
    background: linear-gradient(135deg, #FF7A30 0%, #EA4A2C 50%, #CD241E 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .typed-text {
    width: 100%;
    font-family: 'Nunito Sans', sans-serif;
    font-style: italic;
    font-weight: 300;
    font-size: 24px;
    line-height: 1.4;
    margin: 0 0 24px 0;
    min-height: 34px;
    color: #CCC2AB;
    position: relative;
  }

  .description {
    font-size: var(--p);
    font-family: 'Inter', sans-serif;
    color: #FFF4DB;
    line-height: 1.6;
    margin-bottom: 36px;
    max-width: 764px;
  }

  /* CTA Buttons */
  .cta-buttons {
    display: flex;
    gap: 24px;
    width: 100%;
    max-width: 764px;
    margin-bottom: 60px;
  }

  .button-primary, .button-secondary {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 28px;
    border-radius: 9px;
    text-decoration: none;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 16px;
    font-weight: 500;
    flex: 1;
    max-width: 370px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    isolation: isolate; /* Create new stacking context */
  }
  
  .button-primary {
    background: #A13B1E;
    color: #FFF4DB;
    border: none;
  }
  
  .button-secondary {
    background: #458588;
    color: #FFF4DB;
    border: none;
  }

  .button-primary:hover, .button-secondary:hover {
    transform: translateY(-5px);
    position: relative;
    z-index: 10;
    overflow: hidden; /* This will clip the glow */
  }

  .button-primary:hover {
    background: #8B2F18; /* Darker version of #A13B1E */
  }

  .button-secondary:hover {
    background: #3A6B6E; /* Darker version of #458588 */
  }

  .button-primary:hover::before, .button-secondary:hover::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 150%;
    height: 150%;
    z-index: -1;
    filter: blur(20px);
    background: linear-gradient(
      45deg,
      #EA732F,
      #FBBD2E,
      #CD241E,
      #458588,
      #EA732F
    );
    background-size: 300% 300%;
    animation: glow-rotation 2s linear infinite;
    border-radius: 12px;
    opacity: 0.8;
  }

  @keyframes glow-rotation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }  /* Scroll indicator */
  .scroll-indicator {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: 0.8;
  }
  
  .mouse {
    width: 30px;
    height: 50px;
    border: 2px solid #FFF4DB;
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
    background: #FBBD2E;
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
    color: #CCC2AB;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  /* Features section */
  .features-section {
    padding: 100px 0;
    background-color: #282828;
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
    color: #FFF4DB;
    margin-bottom: 16px;
  }
  
  .underline {
    height: 4px;
    width: 80px;
    background: linear-gradient(90deg, #A13B1E, #FBBD2E);
    margin: 0 auto;
    border-radius: 2px;
  }
  
  .section-intro {
    max-width: 700px;
    margin: 24px auto 0;
    font-size: 18px;
    color: #CCC2AB;
    line-height: 1.6;
  }
  
  .features-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;
    align-items: center;
  }
  
  .features-cards {
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
    transition: transform 0.3s ease, box-shadow 0.3s ease;
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
    color: #FBBD2E;
    margin: 0 0 16px 0;
  }
  
  .feature-card p {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 16px;
    line-height: 1.6;
    color: #CCC2AB;
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
    color: #FFF4DB;
    background: rgba(69, 133, 136, 0.2);
    border: 1px solid #458588;
    padding: 8px 14px;
    border-radius: 20px;
    white-space: nowrap;
    text-decoration: none;
    display: block;
    transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
  }
  
  .skill-tag:hover a {
    background: #458588;
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
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .stat-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  }
  
  .stat-icon {
    font-size: 40px;
    margin-bottom: 16px;
  }
  
  .stat-value {
    font-family: 'Kilimanjaro Sans Round1', 'Nunito Sans', sans-serif;
    font-size: 48px;
    font-weight: 700;
    color: #FBBD2E;
    margin-bottom: 8px;
    background: linear-gradient(135deg, #FBBD2E, #EA732F);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .stat-label {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 16px;
    color: #CCC2AB;
  }
  
  /* Responsive styles */
  @media (max-width: 1024px) {
    .name, .tagline {
      font-size: 64px;
    }
    
    .typed-text {
      font-size: 20px;
    }
    
    .features-content {
      grid-template-columns: 1fr;
    }
    
    .skills-cloud-container {
      height: 350px;
    }
  }
  
  @media (max-width: 768px) {
    .name, .tagline {
      font-size: 48px;
    }
    
    .typed-text {
      font-size: 18px;
    }
    
    .description {
      font-size: 16px;
    }
    
    .section-header h2 {
      font-size: 36px;
    }
    
    .features-cards {
      grid-template-columns: 1fr;
    }
    
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .skills-cloud-container {
      height: 300px;
    }
  }
  
  @media (max-width: 640px) {
    .name, .tagline {
      font-size: 36px;
    }
    
    .typed-text {
      font-size: 16px;
    }
    
    .cta-buttons {
      flex-direction: column;
      gap: 16px;
    }
    
    .button-primary, .button-secondary {
      max-width: 100%;
    }
    
    .scroll-indicator {
      display: none;
    }
    
    .stats-grid {
      grid-template-columns: 1fr;
    }
    
    .skills-cloud-container {
      height: 250px;
    }
  }
</style>