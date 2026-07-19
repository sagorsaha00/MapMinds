const features = [
  { icon: '🤖', title: 'AI-Matched Recommendations', desc: 'Get destinations tailored to your interests, budget, and travel style.' },
  { icon: '🗺️', title: 'Smart Itineraries', desc: 'Day-by-day plans generated and refined with your AI travel assistant.' },
  { icon: '✅', title: 'Verified Destinations', desc: 'Every trip is reviewed for accuracy, pricing, and quality before listing.' },
  { icon: '💬', title: '24/7 AI Assistant', desc: 'Ask questions, get follow-up suggestions, and plan in real time.' },
];

export default function Features() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/60 mb-4">
          ✨ Intelligence Core
        </span>
        <h2 className="text-4xl md:text-5xl font-display font-medium text-neutral-900 tracking-tight mb-4">
          Why travel with MapMinds
        </h2>
        <p className="text-neutral-500 font-medium text-lg">
          Everything you need to plan a trip you&apos;ll actually love, powered by AI at every step.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((f, idx) => (
          <div
            key={f.title}
            className={`bg-white border border-neutral-200/60 p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ${idx % 2 !== 0 ? 'lg:translate-y-4' : ''}`}
          >
            <div>
              <div className="w-14 h-14 bg-neutral-50 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3 tracking-tight">{f.title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed font-medium">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}