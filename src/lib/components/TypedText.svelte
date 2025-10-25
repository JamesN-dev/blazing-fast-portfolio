<!-- <script>
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
		font-family: 'inter', 'Nunito Sans', sans-serif;
		font-size: 1.25em;
		font-style: italic;
		color: var(--gruv-darkwhite);
	}
</style> -->

<script>
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';

	export let strings = [];
	export let typeSpeed = 50;
	export let backSpeed = 30;
	export let startDelay = 500;
	export let backDelay = 1000;
	export let loop = true;
	export let cursorChar = '|';
	export let showCursor = true;

	// extras
	export let smartBackspace = true; // only erase to the common prefix with next string
	export let jitter = 0.15; // +/- % randomness for more human feel
	export let pauseOnHover = false;

	const dispatch = createEventDispatcher();

	let current = '';
	let i = 0; // string index
	let j = 0; // char index within current string
	let phase = 'typing'; // 'typing' | 'backspacing' | 'idle'
	let t; // timeout id
	let prefersReduced = false;
	let wrapper; // for hover pause

	function ms(base) {
		if (prefersReduced) return 0;
		if (!jitter) return base;
		const delta = base * jitter;
		return Math.max(0, base + (Math.random() * 2 - 1) * delta);
	}

	function commonPrefixLen(a, b) {
		const n = Math.min(a.length, b.length);
		let k = 0;
		while (k < n && a[k] === b[k]) k++;
		return k;
	}

	function nextIndex() {
		return (i + 1) % strings.length;
	}

	function schedule(fn, delay) {
		clearTimeout(t);
		t = setTimeout(fn, delay);
	}

	function step() {
		if (!strings?.length) return;

		const s = strings[i];
		const nextS = strings[nextIndex()];

		if (phase === 'typing') {
			if (j < s.length) {
				current = s.slice(0, j + 1);
				j++;
				schedule(step, ms(typeSpeed));
			} else {
				phase = 'idle';
				dispatch('typed', { index: i, value: s });
				schedule(() => ((phase = 'backspacing'), step()), backDelay);
			}
		} else if (phase === 'backspacing') {
			const target = smartBackspace ? commonPrefixLen(s, nextS ?? '') : 0;
			if (j > target) {
				current = s.slice(0, j - 1);
				j--;
				schedule(step, ms(backSpeed));
			} else {
				// switch to next string
				i = nextIndex();
				if (!loop && i === 0) {
					phase = 'idle';
					dispatch('done');
					return;
				}
				phase = 'typing';
				dispatch('stringchange', { index: i, value: strings[i] });
				schedule(step, ms(startDelay));
			}
		} else {
			// IDLE
			const atEnd = j === s.length;
			const delay = atEnd ? backDelay : startDelay;

			schedule(() => {
				phase = atEnd ? 'backspacing' : 'typing';
				step();
			}, ms(delay));
		}
	}

	function start() {
		clearTimeout(t);
		schedule(step, startDelay);
	}

	export function pause() {
		clearTimeout(t);
	}

	export function resume() {
		clearTimeout(t);
		const s = strings?.[i] ?? '';
		if (phase === 'idle') {
			// if we were idling at full string, resume by backspacing;
			// otherwise resume typing
			phase = j === s.length ? 'backspacing' : 'typing';
		}
		step();
	}

	onMount(() => {
		// reduced motion
		if (typeof window !== 'undefined' && window.matchMedia) {
			prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		}

		// optional pause on hover
		if (pauseOnHover && wrapper) {
			const enter = () => pause();
			const leave = () => resume();
			wrapper.addEventListener('mouseenter', enter);
			wrapper.addEventListener('mouseleave', leave);
			onDestroy(() => {
				wrapper.removeEventListener('mouseenter', enter);
				wrapper.removeEventListener('mouseleave', leave);
			});
		}

		// guard empty strings
		if (!strings?.length) return;
		// normalize: ensure all are strings
		strings = strings.map((x) => `${x ?? ''}`);

		start();
		return () => clearTimeout(t);
	});

	onDestroy(() => clearTimeout(t));
</script>

<span class="typed-wrapper" bind:this={wrapper} aria-live="polite" aria-atomic="true">
	<span class="typed-text">{current}</span>
	{#if showCursor}<span class="typing-cursor" aria-hidden="true">{cursorChar}</span>{/if}
</span>

<style>
	.typed-wrapper {
		display: inline-block;
		font-family:
			'Inter',
			system-ui,
			-apple-system,
			Segoe UI,
			Roboto,
			sans-serif;
		font-size: 1.25em;
		font-style: italic;
		color: var(--gruv-darkwhite);
	}
	.typing-cursor {
		display: inline-block;
		margin-left: 0.08em;
		animation: typing-cursor-blink 1s step-end infinite;
	}
	@media (prefers-reduced-motion: reduce) {
		.typing-cursor {
			animation: none;
		}
	}
	@keyframes typing-cursor-blink {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
	}
</style>
