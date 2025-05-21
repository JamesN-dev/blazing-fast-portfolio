/**
 * Animation utilities for the site
 */

// Motion-based fade in animation
export function fadeIn(node, { delay = 0, duration = 300, easing = t => t }) {
  return {
    delay,
    duration,
    css: t => `
      opacity: ${t};
      transform: translateY(${(1 - t) * 20}px);
    `
  };
}

// Define breakpoints for responsive design
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536
};

// Media query helper
export function createMediaQuery(breakpoint) {
  return `@media (min-width: ${breakpoint}px)`;
}

// Format date helper
export function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

// Get contrast color (for accessibility)
export function getContrastColor(hexColor) {
  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return black or white based on luminance
  return luminance > 0.5 ? '#282828' : '#FFF4DB';
}
