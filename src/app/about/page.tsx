const values = [
  { icon: '🎯', title: 'Traveler-first', desc: 'Every feature starts from a real planning frustration, not a technology we wanted to use.' },
  { icon: '🤝', title: 'Transparent AI', desc: 'Recommendations explain their reasoning instead of acting like a black box.' },
  { icon: '🌍', title: 'Global by default', desc: 'Built for travelers planning trips anywhere, not just a handful of popular routes.' },
];

const milestones = [
  { year: '2024', title: 'The Spark', text: 'MapMinds started as a side project to fix a messy two-week trip-planning spreadsheet.' },
  { year: '2025', title: 'AI Engine Launch', text: 'Launched the AI recommendation engine after testing it on 200+ real trip requests.' },
  { year: '2026', title: 'Streaming & Community', text: 'Introduced the streaming AI travel assistant and opened the platform to public trip listings.' },
];

export default function AboutPage() {
  return (
    <div className="bg-stone/10 min-h-screen font-body antialiased selection:bg-black selection:text-white">

      {/* 🚀 হিরো সেকশন (মডার্ন মিনিমালিস্ট গ্রেডিয়েন্ট ভাইব) */}
      <section className="relative overflow-hidden bg-neutral-900 text-white py-20 md:py-28 px-4 md:px-10 border-b border-neutral-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.03),transparent)] pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 text-neutral-300 border border-white/10 mb-6 shadow-sm backdrop-blur-md">
            ✨ Our Mission
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tighter mb-6 leading-tight bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
            We think trip planning should take minutes, not weekends.
          </h1>
          <p className="text-neutral-400 text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            MapMinds pairs a lightning-fast AI recommendation engine with real-time web intelligence, ensuring the research phase never eats the excitement out of your next trip.
          </p>
        </div>
      </section>

      {/* 🎯 Core Values সেকশন (DaisyUI Glass & Card Optimization) */}
      <section className="max-w-6xl mx-auto px-4 md:px-10 py-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-neutral-900 tracking-tight">
            The Principles Guiding Our Engine
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {values.map((v) => (
            <div
              key={v.title}
              className="card bg-white border border-neutral-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.015)] rounded-[2rem] p-8 transition-all duration-300 hover:shadow-[0_20px_45px_rgb(0,0,0,0.04)] hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center text-2xl mb-6 shadow-sm">
                {v.icon}
              </div>
              <h3 className="font-display font-bold text-neutral-900 text-lg mb-3">{v.title}</h3>
              <p className="text-sm text-neutral-500 font-medium leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🗺️ Timeline সেকশন (আমাদের গল্প) */}
      <section className="bg-white border-y border-neutral-200/50 py-20 px-4 md:px-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-neutral-900 tracking-tight">
              Our Story So Far
            </h2>
          </div>

          {/* Custom Visual Timeline */}
          <div className="relative border-l-2 border-neutral-200/80 pl-6 md:pl-8 space-y-12 max-w-xl mx-auto">
            {milestones.map((m) => (
              <div key={m.year} className="relative group">
                {/* Timeline Bullet Point */}
                <div className="absolute -left-[31px] md:-left-[39px] top-1 bg-white border-2 border-black w-4 h-4 rounded-full transition-transform duration-300 group-hover:scale-125" />

                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                  <span className="font-display font-black text-xl text-neutral-900 tracking-tight bg-neutral-100 px-2.5 py-0.5 rounded-md border border-neutral-200/60 w-fit">
                    {m.year}
                  </span>
                  <h4 className="font-display font-bold text-neutral-800 text-base">{m.title}</h4>
                </div>
                <p className="text-neutral-500 font-medium text-sm mt-2 leading-relaxed">
                  {m.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🏁 Call To Action (CTA) সেকশন */}
      <section className="max-w-4xl mx-auto px-4 md:px-10 py-24 text-center">
        <div className="bg-neutral-50 border border-neutral-200/80 rounded-[3rem] p-8 md:p-14 shadow-[0_10px_40px_rgb(0,0,0,0.02)]">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight mb-4">
            Want to see MapMinds in action?
          </h2>
          <p className="text-neutral-500 font-medium text-sm md:text-base max-w-md mx-auto mb-8">
            Take a test drive with our demo account and watch the Groq + Tavily engine structure your perfect getaway.
          </p>
          <a
            href="/login"
            className="group inline-flex items-center justify-center gap-2 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-widest rounded-full px-8 py-4 transition-all shadow-md hover:shadow-lg"
          >
            Try MapMinds Now
            <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform font-bold">↗</span>
          </a>
        </div>
      </section>

    </div>
  );
}