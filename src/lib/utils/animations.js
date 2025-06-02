/**
 * ScrollAnimator - Intersection Observer based animation utility
 * Handles fade-in animations for elements as they enter the viewport
 */
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
      // Transition for opacity and transform with staggered delay
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

// Export only the ScrollAnimator utility
export default {
  ScrollAnimator
};
