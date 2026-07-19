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
    quote: 'I told it I wanted trekking and wildlife, and it surfaced trips I hadn\u2019t even considered. Booked one within a week.',
  },
];

export default function Testimonials() {
  return (
    <section className="container-page py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl font-bold text-neutral-900 mb-3">What travelers say</h2>
        <p className="text-neutral-600">Real feedback from people who planned their trips with MapMinds.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div key={t.name} className="card p-6">
            <p className="text-neutral-700 mb-4">&quot;{t.quote}&quot;</p>
            <div className="font-semibold text-neutral-900">{t.name}</div>
            <div className="text-sm text-neutral-500">{t.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
