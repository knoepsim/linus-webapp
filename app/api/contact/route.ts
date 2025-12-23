import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

// Form validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name muss mindestens 2 Zeichen lang sein'),
  email: z.string().email('Ungültige E-Mail-Adresse'),
  message: z.string().min(10, 'Nachricht muss mindestens 10 Zeichen lang sein'),
});

// Rate limiting storage
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Rate limit configurations
const RATE_LIMITS = {
  // 10 messages per hour per IP
  ip: { maxRequests: 10, windowMs: 60 * 60 * 1000 },
  // 5 messages per day per email
  email: { maxRequests: 5, windowMs: 24 * 60 * 60 * 1000 },
};

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 60000); // Clean up every minute

function checkRateLimit(identifier: string, limit: typeof RATE_LIMITS.ip): boolean {
  const now = Date.now();
  const key = `${identifier}:${limit.windowMs}`;
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetTime) {
    // First request or window expired
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + limit.windowMs,
    });
    return true;
  }

  if (entry.count >= limit.maxRequests) {
    return false; // Rate limit exceeded
  }

  entry.count++;
  return true;
}

function getRemainingTime(identifier: string, limit: typeof RATE_LIMITS.ip): number {
  const key = `${identifier}:${limit.windowMs}`;
  const entry = rateLimitStore.get(key);
  if (!entry) return 0;

  const remaining = entry.resetTime - Date.now();
  return Math.max(0, Math.ceil(remaining / 1000 / 60)); // minutes
}

// SMTP configuration
const smtpConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
};

export async function POST(request: NextRequest) {
  try {
    // Get client IP
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';

    // Get request body for email extraction
    const body = await request.json();
    const email = body.email;

    // Check rate limits
    if (!checkRateLimit(`ip:${ip}`, RATE_LIMITS.ip)) {
      const remainingMinutes = getRemainingTime(`ip:${ip}`, RATE_LIMITS.ip);
      return NextResponse.json(
        {
          message: `Zu viele Nachrichten von dieser IP-Adresse. Bitte warten Sie ${remainingMinutes} Minuten.`,
        },
        { status: 429 }
      );
    }

    if (email && !checkRateLimit(`email:${email}`, RATE_LIMITS.email)) {
      const remainingMinutes = getRemainingTime(`email:${email}`, RATE_LIMITS.email);
      return NextResponse.json(
        {
          message: `Zu viele Nachrichten von dieser E-Mail-Adresse. Bitte warten Sie ${remainingMinutes} Minuten.`,
        },
        { status: 429 }
      );
    }

    // Validate form data
    const validatedData = contactSchema.parse(body);
    const { name, email: validatedEmail, message } = validatedData;

    // Create transporter
    const transporter = nodemailer.createTransport(smtpConfig);

    // Email options
    const mailOptions = {
      from: `"Lifelinus Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || 'hello@lifelinus.de',
      replyTo: validatedEmail, // Set reply-to to the sender's email
      subject: `Neue Kontaktanfrage von ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Neue Kontaktanfrage</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>E-Mail:</strong> ${validatedEmail}</p>
            <p><strong>Nachricht:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #007bff;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #666; font-size: 12px;">
            Diese E-Mail wurde über das Kontaktformular der Lifelinus-Website gesendet.
          </p>
        </div>
      `,
      text: `
Neue Kontaktanfrage

Name: ${name}
E-Mail: ${validatedEmail}

Nachricht:
${message}

---
Diese E-Mail wurde über das Kontaktformular der Lifelinus-Website gesendet.
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Nachricht erfolgreich gesendet!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Validierungsfehler', errors: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Fehler beim Senden der Nachricht. Bitte versuche es später erneut.' },
      { status: 500 }
    );
  }
}