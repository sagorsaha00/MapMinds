import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-sand text-ink/60 font-body antialiased">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16">

        {/* মেইন ফুটার গ্রিড লেআউট */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-sand">

          {/* ব্র্যান্ড ইনফো ও সোশ্যাল আইকন (4 Columns) */}
          <div className="lg:col-span-4 space-y-5">
            <h3 className="font-display text-2xl font-semibold text-ink tracking-tight">
              Trail<span className="italic text-ember">Mind</span>
            </h3>
            <p className="text-sm leading-relaxed max-w-xs text-ink/60 font-medium">
              AI-powered travel planning that turns your preferences into personalized itineraries —
              built around how you actually like to travel.
            </p>

            {/* ফিক্সড সোশ্যাল আইকন লিংক সমূহ */}
            <div className="flex gap-3 pt-2">
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-sand flex items-center justify-center text-ink/60 hover:text-ember hover:border-ember transition-colors"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>

              <a
                href="https://twitter.com"
                aria-label="Twitter"
                className="w-9 h-9 rounded-full border border-sand flex items-center justify-center text-ink/60 hover:text-ember hover:border-ember transition-colors"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M20 5.5c-.7.3-1.4.5-2.2.6.8-.5 1.4-1.2 1.6-2.1-.7.4-1.6.8-2.4.9a3.7 3.7 0 0 0-6.3 3.4A10.5 10.5 0 0 1 3.2 4.5a3.7 3.7 0 0 0 1.1 5 3.6 3.6 0 0 1-1.6-.4v.1a3.7 3.7 0 0 0 2.9 3.6c-.5.1-1 .2-1.6.1a3.7 3.7 0 0 0 3.4 2.6A7.4 7.4 0 0 1 2 17a10.5 10.5 0 0 0 5.7 1.7c6.8 0 10.6-5.8 10.6-10.8v-.5c.7-.5 1.4-1.2 1.9-2Z" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          {/* এক্সপ্লোর লিংকস (2 Columns) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink/40 mb-4">Explore</h4>
            <ul className="space-y-3 text-sm font-medium text-ink/75">
              <li><Link href="/explore" className="hover:text-ember transition-colors">All trips</Link></li>
              <li><Link href="/assistant" className="hover:text-ember transition-colors">AI assistant</Link></li>
              <li><Link href="/items/add" className="hover:text-ember transition-colors">Plan a trip</Link></li>
            </ul>
          </div>

          {/* কোম্পানি লিংকস (3 Columns) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink/40 mb-4">Company</h4>
            <ul className="space-y-3 text-sm font-medium text-ink/75">
              <li><Link href="/about" className="hover:text-ember transition-colors">About us</Link></li>
              <li><Link href="/contact" className="hover:text-ember transition-colors">Contact</Link></li>
              <li><Link href="/blog" className="hover:text-ember transition-colors">Blog</Link></li>
              <li><Link href="/privacy" className="hover:text-ember transition-colors">Privacy policy</Link></li>
            </ul>
          </div>

          {/* ছবির মতো ইনপুট ফর্ম ও কন্টাক্ট সেকশন (3 Columns) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink/40">Stay in the loop</h4>
            <p className="text-sm text-ink/60 leading-relaxed font-medium">
              New destinations and travel tips, once a month.
            </p>

            <form className="flex items-center bg-stone border border-sand rounded-full p-1 max-w-md w-full focus-within:border-ink transition-colors">
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="flex-1 bg-transparent px-4 py-2 text-sm text-ink placeholder:text-ink/40 focus:outline-none w-full"
              />
              <button
                type="submit"
                className="bg-black text-white text-xs font-bold uppercase tracking-wider rounded-full px-5 py-2.5 hover:bg-neutral-800 transition-colors shrink-0 shadow-sm"
              >
                Subscribe
              </button>
            </form>

            <ul className="space-y-1 text-xs text-ink/50 font-medium pt-2">
              <li className="text-sm text-ink/70 font-semibold">support@MapMinds.ai</li>
              <li>San Francisco, CA</li>
            </ul>
          </div>

        </div>

        {/* বটম কপিরাইট সেকশন */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs font-medium text-ink/40">
          <div>
            © 2026 MapMinds. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-ink transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-ink transition-colors">Privacy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}