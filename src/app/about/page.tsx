const values = [
  { icon: '🎯', title: 'Traveler-first', desc: 'Every feature starts from a real planning frustration, not a technology we wanted to use.' },
  { icon: '🤝', title: 'Transparent AI', desc: 'Recommendations explain their reasoning instead of acting like a black box.' },
  { icon: '🌍', title: 'Global by default', desc: 'Built for travelers planning trips anywhere, not just a handful of popular routes.' },
];

const milestones = [
  { year: '2024', text: 'MapMinds started as a side project to fix a two-week trip-planning spreadsheet.' },
  { year: '2025', text: 'Launched the AI recommendation engine after testing it on 200+ real trip requests.' },
  { year: '2026', text: 'Introduced the streaming AI travel assistant and opened the platform to public trip listings.' },
];

export default function AboutPage() {
  return (
    <div>
      <section className="bg-primary text-white py-16">
        <div className="container-page max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">We think trip planning should take minutes, not weekends</h1>
          <p className="text-neutral-100/90 text-lg">
            MapMinds pairs an AI recommendation engine with a real trip-planning assistant, so the research phase stops eating the excitement out of your next trip.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {values.map((v) => (
            <div key={v.title} className="card p-6 text-center">
              <div className="text-3xl mb-4">{v.icon}</div>
              <h3 className="font-semibold text-neutral-900 mb-2">{v.title}</h3>
              <p className="text-sm text-neutral-600">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-page max-w-2xl">
          <h2 className="text-2xl font-bold text-neutral-900 mb-8 text-center">Our story so far</h2>
          <div className="space-y-6">
            {milestones.map((m) => (
              <div key={m.year} className="flex gap-4">
                <div className="text-primary font-bold w-16 flex-shrink-0">{m.year}</div>
                <p className="text-neutral-700">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 text-center">
        <h2 className="text-2xl font-bold text-neutral-900 mb-3">Want to see it in action?</h2>
        <p className="text-neutral-600 mb-6">Try the demo login and get AI-matched trip ideas in under a minute.</p>
        <a href="/login" className="btn-primary inline-block">Try MapMinds</a>
      </section>
    </div>
  );
}
