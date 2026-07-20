import React from 'react';

const testimonials = [
  {
    name: 'Ava Thompson',
    role: 'Solo Traveler',
    quote: 'The AI assistant helped me rebuild my entire Portugal itinerary in minutes when my flight changed. Genuinely useful, not gimmicky.',
  },
  {
    name: 'Marcus Chen',
    role: 'Family Trip Planner',
    quote: 'Recommendations actually matched what my family likes — beaches, short transfers, kid-friendly stops. Saved hours of research.',
  },
  {
    name: 'Priya Nair',
    role: 'Adventure Seeker',
    quote: 'I told it I wanted trekking and wildlife, and it surfaced trips I hadn’t even considered. Booked one within a week.',
  },
];

export default function Testimonials() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-10 py-20 font-body antialiased bg-stone/5">
      {/* হেডার সেকশন */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-black text-white mb-4">
          Reviews
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-neutral-900 tracking-tighter mb-3">
          What travelers say
        </h2>
        <p className="text-neutral-500 font-medium text-sm md:text-base">
          Real feedback from people who planned their trips with MapMinds.
        </p>
      </div>

      {/* টেস্টমোনিয়াল গ্রিড */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="card bg-white border border-neutral-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.01)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 rounded-[2rem] p-6 md:p-8 flex flex-col justify-between"
          >
            {/* কোটেশন কন্টেন্ট */}
            <div className="relative">
              {/* স্টাইলিশ কোট আইকন */}
              <span className="text-4xl font-serif text-neutral-300 leading-none absolute -top-3 -left-1 select-none">“</span>
              <p className="text-neutral-600 text-sm md:text-base font-medium leading-relaxed pl-4 mb-6 italic relative z-10">
                {t.quote}
              </p>
            </div>

            {/* ইউজার প্রোফাইল ইনফো */}
            <div className="flex items-center gap-4 pt-4 border-t border-neutral-100">
              {/* DaisyUI Avatar উইথ ইনিশিয়ালস */}
              <div className="avatar placeholder">
                <div className="bg-neutral-900 text-white w-10 h-10 rounded-xl font-bold uppercase tracking-wider text-xs">
                  <span>{t.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
              </div>

              <div>
                <div className="font-semibold text-neutral-950 text-sm md:text-base tracking-tight">
                  {t.name}
                </div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mt-0.5">
                  {t.role}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}