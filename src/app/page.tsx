import Link from 'next/link';
import Features from '@/components/home/Features';
import HowItWorks from '@/components/home/HowItWorks';
import Categories from '@/components/home/Categories';
import FeaturedTrips from '@/components/home/FeaturedTrips';
import Stats from '@/components/home/Stats';
import Testimonials from '@/components/home/Testimonials';
import FAQ from '@/components/home/FAQ';
 
import CTA from '@/components/home/CTA';

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[92vh] px-4 md:px-6 pt-4 pb-6 font-body antialiased">
        <div className="max-w-[1400px] mx-auto rounded-4xl overflow-hidden relative min-h-[88vh] shadow-2xl bg-dusk group">

          {/* রিয়েল সানরাইজ/মাউন্টেন ব্যাকগ্রাউন্ড ইমেজ (ছবির মতো লাক্সারি ভাইব) */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-[1.02]"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1800&auto=format&fit=crop')`,
              filter: 'brightness(0.75) contrast(1.05)',
            }}
          />

          {/* ছবির মতো অ্যাম্বিয়েন্ট সানরাইজ ও ডার্ক ফরেস্ট ওভারলে গ্লো */}
          <div
            className="absolute inset-0 opacity-80 mix-blend-soft-light"
            style={{
              background:
                'radial-gradient(120% 80% at 15% 10%, rgba(232,176,106,0.4) 0%, rgba(43,42,37,0) 65%), radial-gradient(100% 70% at 85% 90%, rgba(73,86,64,0.35) 0%, rgba(43,42,37,0) 60%)',
            }}
          />

          {/* মেইন কন্টেন্ট লেআউট */}
          <div className="relative z-10 flex flex-col min-h-[88vh] px-6 md:px-12 pt-16 pb-10">

            {/* মাঝখানের হেডলাইন এবং সাব-টাইটেল (ছবির মতো মিনিমালিস্টিক এলাইনমেন্ট) */}
            <div className="flex-1 flex flex-col items-center justify-center text-center text-white px-4 mt-6">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-white/10 text-white/90 border border-white/20 backdrop-blur-md mb-6 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse" />
                East Java&apos;s Natural Wonder
              </span>

              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] max-w-4xl tracking-tighter mb-4">
                Unforgettable Mount Bromo
                <br />
                Sunrise Experience
              </h1>
            </div>

            {/* বটম ওভারলে রো (বামপাশে গ্লাস কার্ড এবং ডানপাশে ছবির মতো অ্যাসাইমেট্রিক ৪টি ট্রাভেল ইমেজ) */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-end justify-between gap-8 mt-auto">

              {/* বামপাশের প্রফেশনাল গ্লাস-মরফিজম কার্ড */}
              <div className="bg-white/10 border border-white/25 backdrop-blur-xl rounded-3xl p-6 max-w-sm text-white shadow-xl hover:border-white/40 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex -space-x-2.5">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-cover bg-center border-2 border-dusk ring-1 ring-white/20 shadow-sm"
                        style={{ backgroundImage: `url('https://i.pravatar.cc/100?u=${i + 10}')` }}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold tracking-tight text-white/90">50+ People Joined</span>
                </div>

                <p className="text-sm text-white/80 leading-relaxed font-medium mb-6">
                  Travel through volcanic landscapes, golden skies, and timeless beauty with expertly guided Mount Bromo tours.
                </p>

                <Link
                  href="/register"
                  className="group inline-flex items-center gap-3 bg-white text-neutral-900 text-sm font-bold rounded-full pl-5 pr-2 py-2 shadow-lg hover:bg-neutral-50 transition-all"
                >
                  Book now
                  <span className="w-7 h-7 rounded-full bg-dusk text-white flex items-center justify-center text-xs group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    ↗
                  </span>
                </Link>
              </div>

              {/* ডানপাশের অ্যাসাইমেট্রিক রাউন্ডেড ইমেজ প্যানেল (হুবহু ছবির মতো ডাইনামিক শেইপ) */}
              <div className="hidden md:flex items-end gap-4 self-center lg:self-end">

                {/* কার্ড ১ (সবচেয়ে বড় ও প্রথম ফোকাস কার্ড) */}
                <div className="relative w-44 h-60 rounded-3xl overflow-hidden shadow-2xl border border-white/10 group/card">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover/card:scale-115"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <p className="absolute bottom-4 left-4 text-white text-xs font-bold tracking-tight">Active Volcano Walk</p>
                </div>

                {/* কার্ড ২ (মাঝারি সাইজ) */}
                <div className="relative w-36 h-48 rounded-3xl overflow-hidden shadow-2xl border border-white/10 group/card">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover/card:scale-115"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=400&auto=format&fit=crop')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* কার্ড ৩ (লম্বা এবং সংকীর্ণ শেইপ) */}
                <div className="relative w-36 h-52 rounded-3xl overflow-hidden shadow-2xl border border-white/10 group/card">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover/card:scale-115"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=400&auto=format&fit=crop')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* কার্ড ৪ (ছোট শেইপ) */}
                <div className="relative w-32 h-44 rounded-3xl overflow-hidden shadow-2xl border border-white/10 group/card">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover/card:scale-115"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=400&auto=format&fit=crop')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>


      <Features />
      <HowItWorks />
      <Categories />
      <FeaturedTrips />
      <Stats />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}