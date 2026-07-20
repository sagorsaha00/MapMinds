'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { fetchRecommendations } from '@/lib/ai';

// বাংলাদেশের কনটেক্সট অনুযায়ী ইন্টারেস্ট অপশনগুলো বাংলায়
const interestOptions = ['পাহাড় ট্র্যাকিং', 'সমুদ্র সৈকত', 'ঐতিহাসিক স্থান', 'খাবার ও ফুডি', 'অ্যাডভেঞ্চার', 'রিল্যাক্সেশন', 'সুন্দরবন ও বন্যপ্রাণী', 'চা বাগান'];
const budgetOptions = ['বাজেট ফ্রেন্ডলি', 'মাঝারি', 'লাক্সারি'];
const styleOptions = ['রিল্যাক্সড', 'ব্যালেন্সড', 'অ্যাডভেঞ্চারাস', 'ফ্যামিলি ট্যুর'];

// ম্যাপিং অবজেক্ট: বাংলায় সিলেক্ট করলেও ব্যাকএন্ড বা এআই ইঞ্জিনের সুবিধার্থে ইংলিশ ভ্যালু পাঠানো নিশ্চিত করবে
const budgetMapping: Record<string, string> = {
  'বাজেট ফ্রেন্ডলি': 'budget',
  'মাঝারি': 'moderate',
  'লাক্সারি': 'luxury'
};

const styleMapping: Record<string, string> = {
  'রিল্যাক্সড': 'relaxed',
  'ব্যালেন্সড': 'balanced',
  'অ্যাডভেঞ্চারাস': 'adventure',
  'ফ্যামিলি ট্যুর': 'family'
};

const interestMapping: Record<string, string> = {
  'পাহাড় ট্র্যাকিং': 'hiking',
  'সমুদ্র সৈকত': 'beaches',
  'ঐতিহাসিক স্থান': 'culture',
  'খাবার ও ফুডি': 'food',
  'অ্যাডভেঞ্চার': 'adventure',
  'রিল্যাক্সেশন': 'relaxation',
  'সুন্দরবন ও বন্যপ্রাণী': 'wildlife',
  'চা বাগান': 'tea garden'
};

const capitalize = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s);

