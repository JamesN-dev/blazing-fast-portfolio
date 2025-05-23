// A custom cursor component for visual flair
export class CustomCursor {
  constructor() {
    this.cursor = null;
    this.cursorCircle = null;
    this.cursorDot = null;
    this.links = [];
    this.buttons = [];
    this.mouseX = 0;
    this.mouseY = 0;
    this.posX = 0;
    this.posY = 0;
    this.cursorSize = 20;
    this.cursorDotSize = 5;
    this.scale = 1;
    this.isActive = false;
  }

  init() {
    // Create cursor elements
    this.cursor = document.createElement('div');
    this.cursor.classList.add('custom-cursor');

    this.cursorCircle = document.createElement('div');
    this.cursorCircle.classList.add('cursor-circle');

    this.cursorDot = document.createElement('div');
    this.cursorDot.classList.add('cursor-dot');

    this.cursor.appendChild(this.cursorCircle);
    this.cursor.appendChild(this.cursorDot);
    document.body.appendChild(this.cursor);

    // Get all interactive elements
    this.links = [...document.querySelectorAll('a')];
    this.buttons = [...document.querySelectorAll('button')];

    // Set up event listeners
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mousedown', this.onMouseDown.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
    document.addEventListener('mouseenter', this.onMouseEnter.bind(this));
    document.addEventListener('mouseleave', this.onMouseLeave.bind(this));

    // Add hover effect for interactive elements
    [...this.links, ...this.buttons].forEach(el => {
      el.addEventListener('mouseenter', this.onLinkHover.bind(this));
      el.addEventListener('mouseleave', this.onLinkLeave.bind(this));
    });

    // Start animation loop
    this.render();

    // Add CSS styles
    this.addStyles();
  }

  onMouseMove(e) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;

