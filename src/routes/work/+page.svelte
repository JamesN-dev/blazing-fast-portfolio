<script>
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  
  let visible = $state(false);
  
  const projects = [
    {
      title: "E-commerce Platform",
      description: "A high-performance e-commerce platform built with SvelteKit, featuring product filtering, cart functionality, and secure checkout process.",
      image: "/images/project-placeholder-1.jpg",
      technologies: ["SvelteKit", "Node.js", "MongoDB", "Stripe API"],
      url: "#",
      github: "#"
    },
    {
      title: "Portfolio Template",
      description: "A customizable portfolio template for developers and designers, with smooth animations and responsive design.",
      image: "/images/project-placeholder-2.jpg",
      technologies: ["SvelteKit", "GSAP", "CSS Grid", "Netlify"],
      url: "#",
      github: "#"
    },
    {
      title: "Task Management App",
      description: "A productivity application for managing tasks and projects, with features like drag-and-drop, tags, and progress tracking.",
      image: "/images/project-placeholder-3.jpg",
      technologies: ["SvelteKit", "Firebase", "Tailwind CSS", "PWA"],
      url: "#",
      github: "#"
    },
    {
      title: "Weather Dashboard",
      description: "A weather dashboard that displays current conditions and forecasts for multiple locations, with beautiful data visualizations.",
      image: "/images/project-placeholder-4.jpg",
      technologies: ["SvelteKit", "D3.js", "Weather API", "Geolocation"],
      url: "#",
      github: "#"
    }
  ];
  
  onMount(() => {
    // Small delay before showing animations
    setTimeout(() => {
      visible = true;
    }, 200);
  });
</script>

<div class="work-container">
  {#if visible}
    <div class="work-header" transition:fade={{ duration: 500 }}>
      <h1>My Work</h1>
      <div class="underline"></div>
      <p class="work-intro">Here are some projects I've worked on. Each one represents a unique challenge and solution.</p>
    </div>
    
    <div class="projects-grid">
      {#each projects as project, i}
        <div 
          class="project-card" 
          transition:fly={{ 
            delay: 300 + (i * 150), 
            duration: 600, 
            y: 30 
          }}
        >
          <div class="project-image">
            <div class="project-placeholder">
              <span>{project.title[0]}</span>
            </div>
          </div>
          <div class="project-content">
            <h3 class="project-title">{project.title}</h3>
            <p class="project-description">{project.description}</p>
            <div class="project-tech">
              {#each project.technologies as tech}
                <span class="tech-tag">{tech}</span>
              {/each}
            </div>
            <div class="project-links">
              <a href={project.url} class="project-link" target="_blank" rel="noopener noreferrer">
                <span>Live Demo</span>
              </a>
              <a href={project.github} class="project-link github" target="_blank" rel="noopener noreferrer">
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .work-container {
    width: 90%;
    max-width: 1200px;
    margin: 40px auto;
    padding: 20px;
  }
  
  .work-header {
    text-align: center;
    margin-bottom: 60px;
  }
  
  .work-header h1 {
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
  
  .work-intro {
    max-width: 600px;
    margin: 24px auto 0;
    font-size: 18px;
    color: #CCC2AB;
    line-height: 1.6;
  }
  
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 30px;
  }
  
  .project-card {
    background: #333333;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .project-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
  
  .project-image {
    height: 200px;
    background: #3E3E3E;
    overflow: hidden;
    position: relative;
  }
  
  .project-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #255658;
  }
  
  .project-placeholder span {
    font-size: 72px;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.2);
  }
  
  .project-content {
    padding: 24px;
  }
  
  .project-title {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 24px;
    color: #FBBD2E;
    margin: 0 0 16px 0;
  }
  
  .project-description {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 16px;
    line-height: 1.6;
    color: #CCC2AB;
    margin-bottom: 16px;
    min-height: 80px;
  }
  
  .project-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 24px;
  }
  
  .tech-tag {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 12px;
    color: #FFF4DB;
    background: #458588;
    padding: 4px 10px;
    border-radius: 4px;
  }
  
  .project-links {
    display: flex;
    gap: 16px;
  }
  
  .project-link {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 16px;
    border-radius: 4px;
    text-decoration: none;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    transition: background 0.3s ease, transform 0.3s ease;
    color: #FFF4DB;
    background: #A13B1E;
    flex: 1;
  }
  
  .project-link:hover {
    background: #CD241E;
    transform: translateY(-2px);
  }
  
  .project-link.github {
    background: #458588;
  }
  
  .project-link.github:hover {
    background: #255658;
  }
  
  @media (max-width: 768px) {
    .work-header h1 {
      font-size: 36px;
    }
    
    .projects-grid {
      grid-template-columns: 1fr;
    }
    
    .project-description {
      min-height: auto;
    }
  }
</style>
