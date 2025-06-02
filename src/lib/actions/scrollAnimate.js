/**
 * Svelte action for scroll-triggered animations
 * Replaces the ScrollAnimator class with a more idiomatic Svelte approach
 */
export function scrollAnimate(node, {
	animationClass = 'animate-fade-up',
	threshold = 0.1,
	once = true
} = {}) {
	let observer;

	if (typeof IntersectionObserver !== 'undefined') {
		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('visible');
						if (once) {
							observer.unobserve(entry.target);
						}
					} else if (!once) {
						entry.target.classList.remove('visible');
					}
				});
			},
			{ threshold }
		);

		observer.observe(node);
		// Set initial animation class
		node.classList.add(animationClass);
	}

	return {
		update(newParams) {
			// Handle parameter updates
			if (observer && newParams) {
				const { animationClass: newClass } = newParams;
				if (newClass && newClass !== animationClass) {
					node.classList.remove(animationClass);
					node.classList.add(newClass);
				}
			}
		},
		destroy() {
			if (observer) {
				observer.disconnect();
			}
		}
	};
}
