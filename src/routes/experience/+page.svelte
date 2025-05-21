<script>
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  
  let visible = $state(false);
  
  const experiences = [
    {
      title: "Senior Web Developer",
      company: "TechInnovate",
      period: "2021 - Present",
      description: "Lead development of responsive, high-performance web applications using SvelteKit and modern JavaScript frameworks. Improved site performance by 40% through code optimization and implementation of best practices.",
      skills: ["SvelteKit", "JavaScript", "AWS", "CI/CD", "Performance Optimization"]
    },
    {
      title: "Frontend Developer",
      company: "DigitalSolutions Inc.",
      period: "2018 - 2021",
      description: "Developed and maintained client websites with a focus on user experience and responsive design. Collaborated with designers to implement pixel-perfect interfaces.",
      skills: ["React", "TypeScript", "SCSS", "Webpack", "REST APIs"]
    },
    {
      title: "UI/UX Designer",
      company: "CreativeWorks Agency",
      period: "2016 - 2018",
      description: "Created visually appealing and intuitive interfaces for a variety of clients. Conducted user research and usability testing to inform design decisions.",
      skills: ["Figma", "Adobe XD", "User Research", "Prototyping", "Visual Design"]
    },
    {
      title: "Marketing Specialist",
      company: "BrandForward",
      period: "2014 - 2016",
      description: "Developed and executed digital marketing strategies for B2B clients. Created content for various platforms and managed social media campaigns.",
      skills: ["Content Strategy", "SEO", "Social Media Marketing", "Analytics", "Email Campaigns"]
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
            delay: 200 + (i * 150), 
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
    background: #FBBD2E;
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
    color: #FBBD2E;
    background: rgba(251, 189, 46, 0.1);
    padding: 6px 12px;
    border-radius: 30px;
    margin-bottom: 16px;
  }
  
  .experience-title {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 24px;
    color: #FFF4DB;
    margin: 0 0 8px 0;
  }
  
  .experience-company {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 18px;
    color: #EA732F;
    margin: 0 0 16px 0;
    font-weight: normal;
  }
  
  .experience-description {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 16px;
    line-height: 1.6;
    color: #CCC2AB;
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
    color: #FFF4DB;
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
