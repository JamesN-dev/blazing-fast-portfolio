<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { Github, Linkedin, Mail, MapPin, Twitter } from '@lucide/svelte';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { toast, Toaster } from 'svelte-sonner';

	let visible = $state(false);

	// Yup validation schema
	const schema = yup.object({
		name: yup.string().required('Please enter your name').trim(),
		email: yup
			.string()
			.required('Please enter your email')
			.email('Please enter a valid email address'),
		message: yup.string().required('Please enter your message').trim()
	});

	let hasSubmitted = false;

	// Create form with Felte - no validation, just form handling
	const { form, isSubmitting } = createForm({
		onSubmit: (values, { form: formElement }) => {
			// Let the browser handle the actual submission to Formspree
			// Success toast is handled in handleFormSubmit
		}
	});

	// Function to handle form submission attempts
	function handleFormSubmit(event) {
		hasSubmitted = true;
		
		// Get current form values
		const formData = new FormData(event.target);
		const name = formData.get('name')?.toString().trim() || '';
		const email = formData.get('email')?.toString().trim() || '';
		const message = formData.get('message')?.toString().trim() || '';
		
		// Check for missing fields and show toasts
		if (!name) {
			event.preventDefault();
			toast.error("You forgot your name");
			return;
		}
		if (!email) {
			event.preventDefault();
			toast.error("You forgot your email");
			return;
		}
		if (!message) {
			event.preventDefault();
			toast.error("You forgot your message");
			return;
		}
		
		// If we get here, all fields are filled
		// Show success toast immediately since validation passed
		toast.success("Message sent! Check your email for confirmation.");
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
					<div class="info-header">
						<Mail size={20} />
						<h3>Email</h3>
					</div>
					<p><a href="mailto:james@jamesn.design">james@jamesn.design</a></p>
				</div>

				<div class="info-item">
					<div class="info-header">
						<MapPin size={20} />
						<h3>Location</h3>
					</div>
					<p>Central/Southern Illinois, USA</p>
				</div>

				<div class="info-item">
					<div class="info-header">
						<Github size={20} />
						<h3>Social</h3>
					</div>
					<div class="social-links">
						<a href="https://github.com/Jamesn-dev" target="_blank" rel="noopener noreferrer" class="social-link">
							<Github size={20} />
							<span>GitHub</span>
						</a>
						<a href="https://linkedin.com/in/james-niemerg" target="_blank" rel="noopener noreferrer" class="social-link">
							<Linkedin size={20} />
							<span>LinkedIn</span>
						</a>
						<a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer" class="social-link">
							<Twitter size={20} />
							<span>Twitter</span>
						</a>
					</div>
				</div>
			</div>

			<div class="contact-form">
				<form use:form action="https://formspree.io/f/mqabbzdq" method="POST" on:submit={handleFormSubmit}>
					<div class="form-group">
						<label for="name">Name</label>
						<input
							type="text"
							id="name"
							name="name"
							placeholder="Your name"
							disabled={$isSubmitting}
						/>
					</div>

					<div class="form-group">
						<label for="email">Email</label>
						<input
							type="email"
							id="email"
							name="email"
							placeholder="Your email"
							disabled={$isSubmitting}
						/>
					</div>

					<div class="form-group">
						<label for="message">Message</label>
						<textarea
							id="message"
							name="message"
							placeholder="What would you like to discuss?"
							rows="6"
							disabled={$isSubmitting}
						></textarea>
					</div>

					<button type="submit" class="submit-button" disabled={$isSubmitting}>
						{$isSubmitting ? 'Sending...' : 'Send Message'}
					</button>
				</form>
			</div>
		</div>
	{/if}
</div>

<!-- Toast notifications -->
<Toaster 
	theme="dark"
	position="top-right"
	offset="calc(var(--header-height) + 1rem)"
	duration={4000}
	toastOptions={{
		style: `
			background: rgba(40, 40, 40, 0.4);
			color: #fbf1c7;
			border-radius: 8px;
			backdrop-filter: blur(12px);
			box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
			border: 1px solid rgba(69, 133, 136, 0.3);
			font-family: 'Nunito Sans', sans-serif;
			min-width: 280px;
			padding: 12px 16px;
		`,
		classes: {
			success: 'toast-success-custom',
			error: 'toast-error-custom'
		}
	}}
/>

<style>
	.contact-container {
		width: 90%;
		max-width: var(--max-width);
		margin: 0 auto;
		padding: calc(var(--header-height) + 2rem) var(--space-6) var(--space-8);
	}

	.contact-header {
		text-align: center;
		margin-bottom: var(--space-16);
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
		gap: var(--space-8);
		align-items: start;
		container-type: inline-size;
	}

	/* Mobile: Form first, then contact info */
	@container (max-width: 750px) {
		.contact-form {
			order: 1;
		}
		
		.contact-info {
			order: 2;
		}
	}

	.contact-info {
		display: flex;
		flex-direction: column;
		gap: var(--space-8);
		padding: var(--space-4);
	}

	.info-header {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		margin-bottom: var(--space-4);
	}

	.info-header h3 {
		font-family: 'Nunito Sans', sans-serif;
		font-size: var(--h5);
		color: var(--accent);
		margin: 0;
	}

	.info-item p {
		font-family: 'Nunito Sans', sans-serif;
		font-size: var(--p);
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
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		align-items: flex-start;
	}

	.social-link {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-3) var(--space-4);
		background: rgba(69, 133, 136, 0.1);
		border: 1px solid var(--primary);
		border-radius: var(--border-radius-sm);
		color: var(--description) !important;
		text-decoration: none;
		transition: all var(--transition-normal);
		font-size: 16px;
		font-weight: 500;
		width: 130px;
	}

	.social-link:hover {
		background: rgba(251, 189, 46, 0.1);
		border-color: var(--accent);
		color: var(--color-text) !important;
		transform: translateY(-2px);
	}

	.social-link span {
		font-family: 'Nunito Sans', sans-serif;
	}

	.social-link :global(svg) {
		flex-shrink: 0;
		width: 20px;
		height: 20px;
	}

	.contact-form {
		background: #333333;
		border-radius: var(--border-radius-lg);
		padding: var(--space-8);
		box-shadow: var(--shadow-lg);
		border: 1px solid var(--primary);
	}

	.form-group {
		margin-bottom: var(--space-6);
	}

	.form-group label {
		display: block;
		font-family: 'Nunito Sans', sans-serif;
		font-size: 16px;
		color: var(--color-text);
		margin-bottom: var(--space-3);
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
		margin-top: var(--space-6);
	}

	.submit-button:hover:not(:disabled) {
		background: var(--gruv-darkblue);
		transform: translateY(-2px);
	}

	.submit-button:disabled {
		background: #666;
		cursor: not-allowed;
	}

	.field-error {
		font-family: 'Nunito Sans', sans-serif;
		font-size: 14px;
		color: var(--gruv-red);
		margin-top: var(--space-2);
		padding-left: var(--space-1);
	}

	:global(.toast-success-custom) {
		background: rgba(69, 133, 136, 0.4) !important;
		border: 1px solid var(--primary) !important;
		color: #fbf1c7 !important;
	}

	:global(.toast-error-custom) {
		background: rgba(204, 36, 29, 0.4) !important;
		border: 1px solid var(--gruv-red) !important;
		color: #fbf1c7 !important;
	}

</style>
