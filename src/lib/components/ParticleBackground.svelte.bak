<script>
  import { onMount, onDestroy } from 'svelte';
  import { ParticleBackground as ParticleBackgroundClass } from '$lib/utils/animations.js';
  
  // Props using proper Svelte 5 runes syntax
  let { 
    scrollY = 0,
    canvasId = 'particle-background-canvas',
    particleCount = 100,
    particleColor = '#FBBD2E',
    lineColor = '#FBBD2E',
    backgroundColor = 'transparent',
    connectionDistance = 150,
    particleOpacity = 0.5,
    lineOpacity = 0.25,
    responsive = true,
    particleSpeed = 1.0,
    floatEffect = true,
    floatAmplitude = 0.5,
    floatFrequency = 0.001,
    startOnScroll = true,
    scrollThreshold = 50,
    children
  } = $props();
  
  let particleSystem;
  let canvas;
  
  onMount(() => {
    // Create canvas if it doesn't exist
    if (!document.getElementById(canvasId)) {
      const newCanvas = document.createElement('canvas');
      newCanvas.id = canvasId;
      document.body.appendChild(newCanvas);
    }
    
    // Initialize particle background with the props
    particleSystem = new ParticleBackgroundClass(canvasId, {
      particleCount,
      particleColor,
      lineColor,
      backgroundColor,
      connectionDistance,
      particleOpacity,
      lineOpacity,
      responsive,
      particleSpeed,
      floatEffect,
      floatAmplitude, 
      floatFrequency,
      interactivity: true  // Make sure interactivity is enabled
    });
    
    particleSystem.init();
    
    // Get canvas reference
    canvas = document.getElementById(canvasId);
    
    // Only apply our own styles if startOnScroll is true
    // Otherwise, let the ParticleBackground class handle it
    if (canvas && startOnScroll) {
      // Apply initial opacity based on startOnScroll prop
      canvas.style.transition = 'opacity 0.5s ease';
      canvas.style.opacity = '0';
    }
  });
  
  // Handle scroll effect reactively using $effect
  $effect(() => {
    if (!canvas || !startOnScroll) return;
    
    if (scrollY > scrollThreshold) {
      // Gradually increase opacity as we scroll down
      canvas.style.opacity = Math.min(scrollY / 300, 1);
    } else {
      canvas.style.opacity = '0';
    }
  });
  
  onDestroy(() => {
    if (particleSystem) {
      particleSystem.destroy();
    }
  });
</script>

{#if children}
  {@render children()}
{/if}