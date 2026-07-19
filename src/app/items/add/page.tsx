'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { createTrip } from '@/lib/trips';

const categories = ['Beach', 'Mountain', 'City', 'Adventure', 'Cultural', 'Wildlife'];

function AddItemForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    destination: '',
    category: categories[0],
    city: '',
    country: '',
    price: '',
    duration: '',
    shortDescription: '',
    fullDescription: '',
    imageUrl: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setuserId] = useState<string>('');

  const handleChange = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const validate = () => {
    if (!form.title.trim()) return 'Title is required';
    if (!form.destination.trim()) return 'Destination is required';
    if (!form.city.trim() || !form.country.trim()) return 'City and country are required';
    if (!form.shortDescription.trim()) return 'Short description is required';
    if (form.shortDescription.length > 200) return 'Short description must be under 200 characters';
    if (!form.fullDescription.trim()) return 'Full description is required';
    if (!form.price || Number(form.price) <= 0) return 'Enter a valid price';
    if (!form.duration || Number(form.duration) <= 0) return 'Enter a valid duration in days';
    return '';
  };

  useEffect(() => {
    const userDataString = localStorage.getItem('MapMinds_user');
    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        setuserId(userData.id);
      } catch (parseErr) {
        setError('Invalid user session. Please log in again.');
      }
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');


    setIsSubmitting(true);

    try {

      const trip = await createTrip({
        title: form.title,
        destination: form.destination,
        category: form.category,
        location: { city: form.city, country: form.country },
        price: Number(form.price),
        duration: Number(form.duration),
        shortDescription: form.shortDescription,
        fullDescription: form.fullDescription,
        images: form.imageUrl ? [form.imageUrl] : [],
        createdBy: userId,
      });

      router.push(`/`);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to create trip. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-10 py-16 font-body antialiased bg-stone/20 min-h-screen">
      <div className="max-w-2xl mx-auto">

        {/* লাক্সারি সেকশন হেডার */}
        <div className="mb-10 text-center sm:text-left">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-neutral-100 text-neutral-800 border border-neutral-200/60 mb-3 shadow-sm">
            🌐 Share Experience
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-neutral-900 tracking-tighter mb-2">
            Add a New Trip
          </h1>
          <p className="text-neutral-500 text-sm md:text-base font-medium">
            Publish an elite itinerary for other passionate travelers to discover and explore.
          </p>
        </div>

        {/* এরর মেসেজ বক্স */}
        {error && (
          <div className="mb-6 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold uppercase tracking-wider px-5 py-3.5 shadow-sm">
            ⚠️ {error}
          </div>
        )}

        {/* ফর্ম বডি */}
        <form onSubmit={handleSubmit} className="bg-white border border-neutral-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-6 md:p-10 space-y-6">

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400">Trip Title</label>
            <input
              value={form.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full bg-neutral-50/60 border border-neutral-200/70 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-neutral-900 font-medium transition-colors"
              placeholder="e.g., 7 Days in the Swiss Alps"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400">Destination</label>
              <input
                value={form.destination}
                onChange={(e) => handleChange('destination', e.target.value)}
                className="w-full bg-neutral-50/60 border border-neutral-200/70 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-neutral-900 font-medium transition-colors"
                placeholder="Swiss Alps"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400">Category</label>
              <div className="relative">
                <select
                  value={form.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className="w-full bg-neutral-50/60 border border-neutral-200/70 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-neutral-900 cursor-pointer appearance-none font-bold text-neutral-800"
                >
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-400">↓</div>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400">City</label>
              <input
                value={form.city}
                onChange={(e) => handleChange('city', e.target.value)}
                className="w-full bg-neutral-50/60 border border-neutral-200/70 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-neutral-900 font-medium transition-colors"
                placeholder="Interlaken"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400">Country</label>
              <input
                value={form.country}
                onChange={(e) => handleChange('country', e.target.value)}
                className="w-full bg-neutral-50/60 border border-neutral-200/70 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-neutral-900 font-medium transition-colors"
                placeholder="Switzerland"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400">Price (USD)</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => handleChange('price', e.target.value)}
                className="w-full bg-neutral-50/60 border border-neutral-200/70 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-neutral-900 font-medium transition-colors"
                placeholder="1200"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400">Duration (days)</label>
              <input
                type="number"
                value={form.duration}
                onChange={(e) => handleChange('duration', e.target.value)}
                className="w-full bg-neutral-50/60 border border-neutral-200/70 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-neutral-900 font-medium transition-colors"
                placeholder="7"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="flex justify-between text-xs font-bold uppercase tracking-wider text-neutral-400">
              <span>Short Description</span>
              <span className="text-neutral-300 font-medium">max 200 chars</span>
            </label>
            <textarea
              value={form.shortDescription}
              onChange={(e) => handleChange('shortDescription', e.target.value)}
              maxLength={200}
              rows={2}
              className="w-full bg-neutral-50/60 border border-neutral-200/70 rounded-3xl px-5 py-3.5 text-sm focus:outline-none focus:border-neutral-900 font-medium transition-colors resize-none"
              placeholder="A quick highlight travelers will see on the trip card..."
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400">Full Experience Description</label>
            <textarea
              value={form.fullDescription}
              onChange={(e) => handleChange('fullDescription', e.target.value)}
              rows={5}
              className="w-full bg-neutral-50/60 border border-neutral-200/70 rounded-3xl px-5 py-4 text-sm focus:outline-none focus:border-neutral-900 font-medium transition-colors"
              placeholder="Describe the full experience, daily highlights, amenities, and what's included..."
            />
          </div>

          <div className="space-y-1.5">
            <label className="flex justify-between text-xs font-bold uppercase tracking-wider text-neutral-400">
              <span>Image URL</span>
              <span className="text-neutral-300 font-medium">optional</span>
            </label>
            <input
              value={form.imageUrl}
              onChange={(e) => handleChange('imageUrl', e.target.value)}
              className="w-full bg-neutral-50/60 border border-neutral-200/70 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-neutral-900 font-medium transition-colors"
              placeholder="https://images.unsplash.com/your-premium-photo.jpg"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="group flex items-center justify-center gap-2 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-widest rounded-full py-4 w-full transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Publishing...' : 'Publish Itinerary'}
            {!isSubmitting && <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>}
          </button>
        </form>

      </div>
    </div>
  );
}

export default function AddItemPage() {
  return (
    <ProtectedRoute>
      <AddItemForm />
    </ProtectedRoute>
  );
}