    // Show cursor if it was hidden
    if (!this.isActive) {
      this.isActive = true;
      this.cursor.style.opacity = 1;
    }
  }

  onMouseDown() {
    this.scale = 0.8;
  }

  onMouseUp() {
    this.scale = 1;
  }

  onMouseEnter() {
    this.isActive = true;
    this.cursor.style.opacity = 1;
  }

  onMouseLeave() {
    this.isActive = false;
    this.cursor.style.opacity = 0;
  }

  onLinkHover() {
    this.cursorCircle.classList.add('active');
  }

  onLinkLeave() {
    this.cursorCircle.classList.remove('active');
  }

  render() {
    // Smooth cursor following
    this.posX += (this.mouseX - this.posX) * 0.2;
    this.posY += (this.mouseY - this.posY) * 0.2;

    // Apply position and scale
    this.cursor.style.transform = `translate(${this.posX}px, ${this.posY}px)`;
    this.cursorCircle.style.transform = `scale(${this.scale})`;

    requestAnimationFrame(this.render.bind(this));
  }

  addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .custom-cursor {
        position: fixed;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: opacity 0.3s ease;
        opacity: 0;
      }

      .cursor-circle {
        position: absolute;
        top: -${this.cursorSize / 2}px;
        left: -${this.cursorSize / 2}px;
        width: ${this.cursorSize}px;
        height: ${this.cursorSize}px;
        border: 1.5px solid var(--accent);
        border-radius: 50%;
        transition: transform 0.3s ease;
      }

      .cursor-dot {
        position: absolute;
        top: -${this.cursorDotSize / 2}px;
        left: -${this.cursorDotSize / 2}px;
        width: ${this.cursorDotSize}px;
        height: ${this.cursorDotSize}px;
        background-color: var(--accent);
        border-radius: 50%;
      }

      .cursor-circle.active {
        transform: scale(1.5) !important;
        border-color: var(--color-text);
        background-color: rgba(251, 189, 46, 0.1);
      }

      @media (max-width: 768px) {
        .custom-cursor {
          display: none;
        }
      }
    `;
    document.head.appendChild(style);
  }

  destroy() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mousedown', this.onMouseDown);
    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('mouseenter', this.onMouseEnter);
    document.removeEventListener('mouseleave', this.onMouseLeave);

    [...this.links, ...this.buttons].forEach(el => {
      el.removeEventListener('mouseenter', this.onLinkHover);
      el.removeEventListener('mouseleave', this.onLinkLeave);
    });

    if (this.cursor && this.cursor.parentNode) {
      this.cursor.parentNode.removeChild(this.cursor);
    }
  }
}

// Animated background particles
export class ParticleBackground {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) {
      const canvas = document.createElement('canvas');
      canvas.id = canvasId;
      document.body.appendChild(canvas);
      this.canvas = canvas;
    }

    this.ctx = this.canvas.getContext('2d');
    this.dpr = window.devicePixelRatio || 1;

    // Default options
    this.options = {
      particleCount: 100,
      particleColor: 'var(--accent)',
      particleSize: 3,
      particleMinSize: 1,
      particleMaxSize: 3,
      particleSpeed: 1.0,  // Increased speed
      particleOpacity: 0.5,
      lineColor: 'var(--accent)',
      lineOpacity: 0.25,
      lineThickness: 1,
      connectionDistance: 150,
      backgroundColor: 'var(--background)',
      responsive: true,
      interactivity: true,
      floatEffect: true,  // New option for floating effect
      floatAmplitude: 0.5, // Amplitude of the floating effect
      floatFrequency: 0.001, // Frequency of the floating effect
      ...options
    };

    this.particles = [];
    this.mousePosition = { x: null, y: null };
    this.isAnimating = false;

    // Initialize the canvas
    this.resize();

    // Add event listeners
    window.addEventListener('resize', this.resize.bind(this));

    if (this.options.interactivity) {
      this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
      this.canvas.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    }
  }

  init() {
    // Set canvas style
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.zIndex = '-1';
    this.canvas.style.pointerEvents = 'none';

    // Create particles
    this.createParticles();

    // Start animation loop
    this.isAnimating = true;
    this.animate();

    return this;
  }

  resize() {
    const parent = this.canvas.parentElement || document.body;
    const width = parent.offsetWidth;
    const height = parent.offsetHeight;

    this.canvas.width = width * this.dpr;
    this.canvas.height = height * this.dpr;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;

    this.ctx.scale(this.dpr, this.dpr);

    // Recreate particles when resizing
    if (this.particles.length > 0) {
      this.particles = [];
      this.createParticles();
    }
  }

  createParticles() {
    const { width, height } = this.canvas;

    for (let i = 0; i < this.options.particleCount; i++) {
      const x = Math.random() * width / this.dpr;
      const y = Math.random() * height / this.dpr;
      const size = Math.random() * (this.options.particleMaxSize - this.options.particleMinSize) + this.options.particleMinSize;
      const vx = (Math.random() - 0.5) * this.options.particleSpeed;
      const vy = (Math.random() - 0.5) * this.options.particleSpeed;

      this.particles.push({
        x, y, size, vx, vy
      });
    }
  }

  animate() {
    if (!this.isAnimating) return;

    this.update();
    this.draw();

    requestAnimationFrame(this.animate.bind(this));
  }

  update() {
    const { width, height } = this.canvas;
    const now = Date.now();

    this.particles.forEach((particle, index) => {
      // Add floating effect if enabled
      if (this.options.floatEffect) {
        // Create a unique phase for each particle
        const phase = index * 0.2;

        // Apply sinusoidal movement
        particle.x += Math.sin((now * this.options.floatFrequency) + phase) * this.options.floatAmplitude;
        particle.y += Math.cos((now * this.options.floatFrequency) + phase) * this.options.floatAmplitude;
      }

      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Bounce off edges with some randomness
      if (particle.x < 0 || particle.x > width / this.dpr) {
        particle.vx = -particle.vx * (0.9 + Math.random() * 0.2);
        // Add a small random velocity change
        particle.vy += (Math.random() - 0.5) * 0.3;
      }

      if (particle.y < 0 || particle.y > height / this.dpr) {
        particle.vy = -particle.vy * (0.9 + Math.random() * 0.2);
        // Add a small random velocity change
        particle.vx += (Math.random() - 0.5) * 0.3;
      }

      // Mouse interaction
      if (this.mousePosition.x !== null && this.mousePosition.y !== null) {
        const dx = particle.x - this.mousePosition.x;
        const dy = particle.y - this.mousePosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const angle = Math.atan2(dy, dx);
          const force = (150 - distance) / 150;

          // Stronger repulsion effect
          particle.vx += Math.cos(angle) * force * 0.8;
          particle.vy += Math.sin(angle) * force * 0.8;
        }
      }

      // Apply velocity limits
      const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
      if (speed > this.options.particleSpeed) {
        const ratio = this.options.particleSpeed / speed;
        particle.vx *= ratio;
        particle.vy *= ratio;
      }
    });
  }

  draw() {
    const { width, height } = this.canvas;

    // Clear canvas
    this.ctx.fillStyle = this.options.backgroundColor;
    this.ctx.fillRect(0, 0, width / this.dpr, height / this.dpr);

    // Draw connections
    this.ctx.beginPath();
    for (let i = 0; i < this.particles.length; i++) {
      const p1 = this.particles[i];

      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.options.connectionDistance) {
          const opacity = 1 - (distance / this.options.connectionDistance);

          this.ctx.strokeStyle = `rgba(${this.hexToRgb(this.options.lineColor)}, ${opacity * this.options.lineOpacity})`;
          this.ctx.lineWidth = this.options.lineThickness;

          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
        }
      }
    }
    this.ctx.stroke();

    // Draw particles
    this.particles.forEach(particle => {
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${this.hexToRgb(this.options.particleColor)}, ${this.options.particleOpacity})`;
      this.ctx.fill();
    });
  }

  handleMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    this.mousePosition = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  handleMouseLeave() {
    this.mousePosition = { x: null, y: null };
  }

  hexToRgb(hex) {
    hex = hex.replace(/^#/, '');

    if (hex.length === 3) {
      hex = hex.split('').map(h => h + h).join('');
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `${r}, ${g}, ${b}`;
  }

  stop() {
    this.isAnimating = false;
  }

  restart() {
    if (!this.isAnimating) {
      this.isAnimating = true;
      this.animate();
    }
  }

  destroy() {
    this.stop();
    window.removeEventListener('resize', this.resize);

    if (this.options.interactivity) {
      this.canvas.removeEventListener('mousemove', this.handleMouseMove);
      this.canvas.removeEventListener('mouseleave', this.handleMouseLeave);
    }

    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}

// Intersection-based animations helper
export class ScrollAnimator {
  constructor() {
    this.elements = [];
    this.observer = null;
  }

  init() {
    this.observer = new IntersectionObserver(this.handleIntersection.bind(this), {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    });

    return this;
  }

  observe(selector, animationClass, delay = 0) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transition = `opacity 0.6s ease ${delay + (index * 0.1)}s, transform 0.6s ease ${delay + (index * 0.1)}s`;

      this.elements.push({
        element: el,
        animationClass,
        animated: false
      });

      this.observer.observe(el);
    });

    return this;
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      const target = entry.target;
      const elementData = this.elements.find(item => item.element === target);

      if (entry.isIntersecting && elementData && !elementData.animated) {
        elementData.element.classList.add(elementData.animationClass);
        elementData.element.style.opacity = '1';
        elementData.animated = true;
      } else if (!entry.isIntersecting && elementData && elementData.animated) {
        // Optional: Reset animation when element is out of view
        // elementData.element.classList.remove(elementData.animationClass);
        // elementData.element.style.opacity = '0';
        // elementData.animated = false;
      }
    });
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }

    this.elements.forEach(item => {
      item.element.classList.remove(item.animationClass);
    });

    this.elements = [];
  }
}


// Export all utilities
export default {
  CustomCursor,
  ParticleBackground,
  ScrollAnimator
};
