<script>
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  
  let visible = $state(false);
  let name = $state('');
  let email = $state('');
  let message = $state('');
  let isSubmitting = $state(false);
  let isSubmitted = $state(false);
  let errorMessage = $state('');
  
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  function handleSubmit() {
    // Reset error state
    errorMessage = '';
    
    // Validate form
    if (!name.trim()) {
      errorMessage = 'Please enter your name';
      return;
    }
    
    if (!email.trim()) {
      errorMessage = 'Please enter your email';
      return;
    }
    
    if (!validateEmail(email)) {
      errorMessage = 'Please enter a valid email address';
      return;
    }
    
    if (!message.trim()) {
      errorMessage = 'Please enter your message';
      return;
    }
    
    // Simulate form submission
    isSubmitting = true;
    
    setTimeout(() => {
      isSubmitting = false;
      isSubmitted = true;
      
      // Reset form
      name = '';
      email = '';
      message = '';
      
      // Reset submission state after 3 seconds
      setTimeout(() => {
        isSubmitted = false;
      }, 3000);
    }, 1500);
  }
  
  onMount(() => {
    // Small delay before showing animations
    setTimeout(() => {
      visible = true;
    }, 200);
  });
</script>

<div class="contact-container">
  {#if visible}
    <div class="contact-header" transition:fade={{ duration: 500 }}>
      <h1>Get In Touch</h1>
      <div class="underline"></div>
      <p class="contact-intro">Have a project in mind or want to discuss a potential collaboration? Feel free to reach out!</p>
    </div>
    
    <div class="contact-content" transition:fly={{ delay: 300, duration: 600, y: 30 }}>
      <div class="contact-info">
        <div class="info-item">
          <h3>Email</h3>
          <p><a href="mailto:atetraxx@gmail.com">atetraxx@gmail.com</a></p>
        </div>
        
        <div class="info-item">
          <h3>Location</h3>
          <p>Pacific Northwest, USA</p>
        </div>
        
        <div class="info-item">
          <h3>Social</h3>
          <div class="social-links">
            <a href="https://github.com/Jamesn-dev" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/james-niemerg" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>
      
      <div class="contact-form">
        <form onsubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}>
          <div class="form-group">
            <label for="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Your name"
              bind:value={name}
              disabled={isSubmitting}
            />
          </div>
          
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Your email"
              bind:value={email}
              disabled={isSubmitting}
            />
          </div>
          
          <div class="form-group">
            <label for="message">Message</label>
            <textarea
              id="message"
              placeholder="What would you like to discuss?"
              rows="6"
              bind:value={message}
              disabled={isSubmitting}
            ></textarea>
          </div>
          
          {#if errorMessage}
            <div class="error-message">
              {errorMessage}
            </div>
          {/if}
          
          {#if isSubmitted}
            <div class="success-message">
              Message sent successfully! I'll get back to you soon.
            </div>
          {/if}
          
          <button
            type="submit"
            class="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  {/if}
</div>

<style>
  .contact-container {
    width: 90%;
    max-width: 1200px;
    margin: 40px auto;
    padding: 20px;
  }
  
  .contact-header {
    text-align: center;
    margin-bottom: 60px;
  }
  
  .contact-header h1 {
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
  
  .contact-intro {
    max-width: 600px;
    margin: 24px auto 0;
    font-size: 18px;
    color: #CCC2AB;
    line-height: 1.6;
  }
  
  .contact-content {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 40px;
  }
  
  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  
  .info-item h3 {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 24px;
    color: #FBBD2E;
    margin: 0 0 16px 0;
  }
  
  .info-item p {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 16px;
    line-height: 1.6;
    color: #CCC2AB;
    margin: 0;
  }
  
  .info-item a {
    color: #CCC2AB;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  .info-item a:hover {
    color: #FFF4DB;
  }
  
  .social-links {
    display: flex;
    gap: 16px;
  }
  
  .social-links a {
    display: inline-block;
    padding: 8px 0;
    position: relative;
  }
  
  .social-links a::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #FBBD2E;
    transition: width 0.3s ease;
  }
  
  .social-links a:hover::after {
    width: 100%;
  }
  
  .contact-form {
    background: #333333;
    border-radius: 8px;
    padding: 30px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    display: block;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 16px;
    color: #FFF4DB;
    margin-bottom: 8px;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 12px 16px;
    background: #282828;
    border: 1px solid #458588;
    border-radius: 4px;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 16px;
    color: #FFF4DB;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }
  
  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #FBBD2E;
    box-shadow: 0 0 0 2px rgba(251, 189, 46, 0.2);
  }
  
  .form-group input::placeholder,
  .form-group textarea::placeholder {
    color: #666;
  }
  
  .submit-button {
    display: block;
    width: 100%;
    padding: 14px 24px;
    background: #458588;
    border: none;
    border-radius: 4px;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: #FFF4DB;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.3s ease;
    margin-top: 24px;
  }
  
  .submit-button:hover:not(:disabled) {
    background: #255658;
    transform: translateY(-2px);
  }
  
  .submit-button:disabled {
    background: #666;
    cursor: not-allowed;
  }
  
  .error-message {
    background: rgba(205, 36, 30, 0.1);
    border-left: 3px solid #CD241E;
    padding: 12px 16px;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 14px;
    color: #CD241E;
    margin-bottom: 20px;
  }
  
  .success-message {
    background: rgba(69, 133, 136, 0.1);
    border-left: 3px solid #458588;
    padding: 12px 16px;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 14px;
    color: #FBBD2E;
    margin-bottom: 20px;
  }
  
  @media (max-width: 768px) {
    .contact-header h1 {
      font-size: 36px;
    }
    
    .contact-content {
      grid-template-columns: 1fr;
    }
    
    .contact-info {
      order: 2;
    }
    
    .contact-form {
      order: 1;
      margin-bottom: 40px;
    }
  }
</style>
