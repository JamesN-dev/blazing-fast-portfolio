import { fail } from '@sveltejs/kit';
import { Resend } from 'resend';
import { RESEND_API_KEY } from '$env/static/private';

console.log('🔥🔥🔥 DID THIS FILE EVEN LOAD?');

const resend = new Resend(RESEND_API_KEY);

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		console.log('🚀 FORM ACTION CALLED!');
		const data = await request.formData();
		const name = data.get('name')?.toString().trim();
		const email = data.get('email')?.toString().trim();
		const message = data.get('message')?.toString().trim();

		// Validation
		if (!name) {
			return fail(400, { name, email, message, missing: 'name' });
		}
		if (!email) {
			return fail(400, { name, email, message, missing: 'email' });
		}
		if (!message) {
			return fail(400, { name, email, message, missing: 'message' });
		}

		// Basic email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return fail(400, { name, email, message, invalid: 'email' });
		}

		try {
			console.log('API Key loaded:', RESEND_API_KEY ? 'Yes' : 'No');
			console.log('Attempting to send email...');
			const result = await resend.emails.send({
				from: 'contact@blazingfast.app',
				to: 'jniemerg@gmail.com',
				subject: `New contact from ${name}`,
				html: `
					<h2>New contact form submission</h2>
					<p><strong>Name:</strong> ${name}</p>
					<p><strong>Email:</strong> ${email}</p>
					<p><strong>Message:</strong></p>
					<p>${message.replace(/\n/g, '<br>')}</p>
				`
			});

			console.log('Email sent successfully:', result);
			console.log('Resend result:', JSON.stringify(result, null, 2));
			return { success: true };
		} catch (error) {
			console.error('Email send error:', error);
			console.error('Error details:', error.message);
			return fail(500, { name, email, message, error: 'Failed to send email' });
		}
	}
};