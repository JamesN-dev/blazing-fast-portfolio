<script>
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  
  let visible = $state(false);
  
  onMount(() => {
    // Small delay before showing animations
    setTimeout(() => {
      visible = true;
    }, 200);
  });
</script>

<div class="about-container">
  {#if visible}
    <div class="about-header" transition:fade={{ duration: 500 }}>
      <h1>About</h1>
      <div class="underline"></div>
    </div>
    
    <div class="about-content">
      <div class="about-text" transition:fly={{ duration: 600, y: 20 }}>
      <p>
        I build digital experiences that don't just look great but perform at lightning speed - that's why I founded Blazing Fast Design/Dev. With 15+ years of design and 10 years in marketing, I bring unique value at the intersection of visual aesthetics, conversion strategy, and technical implementation. I don't just make things pretty; I make them work.
      </p>

      <p>
        Beyond traditional development, I architect sophisticated AI solutions that deliver measurable business value. From RAG chatbots that intelligently process company documentation to answer product questions, to custom scrapers and specialized tools that utilize LLM prompts to intelligently execute commands - I build agentic systems that put your business on the cutting edge of technology. They work. They deliver results. And they look good doing it.
      </p>

      <p>
        Unlike pure developers, I approach each project from a holistic business perspective. This means your site won't just function—it'll convert visitors, tell your story, and make your competition nervous. By focusing on the intersection of design, marketing, and technology, I create solutions that solve real problems while looking exceptional.
      </p>

      <p>
        When my work laptop closes, my personal laptop opens. The line between work and play blurs when you genuinely enjoy technology. I'm constantly learning, experimenting, and building—not because I have to, but because I want to.
      </p>
      </div>

      <div class="about-skills" transition:fly={{ delay: 300, duration: 600, y: 20 }}>
        <h2>Skills & Technologies</h2>
        <p class="section-tagline">My current technical toolkit</p>
        <div class="skills-grid">
          <div class="skill-category">
            <h3>Languages</h3>
            <ul>
              <li>JavaScript (ES6+)</li>
              <li>Python</li>
              <li>CSS3/SCSS</li>
              <li>HTML5</li>
              <li>SQL</li>
            </ul>
          </div>
          
          <div class="skill-category">
            <h3>Build Ecosystems</h3>
            <ul>
              <li>SvelteKit</li>
              <li>Django</li>
              <li>TailwindCSS</li>
              <li>FastAPI</li>
              <li>Flask</li>
            </ul>
          </div>
          
          <div class="skill-category">
            <h3>Tools & Platforms</h3>
            <ul>
              <li>Git/GitHub</li>
              <li>VSCode</li>
              <li>Figma</li>
              <li>AWS</li>
              <li>Netlify/Vercel</li>
            </ul>
          </div>
          
          <div class="skill-category">
            <h3>Design & UI</h3>
            <ul>
              <li>UI/UX Design & interactive transitions (Svelte)</li>
              <li>Responsive Design</li>
              <li>Animation</li>
              <li>Graphic Design</li>
              <li>Brand Identity</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .about-container {
    width: 90%;
    max-width: 1200px;
    margin: 40px auto;
    padding: 20px;
  }
  
  .about-header {
    text-align: center;
    margin-bottom: 40px;
  }
  
  .about-header h1 {
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
  
  .about-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .about-text p {
    font-size: 18px;
    line-height: 1.6;
    margin-bottom: 24px;
    color: #CCC2AB;
  }
  
  .about-skills h2 {
    font-family: 'Kilimanjaro Sans Round1', 'Nunito Sans', sans-serif;
    font-size: 32px;
    color: #FFF4DB;
    margin-bottom: 24px;
  }
  
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 24px;
  }
  
  .skill-category {
    background: #333333;
    border-radius: 8px;
    padding: 24px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .skill-category:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
  
  .skill-category h3 {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 20px;
    color: #FBBD2E;
    margin-bottom: 16px;
    border-bottom: 1px solid #458588;
    padding-bottom: 8px;
  }
  
  .skill-category ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  .skill-category li {
    color: #FFF4DB;
    padding: 8px 0;
    position: relative;
    padding-left: 20px;
  }
  
  .skill-category li::before {
    content: "▹";
    position: absolute;
    left: 0;
    color: #458588;
  }
  
  @media (min-width: 768px) {
    .about-text {
      font-size: 20px;
    }
  }
  
  .section-tagline {
    font-size: 18px;
    color: #AAA;
    margin-bottom: 32px;
    font-style: italic;
  }

  @media (max-width: 768px) {
    .about-container {
      margin: 20px auto;
    }
    
    .about-header h1 {
      font-size: 36px;
    }
    
    .skills-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
