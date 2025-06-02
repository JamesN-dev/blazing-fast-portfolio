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
			<p class="contact-intro">
				Have a project in mind or want to discuss a potential collaboration? Feel free to reach out!
			</p>
		</div>

		<div class="contact-content" transition:fly={{ delay: 300, duration: 600, y: 30 }}>
			<div class="contact-info">
				<div class="info-item">
					<h3>Email</h3>
					<p><a href="mailto:james@blazingfast.app">james@blazingfast.app</a></p>
				</div>

				<div class="info-item">
					<h3>Location</h3>
					<p>Central/Southern Illinois, USA</p>
				</div>

				<div class="info-item">
					<h3>Social</h3>
					<div class="social-links ram-cards-small">
						<a href="https://github.com/Jamesn-dev" target="_blank" rel="noopener noreferrer"
							>GitHub</a
						>
						<a
							href="https://linkedin.com/in/james-niemerg"
							target="_blank"
							rel="noopener noreferrer">LinkedIn</a
						>
					</div>
				</div>
			</div>

			<div class="contact-form">
				<form
					onsubmit={(e) => {
						e.preventDefault();
						handleSubmit();
					}}
				>
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
						<div class="success-message">Message sent successfully! I'll get back to you soon.</div>
					{/if}

					<button type="submit" class="submit-button" disabled={isSubmitting}>
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
		max-width: var(--max-width);
		margin: var(--space-xl) auto;
		padding: var(--space-md);
	}

	.contact-header {
		text-align: center;
		margin-bottom: var(--space-2xl);
	}

	.contact-header h1 {
		font-family: 'Kilimanjaro Sans Round1', 'Nunito Sans', sans-serif;
		font-size: var(--h1);
		color: var(--color-text);
		margin-bottom: 16px;
	}

	.underline {
		height: 4px;
		width: 80px;
		background: linear-gradient(90deg, var(--gruv-darkorange), var(--accent));
		margin: 0 auto;
		border-radius: 2px;
	}

	.contact-intro {
		max-width: 600px;
		margin: 24px auto 0;
		font-size: var(--p-size);
		color: var(--description);
		line-height: 1.6;
	}

	.contact-content {
		/* RAM PATTERN for responsive layout */
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(350px, 100%), 1fr));
		gap: var(--space-xl);
		align-items: start;
	}

	.contact-info {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
	}

	.info-item h3 {
		font-family: 'Nunito Sans', sans-serif;
		font-size: var(--h3-size);
		color: var(--accent);
		margin: 0 0 16px 0;
	}

	.info-item p {
		font-family: 'Nunito Sans', sans-serif;
		font-size: var(--p-size);
		line-height: 1.6;
		color: var(--description);
		margin: 0;
	}

	.info-item a {
		color: var(--description);
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.info-item a:hover {
		color: var(--color-text);
	}

	.social-links {
		/* Using RAM pattern for social links */
	}

	.social-links a {
		display: inline-block;
		padding: var(--space-xs) var(--space-sm);
		position: relative;
		border-radius: var(--border-radius-sm);
		transition: all var(--transition-normal);
	}

	.social-links a:hover {
		background: rgba(251, 189, 46, 0.1);
		transform: translateY(-2px);
	}

	.social-links a::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 0;
		height: 2px;
		background-color: var(--accent);
		transition: width 0.3s ease;
	}

	.social-links a:hover::after {
		width: 100%;
	}

	.contact-form {
		background: var(--card-bg);
		border-radius: var(--border-radius-lg);
		padding: var(--space-xl);
		box-shadow: var(--shadow-lg);
		border: 1px solid var(--border-color);
	}

	.form-group {
		margin-bottom: 20px;
	}

	.form-group label {
		display: block;
		font-family: 'Nunito Sans', sans-serif;
		font-size: 16px;
		color: var(--color-text);
		margin-bottom: 8px;
	}

	.form-group input,
	.form-group textarea {
		width: 100%;
		padding: 12px 16px;
		background: var(--background);
		border: 1px solid var(--primary);
		border-radius: 4px;
		font-family: 'Nunito Sans', sans-serif;
		font-size: 16px;
		color: var(--color-text);
		transition:
			border-color 0.3s ease,
			box-shadow 0.3s ease;
	}

	.form-group input:focus,
	.form-group textarea:focus {
		outline: none;
		border-color: var(--accent);
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
		background: var(--primary);
		border: none;
		border-radius: 4px;
		font-family: 'Nunito Sans', sans-serif;
		font-size: 16px;
		font-weight: 600;
		color: var(--color-text);
		cursor: pointer;
		transition:
			background 0.3s ease,
			transform 0.3s ease;
		margin-top: 24px;
	}

	.submit-button:hover:not(:disabled) {
		background: var(--gruv-darkblue);
		transform: translateY(-2px);
	}

	.submit-button:disabled {
		background: #666;
		cursor: not-allowed;
	}

	.error-message {
		background: rgba(205, 36, 30, 0.1);
		border-left: 3px solid var(--gruv-red);
		padding: 12px 16px;
		font-family: 'Nunito Sans', sans-serif;
		font-size: 14px;
		color: var(--gruv-red);
		margin-bottom: 20px;
	}

	.success-message {
		background: rgba(69, 133, 136, 0.1);
		border-left: 3px solid var(--primary);
		padding: 12px 16px;
		font-family: 'Nunito Sans', sans-serif;
		font-size: 14px;
		color: var(--accent);
		margin-bottom: 20px;
	}

	@media (max-width: 768px) {
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
