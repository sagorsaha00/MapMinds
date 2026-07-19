'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const { login, demoLogin, googleLogin } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    if (!email.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Enter a valid email address';
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

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
      await login(email, password);
      router.push('/');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = async () => {
    setEmail('demo@MapMinds.ai');
    setPassword('Demo@1234');
    setError('');
    setIsSubmitting(true);
    try {
      await demoLogin();
      router.push('/');
    } catch {
      setError('Demo login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    setError('');
    try {
      if (!credentialResponse.credential) throw new Error('No credential returned');
      await googleLogin(credentialResponse.credential);
      router.push('/');
    } catch {
      setError('Google sign-in failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-stone/25 font-body antialiased">

      {/* 🏞️ বাম পাশ: প্রিমিয়াম ট্রাভেল ব্যাকগ্রাউন্ড ইমেজ সেকশন */}
      <div className="hidden lg:flex lg:col-span-5 relative items-end p-12 bg-neutral-900 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80')`
          }}
        />
        {/* লাক্সারি ডার্ক ওভারলে গ্রেডিয়েন্ট */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* ইমেজ টেক্সট */}
        <div className="relative z-10 max-w-sm text-white space-y-3">
          <span className="inline-block text-[10px] font-bold uppercase tracking-widest bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
            ⛰️ Adventure Awaits
          </span>
          <h2 className="font-display text-3xl font-semibold tracking-tight leading-tight">
            Your next journey begins here.
          </h2>
          <p className="text-white/70 text-sm font-medium">
            Log back in to access your curated itineraries, dynamic travel dashboards, and AI companion.
          </p>
        </div>
      </div>

      {/* 📝 ডান পাশ: এলিগ্যান্ট ফ্লোটিং লগইন ফর্ম */}
      <div className="col-span-1 lg:col-span-7 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md bg-white border border-neutral-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 transition-all">

          {/* হেডার */}
          <div className="mb-8">
            <h1 className="font-display text-3xl font-semibold text-neutral-900 tracking-tighter mb-1.5">
              Welcome back
            </h1>
            <p className="text-neutral-500 text-sm font-medium">
              Log in to continue planning your trips.
            </p>
          </div>

          {/* এরর এলার্ট */}
          {error && (
            <div className="mb-5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold uppercase tracking-wider px-4 py-3 shadow-sm">
              ⚠️ {error}
            </div>
          )}

          {/* ফর্ম বডি */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-neutral-50/60 border border-neutral-200/70 rounded-full px-5 py-2.5 text-sm font-medium transition-colors focus:outline-none focus:border-neutral-900"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-neutral-50/60 border border-neutral-200/70 rounded-full px-5 py-2.5 text-sm font-medium transition-colors focus:outline-none focus:border-neutral-900"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group flex items-center justify-center gap-2 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-widest rounded-full py-3.5 w-full transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isSubmitting ? 'Logging in...' : 'Log In'}
              {!isSubmitting && <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>}
            </button>
          </form>

          {/* ডেমো লগইন বাটন */}
          <button
            onClick={handleDemoLogin}
            disabled={isSubmitting}
            className="w-full mt-3 border border-neutral-200 hover:border-black text-neutral-800 text-xs font-bold uppercase tracking-widest rounded-full py-3.5 transition-colors disabled:opacity-50"
          >
            Try Demo Login
          </button>

          {/* ডিভাইডার */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-neutral-100" />
            <span className="text-[10px] font-bold tracking-wider text-neutral-400">OR WITH</span>
            <div className="flex-1 h-px bg-neutral-100" />
          </div>

          {/* গুগল সাইন ইন */}
          <div className="flex justify-center [&_iframe]:!rounded-full overflow-hidden">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError('Google sign-in failed. Please try again.')}
            />
          </div>

          {/* ফুটার লিঙ্ক */}
          <p className="text-center text-xs font-semibold text-neutral-500 mt-8 uppercase tracking-wide">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-black hover:underline font-bold pl-1">
              Sign up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}