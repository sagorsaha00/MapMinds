'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

const loggedOutLinks = [
  { href: '/', label: 'Home' },
  { href: '/explore', label: 'Explore' },
  { href: '/about', label: 'About' },
];

const loggedInLinks = [
  { href: '/', label: 'Home' },
  { href: '/explore', label: 'Explore' },
  { href: '/recommendations', label: 'For You' },
  { href: '/items/add', label: 'Add Trip' },
  { href: '/items/manage', label: 'My Trips' },
  { href: '/assistant', label: 'AI Assistant' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const isLoggedIn = !!user;

  const links = isLoggedIn ? loggedInLinks : loggedOutLinks;

  return (
    // জাস্ট স্ক্রিনের উপরে ফ্লোট করার জন্য fixed/sticky এবং w-full এর সাথে max-w-[80%] ও mx-auto ব্যবহার করা হয়েছে
    <header className="fixed top-4 left-0 right-0 z-50 w-[92%] md:w-[80%] max-w-[1300px] mx-auto bg-white/70 backdrop-blur-xl border border-sand/60 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.04)] transition-all duration-300">
      <nav className="px-6 md:px-8 flex items-center justify-between h-[64px]">

        {/* লোগো সেকশন */}
        <Link href="/" className="font-display text-lg md:text-xl font-bold text-ink tracking-tight shrink-0">
          Map<span className="italic text-ember">Minds</span>
        </Link>

        {/* মাঝখানের মেনু লিংকস */}
        <div className="hidden md:flex items-center gap-1 bg-neutral-100/50 p-1 rounded-full border border-neutral-200/20">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-1.5 text-xs font-semibold tracking-wide text-ink/75 hover:text-ink rounded-full hover:bg-white transition-all font-body"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* ডানপাশের অ্যাকশন বাটন */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {isLoggedIn ? (
            <button
              className="text-xs font-bold uppercase tracking-wider text-ink/80 border border-sand bg-white/50 rounded-full px-5 py-2 hover:bg-white hover:text-ink transition-all shadow-sm"
              onClick={logout}
            >
              Logout
            </button>
          ) : (
            <>
              <Link href="/login" className="text-xs font-bold uppercase tracking-wider text-ink/70 hover:text-ink px-2 transition-colors">
                Login
              </Link>
              <Link
                href="/register"
                className="group inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-black text-white rounded-full pl-5 pr-2 py-2 hover:bg-neutral-900 transition-all shadow-md"
              >
                Sign up
                <span className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center text-[10px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                  ↗
                </span>
              </Link>
            </>
          )}
        </div>

        {/* মোবাইল হ্যামবার্গার মেনু বাটন */}
        <button
          className="md:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-1.5 bg-black-100/30 rounded-full transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-4 h-[1.5px] bg-ink transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-[4.5px]' : ''}`}
          />
          <span className={`block w-4 h-[1.5px] bg-ink transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <span
            className={`block w-4 h-[1.5px] bg-ink transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-[4.5px]' : ''}`}
          />
        </button>
      </nav>

      {/* মোবাইল রেসপন্সিভ ড্রপডাউন মেনু (চরম রাউন্ডেড কোণা সহ) */}
      {isOpen && (
        <div className="md:hidden border-t border-sand/40 bg-white/95 backdrop-blur-2xl rounded-[2rem] absolute top-[74px] left-0 right-0 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="p-5 flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-3 text-sm text-ink/75 hover:text-ink font-semibold rounded-xl hover:bg-neutral-50 font-body transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="h-px bg-sand/40 my-3" />

            {isLoggedIn ? (
              <button
                className="text-left px-4 py-3 text-sm font-bold text-ink/75 hover:text-ink transition-colors"
                onClick={() => {
                  setIsOpen(false);
                  logout();
                }}
              >
                Logout
              </button>
            ) : (
              <div className="flex flex-col gap-2 pt-1">
                <Link
                  href="/login"
                  className="px-4 py-3 text-sm font-bold text-ink/75 text-center hover:bg-neutral-50 rounded-xl transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-center bg-black text-white text-xs font-bold uppercase tracking-wider rounded-full py-3.5 transition-colors shadow-md"
                  onClick={() => setIsOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}