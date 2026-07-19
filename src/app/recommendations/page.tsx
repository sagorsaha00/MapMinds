'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { fetchRecommendations } from '@/lib/ai';

const interestOptions = ['Beaches', 'Hiking', 'Culture', 'Nightlife', 'Food', 'Adventure', 'Relaxation', 'Wildlife'];
const budgetOptions = ['budget', 'moderate', 'luxury'];
const styleOptions = ['relaxed', 'balanced', 'adventure', 'family'];

const capitalize = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s);

function RecommendationsContent() {
  const { updatePreferences } = useAuth();
  const [interests, setInterests] = useState<string[]>([]);
  const [budgetRange, setBudgetRange] = useState('moderate');
  const [travelStyle, setTravelStyle] = useState('balanced');

  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [runCount, setRunCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    const userDataString = localStorage.getItem('MapMinds_user');
    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        if (userData?.preferences) {
          if (Array.isArray(userData.preferences.interests)) {
            setInterests(userData.preferences.interests.filter(Boolean).map(capitalize));
          }
          if (userData.preferences.budgetRange) setBudgetRange(userData.preferences.budgetRange);
          if (userData.preferences.travelStyle) setTravelStyle(userData.preferences.travelStyle);
        }
      } catch (err) {
        console.error("Error parsing user preferences from localStorage:", err);
      }
    }
  }, []);

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const generate = async () => {
    setError('');
    setIsLoading(true);
    setFeedback(null);

    const userDataString = localStorage.getItem('MapMinds_user');
    if (!userDataString) {
      setError('User session not found. Please log in again.');
      setIsLoading(false);
      return;
    }

    let userId = '';
    let currentUserData: any = {};
    try {
      currentUserData = JSON.parse(userDataString);
      userId = currentUserData.id || currentUserData._id;
    } catch (parseErr) {
      setError('Invalid user session. Please log in again.');
      setIsLoading(false);
      return;
    }

    if (!userId) {
      setError('User ID not found in session. Please log in again.');
      setIsLoading(false);
      return;
    }

    try {
      const formattedInterests = interests.map((i) => i.toLowerCase());

      if (updatePreferences) {
        // ১. এপিআই কল করে প্রেফারেন্স আপডেট করা
        const updatedUserResponse = await updatePreferences({
          interests: formattedInterests,
          budgetRange,
          travelStyle,
        });

        // 💡 ২. সুরক্ষার জন্য লোকালস্টোরেজের পুরাতন ডাটার সাথে নতুন ডাটা মার্জ করা, যাতে মেইন ডাটা ভ্যানিশ না হয়
        const freshUserData = {
          ...currentUserData,
          ...updatedUserResponse, // ব্যাকএন্ড যদি শুধু প্রপার্টি পাঠায় তাও মার্জ হবে, ফুল অবজেক্ট পাঠালেও মার্জ হবে
          preferences: {
            interests: formattedInterests,
            budgetRange,
            travelStyle,
          }
        };
        localStorage.setItem('MapMinds_user', JSON.stringify(freshUserData));
      }

      // এআই রিকমেন্ডেশন ফেচ করা (এখানে = ফিক্স করা ভার্সন কল হবে)
      const response = await fetchRecommendations(userId);
      const text = response?.recommendations || '';

      setRecommendations(
        text
          .split('\n')
          .map((line: string) => line.replace(/^[-*•\d.]\s*/, '').trim())
          .filter(Boolean)
      );

      setRunCount((c) => c + 1);
    } catch (err: any) {
      console.error("Client Generation Error:", err);
      setError(err?.response?.data?.message || err?.message || 'Failed to generate recommendations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedback = (value: 'up' | 'down') => {
    setFeedback(value);
    if (value === 'down') {
      generate();
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-10 py-16 font-body antialiased bg-stone/20 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="mb-10 text-center sm:text-left">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-neutral-100 text-neutral-800 border border-neutral-200/60 mb-3 shadow-sm">
            🧠 AI Engine v3
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-neutral-900 tracking-tighter mb-2">
            AI Trip Recommendations
          </h1>
          <p className="text-neutral-500 text-sm md:text-base font-medium">
            Tell us what you like, and we&apos;ll match you to destinations that perfectly fit your style.
          </p>
        </div>

        <div className="bg-white border border-neutral-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-6 md:p-10 space-y-8 mb-8">
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400">Select Interests</label>
            <div className="flex flex-wrap gap-2">
              {interestOptions.map((interest) => {
                const isSelected = interests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`text-xs font-bold uppercase tracking-wider rounded-full px-4 py-2.5 border transition-all duration-200 shadow-sm ${isSelected
                      ? 'bg-black text-white border-black'
                      : 'bg-neutral-50/60 text-neutral-600 border-neutral-200/70 hover:border-black'
                      }`}
                  >
                    {interest}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400">Budget Range</label>
              <div className="relative">
                <select
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  className="w-full bg-neutral-50/60 border border-neutral-200/70 rounded-full px-5 py-3 text-sm font-bold text-neutral-800 focus:outline-none focus:border-neutral-900 cursor-pointer appearance-none capitalize"
                >
                  {budgetOptions.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-400">↓</div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400">Travel Style</label>
              <div className="relative">
                <select
                  value={travelStyle}
                  onChange={(e) => setTravelStyle(e.target.value)}
                  className="w-full bg-neutral-50/60 border border-neutral-200/70 rounded-full px-5 py-3 text-sm font-bold text-neutral-800 focus:outline-none focus:border-neutral-900 cursor-pointer appearance-none capitalize"
                >
                  {styleOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-400">↓</div>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={generate}
              disabled={isLoading || interests.length === 0}
              className="group flex items-center justify-center gap-2 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-widest rounded-full py-4 w-full transition-colors shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Thinking...' : runCount === 0 ? 'Get Recommendations' : 'Refine & Regenerate'}
              {!isLoading && <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>}
            </button>
            {interests.length === 0 && (
              <p className="text-center text-[10px] font-bold uppercase tracking-wider text-red-500">
                ⚠️ Select at least one interest to continue.
              </p>
            )}
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold uppercase tracking-wider px-5 py-3.5 shadow-sm">
            ⚠️ {error}
          </div>
        )}

        {isLoading && (
          <div className="bg-white border border-neutral-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.01)] rounded-[2.5rem] p-8 space-y-4 animate-pulse">
            <div className="h-4 bg-neutral-100 rounded-full w-3/4" />
            <div className="h-4 bg-neutral-100 rounded-full w-full" />
            <div className="h-4 bg-neutral-100 rounded-full w-2/3" />
          </div>
        )}

        {!isLoading && recommendations.length > 0 && (
          <div className="bg-white border border-neutral-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-6 md:p-10 transition-all">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-6">Suggested Itineraries for you</h2>
            <ul className="space-y-4 mb-8">
              {recommendations.map((line, i) => (
                <li key={i} className="text-sm text-neutral-800 font-medium leading-relaxed pl-5 border-l-2 border-black/80">
                  {line}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row items-center justify-between border-t border-neutral-100 pt-6 gap-4">
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">Was this generation helpful?</p>
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={() => handleFeedback('up')}
                  className={`flex-1 sm:flex-none text-xs font-bold uppercase tracking-wider rounded-full px-5 py-2.5 border transition-colors ${feedback === 'up'
                    ? 'bg-black text-white border-black'
                    : 'bg-white border-neutral-200 text-neutral-600 hover:border-black'
                    }`}
                >
                  👍 Yes
                </button>
                <button
                  onClick={() => handleFeedback('down')}
                  className={`flex-1 sm:flex-none text-xs font-bold uppercase tracking-wider rounded-full px-5 py-2.5 border transition-colors ${feedback === 'down'
                    ? 'bg-black text-white border-black'
                    : 'bg-white border-neutral-200 text-neutral-600 hover:border-black'
                    }`}
                >
                  👎 Try again
                </button>
              </div>
            </div>
          </div>
        )}

        {!isLoading && recommendations.length === 0 && runCount === 0 && (
          <div className="bg-white border border-neutral-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.01)] rounded-[2.5rem] p-10 text-center text-neutral-400 font-medium text-sm">
            Select your travel preferences above and click generate to invoke custom AI trip ideas.
          </div>
        )}

        <p className="text-center text-xs font-semibold text-neutral-500 mt-8 uppercase tracking-wide">
          Want to explore on your own instead?{' '}
          <Link href="/explore" className="text-black hover:underline font-bold pl-1">
            Browse all trips
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function RecommendationsPage() {
  return (
    <ProtectedRoute>
      <RecommendationsContent />
    </ProtectedRoute>
  );
}