const steps = [
  { step: '01', title: 'Tell us your preferences', desc: 'Interests, budget range, and travel style — takes less than a minute.' },
  { step: '02', title: 'Get AI recommendations', desc: 'Our recommendation engine matches you to destinations that fit.' },
  { step: '03', title: 'Refine with the AI Assistant', desc: 'Chat to adjust the itinerary, ask questions, and lock in details.' },
  { step: '04', title: 'Book and go', desc: 'Save your trip plan and manage it from your dashboard.' },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-24 border-y border-neutral-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Left Column: Premium Visual Card */}
          <div className="lg:col-span-5 relative group h-[500px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 backdrop-blur-md bg-white/10 border border-white/20 p-6 rounded-2xl text-white">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">Seamless Flow</span>
              <h4 className="text-xl font-display font-semibold mt-1">Plan your next adventure securely in minutes.</h4>
            </div>
          </div>

          {/* Right Column: Step Stacks */}
          <div className="lg:col-span-7 space-y-8">
            <div className="mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Workflow</span>
              <h2 className="text-4xl font-display font-medium text-neutral-900 mt-1">How it works</h2>
            </div>

            <div className="space-y-6">
              {steps.map((s) => (
                <div
                  key={s.step}
                  className="flex gap-6 p-6 rounded-2xl border border-transparent hover:border-neutral-200/60 hover:bg-neutral-50/60 transition-all duration-300"
                >
                  <div className="text-3xl font-bold font-display text-neutral-300 tracking-tight select-none">
                    {s.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 mb-1">{s.title}</h3>
                    <p className="text-sm text-neutral-500 font-medium leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}