function RecommendationsContent() {
  const { updatePreferences } = useAuth();
  const [interests, setInterests] = useState<string[]>([]);
  const [budgetRange, setBudgetRange] = useState('মাঝারি');
  const [travelStyle, setTravelStyle] = useState('ব্যালেন্সড');

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
            // পুরাতন ইংলিশ ডাটা থাকলে সেটাকে বাংলা লেবেলে কনভার্ট করে স্টেট সেট করা
            const reversedMapping = Object.fromEntries(Object.entries(interestMapping).map(([k, v]) => [v, k]));
            const mappedInterests = userData.preferences.interests
              .filter(Boolean)
              .map((i: string) => reversedMapping[i.toLowerCase()] || capitalize(i));
            setInterests(mappedInterests);
          }
          if (userData.preferences.budgetRange) {
            const reversedBudget = Object.fromEntries(Object.entries(budgetMapping).map(([k, v]) => [v, k]));
            setBudgetRange(reversedBudget[userData.preferences.budgetRange] || 'মাঝারি');
          }
          if (userData.preferences.travelStyle) {
            const reversedStyle = Object.fromEntries(Object.entries(styleMapping).map(([k, v]) => [v, k]));
            setTravelStyle(reversedStyle[userData.preferences.travelStyle] || 'ব্যালেন্সড');
          }
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
      setError('ইউজার সেশন পাওয়া যায়নি। অনুগ্রহ করে আবার লগইন করুন।');
      setIsLoading(false);
      return;
    }

    let userId = '';
    let currentUserData: any = {};
    try {
      currentUserData = JSON.parse(userDataString);
      userId = currentUserData.id || currentUserData._id;
    } catch (parseErr) {
      setError('অবৈধ ইউজার সেশন। অনুগ্রহ করে আবার লগইন করুন।');
      setIsLoading(false);
      return;
    }

    if (!userId) {
      setError('সেশনে ইউজার আইডি পাওয়া যায়নি। অনুগ্রহ করে আবার লগইন করুন।');
      setIsLoading(false);
      return;
    }

    try {
      // এআই বা ব্যাকএন্ডের জন্য ম্যাপিং অবজেক্ট থেকে ইংলিশ ভ্যালু জেনারেট করা
      const formattedInterests = interests.map((i) => interestMapping[i] || i.toLowerCase());
      const mappedBudget = budgetMapping[budgetRange] || budgetRange;
      const mappedStyle = styleMapping[travelStyle] || travelStyle;

      if (updatePreferences) {
        const updatedUserResponse = await updatePreferences({
          interests: formattedInterests,
          budgetRange: mappedBudget,
          travelStyle: mappedStyle,
        });

        const freshUserData = {
          ...currentUserData,
          ...updatedUserResponse,
          preferences: {
            interests: formattedInterests,
            budgetRange: mappedBudget,
            travelStyle: mappedStyle,
          }
        };
        localStorage.setItem('MapMinds_user', JSON.stringify(freshUserData));
      }

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
      setError(err?.response?.data?.message || err?.message || 'রিকমেন্ডেশন তৈরি করতে ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
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
            🧠 এআই ইঞ্জিন v3
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-neutral-900 tracking-tighter mb-2">
            এআই ট্রিপ রিকমেন্ডেশন
          </h1>
          <p className="text-neutral-500 text-sm md:text-base font-medium">
            আপনার পছন্দের ক্যাটাগরিগুলো সিলেক্ট করুন, এবং MapMinds আপনার ট্রাভেল স্টাইল অনুযায়ী বাংলাদেশের সেরা ডেস্টিনেশন খুঁজে দেবে।
          </p>
        </div>

        <div className="bg-white border border-neutral-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-6 md:p-10 space-y-8 mb-8">
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400">আপনার পছন্দসমূহ সিলেক্ট করুন</label>
            <div className="flex flex-wrap gap-2">
              {interestOptions.map((interest) => {
                const isSelected = interests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`text-xs font-bold rounded-full px-4 py-2.5 border transition-all duration-200 shadow-sm ${isSelected
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
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400">বাজেট কেমন?</label>
              <div className="relative">
                <select
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  className="w-full bg-neutral-50/60 border border-neutral-200/70 rounded-full px-5 py-3 text-sm font-bold text-neutral-800 focus:outline-none focus:border-neutral-900 cursor-pointer appearance-none"
                >
                  {budgetOptions.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-400">↓</div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400">ভ্রমণের ধরণ</label>
              <div className="relative">
                <select
                  value={travelStyle}
                  onChange={(e) => setTravelStyle(e.target.value)}
                  className="w-full bg-neutral-50/60 border border-neutral-200/70 rounded-full px-5 py-3 text-sm font-bold text-neutral-800 focus:outline-none focus:border-neutral-900 cursor-pointer appearance-none"
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
              {isLoading ? 'ম্যাপমাইন্ডস ভাবছে...' : runCount === 0 ? 'রিকমেন্ডেশন পান' : 'নতুন করে জেনারেট করুন'}
              {!isLoading && <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>}
            </button>
            {interests.length === 0 && (
              <p className="text-center text-[10px] font-bold uppercase tracking-wider text-red-500">
                ⚠️ সামনে এগোতে অন্তত একটি ক্যাটাগরি সিলেক্ট করুন।
              </p>
            )}
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold px-5 py-3.5 shadow-sm">
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
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-6">আপনার জন্য প্রস্তাবিত ট্যুর প্ল্যান</h2>
            <ul className="space-y-4 mb-8">
              {recommendations.map((line, i) => (
                <li key={i} className="text-sm text-neutral-800 font-medium leading-relaxed pl-5 border-l-2 border-black/80">
                  {line}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row items-center justify-between border-t border-neutral-100 pt-6 gap-4">
              <p className="text-xs font-bold text-neutral-400">এই ট্যুর আইডিয়াটি কি আপনার ভালো লেগেছে?</p>
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={() => handleFeedback('up')}
                  className={`flex-1 sm:flex-none text-xs font-bold rounded-full px-5 py-2.5 border transition-colors ${feedback === 'up'
                    ? 'bg-black text-white border-black'
                    : 'bg-white border-neutral-200 text-neutral-600 hover:border-black'
                    }`}
                >
                  👍 হ্যাঁ
                </button>
                <button
                  onClick={() => handleFeedback('down')}
                  className={`flex-1 sm:flex-none text-xs font-bold rounded-full px-5 py-2.5 border transition-colors ${feedback === 'down'
                    ? 'bg-black text-white border-black'
                    : 'bg-white border-neutral-200 text-neutral-600 hover:border-black'
                    }`}
                >
                  👎 আবার চেষ্টা করুন
                </button>
              </div>
            </div>
          </div>
        )}

        {!isLoading && recommendations.length === 0 && runCount === 0 && (
          <div className="bg-white border border-neutral-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.01)] rounded-[2.5rem] p-10 text-center text-neutral-400 font-medium text-sm">
            উপরের অপশনগুলো থেকে আপনার পছন্দ সিলেক্ট করে কাস্টম এআই ট্রিপ আইডিয়া জেনারেট করুন।
          </div>
        )}

        <p className="text-center text-xs font-semibold text-neutral-500 mt-8 tracking-wide">
          নিজে নিজেই ঘুরে দেখতে চান?{' '}
          <Link href="/explore" className="text-black hover:underline font-bold pl-1">
            সবগুলো ট্রিপ ব্রাউজ করুন
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