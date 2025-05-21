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
      <h1>About Me</h1>
      <div class="underline"></div>
    </div>
    
    <div class="about-content">
      <div class="about-text" transition:fly={{ duration: 600, y: 20 }}>
        <p>
          Hi there! I'm James, a marketing professional, developer, and visual designer based in the heart of tech innovation. With a passion for creating exceptional digital experiences, I blend aesthetic sensibility with technical expertise to build websites and applications that not only look great but perform at lightning speed.
        </p>
        
        <p>
          My journey in web development began over 10 years ago when I built my first website using just HTML and CSS. Since then, I've expanded my toolkit to include modern frameworks like SvelteKit, React, and Vue, allowing me to craft dynamic and responsive applications that engage users and solve real-world problems.
        </p>
        
        <p>
          What sets me apart is my holistic approach to web development. With a background in marketing and design, I understand that a successful digital product requires more than just clean code. It needs to tell a compelling story, guide users intuitively, and ultimately drive business outcomes. That's why I approach each project with a focus on the end user, ensuring that every line of code serves a purpose and contributes to a seamless experience.
        </p>
        
        <p>
          When I'm not coding, you can find me exploring new design trends, contributing to open-source projects, or enjoying the outdoors. I believe in continuous learning and am always looking to expand my skills and stay on the cutting edge of web development.
        </p>
      </div>
      
      <div class="about-skills" transition:fly={{ delay: 300, duration: 600, y: 20 }}>
        <h2>Skills & Technologies</h2>
        <div class="skills-grid">
          <div class="skill-category">
            <h3>Languages</h3>
            <ul>
              <li>JavaScript (ES6+)</li>
              <li>HTML5</li>
              <li>CSS3/SCSS</li>
              <li>PHP</li>
              <li>Python</li>
            </ul>
          </div>
          
          <div class="skill-category">
            <h3>Frameworks & Libraries</h3>
            <ul>
              <li>SvelteKit</li>
              <li>React</li>
              <li>Vue.js</li>
              <li>Node.js</li>
              <li>Express</li>
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
            <h3>Design</h3>
            <ul>
              <li>UI/UX Design</li>
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
