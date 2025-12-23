'use client';

import { useState } from 'react';
import { z } from 'zod';

// Form validation schema (matching the API schema)
const contactSchema = z.object({
  name: z.string().min(2, 'Name muss mindestens 2 Zeichen lang sein'),
  email: z.string().email('Ungültige E-Mail-Adresse'),
  message: z.string().min(10, 'Nachricht muss mindestens 10 Zeichen lang sein'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });
    setErrors({});

    try {
      // Validate form data
      const validatedData = contactSchema.parse(formData);

      // Send to API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Vielen Dank! Deine Nachricht wurde erfolgreich gesendet.',
        });
        // Reset form
        setFormData({ name: '', email: '', message: '' });
      } else {
        if (result.errors) {
          // Handle validation errors from server
          const fieldErrors: Partial<ContactFormData> = {};
          result.errors.forEach((error: any) => {
            fieldErrors[error.path[0] as keyof ContactFormData] = error.message;
          });
          setErrors(fieldErrors);
        } else {
          setSubmitStatus({
            type: 'error',
            message: result.message || 'Ein Fehler ist aufgetreten. Bitte versuche es später erneut.',
          });
        }
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle client-side validation errors
        const fieldErrors: Partial<ContactFormData> = {};
        error.issues.forEach((err) => {
          fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        setSubmitStatus({
          type: 'error',
          message: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es später erneut.',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Dein Name"
          className={`w-full rounded-lg border bg-background px-4 py-3 text-sm text-foreground focus:border-ring focus:outline-none ${
            errors.name ? 'border-destructive' : 'border-border'
          }`}
          disabled={isSubmitting}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-destructive">{errors.name}</p>
        )}
      </div>

      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Deine Email"
          className={`w-full rounded-lg border bg-background px-4 py-3 text-sm text-foreground focus:border-ring focus:outline-none ${
            errors.email ? 'border-destructive' : 'border-border'
          }`}
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-destructive">{errors.email}</p>
        )}
      </div>

      <div>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Deine Nachricht"
          rows={5}
          className={`w-full rounded-lg border bg-background px-4 py-3 text-sm text-foreground focus:border-ring focus:outline-none ${
            errors.message ? 'border-destructive' : 'border-border'
          }`}
          disabled={isSubmitting}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-destructive">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}
      </button>

      {submitStatus.type && (
        <div
          className={`mt-4 rounded-lg p-4 text-sm ${
            submitStatus.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {submitStatus.message}
        </div>
      )}
    </form>
  );
}