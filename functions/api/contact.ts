// functions/api/contact.ts
// Replaces Contact Form 7 — POST handler
// Sends email via Resend API (100 emails/day free)

interface Env {
  RESEND_API_KEY: string;
}

interface ContactBody {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  try {
    const body: ContactBody = await request.json();
    const { name, email, subject = 'Contact Form Submission', message } = body;

    // Basic validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return Response.json({ success: false, error: 'Missing required fields.' }, { status: 400, headers });
    }

    // Email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({ success: false, error: 'Invalid email address.' }, { status: 400, headers });
    }

    // Send via Resend (or log in dev if no API key)
    if (env.RESEND_API_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'contact@fotisp.gr',
          to: 'info@fotisp.gr',
          reply_to: email,
          subject: `[Contact] ${subject}`,
          text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        }),
      });
    } else {
      console.log('[DEV] Contact form submission:', { name, email, subject, message });
    }

    return Response.json({ success: true }, { headers });
  } catch (err) {
    return Response.json({ success: false, error: 'Server error.' }, { status: 500, headers });
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
