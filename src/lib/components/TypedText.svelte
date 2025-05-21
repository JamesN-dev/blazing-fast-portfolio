<script>
  import { onMount, onDestroy } from 'svelte';

  export let strings = [];
  export let typeSpeed = 50;
  export let backSpeed = 30;
  export let startDelay = 500;
  export let backDelay = 1000;
  export let loop = true;
  export let cursorChar = '|';
  export let showCursor = true;
  
  let typingElement;
  let cursorElement;
  let typingTimeout;
  let backspaceTimeout;
  let startTimeout;
  
  let currentString = '';
  let currentStringIndex = 0;
  let currentCharIndex = 0;
  let isTyping = true;
  
  onMount(() => {
    // Create cursor element if needed
    if (showCursor) {
      createCursor();
    }
    
    // Start typing after delay
    startTimeout = setTimeout(() => {
      typeNextChar();
    }, startDelay);
    
    return () => {
      clearAllTimeouts();
    };
  });
  
  onDestroy(() => {
    clearAllTimeouts();
  });
  
  // Create cursor element with animation
  function createCursor() {
    if (!cursorElement) {
      const style = document.createElement('style');
      style.textContent = `
        @keyframes typing-cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .typing-cursor {
          display: inline-block;
          animation: typing-cursor-blink 1s step-end infinite;
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  // Type characters one by one
  function typeNextChar() {
    if (currentCharIndex < strings[currentStringIndex].length) {
      // Add next character
      currentString = strings[currentStringIndex].substring(0, currentCharIndex + 1);
      currentCharIndex++;
      
      // Schedule next character
      typingTimeout = setTimeout(typeNextChar, typeSpeed);
    } else {
      // Finished typing current string
      isTyping = false;
      
      // Wait before backspacing
      backspaceTimeout = setTimeout(backspaceNextChar, backDelay);
    }
  }
  
  // Backspace characters one by one
  function backspaceNextChar() {
    if (currentCharIndex > 0) {
      // Remove last character
      currentString = strings[currentStringIndex].substring(0, currentCharIndex - 1);
      currentCharIndex--;
      
      // Schedule next backspace
      backspaceTimeout = setTimeout(backspaceNextChar, backSpeed);
    } else {
      // Move to next string
      currentStringIndex = (currentStringIndex + 1) % strings.length;
      
      // Only continue if we should loop or haven't gone through all strings yet
      if (loop || currentStringIndex !== 0) {
        isTyping = true;
        
        // Start typing next string after delay
        startTimeout = setTimeout(typeNextChar, startDelay);
      }
    }
  }
  
  // Clear all timeouts to prevent memory leaks
  function clearAllTimeouts() {
    clearTimeout(typingTimeout);
    clearTimeout(backspaceTimeout);
    clearTimeout(startTimeout);
  }
</script>

<span class="typed-wrapper">
  <span bind:this={typingElement}>{currentString}</span>
  {#if showCursor}
    <span class="typing-cursor">{cursorChar}</span>
  {/if}
</span>

<style>
  .typed-wrapper {
    display: inline-block;
  }
</style>
