'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const validate = () => {
    if (!form.name.trim()) return 'Name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Enter a valid email address';
    if (!form.subject.trim()) return 'Subject is required';
    if (!form.message.trim() || form.message.length < 10) return 'Message must be at least 10 characters';
    return '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="container-page py-12">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">Get in touch</h1>
        <p className="text-neutral-600">Questions, feedback, or partnership ideas — we read every message.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div className="md:col-span-2 card p-6">
          {submitted ? (
            <div className="text-center py-10">
              <div className="text-3xl mb-3">✅</div>
              <h2 className="font-semibold text-neutral-900 mb-2">Message sent</h2>
              <p className="text-neutral-600 text-sm">Thanks for reaching out — we&apos;ll reply within 1-2 business days.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">{error}</div>
              )}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Name</label>
                  <input value={form.name} onChange={(e) => handleChange('name', e.target.value)} className="w-full rounded-lg border border-neutral-200 px-4 py-2.5" placeholder="Jordan Rivers" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
                  <input type="email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} className="w-full rounded-lg border border-neutral-200 px-4 py-2.5" placeholder="you@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Subject</label>
                <input value={form.subject} onChange={(e) => handleChange('subject', e.target.value)} className="w-full rounded-lg border border-neutral-200 px-4 py-2.5" placeholder="How can we help?" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Message</label>
                <textarea value={form.message} onChange={(e) => handleChange('message', e.target.value)} rows={5} className="w-full rounded-lg border border-neutral-200 px-4 py-2.5" placeholder="Tell us what's on your mind..." />
              </div>
              <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-60">
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>

        <div className="space-y-4">
          <div className="card p-5">
            <h3 className="font-semibold text-neutral-900 mb-1">Email</h3>
            <p className="text-sm text-neutral-600">support@MapMinds.ai</p>
          </div>
          <div className="card p-5">
            <h3 className="font-semibold text-neutral-900 mb-1">Phone</h3>
            <p className="text-sm text-neutral-600">+1 (555) 012-3456</p>
          </div>
          <div className="card p-5">
            <h3 className="font-semibold text-neutral-900 mb-1">Office</h3>
            <p className="text-sm text-neutral-600">548 Market Street, San Francisco, CA 94104</p>
          </div>
          <div className="card p-5">
            <h3 className="font-semibold text-neutral-900 mb-1">Follow us</h3>
            <div className="flex gap-3 text-sm">
              <a href="https://twitter.com" className="text-primary hover:underline">Twitter</a>
              <a href="https://instagram.com" className="text-primary hover:underline">Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
